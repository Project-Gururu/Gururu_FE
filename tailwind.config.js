/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      xl: '1440px',
    },
    colors: {
      primary: '#D7C0AE',
      secondary: '#EEE3CB',
      white: '#FFFFFF',
      gray: '#f3f3f3',
    },
    fontFamily: {
      sans: ['Black Han Sans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
