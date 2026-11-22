import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';

export const MagicalAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  // Magical Scale Frequencies (Mystical Dorian Mode: D3, F3, A3, C4, D4, E4, F4, A4, C5, D5, E5, F#5)
  const CHIME_NOTES = [220, 261.63, 293.66, 329.63, 349.23, 440, 523.25, 587.33, 659.25, 739.99, 880];

  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  };

  const playChimeNote = (freq: number) => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master || !isPlayingRef.current) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, ctx.currentTime);

      // Bell-like strike and long magical resonance
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      osc.start(now);
      osc.stop(now + 4.0);
    } catch (e) {
      // Audio node cleanup
    }
  };

  const startAtmosphericDrones = () => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    try {
      // 1. Deep Mysterious Pad Drone (Root 73.4Hz + 110Hz D2/A2)
      [73.4, 110, 146.8].forEach((freq) => {
        const droneOsc = ctx.createOscillator();
        const droneGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        droneOsc.type = 'triangle';
        droneOsc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        droneGain.gain.setValueAtTime(0, ctx.currentTime);
        droneGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 3);

        droneOsc.connect(filter);
        filter.connect(droneGain);
        droneGain.connect(master);

        droneOsc.start();
      });

      // 2. Periodic Magical Chimes Arpeggiator (Every 2.4 - 4.5 seconds)
      const chimeLoop = () => {
        if (!isPlayingRef.current) return;
        const note = CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)];
        playChimeNote(note);

        // Occasionally play a second harmonizing chime
        if (Math.random() > 0.5) {
          setTimeout(() => {
            if (isPlayingRef.current) {
              const harmony = CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)];
              playChimeNote(harmony);
            }
          }, 350);
        }

        const nextTime = Math.random() * 2600 + 2200;
        const timeout = setTimeout(chimeLoop, nextTime);
        intervalsRef.current.push(timeout);
      };

      chimeLoop();
    } catch (e) {
      console.warn('Audio synthesis notice:', e);
    }
  };

  const toggleSound = () => {
    initAudio();
    if (!audioCtxRef.current) return;

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      intervalsRef.current.forEach(clearTimeout);
      intervalsRef.current = [];
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
      }
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      setHasInteracted(true);
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(volume, audioCtxRef.current.currentTime + 1.2);
      }
      startAtmosphericDrones();
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    // Handle first user interaction on the page to unlock audio context cleanly
    const onFirstUserClick = () => {
      setHasInteracted(true);
      window.removeEventListener('click', onFirstUserClick);
    };
    window.addEventListener('click', onFirstUserClick, { once: true });

    return () => {
      intervalsRef.current.forEach(clearTimeout);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
      window.removeEventListener('click', onFirstUserClick);
    };
  }, []);

  return (
    <div className="relative inline-flex items-center">
      {/* Audio Toggle Button with Ambient Soundwave */}
      <button
        type="button"
        onClick={toggleSound}
        onMouseEnter={() => setShowVolumeSlider(true)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border transition-all duration-300 font-mono text-xs cursor-pointer select-none ${
          isPlaying
            ? 'bg-gradient-to-r from-[#762E42] to-[#451221] border-[#F3D58A] text-[#F3D58A] shadow-[0_0_14px_rgba(243,213,138,0.4)]'
            : 'bg-[#181326] border-[#D6B36A]/50 text-[#C2BDCA] hover:text-[#F4EBDD] hover:border-[#D6B36A]'
        }`}
        title={isPlaying ? 'Mute Hogwarts Ambience' : 'Play Hogwarts Ambience'}
        aria-label="Toggle Hogwarts Ambience"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#F3D58A] animate-pulse" />
            <span className="hidden sm:inline font-bold">AMBIENCE ON</span>
            {/* Animated sound waves */}
            <div className="flex items-end gap-0.5 h-3 ml-1">
              <span className="w-0.5 h-2 bg-[#F3D58A] animate-bounce" style={{ animationDuration: '0.6s' }} />
              <span className="w-0.5 h-3 bg-[#D6B36A] animate-bounce" style={{ animationDuration: '0.8s', animationDelay: '0.2s' }} />
              <span className="w-0.5 h-1.5 bg-[#FFE27A] animate-bounce" style={{ animationDuration: '0.7s', animationDelay: '0.4s' }} />
            </div>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#D6B36A]" />
            <span className="hidden sm:inline font-medium">SOUND</span>
          </>
        )}
      </button>

      {/* Popout Volume Control Slider */}
      {showVolumeSlider && isPlaying && (
        <div
          onMouseLeave={() => setShowVolumeSlider(false)}
          className="absolute top-full mt-2 right-0 p-3 bg-[#1A1428] border-2 border-[#D6B36A] rounded-sm shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(214,179,106,0.3)] z-50 flex items-center gap-2 min-w-[140px]"
        >
          <Music className="w-3.5 h-3.5 text-[#F3D58A] flex-shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-full accent-[#D6B36A] cursor-pointer h-1.5 bg-[#0F0A1C] rounded-full"
            aria-label="Volume slider"
          />
        </div>
      )}
    </div>
  );
};
