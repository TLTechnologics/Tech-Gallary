import React, { useEffect, useRef } from 'react';

export const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle twinkling stars in the midnight firmament
    const starCount = 60;
    interface Star {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      phase: number;
      speed: number;
    }
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.75,
        size: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    // Floating magical golden stardust & enchanted embers
    const particleCount = Math.min(Math.floor(width / 36), 45);
    interface MagicalParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      glowColor: string;
      alpha: number;
      phase: number;
      pulseSpeed: number;
    }

    const particles: MagicalParticle[] = [];
    const magicColors = [
      { fill: '#F3D58A', glow: 'rgba(243, 213, 138, 0.45)' }, // Magical Gold
      { fill: '#D6B36A', glow: 'rgba(214, 179, 106, 0.4)' },  // Antique Gold
      { fill: '#E9D9B5', glow: 'rgba(233, 217, 181, 0.35)' }, // Parchment Starlight
      { fill: '#8E3850', glow: 'rgba(142, 56, 80, 0.3)' },    // Enchanted Burgundy
      { fill: '#2E7356', glow: 'rgba(46, 115, 86, 0.3)' },    // Emerald Spark
    ];

    for (let i = 0; i < particleCount; i++) {
      const col = magicColors[Math.floor(Math.random() * magicColors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: - (Math.random() * 0.35 + 0.12), // Gently rise like candlelit embers
        size: Math.random() * 2.8 + 1.2,
        color: col.fill,
        glowColor: col.glow,
        alpha: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.015,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Deep Hogwarts Midnight Sky Radial Atmosphere
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.25,
        80,
        width * 0.5,
        height * 0.6,
        Math.max(width, height) * 0.95
      );
      grad.addColorStop(0, 'rgba(21, 24, 42, 0.55)');   // Hogwarts Navy
      grad.addColorStop(0.5, 'rgba(16, 13, 24, 0.7)');   // Midnight Wizard Black
      grad.addColorStop(1, 'rgba(11, 9, 18, 0.85)');     // Deep Castle Dark
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.phase += s.speed;
        const currentAlpha = s.baseAlpha + Math.sin(s.phase) * 0.25;
        if (currentAlpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
          ctx.fillStyle = '#F4EBDD';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Subtle celestial constellation grid marks
      const gridSize = 56;
      ctx.fillStyle = 'rgba(214, 179, 106, 0.035)';
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update and draw floating magical stardust particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += p.pulseSpeed;
        p.x += p.vx;
        p.y += p.vy;

        // Subtle gentle drift
        p.vx += (Math.random() - 0.5) * 0.015;
        p.vx = Math.max(-0.4, Math.min(0.4, p.vx));

        // Soft interaction with cursor
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Wrap around borders
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Pulsing glow alpha
        const pulse = 0.75 + Math.sin(p.phase) * 0.25;
        const renderAlpha = Math.max(0.1, Math.min(1, p.alpha * pulse));

        ctx.save();
        ctx.globalAlpha = renderAlpha;

        // Magical soft aura
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glowGrad.addColorStop(0, p.glowColor);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core bright spark
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
};
