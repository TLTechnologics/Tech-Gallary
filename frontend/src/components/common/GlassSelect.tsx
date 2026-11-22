import React, { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface GlassSelectOption {
  value: string;
  label: string;
  sublabel?: string;
  badge?: string;
  badgeType?: 'lime' | 'amber' | 'blue' | 'neutral';
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface GlassSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: (GlassSelectOption | string)[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  ariaLabel?: string;
}

export const GlassSelect: React.FC<GlassSelectProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  disabled = false,
  className = '',
  triggerClassName = '',
  dropdownClassName = '',
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const selectId = id || generatedId;

  // Normalize options to GlassSelectOption objects
  const normalizedOptions: GlassSelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = normalizedOptions.findIndex((opt) => opt.value === value);
        const nextIndex = currentIndex < normalizedOptions.length - 1 ? currentIndex + 1 : 0;
        const nextOpt = normalizedOptions[nextIndex];
        if (nextOpt && !nextOpt.disabled) {
          onChange(nextOpt.value);
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = normalizedOptions.findIndex((opt) => opt.value === value);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : normalizedOptions.length - 1;
        const prevOpt = normalizedOptions[prevIndex];
        if (prevOpt && !prevOpt.disabled) {
          onChange(prevOpt.value);
        }
      }
    }
  };

  const handleSelect = (optionValue: string, isDisabled?: boolean) => {
    if (isDisabled) return;
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
    >
      {/* Trigger Button with Tactile Dark Parchment Styling */}
      <button
        type="button"
        id={selectId}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-150 outline-none rounded-sm border-2 border-[#D6B36A]/60 bg-[#171322] shadow-[2.5px_2.5px_0px_#0B0912] ${
          isOpen ? 'shadow-[4px_4px_0px_#D6B36A] border-[#F3D58A]' : ''
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${triggerClassName}`}
      >
        <div className="flex-1 truncate mr-2">
          {selectedOption ? (
            <div className="flex items-center gap-2">
              {selectedOption.icon && <span className="flex-shrink-0 text-[#F3D58A]">{selectedOption.icon}</span>}
              <div className="truncate">
                <span className="font-bold text-sm leading-tight text-[#F4EBDD] block truncate">
                  {selectedOption.label}
                </span>
                {selectedOption.sublabel && (
                  <span className="font-mono text-xs block text-[#C2BDCA] font-medium mt-0.5 truncate">
                    {selectedOption.sublabel}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <span className="text-sm text-[#C2BDCA]/70 font-mono">{placeholder}</span>
          )}
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="flex-shrink-0 text-[#F3D58A] ml-1"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Floating Dark Grimoire Dropdown Listbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-0 right-0 z-50 mt-1.5 rounded-sm border-2 border-[#D6B36A] bg-[#1A1626] shadow-[6px_6px_0px_#0B0912] p-1.5 max-h-[300px] overflow-y-auto ${dropdownClassName}`}
          >
            <ul
              ref={listboxRef}
              role="listbox"
              aria-label={ariaLabel}
              className="space-y-1 p-0 m-0 list-none"
            >
              {normalizedOptions.map((opt) => {
                const isSelected = opt.value === value;

                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value, opt.disabled)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-sm cursor-pointer transition-all duration-150 ${
                      opt.disabled
                        ? 'opacity-40 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#762E42]/80 text-[#F3D58A] font-bold border border-[#D6B36A] shadow-[1.5px_1.5px_0px_#0B0912]'
                        : 'text-[#E7D7B5] hover:bg-[#251E33] hover:text-[#F3D58A]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {opt.icon && (
                        <span className="flex-shrink-0 text-[#F3D58A]">
                          {opt.icon}
                        </span>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold leading-snug truncate">
                            {opt.label}
                          </span>
                          {opt.badge && (
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-xs border border-[#D6B36A] font-black uppercase tracking-wider bg-[#100D18] text-[#F3D58A]">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        {opt.sublabel && (
                          <span className="font-mono text-xs block text-[#C2BDCA] font-medium truncate mt-0.5">
                            {opt.sublabel}
                          </span>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-[#F3D58A] flex-shrink-0 ml-2" />
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
