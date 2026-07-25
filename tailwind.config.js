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
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Core warm vibrant orange/coral for pet brand
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        teal: {
          500: '#14b8a6',
          600: '#0d9488',
        },
        petpurple: {
          500: '#8b5cf6',
          600: '#7c3aed',
          900: '#1e1b4b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        '3d-sm': '0 4px 0 0 rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)',
        '3d': '0 8px 0 0 rgba(0,0,0,0.12), 0 16px 24px rgba(0,0,0,0.1)',
        '3d-orange': '0 8px 0 0 #c2410c, 0 16px 24px rgba(249,115,22,0.3)',
        '3d-teal': '0 8px 0 0 #0f766e, 0 16px 24px rgba(20,184,166,0.3)',
        '3d-dark': '0 8px 0 0 #0f172a, 0 16px 32px rgba(0,0,0,0.5)',
        'clay-light': 'inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(0,0,0,0.05), 8px 12px 24px rgba(0,0,0,0.08)',
        'clay-dark': 'inset 2px 2px 4px rgba(255,255,255,0.1), inset -2px -2px 4px rgba(0,0,0,0.5), 8px 12px 24px rgba(0,0,0,0.4)',
        'glow-orange': '0 0 25px rgba(249,115,22,0.5)',
        'glow-teal': '0 0 25px rgba(20,184,166,0.5)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-fast': 'float 3.5s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(20px)' },
          '50%': { opacity: '0.9', filter: 'blur(28px)' },
        }
      }
    },
  },
  plugins: [],
}
