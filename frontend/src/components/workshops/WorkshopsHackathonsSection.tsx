import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Flame, Users, Clock, MapPin, ChevronDown, ChevronUp, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { EventItem } from '../../types';

interface WorkshopsHackathonsSectionProps {
  events: EventItem[];
  onRegister: (eventId: string) => void;
}

export const WorkshopsHackathonsSection: React.FC<WorkshopsHackathonsSectionProps> = ({
  events,
  onRegister,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>('bhavesh-workshop');

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

  const getAccentDetails = (event: EventItem) => {
    if (event.is_hackathon) {
      return {
        color: '#E05326',
        badgeBg: '#FFF7ED',
        typeLabel: '24H SPRINT HACKATHON',
        icon: <Flame className="w-5 h-5 text-[#E05326]" />,
      };
    }
    if (event.eligibility_type === 'parents_only') {
      return {
        color: '#EA580C',
        badgeBg: '#FFF7ED',
        typeLabel: 'FAMILY LITERACY TRACK',
        icon: <Users className="w-5 h-5 text-[#EA580C]" />,
      };
    }
    return {
      color: '#E05326',
      badgeBg: '#FFFFFF',
      typeLabel: 'TECHNICAL WORKSHOP',
      icon: <Terminal className="w-5 h-5 text-[#E05326]" />,
    };
  };

  return (
    <section id="workshops" className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#FDEEE3] overflow-hidden">
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#202020 1px, transparent 1px), linear-gradient(90deg, #202020 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 pb-5 sm:pb-6 border-b-2 border-dashed border-[#202020]/25 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2px_2px_0px_#202020] mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E05326]" />
              <span className="font-mono text-[11px] sm:text-xs text-[#202020] tracking-widest uppercase font-bold">
                INTENSIVE LABS &amp; CODE SPRINTS
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#202020] tracking-tight leading-tight">
              Workshops &amp; <span className="text-[#E05326] underline decoration-[#FBBF24] decoration-wavy decoration-2">Hackathons.</span>
            </h2>

            <p className="font-body text-xs sm:text-sm text-[#5F5B52] mt-1.5 max-w-2xl leading-relaxed font-medium">
              Hands-on technical immersion, rapid prototype engineering sprints, and our dedicated parent AI workshop.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <span className="flex items-center gap-2 text-[#202020] font-bold bg-[#FFFFFF] px-3 py-1 rounded-sm border-2 border-[#202020] shadow-[1.5px_1.5px_0px_#202020]">
              <span className="w-1.5 h-1.5 bg-[#FF7139] rounded-full" />
              College Exclusive (LJCCA)
            </span>
            <span className="flex items-center gap-2 text-[#202020] font-bold bg-[#FFD85A] px-3 py-1 rounded-sm border-2 border-[#202020] shadow-[1.5px_1.5px_0px_#202020]">
              <span className="w-1.5 h-1.5 bg-[#E94B50] rounded-full" />
              Parents Track
            </span>
          </div>
        </div>

        {/* Exhibition Accordion Dossier Folders */}
        <div className="space-y-4">
          {sessions.map((event) => {
            const isExpanded = expandedId === event.id;
            const accent = getAccentDetails(event);
            const isInternal = event.eligibility_type === 'internal_only';
            const isParents = event.eligibility_type === 'parents_only';

            return (
              <div
                key={event.id}
                className={`transition-all duration-200 rounded-sm overflow-hidden border-2 border-[#202020] ${
                  isExpanded
                    ? 'bg-[#FFFFFF] shadow-[5px_5px_0px_#202020]'
                    : 'bg-[#FAF8F3] hover:bg-[#FFFFFF] shadow-[3.5px_3.5px_0px_#202020]'
                }`}
              >
                {/* Accordion Bar Header */}
                <button
                  type="button"
                  onClick={() => toggleExpand(event.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="p-2.5 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] shadow-[1.5px_1.5px_0px_#202020] flex-shrink-0">
                      {accent.icon}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-black text-[#202020]">
                          {event.date_display}
                        </span>
                        <span className="text-[#202020]/40">•</span>
                        <span
                          className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded-sm border-1.5 border-[#202020] font-black uppercase tracking-wider"
                          style={{
                            color: '#202020',
                            backgroundColor: accent.color === '#FFD85A' ? '#FFD85A' : `${accent.color}20`,
                          }}
                        >
                          {accent.typeLabel}
                        </span>
                        {isInternal && (
                          <span className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded-sm border border-[#202020] bg-[#FFFFFF] font-bold text-[#625E56]">
                            LJCCA Only
                          </span>
                        )}
                        {isParents && (
                          <span className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded-sm border border-[#202020] bg-[#FFD85A] font-bold text-[#202020]">
                            Parents &amp; Guardians
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-black text-lg sm:text-xl text-[#202020]">
                        {event.name}
                      </h3>
                      {event.tagline && (
                        <p className="font-mono text-[11px] sm:text-xs text-[#625E56] font-medium mt-0.5">
                          {event.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="hidden sm:inline-flex font-mono text-xs font-bold text-[#625E56] bg-[#FFFFFF] px-2.5 py-1 rounded-sm border border-[#202020]">
                      {event.timing}
                    </span>
                    <div className="p-1.5 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[1.5px_1.5px_0px_#202020] text-[#202020]">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="px-5 pb-5 pt-2 border-t-2 border-dashed border-[#202020]/20 bg-[#FAF8F3]"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
                        {/* Description & Overview */}
                        <div className="md:col-span-7 flex flex-col justify-between">
                          <div>
                            <span className="font-mono text-xs text-[#202020] uppercase tracking-wider block mb-2 font-bold">
                              Overview &amp; Scope
                            </span>
                            <p className="font-body text-sm text-[#5F5B52] leading-relaxed mb-6">
                              {event.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#625E56]">
                              <span className="flex items-center gap-1.5 font-bold text-[#202020]">
                                <Clock className="w-4 h-4 text-[#E05326]" />
                                <span>{event.timing}</span>
                              </span>
                              <span className="flex items-center gap-1.5 font-bold text-[#202020]">
                                <MapPin className="w-4 h-4 text-[#E05326]" />
                                <span>{event.venue}</span>
                              </span>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t-2 border-dashed border-[#202020]/20 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => onRegister(event.id)}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono font-bold text-xs text-white bg-[#E05326] hover:bg-[#C2410C] border-2 border-[#202020] shadow-[3.5px_3.5px_0px_#202020] hover:shadow-[5px_5px_0px_#202020] hover:-translate-y-0.5 transition-all"
                            >
                              <span>REGISTER FOR THIS TRACK</span>
                              <ArrowUpRight size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Rules & Eligibility Panel */}
                        <div className="md:col-span-5 p-5 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[3px_3px_0px_#202020] font-mono text-xs">
                          <div className="flex items-center gap-2 text-[#202020] font-black mb-3 uppercase tracking-wider">
                            <ShieldAlert size={15} className="text-[#E05326]" />
                            <span>Rules &amp; Eligibility Directive</span>
                          </div>

                          <div className="text-[#5F5B52] whitespace-pre-line leading-relaxed mb-4 font-medium">
                            {event.rules}
                          </div>

                          <div className="p-3 rounded-sm border-2 border-[#202020] bg-[#FDE68A] text-[11px] text-[#202020] font-bold">
                            Accreditation Note: Verified attendance certificates are awarded during the closing ceremony on 24 January 2027.
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
