import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ShieldCheck, Cpu, Code2, Users, Trophy, Flame } from 'lucide-react';
import { EventItem } from '../../types';

interface EventCardProps {
  event: EventItem;
  onViewDetails: (event: EventItem) => void;
  onRegister: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails, onRegister }) => {
  const isInternal = event.eligibility_type === 'internal_only';
  const isShowcase = event.is_showcase;
  const isHackathon = event.is_hackathon;
  const isParents = event.eligibility_type === 'parents_only';
  const isResults = event.eligibility_type === 'results_only';

  const getTrackIcon = () => {
    if (isHackathon) return <Flame className="w-4 h-4 text-amber-400" />;
    if (isShowcase) return <Cpu className="w-4 h-4 text-brand-blue" />;
    if (isParents) return <Users className="w-4 h-4 text-purple-400" />;
    if (isResults) return <Trophy className="w-4 h-4 text-brand-lime" />;
    return <Code2 className="w-4 h-4 text-brand-lime" />;
  };

  const getStatusBadge = () => {
    switch (event.registration_status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Registration Open
          </span>
        );
      case 'waitlist':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30">
            Waitlist
          </span>
        );
      case 'announced':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-400/10 border border-purple-400/30">
            Results Announced
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-neutral-800 border border-neutral-700">
            Registration Closed
          </span>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`tech-card border border-neutral-800 bg-dark-900 p-6 flex flex-col justify-between relative group ${
        isShowcase ? 'tech-card-blue' : ''
      }`}
    >
      <div>
        {/* Top Header: Date & Status */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
            <Calendar className="w-3.5 h-3.5 text-brand-lime" />
            <span className="font-bold text-white tracking-wide">{event.date_display}</span>
          </div>
          {getStatusBadge()}
        </div>

        {/* Track Icon & Title */}
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2 bg-dark-850 border border-neutral-800 flex-shrink-0 mt-0.5">
            {getTrackIcon()}
          </div>
          <div>
            <h3 className="font-display font-black text-xl text-white group-hover:text-brand-lime transition-colors leading-snug">
              {event.name}
            </h3>
            {event.tagline && (
              <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mt-0.5">
                {event.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-neutral-400 mt-3 line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        {/* Eligibility Badge */}
        <div className="mt-4 pt-4 border-t border-neutral-850">
          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            <ShieldCheck className={`w-3.5 h-3.5 flex-shrink-0 ${isInternal ? 'text-amber-400' : isShowcase ? 'text-brand-blue' : 'text-purple-400'}`} />
            <span className={`font-semibold ${isInternal ? 'text-amber-400' : isShowcase ? 'text-brand-blue' : 'text-purple-400'}`}>
              {event.eligibility}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3 font-mono text-xs">
        <button
          onClick={() => onViewDetails(event)}
          className="text-neutral-400 hover:text-white transition-colors underline-offset-4 hover:underline"
        >
          View Details
        </button>

        {isShowcase ? (
          <a
            href="#showcase"
            className="text-brand-blue hover:text-white inline-flex items-center gap-1 font-semibold transition-colors"
          >
            <span>Showcase Tracks</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        ) : !isResults && event.registration_status !== 'closed' ? (
          <button
            onClick={() => onRegister(event.id)}
            className="text-brand-lime hover:text-white inline-flex items-center gap-1 font-semibold transition-colors"
          >
            <span>Register</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <span className="text-neutral-400 text-[11px]">// Info Only</span>
        )}
      </div>
    </motion.div>
  );
};

