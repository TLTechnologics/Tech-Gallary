import React, { useState } from 'react';
import { EventItem } from '../../types';
import { EventDetailModal } from './EventDetailModal';
import { LetterReveal } from '../common/LetterReveal';

interface EventsTimelineProps {
  events: EventItem[];
  onSelectRegister: (eventId: string) => void;
  onSelectShowcase: () => void;
}

export const EventsTimeline: React.FC<EventsTimelineProps> = ({
  events,
  onSelectRegister,
  onSelectShowcase,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  return (
    <section className="s" id="events">
      <div className="wrap">
        <div className="sh">
          <span className="mono">Events</span>
          <LetterReveal as="h2" text="Learn, build, show." />
        </div>

        {/* 3 Main Track Cards matching Tech Gallery 2027.html */}
        <div className="grid3">
          <article className="ev">
            <div className="glyph">
              <svg viewBox="0 0 72 72" aria-hidden="true">
                <rect x="6" y="14" width="60" height="44" />
                <path d="M6 26H66" />
                <rect className="f" x="14" y="34" width="18" height="16" />
              </svg>
            </div>
            <h3>Workshops</h3>
            <p>
              Hands-on sessions led by seniors, alumni and industry guests. Bring a laptop; we provide the kits.
            </p>
            <ul>
              <li>Embedded systems with ESP32</li>
              <li>On-device machine learning</li>
              <li>PCB design basics</li>
              <li>Prototyping in Figma</li>
            </ul>
            <dl>
              <dt>Format</dt>
              <dd>2–3 hour sessions</dd>
              <dt>Seats</dt>
              <dd>40 per workshop</dd>
            </dl>
          </article>

          <article className="ev">
            <div className="glyph">
              <svg viewBox="0 0 72 72" aria-hidden="true">
                <circle cx="20" cy="52" r="6" className="f" />
                <circle cx="52" cy="20" r="6" />
                <path d="M20 46V30H46M52 26V40H36" />
              </svg>
            </div>
            <h3>Hackathons</h3>
            <p>
              Form a team of up to four and build a working prototype from a problem statement revealed on day one.
            </p>
            <ul>
              <li>36-hour build sprint</li>
              <li>Mentor check-ins</li>
              <li>Live demos to a panel</li>
              <li>Hardware and software tracks</li>
            </ul>
            <dl>
              <dt>Format</dt>
              <dd>Teams of 2–4</dd>
              <dt>Window</dt>
              <dd>18–23 January</dd>
            </dl>
          </article>

          <article className="ev">
            <div className="glyph">
              <svg viewBox="0 0 72 72" aria-hidden="true">
                <path d="M10 60V18H62V60" />
                <path d="M10 38H62" />
                <circle className="f" cx="36" cy="28" r="6" />
                <circle cx="24" cy="49" r="6" />
                <circle cx="48" cy="49" r="6" />
              </svg>
            </div>
            <h3>Tech Showcase</h3>
            <p>
              An open exhibition where teams present finished projects to visitors, faculty and judges.
            </p>
            <ul>
              <li>Hardware and robotics</li>
              <li>Apps, tools and AI</li>
              <li>Visitor voting</li>
              <li>Jury awards</li>
            </ul>
            <dl>
              <dt>Format</dt>
              <dd>Stall-based display</dd>
              <dt>Open</dt>
              <dd>21–24 January</dd>
            </dl>
          </article>
        </div>

        {/* 8 Official Festival Events Grid with Rules & Details */}
        <div style={{ marginTop: '3.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span className="mono" style={{ textTransform: 'uppercase' }}>Official Festival Program (8 Core Events)</span>
            <span className="mono">Click any event to inspect eligibility &amp; rules</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1px',
              border: '1px solid var(--line)',
              background: 'var(--line)',
            }}
          >
            {events.map((ev) => (
              <div
                key={ev.id}
                onClick={() => setSelectedEvent(ev)}
                style={{
                  background: 'var(--card)',
                  padding: '1.3rem 1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.7rem',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--card)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mono">
                  <span style={{ color: 'var(--accent-text)', fontWeight: 600 }}>{ev.date_display}</span>
                  <span
                    style={{
                      border: '1px solid var(--line)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '100px',
                      fontSize: '0.72rem',
                      color: ev.eligibility_type === 'internal_only' ? 'var(--mute)' : 'var(--lime)',
                    }}
                  >
                    {ev.eligibility_type === 'internal_only' ? 'College Only' : ev.eligibility_type === 'parents_only' ? 'Parents' : 'All Colleges'}
                  </span>
                </div>
                <h4 style={{ margin: 0, fontFamily: 'var(--h)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {ev.name}
                </h4>
                <p style={{ margin: 0, color: 'var(--mute)', fontSize: '0.9rem', lineHeight: 1.4 }}>
                  {ev.tagline || ev.description.slice(0, 80) + '...'}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '0.6rem', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mono">
                  <span style={{ fontSize: '0.75rem' }}>View details →</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ink)' }}>{ev.timing || 'Campus Lab'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSelectRegister={(eventId: string) => {
            setSelectedEvent(null);
            onSelectRegister(eventId);
          }}
          onSelectShowcase={() => {
            setSelectedEvent(null);
            onSelectShowcase();
          }}
        />
      )}
    </section>
  );
};
