import { createTheme } from "@mui/material/styles";
import type {} from '@mui/x-date-pickers/themeAugmentation';

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: "#1A2027",
    },
    secondary: {
      main: "#ffff",
    },
  },
  components: {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});

export default theme;
