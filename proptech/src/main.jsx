import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Context";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
