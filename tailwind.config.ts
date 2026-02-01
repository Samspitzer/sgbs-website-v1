import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary dark tones
        dark: {
          950: '#0a0a0a',
          900: '#0f0f0f',
          800: '#171717',
          700: '#1f1f1f',
          600: '#2a2a2a',
          500: '#3d3d3d',
        },
        // Accent burgundy from logo
        accent: {
          300: '#c45a5a',
          400: '#a52a2a',
          500: '#8B1A1A',
          600: '#6b1414',
        },
        // Warm cream for contrast text
        cream: {
          50: '#fefdfb',
          100: '#faf8f5',
          200: '#f5f0e8',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'ken-burns': 'kenBurns 20s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;