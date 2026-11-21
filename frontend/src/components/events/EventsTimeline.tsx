import React, { useState } from 'react';
import { EventItem } from '../../types';
import { EventDetailModal } from './EventDetailModal';
import { EventCard } from './EventCard';
import { Terminal, Code2, Cpu } from 'lucide-react';

interface EventsTimelineProps {
  events: EventItem[];
  onSelectRegister: (eventId: string) => void;
  onSelectShowcase: () => void;
}

export const EventsTimeline: React.FC<EventsTimelineProps> = ({
  events,
  onSelectRegister,
  onSelectShowcase,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const tracks = [
    {
      title: 'Workshops',
      tag: 'TRACK // 01',
      icon: <Terminal className="w-6 h-6 text-[#6B38FB]" />,
      accent: '#6B38FB',
      bg: '#FFFFFF',
      desc: 'Hands-on technical sessions led by faculty, seniors, and industry guests. Bring a laptop; we provide the hardware kits.',
      topics: ['Embedded systems with ESP32', 'On-device machine learning', 'PCB design basics', 'Prototyping in Figma'],
      format: '2–3 hour sessions',
      seats: 'College Exclusive (LJCCA)',
    },
    {
      title: 'Hackathons',
      tag: 'TRACK // 02',
      icon: <Code2 className="w-6 h-6 text-[#7C3AED]" />,
      accent: '#7C3AED',
      bg: '#FAF7FE',
      desc: 'Form a team of up to four and engineer working prototypes from undisclosed problem statements released live.',
      topics: ['24-hour build sprint', 'Continuous mentor check-ins', 'Live prototype demos to jury', 'Hardware and software tracks'],
      format: 'Teams of 2–4 students',
      seats: '18–23 January window',
    },
    {
      title: 'Tech Showcase',
      tag: 'TRACK // 03',
      icon: <Cpu className="w-6 h-6 text-[#581C87]" />,
      accent: '#C4B5FD',
      bg: '#FFFFFF',
      desc: 'National open exhibition where innovators present working hardware and software projects to visitors, faculty and judges.',
      topics: ['Robotics & IoT prototypes', 'AI, apps & SaaS platforms', 'Public community voting', 'Distinguished jury awards'],
      format: 'Stall-based live exhibition',
      seats: 'Open to All External Colleges',
    },
  ];

  return (
    <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#EDE5F7] overflow-hidden" id="events">
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
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2px_2px_0px_#202020] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B38FB]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#202020] tracking-widest uppercase font-bold">
              FESTIVAL PROGRAM // 3 CORE TRACKS
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#202020] tracking-tight leading-tight">
            Learn. Build. <span className="text-[#6B38FB] underline decoration-[#C4B5FD] decoration-wavy decoration-2">Showcase.</span>
          </h2>
        </div>

        {/* 3 Main Track Hero Cards: Tactile Paper Placards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 sm:mb-14">
          {tracks.map((t, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-sm border-2 border-[#202020] shadow-[4px_4px_0px_#202020] hover:shadow-[5.5px_5.5px_0px_#202020] hover:-translate-y-0.5 flex flex-col justify-between transition-all duration-200 relative"
              style={{ backgroundColor: t.bg }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[1.5px_1.5px_0px_#202020]">
                    {t.icon}
                  </div>
                  <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider text-[#202020] px-2 py-0.5 rounded-sm border border-[#202020] bg-[#FFFFFF]">
                    {t.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-black text-[#202020] mb-1.5">
                  {t.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#5F5B52] leading-relaxed mb-4">
                  {t.desc}
                </p>

                <div className="border-t-2 border-dashed border-[#202020]/20 pt-3 mb-4">
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#202020] uppercase font-bold tracking-wider block mb-2">
                    Curriculum Pillars
                  </span>
                  <ul className="space-y-1">
                    {t.topics.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-[#202020] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#202020]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-[#202020]/20 pt-3 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[#625E56] block text-[10px] font-semibold">FORMAT</span>
                  <span className="text-[#202020] font-bold text-xs">{t.format}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#625E56] block text-[10px] font-semibold">ELIGIBILITY</span>
                  <span className="font-bold text-[#6B38FB] text-xs">{t.seats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 8 Official Festival Events Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="font-mono text-xs text-[#6B38FB] tracking-wider uppercase font-bold">
                CHRONOLOGICAL RUNTIME // 18–24 JANUARY 2027
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-[#202020] mt-0.5">
                The 8 Official Festival Events
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#625E56] px-2.5 py-1 bg-[#FFFFFF] border-2 border-[#202020] shadow-[1.5px_1.5px_0px_#202020] rounded-sm">
              CLICK ANY EVENT TO INSPECT RULES &amp; VENUE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {events.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
                onViewDetails={(item) => setSelectedEvent(item)}
                onRegister={(eventId) => onSelectRegister(eventId)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSelectRegister={(evId) => {
            setSelectedEvent(null);
            onSelectRegister(evId);
          }}
          onSelectShowcase={() => {
            setSelectedEvent(null);
            onSelectShowcase();
          }}
        />
      )}
    </section>
  );
};
