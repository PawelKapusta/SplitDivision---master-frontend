import React from "react";
//
// import Footer from "../components/footer/FooterStyles";
import { Header } from "../components/header";
import { LayoutContainer } from "./LayoutStyles";

export type TLayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: TLayoutProps): JSX.Element => {
    return (
        <LayoutContainer>
            <Header />
            <main>{children}</main>
        </LayoutContainer>
    );
};
