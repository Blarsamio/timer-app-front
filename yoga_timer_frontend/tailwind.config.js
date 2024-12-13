/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#ffffff',
      bone: '#F5F1ED',
      gold: '#A99985',
      blue: '#70798C',
      black: '#1C1C1C'
    },
    fontFamily: {
      zen: ['Zen Antique Soft', 'sans-serif'],
      ubuntu: ['Ubuntu', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
