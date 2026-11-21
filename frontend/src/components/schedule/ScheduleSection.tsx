import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

interface SessionItem {
  time: string;
  title: string;
  venue: string;
  tag: string;
}

interface DaySchedule {
  dayName: string;
  dayNumber: string;
  dateStr: string;
  sessions: SessionItem[];
}

const SCHEDULE_DATA: DaySchedule[] = [
  {
    dayName: 'Mon',
    dayNumber: '18',
    dateStr: '18 January 2027',
    sessions: [
      { time: '10:00', title: 'Opening ceremony & Festival Kickoff', venue: 'Main Atrium', tag: 'Ceremony' },
      { time: '11:30', title: 'Keynote: Hardware that ships', venue: 'Auditorium', tag: 'Talk' },
      { time: '14:00', title: 'Bhavesh Workshop (College Exclusive)', venue: 'Innovation Lab', tag: 'Workshop' },
    ],
  },
  {
    dayName: 'Tue',
    dayNumber: '19',
    dateStr: '19 January 2027',
    sessions: [
      { time: '10:00', title: 'Thakkar Workshop: Embedded Systems & Architecture', venue: 'Lab 2', tag: 'Workshop' },
      { time: '14:00', title: 'Intro to on-device Machine Learning', venue: 'Lab 4', tag: 'Workshop' },
      { time: '16:30', title: 'Open design critique and mentoring', venue: 'Studio', tag: 'Open hour' },
    ],
  },
  {
    dayName: 'Wed',
    dayNumber: '20',
    dateStr: '20 January 2027',
    sessions: [
      { time: '09:00', title: 'Bhavesh Hackathon (College Exclusive 24h sprint)', venue: 'Innovation Lab', tag: 'Hackathon' },
      { time: '13:00', title: 'Panel: open source in college and beyond', venue: 'Auditorium', tag: 'Talk' },
      { time: '15:00', title: 'PCB design basics and rapid prototyping', venue: 'Lab 2', tag: 'Workshop' },
    ],
  },
  {
    dayName: 'Thu',
    dayNumber: '21',
    dateStr: '21 January 2027',
    sessions: [
      { time: '09:00', title: 'Tech Showcase – Day 1 Setup & Opens (All Colleges)', venue: 'Main Atrium', tag: 'Showcase' },
      { time: '11:00', title: 'Prototyping in Figma & interactive micro-frontends', venue: 'Studio', tag: 'Workshop' },
      { time: '15:00', title: 'Talk: robots in the real world', venue: 'Auditorium', tag: 'Talk' },
    ],
  },
  {
    dayName: 'Fri',
    dayNumber: '22',
    dateStr: '22 January 2027',
    sessions: [
      { time: '09:00', title: 'Tech Showcase – Day 2 (All Colleges Open Exhibition)', venue: 'Main Atrium', tag: 'Showcase' },
      { time: '13:00', title: 'Showcase open to visitors & interactive voting', venue: 'Main Atrium', tag: 'Showcase' },
      { time: '17:00', title: 'Evening live hardware demos & lightning pitches', venue: 'Innovation Lab', tag: 'Demo' },
    ],
  },
  {
    dayName: 'Sat',
    dayNumber: '23',
    dateStr: '23 January 2027',
    sessions: [
      { time: '09:00', title: 'Thakkar Hackathon (College Exclusive Challenge)', venue: 'Central Lab', tag: 'Hackathon' },
      { time: '14:00', title: 'Jury walk-through and project assessments', venue: 'Main Atrium', tag: 'Judging' },
      { time: '16:00', title: 'Visitor open day and hands-on testing', venue: 'Main Atrium', tag: 'Showcase' },
    ],
  },
  {
    dayName: 'Sun',
    dayNumber: '24',
    dateStr: '24 January 2027',
    sessions: [
      { time: '10:00', title: 'AI Workshop for Parents (Special family track)', venue: 'Auditorium', tag: 'Workshop' },
      { time: '14:00', title: 'Both Hackathon Results Announced (Bhavesh & Thakkar)', venue: 'Auditorium', tag: 'Ceremony' },
      { time: '16:00', title: 'Grand awards ceremony and festival closing', venue: 'Auditorium', tag: 'Ceremony' },
    ],
  },
];

const getTagBadgeStyle = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'hackathon':
      return { background: '#BBF7D0', color: '#14532D', border: '1.5px solid #202020' };
    case 'workshop':
      return { background: '#DCFCE7', color: '#15803D', border: '1.5px solid #202020' };
    case 'showcase':
      return { background: '#86EFAC', color: '#14532D', border: '1.5px solid #202020' };
    case 'ceremony':
      return { background: '#FEF3C7', color: '#B45309', border: '1.5px solid #202020' };
    case 'talk':
      return { background: '#F0FDF4', color: '#166534', border: '1.5px solid #202020' };
    default:
      return { background: '#F0FDF4', color: '#15803D', border: '1.5px solid #202020' };
  }
};

