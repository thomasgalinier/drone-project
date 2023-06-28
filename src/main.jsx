import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  palette: {
    
    primary: {
      main: "#B5E5CA",
    },
    secondary: {
      main: "#FED0B0",
    },
    action: {
      main: "#D2B1FE",
    },
    black:{
      main: "#1E1E1E",
    }
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
