import React from 'react';
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

  return (
    <section className="s" id="faq">
      <div className="wrap">
        <div className="sh">
          <span className="mono">FAQ</span>
          <h2>Good to know.</h2>
        </div>

        <div className="faq">
          {displayFaqs.map((faq, idx) => (
            <details key={faq.id || idx} open={idx === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
