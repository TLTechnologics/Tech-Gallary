import React, { useState } from 'react';
import { GalleryItem } from '../../types';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [filter, setFilter] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'software', label: 'Software' },
    { id: 'event', label: 'Hackathons' },
    { id: 'workshop', label: 'Workshops' },
  ];

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <section className="s" id="gallery">
      <div className="wrap">
        <div className="sh">
          <span className="mono">Archives</span>
          <h2>Festival gallery.</h2>
        </div>

        {/* Filter Chips */}
        <div className="filters" role="group" aria-label="Filter gallery">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              className="chip"
              aria-pressed={filter === tab.id}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Distinguishing Notice */}
        <div
          style={{
            padding: '1rem 1.2rem',
            background: 'var(--card)',
            border: '1px solid var(--line)',
            marginBottom: '2rem',
            fontSize: '0.85rem',
          }}
          className="mono"
        >
          <span>
            [ARCHIVE NOTICE] Concept renders and hardware blueprints are marked as placeholder illustrations until live festival photos are captured on 18–24 January 2027.
          </span>
        </div>

        {/* Gallery Plates */}
        <div className="plates">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="plate"
              onClick={() => setActiveImage(item)}
              style={{ cursor: 'pointer' }}
            >
              <div
                style={{
                  height: '200px',
                  background: 'var(--bg)',
                  overflow: 'hidden',
                  position: 'relative',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(20%)',
                  }}
                  loading="lazy"
                />
                {item.is_placeholder && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'var(--bg)',
                      color: 'var(--accent-text)',
                      padding: '2px 8px',
                      border: '1px solid var(--line)',
                      fontSize: '0.7rem',
                    }}
                    className="mono"
                  >
                    CONCEPT
                  </span>
                )}
              </div>

              <div className="pb">
                <div className="top mono">
                  <span>{item.category.toUpperCase()}</span>
                  <span>2027</span>
                </div>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Image Modal Lightbox */}
      {activeImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setActiveImage(null)}
        >
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--line)',
              maxWidth: '720px',
              width: '100%',
              padding: '1.5rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span className="mono">{activeImage.category.toUpperCase()}</span>
              <button
                onClick={() => setActiveImage(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
            <img
              src={activeImage.image_url}
              alt={activeImage.title}
              style={{ width: '100%', maxHeight: '420px', objectFit: 'contain' }}
            />
            <h3 style={{ marginTop: '1rem' }}>{activeImage.title}</h3>
            {activeImage.description && (
              <p style={{ color: 'var(--mute)', marginTop: '0.4rem' }}>{activeImage.description}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
