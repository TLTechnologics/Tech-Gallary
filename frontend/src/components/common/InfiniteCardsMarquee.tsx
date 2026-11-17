import React from 'react';

export interface InfiniteCardsMarqueeProps {
  row1Cards: React.ReactNode[];
  row2Cards: React.ReactNode[];
  speedSeconds?: number;
  className?: string;
}

export const InfiniteCardsMarquee: React.FC<InfiniteCardsMarqueeProps> = ({
  row1Cards,
  row2Cards,
  speedSeconds = 45,
  className = '',
}) => {
  // Ensure enough items in base list to comfortably fill widescreen displays before 2x loop
  const prepareBaseList = (items: React.ReactNode[]) => {
    if (items.length === 0) return [];
    let list = [...items];
    while (list.length < 4) {
      list = [...list, ...items];
    }
    return list;
  };

  const baseRow1 = prepareBaseList(row1Cards);
  const baseRow2 = prepareBaseList(row2Cards);

  return (
    <div className={`tg-marquee-container ${className}`}>
      {/* Row 1: Right to Left (translateX 0 to -50%) */}
      <div className="tg-marquee-wrapper" tabIndex={0} aria-label="Showcase collection row 1">
        <div className="tg-marquee-row">
          <div
            className="tg-marquee-track scroll-left"
            style={{ animationDuration: `${speedSeconds}s` }}
          >
            {/* Primary accessible set */}
            {baseRow1.map((card, idx) => (
              <div key={`r1-orig-${idx}`} className="tg-marquee-item">
                {card}
              </div>
            ))}

            {/* Seamless duplicate set for infinite loop (hidden from screen readers) */}
            {baseRow1.map((card, idx) => (
              <div
                key={`r1-dup-${idx}`}
                className="tg-marquee-item tg-marquee-duplicate"
                aria-hidden="true"
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Left to Right (translateX -50% to 0) */}
      <div className="tg-marquee-wrapper" tabIndex={0} aria-label="Showcase collection row 2">
        <div className="tg-marquee-row">
          <div
            className="tg-marquee-track scroll-right"
            style={{ animationDuration: `${speedSeconds}s` }}
          >
            {/* Primary accessible set */}
            {baseRow2.map((card, idx) => (
              <div key={`r2-orig-${idx}`} className="tg-marquee-item">
                {card}
              </div>
            ))}

            {/* Seamless duplicate set for infinite loop (hidden from screen readers) */}
            {baseRow2.map((card, idx) => (
              <div
                key={`r2-dup-${idx}`}
                className="tg-marquee-item tg-marquee-duplicate"
                aria-hidden="true"
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
