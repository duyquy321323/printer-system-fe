import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./redux/store";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
          '&:hover': {
            backgroundColor: 'darkred',
          },
        },
      },
    },
  },
});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
  </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
