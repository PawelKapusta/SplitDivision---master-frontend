import React, { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import FooterContainer from "@components/footer";
import Header from "@components/header";
import { Container, BackButton } from "./layout.styles";

export type TLayoutProps = {
    excludeLayout?: boolean;
    children: ReactNode;
};

export const Layout = ({
    excludeLayout,
    children,
}: TLayoutProps): ReactElement => {
    const { back } = useRouter();
    if (excludeLayout) {
        return (
            <Container>
                <main>{children}</main>
            </Container>
        );
    }
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
