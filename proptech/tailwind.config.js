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
        wireframe: {
          white: '#FFFFFF',
          100: '#E6EAEA',
          200: '#93A4A6',
          300: '#B0C4C6',
        },
        accent: {
          fill: '#042C31',
          stroke: '#B62F2F',
        },        
        primary: '#DD5E30',
        secondary: '#042C31',
        tertiary: '#E6EAEA',
        surfaceFocus: '#E6EAEA',
        surfaceError: '#F8D6D3',
        white: '#FFFFFF',
        background: {
          navbar: '#042C31',
          footer: '#042C31',
          mortgage: '#B18952',
        },        
        text: {
          primary: '#042C31',
          secondary: '#DD5E30',
          disabled: '#93A4A6',
          white: '#FFFFFF',
        },
        tab: {
            fill: '#F1F6FD', // Tab background color
            border: '#A3C6ED', // Tab border color
            text: '#A3C6ED', // Tab inactive text color
            focusBorder: '#4973CE', // Focus border for active tab
            accentText: '#DD5E30', // Text color for active tab
        },
        checkbox: {
            borderFalse: '#93A4A6', // Checkbox border when unchecked
            textFalse: '#93A4A6', // Checkbox text when unchecked
            borderTrue: '#042C31', // Checkbox border when checked
            textTrue: '#042C31', // Checkbox text when checked
            fillTrue: '#DD5E30', // Checkbox fill when checked
        },
        radio: {
            border: '#A3C6ED',
            fill: '#4973CE',
            activeFill: '#DD5E30',
        },

      },
      borderRadius: {
        button: '2rem',
        tab: '0.5rem',
        checkbox: '0.25rem',
        radio: '50%',        
      },
    },
  },
  daisyui: {
    themes: false,
    styled: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
    excluded: ['checkbox'], // Exclude DaisyUI checkbox styles
  },
};


/******** global settings v2 ok ********** */
// const colors = require('tailwindcss/colors');

// module.exports = {
//   content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
//   plugins: [require('daisyui')], // Ensure DaisyUI is included correctly
//   theme: {
//     extend: {
//       colors: {
//         base: {
//           100: '#FFFFFF', 
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
//         surfaceFocus: '#F2FEFF',
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
//       borderRadius: {
//         button: '2rem', // Rounded buttons
//       },
//     },
//   },
//   daisyui: {
//     themes: false, // Turn off DaisyUI's automatic theme generation
//   },
// };

