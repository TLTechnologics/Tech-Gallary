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
    <section className="relative py-24 px-4 sm:px-6 md:px-8 bg-[#F8F5EC] overflow-hidden" id="contact">
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
            <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
            <span className="font-mono text-xs text-[#202020] tracking-widest uppercase font-bold">
              COMMUNICATIONS // DISPATCH DESK
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#202020] tracking-tight leading-tight">
            Connect With The <span className="text-[#3155E7] underline decoration-[#FFD85A] decoration-wavy decoration-2">Team.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Direct Email Action */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="mb-6 p-6 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[5px_5px_0px_#202020] relative">
              {/* Washi Tape Strip */}
              <div
                className="paper-tape"
                style={{
                  top: '-12px',
                  right: '18%',
                  width: '60px',
                  transform: 'rotate(-4deg)',
                }}
              />

              <span className="font-mono text-xs text-[#3155E7] tracking-wider uppercase font-bold block mb-2">
                PRIMARY DISPATCH CHANNEL
              </span>
              <a
                href={`mailto:${officialEmail}`}
                className="block font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#202020] hover:text-[#3155E7] transition-colors pb-2 border-b-2 border-dashed border-[#202020]/25"
              >
                {officialEmail}
              </a>
            </div>

            <p className="font-body text-base text-[#5F5B52] leading-relaxed max-w-xl mb-8 font-medium">
              Have questions regarding festival registration, jury evaluation, stall allocation, or college sponsorships? Our organizing committee responds within 24 hours.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={shareWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-mono text-xs font-bold text-white bg-[#25D366] border-2 border-[#202020] shadow-[3px_3px_0px_#202020] hover:shadow-[4.5px_4.5px_0px_#202020] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Share2 size={14} />
                <span>Share on WhatsApp</span>
              </button>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-mono text-xs font-bold text-[#202020] bg-[#FFFFFF] border-2 border-[#202020] shadow-[3px_3px_0px_#202020] hover:shadow-[4.5px_4.5px_0px_#202020] hover:-translate-y-0.5 transition-all"
              >
                <Instagram size={14} className="text-[#E94B50]" />
                <span>Official Instagram</span>
              </a>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-mono text-xs font-bold text-[#202020] bg-[#FFD85A] border-2 border-[#202020] shadow-[3px_3px_0px_#202020] hover:shadow-[4.5px_4.5px_0px_#202020] hover:-translate-y-0.5 transition-all"
              >
                <Navigation size={14} className="text-[#202020]" />
                <span>Google Maps Route</span>
              </a>
            </div>
          </div>

          {/* Right Column: Address and Phone Postal Placards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[4.5px_4.5px_0px_#202020]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] text-[#3155E7] flex-shrink-0 shadow-[1.5px_1.5px_0px_#202020]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#3155E7] uppercase font-bold tracking-wider">
                    FESTIVAL VENUE
                  </span>
                  <h4 className="font-display font-black text-lg text-[#202020] mt-0.5">
                    {collegeName} Main Campus
                  </h4>
                  <p className="font-body text-xs text-[#5F5B52] font-medium leading-relaxed mt-1">
                    {displayAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[4.5px_4.5px_0px_#FFD85A]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm border-2 border-[#202020] bg-[#FAF8F3] text-[#FF7139] flex-shrink-0 shadow-[1.5px_1.5px_0px_#202020]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#FF7139] uppercase font-bold tracking-wider">
                    COMMUNICATIONS HELPLINE
                  </span>
                  <h4 className="font-display font-black text-lg text-[#202020] mt-0.5">
                    {phone}
                  </h4>
                  <p className="font-body text-xs text-[#5F5B52] font-medium leading-relaxed mt-1">
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
