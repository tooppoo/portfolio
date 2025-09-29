import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdff',
          100: '#ccfbff',
          200: '#99f6ff',
          300: '#4aeaff',
          400: '#1dd4ed',
          500: '#00d9ff',
          600: '#0297b3',
          700: '#087991',
          800: '#0f6276',
          900: '#135263',
          950: '#0a0a0b',
        },
        gray: {
          50: '#ffffff',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#242426',
          900: '#111113',
          950: '#0a0a0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
        display: ['Inter', 'SF Pro Display', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 217, 255, 0.15)',
        'glow-lg': '0 0 40px rgba(0, 217, 255, 0.2)',
      }
    },
  },
  plugins: [
    typography,
  ],
}