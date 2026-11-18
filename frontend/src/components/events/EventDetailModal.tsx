import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, ShieldCheck, ArrowUpRight, AlertCircle } from 'lucide-react';
import { EventItem } from '../../types';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onSelectRegister: (eventId: string) => void;
  onSelectShowcase: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onSelectRegister,
  onSelectShowcase,
}) => {
  if (!event) return null;

  const isInternal = event.eligibility_type === 'internal_only';
  const isShowcase = event.is_showcase;
  const isResults = event.eligibility_type === 'results_only';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202020]/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#FFFFFF] border-2 border-[#202020] shadow-[8px_8px_0px_#202020] rounded-sm p-6 sm:p-8 my-8 text-[#202020]"
        >
          {/* Washi Tape Strip at Modal Top */}
          <div
            className="paper-tape"
            style={{
              top: '-12px',
              left: '15%',
              width: '70px',
              transform: 'rotate(-3deg)',
            }}
          />

          {/* Header Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#202020] hover:text-[#3155E7] p-2 rounded-sm bg-[#FAF8F2] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] transition-transform hover:-translate-y-0.5"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-[#FFD85A] border-1.5 border-[#202020] text-[#202020] rounded-sm shadow-[1.5px_1.5px_0px_#202020]">
              {event.date_display}
            </span>
            <span
              className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-sm border-1.5 border-[#202020] shadow-[1.5px_1.5px_0px_#202020] ${
                isInternal
                  ? 'bg-[#FFFFFF] text-[#202020]'
                  : isShowcase
                  ? 'bg-[#3155E7] text-white'
                  : 'bg-[#FF7139] text-white'
              }`}
            >
              {event.eligibility}
            </span>
            <span className="px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider bg-[#FAF8F3] border-1.5 border-[#202020] rounded-sm text-[#625E56]">
              STATUS: {event.registration_status}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-display font-black text-2xl sm:text-3xl text-[#202020] tracking-tight">
            {event.name}
          </h3>
          {event.tagline && (
            <p className="font-mono text-xs uppercase tracking-widest text-[#3155E7] font-bold mt-1 mb-4">
              {event.tagline}
            </p>
          )}

          {/* Logistics Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5 p-4 bg-[#FAF8F3] border-2 border-[#202020] rounded-sm text-xs font-mono shadow-[2.5px_2.5px_0px_#202020]">
            <div className="flex items-center gap-2 text-[#202020] font-bold">
              <Calendar className="w-4 h-4 text-[#3155E7]" />
              <span>{event.date_display}</span>
            </div>
            <div className="flex items-center gap-2 text-[#202020] font-bold">
              <Clock className="w-4 h-4 text-[#FF7139]" />
              <span>{event.timing || '09:30 AM - 04:30 PM'}</span>
            </div>
            <div className="flex items-center gap-2 text-[#202020] font-bold sm:col-span-2 border-t border-dashed border-[#202020]/20 pt-2 mt-1">
              <MapPin className="w-4 h-4 text-[#3155E7]" />
              <span>{event.venue || 'Campus Auditorium / Labs'}</span>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-4 mb-6 text-sm text-[#5F5B52] leading-relaxed font-sans">
            <p>{event.description}</p>

            {event.rules && (
              <div className="p-4 bg-[#FFFFFF] border-2 border-[#202020] rounded-sm mt-4 shadow-[2.5px_2.5px_0px_#202020]">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#202020] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#3155E7]" />
                  Rules & Participation Guidelines
                </span>
                <div className="text-xs text-[#625E56] font-mono whitespace-pre-line space-y-1">
                  {event.rules}
                </div>
              </div>
            )}

            {isInternal && (
              <div className="p-3 bg-[#FAF8F3] border-l-4 border-[#3155E7] border-2 border-r-[#202020] border-t-[#202020] border-b-[#202020] text-xs font-mono text-[#202020] flex items-start gap-2 rounded-sm shadow-[2px_2px_0px_#202020]">
                <AlertCircle className="w-4 h-4 text-[#3155E7] flex-shrink-0 mt-0.5" />
                <span>
                  Notice: Strictly restricted to enrolled students of our college. External students are not eligible for this session.
                </span>
              </div>
            )}
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t-2 border-dashed border-[#202020]/20">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#202020] hover:bg-[#FAF8F2] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] rounded-sm transition-all"
            >
              Close
            </button>

            {isShowcase ? (
              <button
                onClick={() => {
                  onClose();
                  onSelectShowcase();
                }}
                className="w-full sm:w-auto text-xs py-2.5 px-6 flex items-center justify-center gap-2 rounded-sm cursor-pointer font-mono font-bold text-white bg-[#3155E7] border-2 border-[#202020] shadow-[3.5px_3.5px_0px_#202020] hover:shadow-[5px_5px_0px_#202020] transition-all"
              >
                <span>Submit Showcase Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            ) : !isResults && event.registration_status !== 'closed' ? (
              <button
                onClick={() => {
                  onClose();
                  onSelectRegister(event.id);
                }}
                className="w-full sm:w-auto text-xs py-2.5 px-6 flex items-center justify-center gap-2 rounded-sm cursor-pointer font-mono font-bold text-[#202020] bg-[#FFD85A] border-2 border-[#202020] shadow-[3.5px_3.5px_0px_#202020] hover:shadow-[5px_5px_0px_#202020] transition-all"
              >
                <span>Register for Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