export const ScheduleSection: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const activeDay = SCHEDULE_DATA[activeDayIndex];

  return (
    <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#E3F5EB] overflow-hidden" id="schedule">
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#15803D 1px, transparent 1px), linear-gradient(90deg, #15803D 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2px_2px_0px_#202020] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#202020] tracking-widest uppercase font-bold">
              CHRONOLOGY // 18–24 JAN 2027
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#202020] tracking-tight leading-tight">
            Seven Days, <span className="text-[#15803D] underline decoration-[#86EFAC] decoration-wavy decoration-2">One Campus.</span>
          </h2>
        </div>

        {/* 7 Days Tab List Ribbon: Perforated Paper Ticket Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3 mb-6 sm:mb-8" role="tablist" aria-label="Festival days">
          {SCHEDULE_DATA.map((day, idx) => {
            const isSelected = activeDayIndex === idx;
            return (
              <button
                key={day.dayNumber}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveDayIndex(idx)}
                className={`p-2.5 sm:p-3 rounded-sm font-mono text-left transition-all duration-200 border-2 border-[#202020] flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#15803D] text-white shadow-[3.5px_3.5px_0px_#202020] -translate-y-0.5'
                    : 'bg-[#FFFFFF] text-[#202020] shadow-[2px_2px_0px_#202020] hover:bg-[#F0FDF4] hover:shadow-[3px_3px_0px_#202020] hover:-translate-y-0.5'
                }`}
              >
                <div className={`flex items-center justify-between text-[11px] sm:text-xs font-bold mb-1 ${isSelected ? 'text-[#BBF7D0]' : 'text-[#625E56]'}`}>
                  <span>{day.dayName}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#86EFAC]" />}
                </div>
                <div className={`text-xl sm:text-2xl font-black font-display ${isSelected ? 'text-white' : 'text-[#202020]'}`}>
                  {day.dayNumber}
                </div>
                <div className={`text-[9px] sm:text-[10px] font-bold mt-0.5 tracking-wider uppercase truncate ${isSelected ? 'text-[#BBF7D0]' : 'text-[#625E56]'}`}>
                  JAN 2027
                </div>
              </button>
            );
          })}
        </div>

        {/* Sessions Panel for the Active Day: Pure Paper Dossier Sheet */}
        <div className="rounded-sm border-2 border-[#202020] bg-[#FFFFFF] p-5 sm:p-6 shadow-[5px_5px_0px_#202020] relative" role="tabpanel">
          {/* Washi Tape Corner */}
          <div
            className="paper-tape"
            style={{
              top: '-10px',
              right: '12%',
              width: '56px',
              transform: 'rotate(-4deg)',
            }}
          />

          <div className="flex items-center justify-between border-b-2 border-dashed border-[#202020]/25 pb-3 mb-4 sm:mb-5">
            <div className="font-mono text-xs sm:text-sm font-black text-[#202020] flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#15803D]" />
              <span>{activeDay.dateStr}</span>
            </div>
            <span className="font-mono text-[11px] sm:text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-sm border border-[#202020]">
              {activeDay.sessions.length} SESSIONS SCHEDULED
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay.dayNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {activeDay.sessions.map((sess, idx) => (
                <motion.div
                  key={`${activeDay.dayNumber}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className="p-3.5 sm:p-4 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] shadow-[2.5px_2.5px_0px_#202020] hover:shadow-[3.5px_3.5px_0px_#202020] hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-[#15803D] font-black min-w-[70px] bg-[#FFFFFF] px-2.5 py-1 rounded-sm border border-[#202020]">
                      <Clock className="w-3.5 h-3.5 text-[#15803D]" />
                      <span>{sess.time}</span>
                    </div>

                    <div>
                      <h3 className="font-display font-black text-base sm:text-lg text-[#202020] group-hover:text-[#15803D] transition-colors">
                        {sess.title}
                      </h3>
                      <div className="flex items-center gap-1.5 font-mono text-xs text-[#625E56] font-medium mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#15803D]" />
                        <span>{sess.venue}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className="font-mono text-xs px-3 py-1 rounded-sm font-bold uppercase tracking-wider self-start sm:self-auto shadow-[1.5px_1.5px_0px_#202020]"
                    style={getTagBadgeStyle(sess.tag)}
                  >
                    {sess.tag}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Schedule Sub-note */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#625E56]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#15803D]" />
            <span className="font-bold text-[#202020]">All tracks hosted on Main Campus · Timings in Indian Standard Time (IST)</span>
          </div>
          <a
            href="#register"
            className="text-[#15803D] hover:text-[#065F46] transition-colors font-bold flex items-center gap-1"
          >
            <span>Register for festival passes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
