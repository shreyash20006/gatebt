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
        notion: {
          bg: '#FFFFFF',
          sidebar: '#FBFBFA',
          divider: '#E9E9E7',
          text: '#37352F',
          muted: '#787774',
          hover: '#F1F1EF',
          active: '#EBF5FF',
          blue: '#2383E2',
          'blue-hover': '#1D70C4',
          tag: '#F1F1EF',
        },
      },
      borderRadius: {
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
        xl: '10px',
      },
    },
  },
  plugins: [],
};
export default config;
