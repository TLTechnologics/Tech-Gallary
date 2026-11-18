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

    // Drifting paper fibres and confetti specks
    const particleCount = Math.min(Math.floor(width / 32), 40);
    interface PaperParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      rotation: number;
      rotSpeed: number;
      isSquare: boolean;
    }

    const particles: PaperParticle[] = [];
    const paperColors = ['#3155E7', '#FF7139', '#FFD85A', '#E94B50', '#B7A5E8', '#202020'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.2 + 0.05,
        size: Math.random() * 3.5 + 1.2,
        color: paperColors[Math.floor(Math.random() * paperColors.length)],
        alpha: Math.random() * 0.35 + 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        isSquare: Math.random() > 0.5,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Warm editorial daylight gradient
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.25,
        120,
        width * 0.5,
        height * 0.6,
        Math.max(width, height) * 0.9
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      grad.addColorStop(0.6, 'rgba(248, 245, 236, 0.4)');
      grad.addColorStop(1, 'rgba(234, 227, 213, 0.5)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle editorial dot grid (printing registration mark aesthetics)
      const gridSize = 48;
      ctx.fillStyle = 'rgba(32, 32, 32, 0.035)';
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update and draw floating paper confetti specks
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Interactive mouse avoidance
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          p.x += (dx / dist) * 1.5;
          p.y += (dy / dist) * 1.5;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.isSquare) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
};
