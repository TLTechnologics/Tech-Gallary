import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Trajectory {
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  rotate: number;
  flip: boolean;
  duration: number;
}

const TRAJECTORIES: Trajectory[] = [
  {
    startX: '-20vw',
    startY: '75vh',
    endX: '120vw',
    endY: '15vh',
    rotate: -18,
    flip: false,
    duration: 5.5,
  },
  {
    startX: '120vw',
    startY: '25vh',
    endX: '-25vw',
    endY: '60vh',
    rotate: 15,
    flip: true,
    duration: 6.2,
  },
  {
    startX: '-25vw',
    startY: '35vh',
    endX: '125vw',
    endY: '45vh',
    rotate: -6,
    flip: false,
    duration: 7.0,
  },
];

export const FlyingBroomstickOverlay: React.FC = () => {
  const [activeFlyBy, setActiveFlyBy] = useState<{ id: number; trajectory: Trajectory } | null>(null);

  useEffect(() => {
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let flightCount = 0;

    // Trigger initial fly-by after 7 seconds, then every 28-40 seconds
    const scheduleNextFlight = (delayMs: number) => {
      return setTimeout(() => {
        flightCount += 1;
        const traj = TRAJECTORIES[flightCount % TRAJECTORIES.length];
        setActiveFlyBy({ id: flightCount, trajectory: traj });

        // End flight and schedule next
        setTimeout(() => {
          setActiveFlyBy(null);
          const nextInterval = Math.floor(Math.random() * 12000 + 26000); // 26-38s
          scheduleNextFlight(nextInterval);
        }, traj.duration * 1000 + 500);
      }, delayMs);
    };

    const timer = scheduleNextFlight(7000);
    return () => clearTimeout(timer);
  }, []);

  if (!activeFlyBy) return null;

  const { trajectory } = activeFlyBy;

  return (
    <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
      <motion.div
        key={activeFlyBy.id}
        initial={{
          x: trajectory.startX,
          y: trajectory.startY,
          rotate: trajectory.rotate,
          scale: 0.9,
          opacity: 0,
        }}
        animate={{
          x: trajectory.endX,
          y: trajectory.endY,
          rotate: trajectory.rotate,
          scale: 1,
          opacity: [0, 0.95, 0.95, 0],
        }}
        transition={{
          duration: trajectory.duration,
          ease: [0.3, 0.1, 0.3, 1],
        }}
        className="absolute w-52 h-28 filter drop-shadow-[0_0_16px_rgba(243,213,138,0.55)]"
        style={{
          transform: trajectory.flip ? 'scaleX(-1)' : 'none',
        }}
      >
        <svg
          viewBox="0 0 280 120"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="overlayHandle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A2511" />
              <stop offset="45%" stopColor="#87471D" />
              <stop offset="100%" stopColor="#301509" />
            </linearGradient>
            <linearGradient id="overlayBristles" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#C49A45" />
              <stop offset="50%" stopColor="#825C1C" />
              <stop offset="100%" stopColor="#4A320A" />
            </linearGradient>
            <linearGradient id="overlayGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#D6B36A" />
              <stop offset="100%" stopColor="#8C6E2D" />
            </linearGradient>
          </defs>

          {/* Golden Stardust Embers trailing behind */}
          <circle cx="20" cy="72" r="3.5" fill="#FFE27A" opacity="0.9" />
          <circle cx="5" cy="80" r="2.5" fill="#F3D58A" opacity="0.8" />
          <circle cx="-15" cy="85" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="-35" cy="90" r="2" fill="#D6B36A" opacity="0.7" />
          <circle cx="-55" cy="95" r="3" fill="#FFE27A" opacity="0.6" />

          {/* Bristles */}
          <path
            d="M10 75 C 25 55, 60 52, 95 62 C 90 75, 85 85, 95 90 C 65 98, 25 95, 10 75 Z"
            fill="url(#overlayBristles)"
          />
          {/* Gold Bands */}
          <rect x="92" y="62" width="7" height="28" rx="2" fill="url(#overlayGold)" stroke="#FFE27A" strokeWidth="0.8" />

          {/* Wooden Handle */}
          <path
            d="M95 76 C 140 70, 190 60, 245 42 C 255 39, 265 38, 270 40 C 272 41, 272 44, 268 46 C 215 67, 160 78, 105 80 Z"
            fill="url(#overlayHandle)"
            stroke="#261005"
            strokeWidth="0.8"
          />
          {/* Handle highlight */}
          <path
            d="M110 75 C 150 68, 200 58, 255 42"
            stroke="#E8A870"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Stirrups */}
          <path d="M150 72 L142 88 L148 90" stroke="url(#overlayGold)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Wizard Silhouette Cloak Flutter */}
          <path
            d="M150 42 C 160 25, 175 24, 185 32 C 190 36, 188 44, 180 50 C 165 60, 148 62, 135 60 C 120 58, 105 50, 95 44 C 115 45, 135 48, 150 42 Z"
            fill="#090614"
            opacity="0.95"
          />
          <path d="M172 26 L186 28 L196 6 L180 18 Z" fill="#06040E" />
        </svg>
      </motion.div>
    </div>
  );
};
