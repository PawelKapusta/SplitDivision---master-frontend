import React from "react";

import FooterContainer from "@components/footer";
import Header from "@components/header";
import { Container } from "./layout.styles";

export type TLayoutProps = {
    children: JSX.Element;
};

export const Layout = ({ children }: TLayoutProps): JSX.Element => {
    return (
        <Container>
            <Header />
            <main>{children}</main>
            {/*<FooterContainer />*/}
        </Container>
    );
};
