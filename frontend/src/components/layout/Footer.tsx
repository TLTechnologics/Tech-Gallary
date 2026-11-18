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
    <footer className="relative bg-[#FAF8F3] border-t-2 border-[#202020] pt-20 pb-12 px-4 sm:px-6 md:px-8 overflow-hidden text-[#202020]">
      {/* Background Giant Watermark Headline */}
      <div
        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 font-display text-[clamp(3.5rem,14vw,12rem)] font-black text-[#202020]/[0.03] whitespace-nowrap pointer-events-none select-none tracking-tight"
        aria-hidden="true"
      >
        TECH GALLERY 2027
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Column 1: Identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-sm bg-[#3155E7] border-2 border-[#202020] shadow-[2px_2px_0px_#202020] flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-[#FFD85A] rounded-xs" />
              </span>
              <span className="font-display font-black text-xl text-[#202020] tracking-tight">
                TECH GALLERY <span className="px-1.5 py-0.5 rounded-xs bg-[#FFD85A] border border-[#202020] text-xs font-mono font-bold text-[#202020] shadow-[1.5px_1.5px_0px_#202020]">2027</span>
              </span>
            </div>

            <p className="font-body text-sm text-[#5F5B52] leading-relaxed max-w-sm mb-6 font-medium">
              Where Ideas Meet Innovation. The annual flagship technology festival and digital paper-art exhibition at {collegeName}.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2px_2px_0px_#202020] font-mono text-xs font-bold text-[#3155E7]">
              <span className="w-2 h-2 rounded-full bg-[#3155E7]" />
              <span>18–24 JANUARY 2027 · AHMEDABAD</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 font-mono text-xs">
            <span className="text-[#3155E7] font-black tracking-wider uppercase block mb-4">
              FESTIVAL NAVIGATION
            </span>
            <ul className="space-y-2.5 font-bold">
              <li>
                <a href="#about" className="text-[#5F5B52] hover:text-[#202020] transition-colors">
                  01. About the Festival
                </a>
              </li>
              <li>
                <a href="#events" className="text-[#5F5B52] hover:text-[#202020] transition-colors">
                  02. 8 Official Events
                </a>
              </li>
              <li>
                <a href="#workshops" className="text-[#5F5B52] hover:text-[#202020] transition-colors">
                  03. Workshops &amp; Hackathons
                </a>
              </li>
              <li>
                <a href="#showcase" className="text-[#5F5B52] hover:text-[#202020] transition-colors">
                  04. Innovation Showcase
                </a>
              </li>
              <li>
                <a href="#schedule" className="text-[#5F5B52] hover:text-[#202020] transition-colors">
                  05. 7-Day Schedule
                </a>
              </li>
              <li>
                <a href="#register" className="text-[#5F5B52] hover:text-[#202020] transition-colors">
                  06. Reserve Passes (Free)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Campus Coordinates */}
          <div className="lg:col-span-4 font-mono text-xs text-[#5F5B52]">
            <span className="text-[#FF7139] font-black tracking-wider uppercase block mb-4">
              CAMPUS HEADQUARTERS
            </span>
            <div className="flex items-start gap-2.5 mb-3 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#202020] flex-shrink-0 mt-0.5" />
              <span className="font-medium text-[#202020]">{address}</span>
            </div>
            <div className="flex items-center gap-2.5 mb-2 text-[#202020]">
              <Mail className="w-4 h-4 text-[#3155E7] flex-shrink-0" />
              <a href={`mailto:${email}`} className="font-bold hover:text-[#3155E7] transition-colors truncate">
                {email}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#FF7139] flex-shrink-0" />
              <span className="font-bold text-[#202020]">{phone}</span>
            </div>
          </div>
        </div>

        {/* Bottom Sub-strip */}
        <div className="pt-8 border-t-2 border-dashed border-[#202020]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#625E56]">
          <div className="font-medium">
            © 2027 Tech Gallery. All rights reserved. Organized by {collegeName} students.
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-[#625E56] hover:text-[#202020] font-bold transition-colors cursor-pointer"
            >
              <Shield size={13} />
              <span>Admin Access</span>
            </button>

            <span className="text-[#202020]/25">|</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#3155E7] hover:text-[#202020] font-bold transition-colors cursor-pointer"
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
