import React from 'react';

interface TechnicalSeparatorProps {
  label?: string;
  code?: string;
}

export const TechnicalSeparator: React.FC<TechnicalSeparatorProps> = ({
  label = 'SYS // TELEMETRY',
  code = 'TG.2027 // NOMINAL',
}) => {
  return (
    <div
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex items-center justify-between select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Perforated Cut Line */}
      <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#202020]/25" />

      {/* Left Telemetry Coordinates */}
      <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] font-bold text-[#625E56] bg-[#FFFFFF] px-3 py-1 rounded-sm border-1.5 border-[#202020] shadow-[1.5px_1.5px_0px_#202020] z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3155E7]" />
        <span>GPS // 23.0338°N 72.5463°E</span>
      </div>

      {/* Center Stamped Paper Tag */}
      <div className="mx-auto sm:mx-0 flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#FFFFFF] border-2 border-[#202020] shadow-[2.5px_2.5px_0px_#202020] z-10">
        <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
        <span className="font-mono text-xs font-black tracking-wider text-[#202020] uppercase">
          {label}
        </span>
      </div>

      {/* Right Telemetry Code */}
      <div className="hidden md:flex items-center gap-2 font-mono text-[10px] font-bold text-[#625E56] bg-[#FFFFFF] px-3 py-1 rounded-sm border-1.5 border-[#202020] shadow-[1.5px_1.5px_0px_#202020] z-10">
        <span>{code}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD85A]" />
      </div>
    </div>
  );
};
