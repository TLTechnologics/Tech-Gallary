import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '../../types';
import { X, ZoomIn } from 'lucide-react';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [filter, setFilter] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Artifacts' },
    { id: 'hardware', label: 'Hardware Prototypes' },
    { id: 'software', label: 'Neural & Software' },
    { id: 'event', label: 'Hackathons' },
    { id: 'workshop', label: 'Workshops' },
  ];

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#FCE7F3] overflow-hidden" id="gallery">
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#BE185D 1px, transparent 1px), linear-gradient(90deg, #BE185D 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2px_2px_0px_#202020] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BE185D]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#202020] tracking-widest uppercase font-bold">
              VISUAL ARCHIVES // EXHIBIT GALLERY
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#202020] tracking-tight leading-tight">
            Festival <span className="text-[#BE185D] underline decoration-[#F472B6] decoration-wavy decoration-2">Gallery.</span>
          </h2>
        </div>

        {/* Filter Chips: Tactile Paper Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8" role="group" aria-label="Filter gallery">
          {filterTabs.map((tab) => {
            const isSelected = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-sm font-mono text-[11px] sm:text-xs font-bold tracking-wider transition-all cursor-pointer border-2 border-[#202020] ${
                  isSelected
                    ? 'bg-[#BE185D] text-white shadow-[2.5px_2.5px_0px_#202020] -translate-y-0.5'
                    : 'bg-[#FFFFFF] text-[#202020] shadow-[1.5px_1.5px_0px_#202020] hover:bg-[#FDF2F8] hover:shadow-[2.5px_2.5px_0px_#202020]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Archive Directive Note */}
        <div className="p-3.5 sm:p-4 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[2.5px_2.5px_0px_#F472B6] mb-8 flex items-center gap-2.5 font-mono text-xs text-[#202020]">
          <span className="w-2 h-2 rounded-full bg-[#BE185D] flex-shrink-0" />
          <div>
            <strong className="text-[#BE185D] uppercase font-bold">ARCHIVE DIRECTIVE:</strong> High-definition concept blueprints and hardware renders are displayed as visual previews until live festival photography is archived on 18–24 January 2027.
          </div>
        </div>

        {/* Asymmetric Paper Scrapbook Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredItems.map((item, idx) => {
            const rotationClass = idx % 2 === 0 ? 'hover:rotate-0 rotate-[-0.75deg]' : 'hover:rotate-0 rotate-[0.75deg]';
            return (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className={`group cursor-pointer rounded-sm overflow-hidden border-2 border-[#202020] bg-[#FFFFFF] transition-all duration-200 shadow-[3.5px_3.5px_0px_#202020] hover:shadow-[5px_5px_0px_#202020] hover:-translate-y-0.5 flex flex-col justify-between relative ${rotationClass}`}
              >
                {/* Washi Tape Strip on Top Corner */}
                <div
                  className="paper-tape"
                  style={{
                    top: '-8px',
                    left: idx % 2 === 0 ? '15%' : '65%',
                    width: '48px',
                    transform: idx % 2 === 0 ? 'rotate(-6deg)' : 'rotate(5deg)',
                  }}
                />

                <div className="relative h-44 sm:h-48 bg-[#FAF8F3] overflow-hidden border-b-2 border-[#202020]">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Corner Zoom Pill */}
                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] text-[#202020] opacity-0 group-hover:opacity-100 transition-opacity shadow-[1.5px_1.5px_0px_#202020]">
                    <ZoomIn size={13} />
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 font-mono text-[9px] px-2 py-0.5 rounded-sm border-1.5 border-[#202020] bg-[#FFFFFF] text-[#BE185D] uppercase font-black tracking-wider shadow-[1px_1px_0px_#202020]">
                    {item.category}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4">
                  <h3 className="font-display font-black text-base sm:text-lg text-[#202020] group-hover:text-[#BE185D] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-[#5F5B52] leading-relaxed line-clamp-2 font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal: Framed White Archival Board */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-[#202020]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-sm overflow-hidden border-2 border-[#202020] bg-[#FFFFFF] shadow-[10px_10px_0px_#202020]"
            >
              <div className="relative max-h-[65vh] bg-[#FAF8F3]">
                <img
                  src={activeImage.image_url}
                  alt={activeImage.title}
                  className="w-full h-full max-h-[65vh] object-contain mx-auto"
                />
                <button
                  type="button"
                  onClick={() => setActiveImage(null)}
                  className="absolute top-4 right-4 p-2 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] text-[#202020] hover:text-[#E94B50] shadow-[2px_2px_0px_#202020] transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 border-t-2 border-dashed border-[#202020]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF8F3]">
                <div>
                  <span className="font-mono text-xs text-[#3155E7] uppercase tracking-wider font-bold">
                    {activeImage.category}
                  </span>
                  <h3 className="font-display font-black text-xl text-[#202020] mt-0.5">
                    {activeImage.title}
                  </h3>
                  <p className="font-body text-sm text-[#5F5B52] mt-1 font-medium">
                    {activeImage.description}
                  </p>
                </div>

                <span className="font-mono text-xs px-3 py-1.5 rounded-sm border-2 border-[#202020] bg-[#FFD85A] text-[#202020] font-bold whitespace-nowrap self-start sm:self-auto shadow-[2px_2px_0px_#202020]">
                  TECH GALLERY 2027
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
