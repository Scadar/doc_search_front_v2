import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SnackbarCloseButton from "./components/UI/SnackbarCloseButton";
import { createTheme, CssBaseline, LinkProps, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { LinkBehavior } from "./components/UI/LinkBehavior";

require("dotenv")
.config();

const theme = createTheme({
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior
            } as LinkProps
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior
            }
        }
    }
});

ReactDOM.render(
    <ThemeProvider theme={ theme }>
        <SnackbarProvider
            action={ key => <SnackbarCloseButton myKey={ key }/> }
            maxSnack={ 3 }
            anchorOrigin={ { vertical: "top", horizontal: "right" } }
        >
            <Provider store={ store }>
                <BrowserRouter>
                    <CssBaseline/>
                    <App/>
                </BrowserRouter>
            </Provider>
        </SnackbarProvider>
    </ThemeProvider>,
    document.getElementById("root")
);
