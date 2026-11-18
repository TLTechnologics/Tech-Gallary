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
    <section className="relative py-24 px-4 sm:px-6 md:px-8 bg-[#F2EBDD] overflow-hidden" id="gallery">
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
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
            <span className="w-2 h-2 rounded-full bg-[#E94B50]" />
            <span className="font-mono text-xs text-[#202020] tracking-widest uppercase font-bold">
              VISUAL ARCHIVES // EXHIBIT GALLERY
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#202020] tracking-tight leading-tight">
            Festival <span className="text-[#3155E7] underline decoration-[#FFD85A] decoration-wavy decoration-2">Gallery.</span>
          </h2>
        </div>

        {/* Filter Chips: Tactile Paper Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10" role="group" aria-label="Filter gallery">
          {filterTabs.map((tab) => {
            const isSelected = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-sm font-mono text-xs font-bold tracking-wider transition-all cursor-pointer border-2 border-[#202020] ${
                  isSelected
                    ? 'bg-[#FFD85A] text-[#202020] shadow-[3.5px_3.5px_0px_#202020] -translate-y-0.5'
                    : 'bg-[#FFFFFF] text-[#202020] shadow-[2px_2px_0px_#202020] hover:shadow-[3px_3px_0px_#202020]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Archive Directive Note */}
        <div className="p-4 sm:p-5 rounded-sm border-2 border-[#202020] bg-[#FFFFFF] shadow-[3px_3px_0px_#202020] mb-10 flex items-center gap-3 font-mono text-xs text-[#202020]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3155E7] flex-shrink-0" />
          <div>
            <strong className="text-[#3155E7] uppercase font-bold">ARCHIVE DIRECTIVE:</strong> High-definition concept blueprints and hardware renders are displayed as visual previews until live festival photography is archived on 18–24 January 2027.
          </div>
        </div>

        {/* Asymmetric Paper Scrapbook Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const rotationClass = idx % 2 === 0 ? 'hover:rotate-0 rotate-[-0.75deg]' : 'hover:rotate-0 rotate-[0.75deg]';
            return (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className={`group cursor-pointer rounded-sm overflow-hidden border-2 border-[#202020] bg-[#FFFFFF] transition-all duration-200 shadow-[4.5px_4.5px_0px_#202020] hover:shadow-[6.5px_6.5px_0px_#202020] hover:-translate-y-1 flex flex-col justify-between relative ${rotationClass}`}
              >
                {/* Washi Tape Strip on Top Corner */}
                <div
                  className="paper-tape"
                  style={{
                    top: '-10px',
                    left: idx % 2 === 0 ? '15%' : '65%',
                    width: '55px',
                    transform: idx % 2 === 0 ? 'rotate(-6deg)' : 'rotate(5deg)',
                  }}
                />

                <div className="relative h-60 bg-[#FAF8F3] overflow-hidden border-b-2 border-[#202020]">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Corner Zoom Pill */}
                  <div className="absolute top-3 right-3 p-2 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] text-[#202020] opacity-0 group-hover:opacity-100 transition-opacity shadow-[2px_2px_0px_#202020]">
                    <ZoomIn size={15} />
                  </div>

                  <div className="absolute bottom-3 left-3 font-mono text-[9px] px-2.5 py-0.5 rounded-sm border-1.5 border-[#202020] bg-[#FFFFFF] text-[#202020] uppercase font-black tracking-wider shadow-[1.5px_1.5px_0px_#202020]">
                    {item.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-black text-lg text-[#202020] group-hover:text-[#3155E7] transition-colors mb-1">
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
