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
      className="relative min-h-[88vh] lg:min-h-[90vh] flex flex-col justify-between items-center pt-20 pb-8 sm:pt-22 sm:pb-10 px-4 sm:px-6 md:px-8 overflow-hidden bg-[#F8F5EC]"
      id="top"
    >
      {/* 1. Full-Screen Interactive 3D Origami Paper Sculpture */}
      <Hero3DScene />

      {/* 2. Floating 3D Paper Cutouts & Origami Darts */}
      <FloatingTech3DObjects />

      {/* Architectural Paper Background Illumination & Grids */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] pointer-events-none rounded-full blur-[120px] opacity-35 z-0"
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
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-[11px] sm:text-xs font-mono text-[#625E56]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2px_2px_0px_#202020]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E94B50]" />
          <span className="text-[#202020] font-bold">VOL. 04 // EXHIBITION</span>
          <span className="text-[#625E56]/40">|</span>
          <span className="text-[#3155E7] font-semibold">LJCCA CAMPUS</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#202020] bg-[#FFD85A] shadow-[2px_2px_0px_#202020] text-[#202020] font-bold"
        >
          <Sparkles className="w-3 h-3 text-[#202020]" />
          <span>7 DAYS · 8 TRACKS · 100% FREE ADMISSION</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2px_2px_0px_#202020] text-[#202020]"
        >
          <MapPin className="w-3 h-3 text-[#FF7139]" />
          <span className="font-bold">AHMEDABAD, INDIA</span>
        </motion.div>
      </div>

      {/* CENTERPIECE: LAYERED PAPER CRAFT TYPOGRAPHY COMPOSITION */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto flex flex-col items-center text-center px-4 py-4 sm:py-6">
        {/* Curated Editorial Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 sm:mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] shadow-[2.5px_2.5px_0px_#3155E7]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139]" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.14em] text-[#202020] uppercase font-bold">
            PAPER GRAPHIC &amp; DIGITAL ART EXHIBITION
          </span>
        </motion.div>

        {/* Layered Paper Cutout Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="select-none relative"
        >
          {/* Subtle Decorative Paper Tape at Title Corner */}
          <div
            className="paper-tape hidden sm:block"
            style={{
              top: '-10px',
              left: '12%',
              width: '54px',
              transform: 'rotate(-5deg)',
            }}
          />

          <h1 className="font-display font-black tracking-tight leading-[0.92] text-center flex flex-col items-center">
            {/* TECH */}
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] text-[#202020] drop-shadow-[3px_3px_0px_rgba(49,85,231,0.2)]">
              TECH
            </span>

            {/* GALLERY */}
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] text-[#3155E7] my-0.5 sm:my-1 drop-shadow-[4px_4px_0px_#202020]">
              GALLERY
            </span>

            {/* YEAR BADGE AS FOLDED PAPER PLACARD */}
            <div className="mt-1 sm:mt-2.5 flex items-center justify-center gap-2">
              <span className="font-tech text-2xl sm:text-3xl md:text-4xl font-black tracking-wider text-[#202020] px-4 py-1 rounded-sm border-2 border-[#202020] bg-[#FFD85A] shadow-[3.5px_3.5px_0px_#202020] transform -rotate-1 hover:rotate-0 transition-transform">
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
          className="mt-4 text-sm sm:text-base md:text-lg font-body text-[#5F5B52] max-w-lg mx-auto leading-relaxed font-medium"
        >
          Where Ideas Meet Innovation. An interactive digital paper-art exhibition showcasing student engineering, generative AI, robotics, and creative code.
        </motion.p>

        {/* TACTILE PAPER ACTION CTA ROW */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <MagneticButton
            href="#register"
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono font-bold text-xs sm:text-sm text-white bg-[#3155E7] border-2 border-[#202020] shadow-[3.5px_3.5px_0px_#202020] hover:shadow-[5px_5px_0px_#202020] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>CLAIM PASS (FREE)</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <MagneticButton
            href="#schedule"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-sm font-mono text-xs sm:text-sm font-bold text-[#202020] bg-[#FFFFFF] border-2 border-[#202020] shadow-[3px_3px_0px_#202020] hover:shadow-[4.5px_4.5px_0px_#202020] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Calendar className="w-3.5 h-3.5 text-[#FF7139]" />
            <span>EXHIBITION SCHEDULE</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* BOTTOM TELEMETRY DOCK: PERFORATED PAPER COUNTDOWN & LOCATION */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-dashed border-[#202020]/25">
        {/* Date & Venue Pill */}
        <div className="text-left font-mono text-xs">
          <div className="text-[#3155E7] tracking-wider uppercase font-bold text-xs sm:text-sm">
            18–24 JANUARY 2027
          </div>
          <div className="text-[#625E56] font-medium text-[11px] sm:text-xs mt-0.5">
            LJCCA Main Campus · Vastrapur, Ahmedabad
          </div>
        </div>

        {/* Tactile Paper Countdown Passes */}
        <div className="flex items-center gap-2 font-mono">
          <div className="flex flex-col items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[2.5px_2.5px_0px_#202020]">
            <span className="text-base sm:text-lg font-black text-[#202020] leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[9px] text-[#625E56] font-bold tracking-widest mt-0.5">DAYS</span>
          </div>
          <span className="text-[#202020] font-black">:</span>
          <div className="flex flex-col items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[2.5px_2.5px_0px_#3155E7]">
            <span className="text-base sm:text-lg font-black text-[#3155E7] leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[9px] text-[#625E56] font-bold tracking-widest mt-0.5">HRS</span>
          </div>
          <span className="text-[#202020] font-black">:</span>
          <div className="flex flex-col items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[2.5px_2.5px_0px_#FF7139]">
            <span className="text-base sm:text-lg font-black text-[#FF7139] leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[9px] text-[#625E56] font-bold tracking-widest mt-0.5">MIN</span>
          </div>
          <span className="text-[#202020] font-black">:</span>
          <div className="flex flex-col items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-sm bg-[#FFD85A] border-2 border-[#202020] shadow-[2.5px_2.5px_0px_#202020]">
            <span className="text-base sm:text-lg font-black text-[#202020] leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[9px] text-[#202020] font-bold tracking-widest mt-0.5">SEC</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#202020] hover:text-[#3155E7] transition-colors"
        >
          <span>EXPLORE EXHIBITION</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#3155E7]" />
        </a>
      </div>
    </section>
  );
};
