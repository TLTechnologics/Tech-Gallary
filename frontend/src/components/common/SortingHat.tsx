import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, MessageSquare, X, Sparkles, RefreshCw } from 'lucide-react';

const SORTING_HAT_DIALOGUES = [
  "Ahhh... another curious mind arrives at Tech Wizard 2027!",
  "Difficult... very difficult. Plenty of courage, I see. Not a bad mind either!",
  "There's talent, oh my goodness, yes — a thirst to build and engineer extraordinary things!",
  "Curiosity is the true beginning of every great technological invention!",
  "Where shall we place you? Gryffindor for the 24-hour Hackathon, or Ravenclaw for Systems Architecture?",
  "I sense tremendous ambition for the National Tech Showcase! Over 60 student prototypes await!",
  "Into the Potions Lab with you! Hands-on embedded systems and AI models await your craft!",
  "Step forward, innovator! Are you ready to discover your magical engineering potential?",
  "Better be... TECH WIZARD 2027!"
];

export const SortingHat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentDialogue = SORTING_HAT_DIALOGUES[currentQuoteIndex];

  // Speak dialogue using Web Speech Synthesis API
  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthRef.current = utterance;

    // Pick a rich, deep, expressive English voice if available
    const voices = window.speechSynthesis.getVoices();
    const deepVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('David') ||
          v.name.includes('George') ||
          v.name.includes('Male') ||
          v.name.includes('Natural') ||
          v.name.includes('UK English'))
    );
    if (deepVoice) utterance.voice = deepVoice;

    // Theatrical, wise Sorting Hat tone
    utterance.pitch = 0.78; // Deep, ancient resonance
    utterance.rate = 0.92;  // Theatrical cadence
    utterance.volume = 0.85;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleNextDialogue = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentQuoteIndex + 1) % SORTING_HAT_DIALOGUES.length;
    setCurrentQuoteIndex(nextIdx);
    speakText(SORTING_HAT_DIALOGUES[nextIdx]);
  };

  // Initial welcome on user interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      // First welcome
      speakText(SORTING_HAT_DIALOGUES[0]);
    }, 2800);

    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [voiceEnabled]);

  return (
    <div className="fixed bottom-6 right-6 z-[9000] flex flex-col items-end select-none pointer-events-auto">
      {/* 1. Speech Bubble Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 max-w-[320px] sm:max-w-[360px] p-4 sm:p-5 rounded-sm border-2 border-[#D6B36A] bg-gradient-to-b from-[#211812] to-[#140F18] shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(214,179,106,0.3)] relative text-[#F4EBDD]"
          >
            {/* Crimson Wax Seal on Speech Bubble */}
            <div className="absolute -top-3 left-6 px-3 py-0.5 bg-gradient-to-r from-[#762E42] to-[#451221] border border-[#F3D58A] shadow-[0_2px_6px_rgba(0,0,0,0.6)] rounded-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F3D58A] shadow-[0_0_6px_#F3D58A]" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#F3D58A] font-bold">
                THE SORTING HAT SPEAKS
              </span>
            </div>

            {/* Bubble Action Controls */}
            <div className="flex items-center justify-between border-b border-dashed border-[#D6B36A]/30 pb-2.5 mb-3 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#D6B36A] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#F3D58A]" />
                <span>Hogwarts Oracle</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (voiceEnabled) {
                      window.speechSynthesis?.cancel();
                      setIsSpeaking(false);
                    }
                    setVoiceEnabled(!voiceEnabled);
                  }}
                  className="p-1 text-[#C2BDCA] hover:text-[#F3D58A] transition-colors"
                  title={voiceEnabled ? 'Mute Hat Voice' : 'Enable Hat Voice'}
                  aria-label="Toggle voice"
                >
                  {voiceEnabled ? <Volume2 size={14} className="text-[#F3D58A]" /> : <VolumeX size={14} />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-[#C2BDCA] hover:text-[#E63946] transition-colors"
                  title="Minimize"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Speech Dialogue Text */}
            <p className="font-body text-xs sm:text-sm text-[#F4EBDD] leading-relaxed mb-4 font-medium italic">
              "{currentDialogue}"
            </p>

            {/* Talk to Hat Action Button */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleNextDialogue}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm font-mono text-xs font-bold text-[#100D18] bg-gradient-to-r from-[#D6B36A] to-[#F3D58A] border border-[#FFE27A] shadow-[0_0_12px_rgba(214,179,106,0.35)] hover:shadow-[0_0_20px_rgba(243,213,138,0.6)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <RefreshCw size={12} className={isSpeaking ? 'animate-spin' : ''} />
                <span>Consult Hat</span>
              </button>

              <span className="font-mono text-[10px] text-[#C2BDCA]/70">
                {currentQuoteIndex + 1} of {SORTING_HAT_DIALOGUES.length}
              </span>
            </div>

            {/* Bottom Tail Arrow pointing down to hat */}
            <div className="absolute -bottom-2 right-12 w-4 h-4 bg-[#140F18] border-r-2 border-b-2 border-[#D6B36A] transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Interactive Animated Sorting Hat Character */}
      <motion.div
        animate={{
          y: isSpeaking ? [0, -6, 2, -4, 0] : [0, -8, 0],
          rotate: isSpeaking ? [-2, 3, -3, 2, 0] : [-1, 2, -1],
        }}
        transition={{
          duration: isSpeaking ? 1.4 : 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
            speakText(currentDialogue);
          } else {
            handleNextDialogue();
          }
        }}
        className="relative w-24 h-24 sm:w-28 sm:h-28 cursor-pointer filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform"
        title="Click to talk with the Sorting Hat!"
        role="button"
        tabIndex={0}
        aria-label="Talk to the Sorting Hat"
      >
        {/* Subtle Ambient Magical Stardust Glow behind Hat */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-60 pointer-events-none"
          style={{
            background: isSpeaking 
              ? 'radial-gradient(circle, #F3D58A 0%, #762E42 50%, transparent 80%)'
              : 'radial-gradient(circle, rgba(214,179,106,0.5) 0%, transparent 75%)',
          }}
        />

        {/* Detailed Characterful SVG of the Sorting Hat */}
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hatLeather" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A2F1B" />
              <stop offset="40%" stopColor="#2E1C0F" />
              <stop offset="85%" stopColor="#1A0F07" />
              <stop offset="100%" stopColor="#0F0904" />
            </linearGradient>
            <linearGradient id="hatFold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1C1008" />
              <stop offset="50%" stopColor="#5E3C22" />
              <stop offset="100%" stopColor="#1A0E06" />
            </linearGradient>
            <radialGradient id="hatEyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="60%" stopColor="#D6B36A" />
              <stop offset="100%" stopColor="#1A0F07" />
            </radialGradient>
          </defs>

          {/* Broad, Crumpled Leather Brim */}
          <path
            d="M 12 140 C 25 125, 70 128, 148 138 C 158 140, 150 152, 120 155 C 60 160, 20 155, 12 140 Z"
            fill="url(#hatLeather)"
            stroke="#120A04"
            strokeWidth="1.5"
          />
          {/* Brim Underside Shadow */}
          <path
            d="M 22 144 C 45 138, 95 140, 138 145"
            stroke="#0A0603"
            strokeWidth="2.5"
            opacity="0.8"
          />

          {/* Conical Twisted Cone with Folds and Creases */}
          <path
            d="M 32 135 C 38 105, 45 80, 56 60 C 65 42, 70 25, 82 8 C 86 3, 94 4, 95 10 C 96 22, 90 35, 96 50 C 104 70, 116 100, 128 135 C 105 132, 55 130, 32 135 Z"
            fill="url(#hatLeather)"
            stroke="#150B05"
            strokeWidth="1.5"
          />

          {/* Curved Twisted Tip with Crook */}
          <path
            d="M 82 8 C 86 2, 96 4, 98 12 C 102 24, 88 28, 92 40"
            stroke="#6B4527"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Stitched Leather Patch at Mid-Crown */}
          <rect
            x="48"
            y="65"
            width="18"
            height="14"
            rx="2"
            fill="#3B2211"
            stroke="#D6B36A"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            transform="rotate(-8 48 65)"
          />

          {/* Furrowed Brow Crease (Upper Face Fold) */}
          <path
            d="M 44 88 C 58 78, 85 78, 112 86"
            stroke="#100904"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 45 86 C 58 76, 85 76, 111 84"
            stroke="#634024"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Eye Slits (Creased Folds with Deep Glowing Soul Inside) */}
          {/* Left Eye */}
          <g>
            <path
              d="M 52 94 C 58 90, 68 91, 72 95 C 68 97, 58 97, 52 94 Z"
              fill="url(#hatEyeGlow)"
              opacity={isSpeaking ? 0.95 : 0.8}
            />
            <path d="M 50 93 Q 62 89 74 95" stroke="#0D0703" strokeWidth="2.5" />
          </g>

          {/* Right Eye */}
          <g>
            <path
              d="M 86 95 C 92 91, 102 91, 108 94 C 102 97, 94 97, 86 95 Z"
              fill="url(#hatEyeGlow)"
              opacity={isSpeaking ? 0.95 : 0.8}
            />
            <path d="M 84 94 Q 96 90 110 93" stroke="#0D0703" strokeWidth="2.5" />
          </g>

          {/* Speaking Mouth (The Famous Deep Leather Fissure) */}
          <motion.path
            d={
              isSpeaking
                ? "M 42 118 Q 78 136 116 116 C 104 126, 60 128, 42 118 Z"
                : "M 44 116 Q 78 126 114 114"
            }
            fill={isSpeaking ? "#080402" : "none"}
            stroke="#0C0703"
            strokeWidth={isSpeaking ? "3" : "4.5"}
            strokeLinecap="round"
            transition={{ duration: 0.15 }}
          />

          {/* Speaking Lower Lip Crease Highlight */}
          <path
            d="M 48 120 Q 78 130 110 118"
            stroke="#59371E"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>

        {/* Small floating prompt indicator if bubble minimized */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 p-1 rounded-full bg-[#762E42] border border-[#F3D58A] shadow-[0_0_8px_#F3D58A] text-[#F3D58A] animate-pulse">
            <MessageSquare size={12} />
          </div>
        )}
      </motion.div>
    </div>
  );
};
