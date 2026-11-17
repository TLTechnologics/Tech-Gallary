import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Flame, Users, Calendar, Clock, MapPin, ChevronDown, ChevronUp, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { EventItem } from '../../types';
import { LetterReveal } from '../common/LetterReveal';

interface WorkshopsHackathonsSectionProps {
  events: EventItem[];
  onRegister: (eventId: string) => void;
}

export const WorkshopsHackathonsSection: React.FC<WorkshopsHackathonsSectionProps> = ({
  events,
  onRegister,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>('bhavesh-workshop');

  // Specific 5 curated sessions requested by user:
  // Bhavesh Workshop (18 Jan), Thakkar Workshop (19 Jan), Bhavesh Hackathon (20 Jan), Thakkar Hackathon (23 Jan), AI Workshop for Parents (24 Jan)
  const targetIds = [
    'bhavesh-workshop',
    'thakkar-workshop',
    'bhavesh-hackathon',
    'thakkar-hackathon',
    'ai-workshop-parents',
  ];

  const sessions = targetIds
    .map((id) => events.find((e) => e.id === id))
    .filter((e): e is EventItem => Boolean(e));

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getIcon = (event: EventItem) => {
    if (event.is_hackathon) return <Flame className="w-5 h-5 text-amber-400" />;
    if (event.eligibility_type === 'parents_only') return <Users className="w-5 h-5 text-purple-400" />;
    return <Terminal className="w-5 h-5 text-brand-lime" />;
  };

  return (
    <section id="workshops" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-neutral-800 pb-8 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-lime block mb-2">
            // 04. Intensive Tracks
          </span>
          <LetterReveal
            as="h2"
            className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase"
            text="WORKSHOPS & HACKATHONS"
          />
          <p className="font-mono text-xs uppercase tracking-wider text-neutral-400 mt-2">
            Deep-dive technical training, 24-hr code sprints, and our dedicated parent workshop
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 bg-amber-400 rounded-full" />
            Internal College Exclusive
          </span>
          <span className="text-neutral-600">|</span>
          <span className="flex items-center gap-1.5 text-purple-400">
            <span className="w-2 h-2 bg-purple-400 rounded-full" />
            Parents Only
          </span>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {sessions.map((event) => {
          const isExpanded = expandedId === event.id;
          const isInternal = event.eligibility_type === 'internal_only';
          const isParents = event.eligibility_type === 'parents_only';

          return (
            <div
              key={event.id}
              className={`tech-card border transition-all ${
                isExpanded
                  ? 'border-brand-lime/50 bg-dark-900 shadow-xl'
                  : 'border-neutral-800 bg-dark-900/80 hover:border-neutral-700'
              }`}
            >
              {/* Accordion Bar Header */}
              <button
                onClick={() => toggleExpand(event.id)}
                className="w-full p-6 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3 bg-dark-850 border border-neutral-800 flex-shrink-0">
                    {getIcon(event)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-brand-lime font-bold">
                        {event.date_display}
                      </span>
                      <span className="text-neutral-600">•</span>
                      <span
                        className={`text-[11px] font-mono uppercase px-2 py-0.5 border ${
                          isInternal
                            ? 'border-amber-400/40 text-amber-400 bg-amber-400/10'
                            : 'border-purple-400/40 text-purple-400 bg-purple-400/10'
                        }`}
                      >
                        {event.eligibility}
                      </span>
                    </div>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                      {event.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-mono text-xs text-neutral-400 hidden md:block">
                    {event.timing}
                  </span>
                  <div className="p-2 border border-neutral-800 text-neutral-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Expanded Content Drawer */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-neutral-800/80"
                  >
                    <div className="p-6 sm:p-8 space-y-6">
                      {/* Logistical Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-dark-850 border border-neutral-800 text-xs font-mono">
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Calendar className="w-4 h-4 text-brand-lime" />
                          <span>{event.date_display}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Clock className="w-4 h-4 text-brand-blue" />
                          <span>{event.timing}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <MapPin className="w-4 h-4 text-emerald-400" />
                          <span>{event.venue}</span>
                        </div>
                      </div>

                      {/* Description & Notice */}
                      <div className="space-y-4">
                        <h4 className="font-display font-bold text-lg text-white">
                          Session Overview
                        </h4>
                        <p className="text-sm text-neutral-300 leading-relaxed max-w-4xl">
                          {event.description}
                        </p>

                        <div className="p-4 bg-dark-850 border-l-4 border-amber-400 text-xs font-mono text-neutral-300 space-y-1">
                          <span className="text-amber-400 font-bold uppercase block">
                            Participation Policy:
                          </span>
                          {isInternal ? (
                            <p>
                              Strictly exclusive to enrolled students of our college. External college students cannot register for this track. External students are encouraged to register their hardware or software prototypes in the Tech Showcase track.
                            </p>
                          ) : (
                            <p>
                              This session is tailored specially for parents and guardians. Plain-English conversational guidance, interactive demonstrations, and open Q&A.
                            </p>
                          )}
                        </div>

                        {event.rules && (
                          <div className="p-4 bg-dark-950 border border-neutral-800">
                            <span className="font-mono text-xs uppercase tracking-wider text-neutral-200 font-bold block mb-2">
                              Rules & Requirements:
                            </span>
                            <div className="text-xs text-neutral-400 font-mono whitespace-pre-line space-y-1 leading-relaxed">
                              {event.rules}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Bar */}
                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800">
                        <span className="text-xs font-mono text-neutral-400">
                          Registration Status: <strong className="text-emerald-400 uppercase">{event.registration_status}</strong>
                        </span>

                        <button
                          onClick={() => onRegister(event.id)}
                          className="btn-primary w-full sm:w-auto text-xs py-2.5 px-6 flex items-center justify-center gap-2"
                        >
                          <span>Register For {event.name}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

