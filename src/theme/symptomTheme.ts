import { createTheme } from '@mui/material/styles';

/** Figma 변수: blue #296DFF, gray 스케일, black #111 */
export const symptomTheme = createTheme({
  palette: {
    primary: {
      main: '#296DFF',
      contrastText: '#FFFFFF',
    },
    grey: {
      50: '#F9F9FB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      500: '#6B7280',
      900: '#111827',
    },
    text: {
      primary: '#111111',
      secondary: '#6B7280',
      disabled: '#D1D5DB',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    divider: '#D1D5DB',
  },
  typography: {
    fontFamily: '"Noto Sans KR", system-ui, "Segoe UI", Roboto, sans-serif',
    fontWeightMedium: 500,
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          letterSpacing: '-0.025em',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          letterSpacing: '-0.025em',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
