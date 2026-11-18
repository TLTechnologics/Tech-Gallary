import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { Hero3DScene } from './Hero3DScene';
import { FloatingTech3DObjects } from './FloatingTech3DObjects';
import { MagneticButton } from '../common/MagneticButton';

interface HeroProps {
  onOpenSubmission?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(2027, 0, 18, 9, 0, 0).getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-between items-center pt-28 pb-14 px-4 sm:px-6 md:px-8 overflow-hidden bg-[#F8F5EC]"
      id="top"
    >
      {/* 1. Full-Screen Interactive 3D Origami Paper Sculpture */}
      <Hero3DScene />

      {/* 2. Floating 3D Paper Cutouts & Origami Darts */}
      <FloatingTech3DObjects />

      {/* Architectural Paper Background Illumination & Grids */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] pointer-events-none rounded-full blur-[140px] opacity-40 z-0"
        style={{
          background: 'radial-gradient(circle, #FAF8F2 0%, #F2EBDD 60%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Construction Paper Guidelines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#202020 1px, transparent 1px), linear-gradient(90deg, #202020 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* TOP EDITORIAL METRICS & STAMPS STRIP */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#625E56]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2.5px_2.5px_0px_#202020]"
        >
          <span className="w-2 h-2 rounded-full bg-[#E94B50]" />
          <span className="text-[#202020] font-bold">VOL. 04 // EXHIBITION</span>
          <span className="text-[#625E56]/40">|</span>
          <span className="text-[#3155E7] font-semibold">LJCCA CAMPUS</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border-2 border-[#202020] bg-[#FFD85A] shadow-[2.5px_2.5px_0px_#202020] text-[#202020] font-bold"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#202020]" />
          <span>7 DAYS · 8 TRACKS · 100% FREE ADMISSION</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2.5px_2.5px_0px_#202020] text-[#202020]"
        >
          <MapPin className="w-3.5 h-3.5 text-[#FF7139]" />
          <span className="font-bold">AHMEDABAD, INDIA</span>
        </motion.div>
      </div>

      {/* CENTERPIECE: LAYERED PAPER CRAFT TYPOGRAPHY COMPOSITION */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-auto flex flex-col items-center text-center px-4 py-8">
        {/* Curated Editorial Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] shadow-[3px_3px_0px_#3155E7]"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
          <span className="text-xs sm:text-sm font-mono tracking-[0.16em] text-[#202020] uppercase font-bold">
            PAPER GRAPHIC & DIGITAL ART EXHIBITION
          </span>
        </motion.div>

        {/* Layered Paper Cutout Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="select-none relative"
        >
          {/* Subtle Decorative Paper Tape at Title Corner */}
          <div
            className="paper-tape hidden sm:block"
            style={{
              top: '-14px',
              left: '12%',
              width: '64px',
              transform: 'rotate(-5deg)',
            }}
          />

          <h1 className="font-display font-black tracking-tight leading-[0.92] text-center flex flex-col items-center">
            {/* TECH */}
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.6rem] text-[#202020] drop-shadow-[4px_4px_0px_rgba(49,85,231,0.2)]">
              TECH
            </span>

            {/* GALLERY */}
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.6rem] text-[#3155E7] my-1 sm:my-2 drop-shadow-[5px_5px_0px_#202020]">
              GALLERY
            </span>

            {/* YEAR BADGE AS FOLDED PAPER PLACARD */}
            <div className="mt-2 sm:mt-4 flex items-center justify-center gap-3">
              <span className="font-tech text-3xl sm:text-5xl md:text-6xl font-black tracking-wider text-[#202020] px-6 py-1.5 rounded-sm border-2 border-[#202020] bg-[#FFD85A] shadow-[5px_5px_0px_#202020] transform -rotate-1 hover:rotate-0 transition-transform">
                2027
              </span>
            </div>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 text-base sm:text-lg md:text-xl font-body text-[#5F5B52] max-w-xl mx-auto leading-relaxed font-medium"
        >
          Where Ideas Meet Innovation. An interactive digital paper-art exhibition showcasing student engineering, generative AI, robotics, and creative code.
        </motion.p>

        {/* TACTILE PAPER ACTION CTA ROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href="#register"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-sm font-mono font-bold text-sm text-white bg-[#3155E7] border-2 border-[#202020] shadow-[4.5px_4.5px_0px_#202020] hover:shadow-[6px_6px_0px_#202020] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>CLAIM PASS (FREE)</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <MagneticButton
            href="#schedule"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-sm font-mono text-sm font-bold text-[#202020] bg-[#FFFFFF] border-2 border-[#202020] shadow-[4px_4px_0px_#202020] hover:shadow-[5.5px_5.5px_0px_#202020] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Calendar className="w-4 h-4 text-[#FF7139]" />
            <span>EXHIBITION SCHEDULE</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* BOTTOM TELEMETRY DOCK: PERFORATED PAPER COUNTDOWN & LOCATION */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t-2 border-dashed border-[#202020]/25">
        {/* Date & Venue Pill */}
        <div className="text-left font-mono text-xs">
          <div className="text-[#3155E7] tracking-wider uppercase font-bold text-sm">
            18–24 JANUARY 2027
          </div>
          <div className="text-[#625E56] font-medium mt-0.5">
            LJCCA Main Campus · Vastrapur, Ahmedabad
          </div>
        </div>

        {/* Tactile Paper Countdown Passes */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono">
          <div className="flex flex-col items-center justify-center w-14 sm:w-16 h-14 sm:h-16 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[3px_3px_0px_#202020]">
            <span className="text-lg sm:text-xl font-black text-[#202020] leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] text-[#625E56] font-bold tracking-widest mt-1">DAYS</span>
          </div>
          <span className="text-[#202020] font-black">:</span>
          <div className="flex flex-col items-center justify-center w-14 sm:w-16 h-14 sm:h-16 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[3px_3px_0px_#3155E7]">
            <span className="text-lg sm:text-xl font-black text-[#3155E7] leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] text-[#625E56] font-bold tracking-widest mt-1">HRS</span>
          </div>
          <span className="text-[#202020] font-black">:</span>
          <div className="flex flex-col items-center justify-center w-14 sm:w-16 h-14 sm:h-16 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[3px_3px_0px_#FF7139]">
            <span className="text-lg sm:text-xl font-black text-[#FF7139] leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] text-[#625E56] font-bold tracking-widest mt-1">MIN</span>
          </div>
          <span className="text-[#202020] font-black">:</span>
          <div className="flex flex-col items-center justify-center w-14 sm:w-16 h-14 sm:h-16 rounded-sm bg-[#FFD85A] border-2 border-[#202020] shadow-[3px_3px_0px_#202020]">
            <span className="text-lg sm:text-xl font-black text-[#202020] leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] text-[#202020] font-bold tracking-widest mt-1">SEC</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="hidden md:inline-flex items-center gap-2 text-xs font-mono font-bold text-[#202020] hover:text-[#3155E7] transition-colors"
        >
          <span>EXPLORE EXHIBITION</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#3155E7]" />
        </a>
      </div>
    </section>
  );
};
