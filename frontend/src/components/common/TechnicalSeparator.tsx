import React from 'react';

interface TechnicalSeparatorProps {
  label?: string;
  code?: string;
  fromBg?: string;
  toBg?: string;
  isDark?: boolean;
}

export const TechnicalSeparator: React.FC<TechnicalSeparatorProps> = ({
  label = 'SYS // TELEMETRY',
  code = 'TG.2027 // NOMINAL',
  fromBg,
  toBg,
  isDark = false,
}) => {
  return (
    <div
      className="relative w-full select-none overflow-hidden"
      style={{
        background: fromBg && toBg ? `linear-gradient(to bottom, ${fromBg} 50%, ${toBg} 50%)` : undefined,
      }}
      aria-hidden="true"
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Perforated Cut Line */}
        <div
          className={`absolute left-4 right-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed ${
            isDark ? 'border-white/20' : 'border-[#202020]/25'
          }`}
        />

        {/* Left Telemetry Coordinates */}
        <div
          className={`hidden sm:flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-sm border-1.5 z-10 ${
            isDark
              ? 'text-neutral-300 bg-[#22242D] border-[#3A3D4D] shadow-[1.5px_1.5px_0px_#0A0A0D]'
              : 'text-[#625E56] bg-[#FFFFFF] border-[#202020] shadow-[1.5px_1.5px_0px_#202020]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#3155E7]" />
          <span>GPS // 23.0338°N 72.5463°E</span>
        </div>

        {/* Center Stamped Paper Tag */}
        <div
          className={`mx-auto sm:mx-0 flex items-center gap-1.5 px-3 py-1 rounded-sm border-2 z-10 ${
            isDark
              ? 'bg-[#22242D] border-[#3A3D4D] text-white shadow-[2px_2px_0px_#0A0A0D]'
              : 'bg-[#FFFFFF] border-[#202020] text-[#202020] shadow-[2px_2px_0px_#202020]'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#00E5FF]' : 'bg-[#FF7139]'}`} />
          <span className="font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase">
            {label}
          </span>
        </div>

        {/* Right Telemetry Code */}
        <div
          className={`hidden md:flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-sm border-1.5 z-10 ${
            isDark
              ? 'text-neutral-300 bg-[#22242D] border-[#3A3D4D] shadow-[1.5px_1.5px_0px_#0A0A0D]'
              : 'text-[#625E56] bg-[#FFFFFF] border-[#202020] shadow-[1.5px_1.5px_0px_#202020]'
          }`}
        >
          <span>{code}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#C6FF32]' : 'bg-[#FFD85A]'}`} />
        </div>
      </div>
    </div>
  );
};
