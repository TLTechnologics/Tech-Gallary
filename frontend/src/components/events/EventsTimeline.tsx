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
      icon: <Terminal className="w-6 h-6 text-[#3155E7]" />,
      accent: '#3155E7',
      bg: '#FFFFFF',
      desc: 'Hands-on technical sessions led by faculty, seniors, and industry guests. Bring a laptop; we provide the hardware kits.',
      topics: ['Embedded systems with ESP32', 'On-device machine learning', 'PCB design basics', 'Prototyping in Figma'],
      format: '2–3 hour sessions',
      seats: 'College Exclusive (LJCCA)',
    },
    {
      title: 'Hackathons',
      tag: 'TRACK // 02',
      icon: <Code2 className="w-6 h-6 text-[#FF7139]" />,
      accent: '#FF7139',
      bg: '#FAF8F3',
      desc: 'Form a team of up to four and engineer working prototypes from undisclosed problem statements released live.',
      topics: ['24-hour build sprint', 'Continuous mentor check-ins', 'Live prototype demos to jury', 'Hardware and software tracks'],
      format: 'Teams of 2–4 students',
      seats: '18–23 January window',
    },
    {
      title: 'Tech Showcase',
      tag: 'TRACK // 03',
      icon: <Cpu className="w-6 h-6 text-[#202020]" />,
      accent: '#FFD85A',
      bg: '#FFD85A',
      desc: 'National open exhibition where innovators present working hardware and software projects to visitors, faculty and judges.',
      topics: ['Robotics & IoT prototypes', 'AI, apps & SaaS platforms', 'Public community voting', 'Distinguished jury awards'],
      format: 'Stall-based live exhibition',
      seats: 'Open to All External Colleges',
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-8 bg-[#F8F5EC] overflow-hidden" id="events">
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#202020 1px, transparent 1px), linear-gradient(90deg, #202020 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2.5px_2.5px_0px_#202020] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3155E7]" />
            <span className="font-mono text-xs text-[#202020] tracking-widest uppercase font-bold">
              FESTIVAL PROGRAM // 3 CORE TRACKS
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#202020] tracking-tight leading-tight">
            Learn. Build. <span className="text-[#3155E7] underline decoration-[#FF7139] decoration-wavy decoration-2">Showcase.</span>
          </h2>
        </div>

        {/* 3 Main Track Hero Cards: Tactile Paper Placards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {tracks.map((t, idx) => (
            <div
              key={idx}
              className="p-7 rounded-sm border-2 border-[#202020] shadow-[5px_5px_0px_#202020] hover:shadow-[7px_7px_0px_#202020] hover:-translate-y-1 flex flex-col justify-between transition-all duration-200 relative"
              style={{ backgroundColor: t.bg }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2px_2px_0px_#202020]">
                    {t.icon}
                  </div>
                  <span className="font-mono text-xs font-bold tracking-wider text-[#202020] px-2 py-0.5 rounded-sm border border-[#202020] bg-[#FFFFFF]">
                    {t.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-black text-[#202020] mb-2">
                  {t.title}
                </h3>
                <p className="font-body text-sm text-[#5F5B52] leading-relaxed mb-6">
                  {t.desc}
                </p>

                <div className="border-t-2 border-dashed border-[#202020]/20 pt-4 mb-6">
                  <span className="font-mono text-[10px] text-[#202020] uppercase font-bold tracking-wider block mb-2.5">
                    Curriculum Pillars
                  </span>
                  <ul className="space-y-1.5">
                    {t.topics.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#202020] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#202020]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-[#202020]/20 pt-4 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[#625E56] block text-[10px] font-semibold">FORMAT</span>
                  <span className="text-[#202020] font-bold">{t.format}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#625E56] block text-[10px] font-semibold">ELIGIBILITY</span>
                  <span className="font-bold text-[#3155E7]">{t.seats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 8 Official Festival Events Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs text-[#3155E7] tracking-wider uppercase font-bold">
                CHRONOLOGICAL RUNTIME // 18–24 JANUARY 2027
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[#202020] mt-1">
                The 8 Official Festival Events
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#625E56] px-3 py-1 bg-[#FFFFFF] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] rounded-sm">
              CLICK ANY EVENT TO INSPECT RULES &amp; VENUE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
