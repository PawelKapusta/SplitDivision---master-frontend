import React from "react";
import { useRouter } from "next/router";
import FooterContainer from "@components/footer";
import Header from "@components/header";
import { Container, BackButton } from "./layout.styles";

export type TLayoutProps = {
    children: JSX.Element;
};

export const Layout = ({ children }: TLayoutProps): JSX.Element => {
    const { back } = useRouter();
    return (
        <Container>
            <Header />
            <BackButton onClick={() => back()}>
                <img src="/icons/back-arrow.svg" alt="Back icon" />
                Back
            </BackButton>
            <main>{children}</main>
            <FooterContainer />
        </Container>
    );
};
