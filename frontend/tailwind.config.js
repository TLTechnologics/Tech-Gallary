/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base Paper Graphic Palette
        paper: {
          warm: '#F8F5EC',
          ivory: '#F2EBDD',
          cream: '#EAE3D5',
          kraft: '#D8C6A8',
          'kraft-dark': '#BCA98A',
          card: '#FFFFFF',
          'card-warm': '#FAF8F3',
          border: 'rgba(32, 32, 32, 0.12)',
          'border-strong': '#202020',
          ink: '#202020',
          'ink-muted': '#625E56',
          'ink-subtle': '#8C877D',
        },
        // Accents
        cobalt: {
          DEFAULT: '#3155E7',
          light: '#5373F2',
          dark: '#1E3DBE',
        },
        orange: {
          DEFAULT: '#FF7139',
          light: '#FF8B5B',
          dark: '#E0551E',
        },
        yellow: {
          DEFAULT: '#FFD85A',
          light: '#FFE485',
          dark: '#E6BC28',
        },
        cherry: {
          DEFAULT: '#E94B50',
          light: '#F06E72',
          dark: '#C82E33',
        },
        lavender: {
          DEFAULT: '#B7A5E8',
          light: '#CFC2F2',
          dark: '#937CD3',
        },
        deep: {
          ink: '#202020',
          charcoal: '#2D2B28',
        },
        // Legacy fallbacks mapped to paper accents to avoid any broken styles
        obsidian: '#F8F5EC',
        midnight: '#F2EBDD',
        graphite: '#EAE3D5',
        surface: {
          DEFAULT: '#F8F5EC',
          card: '#FFFFFF',
          hover: '#F2EBDD',
          border: 'rgba(32, 32, 32, 0.12)',
          glow: 'rgba(49, 85, 231, 0.12)',
        },
        cyber: {
          violet: '#3155E7',
          ultraviolet: '#202020',
          aqua: '#3155E7',
          lime: '#FFD85A',
          coral: '#FF7139',
          paper: '#F8F5EC',
          muted: '#625E56',
        },
        brand: {
          lime: '#FFD85A',
          aqua: '#3155E7',
          violet: '#E94B50',
          coral: '#FF7139',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Manrope', 'DM Sans', 'sans-serif'],
        display: ['Sora', 'Space Grotesk', 'sans-serif'],
        heading: ['Space Grotesk', 'Sora', 'sans-serif'],
        editorial: ['Sora', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        body: ['DM Sans', 'Plus Jakarta Sans', 'Manrope', 'sans-serif']
      },
      boxShadow: {
        'paper-flat': '0 2px 4px rgba(32, 32, 32, 0.04), 0 1px 2px rgba(32, 32, 32, 0.05)',
        'paper-sm': '0 2px 8px -1px rgba(32, 32, 32, 0.06), 0 1px 3px rgba(32, 32, 32, 0.04)',
        'paper-md': '0 8px 20px -3px rgba(32, 32, 32, 0.08), 0 3px 6px -2px rgba(32, 32, 32, 0.04)',
        'paper-lg': '0 16px 32px -4px rgba(32, 32, 32, 0.10), 0 6px 12px -3px rgba(32, 32, 32, 0.05)',
        'paper-xl': '0 24px 48px -6px rgba(32, 32, 32, 0.14), 0 10px 18px -4px rgba(32, 32, 32, 0.06)',
        'paper-lift': '0 20px 40px -10px rgba(32, 32, 32, 0.15), 0 4px 10px rgba(32, 32, 32, 0.05)',
        'paper-cut': '4px 4px 0px #202020',
        'paper-cut-sm': '2px 2px 0px #202020',
        'paper-cut-lg': '6px 6px 0px #202020',
        'paper-cut-cobalt': '4px 4px 0px #3155E7',
        'paper-cut-orange': '4px 4px 0px #FF7139',
        'paper-cut-yellow': '4px 4px 0px #FFD85A',
        'paper-cut-cherry': '4px 4px 0px #E94B50',
      },
      borderRadius: {
        'paper': '4px',
        'paper-lg': '8px',
        'paper-xl': '12px',
        'paper-tag': '16px',
      },
      animation: {
        'paper-float': 'paperFloat 6s ease-in-out infinite',
        'paper-wobble': 'paperWobble 8s ease-in-out infinite',
        'paper-tilt': 'paperTilt 5s ease-in-out infinite',
      },
      keyframes: {
        paperFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        paperWobble: {
          '0%, 100%': { transform: 'rotate(-0.75deg)' },
          '50%': { transform: 'rotate(0.75deg)' },
        },
        paperTilt: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-1.5deg)' },
        }
      }
    },
  },
  plugins: [],
}
