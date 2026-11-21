import React from 'react';
import { MapPin, Mail, Phone, Share2, Instagram, Navigation } from 'lucide-react';

interface ContactSectionProps {
  collegeName?: string;
  officialEmail?: string;
  phone?: string;
  address?: string;
  instagramUrl?: string;
  mapUrl?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  collegeName = 'LJCCA',
  officialEmail = 'contact@techgallery2027.edu',
  phone = '+91 98765 43210',
  address = 'LJCCA, NEAR NEW, IIM Rd, Vastrapur, Ahmedabad, Gujarat 380015',
  instagramUrl = 'https://instagram.com/techgallery2027',
  mapUrl = 'https://share.google/wWJlNwjeWMOJeZC5y',
}) => {
  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out TECH GALLERY 2027 — Where Ideas Meet Innovation (18–24 January 2027)!\n${window.location.origin}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const fullAddress = 'LJCCA, NEAR NEW, IIM Rd, Vastrapur, Ahmedabad, Gujarat 380015';
  const displayAddress = address && address.includes('Vastrapur') ? address : fullAddress;

  return (
    <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#18191E] overflow-hidden text-white" id="contact">
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#3A3D4D] bg-[#22242D] shadow-[2px_2px_0px_#0A0A0D] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF32]" />
            <span className="font-mono text-[11px] sm:text-xs text-neutral-200 tracking-widest uppercase font-bold">
              COMMUNICATIONS // DISPATCH DESK
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Connect With The <span className="text-[#C6FF32] underline decoration-[#00E5FF] decoration-wavy decoration-2">Team.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Direct Email Action */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="mb-4 p-5 sm:p-6 rounded-sm bg-[#22242D] border-2 border-[#3A3D4D] shadow-[4px_4px_0px_#0A0A0D] relative">
              {/* Washi Tape Strip */}
              <div
                className="paper-tape"
                style={{
                  top: '-10px',
                  right: '18%',
                  width: '54px',
                  transform: 'rotate(-4deg)',
                }}
              />

              <span className="font-mono text-[11px] sm:text-xs text-[#00E5FF] tracking-wider uppercase font-bold block mb-1.5">
                PRIMARY DISPATCH CHANNEL
              </span>
              <a
                href={`mailto:${officialEmail}`}
                className="block font-display font-black text-xl sm:text-2xl md:text-3xl text-white hover:text-[#00E5FF] transition-colors pb-2 border-b-2 border-dashed border-[#3A3D4D]"
              >
                {officialEmail}
              </a>
            </div>

            <p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl mb-6 font-normal">
              Have questions regarding festival registration, jury evaluation, stall allocation, or college sponsorships? Our organizing committee responds within 24 hours.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={shareWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-mono text-xs font-bold text-[#0A0A0D] bg-[#25D366] border-2 border-[#0A0A0D] shadow-[2px_2px_0px_#0A0A0D] hover:shadow-[3.5px_3.5px_0px_#0A0A0D] hover:-translate-y-0.5 transition-all cursor-pointer font-black"
              >
                <Share2 size={13} />
                <span>Share on WhatsApp</span>
              </button>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-mono text-xs font-bold text-white bg-[#22242D] border-2 border-[#3A3D4D] shadow-[2px_2px_0px_#0A0A0D] hover:shadow-[3.5px_3.5px_0px_#0A0A0D] hover:-translate-y-0.5 transition-all"
              >
                <Instagram size={13} className="text-[#E94B50]" />
                <span>Official Instagram</span>
              </a>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-mono text-xs font-bold text-[#0A0A0D] bg-[#C6FF32] border-2 border-[#0A0A0D] shadow-[2px_2px_0px_#0A0A0D] hover:shadow-[3.5px_3.5px_0px_#0A0A0D] hover:-translate-y-0.5 transition-all font-black"
              >
                <Navigation size={13} className="text-[#0A0A0D]" />
                <span>Google Maps Route</span>
              </a>
            </div>
          </div>

          {/* Right Column: Address and Phone Postal Placards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 sm:p-5 rounded-sm bg-[#22242D] border-2 border-[#3A3D4D] shadow-[3.5px_3.5px_0px_#0A0A0D]">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-sm border-2 border-[#3A3D4D] bg-[#18191E] text-[#00E5FF] flex-shrink-0 shadow-[1px_1px_0px_#0A0A0D]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[11px] sm:text-xs text-[#00E5FF] uppercase font-bold tracking-wider">
                    FESTIVAL VENUE
                  </span>
                  <h4 className="font-display font-black text-base sm:text-lg text-white mt-0.5">
                    {collegeName} Main Campus
                  </h4>
                  <p className="font-body text-xs text-neutral-300 font-normal leading-relaxed mt-1">
                    {displayAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-sm bg-[#22242D] border-2 border-[#3A3D4D] shadow-[3.5px_3.5px_0px_#C6FF32]">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-sm border-2 border-[#3A3D4D] bg-[#18191E] text-[#C6FF32] flex-shrink-0 shadow-[1px_1px_0px_#0A0A0D]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[11px] sm:text-xs text-[#C6FF32] uppercase font-bold tracking-wider">
                    COMMUNICATIONS HELPLINE
                  </span>
                  <h4 className="font-display font-black text-base sm:text-lg text-white mt-0.5">
                    {phone}
                  </h4>
                  <p className="font-body text-xs text-neutral-300 font-normal leading-relaxed mt-1">
                    Available during campus operational hours for urgent festival inquiries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
