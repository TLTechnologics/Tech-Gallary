import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Code2, Cpu, Users, Trophy, Sparkles } from 'lucide-react';
import { EventItem } from '../../types';

interface EventCardProps {
  event: EventItem;
  onViewDetails: (event: EventItem) => void;
  onRegister: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // 3D Tilt Spring Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(x, { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Max tilt ~6 degrees
    x.set(((mouseX - centerX) / centerX) * 6);
    y.set(-((mouseY - centerY) / centerY) * 6);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isInternal = event.eligibility_type === 'internal_only';
  const isShowcase = event.is_showcase;
  const isHackathon = event.is_hackathon;
  const isParents = event.eligibility_type === 'parents_only';
  const isResults = event.eligibility_type === 'results_only';

  const getAccent = () => {
    if (isHackathon) return { color: '#FF7139', bg: '#FAF8F3', tag: 'HACKATHON', icon: <Code2 className="w-4 h-4 text-[#FF7139]" /> };
    if (isShowcase) return { color: '#FFD85A', bg: '#FFFFFF', tag: 'SHOWCASE', icon: <Cpu className="w-4 h-4 text-[#202020]" /> };
    if (isParents) return { color: '#E94B50', bg: '#FAF8F3', tag: 'FAMILY TRACK', icon: <Users className="w-4 h-4 text-[#E94B50]" /> };
    if (isResults) return { color: '#3155E7', bg: '#FFFFFF', tag: 'CEREMONY', icon: <Trophy className="w-4 h-4 text-[#3155E7]" /> };
    return { color: '#3155E7', bg: '#FFFFFF', tag: 'WORKSHOP', icon: <Sparkles className="w-4 h-4 text-[#3155E7]" /> };
  };

  const accent = getAccent();

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[4px_4px_0px_#202020] hover:shadow-[6px_6px_0px_#202020] hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col justify-between overflow-hidden group cursor-pointer"
      onClick={() => onViewDetails(event)}
    >
      {/* Folded paper dog-ear corner effect in top right */}
      <div 
        className="absolute top-0 right-0 w-6 h-6 bg-[#EAE3D5] border-b-2 border-l-2 border-[#202020] pointer-events-none" 
        style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
      />

      {/* Top Header: Date, Stamped Tag & Eligibility */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#202020]">
            <Calendar className="w-3.5 h-3.5 text-[#3155E7]" />
            <span>{event.date_display}</span>
          </div>
          <span
            className="font-mono text-[9px] px-2 py-0.5 rounded-sm border-1.5 border-[#202020] uppercase tracking-wider font-black"
            style={{
              color: '#202020',
              backgroundColor: accent.color === '#FFD85A' ? '#FFD85A' : `${accent.color}20`,
            }}
          >
            {accent.tag}
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-sm border-1.5 border-[#202020] bg-[#FAF8F3] shadow-[1.5px_1.5px_0px_#202020] mt-0.5 flex-shrink-0">
            {accent.icon}
          </div>
          <div>
            <h3 className="font-display font-black text-xl text-[#202020] leading-snug group-hover:text-[#3155E7] transition-colors">
              {event.name}
            </h3>
            {event.tagline && (
              <p className="font-mono text-[11px] text-[#625E56] font-medium tracking-wide mt-0.5">
                {event.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Description snippet */}
        <p className="font-body text-xs text-[#5F5B52] line-clamp-3 leading-relaxed mb-4">
          {event.description}
        </p>
      </div>

      {/* Footer Info: Venue & Eligibility Directive */}
      <div className="relative z-10 pt-4 border-t-2 border-dashed border-[#202020]/20 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#625E56]">
          <span className="flex items-center gap-1.5 truncate max-w-[190px]">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#202020]" />
            <span className="truncate font-medium">{event.venue}</span>
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm border border-[#202020] bg-[#FAF8F2] text-[#202020]">
            {event.timing}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-[11px] font-bold text-[#202020]">
            {isInternal
              ? '• LJCCA Exclusive'
              : isShowcase
              ? '• Open to All Colleges'
              : isParents
              ? '• Parents & Families'
              : '• All Welcome'}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(event);
            }}
            className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#3155E7] hover:text-[#202020] transition-colors"
          >
            <span>Rules</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
