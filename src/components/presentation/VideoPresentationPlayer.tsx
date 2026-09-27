import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SLIDES_DATA, PRESENTATION_METADATA } from '../../data/presentationData';
import { SlideContent } from './SlideContent';
import { DentalIcon, ToothLogoIcon } from '../DentalIcon';
import { speechEngine, VoiceOption, VoicePersona } from '../../utils/speechVoiceover';
import { downloadPptxFile } from '../../utils/generatePptx';
import { exportPresentationVideo, triggerFileDownload } from '../../utils/videoExporter';

interface VideoPresentationPlayerProps {
  onExitToWebsite: () => void;
  onSwitchToSlideDeck: () => void;
  initialSlideIndex?: number;
}

export const VideoPresentationPlayer: React.FC<VideoPresentationPlayerProps> = ({
  onExitToWebsite,
  onSwitchToSlideDeck,
  initialSlideIndex = 0,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlideIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasUserStarted, setHasUserStarted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showChaptersDrawer, setShowChaptersDrawer] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [voicePersona, setVoicePersona] = useState<VoicePersona>('warm-specialist');
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0);
  const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([]);
  const [ambientMusicOn, setAmbientMusicOn] = useState(true);
  const [voiceVolume, setVoiceVolume] = useState(1.0);
  const [spokenCharIndex, setSpokenCharIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloadingPptx, setIsDownloadingPptx] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState('');
  const [slideTransitionKey, setSlideTransitionKey] = useState(0);

  // Video download & export states
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isExportingVideo, setIsExportingVideo] = useState(false);
  const [videoExportProgress, setVideoExportProgress] = useState(0);
  const [videoExportStatus, setVideoExportStatus] = useState('');
  const [videoResolution, setVideoResolution] = useState<'720p' | '1080p'>('720p');

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const totalSlides = SLIDES_DATA.length;
  const currentSlide = SLIDES_DATA[currentSlideIndex];

  // Calculate cumulative times for video scrubber
  const slideDurations = useMemo(() => {
    return SLIDES_DATA.map((s) => s.estimatedDurationSeconds || 20);
  }, []);

  const totalDurationSeconds = useMemo(() => {
    return slideDurations.reduce((acc, dur) => acc + dur, 0);
  }, [slideDurations]);

  const currentElapsedSeconds = useMemo(() => {
    let elapsed = 0;
    for (let i = 0; i < currentSlideIndex; i++) {
      elapsed += slideDurations[i];
    }
    // approximate progress within current slide based on spoken characters
    const currentScriptLength = currentSlide.voiceoverScript.length || 1;
    const progressInCurrent = Math.min(1, spokenCharIndex / currentScriptLength);
    elapsed += progressInCurrent * (slideDurations[currentSlideIndex] || 20);
    return Math.round(elapsed);
  }, [currentSlideIndex, spokenCharIndex, slideDurations, currentSlide]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Initialize speech engine and voice list
  useEffect(() => {
    const voices = speechEngine.loadVoices();
    setAvailableVoices(voices);
    speechEngine.onVoicesLoaded = (loadedVoices) => {
      setAvailableVoices(loadedVoices);
    };

    speechEngine.setVoicePersona('warm-specialist');
    setCurrentVoiceIndex(speechEngine.selectedVoiceIndex);

    speechEngine.onStart = () => {
      setIsSpeaking(true);
    };

    speechEngine.onBoundary = (charIndex) => {
      setSpokenCharIndex(charIndex);
    };

    speechEngine.onEnd = () => {
      setIsSpeaking(false);
    };

    return () => {
      speechEngine.stopAll();
    };
  }, []);

  // When currentSlideIndex changes while playing, speak the new slide script
  useEffect(() => {
    setSpokenCharIndex(0);
    setSlideTransitionKey((prev) => prev + 1);

    if (isPlaying) {
      playSlideNarration(currentSlideIndex);
    }
  }, [currentSlideIndex]);

  const playSlideNarration = (slideIdx: number) => {
    const slide = SLIDES_DATA[slideIdx];
    if (!slide) return;

    if (ambientMusicOn) {
      speechEngine.startAmbientMusic();
    }

    speechEngine.speak(slide.voiceoverScript, {
      onBoundary: (charIdx) => {
        setSpokenCharIndex(charIdx);
      },
      onEnd: () => {
        setIsSpeaking(false);
        // If there's a next slide and we are still in play mode, advance after a natural breathing pause
        if (slideIdx < totalSlides - 1) {
          setTimeout(() => {
            setCurrentSlideIndex((prev) => {
              if (prev === slideIdx) {
                return slideIdx + 1;
              }
              return prev;
            });
          }, 1200);
        } else {
          // Finished entire presentation!
          setIsPlaying(false);
          speechEngine.pauseAmbientMusic();
        }
      },
    });
  };

  const handleStartPlay = () => {
    setHasUserStarted(true);
    setIsPlaying(true);
    if (ambientMusicOn) {
      speechEngine.startAmbientMusic();
    }
    playSlideNarration(currentSlideIndex);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setIsSpeaking(false);
    speechEngine.pause();
  };

  const handleTogglePlay = () => {
    if (!hasUserStarted) {
      handleStartPlay();
      return;
    }

    if (isPlaying) {
      handlePause();
    } else {
      setIsPlaying(true);
      if (ambientMusicOn) {
        speechEngine.startAmbientMusic();
      }
      playSlideNarration(currentSlideIndex);
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      speechEngine.stopVoice();
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      speechEngine.stopVoice();
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const handleSkipTime = (seconds: number) => {
    if (seconds > 0) {
      handleNextSlide();
    } else {
      handlePrevSlide();
    }
  };

  const handleJumpToSlide = (idx: number) => {
    speechEngine.stopVoice();
    setCurrentSlideIndex(idx);
    setShowChaptersDrawer(false);
    if (!isPlaying && hasUserStarted) {
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
    speechEngine.rate = newSpeed;
    if (isPlaying) {
      // Re-trigger speech with updated rate
      speechEngine.stopVoice();
      playSlideNarration(currentSlideIndex);
    }
  };

  const handlePersonaChange = (persona: VoicePersona) => {
    setVoicePersona(persona);
    speechEngine.setVoicePersona(persona);
    setCurrentVoiceIndex(speechEngine.selectedVoiceIndex);
    if (isPlaying) {
      speechEngine.stopVoice();
      playSlideNarration(currentSlideIndex);
    }
  };

  const handleVoiceChange = (idx: number) => {
    setCurrentVoiceIndex(idx);
    speechEngine.selectedVoiceIndex = idx;
    if (isPlaying) {
      speechEngine.stopVoice();
      playSlideNarration(currentSlideIndex);
    }
  };

  const handleToggleMusic = () => {
    const nextState = !ambientMusicOn;
    setAmbientMusicOn(nextState);
    speechEngine.isMusicEnabled = nextState;
    if (nextState && isPlaying) {
      speechEngine.startAmbientMusic();
    } else {
      speechEngine.pauseAmbientMusic();
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleDownloadPptx = async () => {
    try {
      setIsDownloadingPptx(true);
      setDownloadMessage('Preparing PowerPoint file...');
      await downloadPptxFile((msg) => setDownloadMessage(msg));
      setTimeout(() => {
        setIsDownloadingPptx(false);
        setDownloadMessage('');
      }, 1500);
    } catch (err) {
      console.error('Download failed:', err);
      setIsDownloadingPptx(false);
      setDownloadMessage('Error downloading PPTX.');
    }
  };

  const handleExportAndDownloadVideo = async () => {
    try {
      setIsExportingVideo(true);
      setVideoExportProgress(5);
      setVideoExportStatus('Initializing presentation video frames...');

      const videoBlob = await exportPresentationVideo({
        resolution: videoResolution,
        secondsPerSlide: 3.5,
        includeAudio: true,
        onProgress: (pct, msg) => {
          setVideoExportProgress(pct);
          setVideoExportStatus(msg);
        },
      });

      setVideoExportProgress(100);
      setVideoExportStatus('Saving video file...');

      const filename = `Isha_Dental_Care_Presentation_Walkthrough_${videoResolution}.webm`;
      triggerFileDownload(videoBlob, filename);

      setTimeout(() => {
        setIsExportingVideo(false);
        setVideoExportProgress(0);
        setVideoExportStatus('');
        setShowDownloadModal(false);
      }, 1500);
    } catch (err) {
      console.error('Video export error:', err);
      setIsExportingVideo(false);
      setVideoExportStatus('Export failed. Please try again.');
    }
  };

  const handleDownloadScriptTxt = () => {
    const lines = [
      '====================================================',
      'ISHA DENTAL CARE - COMPLETE CLIENT PRESENTATION SCRIPT',
      'Website Design & Digital Experience Presentation',
      'Presented by: Apex Healthcare Digital Studio',
      '====================================================\n',
    ];

    SLIDES_DATA.forEach((s) => {
      lines.push(`--- SLIDE ${s.slideNumber}: ${s.title.toUpperCase()} (${s.category}) ---`);
      if (s.subtitle) lines.push(`Subtitle: ${s.subtitle}`);
      lines.push(`Audio Narration: "${s.voiceoverScript}"\n`);
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    triggerFileDownload(blob, 'Isha_Dental_Care_Voiceover_Script.txt');
  };

  // Keyboard hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === 'c' || e.key === 'C') {
        setShowCaptions((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        handleToggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMusic();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, hasUserStarted, currentSlideIndex, totalSlides]);

  // Caption highlighted text calculation
  const captionDisplay = useMemo(() => {
    const script = currentSlide.voiceoverScript;
    if (!script) return { spoken: '', upcoming: '' };

    const splitIdx = Math.min(script.length, Math.max(0, spokenCharIndex));
    // Find nearest word boundary
    const nextSpace = script.indexOf(' ', splitIdx);
    const cutPoint = nextSpace === -1 ? splitIdx : nextSpace;

    return {
      spoken: script.substring(0, cutPoint),
      upcoming: script.substring(cutPoint),
    };
  }, [currentSlide.voiceoverScript, spokenCharIndex]);

  return (
    <div
      ref={playerContainerRef}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none relative overflow-hidden"
    >
      {/* Top Video Header Navigation Bar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 z-40 flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
            <ToothLogoIcon className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">
                {PRESENTATION_METADATA.clientName}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Video Walkthrough
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400 truncate max-w-md">
              Chapter {currentSlide.slideNumber}: {currentSlide.title}
            </p>
          </div>
        </div>

        {/* Center: Quick Mode Toggles */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-950/80 px-3 py-1 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400">Viewing as:</span>
          <span className="px-2 py-0.5 rounded bg-teal-600 text-white font-semibold flex items-center gap-1">
            <DentalIcon name="Sparkles" className="w-3 h-3" />
            Video with Voice-Over
          </span>
          <button
            onClick={onSwitchToSlideDeck}
            className="px-2 py-0.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Manual Slide Deck
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct Download Video Button */}
          <button
            onClick={() => setShowDownloadModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer animate-pulse"
            title="Download presentation video file (.webm / .mp4)"
          >
            <DentalIcon name="ArrowRight" className="w-3.5 h-3.5 fill-white rotate-90" />
            <span>Download Video</span>
          </button>

          {/* Transcript / Full Narration Script Button */}
          <button
            onClick={() => setShowTranscriptModal(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            title="View Full Presentation Narration Script"
          >
            <DentalIcon name="FileText" className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">Voiceover Script</span>
          </button>

          {/* Download PPTX Button */}
          <button
            onClick={handleDownloadPptx}
            disabled={isDownloadingPptx}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-60 cursor-pointer"
            title="Download complete PowerPoint (.pptx) file"
          >
            {isDownloadingPptx ? (
              <>
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Downloading...</span>
              </>
            ) : (
              <>
                <DentalIcon name="Zap" className="w-3.5 h-3.5 text-emerald-200" />
                <span>Download .PPTX</span>
              </>
            )}
          </button>

          {/* Exit to Live Website */}
          <button
            onClick={() => {
              speechEngine.stopAll();
              onExitToWebsite();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Switch back to live website"
          >
            <DentalIcon name="ArrowRight" className="w-3.5 h-3.5 rotate-180" />
            <span>Live Website</span>
          </button>
        </div>
      </header>

      {/* Download Toast Notification */}
      {downloadMessage && (
        <div className="bg-emerald-950 text-emerald-200 text-xs px-4 py-1.5 border-b border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DentalIcon name="CheckCircle2" className="w-4 h-4 text-emerald-400" />
            <span>{downloadMessage}</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">Isha_Dental_Care_Website_Presentation.pptx</span>
        </div>
      )}

      {/* Main Video Cinema Stage */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden bg-radial from-slate-900 via-slate-950 to-black">
        {/* Ambient Cinema Lighting in background matching slide colors */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* 16:9 Widescreen Video Frame */}
        <div className="w-full max-w-6xl aspect-16/10 sm:aspect-16/9 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-800 overflow-hidden relative group">
          {/* Subtle cinematic camera motion: Slow subtle zoom (Ken Burns effect) per slide */}
          <div
            key={slideTransitionKey}
            className={`w-full h-full transition-transform duration-10000 ease-out ${
              isPlaying ? 'scale-[1.025] translate-y-[-0.5%]' : 'scale-100'
            }`}
          >
            <SlideContent
              slide={currentSlide}
              onNavigateToSlide={(idx) => handleJumpToSlide(idx - 1)}
            />
          </div>

          {/* Big Start Overlay when user hasn't pressed play yet */}
          {!hasUserStarted && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-teal-600 to-cyan-400 text-white flex items-center justify-center shadow-2xl shadow-teal-500/40 mb-5 animate-bounce cursor-pointer hover:scale-110 transition-transform">
                <button
                  onClick={handleStartPlay}
                  type="button"
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  aria-label="Start Video Presentation with Voiceover"
                >
                  <DentalIcon name="ArrowRight" className="w-9 h-9 text-slate-950 fill-slate-950 ml-1" />
                </button>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/40 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <DentalIcon name="Sparkles" className="w-3.5 h-3.5 text-teal-400" />
                <span>Executive Video Presentation</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
                Isha Dental Care Client Walkthrough
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
                Watch the complete 20-slide presentation with studio-grade voiceover narration, smooth chapter progression, and calming clinic ambiance.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleStartPlay}
                  type="button"
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-teal-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                >
                  <DentalIcon name="ArrowRight" className="w-4 h-4 fill-slate-950" />
                  <span>Start Video Presentation</span>
                </button>

                <button
                  onClick={onSwitchToSlideDeck}
                  type="button"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 transition-colors cursor-pointer"
                >
                  Browse Slides Manually
                </button>
              </div>

              <div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Studio Voiceover Included
                </span>
                <span>•</span>
                <span>20 Detailed Chapters</span>
                <span>•</span>
                <span>Approx. 7 Mins</span>
              </div>
            </div>
          )}

          {/* Pause overlay watermark */}
          {hasUserStarted && !isPlaying && (
            <div
              onClick={handleTogglePlay}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] z-20 flex items-center justify-center cursor-pointer transition-opacity"
            >
              <div className="w-16 h-16 rounded-full bg-slate-900/90 text-white border border-white/20 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                <DentalIcon name="ArrowRight" className="w-7 h-7 ml-0.5 fill-white" />
              </div>
            </div>
          )}

          {/* Closed Captions / Subtitles Overlay at bottom of video stage */}
          {showCaptions && (
            <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex justify-center">
              <div className="max-w-3xl bg-slate-950/85 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-white/10 shadow-2xl text-center pointer-events-auto">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono text-[10px] font-bold border border-teal-500/30">
                    CC • {currentSlide.category}
                  </span>
                  {isSpeaking && (
                    <span className="flex items-center gap-0.5">
                      <span className="w-1 h-2 bg-teal-400 rounded-full animate-pulse" />
                      <span className="w-1 h-3 bg-teal-300 rounded-full animate-pulse delay-75" />
                      <span className="w-1 h-1.5 bg-teal-400 rounded-full animate-pulse delay-150" />
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                  <span className="text-teal-300 font-semibold">{captionDisplay.spoken}</span>
                  <span className="text-slate-300">{captionDisplay.upcoming}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Slide Chapter Playlist Drawer (Slide In from Right) */}
        {showChaptersDrawer && (
          <aside className="absolute right-0 top-0 bottom-0 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <DentalIcon name="Layers" className="w-4 h-4 text-teal-400" />
                  Presentation Chapters
                </h3>
                <p className="text-xs text-slate-400">20 Slides • Click to jump</p>
              </div>
              <button
                onClick={() => setShowChaptersDrawer(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close chapters drawer"
              >
                <DentalIcon name="Check" className="w-4 h-4 rotate-45" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {SLIDES_DATA.map((slide, index) => {
                const isCurrent = index === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => handleJumpToSlide(index)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isCurrent
                        ? 'bg-teal-950/80 border-teal-500/60 shadow-md text-white'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/70 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold px-2 py-1 rounded shrink-0 ${
                        isCurrent
                          ? 'bg-teal-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {slide.slideNumber}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-400 block truncate">
                        {slide.category}
                      </span>
                      <h4 className="text-xs font-semibold text-white truncate">
                        {slide.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {slide.voiceoverScript}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Video Player Control Bar */}
      <footer className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 sm:px-6 py-2.5 z-40 flex flex-col gap-2">
        {/* Timeline Scrubber Bar with Chapter Marks */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400 shrink-0 w-11 text-right">
            {formatTime(currentElapsedSeconds)}
          </span>

          <div className="flex-1 relative py-1 cursor-pointer group">
            {/* Interactive Timeline background */}
            <div className="w-full h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden flex relative">
              {SLIDES_DATA.map((slide, idx) => {
                const isPassed = idx < currentSlideIndex;
                const isCurrent = idx === currentSlideIndex;
                const widthPercent = (1 / totalSlides) * 100;

                return (
                  <div
                    key={slide.id}
                    onClick={() => handleJumpToSlide(idx)}
                    style={{ width: `${widthPercent}%` }}
                    className={`h-full border-r border-slate-950 transition-colors relative ${
                      isPassed
                        ? 'bg-teal-500'
                        : isCurrent
                        ? 'bg-teal-400'
                        : 'bg-slate-700/60 hover:bg-slate-600'
                    }`}
                    title={`Chapter ${slide.slideNumber}: ${slide.title}`}
                  />
                );
              })}
            </div>
          </div>

          <span className="text-[11px] font-mono text-slate-400 shrink-0 w-11">
            {formatTime(totalDurationSeconds)}
          </span>
        </div>

        {/* Video Control Buttons */}
        <div className="flex items-center justify-between gap-2">
          {/* Left Controls: Play, Skip, Volume, Track Info */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Previous Slide / Skip -10s */}
            <button
              onClick={handlePrevSlide}
              disabled={currentSlideIndex === 0}
              className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous Chapter"
              aria-label="Previous Chapter"
            >
              <DentalIcon name="ChevronRight" className="w-4 h-4 rotate-180" />
            </button>

            {/* Play / Pause Toggle */}
            <button
              onClick={handleTogglePlay}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all hover:scale-105 cursor-pointer"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <>
                  <DentalIcon name="ClockAlert" className="w-4 h-4 fill-slate-950" />
                  <span className="hidden sm:inline text-xs">Pause</span>
                </>
              ) : (
                <>
                  <DentalIcon name="ArrowRight" className="w-4 h-4 fill-slate-950" />
                  <span className="hidden sm:inline text-xs">Play</span>
                </>
              )}
            </button>

            {/* Next Slide / Skip +10s */}
            <button
              onClick={handleNextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Next Chapter"
              aria-label="Next Chapter"
            >
              <DentalIcon name="ChevronRight" className="w-4 h-4" />
            </button>

            {/* Current Chapter Pill */}
            <div className="hidden md:flex items-center gap-2 ml-2 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
              <span className="text-teal-400 font-mono font-bold">
                {currentSlide.slideNumber}/{totalSlides}
              </span>
              <span className="text-slate-300 font-medium truncate max-w-xs">
                {currentSlide.title}
              </span>
            </div>

            {/* Audio Wave Visualizer (pulses when speech/music is playing) */}
            {isPlaying && (
              <div className="hidden lg:flex items-center gap-1 ml-2 px-2.5 py-1 rounded-lg bg-teal-950/60 border border-teal-800/60">
                <span className="w-1 h-3 bg-teal-400 rounded-full animate-pulse" />
                <span className="w-1 h-5 bg-teal-300 rounded-full animate-pulse delay-75" />
                <span className="w-1 h-4 bg-teal-400 rounded-full animate-pulse delay-150" />
                <span className="w-1 h-2 bg-teal-300 rounded-full animate-pulse delay-100" />
                <span className="text-[10px] text-teal-300 font-medium ml-1">Voiceover Active</span>
              </div>
            )}
          </div>

          {/* Right Controls: Ambient Music, Speed, Captions, Voice Settings, Playlist, Fullscreen */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Ambient Background Music Toggle */}
            <button
              onClick={handleToggleMusic}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer border ${
                ambientMusicOn
                  ? 'bg-cyan-950/70 text-cyan-300 border-cyan-800/60'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:text-white'
              }`}
              title={ambientMusicOn ? 'Ambient Background Music: ON' : 'Ambient Music: OFF (Click to turn on)'}
            >
              <DentalIcon name="HeartPulse" className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Music {ambientMusicOn ? 'ON' : 'OFF'}</span>
            </button>

            {/* Playback Speed (0.75x, 1x, 1.25x, 1.5x) */}
            <div className="relative">
              <select
                value={playbackSpeed}
                onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2 sm:px-2.5 py-1.5 rounded-lg border border-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-500"
                title="Playback Speed"
              >
                <option value={0.75}>0.75x Speed</option>
                <option value={1.0}>1.0x Normal</option>
                <option value={1.25}>1.25x Fast</option>
                <option value={1.5}>1.5x Rapid</option>
              </select>
            </div>

            {/* Voice Settings Dropdown / Persona Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors border ${
                  showVoiceSettings
                    ? 'bg-teal-600 text-white border-teal-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
                title="Voice Settings & Speaker Options"
              >
                <DentalIcon name="UserCheck" className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden md:inline">Voice</span>
              </button>

              {/* Voice Settings Menu Popup */}
              {showVoiceSettings && (
                <div className="absolute right-0 bottom-full mb-2 w-72 bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-2xl z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="font-bold text-white">Voice & Narration Settings</span>
                    <button
                      onClick={() => setShowVoiceSettings(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* Voice Persona Presets */}
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                        Voice Style Persona:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => handlePersonaChange('warm-specialist')}
                          className={`p-1.5 rounded text-left border ${
                            voicePersona === 'warm-specialist'
                              ? 'bg-teal-950 border-teal-500 text-teal-200'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          <div className="font-semibold text-[11px]">Warm Specialist</div>
                          <div className="text-[10px] text-slate-400">Gentle & reassuring</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePersonaChange('executive')}
                          className={`p-1.5 rounded text-left border ${
                            voicePersona === 'executive'
                              ? 'bg-teal-950 border-teal-500 text-teal-200'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          <div className="font-semibold text-[11px]">Executive Director</div>
                          <div className="text-[10px] text-slate-400">Crisp & confident</div>
                        </button>
                      </div>
                    </div>

                    {/* Speech Synthesis Voice Selection */}
                    {availableVoices.length > 0 && (
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1 font-semibold">
                          System Voice:
                        </label>
                        <select
                          value={currentVoiceIndex}
                          onChange={(e) => handleVoiceChange(parseInt(e.target.value, 10))}
                          className="w-full bg-slate-950 text-slate-200 p-1.5 rounded border border-slate-800 text-xs"
                        >
                          {availableVoices.map((v, i) => (
                            <option key={i} value={i}>
                              {v.isNatural ? '★ ' : ''}
                              {v.displayName}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Web Speech API v2</span>
                      <span className="text-teal-400">Studio Narration</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Subtitles / Closed Captions Toggle (CC) */}
            <button
              onClick={() => setShowCaptions(!showCaptions)}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-mono font-bold transition-colors border ${
                showCaptions
                  ? 'bg-teal-600 text-white border-teal-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="Toggle Subtitles / Captions (C)"
            >
              CC
            </button>

            {/* Chapters Drawer Button */}
            <button
              onClick={() => setShowChaptersDrawer(!showChaptersDrawer)}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors border ${
                showChaptersDrawer
                  ? 'bg-teal-600 text-white border-teal-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Open Chapter Playlist"
            >
              <DentalIcon name="Layers" className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Chapters</span>
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={handleToggleFullscreen}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Toggle Fullscreen (F)"
              aria-label="Toggle Fullscreen"
            >
              <DentalIcon name="ExternalLink" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Full Transcript / Voiceover Script Modal */}
      {showTranscriptModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <DentalIcon name="FileText" className="w-5 h-5 text-teal-400" />
                  Complete Voiceover Narration Script
                </h3>
                <p className="text-xs text-slate-400">
                  Full audio teleprompter script for all 20 presentation slides
                </p>
              </div>
              <button
                onClick={() => setShowTranscriptModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {SLIDES_DATA.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    idx === currentSlideIndex
                      ? 'bg-teal-950/60 border-teal-500/60 text-white'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-teal-400">
                      Slide {slide.slideNumber} • {slide.title}
                    </span>
                    <button
                      onClick={() => {
                        handleJumpToSlide(idx);
                        setShowTranscriptModal(false);
                      }}
                      className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
                    >
                      Jump to this Slide →
                    </button>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed italic">
                    "{slide.voiceoverScript}"
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Apex Healthcare Digital Studio • Client Presentation
              </span>
              <button
                onClick={() => setShowTranscriptModal(false)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs"
              >
                Close Script
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Download Options Dialog Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                  <DentalIcon name="ArrowRight" className="w-5 h-5 fill-rose-400 rotate-90" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white">
                    Download Presentation Video
                  </h3>
                  <p className="text-xs text-slate-400">
                    Export high-definition video walkthrough, PowerPoint file, or voiceover script
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!isExportingVideo) setShowDownloadModal(false);
                }}
                disabled={isExportingVideo}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Option 1: In-Browser HD Video Generator (Primary) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 relative overflow-hidden">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60 mb-1">
                      <DentalIcon name="Sparkles" className="w-3 h-3 text-rose-400" />
                      <span>Instant HD Video File</span>
                    </div>
                    <h4 className="font-bold text-white text-sm">
                      Export Presentation Video (.webm / .mp4)
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Generates a complete standalone video file with 20 slides, smooth transitions, ambient music track, and narration captions.
                    </p>
                  </div>
                </div>

                {/* Resolution selector */}
                <div className="flex items-center gap-3 my-3">
                  <span className="text-xs text-slate-400 font-medium">Quality:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setVideoResolution('720p')}
                      disabled={isExportingVideo}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        videoResolution === '720p'
                          ? 'bg-teal-600 text-white border-teal-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      720p HD (Faster)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoResolution('1080p')}
                      disabled={isExportingVideo}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        videoResolution === '1080p'
                          ? 'bg-teal-600 text-white border-teal-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      1080p Full HD
                    </button>
                  </div>
                </div>

                {/* Progress bar during export */}
                {isExportingVideo ? (
                  <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-teal-500/40">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-teal-300 flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                        <span>{videoExportStatus || 'Rendering video...'}</span>
                      </span>
                      <span className="font-mono text-teal-400 font-bold">
                        {videoExportProgress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${videoExportProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleExportAndDownloadVideo}
                    type="button"
                    className="w-full mt-2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <DentalIcon name="ArrowRight" className="w-4 h-4 fill-white rotate-90" />
                    <span>Generate & Download Video File Now</span>
                  </button>
                )}
              </div>

              {/* Option 2: PowerPoint Presentation File & MP4 Video Export */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 block w-fit mb-1">
                      PowerPoint Presentation
                    </span>
                    <h4 className="font-bold text-white text-sm">
                      Download .PPTX File (Export to MP4 via PowerPoint)
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Download the editable Microsoft PowerPoint file. In PowerPoint or Keynote, you can click <strong className="text-white">File → Export → Create a Video</strong> to save as a 1080p/4K MP4 with custom timings.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDownloadPptx}
                  disabled={isDownloadingPptx}
                  type="button"
                  className="w-full mt-2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <DentalIcon name="Zap" className="w-3.5 h-3.5 text-emerald-200" />
                  <span>{isDownloadingPptx ? 'Downloading...' : 'Download PowerPoint (.PPTX)'}</span>
                </button>
              </div>

              {/* Option 3: Voiceover Audio Script */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">
                    Voiceover Narration Script (.txt)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Full audio narration text for all 20 slides, ready for voice talent or teleprompter.
                  </p>
                </div>
                <button
                  onClick={handleDownloadScriptTxt}
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shrink-0 cursor-pointer"
                >
                  Download .TXT
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Playable on VLC, Chrome, QuickTime, Windows, & Mobile
              </span>
              <button
                onClick={() => setShowDownloadModal(false)}
                disabled={isExportingVideo}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
