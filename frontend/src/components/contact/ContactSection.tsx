import React from 'react';

interface ContactSectionProps {
  collegeName: string;
  officialEmail: string;
  phone: string;
  address: string;
  instagramUrl: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  collegeName,
  officialEmail = 'hello@techgallery.example',
  phone = '+91 98765 43210',
  address = 'Main Auditorium & Innovation Lab, College Campus',
  instagramUrl = 'https://instagram.com/techgallery2027',
}) => {
  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out TECH GALLERY 2027 — Where Ideas Meet Innovation (18–24 January 2027)!\n${window.location.origin}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

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
              <p>{collegeName ? `${collegeName}, ${address}` : address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
