import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '../../types';

interface FAQSectionProps {
  faqs: FAQItem[];
}

const DEFAULT_FAQS = [
  {
    id: 'f1',
    question: 'Who can attend Tech Gallery?',
    answer:
      'Tech Gallery 2027 welcomes students, educators, tech enthusiasts, and parents. While certain internal workshops and hackathons are exclusive to our college students, the Tech Showcase and exhibition floor are open to all colleges and the public.',
  },
  {
    id: 'f2',
    question: 'Can external college students participate?',
    answer:
      'Yes! External college students can participate exclusively in the Tech Showcase by submitting and exhibiting their hardware or software projects. External students are not eligible for internal workshops or hackathons.',
  },
  {
    id: 'f3',
    question: 'Who can participate in hackathons?',
    answer:
      'Both the Bhavesh Hackathon (20 January) and Thakkar Hackathon (23 January) are strictly exclusive to students of our college. External students are not eligible for either hackathon.',
  },
  {
    id: 'f4',
    question: 'Can students submit hardware projects?',
    answer:
      'Yes! The Hardware Showcase welcomes robotics, IoT, ESP32 and Arduino creations, smart home automation, embedded systems, electronic prototypes, and innovative hardware products.',
  },
  {
    id: 'f5',
    question: 'Can students submit software projects?',
    answer:
      'Yes! The Software Showcase welcomes artificial intelligence, machine learning, web applications, Android apps, AI assistants, SaaS products, desktop tools, and automation software.',
  },
  {
    id: 'f6',
    question: 'How do I register?',
    answer:
      'Use the registration section on this site to select your pass, enter your details, and reserve your place. A unique Registration ID will be issued immediately upon confirmation.',
  },
  {
    id: 'f7',
    question: 'Is there a registration fee?',
    answer:
      'Festival access and student pass tiers are configured directly by the college organising committee. Visitor passes to open exhibition tracks are completely free.',
  },
  {
    id: 'f8',
    question: 'Will participation certificates be provided?',
    answer:
      'Yes. Official certificates of participation and exhibition recognition will be awarded to all verified attendees, workshop attendees, hackathon teams, and showcase exhibitors.',
  },
  {
    id: 'f9',
    question: 'What should I bring to a workshop?',
    answer:
      'A charged laptop and your valid student identity card. Development boards, kits, and components are provided in the designated labs.',
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const displayFaqs = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;
  const [openId, setOpenId] = useState<string | null>(displayFaqs[0]?.id || 'f1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#18191E] overflow-hidden text-white" id="faq">
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#3A3D4D 1px, transparent 1px), linear-gradient(90deg, #3A3D4D 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#3A3D4D] bg-[#22242D] shadow-[2px_2px_0px_#0A0A0D] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            <span className="font-mono text-[11px] sm:text-xs text-neutral-200 tracking-widest uppercase font-bold">
              INTELLIGENCE BASE // FAQ
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Frequently Asked <span className="text-[#00E5FF] underline decoration-[#C6FF32] decoration-wavy decoration-2">Questions.</span>
          </h2>
        </div>

        {/* Paper Folder Accordions */}
        <div className="space-y-3">
          {displayFaqs.map((faq, idx) => {
            const currentId = faq.id || `faq-${idx}`;
            const isOpen = openId === currentId;

            return (
              <div
                key={currentId}
                className={`rounded-sm border-2 transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#252833] border-[#00E5FF]/70 shadow-[4px_4px_0px_#0A0A0D]'
                    : 'bg-[#22242D] border-[#3A3D4D] hover:bg-[#282B36] shadow-[2.5px_2.5px_0px_#0A0A0D]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(currentId)}
                  className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-sm border-1.5 border-[#0A0A0D] bg-[#C6FF32] text-[#0A0A0D] shadow-[1px_1px_0px_#0A0A0D]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display font-black text-sm sm:text-base text-white">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-1.5 rounded-sm bg-[#18191E] border-2 border-[#3A3D4D] text-[#00E5FF] shadow-[1px_1px_0px_#0A0A0D] flex-shrink-0">
                    {isOpen ? <Minus size={14} className="text-[#00E5FF]" /> : <Plus size={14} className="text-[#C6FF32]" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 pb-4 pt-1.5 font-body text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed border-t-2 border-dashed border-[#3A3D4D] bg-[#1C1E26]"
                    >
                      {faq.answer}
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
