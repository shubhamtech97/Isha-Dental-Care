/**
 * Web Speech & Ambient Audio Engine for Video Presentation
 * Provides studio-quality voice-over narration and soothing healthcare background music
 */

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  displayName: string;
  lang: string;
  isNatural: boolean;
}

export type VoicePersona = 'warm-specialist' | 'executive' | 'neutral';

class SpeechVoiceoverEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioCtx: AudioContext | null = null;
  private ambientGainNode: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: any = null;

  public availableVoices: VoiceOption[] = [];
  public selectedVoiceIndex: number = 0;
  public rate: number = 1.0;
  public pitch: number = 1.0;
  public voiceVolume: number = 1.0;
  public musicVolume: number = 0.08; // subtle 8% background music
  public isMusicEnabled: boolean = true;
  public isVoiceEnabled: boolean = true;

  // Callbacks
  public onStart?: () => void;
  public onEnd?: () => void;
  public onError?: (error: any) => void;
  public onBoundary?: (charIndex: number, text: string) => void;
  public onVoicesLoaded?: (voices: VoiceOption[]) => void;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();

      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  public loadVoices(): VoiceOption[] {
    if (!this.synth) return [];
    const systemVoices = this.synth.getVoices();
    if (!systemVoices || systemVoices.length === 0) return [];

    // Filter and rank English voices first, then others
    const englishVoices = systemVoices.filter((v) => v.lang.startsWith('en'));
    const voicesToUse = englishVoices.length > 0 ? englishVoices : systemVoices;

    this.availableVoices = voicesToUse.map((v) => {
      const isNatural =
        v.name.includes('Natural') ||
        v.name.includes('Google') ||
        v.name.includes('Samantha') ||
        v.name.includes('Daniel') ||
        v.name.includes('Karen') ||
        v.name.includes('Jenny') ||
        v.name.includes('Guy') ||
        v.name.includes('Aria') ||
        v.name.includes('Premium');

      return {
        voice: v,
        displayName: `${v.name} (${v.lang})`,
        lang: v.lang,
        isNatural,
      };
    });

    // Sort so natural and high-quality voices appear first
    this.availableVoices.sort((a, b) => {
      if (a.isNatural && !b.isNatural) return -1;
      if (!a.isNatural && b.isNatural) return 1;
      return a.displayName.localeCompare(b.displayName);
    });

    // Default select first natural voice or default
    const bestIndex = this.availableVoices.findIndex((v) => v.isNatural);
    if (bestIndex !== -1 && this.selectedVoiceIndex === 0) {
      this.selectedVoiceIndex = bestIndex;
    }

    if (this.onVoicesLoaded) {
      this.onVoicesLoaded(this.availableVoices);
    }

    return this.availableVoices;
  }

  public setVoicePersona(persona: VoicePersona) {
    if (this.availableVoices.length === 0) return;

    if (persona === 'warm-specialist') {
      // Prefer female or soothing voice
      const idx = this.availableVoices.findIndex(
        (v) =>
          v.voice.name.toLowerCase().includes('samantha') ||
          v.voice.name.toLowerCase().includes('karen') ||
          v.voice.name.toLowerCase().includes('jenny') ||
          v.voice.name.toLowerCase().includes('victoria') ||
          v.voice.name.toLowerCase().includes('female')
      );
      if (idx !== -1) {
        this.selectedVoiceIndex = idx;
        this.pitch = 1.05;
        this.rate = 0.98;
      }
    } else if (persona === 'executive') {
      // Prefer authoritative deep or clear voice
      const idx = this.availableVoices.findIndex(
        (v) =>
          v.voice.name.toLowerCase().includes('daniel') ||
          v.voice.name.toLowerCase().includes('guy') ||
          v.voice.name.toLowerCase().includes('natural') ||
          v.voice.name.toLowerCase().includes('male') ||
          v.voice.name.toLowerCase().includes('google')
      );
      if (idx !== -1) {
        this.selectedVoiceIndex = idx;
        this.pitch = 0.95;
        this.rate = 1.0;
      }
    } else {
      this.pitch = 1.0;
      this.rate = 1.0;
    }
  }

  public speak(
    text: string,
    options?: {
      onEnd?: () => void;
      onBoundary?: (charIndex: number) => void;
    }
  ) {
    this.stopVoice();

    if (!this.synth) {
      options?.onEnd?.();
      return;
    }

    if (!this.isVoiceEnabled) {
      // Simulate speech duration if voice is disabled
      const words = text.split(' ').length;
      const durationMs = Math.max(3000, (words / (140 * this.rate)) * 60 * 1000);
      const timer = setTimeout(() => {
        options?.onEnd?.();
        this.onEnd?.();
      }, durationMs);
      this.currentUtterance = { timer } as any;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.availableVoices[this.selectedVoiceIndex]) {
      utterance.voice = this.availableVoices[this.selectedVoiceIndex].voice;
    }

    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = this.voiceVolume;

    utterance.onstart = () => {
      this.onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      options?.onEnd?.();
      this.onEnd?.();
    };

    utterance.onerror = (e) => {
      // If cancelled deliberately, don't trigger error
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      console.warn('SpeechSynthesis error:', e);
      this.currentUtterance = null;
      options?.onEnd?.();
      this.onError?.(e);
    };

    utterance.onboundary = (e) => {
      if (e.charIndex !== undefined) {
        options?.onBoundary?.(e.charIndex);
        this.onBoundary?.(e.charIndex, text);
      }
    };

    this.currentUtterance = utterance;

    // Chrome bug workaround: resume if paused
    if (this.synth.paused) {
      this.synth.resume();
    }

    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
    this.pauseAmbientMusic();
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
    if (this.isMusicEnabled) {
      this.startAmbientMusic();
    }
  }

  public stopVoice() {
    if (this.currentUtterance && (this.currentUtterance as any).timer) {
      clearTimeout((this.currentUtterance as any).timer);
      this.currentUtterance = null;
    }
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public stopAll() {
    this.stopVoice();
    this.stopAmbientMusic();
  }

  // --- AMBIENT CLINIC BACKGROUND MUSIC (Web Audio API) ---
  public startAmbientMusic() {
    if (!this.isMusicEnabled || this.isMusicPlaying) return;

    try {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.ambientGainNode = this.audioCtx.createGain();
      this.ambientGainNode.gain.setValueAtTime(
        this.musicVolume,
        this.audioCtx.currentTime
      );
      this.ambientGainNode.connect(this.audioCtx.destination);

      this.isMusicPlaying = true;
      this.playAmbientChordProgression();
    } catch (err) {
      console.warn('Could not start ambient music:', err);
    }
  }

  private playAmbientChordProgression() {
    if (!this.audioCtx || !this.ambientGainNode || !this.isMusicPlaying) return;

    // Soothing healthcare chords: Fmaj9 -> Cmaj7 -> Am9 -> Gsus4
    // Frequencies (Hz) for soft acoustic pads
    const chords = [
      [174.61, 220.0, 261.63, 329.63, 392.0], // Fmaj9
      [130.81, 196.0, 246.94, 329.63, 392.0], // Cmaj7
      [220.0, 261.63, 329.63, 392.0, 440.0],  // Am9
      [196.0, 261.63, 293.66, 392.0, 440.0],  // Gsus4
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!this.audioCtx || !this.ambientGainNode || !this.isMusicPlaying) return;
      const now = this.audioCtx.currentTime;
      const notes = chords[chordIdx];
      chordIdx = (chordIdx + 1) % chords.length;

      // Create soft low-pass filtered oscillators for lush warm tone
      notes.forEach((freq) => {
        if (!this.audioCtx || !this.ambientGainNode) return;
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        // Warm sine + low triangle
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(550, now); // Warm spa / medical tone

        // Smooth 6-second slow attack and decay
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.04, now + 1.8);
        noteGain.gain.linearRampToValueAtTime(0, now + 5.8);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.ambientGainNode);

        osc.start(now);
        osc.stop(now + 6.0);
      });
    };

    playChord();
    this.musicInterval = setInterval(() => {
      if (this.isMusicPlaying) {
        playChord();
      }
    }, 5500);
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.ambientGainNode && this.audioCtx) {
      this.ambientGainNode.gain.setValueAtTime(
        this.musicVolume,
        this.audioCtx.currentTime
      );
    }
  }

  public setVoiceVolume(vol: number) {
    this.voiceVolume = Math.max(0, Math.min(1, vol));
    if (this.currentUtterance) {
      this.currentUtterance.volume = this.voiceVolume;
    }
  }

  public pauseAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.audioCtx && this.audioCtx.state === 'running') {
      this.audioCtx.suspend();
    }
  }

  public stopAmbientMusic() {
    this.pauseAmbientMusic();
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch (e) {}
      this.audioCtx = null;
      this.ambientGainNode = null;
    }
  }
}

export const speechEngine = new SpeechVoiceoverEngine();
