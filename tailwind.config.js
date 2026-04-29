/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a', // Premium Black
        accent: '#E63946',     // Cinematic Deep Red (or your choice)
      },
      fontFamily: {
        heading: ['Syncopate', 'sans-serif'], // Bold & Modern
        body: ['Inter', 'sans-serif'],        // Clean & Minimal
      },
    },
  },
  plugins: [],
}