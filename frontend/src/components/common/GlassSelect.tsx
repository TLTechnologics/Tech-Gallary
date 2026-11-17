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

  const handleSelect = (optValue: string, isOptDisabled?: boolean) => {
    if (isOptDisabled || disabled) return;
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`glass-dropdown-container relative w-full ${className}`}
      style={{ userSelect: 'none' }}
    >
      {/* Trigger Button with Frosted Glassmorphism Styling */}
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
        className={`glass-dropdown-trigger flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-200 outline-none ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } ${triggerClassName}`}
        style={{
          background: 'rgba(22, 27, 24, 0.72)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: isOpen
            ? '1px solid rgba(205, 255, 43, 0.65)'
            : '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '12px',
          boxShadow: isOpen
            ? '0 0 0 3px rgba(205, 255, 43, 0.2), 0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
            : '0 4px 18px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.12)',
          color: 'var(--ink, #edf0ec)',
          minHeight: '46px',
        }}
      >
        <div className="flex-1 truncate mr-2">
          {selectedOption ? (
            <div className="flex items-center gap-2">
              {selectedOption.icon && <span className="flex-shrink-0">{selectedOption.icon}</span>}
              <div className="truncate">
                <span className="font-medium text-sm leading-tight text-white block truncate">
                  {selectedOption.label}
                </span>
                {selectedOption.sublabel && (
                  <span
                    className="font-mono text-xs block text-neutral-400 mt-0.5 truncate"
                    style={{ fontSize: '0.72rem' }}
                  >
                    {selectedOption.sublabel}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <span className="text-sm text-neutral-400 font-mono">{placeholder}</span>
          )}
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex-shrink-0 text-neutral-300 ml-1"
        >
          <ChevronDown className="w-4 h-4" style={{ color: isOpen ? 'var(--lime, #cdff2b)' : 'rgba(255, 255, 255, 0.7)' }} />
        </motion.div>
      </button>

      {/* Floating Glassmorphic Dropdown Listbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`glass-dropdown-menu absolute left-0 right-0 z-50 mt-2 ${dropdownClassName}`}
            style={{
              background: 'rgba(18, 24, 21, 0.85)',
              backdropFilter: 'blur(24px) saturate(190%)',
              WebkitBackdropFilter: 'blur(24px) saturate(190%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '18px',
              boxShadow:
                '0 24px 48px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
              padding: '7px',
              maxHeight: '340px',
              overflowY: 'auto',
            }}
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
                    className={`glass-dropdown-item group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                      opt.disabled
                        ? 'opacity-40 cursor-not-allowed'
                        : isSelected
                        ? 'glass-item-active'
                        : 'hover:bg-white/10 active:bg-white/15'
                    }`}
                    style={
                      isSelected
                        ? {
                            background:
                              'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.11) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.22)',
                            boxShadow:
                              '0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
                            borderRadius: '12px',
                          }
                        : {
                            border: '1px solid transparent',
                            borderRadius: '12px',
                          }
                    }
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {opt.icon && (
                        <span
                          className={`flex-shrink-0 ${
                            isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                          }`}
                        >
                          {opt.icon}
                        </span>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium leading-snug truncate ${
                              isSelected
                                ? 'text-white font-semibold'
                                : 'text-neutral-200 group-hover:text-white'
                            }`}
                          >
                            {opt.label}
                          </span>
                          {opt.badge && (
                            <span
                              className="mono flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full border leading-tight"
                              style={{
                                background: isSelected
                                  ? 'rgba(205, 255, 43, 0.15)'
                                  : 'rgba(255, 255, 255, 0.05)',
                                color: isSelected ? 'var(--lime, #cdff2b)' : 'var(--mute, #8a908c)',
                                borderColor: isSelected
                                  ? 'rgba(205, 255, 43, 0.4)'
                                  : 'rgba(255, 255, 255, 0.12)',
                              }}
                            >
                              {opt.badge}
                            </span>
                          )}
                        </div>

                        {opt.sublabel && (
                          <span
                            className="mono text-xs block text-neutral-400 mt-0.5 truncate"
                            style={{ fontSize: '0.72rem' }}
                          >
                            {opt.sublabel}
                          </span>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex-shrink-0 ml-2"
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{
                            background: 'var(--lime, #cdff2b)',
                            color: '#101312',
                            boxShadow: '0 0 10px rgba(205, 255, 43, 0.5)',
                          }}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </motion.div>
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
