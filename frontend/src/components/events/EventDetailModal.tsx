import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, ShieldCheck, Users, ArrowUpRight, AlertCircle } from 'lucide-react';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-dark-900 border border-neutral-700 shadow-2xl p-6 sm:p-8 my-8 text-neutral-100"
        >
          {/* Header Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 border border-neutral-800 hover:border-neutral-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-dark-850 border border-neutral-700 text-brand-lime">
              {event.date_display}
            </span>
            <span
              className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border ${
                isInternal
                  ? 'border-amber-400/40 text-amber-400 bg-amber-400/10'
                  : isShowcase
                  ? 'border-brand-blue/40 text-brand-blue bg-brand-blue/10'
                  : 'border-purple-400/40 text-purple-400 bg-purple-400/10'
              }`}
            >
              {event.eligibility}
            </span>
            <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-dark-800 text-neutral-300">
              Status: {event.registration_status}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            {event.name}
          </h3>
          {event.tagline && (
            <p className="font-mono text-xs uppercase tracking-widest text-brand-lime mt-1 mb-4">
              {event.tagline}
            </p>
          )}

          {/* Logistics Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5 p-4 bg-dark-850 border border-neutral-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-300">
              <Calendar className="w-4 h-4 text-brand-lime" />
              <span>{event.date_display}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="w-4 h-4 text-brand-blue" />
              <span>{event.timing || '09:30 AM - 04:30 PM'}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300 sm:col-span-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{event.venue || 'Campus Auditorium / Labs'}</span>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-4 mb-6 text-sm text-neutral-300 leading-relaxed">
            <p>{event.description}</p>

            {event.rules && (
              <div className="p-4 bg-dark-800/80 border border-neutral-800 mt-4">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-neutral-200 block mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-lime" />
                  Rules & Participation Guidelines
                </span>
                <div className="text-xs text-neutral-400 font-mono whitespace-pre-line space-y-1">
                  {event.rules}
                </div>
              </div>
            )}

            {isInternal && (
              <div className="p-3 bg-amber-400/10 border-l-2 border-amber-400 text-xs font-mono text-amber-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Notice: Strictly restricted to students of our college. External students are not eligible for this session.
                </span>
              </div>
            )}
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors"
            >
              Close
            </button>

            {isShowcase ? (
              <button
                onClick={() => {
                  onClose();
                  onSelectShowcase();
                }}
                className="w-full sm:w-auto btn-primary text-xs py-2.5 px-5 flex items-center justify-center gap-2"
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
                className="w-full sm:w-auto btn-primary text-xs py-2.5 px-5 flex items-center justify-center gap-2"
              >
                <span>Register For Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

