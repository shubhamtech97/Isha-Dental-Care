/**
 * In-Browser Video Presentation Exporter
 * Generates and downloads a high-definition 1080p/720p presentation video (.webm / .mp4)
 * using HTML5 Canvas, Web Audio API, and MediaRecorder.
 */

import { SLIDES_DATA, PRESENTATION_METADATA, SlideData } from '../data/presentationData';

export interface VideoExportOptions {
  resolution?: '1080p' | '720p';
  secondsPerSlide?: number;
  includeAudio?: boolean;
  onProgress?: (progressPercent: number, statusText: string) => void;
}

export async function exportPresentationVideo(
  options: VideoExportOptions = {}
): Promise<Blob> {
  const {
    resolution = '720p',
    secondsPerSlide = 4,
    includeAudio = true,
    onProgress,
  } = options;

  const width = resolution === '1080p' ? 1920 : 1280;
  const height = resolution === '1080p' ? 1080 : 720;
  const fps = 30;

  // Create offscreen canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  // Setup Web Audio MediaStreamDestination for audio track
  let audioStream: MediaStream | null = null;
  let audioCtx: AudioContext | null = null;

  if (includeAudio && typeof window !== 'undefined') {
    try {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
        const dest = audioCtx.createMediaStreamDestination();
        audioStream = dest.stream;

        // Create warm ambient chord tones for video background track
        const chords = [
          [174.61, 220.0, 261.63, 329.63], // Fmaj7
          [130.81, 196.0, 246.94, 329.63], // Cmaj7
          [220.0, 261.63, 329.63, 440.0],  // Am7
          [196.0, 246.94, 293.66, 392.0],  // G
        ];

        let chordTime = audioCtx.currentTime;
        const totalVideoSecs = SLIDES_DATA.length * secondsPerSlide + 2;

        while (chordTime < audioCtx.currentTime + totalVideoSecs) {
          for (const chord of chords) {
            chord.forEach((freq) => {
              if (!audioCtx) return;
              const osc = audioCtx.createOscillator();
              const gain = audioCtx.createGain();
              const filter = audioCtx.createBiquadFilter();

              osc.type = 'sine';
              osc.frequency.setValueAtTime(freq, chordTime);

              filter.type = 'lowpass';
              filter.frequency.setValueAtTime(600, chordTime);

              gain.gain.setValueAtTime(0, chordTime);
              gain.gain.linearRampToValueAtTime(0.025, chordTime + 1.0);
              gain.gain.linearRampToValueAtTime(0, chordTime + 3.8);

              osc.connect(filter);
              filter.connect(gain);
              gain.connect(dest);

              osc.start(chordTime);
              osc.stop(chordTime + 4.0);
            });
            chordTime += 3.8;
          }
        }
      }
    } catch (e) {
      console.warn('Audio stream setup skipped:', e);
    }
  }

  // Combine canvas video stream + audio stream
  const canvasStream = canvas.captureStream(fps);
  const combinedTracks = [...canvasStream.getVideoTracks()];
  if (audioStream && audioStream.getAudioTracks().length > 0) {
    combinedTracks.push(...audioStream.getAudioTracks());
  }
  const combinedStream = new MediaStream(combinedTracks);

  // Determine supported mime type
  let mimeType = 'video/webm;codecs=vp9,opus';
  if (!MediaRecorder.isTypeSupported(mimeType)) {
    mimeType = 'video/webm;codecs=vp8,opus';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/webm';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/mp4';
      }
    }
  }

  const recordedChunks: Blob[] = [];
  const recorder = new MediaRecorder(combinedStream, {
    mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined,
    videoBitsPerSecond: resolution === '1080p' ? 5000000 : 3000000,
  });

  recorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  const recordingPromise = new Promise<Blob>((resolve, reject) => {
    recorder.onstop = () => {
      try {
        const finalBlob = new Blob(recordedChunks, { type: mimeType });
        if (audioCtx) {
          audioCtx.close().catch(() => {});
        }
        resolve(finalBlob);
      } catch (err) {
        reject(err);
      }
    };
    recorder.onerror = (err) => reject(err);
  });

  recorder.start(100);

  // Render each slide frame-by-frame
  const totalSlides = SLIDES_DATA.length;
  const framesPerSlide = secondsPerSlide * fps;

  for (let sIdx = 0; sIdx < totalSlides; sIdx++) {
    const slide = SLIDES_DATA[sIdx];
    const isDarkSlide = slide.id === 1 || slide.id === 20;

    for (let frame = 0; frame < framesPerSlide; frame++) {
      const slideProgress = frame / framesPerSlide;
      // Slight Ken Burns subtle zoom
      const zoom = 1.0 + slideProgress * 0.02;

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-width / 2, -height / 2);

      drawSlideToCanvas(ctx, slide, width, height, isDarkSlide, slideProgress);

      ctx.restore();

      // Progress notification periodically
      if (frame === 0 || frame % 15 === 0) {
        const overallProgress = Math.round(
          ((sIdx * framesPerSlide + frame) / (totalSlides * framesPerSlide)) * 100
        );
        onProgress?.(
          overallProgress,
          `Rendering Slide ${slide.slideNumber} of ${totalSlides}: ${slide.title}`
        );
      }

      // Small delay to allow MediaRecorder to capture frames properly
      await new Promise((r) => setTimeout(r, 1000 / fps));
    }
  }

  onProgress?.(98, 'Finalizing video compression...');
  recorder.stop();

  return await recordingPromise;
}

