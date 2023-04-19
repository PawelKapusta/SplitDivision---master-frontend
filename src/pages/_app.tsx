import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { Provider } from "react-redux";
import store from "@redux/store";
import GlobalStyles from "@styles/global-styles";
import { theme } from "@styles/theme";

import { appWithTranslation } from "@i18n";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
