/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
//   theme: {
//     extend: {},
//   },
  plugins: [require('daisyui'),],
};

/** tailwind.config.js global settings */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      colors: {
        base: {
          200: '#E6EAEA',
          300: '#93A4A6',
          400: '#75CCD6',
          500: '#36858E',
          600: '#17555C',
          700: '#042C31',
        },
        accent: {
          fill: '#042C31',
          stroke: '#B62F2F',
        },
        primary: '#DD5E30',
        secondary: '#042C31',
        tertiary: '#E6EAEA',
        background: {
          navbar: '#042C31',
          footer: '#042C31',
          mortgage: '#B18952',
        },
        text: {
          primary: '#042C31',
          common: '#17555C',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
};