import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: { colors: { brand: { 50: '#eef2ff', 100: '#e0e7ff', 300: '#a5b4fc', 500: '#6366f1', 700: '#4338ca', 900: '#312e81' } } } },
  plugins: [],
};
export default config;
