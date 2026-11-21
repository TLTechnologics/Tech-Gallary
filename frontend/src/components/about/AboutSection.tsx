import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Cpu, HeartHandshake, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const metrics = [
    { value: '07', label: 'Days on Campus', tag: 'CHRONOLOGY', desc: 'Continuous innovation sprint across high-tech college labs', color: '#3155E7', bg: '#FFFFFF' },
    { value: '24', label: 'Workshops & Talks', tag: 'CURRICULUM', desc: 'Faculty, industry leaders & alumni led deep dives', color: '#FF7139', bg: '#FAF8F3' },
    { value: '60+', label: 'Projects On Display', tag: 'INNOVATION', desc: 'Live hardware & software prototypes on exhibit', color: '#202020', bg: '#FFD85A' },
    { value: '100%', label: 'Student Organized', tag: 'COMMUNITY', desc: 'Driven by student innovators at LJCCA, Ahmedabad', color: '#E94B50', bg: '#FFFFFF' },
  ];

  const pillars = [
    {
      id: 'workshops',
      num: '01',
      title: 'Workshops',
      badge: 'Hands-on Lab',
      desc: 'Technical sessions led by faculty, seniors, and industry guests. Bring your laptop; we provide hardware kits and boards.',
      highlights: ['Embedded systems with ESP32', 'On-device Machine Learning', 'PCB design & rapid prototyping', 'Micro-frontends & Figma'],
      format: '2–3 hour immersive labs',
      icon: <Terminal className="w-5 h-5 text-[#3155E7]" />,
      accent: '#3155E7',
      tape: 'paper-tape-cobalt',
    },
    {
      id: 'hackathons',
      num: '02',
      title: 'Hackathons',
      badge: 'Sprint Arena',
      desc: 'Fast-paced engineering sprints. Form teams of 2 to 4, build working systems under pressure, and present live demos.',
      highlights: ['Edge IoT & embedded automation', 'Autonomous navigation rovers', 'Accessible software tools', '24-hour non-stop code sprint'],
      format: '24h / day-long sprints',
      icon: <Code2 className="w-5 h-5 text-[#FF7139]" />,
      accent: '#FF7139',
      tape: 'paper-tape',
    },
    {
      id: 'showcase',
      num: '03',
      title: 'Tech Showcase',
      badge: 'National Pavilion',
      desc: 'The festival centerpiece: demonstration stalls, interactive software booths, and live hardware prototypes running all day.',
      highlights: ['Hardware & Software categories', 'Industry jury critique & scoring', 'Community choice attendee voting', 'Open to all external colleges'],
      format: '2-Day flagship exhibition',
      icon: <Cpu className="w-5 h-5 text-[#202020]" />,
      accent: '#202020',
      tape: 'paper-tape-kraft',
    },
    {
      id: 'parents-ai',
      num: '04',
      title: 'AI Family Literacy',
      badge: 'Family Track',
      desc: 'A welcoming digital orientation designed specifically for parents and guardians to demystify artificial intelligence and online safety.',
      highlights: ['Plain-English conversational demos', 'Digital child safety best practices', 'Emerging career pathways in AI', 'Family interactive Q&A session'],
      format: 'Interactive 3h symposium',
      icon: <HeartHandshake className="w-5 h-5 text-[#E94B50]" />,
      accent: '#E94B50',
      tape: 'paper-tape',
    },
    {
      id: 'accreditation',
      num: '05',
      title: 'Accreditation',
      badge: 'Valedictory',
      desc: 'Grand awards ceremony honoring winners of both hackathons, outstanding showcase exhibitors, and presenting verified certificates.',
      highlights: ['Verified participation passes', 'Hackathon victor felicitations', 'Showcase jury distinction awards', 'Faculty & industry networking'],
      format: 'Grand ceremony on 24 Jan',
      icon: <Award className="w-5 h-5 text-[#3155E7]" />,
      accent: '#3155E7',
      tape: 'paper-tape-cobalt',
    },
  ];

  return (
    <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#F6EFE6] overflow-hidden" id="about">
      {/* Torn Paper Top Transition */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#F8F5EC] paper-torn-bottom" />

      {/* Background Architectural Paper Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#202020 1px, transparent 1px), linear-gradient(90deg, #202020 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2px_2px_0px_#202020] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3155E7]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#202020] tracking-widest uppercase font-bold">
              ABOUT THE FESTIVAL // MISSION
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#202020] tracking-tight leading-tight">
            Where Ideas Meet <span className="text-[#3155E7] underline decoration-[#FFD85A] decoration-wavy decoration-2">Innovation.</span>
          </h2>
        </div>

        {/* Narrative Split: Overlapping Editorial Magazine Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-10 sm:mb-12">
          <div className="lg:col-span-6 bg-[#FFFFFF] border-2 border-[#202020] p-5 sm:p-6 rounded-sm shadow-[4px_4px_0px_#202020] relative">
            {/* Washi Tape */}
            <div
              className="paper-tape"
              style={{
                top: '-10px',
                right: '18%',
                width: '54px',
                transform: 'rotate(4deg)',
              }}
            />
            <p className="font-display text-lg sm:text-xl md:text-2xl font-extrabold text-[#202020] leading-snug">
              A week where students build, show, and test technology in front of the people who will actually use it.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-3.5 font-body text-sm sm:text-base text-[#5F5B52] leading-relaxed bg-[#FAF8F3] border-2 border-[#202020] p-5 sm:p-6 rounded-sm shadow-[3.5px_3.5px_0px_#3155E7]">
            <p>
              <strong className="text-[#202020] font-bold">Tech Gallery 2027</strong> is our annual exhibition of student technical excellence. Think of it as an interactive gallery rather than an ordinary contest: every project receives a dedicated demonstration stall, hardware power, and visiting evaluators who probe deep into the architecture.
            </p>
            <p>
              Intensive workshops cultivate new technical mastery, dual hackathons ignite rapid prototype engineering, and the national Tech Showcase puts cutting-edge student hardware and software directly into the spotlight.
            </p>
          </div>
        </div>

        {/* 4 Interactive Statistics Telemetry Strip: Stamped Archival Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 sm:mb-14">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-sm border-2 border-[#202020] transition-all duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: m.bg,
                boxShadow: `3.5px 3.5px 0px #202020`,
              }}
            >
              <div className="flex items-center justify-between mb-2.5 border-b border-dashed border-[#202020]/25 pb-1.5">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase font-bold" style={{ color: m.color }}>
                  {m.tag}
                </span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }} />
              </div>

              <div
                className="font-display text-3xl sm:text-4xl font-black text-[#202020] mb-1.5"
              >
                {m.value}
              </div>

              <h3 className="font-display text-sm sm:text-base font-extrabold text-[#202020] mb-1">
                {m.label}
              </h3>
              <p className="font-mono text-[11px] sm:text-xs text-[#625E56] leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 5 Core Festival Pillars Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="font-mono text-xs text-[#3155E7] tracking-wider uppercase font-bold">
              FESTIVAL ARCHITECTURE // 5 CORE PILLARS
            </span>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-[#202020] mt-0.5">
              Engineered for Impact.
            </h3>
          </div>
          <span className="font-mono text-xs font-bold text-[#625E56] px-2.5 py-1 bg-[#FFFFFF] border-2 border-[#202020] shadow-[1.5px_1.5px_0px_#202020] rounded-sm">
            LJCCA INNOVATION FRAMEWORK
          </span>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 sm:mb-12">
          {pillars.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[3.5px_3.5px_0px_#202020] hover:shadow-[5px_5px_0px_#202020] hover:-translate-y-0.5 flex flex-col justify-between transition-all duration-200 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="p-2 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] shadow-[1.5px_1.5px_0px_#202020]">
                    {p.icon}
                  </div>
                  <span
                    className="font-mono text-[10px] sm:text-xs px-2 py-0.5 rounded-sm border-1.5 border-[#202020] tracking-wide uppercase font-bold"
                    style={{
                      color: '#202020',
                      backgroundColor: p.accent === '#202020' ? '#FFD85A' : `${p.accent}20`,
                    }}
                  >
                    {p.badge}
                  </span>
                </div>

                <span className="font-mono text-[9px] sm:text-[10px] text-[#625E56] font-bold tracking-wider">
                  PILLAR // {p.num}
                </span>
                <h4 className="font-display text-lg sm:text-xl font-black text-[#202020] mt-0.5 mb-1.5">
                  {p.title}
                </h4>
                <p className="font-body text-xs sm:text-sm text-[#5F5B52] leading-relaxed mb-3.5">
                  {p.desc}
                </p>

                <div className="border-t-2 border-dashed border-[#202020]/20 pt-2.5 mb-3.5">
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#202020] font-bold uppercase tracking-wider block mb-1.5">
                    Key Focus Modules
                  </span>
                  <ul className="space-y-1">
                    {p.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-[#202020] font-medium">
                        <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: p.accent }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-[#202020]/15 pt-2.5 flex items-center justify-between font-mono text-xs">
                <span className="text-[#625E56] font-semibold text-[11px]">FORMAT:</span>
                <span className="text-[#202020] font-bold text-xs">{p.format}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Directive Banner: Official Stamped Dispatch Paper Strip */}
        <div className="p-4 sm:p-5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[4px_4px_0px_#FFD85A] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E94B50] flex-shrink-0" />
            <div className="font-mono text-xs text-[#202020]">
              <strong className="text-[#3155E7] font-bold uppercase tracking-wide">PARTICIPATION DIRECTIVE:</strong> Bhavesh &amp; Thakkar workshops/hackathons are exclusive to our college students. National Tech Showcase is open to all external colleges.
            </div>
          </div>
          <span className="font-mono text-xs px-3 py-1 rounded-sm border-2 border-[#202020] bg-[#FFD85A] text-[#202020] font-bold whitespace-nowrap self-start md:self-auto shadow-[1.5px_1.5px_0px_#202020]">
            18–24 JANUARY 2027
          </span>
        </div>
      </div>
    </section>
  );
};
