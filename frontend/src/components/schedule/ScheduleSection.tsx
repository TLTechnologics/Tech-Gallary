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
      return { background: '#FAF8F3', color: '#202020', border: '1.5px solid #202020' };
    case 'workshop':
      return { background: '#EBF1FF', color: '#3155E7', border: '1.5px solid #202020' };
    case 'showcase':
      return { background: '#FFD85A', color: '#202020', border: '1.5px solid #202020' };
    case 'ceremony':
      return { background: '#FFECEC', color: '#E94B50', border: '1.5px solid #202020' };
    case 'talk':
      return { background: '#FAF8F3', color: '#202020', border: '1.5px solid #202020' };
    default:
      return { background: '#FAF8F3', color: '#625E56', border: '1.5px solid #202020' };
  }
};

export const ScheduleSection: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const activeDay = SCHEDULE_DATA[activeDayIndex];

  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-8 bg-[#F8F5EC] overflow-hidden" id="schedule">
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
              CHRONOLOGY // 18–24 JAN 2027
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#202020] tracking-tight leading-tight">
            Seven Days, <span className="text-[#3155E7] underline decoration-[#FF7139] decoration-wavy decoration-2">One Campus.</span>
          </h2>
        </div>

        {/* 7 Days Tab List Ribbon: Perforated Paper Ticket Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8" role="tablist" aria-label="Festival days">
          {SCHEDULE_DATA.map((day, idx) => {
            const isSelected = activeDayIndex === idx;
            return (
              <button
                key={day.dayNumber}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveDayIndex(idx)}
                className={`p-4 rounded-sm font-mono text-left transition-all duration-200 border-2 border-[#202020] flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFD85A] text-[#202020] shadow-[4.5px_4.5px_0px_#202020] -translate-y-1'
                    : 'bg-[#FFFFFF] text-[#202020] shadow-[2.5px_2.5px_0px_#202020] hover:shadow-[3.5px_3.5px_0px_#202020] hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#625E56] mb-1">
                  <span>{day.dayName}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#E94B50]" />}
                </div>
                <div className="text-2xl sm:text-3xl font-black font-display text-[#202020]">
                  {day.dayNumber}
                </div>
                <div className="text-[10px] font-bold text-[#625E56] mt-1 tracking-wider uppercase truncate">
                  JAN 2027
                </div>
              </button>
            );
          })}
        </div>

        {/* Sessions Panel for the Active Day: Pure Paper Dossier Sheet */}
        <div className="rounded-sm border-2 border-[#202020] bg-[#FFFFFF] p-6 sm:p-8 shadow-[6px_6px_0px_#202020] relative" role="tabpanel">
          {/* Washi Tape Corner */}
          <div
            className="paper-tape"
            style={{
              top: '-12px',
              right: '12%',
              width: '65px',
              transform: 'rotate(-4deg)',
            }}
          />

          <div className="flex items-center justify-between border-b-2 border-dashed border-[#202020]/25 pb-4 mb-6">
            <div className="font-mono text-sm font-black text-[#202020] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3155E7]" />
              <span>{activeDay.dateStr}</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#625E56] bg-[#FAF8F3] px-2.5 py-1 rounded-sm border border-[#202020]">
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
              className="space-y-4"
            >
              {activeDay.sessions.map((sess, idx) => (
                <motion.div
                  key={`${activeDay.dayNumber}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className="p-5 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] shadow-[3px_3px_0px_#202020] hover:shadow-[4.5px_4.5px_0px_#202020] hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-[#3155E7] font-black min-w-[70px] bg-[#FFFFFF] px-2.5 py-1 rounded-sm border border-[#202020]">
                      <Clock className="w-3.5 h-3.5 text-[#FF7139]" />
                      <span>{sess.time}</span>
                    </div>

                    <div>
                      <h3 className="font-display font-black text-base sm:text-lg text-[#202020] group-hover:text-[#3155E7] transition-colors">
                        {sess.title}
                      </h3>
                      <div className="flex items-center gap-1.5 font-mono text-xs text-[#625E56] font-medium mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#202020]" />
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
            <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
            <span className="font-bold text-[#202020]">All tracks hosted on Main Campus · Timings in Indian Standard Time (IST)</span>
          </div>
          <a
            href="#register"
            className="text-[#3155E7] hover:text-[#202020] transition-colors font-bold flex items-center gap-1"
          >
            <span>Register for festival passes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
