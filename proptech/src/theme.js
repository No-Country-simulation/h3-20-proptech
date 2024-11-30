import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DD5E30',
      contrastText: '#E6EAEA',
    },
    secondary: {
      main: '#042C31',
      contrastText: '#E6EAEA',
    },
    text: {
      primary: '#042C31',
      secondary: '#DD5E30',
      disabled: '#93A4A6',
    },
    background: {
      default: '#E6EAEA',
      paper: '#E6EAEA',
    },
    tab: {
        fill: '#F1F6FD',
        border: '#A3C6ED',
        focusBorder: '#4973CE',
        text: '#A3C6ED',
        accentText: '#DD5E30',
      },
    checkbox: {
        borderFalse: '#93A4A6',
        textFalse: '#93A4A6',
        borderTrue: '#042C31',
        textTrue: '#042C31',
        fillTrue: '#DD5E30',
      },
    radio: {
        border: '#A3C6ED',
        fill: '#4973CE',
        activeFill: '#DD5E30',
      },

  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Updated font family for label
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem',
          textTransform: 'none',
          '&:hover': {
            borderColor: '#F29877', // Hover color for primary
          },
          '&:disabled': {
            backgroundColor: '#93A4A6',
            color: '#B0C4C6',
            borderColor: '#B0C4C6',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem',
          border: '1px solid #042C31',
          padding: '8px',
          backgroundColor: '#E6EAEA',
          color: '#042C31',
          '&:focus': {
            backgroundColor: '#E6EAEA',
            borderColor: '#DD5E30',
            color: '#042C31',
          },
          '&.Mui-disabled': {
            backgroundColor: '#FFFFFF',
            borderColor: '#B0C4C6',
            color: '#B0C4C6',
          },
        },
      },
    },
    MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: '#F1F6FD',
            borderRadius: '0.5rem',
          },
          indicator: {
            backgroundColor: '#4973CE',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: '#93A4A6', // Default color (unchecked state)
            '&.Mui-checked': {
              color: '#DD5E30', // Checked color
              backgroundColor: '#DD5E30',
              borderColor: '#042C31',
            },
            '&:hover': {
              backgroundColor: 'rgba(221, 94, 48, 0.1)', // Hover effect
            },
          },
          indeterminate: {
            color: '#DD5E30', // Styling for indeterminate state
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: '#DD5E30',
            },
            '&.Mui-disabled': {
              color: '#93A4A6',
            },
          },
        },
      },


  },
});

export default theme;


//******************* global settings v2 ok **** */
// src/theme.js
// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#DD5E30',
//       contrastText: '#E6EAEA',
//     },
//     secondary: {
//       main: '#042C31',
//       contrastText: '#E6EAEA',
//     },
//     text: {
//       primary: '#042C31',
//       common: '#17555C',
//       white: '#FFFFFF',
//       gray200: '#E6EAEA'
//     },
//     background: {
//       default: '#E6EAEA',
//       paper: '#E6EAEA',
//     },
//   },
//   typography: {
//     fontFamily: 'Arial, sans-serif',
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: '0.375rem',
//           textTransform: 'none',
//         },
//       },
//     },
//     MuiInputBase: {
//       styleOverrides: {
//         root: {
//           borderRadius: '0.375rem',
//           border: '1px solid #042C31',
//           padding: '8px',
//           backgroundColor: '#E6EAEA',
//           color: '#042C31',
//         },
//       },
//     },
//   },
// });

// export default theme;
