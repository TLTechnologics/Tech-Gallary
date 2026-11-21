import React from 'react';
import { ArrowUp, Shield, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  collegeName?: string;
  email?: string;
  phone?: string;
  address?: string;
  instagramUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  collegeName = 'LJCCA',
  email = 'contact@techgallery2027.edu',
  phone = '+91 98765 43210',
  address = 'LJCCA, NEAR NEW, IIM Rd, Vastrapur, Ahmedabad, Gujarat 380015',
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#121316] border-t-2 border-[#2A2D38] pt-12 pb-8 sm:pt-14 sm:pb-10 px-4 sm:px-6 md:px-8 overflow-hidden text-white">
      {/* Background Giant Watermark Headline */}
      <div
        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 font-display text-[clamp(2.5rem,10vw,8rem)] font-black text-white/[0.03] whitespace-nowrap pointer-events-none select-none tracking-tight"
        aria-hidden="true"
      >
        TECH GALLERY 2027
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          {/* Column 1: Identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-sm bg-[#00E5FF] border-2 border-[#0A0A0D] shadow-[2px_2px_0px_#0A0A0D] flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-[#C6FF32] rounded-xs" />
              </span>
              <span className="font-display font-black text-xl text-white tracking-tight">
                TECH GALLERY <span className="px-1.5 py-0.5 rounded-xs bg-[#C6FF32] border border-[#0A0A0D] text-xs font-mono font-bold text-[#0A0A0D] shadow-[1.5px_1.5px_0px_#0A0A0D]">2027</span>
              </span>
            </div>

            <p className="font-body text-sm text-neutral-400 leading-relaxed max-w-sm mb-6 font-normal">
              Where Ideas Meet Innovation. The annual flagship technology festival and digital paper-art exhibition at {collegeName}.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border-2 border-[#3A3D4D] bg-[#1E2028] shadow-[2px_2px_0px_#0A0A0D] font-mono text-xs font-bold text-[#00E5FF]">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
              <span>18–24 JANUARY 2027 · AHMEDABAD</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 font-mono text-xs">
            <span className="text-[#00E5FF] font-black tracking-wider uppercase block mb-4">
              FESTIVAL NAVIGATION
            </span>
            <ul className="space-y-2.5 font-bold">
              <li>
                <a href="#about" className="text-neutral-300 hover:text-[#C6FF32] transition-colors">
                  01. About the Festival
                </a>
              </li>
              <li>
                <a href="#events" className="text-neutral-300 hover:text-[#C6FF32] transition-colors">
                  02. 8 Official Events
                </a>
              </li>
              <li>
                <a href="#workshops" className="text-neutral-300 hover:text-[#C6FF32] transition-colors">
                  03. Workshops &amp; Hackathons
                </a>
              </li>
              <li>
                <a href="#showcase" className="text-neutral-300 hover:text-[#C6FF32] transition-colors">
                  04. Innovation Showcase
                </a>
              </li>
              <li>
                <a href="#schedule" className="text-neutral-300 hover:text-[#C6FF32] transition-colors">
                  05. 7-Day Schedule
                </a>
              </li>
              <li>
                <a href="#register" className="text-neutral-300 hover:text-[#C6FF32] transition-colors">
                  06. Reserve Passes (Free)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Campus Coordinates */}
          <div className="lg:col-span-4 font-mono text-xs text-neutral-400">
            <span className="text-[#C6FF32] font-black tracking-wider uppercase block mb-4">
              CAMPUS HEADQUARTERS
            </span>
            <div className="flex items-start gap-2.5 mb-3 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#00E5FF] flex-shrink-0 mt-0.5" />
              <span className="font-normal text-neutral-300">{address}</span>
            </div>
            <div className="flex items-center gap-2.5 mb-2 text-neutral-300">
              <Mail className="w-4 h-4 text-[#00E5FF] flex-shrink-0" />
              <a href={`mailto:${email}`} className="font-bold hover:text-[#00E5FF] transition-colors truncate">
                {email}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#C6FF32] flex-shrink-0" />
              <span className="font-bold text-neutral-300">{phone}</span>
            </div>
          </div>
        </div>

        {/* Bottom Sub-strip */}
        <div className="pt-8 border-t-2 border-dashed border-[#2A2D38] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
          <div className="font-normal">
            © 2027 Tech Gallery. All rights reserved. Organized by {collegeName} students.
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white font-bold transition-colors cursor-pointer"
            >
              <Shield size={13} />
              <span>Admin Access</span>
            </button>

            <span className="text-neutral-600">|</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#00E5FF] hover:text-[#C6FF32] font-bold transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
