import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const FloatingTech3DObjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isReduced, setIsReduced] = useState(false);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.2 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsReduced(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isReduced) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      mouseX.set(normX * 10);
      mouseY.set(-normY * 8);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isReduced, mouseX, mouseY]);

  if (isReduced) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[2] overflow-hidden"
      style={{ perspective: 1200 }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
      >
        {/* Floating Paper Tag #1 - Top Right: "EDITION 2027 / LJCCA" with Washi Tape */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [3, 1.5, 3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute hidden md:block"
          style={{
            top: '16%',
            right: '8%',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(40px)',
          }}
        >
          {/* Yellow Washi Tape strip */}
          <div
            className="paper-tape"
            style={{
              top: '-12px',
              left: '25%',
              width: '60px',
              transform: 'rotate(-4deg)',
            }}
          />
          <div className="bg-[#FAF8F3] border-2 border-[#202020] p-4 rounded-sm shadow-[4px_4px_0px_#202020] w-52">
            <div className="flex justify-between items-center mb-2 pb-1 border-b border-dashed border-[#202020]/20">
              <span className="font-mono text-[10px] font-bold tracking-widest text-[#3155E7] uppercase">
                DOC.TG-27
              </span>
              <span className="w-2 h-2 rounded-full bg-[#E94B50]" />
            </div>
            <div className="font-display font-extrabold text-sm text-[#202020] leading-tight">
              7-DAY HYBRID FESTIVAL
            </div>
            <div className="font-mono text-[11px] text-[#625E56] mt-1 flex justify-between">
              <span>VASTRAPUR, AHM</span>
              <span className="font-bold text-[#FF7139]">JAN 18-24</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Origami Airplane / Dart - Center Right */}
        <motion.div
          animate={{
            x: [0, 15, 0],
            y: [0, -18, 0],
            rotate: [-8, -4, -8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute hidden lg:block"
          style={{
            top: '46%',
            right: '5%',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(65px)',
          }}
        >
          <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
            {/* Origami airplane facets with light & shadow */}
            <polygon points="10,45 100,10 70,80" fill="#3155E7" stroke="#202020" strokeWidth="2" />
            <polygon points="10,45 100,10 65,45" fill="#5373F2" stroke="#202020" strokeWidth="1.5" />
            <polygon points="10,45 65,45 70,80" fill="#1E3DBE" stroke="#202020" strokeWidth="1.5" />
            <polygon points="65,45 70,80 50,60" fill="#FFD85A" stroke="#202020" strokeWidth="1.5" />
            {/* Dashed flight fold line */}
            <line x1="5" y1="48" x2="0" y2="52" stroke="#202020" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
          <div className="paper-stamp paper-stamp-cobalt text-[9px] -mt-3 ml-2">
            ORIGAMI ENGINE
          </div>
        </motion.div>

        {/* Floating Paper Badge #2 - Bottom Left: Perforated Stamp Ticket */}
        <motion.div
          animate={{
            y: [0, 14, 0],
            rotate: [-4, -1, -4],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute hidden md:block"
          style={{
            bottom: '18%',
            left: '6%',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(35px)',
          }}
        >
          {/* Kraft tape */}
          <div
            className="paper-tape paper-tape-kraft"
            style={{
              top: '-10px',
              right: '20%',
              width: '50px',
              transform: 'rotate(6deg)',
            }}
          />
          <div className="bg-[#FAF8F3] border-2 border-[#202020] p-3.5 rounded-sm shadow-[4px_4px_0px_#FFD85A] w-48 relative">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-1.5 py-0.5 bg-[#FF7139] text-white font-mono text-[9px] font-bold rounded">
                8 TRACKS
              </span>
              <span className="font-mono text-[10px] text-[#625E56]">300+ CREATORS</span>
            </div>
            <div className="font-display font-bold text-xs text-[#202020]">
              WORKSHOPS · HACKS · SHOWCASE
            </div>
            {/* Perforated bottom cut */}
            <div className="mt-2 pt-1 border-t-2 border-dashed border-[#202020]/30 flex justify-between items-center text-[9px] font-mono text-[#625E56]">
              <span>PASS NO: #027-LJ</span>
              <span className="text-[#3155E7] font-bold">VERIFIED</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
