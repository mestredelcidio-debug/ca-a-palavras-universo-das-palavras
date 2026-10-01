/**
 * Web Audio API procedural sound synthesizer for Caça-Palavras Brasil
 * Zero external audio assets required; lightweight, immediate latency.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Sound effects restored per user request
export function playLetterTick(soundEnabled = true, volume = 0.5): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.06 * volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {}
}

export function playWordFoundChime(soundEnabled = true, volume = 0.5): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + idx * 0.07);

      gain.gain.setValueAtTime(0, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.18 * volume, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.4);
    });
  } catch {}
}

export function playVictoryFanfare(soundEnabled = true, volume = 0.5): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 659.25, d: 0.12, t: 0.12 },
      { f: 783.99, d: 0.12, t: 0.24 },
      { f: 1046.5, d: 0.35, t: 0.36 },
      { f: 880.0, d: 0.15, t: 0.72 },
      { f: 1046.5, d: 0.5, t: 0.88 }
    ];

    const now = ctx.currentTime;
    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, now + note.t);

      gain.gain.setValueAtTime(0, now + note.t);
      gain.gain.linearRampToValueAtTime(0.22 * volume, now + note.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + note.t);
      osc.stop(now + note.t + note.d + 0.01);
    });
  } catch {}
}

export function playHintSparkle(soundEnabled = true, volume = 0.5): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const freqs = [880, 1174.66, 1479.98, 1760];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.05);

      gain.gain.setValueAtTime(0.12 * volume, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.2);
    });
  } catch {}
}

export function playWrongThud(soundEnabled = true, volume = 0.5): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.1 * volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch {}
}

export function triggerHaptic(enabled = true, type: 'light' | 'medium' | 'heavy' = 'light'): void {
  if (!enabled) return;
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'light') {
        navigator.vibrate(12);
      } else if (type === 'medium') {
        navigator.vibrate([20, 30, 20]);
      } else {
        navigator.vibrate([40, 40, 60]);
      }
    } catch {
      // Ignore vibration error on non-supporting devices
    }
  }
}

// Ambient Music Engine: Ultra-calm, peaceful, warm lullaby/piano-marimba
let musicLoopInterval: any = null;
let musicMasterGain: GainNode | null = null;
let activeOscillators: OscillatorNode[] = [];

/**
 * Procedural Calm Lofi/Piano & Music Box Ambient Soundtrack
 * - Warm felt piano pad progression (Cmaj7 -> Am7 -> Fmaj7 -> G6)
 * - Soft, spaced-out kalimba/music box notes
 * - Soft low-pass warm filter (no harsh highs, zero hiss, zero static)
 * - 75 BPM slow, comforting, hypnotic rhythm
 */
export function toggleAmbientMusic(musicEnabled: boolean, volume = 0.45): void {
  if (typeof window === 'undefined') return;

  const ctx = getAudioContext();
  if (!ctx) return;

  // Stop music if disabled
  if (!musicEnabled) {
    if (musicLoopInterval) {
      clearInterval(musicLoopInterval);
      musicLoopInterval = null;
    }
    if (musicMasterGain) {
      try {
        musicMasterGain.gain.setValueAtTime(musicMasterGain.gain.value, ctx.currentTime);
        musicMasterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      } catch {}
    }
    setTimeout(() => {
      activeOscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      activeOscillators = [];
    }, 350);
    return;
  }

  // Already running
  if (musicLoopInterval) return;

  // Master warm filter and volume bus for the music
  const masterFilter = ctx.createBiquadFilter();
  masterFilter.type = 'lowpass';
  masterFilter.frequency.setValueAtTime(820, ctx.currentTime); // Eliminates all harsh/piercing high frequencies

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);

  masterFilter.connect(masterGain);
  masterGain.connect(ctx.destination);
  musicMasterGain = masterGain;

  // Soft note player (Warm Kalimba / Music Box tone)
  const playSoftBell = (freq: number, startTime: number, noteVolume = 0.028) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Velvet envelope: soft attack (35ms), gentle natural acoustic decay (2.0s)
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(noteVolume, startTime + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.0);

      osc.connect(gain);
      gain.connect(masterFilter);

      osc.start(startTime);
      osc.stop(startTime + 2.1);
      activeOscillators.push(osc);

      osc.onended = () => {
        const idx = activeOscillators.indexOf(osc);
        if (idx !== -1) activeOscillators.splice(idx, 1);
      };
    } catch {}
  };

  // Warm felt pad chord player (soft background chords)
  const playWarmPad = (frequencies: number[], startTime: number, duration: number, padVolume = 0.012) => {
    frequencies.forEach(freq => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        // Very slow, soft swell and fade (zero clicks, zero harshness)
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(padVolume, startTime + 1.2);
        gain.gain.setValueAtTime(padVolume, startTime + duration - 1.5);
        gain.gain.linearRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(masterFilter);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
        activeOscillators.push(osc);

        osc.onended = () => {
          const idx = activeOscillators.indexOf(osc);
          if (idx !== -1) activeOscillators.splice(idx, 1);
        };
      } catch {}
    });
  };

  // 4 peaceful, relaxing chords (6.4 seconds each = 25.6s loop)
  // Cmaj7 -> Am7 -> Fmaj7 -> G6
  const scheduleLoop = () => {
    const now = ctx.currentTime;
    const beat = 0.8; // 75 BPM

    // Bar 1-2: Cmaj7 (C3, G3, B3, E4)
    playWarmPad([130.81, 196.00, 246.94, 329.63], now, beat * 8);
    playSoftBell(392.00, now + beat * 0);     // G4
    playSoftBell(329.63, now + beat * 2);     // E4
    playSoftBell(493.88, now + beat * 4);     // B4
    playSoftBell(392.00, now + beat * 6);     // G4

    // Bar 3-4: Am7 (A2, E3, G3, C4)
    playWarmPad([110.00, 164.81, 196.00, 261.63], now + beat * 8, beat * 8);
    playSoftBell(440.00, now + beat * 8);     // A4
    playSoftBell(329.63, now + beat * 10);    // E4
    playSoftBell(392.00, now + beat * 12);    // G4
    playSoftBell(261.63, now + beat * 14);    // C4

    // Bar 5-6: Fmaj7 (F2, C3, E3, A3)
    playWarmPad([87.31, 130.81, 164.81, 220.00], now + beat * 16, beat * 8);
    playSoftBell(349.23, now + beat * 16);    // F4
    playSoftBell(440.00, now + beat * 18);    // A4
    playSoftBell(523.25, now + beat * 20);    // C5
    playSoftBell(329.63, now + beat * 22);    // E4

    // Bar 7-8: G6 / G (G2, D3, G3, B3)
    playWarmPad([98.00, 146.83, 196.00, 246.94], now + beat * 24, beat * 8);
    playSoftBell(293.66, now + beat * 24);    // D4
    playSoftBell(392.00, now + beat * 26);    // G4
    playSoftBell(440.00, now + beat * 28);    // A4
    playSoftBell(493.88, now + beat * 30);    // B4
  };

  scheduleLoop();
  // 32 beats * 0.8s = 25.6 seconds per loop
  musicLoopInterval = setInterval(scheduleLoop, 25600);
}
