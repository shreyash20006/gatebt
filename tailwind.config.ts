import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B2A63',
          'navy-dark': '#06193E',
          azure: '#1CA3DC',
          'azure-dark': '#1077A3',
          'azure-light': '#EBF7FC',
          gold: '#F6B10A',
          'gold-light': '#FFF8E6',
          bg: '#F7FAFC',
          card: '#FFFFFF',
          main: '#172033',
          muted: '#64748B',
          border: '#E2E8F0',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        store: '0 4px 20px -2px rgba(11, 42, 99, 0.05), 0 2px 6px -1px rgba(11, 42, 99, 0.03)',
        'store-hover': '0 12px 30px -4px rgba(11, 42, 99, 0.12), 0 4px 12px -2px rgba(28, 163, 220, 0.08)',
        glow: '0 0 25px rgba(28, 163, 220, 0.25)',
      },
      animation: {
        'marquee-left': 'marquee-left 35s linear infinite',
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