/**
 * Renders a presentation slide cleanly onto the 2D canvas
 */
function drawSlideToCanvas(
  ctx: CanvasRenderingContext2D,
  slide: SlideData,
  width: number,
  height: number,
  isDark: boolean,
  progress: number
) {
  // 1. Background
  if (isDark) {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#042f2e');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative glow circles
    ctx.fillStyle = 'rgba(20, 184, 166, 0.08)';
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.2, width * 0.25, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Medical clean white with subtle teal gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(1, '#f0fdfa');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Soft top accent bar
    const topBarGrad = ctx.createLinearGradient(0, 0, width, 0);
    topBarGrad.addColorStop(0, '#0d9488');
    topBarGrad.addColorStop(1, '#06b6d4');
    ctx.fillStyle = topBarGrad;
    ctx.fillRect(0, 0, width, 6);
  }

  // 2. Header Bar
  const padX = width * 0.06;
  const topY = height * 0.08;

  // Logo & Clinic Title
  ctx.fillStyle = isDark ? '#2dd4bf' : '#0d9488';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.fillText('🦷 ISHA DENTAL CARE', padX, topY);

  ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillText('Digital Experience Presentation', padX + 280, topY);

  // Category & Slide Number Badge (Right)
  const badgeText = `${slide.category.toUpperCase()} • SLIDE ${slide.slideNumber}`;
  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
  const badgeWidth = ctx.measureText(badgeText).width + 24;

  ctx.fillStyle = isDark ? 'rgba(20, 184, 166, 0.15)' : 'rgba(13, 148, 136, 0.1)';
  ctx.beginPath();
  ctx.roundRect(width - padX - badgeWidth, topY - 18, badgeWidth, 26, 6);
  ctx.fill();

  ctx.fillStyle = isDark ? '#5eead4' : '#0f766e';
  ctx.fillText(badgeText, width - padX - badgeWidth + 12, topY);

  // Divider line
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.07)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX, topY + 16);
  ctx.lineTo(width - padX, topY + 16);
  ctx.stroke();

  // 3. Slide Content
  const contentY = topY + 60;

  if (slide.id === 1) {
    // Cover Slide special layout
    ctx.fillStyle = '#2dd4bf';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.fillText('WEBSITE DESIGN & CLIENT PRESENTATION', padX, contentY + 40);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px system-ui, sans-serif';
    ctx.fillText(PRESENTATION_METADATA.clientName, padX, contentY + 110);

    ctx.fillStyle = '#99f6e4';
    ctx.font = '300 24px system-ui, sans-serif';
    ctx.fillText(slide.subtitle || '', padX, contentY + 155);

    // Callout box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.beginPath();
    ctx.roundRect(padX, contentY + 195, width * 0.65, 110, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px system-ui, sans-serif';
    wrapText(
      ctx,
      'A comprehensive digital experience proposal designed to build patient trust, showcase clinical expertise, and generate seamless online appointments for Isha Dental Care.',
      padX + 24,
      contentY + 235,
      width * 0.65 - 48,
      24
    );

    // Cover Meta Footer inside card
    ctx.fillStyle = '#2dd4bf';
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillText(`Presented by: ${PRESENTATION_METADATA.agencyName}`, padX, height - 90);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`${PRESENTATION_METADATA.date} • 16:9 Widescreen High Definition`, padX, height - 68);
  } else if (slide.id === 20) {
    // Conclusion Slide special layout
    ctx.fillStyle = '#2dd4bf';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText('THANK YOU', padX, contentY + 40);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 50px system-ui, sans-serif';
    ctx.fillText('Your Smile. Our Care.', padX, contentY + 110);

    ctx.fillStyle = '#99f6e4';
    ctx.font = '300 22px system-ui, sans-serif';
    ctx.fillText(
      'Ready to launch your modern dental digital experience.',
      padX,
      contentY + 155
    );

    // Summary pills
    const pills = [
      '✓ Mobile-First Architecture',
      '✓ 4-Step Instant Booking',
      '✓ Local Dental SEO Ready',
      '✓ Complete Doctor Showcase',
    ];
    let pillY = contentY + 200;
    pills.forEach((p) => {
      ctx.fillStyle = 'rgba(20, 184, 166, 0.15)';
      ctx.beginPath();
      ctx.roundRect(padX, pillY, 320, 36, 8);
      ctx.fill();
      ctx.fillStyle = '#5eead4';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillText(p, padX + 16, pillY + 23);
      pillY += 46;
    });
  } else {
    // Regular Slide Content Layout
    // Title
    ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.fillText(slide.title, padX, contentY + 20);

    // Subtitle
    if (slide.subtitle) {
      ctx.fillStyle = isDark ? '#2dd4bf' : '#0d9488';
      ctx.font = '500 17px system-ui, sans-serif';
      ctx.fillText(slide.subtitle, padX, contentY + 52);
    }

    // Lead Quote / Intro paragraph
    if (slide.leadQuote) {
      ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
      ctx.font = '15px system-ui, sans-serif';
      wrapText(ctx, slide.leadQuote, padX, contentY + 86, width - padX * 2, 22);
    }

    // Key points grid
    if (slide.keyPoints && slide.keyPoints.length > 0) {
      const cols = slide.keyPoints.length <= 4 ? 2 : 3;
      const cardGap = 20;
      const totalAvailableWidth = width - padX * 2;
      const cardW = (totalAvailableWidth - cardGap * (cols - 1)) / cols;
      const cardH = slide.keyPoints.length <= 4 ? 120 : 95;
      const startGridY = contentY + 130;

      slide.keyPoints.forEach((kp, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const cardX = padX + col * (cardW + cardGap);
        const cardY = startGridY + row * (cardH + 16);

        // Card background
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, cardW, cardH, 12);
        ctx.fill();

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Card Accent border on left
        ctx.fillStyle = '#0d9488';
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, 4, cardH, [12, 0, 0, 12]);
        ctx.fill();

        // Card Title
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 15px system-ui, sans-serif';
        ctx.fillText(kp.title, cardX + 16, cardY + 26);

        // Card Description
        ctx.fillStyle = '#475569';
        ctx.font = '13px system-ui, sans-serif';
        wrapText(ctx, kp.description, cardX + 16, cardY + 48, cardW - 32, 18);
      });
    } else {
      // Feature illustration card
      const boxW = width - padX * 2;
      const boxH = 220;
      const boxY = contentY + 130;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(padX, boxY, boxW, boxH, 16);
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.fillText('Patient-Centric Digital Architecture', padX + 30, boxY + 45);

      ctx.fillStyle = '#64748b';
      ctx.font = '14px system-ui, sans-serif';
      wrapText(
        ctx,
        slide.voiceoverScript,
        padX + 30,
        boxY + 80,
        boxW - 60,
        24
      );
    }
  }

  // 4. Voiceover Closed Captions pill on bottom
  const ccY = height - 55;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.beginPath();
  ctx.roundRect(padX, ccY, width - padX * 2, 38, 8);
  ctx.fill();

  ctx.fillStyle = '#2dd4bf';
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.fillText('VOICEOVER NARRATION:', padX + 16, ccY + 23);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '12px system-ui, sans-serif';
  const truncatedScript =
    slide.voiceoverScript.length > 130
      ? slide.voiceoverScript.substring(0, 130) + '...'
      : slide.voiceoverScript;
  ctx.fillText(truncatedScript, padX + 175, ccY + 23);

  // 5. Progress line at bottom
  ctx.fillStyle = '#0d9488';
  const totalCount = SLIDES_DATA.length;
  const progressW = (width * (slide.id - 1 + progress)) / totalCount;
  ctx.fillRect(0, height - 4, progressW, 4);
}

/**
 * Helper to wrap text with line breaks on Canvas
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, curY);
}

/**
 * Triggers browser download for Blob file
 */
export function triggerFileDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
}
