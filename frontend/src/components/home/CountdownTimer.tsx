import React, { useState, useEffect } from 'react';

export const CountdownTimer: React.FC = () => {
  // Target: 18 January 2027 09:00:00 AM UTC
  const targetDate = new Date('2027-01-18T09:00:00Z').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isOver: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <div className="flex items-center justify-between mb-2.5 px-1 font-mono text-[11px] uppercase tracking-widest text-neutral-400">
        <span className="flex items-center gap-1.5 text-brand-lime">
          <span className="w-2 h-2 rounded-full bg-brand-lime animate-ping" />
          T-Minus To Kickoff
        </span>
        <span>18 January 2027 • 09:00 IST</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 font-mono">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="tech-card border border-neutral-800 bg-dark-900/90 p-3 sm:p-5 flex flex-col items-center justify-center relative group"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-brand-lime opacity-40 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-brand-blue opacity-40 group-hover:opacity-100 transition-opacity" />

            <span className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none group-hover:text-brand-lime transition-colors">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-xs tracking-widest text-neutral-400 mt-2 font-mono uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

