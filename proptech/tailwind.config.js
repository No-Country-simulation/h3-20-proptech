//********************  version 3  ok *************** */
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
          message:'#042C31',
          messageError: '#DD5E30',
          p: '#17555C', 
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
        input: '0.5rem',
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



//*************** version 4 mui tailwind compatible KO  */
// const sharedStyles = require('./src/sharedStyles');

// module.exports = {
//   content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         base: sharedStyles.colors.base,
//         wireframe: sharedStyles.colors.wireframe,
//         primary: sharedStyles.colors.primary,
//         secondary: sharedStyles.colors.secondary,
//         tertiary: sharedStyles.colors.tertiary,
//         surfaceFocus: sharedStyles.colors.surfaceFocus,
//         surfaceError: sharedStyles.colors.surfaceError,
//         white: sharedStyles.colors.white,

//         // text: {
//         //   primary: sharedStyles.colors.textPrimary,
//         //   secondary: sharedStyles.colors.textSecondary,
//         //   disabled: sharedStyles.colors.textDisabled,
//         // },
//         background: sharedStyles.colors.background,
//         text: sharedStyles.colors.text,
//         checkbox: {
//           borderTrue: sharedStyles.colors.checkboxBorderTrue,
//           fillTrue: sharedStyles.colors.checkboxFillTrue,
//           textTrue: sharedStyles.colors.checkboxTextTrue,
//         },
//         radio: sharedStyles.colors.radio,

//       },
//       borderRadius: sharedStyles.borderRadius,
//     },
//   },
// };



