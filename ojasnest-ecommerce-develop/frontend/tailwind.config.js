/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070707',
          900: '#0C0C0E',
          800: '#141417',
          700: '#1F1F24',
        },
        brand: {
          orange: '#FF5722',     // Finova vibrant orange
          glow: 'rgba(255, 87, 34, 0.22)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
