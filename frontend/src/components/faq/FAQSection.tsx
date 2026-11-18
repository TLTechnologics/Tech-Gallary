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
    <section className="relative py-24 px-4 sm:px-6 md:px-8 bg-[#F2EBDD] overflow-hidden" id="faq">
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

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2.5px_2.5px_0px_#202020] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3155E7]" />
            <span className="font-mono text-xs text-[#202020] tracking-widest uppercase font-bold">
              INTELLIGENCE BASE // FAQ
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#202020] tracking-tight leading-tight">
            Frequently Asked <span className="text-[#3155E7] underline decoration-[#FF7139] decoration-wavy decoration-2">Questions.</span>
          </h2>
        </div>

        {/* Paper Folder Accordions */}
        <div className="space-y-4">
          {displayFaqs.map((faq, idx) => {
            const currentId = faq.id || `faq-${idx}`;
            const isOpen = openId === currentId;

            return (
              <div
                key={currentId}
                className={`rounded-sm border-2 border-[#202020] transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#FFFFFF] shadow-[5px_5px_0px_#202020]'
                    : 'bg-[#FAF8F3] hover:bg-[#FFFFFF] shadow-[3px_3px_0px_#202020]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(currentId)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-sm border-1.5 border-[#202020] bg-[#FFD85A] text-[#202020] shadow-[1.5px_1.5px_0px_#202020]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display font-black text-base sm:text-lg text-[#202020]">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-2 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] text-[#202020] shadow-[1.5px_1.5px_0px_#202020] flex-shrink-0">
                    {isOpen ? <Minus size={16} className="text-[#3155E7]" /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-6 pt-1 font-body text-sm sm:text-base text-[#5F5B52] font-medium leading-relaxed border-t-2 border-dashed border-[#202020]/20 bg-[#FAF8F3]"
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
