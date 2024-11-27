// src/theme.js
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
      common: '#17555C',
      white: '#FFFFFF',
      gray200: '#E6EAEA'
    },
    background: {
      default: '#E6EAEA',
      paper: '#E6EAEA',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem',
          textTransform: 'none',
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
        },
      },
    },
  },
});

export default theme;
