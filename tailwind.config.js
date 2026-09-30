/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#050a1c', 900: '#0a1233', 800: '#101c4d', 700: '#182a6e' },
        royal: { 400: '#5b7bff', 500: '#2f54eb', 600: '#2443c4' },
        gold: { 300: '#f0d17a', 400: '#e4b84d', 500: '#d29d22' },
        ivory: { 50: '#fbf9f3', 100: '#f4efe3' },
        neu: { DEFAULT: '#eef1f6', deep: '#e7ebf2', ink: '#1a2750', muted: '#4f5b82', shade: '#a3b1c6' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: { header: 'var(--header-h)' },
      boxShadow: {
        glow: '0 0 60px -10px rgba(228, 184, 77, 0.35)',
        'neu-lg': '12px 12px 26px rgba(163, 177, 198, 0.62), -12px -12px 26px #ffffff',
        'neu-sm': '7px 7px 15px rgba(163, 177, 198, 0.62), -7px -7px 15px #ffffff',
        'neu-xs': '4px 4px 9px rgba(163, 177, 198, 0.62), -4px -4px 9px #ffffff',
        'neu-inset': 'inset 7px 7px 14px rgba(163, 177, 198, 0.62), inset -7px -7px 14px #ffffff',
        'neu-band': 'inset 0 20px 24px -20px rgba(163, 177, 198, 0.55), inset 0 -20px 24px -20px rgba(163, 177, 198, 0.55)',
        'neu-inset-sm': 'inset 4px 4px 8px rgba(163, 177, 198, 0.62), inset -4px -4px 8px #ffffff',
        'clay-royal': '9px 10px 22px rgba(47, 84, 235, 0.35), -6px -6px 14px #ffffff, inset -6px -8px 14px rgba(20, 40, 150, 0.4), inset 6px 6px 12px rgba(255, 255, 255, 0.5)',
        'clay-gold': '5px 6px 12px rgba(160, 110, 0, 0.32), -4px -4px 8px #ffffff, inset -4px -4px 8px rgba(160, 110, 0, 0.28), inset 4px 4px 8px rgba(255, 255, 255, 0.7)',
      },
      borderRadius: { neu: '26px', 'neu-lg': '36px' },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        breathe: { '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' }, '50%': { transform: 'scale(1.12)', filter: 'brightness(1.07)' } },
        drift: { '0%': { transform: 'translate3d(0, 0, 0) scale(1)' }, '100%': { transform: 'translate3d(6vw, 5vh, 0) scale(1.12)' } },
        'page-in': { from: { opacity: '0', transform: 'translateY(var(--page-rise, 14px))' }, to: { opacity: '1', transform: 'none' } },
        kenburns: { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.07)' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
        'pop-in': { from: { opacity: '0', transform: 'scale(0.94) translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
        'pop-out': { from: { opacity: '1', transform: 'none' }, to: { opacity: '0', transform: 'scale(0.96) translateY(6px)' } },
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        breathe: 'breathe 5.5s ease-in-out infinite',
        drift: 'drift 26s ease-in-out infinite alternate',
        'page-in': 'page-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        kenburns: 'kenburns 18s ease-in-out infinite alternate',
        'fade-in': 'fade-in 0.25s ease-out both',
        crossfade: 'fade-in 1s ease-out both',
        'fade-out': 'fade-out 0.22s ease-in both',
        'pop-in': 'pop-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'pop-out': 'pop-out 0.22s ease-in both',
      },
    },
  },
  plugins: [],
};
