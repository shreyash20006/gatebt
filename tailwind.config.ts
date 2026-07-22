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
          'navy-dark': '#071C44',
          azure: '#1CA3DC',
          'azure-hover': '#158BBF',
          gold: '#F6B10A',
          'gold-light': '#FEF3D6',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          text: '#0B2A63',
          muted: '#64748B',
          border: '#E2E8F0',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        pw: '0 10px 30px -5px rgba(11, 42, 99, 0.08)',
        'pw-hover': '0 20px 35px -5px rgba(28, 163, 220, 0.18)',
      },
    },
  },
  plugins: [],
};
export default config;
