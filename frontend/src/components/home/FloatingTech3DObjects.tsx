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
        {/* Floating Object #1 - Top Right: Hogwarts Enchanted Dispatch Pass with Wax Seal */}
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
          {/* Antique Gold Seal Ribbon */}
          <div
            className="paper-tape"
            style={{
              top: '-10px',
              left: '25%',
              width: '64px',
              transform: 'rotate(-4deg)',
            }}
          />
          <div className="bg-[#1A1626] border-2 border-[#D6B36A] p-4 rounded-sm shadow-[0_8px_25px_rgba(0,0,0,0.6),3px_3px_0px_#D6B36A] w-52">
            <div className="flex justify-between items-center mb-2 pb-1 border-b border-dashed border-[#D6B36A]/30">
              <span className="font-mono text-[10px] font-bold tracking-widest text-[#F3D58A] uppercase">
                DISPATCH // TG-27
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#762E42] border border-[#D6B36A] shadow-[0_0_6px_#762E42]" />
            </div>
            <div className="font-display font-extrabold text-sm text-[#F4EBDD] leading-tight">
              7-DAY MAGICAL FESTIVAL
            </div>
            <div className="font-mono text-[11px] text-[#C2BDCA] mt-1.5 flex justify-between">
              <span>VASTRAPUR, AHM</span>
              <span className="font-bold text-[#D6B36A]">JAN 18-24</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Object #2 - Center Right: Enchanted Golden Snitch with Shimmering Wings */}
        <motion.div
          animate={{
            x: [0, 15, 0],
            y: [0, -18, 0],
            rotate: [-6, -2, -6],
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
          <svg width="120" height="96" viewBox="0 0 120 96" fill="none">
            <defs>
              <linearGradient id="goldWing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F3D58A" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#D6B36A" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8C6F32" stopOpacity="0.2" />
              </linearGradient>
              <radialGradient id="snitchSphere" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFE485" />
                <stop offset="50%" stopColor="#D6B36A" />
                <stop offset="100%" stopColor="#8C6F32" />
              </radialGradient>
            </defs>

            {/* Left Enchanted Wing */}
            <path
              d="M52 48 C35 25, 8 20, 2 35 C15 48, 38 46, 52 48 Z"
              fill="url(#goldWing)"
              stroke="#D6B36A"
              strokeWidth="1.2"
            />
            <path d="M12 30 C25 35, 42 42, 52 48" stroke="#F3D58A" strokeWidth="0.8" opacity="0.7" />

            {/* Right Enchanted Wing */}
            <path
              d="M68 48 C85 25, 112 20, 118 35 C105 48, 82 46, 68 48 Z"
              fill="url(#goldWing)"
              stroke="#D6B36A"
              strokeWidth="1.2"
            />
            <path d="M108 30 C95 35, 78 42, 68 48" stroke="#F3D58A" strokeWidth="0.8" opacity="0.7" />

            {/* Central Golden Sphere */}
            <circle cx="60" cy="48" r="14" fill="url(#snitchSphere)" stroke="#F3D58A" strokeWidth="1.5" />
            <ellipse cx="60" cy="48" rx="13" ry="5" stroke="#FFE485" strokeWidth="1" opacity="0.7" />
            <circle cx="56" cy="44" r="3" fill="#FFFFFF" opacity="0.8" />
          </svg>
          <div className="paper-stamp text-[9px] -mt-3 ml-2 border-[#D6B36A] bg-[#1E192D] text-[#F3D58A] shadow-[0_0_8px_rgba(214,179,106,0.3)]">
            GOLDEN ENGINE
          </div>
        </motion.div>

        {/* Floating Object #3 - Bottom Left: Ancient Enchanted Scroll Pass with Burgundy Seal */}
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
          {/* Burgundy Ribbon */}
          <div
            className="paper-tape paper-tape-kraft"
            style={{
              top: '-10px',
              right: '20%',
              width: '54px',
              transform: 'rotate(6deg)',
            }}
          />
          <div className="bg-[#1A1626] border-2 border-[#D6B36A] p-3.5 rounded-sm shadow-[0_8px_25px_rgba(0,0,0,0.6),3px_3px_0px_#762E42] w-48 relative">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-1.5 py-0.5 bg-[#762E42] text-[#F4EBDD] font-mono text-[9px] font-bold rounded border border-[#D6B36A]/40">
                8 TRACKS
              </span>
              <span className="font-mono text-[10px] text-[#C2BDCA]">300+ CREATORS</span>
            </div>
            <div className="font-display font-bold text-xs text-[#F4EBDD]">
              WORKSHOPS · HACKS · SHOWCASE
            </div>
            {/* Enchanted bottom cut */}
            <div className="mt-2 pt-1 border-t-2 border-dashed border-[#D6B36A]/30 flex justify-between items-center text-[9px] font-mono text-[#C2BDCA]">
              <span>PASS NO: #027-LJ</span>
              <span className="text-[#F3D58A] font-bold">ALOHOMORA</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
