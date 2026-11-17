import React from 'react';
import { MapPin } from 'lucide-react';

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
  officialEmail = 'hello@techgallery.example',
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

  // Ensure venue address displays full official address
  const fullAddress = 'LJCCA, NEAR NEW, IIM Rd, Vastrapur, Ahmedabad, Gujarat 380015';
  const displayAddress =
    address && address.includes('Vastrapur')
      ? address
      : fullAddress;

  return (
    <section className="s" id="contact">
      <div className="wrap">
        <div className="sh">
          <span className="mono">Contact</span>
          <h2>Talk to us.</h2>
        </div>

        <div className="contact">
          <div>
            <a className="big" href={`mailto:${officialEmail}`}>
              {officialEmail}
            </a>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button
                onClick={shareWhatsApp}
                className="chip"
                style={{ cursor: 'pointer' }}
              >
                Share on WhatsApp
              </button>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="chip"
              >
                Instagram: @techgallery2027
              </a>
            </div>
          </div>

          <div className="cl">
            <div>
              <span className="mono">Registration help</span>
              <p>desk@techgallery.example</p>
            </div>
            <div>
              <span className="mono">Direct helpline</span>
              <p>{phone}</p>
            </div>
            <div>
              <span className="mono">Sponsors and partners</span>
              <p>partners@techgallery.example</p>
            </div>
            <div>
              <span className="mono">Venue &amp; Campus</span>
              <p style={{ margin: '0.35rem 0 0.75rem', lineHeight: '1.5' }}>
                {displayAddress}
              </p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="chip"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                }}
              >
                <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--lime, #cdff2b)' }} />
                <span>Google Maps Location Reference →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
