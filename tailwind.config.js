const plugin = require('tailwindcss/plugin');

module.exports = {
  mode:'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['Vazir', 'sans-serif'], // For articles
        iransans: ['IRANSans', 'sans-serif'], // For product titles/descriptions
        yekan: ['Yekan', 'sans-serif'], // For forms
        shabnam: ['Shabnam', 'sans-serif'], // For body text and articles
        parasto: ['Parasto', 'sans-serif'], // Add Parasto font
        Tanha: ['Tanha', 'sans-serif'], // Add Parasto font
        dana: ['Dana', 'sans-serif'],



      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out', // Fade-in animation
        fadeOut: 'fadeOut 8s ease-out', // Fade-out animation
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
    plugin(function ({ addBase }) {
      addBase({
        'body': {
          direction: 'rtl',
        },
      });
    }),
  ],
};
