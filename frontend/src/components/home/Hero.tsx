import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, Cpu } from 'lucide-react';
import { LetterReveal } from '../common/LetterReveal';

interface HeroProps {
  onOpenSubmission?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [timeDetails, setTimeDetails] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(2027, 0, 18, 9, 0, 0).getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setDaysLeft(d);
        setTimeDetails({ d, h, m, s });
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="top">
      {/* Exact SVG Circuit from Tech Gallery 2027.html */}
      <svg
        className="circuit"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M0 240H320L360 280H640" />
        <path d="M1440 120H1160L1120 160H980V320" />
        <path d="M1440 560H1200L1160 600H900" />
        <path d="M0 640H240V700" />
        <path className="lit" pathLength="1" d="M0 400H240L280 440H560V520H800" />
        <circle cx="640" cy="280" r="5" />
        <circle cx="980" cy="320" r="5" />
        <circle cx="900" cy="600" r="5" />
        <circle cx="240" cy="700" r="5" />
        <circle className="dot" cx="800" cy="520" r="7" />
      </svg>

      <div className="wrap">
        {/* Metarow */}
        <div className="metarow mono">
          <span>Annual technology exhibition</span>
          <span>Edition 2027 · Main campus</span>
          <span id="count">
            {daysLeft > 0 ? `Opens in ${daysLeft} days` : 'Happening now'}
          </span>
        </div>

        {/* Exact Title Layout with stacked GALLERY and lime 2027 badge */}
        <h1 className="title" aria-label="Tech Gallery 2027">
          <span className="l1">
            <LetterReveal text="TECH" as="span" delay={0.1} />
            <span className="yr" style={{ display: 'block' }}>2027</span>
          </span>
          <LetterReveal text="GALLERY" as="span" delay={0.25} />
        </h1>

        {/* Foot with Tagline, When & Action CTA buttons */}
        <div className="foot">
          <LetterReveal
            as="p"
            className="tag"
            text="Where Ideas Meet Innovation"
            delay={0.45}
          />

          <div className="when">
            <div>
              <span className="mono">Dates</span>
              <br />
              <strong>18–24 January 2027</strong>
            </div>
            <div className="mono" style={{ textAlign: 'right' }}>
              7 days
              <br />
              3 tracks
            </div>

            <div className="cta">
              <a className="btn fill" href="#register">
                Register now
              </a>
              <a className="btn" href="#schedule">
                View schedule
              </a>
            </div>
          </div>
        </div>

        {/* Minimalist Live Digital Countdown Row */}
        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.2rem',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
          className="mono"
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                background: 'var(--lime)',
                borderRadius: '50%',
                display: 'inline-block',
              }}
            />
            T-MINUS TO KICKOFF (18 JAN 2027 09:00 IST)
          </span>
          <span style={{ letterSpacing: '0.08em', fontSize: '0.88rem' }}>
            <strong style={{ color: 'var(--ink)' }}>{timeDetails.d}</strong>d{' '}
            <strong style={{ color: 'var(--ink)' }}>{timeDetails.h}</strong>h{' '}
            <strong style={{ color: 'var(--ink)' }}>{timeDetails.m}</strong>m{' '}
            <strong style={{ color: 'var(--accent-text)' }}>{timeDetails.s}</strong>s
          </span>
        </div>
      </div>
    </section>
  );
};
