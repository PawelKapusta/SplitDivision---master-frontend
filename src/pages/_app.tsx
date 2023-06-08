import React, { ReactElement } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@styles/global-styles";
import { theme } from "@styles/theme";
import { wrapper } from "@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { Layout } from "../layout/layout";
import Spinner from "@components/spinner";
import { appWithTranslation } from "@i18n";
import { withBlock } from "../hocs/withBlock";

interface MyAppProps extends AppProps {
    Component: PageWithLayout;
}

interface PageWithLayout<P = Record<string, never>> extends React.FC<P> {
    excludeLayout?: boolean;
}

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: MyAppProps): ReactElement {
    const store: any = useStore();
    const Wrapped = Component.excludeLayout ? Component : withBlock(Component);
    return (
        <SessionProvider session={session}>
            <PersistGate persistor={store.__persistor} loading={<Spinner />}>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <Head>
                        <title>Split Division</title>
                        <meta
                            property="og:title"
                            content="My page title"
                            key="title"
                        />
                        <link
                            rel="preconnect"
                            href="https://fonts.googleapis.com"
                        />
                        <link rel="icon" href="/icons/website-icon.svg" />
                    </Head>
                    <Layout excludeLayout={Component.excludeLayout}>
                        <Wrapped {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </PersistGate>
        </SessionProvider>
    );
}

export default wrapper.withRedux(MyApp);
