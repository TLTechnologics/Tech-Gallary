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
        // Hogwarts Wizarding World Foundation Palette
        midnight: {
          DEFAULT: '#100D18', // Midnight Wizard Black
          black: '#100D18',
          dark: '#0B0912',
          light: '#181424',
          navy: '#15182A',
        },
        hogwarts: {
          navy: '#15182A',
          blue: '#293B68',
          castle: '#211812',
          burgundy: '#351522',
          forest: '#14291F',
          emerald: '#245B43',
        },
        gold: {
          DEFAULT: '#D6B36A', // Antique Gold
          antique: '#D6B36A',
          magical: '#F3D58A',
          muted: '#BFA574',
          dark: '#8C6F32',
          glow: 'rgba(214, 179, 106, 0.35)',
        },
        burgundy: {
          DEFAULT: '#762E42',
          dark: '#351522',
          light: '#8E3850',
          seal: '#6B2436',
        },
        emerald: {
          DEFAULT: '#245B43',
          dark: '#14291F',
          light: '#2E7356',
        },
        parchment: {
          DEFAULT: '#E7D7B5',
          cream: '#E9D9B5',
          ivory: '#F4EBDD',
          dark: '#C4B28C',
          muted: '#8C879E',
        },
        spell: {
          silver: '#B8BAC8',
          grey: '#C2BDCA',
          light: '#F4EBDD',
        },
        // Seamless mapping for existing paper classes to Hogwarts Dark Academia
        paper: {
          warm: '#100D18',
          ivory: '#15182A',
          cream: '#191524',
          kraft: '#261F33',
          'kraft-dark': '#322842',
          card: '#1A1626',
          'card-warm': '#1E192D',
          border: 'rgba(214, 179, 106, 0.25)',
          'border-strong': '#D6B36A',
          ink: '#F4EBDD',
          'ink-muted': '#C2BDCA',
          'ink-subtle': '#8C879E',
        },
        // Accents mapped to wizarding tones
        cobalt: {
          DEFAULT: '#D6B36A', // Mapped to Antique Gold
          light: '#F3D58A',
          dark: '#BFA574',
        },
        orange: {
          DEFAULT: '#762E42', // Mapped to Hogwarts Burgundy
          light: '#8E3850',
          dark: '#351522',
        },
        yellow: {
          DEFAULT: '#F3D58A', // Magical Gold
          light: '#FFE485',
          dark: '#D6B36A',
        },
        cherry: {
          DEFAULT: '#762E42',
          light: '#963B54',
          dark: '#4D1B2A',
        },
        lavender: {
          DEFAULT: '#293B68',
          light: '#3C528B',
          dark: '#1B2745',
        },
        deep: {
          ink: '#F4EBDD',
          charcoal: '#15182A',
        },
        surface: {
          DEFAULT: '#100D18',
          card: '#1A1626',
          hover: '#221D32',
          border: 'rgba(214, 179, 106, 0.25)',
          glow: 'rgba(214, 179, 106, 0.2)',
        },
        cyber: {
          violet: '#D6B36A',
          ultraviolet: '#100D18',
          aqua: '#F3D58A',
          lime: '#D6B36A',
          coral: '#762E42',
          paper: '#100D18',
          muted: '#C2BDCA',
        },
        brand: {
          lime: '#D6B36A',
          aqua: '#F3D58A',
          violet: '#762E42',
          coral: '#245B43',
        }
      },
      fontFamily: {
        decorative: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        display: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        heading: ['Cinzel', '"Cormorant Garamond"', 'serif'],
        editorial: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        serif: ['Lora', '"Cormorant Garamond"', 'serif'],
        body: ['Lora', '"Plus Jakarta Sans"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Lora', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Cinzel', 'monospace'],
        tech: ['Cinzel', '"IBM Plex Mono"', 'serif'],
      },
      boxShadow: {
        'paper-flat': '0 2px 8px rgba(0, 0, 0, 0.4), 0 0 1px rgba(214, 179, 106, 0.2)',
        'paper-sm': '0 4px 12px rgba(0, 0, 0, 0.5), 0 0 1px rgba(214, 179, 106, 0.25)',
        'paper-md': '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 2px rgba(214, 179, 106, 0.3)',
        'paper-lg': '0 16px 36px rgba(0, 0, 0, 0.7), 0 0 20px rgba(214, 179, 106, 0.15)',
        'paper-xl': '0 24px 48px rgba(0, 0, 0, 0.8), 0 0 25px rgba(214, 179, 106, 0.2)',
        'paper-lift': '0 20px 40px rgba(0, 0, 0, 0.75), 0 0 20px rgba(214, 179, 106, 0.2)',
        'paper-cut': '3.5px 3.5px 0px #D6B36A',
        'paper-cut-sm': '2px 2px 0px #D6B36A',
        'paper-cut-lg': '5px 5px 0px #D6B36A',
        'paper-cut-cobalt': '3.5px 3.5px 0px #F3D58A',
        'paper-cut-orange': '3.5px 3.5px 0px #762E42',
        'paper-cut-yellow': '3.5px 3.5px 0px #D6B36A',
        'paper-cut-cherry': '3.5px 3.5px 0px #762E42',
        'magical-glow': '0 0 25px rgba(214, 179, 106, 0.35)',
        'magical-glow-lg': '0 0 40px rgba(243, 213, 138, 0.4)',
        'gold-border': '0 0 0 1.5px #D6B36A, 0 4px 20px rgba(0, 0, 0, 0.5)',
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
        'candle-flicker': 'candleFlicker 3s ease-in-out infinite',
        'magical-pulse': 'magicalPulse 4s ease-in-out infinite',
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
        },
        candleFlicker: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(0.96)' },
          '75%': { opacity: '1', transform: 'scale(1.04)' },
        },
        magicalPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
