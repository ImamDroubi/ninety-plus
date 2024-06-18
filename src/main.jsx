import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LiveStreamAuthProvider } from "./contexts/LiveStreamAuthContext.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6636",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "cairo, sans-serif",
  },
  direction: "rtl",
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LiveStreamAuthProvider>
        <BrowserRouter>
          <React.StrictMode>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </React.StrictMode>
        </BrowserRouter>
      </LiveStreamAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);
