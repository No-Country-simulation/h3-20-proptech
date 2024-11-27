const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('daisyui')], // Ensure DaisyUI is included correctly
  theme: {
    extend: {
      colors: {
        base: {
          100: '#FFFFFF', 
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
        white: '#FFFFFF',
        surfaceFocus: '#F2FEFF',
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
      borderRadius: {
        button: '2rem', // Rounded buttons
      },
    },
  },
  daisyui: {
    themes: false, // Turn off DaisyUI's automatic theme generation
  },
};


// /** tailwind.config.js global settings */
// const colors = require('tailwindcss/colors');

// module.exports = {
//   content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
//   plugins: [require('daisyui')], // Ensure DaisyUI is included correctly
//   theme: {
//     extend: {
//       colors: {
//         base: {
//           100: '#FFFFFF', // Add base-100 for DaisyUI dropdowns and menus
//           200: '#E6EAEA',
//           300: '#93A4A6',
//           400: '#75CCD6',
//           500: '#36858E',
//           600: '#17555C',
//           700: '#042C31',
//         },
//         accent: {
//           fill: '#042C31',
//           stroke: '#B62F2F',
//         },
//         primary: '#DD5E30',
//         secondary: '#042C31',
//         tertiary: '#E6EAEA',
//         white: '#FFFFFF',
//         background: {
//           navbar: '#042C31',
//           footer: '#042C31',
//           mortgage: '#B18952',
//         },
//         text: {
//           primary: '#042C31',
//           common: '#17555C',
//           white: '#FFFFFF',
//         },
//       },
//     },
//   },
//   daisyui: {
//     themes: false, // Turn off DaisyUI's automatic theme generation
//   },
// };
