import { createTheme } from '@mui/material/styles';
import { Plus_Jakarta_Sans } from 'next/font/google';

export const plus = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const basedarkTheme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#4570EA',
      light: '#ECF2FF',
      dark: '#1E2951',
    },
    secondary: {
      main: '#23afdb',
      light: '#E8F7FF',
      dark: '#0B3C5D',
    },
    success: {
      main: '#02b3a9',
      light: '#E6FFFA',
      dark: '#009681',
      contrastText: '#ffffff',
    },
    info: {
      main: '#1682d4',
      light: '#EBF3FE',
      dark: '#0f5a8d',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f3704d',
      light: '#FDEDE8',
      dark: '#b5523a',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ae8e59',
      light: '#FEF5E5',
      dark: '#725b38',
      contrastText: '#ffffff',
    },
    grey: {
      100: '#1E1E1E',
      200: '#2A2A2A',
      300: '#3D3D3D',
      400: '#7C8FAC',
      500: '#A0A0A0',
      600: '#C8C8C8',
    },
    text: {
      primary: '#C8C8C8',
      secondary: '#A0A0A0',
    },
    action: {
      disabledBackground: 'rgba(255,255,255,0.12)',
      hoverOpacity: 0.1,
      hover: '#121212',
    },
    divider: '#303030',
  },
  typography: {
    fontFamily: plus.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: '2.75rem',
      fontFamily: plus.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: '2.25rem',
      fontFamily: plus.style.fontFamily,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: '1.75rem',
      fontFamily: plus.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.3125rem',
      lineHeight: '1.6rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: '1.6rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: '1.2rem',
    },
    button: {
      textTransform: 'capitalize',
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334rem',
    },
    body2: {
      fontSize: '0.75rem',
      letterSpacing: '0rem',
      fontWeight: 400,
      lineHeight: '1rem',
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '.MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation': {
          boxShadow:
            'rgb(0 0 0 / 30%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 12px 24px -4px !important',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '7px',
        },
      },
    },
    // Define other component style overrides for your dark theme
    // ...
  },
});

export { basedarkTheme };
