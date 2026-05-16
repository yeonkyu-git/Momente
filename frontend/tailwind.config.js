/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{tsx,ts}', './components/**/*.{tsx,ts}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#D4537E',
        'primary-light': '#FBEAF0',
        'primary-dark': '#993556',
      },
    },
  },
  plugins: [],
};
