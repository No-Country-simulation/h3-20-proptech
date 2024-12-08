//************* version 3 ok ************** */
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
      message:'#042C31',
      messageError: '#DD5E30', 
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
    fontFamily: 'Inter, Roboto, Arial, sans-serif', // Updated font family for label
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '2rem',
          border: '1px solid #ccc',
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
          borderRadius: '0.5rem',
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
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: "#F8D6D3",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: "#430E12",
            color: "white",
            fontWeight: "bold",
          },
          body: {
            color: "#CE494B",
          },
        },
      },

      MuiModal: {
        styleOverrides: {
          root: {
            zIndex: 1300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(4px)', // Optional blur effect
          },
          paper: {
            backgroundColor: '#FFFFFF',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            outline: 'none',
          },
        },
      },

  },
});

export default theme;


//*************** version 4 mui tailwind compatible KO  */
// import { createTheme } from '@mui/material/styles';
// import sharedStyles from './sharedStyles';

// const theme = createTheme({
//   palette: {
//     base: {
//         main: sharedStyles.colors.base,
//         contrastText: '#FFFFFF',
//     },
//     wireframe: {
//     main: sharedStyles.colors.wireframe,
//     contrastText: '#FFFFFF',
//     },
//     primary: {
//     main: sharedStyles.colors.primary,
//     contrastText: '#FFFFFF',
//     },          
//     secondary: {
//       main: sharedStyles.colors.secondary,
//       contrastText: '#FFFFFF',
//     },
//     tertiary: {
//         main: sharedStyles.colors.tertiary,
//         contrastText: '#FFFFFF',
//       },
//       surfaceFocus: {
//         main: sharedStyles.colors.surfaceFocus,
//       },
//       surfaceError: {
//         main: sharedStyles.colors.surfaceError,
//       },
//       white: {
//         main: sharedStyles.colors.white,
//       },

//     // text: {
//     //   primary: sharedStyles.colors.textPrimary,
//     //   secondary: sharedStyles.colors.textSecondary,
//     //   disabled: sharedStyles.colors.textDisabled,
//     // },
//     background: {
//         main: sharedStyles.colors.background,
//         contrastText: '#FFFFFF',
//       },   
//       text: {
//         main: sharedStyles.colors.text,
//         contrastText: '#FFFFFF',
//       }, 
//       radio: {
//         main: sharedStyles.colors.radio,
//         contrastText: '#FFFFFF',
//       }, 
//   },
//   typography: {
//     fontFamily: 'Roboto, Arial, sans-serif',
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: sharedStyles.borderRadius.button,
//           textTransform: 'none',
//           '&:hover': {
//             backgroundColor: sharedStyles.colors.secondary,
//           },
//         },
//       },
//     },
//     MuiInputBase: {
//       styleOverrides: {
//         root: {
//           borderRadius: sharedStyles.borderRadius.input,
//           borderColor: sharedStyles.colors.primary,
//           '&:focus': {
//             borderColor: sharedStyles.colors.secondary,
//           },
//         },
//       },
//     },
//     MuiCheckbox: {
//       styleOverrides: {
//         root: {
//           color: sharedStyles.colors.checkboxBorderTrue,
//           '&.Mui-checked': {
//             color: sharedStyles.colors.checkboxFillTrue,
//           },
//         },
//       },
//     },
//   },
// });

// export default theme;




