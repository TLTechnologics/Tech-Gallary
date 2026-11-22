import React, { useEffect, useState, useRef } from 'react';

interface TrailSpark {
  x: number;
  y: number;
  id: number;
  opacity: number;
  size: number;
}

export const CustomCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const snitchPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: -100, y: -100 });
  const [renderPos, setRenderPos] = useState({ x: -100, y: -100, bankAngle: 0 });
  const [sparks, setSparks] = useState<TrailSpark[]>([]);

  const requestRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sparkIdCounter = useRef(0);

  useEffect(() => {
    // Disable on touch devices or reduced-motion preference
    if (
      window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('.plate') ||
          target.closest('.ev') ||
          target.closest('summary') ||
          target.closest('[role="button"]') ||
          target.closest('[role="tab"]'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isVisible]);

  // Inertial physics loop using requestAnimationFrame
  useEffect(() => {
    if (isTouch) return;

    let sparkTick = 0;

    const animate = () => {
      // Calculate delta to target cursor
      const dx = mousePos.current.x - snitchPos.current.x;
      const dy = mousePos.current.y - snitchPos.current.y;

      // Spring-like easing with soft inertia
      const easeFactor = isHovered ? 0.22 : 0.16;
      snitchPos.current.x += dx * easeFactor;
      snitchPos.current.y += dy * easeFactor;

      velocity.current = {
        x: snitchPos.current.x - lastMousePos.current.x,
        y: snitchPos.current.y - lastMousePos.current.y,
      };
      lastMousePos.current = { x: snitchPos.current.x, y: snitchPos.current.y };

      // Calculate banking angle based on horizontal acceleration
      const targetBankAngle = Math.max(-28, Math.min(28, dx * 0.4));

      setRenderPos({
        x: snitchPos.current.x,
        y: snitchPos.current.y,
        bankAngle: targetBankAngle,
      });

      // Emit stardust trail while moving or scrolling
      sparkTick++;
      const speed = Math.hypot(dx, dy);
      if ((speed > 6 || isScrolling) && sparkTick % 2 === 0) {
        sparkIdCounter.current += 1;
        setSparks((prev) => [
          ...prev.slice(-10),
          {
            x: snitchPos.current.x + (Math.random() * 8 - 4),
            y: snitchPos.current.y + 4 + (Math.random() * 6 - 3),
            id: sparkIdCounter.current,
            opacity: 0.9,
            size: Math.random() * 3 + 2,
          },
        ]);
      }

      // Fade existing sparks
      setSparks((prev) =>
        prev
          .map((s) => ({ ...s, opacity: s.opacity - 0.08 }))
          .filter((s) => s.opacity > 0.05)
      );

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isTouch, isHovered, isScrolling]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* 1. Golden Stardust Trail */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="fixed pointer-events-none rounded-full z-[99998]"
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: '#FFE58F',
            opacity: spark.opacity,
            boxShadow: '0 0 6px #F3D58A, 0 0 10px #D6B36A',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.1s linear',
          }}
        />
      ))}

      {/* 2. Golden Snitch Companion Object */}
      <div
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: `${renderPos.x}px`,
          top: `${renderPos.y}px`,
          transform: `translate(-50%, -50%) rotate(${renderPos.bankAngle}deg)`,
          transition: 'transform 0.06s linear',
          filter: isHovered
            ? 'drop-shadow(0 0 12px rgba(243, 213, 138, 0.95)) drop-shadow(0 0 20px rgba(214, 179, 106, 0.7))'
            : 'drop-shadow(0 0 6px rgba(243, 213, 138, 0.7))',
        }}
      >
        <svg
          width={isHovered ? '42' : '34'}
          height={isHovered ? '26' : '22'}
          viewBox="0 0 64 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            <radialGradient id="snitchGold" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFF9D2" />
              <stop offset="35%" stopColor="#F5D77F" />
              <stop offset="70%" stopColor="#D4A843" />
              <stop offset="100%" stopColor="#7A5212" />
            </radialGradient>
            <linearGradient id="snitchWing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF0" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FCEBB6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#D4A843" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Left Wing with rapid fluttering animation */}
          <g
            style={{
              transformOrigin: '28px 18px',
              animation: isScrolling
                ? 'snitchWingFlap 0.05s infinite alternate ease-in-out'
                : isHovered
                ? 'snitchWingFlap 0.08s infinite alternate ease-in-out'
                : 'snitchWingFlap 0.12s infinite alternate ease-in-out',
            }}
          >
            <path
              d="M28 17 C 22 10, 10 7, 2 11 C 6 15, 16 19, 28 18 Z"
              fill="url(#snitchWing)"
              stroke="#FFF2B2"
              strokeWidth="0.8"
            />
            {/* Delicate wing feather spines */}
            <path d="M26 17 Q 15 13 4 12" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.8" />
            <path d="M24 17.5 Q 16 15 8 15" stroke="#F5D77F" strokeWidth="0.5" opacity="0.7" />
          </g>

          {/* Right Wing with rapid fluttering animation */}
          <g
            style={{
              transformOrigin: '36px 18px',
              animation: isScrolling
                ? 'snitchWingFlap 0.05s infinite alternate-reverse ease-in-out'
                : isHovered
                ? 'snitchWingFlap 0.08s infinite alternate-reverse ease-in-out'
                : 'snitchWingFlap 0.12s infinite alternate-reverse ease-in-out',
            }}
          >
            <path
              d="M36 17 C 42 10, 54 7, 62 11 C 58 15, 48 19, 36 18 Z"
              fill="url(#snitchWing)"
              stroke="#FFF2B2"
              strokeWidth="0.8"
            />
            {/* Delicate wing feather spines */}
            <path d="M38 17 Q 49 13 60 12" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.8" />
            <path d="M40 17.5 Q 48 15 56 15" stroke="#F5D77F" strokeWidth="0.5" opacity="0.7" />
          </g>

          {/* Golden Sphere Snitch Body */}
          <circle
            cx="32"
            cy="18"
            r="8"
            fill="url(#snitchGold)"
            stroke="#FFE899"
            strokeWidth="0.8"
          />

          {/* Ornate Swirling Filigree Inscribed into Snitch Body */}
          <path
            d="M28 15 C 30 13, 34 13, 36 15 C 34 17, 30 19, 32 22"
            stroke="#8C6016"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M27 20 C 29 21, 33 21, 35 19"
            stroke="#FFE58F"
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Specular Highlight Sparkle */}
          <circle cx="30" cy="15" r="1.8" fill="#FFFFFF" opacity="0.9" />
          <circle cx="34" cy="20" r="0.8" fill="#FFF2B2" opacity="0.7" />
        </svg>
      </div>

      <style>{`
        @keyframes snitchWingFlap {
          0% {
            transform: scaleY(1) rotate(0deg);
          }
          100% {
            transform: scaleY(-0.6) rotate(-14deg);
          }
        }
      `}</style>
    </>
  );
};
