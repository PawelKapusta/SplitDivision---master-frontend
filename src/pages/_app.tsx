import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@styles/global-styles";
import { theme } from "@styles/theme";
import { wrapper } from "@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";

import { appWithTranslation } from "@i18n";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const store: any = useStore();
    return (
        <PersistGate
            persistor={store.__persistor}
            loading={<div>Loading ...</div>}
        >
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Component {...pageProps} />
            </ThemeProvider>
        </PersistGate>
    );
}

export default wrapper.withRedux(MyApp);
