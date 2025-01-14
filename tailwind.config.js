const plugin = require('tailwindcss/plugin');

module.exports = {
  mode:'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
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
