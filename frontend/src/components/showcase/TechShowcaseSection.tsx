import React, { useState } from 'react';
import { ProjectRecord } from '../../types';
import { LetterReveal } from '../common/LetterReveal';
import { InfiniteCardsMarquee } from '../common/InfiniteCardsMarquee';
import { Cpu, Code2, ArrowUpRight } from 'lucide-react';

interface TechShowcaseSectionProps {
  projects: ProjectRecord[];
  onOpenSubmission?: () => void;
}

interface StaticPlacard {
  id: string;
  type: 'hw' | 'sw';
  code: string;
  category: string;
  title: string;
  description: string;
  by: string;
  svg: React.ReactNode;
}

const STATIC_PLATES: StaticPlacard[] = [
  {
    id: 'p1',
    type: 'hw',
    code: 'TG-H01',
    category: 'Hardware',
    title: 'Soil Sense',
    description: 'A low-cost sensor mesh that tells small farms when and where to water.',
    by: 'Electronics Society',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <path d="M30 130H110V70H190V40H270" stroke="#202020" strokeWidth="2.5" fill="none" />
        <circle cx="110" cy="70" r="7" fill="#00B5D8" stroke="#202020" strokeWidth="2" />
        <circle cx="270" cy="40" r="7" fill="#1E3A8A" stroke="#202020" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'p2',
    type: 'sw',
    code: 'TG-S01',
    category: 'Software',
    title: 'Notebook Lens',
    description: 'Turns photographed handwritten notes into searchable, linked study cards.',
    by: 'Computer Science, Year 3',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <path d="M110 55L70 85L110 115M190 55L230 85L190 115" stroke="#202020" strokeWidth="2.5" fill="none" />
        <rect x="132" y="70" width="36" height="30" fill="#38BDF8" stroke="#202020" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'p3',
    type: 'hw',
    code: 'TG-H02',
    category: 'Hardware',
    title: 'Arm 5',
    description: 'A five-axis desktop robotic arm, 3D printed and driven by open firmware.',
    by: 'Robotics Club',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <rect x="90" y="40" width="120" height="90" fill="#F0F9FF" stroke="#202020" strokeWidth="2" />
        <path d="M90 70H210M120 40V130" stroke="#202020" strokeWidth="2" />
        <circle cx="165" cy="100" r="10" fill="#1E3A8A" stroke="#202020" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'p4',
    type: 'sw',
    code: 'TG-S02',
    category: 'Software',
    title: 'Campus Graph',
    description: 'A map of lab equipment and free hours so students stop hunting for a bench.',
    by: 'Information Technology',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <circle cx="150" cy="85" r="9" fill="#38BDF8" stroke="#202020" strokeWidth="2" />
        <circle cx="80" cy="50" r="6" fill="#1E3A8A" stroke="#202020" strokeWidth="1.5" />
        <circle cx="220" cy="55" r="6" fill="#0284C7" stroke="#202020" strokeWidth="1.5" />
        <circle cx="90" cy="125" r="6" fill="#E0F2FE" stroke="#202020" strokeWidth="1.5" />
        <circle cx="215" cy="120" r="6" fill="#E0F2FE" stroke="#202020" strokeWidth="1.5" />
        <path d="M150 85L80 50M150 85L220 55M150 85L90 125M150 85L215 120" stroke="#202020" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'p5',
    type: 'hw',
    code: 'TG-H03',
    category: 'Hardware',
    title: 'Pulse Band',
    description: 'A wearable that tracks heart rate variability and flags fatigue during study.',
    by: 'Biomedical Engineering',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <path d="M60 120Q110 30 150 85T240 50" stroke="#202020" strokeWidth="2.5" fill="none" />
        <rect x="138" y="73" width="24" height="24" fill="#0284C7" stroke="#202020" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'p6',
    type: 'sw',
    code: 'TG-S03',
    category: 'Software',
    title: 'Open Viva',
    description: 'A practice tool that asks follow-up questions the way a real examiner would.',
    by: 'AI & Data Science',
    svg: (
      <svg viewBox="0 0 300 170" aria-hidden="true">
        <rect x="70" y="45" width="160" height="80" fill="#F0F9FF" stroke="#202020" strokeWidth="2" />
        <path d="M70 65H230M90 85H150M90 100H190" stroke="#202020" strokeWidth="2" />
        <rect x="170" y="80" width="40" height="10" fill="#1E3A8A" stroke="#202020" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export const TechShowcaseSection: React.FC<TechShowcaseSectionProps> = ({
  projects,
}) => {
  const [filter, setFilter] = useState<'all' | 'hw' | 'sw'>('all');

  const filteredStatic = STATIC_PLATES.filter((p) => {
    if (filter === 'all') return true;
    return p.type === filter;
  });

  const filteredDynamic = projects.filter((p) => {
    if (filter === 'all') return true;
    const cat = p.category.toLowerCase();
    if (filter === 'hw') return cat.includes('hardware');
    if (filter === 'sw') return cat.includes('software');
    return true;
  });

  const renderPlateCard = (plate: StaticPlacard, uniqueKey?: string) => (
    <div key={uniqueKey || plate.id} className="plate" data-t={plate.type}>
      <div className="art">
        <div className="tech-badge-overlay mono">
          <span className="font-bold text-[#202020]">{plate.code}</span>
          <span className="inline-flex items-center gap-1.5 font-bold text-[#202020]">
            <span className="w-2 h-2 rounded-full bg-[#3155E7]" />
            {plate.type === 'hw' ? 'HW // PLACARD' : 'SW // PLACARD'}
          </span>
        </div>
        {plate.svg}
      </div>
      <div className="pb">
        <div className="top mono">
          <span className="code-tag">{plate.code}</span>
          <span className="cat-pill">{plate.category}</span>
        </div>
        <h3 className="font-display font-black text-xl text-[#202020]">{plate.title}</h3>
        <p className="font-body text-xs text-[#5F5B52] leading-relaxed">{plate.description}</p>
        <div className="by mono text-xs font-bold text-[#202020]">{plate.by}</div>
      </div>
    </div>
  );

  const renderDynamicCard = (project: ProjectRecord, idx: number, uniqueKey?: string) => {
    const isHw = project.category.toLowerCase().includes('hardware');
    const code = `TG-${isHw ? 'H' : 'S'}${String(idx + 10).padStart(2, '0')}`;
    return (
      <div key={uniqueKey || project.id} className="plate" data-t={isHw ? 'hw' : 'sw'}>
        <div className="art">
          <div className="tech-badge-overlay mono">
            <span className="font-bold text-[#202020]">{code}</span>
            <span className="inline-flex items-center gap-1.5 font-bold text-[#202020]">
              <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
              {isHw ? 'HW // PLACARD' : 'SW // PLACARD'}
            </span>
          </div>
          <svg viewBox="0 0 300 170" aria-hidden="true">
            <rect x="50" y="50" width="200" height="70" fill="#FAF8F3" stroke="#202020" strokeWidth="2" />
            <circle cx="150" cy="85" r="14" fill="#FFD85A" stroke="#202020" strokeWidth="2" />
            <path d="M50 85H136M164 85H250" stroke="#202020" strokeWidth="2" />
          </svg>
        </div>
        <div className="pb">
          <div className="top mono">
            <span className="code-tag">{code}</span>
            <span className="cat-pill">{project.category}</span>
          </div>
          <h3 className="font-display font-black text-xl text-[#202020]">{project.project_name}</h3>
          <p className="font-body text-xs text-[#5F5B52] leading-relaxed">{project.description}</p>
          <div className="by mono text-xs font-bold text-[#202020]">
            {project.student_name} · {project.college_name}
          </div>
        </div>
      </div>
    );
  };

  // Dedicated Rows for Two-Row Infinite Marquee
  const hwCards = [
    ...STATIC_PLATES.filter((p) => p.type === 'hw').map((plate) => renderPlateCard(plate, `hw-${plate.id}`)),
    ...projects
      .filter((p) => p.category.toLowerCase().includes('hardware'))
      .map((proj, idx) => renderDynamicCard(proj, idx, `hw-dyn-${proj.id}`)),
  ];

  const swCards = [
    ...STATIC_PLATES.filter((p) => p.type === 'sw').map((plate) => renderPlateCard(plate, `sw-${plate.id}`)),
    ...projects
      .filter((p) => !p.category.toLowerCase().includes('hardware'))
      .map((proj, idx) => renderDynamicCard(proj, idx, `sw-dyn-${proj.id}`)),
  ];

  return (
    <section className="relative py-14 sm:py-16 md:py-20 bg-[#E2EFFC] overflow-hidden" id="showcase">
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#1E3A8A 1px, transparent 1px), linear-gradient(90deg, #1E3A8A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="wrap max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2px_2px_0px_#202020] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B5D8]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#202020] tracking-widest uppercase font-bold">
              NATIONAL INNOVATION PAVILION
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#202020] tracking-tight leading-tight">
            Flagship Innovation <span className="text-[#1E3A8A] underline decoration-[#00B5D8] decoration-wavy decoration-2">Showcase.</span>
          </h2>
        </div>

        {/* Action Header Strip */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
          {/* Tactile Filter Chips */}
          <div className="filters" role="group" aria-label="Filter projects" style={{ marginBottom: 0 }}>
            <button
              className="chip"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              All Exhibits
            </button>
            <button
              className="chip"
              aria-pressed={filter === 'hw'}
              onClick={() => setFilter('hw')}
            >
              Hardware Prototypes
            </button>
            <button
              className="chip"
              aria-pressed={filter === 'sw'}
              onClick={() => setFilter('sw')}
            >
              Software Systems
            </button>
          </div>

          <a
            href="#register"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm font-mono font-bold text-xs text-white bg-[#1E3A8A] hover:bg-[#1746A2] border-2 border-[#202020] shadow-[3px_3px_0px_#00B5D8] hover:shadow-[4.5px_4.5px_0px_#00B5D8] hover:-translate-y-0.5 transition-all"
          >
            Exhibit Your Project <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Official Banner Note */}
        <div className="p-4 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[3px_3px_0px_#00B5D8] mb-8 font-mono text-xs text-[#202020] font-medium">
          “Students from all external and host colleges are welcome to exhibit their hardware and software projects. Register below with a Project Showcasing pass to unlock your project submission upon admin review.”
        </div>

        {/* Card Collections: 2-Row Infinite Marquee on 'All' / Filtered Grid on Specific Selection */}
        {filter === 'all' ? (
          <InfiniteCardsMarquee
            row1Cards={hwCards}
            row2Cards={swCards}
            speedSeconds={40}
          />
        ) : (
          <div className="plates">
            {filteredStatic.map((plate) => renderPlateCard(plate))}
            {filteredDynamic.map((project, idx) => renderDynamicCard(project, idx))}
          </div>
        )}

        {/* Disciplines Specification Breakdown: Technical Spec Dossiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 pt-8 border-t-2 border-dashed border-[#202020]/25">
          <div className="p-5 sm:p-6 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[4px_4px_0px_#1E3A8A]">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="p-2 rounded-sm border-2 border-[#202020] bg-[#F0F9FF] shadow-[1.5px_1.5px_0px_#202020]">
                <Cpu className="w-4 h-4 text-[#1E3A8A]" />
              </div>
              <h4 className="font-display text-lg sm:text-xl font-black text-[#202020]">
                Hardware Showcase Track
              </h4>
            </div>
            <ul className="space-y-2 font-mono text-xs text-[#5F5B52]">
              <li className="flex items-center gap-2"><span className="text-[#1E3A8A] font-bold">▹</span> Robotics &amp; Autonomous Vehicles</li>
              <li className="flex items-center gap-2"><span className="text-[#1E3A8A] font-bold">▹</span> IoT (Internet of Things) Distributed Nodes</li>
              <li className="flex items-center gap-2"><span className="text-[#1E3A8A] font-bold">▹</span> ESP32, STM32 &amp; Arduino Hardware Projects</li>
              <li className="flex items-center gap-2"><span className="text-[#1E3A8A] font-bold">▹</span> Smart Home &amp; Industrial Automation</li>
              <li className="flex items-center gap-2"><span className="text-[#1E3A8A] font-bold">▹</span> Embedded Systems &amp; Firmware Architectures</li>
              <li className="flex items-center gap-2"><span className="text-[#1E3A8A] font-bold">▹</span> Custom Electronic Prototypes &amp; PCB Assemblies</li>
              <li className="flex items-center gap-2"><span className="text-[#1E3A8A] font-bold">▹</span> Innovative Hardware Products &amp; Energy Systems</li>
            </ul>
          </div>

          <div className="p-5 sm:p-6 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[4px_4px_0px_#00B5D8]">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="p-2 rounded-sm border-2 border-[#202020] bg-[#F0F9FF] shadow-[1.5px_1.5px_0px_#202020]">
                <Code2 className="w-4 h-4 text-[#00B5D8]" />
              </div>
              <h4 className="font-display text-lg sm:text-xl font-black text-[#202020]">
                Software Showcase Track
              </h4>
            </div>
            <ul className="space-y-2 font-mono text-xs text-[#5F5B52]">
              <li className="flex items-center gap-2"><span className="text-[#00B5D8] font-bold">▹</span> Artificial Intelligence &amp; LLM Orchestrations</li>
              <li className="flex items-center gap-2"><span className="text-[#00B5D8] font-bold">▹</span> Machine Learning Models &amp; Neural Pipelines</li>
              <li className="flex items-center gap-2"><span className="text-[#00B5D8] font-bold">▹</span> Next-Gen Web Applications &amp; Micro-Frontends</li>
              <li className="flex items-center gap-2"><span className="text-[#00B5D8] font-bold">▹</span> Android &amp; Cross-Platform Native Applications</li>
              <li className="flex items-center gap-2"><span className="text-[#00B5D8] font-bold">▹</span> Autonomous AI Assistants &amp; Agent Swarms</li>
              <li className="flex items-center gap-2"><span className="text-[#00B5D8] font-bold">▹</span> Enterprise SaaS Products &amp; Cloud APIs</li>
              <li className="flex items-center gap-2"><span className="text-[#00B5D8] font-bold">▹</span> Desktop Applications &amp; Security Automation Tools</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
