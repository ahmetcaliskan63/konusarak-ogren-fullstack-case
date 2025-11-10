/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#0B0F13',
        'app-surface': '#11161C',
        'app-surface-secondary': '#0E141A',
        'app-text': '#E6EDF3',
        'app-text-secondary': '#9AA7B1',
        'app-text-muted': '#5F6B76',
        'app-primary': '#7C3AED',
        'app-primary-hover': '#8B5CF6',
        'app-primary-focus': '#C4B5FD',
        'app-border': '#1C2530',
        'sentiment-positive': '#22C55E',
        'sentiment-positive-bg': '#07361A',
        'sentiment-neutral': '#9CA3AF',
        'sentiment-neutral-bg': '#0E141A',
        'sentiment-negative': '#EF4444',
        'sentiment-negative-bg': '#3A0C0C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'bubble': '1rem',
        'card': '1.5rem',
      },
      boxShadow: {
        'card': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}

