import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TechLoaderOverlay: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(15);
  const [stage, setStage] = useState('UNFOLDING PAPER EXHIBIT...');

  const stages = [
    'UNFOLDING PAPER EXHIBIT...',
    'CALIBRATING 7-DAY SCHEDULE // LJCCA',
    'INDEXING 60+ STUDENT PROTOTYPES',
    'MOUNTING ORIGAMI 3D SCULPTURE',
    'TECH GALLERY 2027: READY'
  ];

  useEffect(() => {
    // If reduced motion is preferred, close immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 20 + 16);
        const stageIndex = Math.min(Math.floor((next / 100) * stages.length), stages.length - 1);
        setStage(stages[stageIndex]);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 380);
          return 100;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.02, 
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#F8F5EC',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          {/* Subtle Paper Grid Lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(#202020 1px, transparent 1px), linear-gradient(90deg, #202020 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: 0.04,
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.4rem',
              maxWidth: '420px',
              width: '88%',
            }}
          >
            {/* Folded Paper Origami Diamond Icon */}
            <div style={{ position: 'relative', width: '56px', height: '56px' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '4px',
                  border: '2px dashed #202020',
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '10px',
                  backgroundColor: '#FFD85A',
                  border: '2px solid #202020',
                  boxShadow: '3px 3px 0px #202020',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(45deg)',
                }}
              >
                <div style={{ width: '8px', height: '8px', backgroundColor: '#3155E7', borderRadius: '1px' }} />
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'Sora, Space Grotesk, sans-serif',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: '#202020',
                }}
              >
                TECH GALLERY <span style={{ color: '#3155E7' }}>2027</span>
              </div>
              <div
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.72rem',
                  color: '#625E56',
                  fontWeight: 700,
                  marginTop: '0.3rem',
                  letterSpacing: '0.08em',
                }}
              >
                {stage}
              </div>
            </div>

            {/* Tactile Paper Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: '#FAF8F3',
                border: '1.5px solid #202020',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: '#3155E7',
                  transition: 'width 0.15s ease-out',
                }}
              />
            </div>

            <div
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.75rem',
                color: '#202020',
                fontWeight: 700,
              }}
            >
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
