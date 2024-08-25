import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },

    info: {
      main: "#2f3e55",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: "Inter Variable, sans-serif",
  },
});

export default theme;
