import React, { useState, useEffect } from 'react';
import { Shield, Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenSubmission?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('top');
  const { isAdmin } = useAuth();

  useEffect(() => {
    // Scroll progress tracker and active section spy
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }

      const sections = ['top', 'about', 'events', 'showcase', 'schedule', 'register', 'faq', 'contact'];
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Events', href: '#events', id: 'events' },
    { name: 'Showcase', href: '#showcase', id: 'showcase' },
    { name: 'Schedule', href: '#schedule', id: 'schedule' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-2.5 mx-auto max-w-6xl w-[calc(100%-24px)] z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-2 border-[#202020] rounded-sm shadow-[3px_3px_0px_#202020] transition-all">
      {/* Scroll-triggered progress indicator */}
      <div 
        className="scroll-progress-bar" 
        style={{ 
          width: `${scrollPercent}%`,
          background: 'linear-gradient(90deg, #3155E7, #FF7139, #FFD85A)' 
        }} 
        aria-hidden="true" 
      />

      <div className="wrap max-w-full px-3.5 sm:px-4">
        <nav className="h-13 sm:h-14 flex items-center justify-between">
          <a className="logo flex items-center gap-2 text-decoration-none group" href="#top">
            <span className="w-6 h-6 rounded-sm bg-[#3155E7] border-1.5 border-[#202020] shadow-[1.5px_1.5px_0px_#202020] flex items-center justify-center transition-transform group-hover:-translate-y-0.5">
              <span className="w-2 h-2 bg-[#FFD85A] rounded-xs" />
            </span>
            <span className="font-display font-black text-base sm:text-lg tracking-tight text-[#202020] flex items-center gap-1.5">
              Tech Gallery
              <span className="px-1.5 py-0.5 rounded-xs bg-[#FFD85A] border border-[#202020] text-[10px] sm:text-xs font-mono font-bold text-[#202020] shadow-[1px_1px_0px_#202020]">
                2027
              </span>
            </span>
          </a>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex items-center justify-center p-1.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[1.5px_1.5px_0px_#202020] text-[#202020]"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-sans text-xs sm:text-sm font-bold tracking-tight transition-all relative py-1 px-1 ${
                    isActive ? 'text-[#3155E7]' : 'text-[#625E56] hover:text-[#202020]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3155E7] rounded-full" />
                  )}
                </a>
              );
            })}

            <a
              href="#register"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono font-bold text-xs text-white bg-[#3155E7] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] hover:shadow-[3px_3px_0px_#202020] hover:-translate-y-0.5 transition-all"
            >
              Pass Ticket
              <ArrowUpRight size={13} />
            </a>

            <button
              onClick={() => onOpenAdmin()}
              aria-label="Admin Portal"
              title="Admin Portal"
              className={`p-1.5 rounded-sm border-2 border-[#202020] flex items-center justify-center transition-all ${
                isAdmin 
                  ? 'bg-[#FFD85A] text-[#202020] shadow-[2px_2px_0px_#202020]' 
                  : 'bg-[#FFFFFF] text-[#625E56] shadow-[1.5px_1.5px_0px_#202020] hover:text-[#202020]'
              }`}
            >
              <Shield size={15} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown drawer */}
        {menuOpen && (
          <div className="md:hidden pt-3 pb-5 border-t-2 border-dashed border-[#202020]/20 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans font-bold text-base text-[#202020] py-1.5 px-2 rounded hover:bg-[#FAF8F2]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between border-t border-[#202020]/15">
              <a
                href="#register"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm font-mono font-bold text-xs text-white bg-[#3155E7] border-2 border-[#202020] shadow-[2.5px_2.5px_0px_#202020]"
              >
                Pass Ticket <ArrowUpRight size={14} />
              </a>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAdmin();
                }}
                className="p-2 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2px_2px_0px_#202020] text-[#202020]"
              >
                <Shield size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
