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
  },
});

export default theme;
