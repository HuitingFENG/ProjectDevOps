import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import theme from "./theme"


ReactDOM.render(
    <React.StrictMode>
        <CssBaseline>
            <ThemeProvider theme={theme}>
            <App/>    
            </ThemeProvider>
        </CssBaseline>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
