/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        cinema: {
          bg:      '#111111',
          dark:    '#1a0a0a',
          surface: '#1a1a1a',
          maroon:  '#800000',
          red:     '#d4183d',
          muted:   '#9ca3af',
        },
      },
      backgroundImage: {
        'cinema-gradient': 'linear-gradient(160deg, #111111 0%, #1a0a0a 50%, #120000 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.4,0,0.2,1) forwards',
        'pulse-red': 'pulseRed 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(60px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,24,61,0)' },
          '50%':      { boxShadow: '0 0 24px 6px rgba(212,24,61,0.25)' },
        },
      },
      letterSpacing: {
        cinema: '0.12em',
        wide2:  '0.2em',
      },
      boxShadow: {
        'red-glow':  '0 4px 20px rgba(212,24,61,0.35)',
        'red-glow2': '0 20px 40px rgba(212,24,61,0.35)',
        'card':      '0 8px 32px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
