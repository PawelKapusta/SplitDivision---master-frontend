import React, { useState, ReactElement } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Dropdown from "@components/dropdown";
const Logo = dynamic(() => import("@components/logo"), {
    ssr: false,
});

import {
    Container,
    Wrapper,
    Hamburger,
    NavbarToggleIcon,
    NavbarMenu,
    NavbarMenuItem,
    MenuLink,
} from "./header.styles";
import { useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";
import { useTranslation } from "react-i18next";

const Header = (): ReactElement => {
    const [showMenu, setShowMenu] = useState(false);
    const { isAuthenticated } = useSelector(selectAuthState);
    const { t } = useTranslation();
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    console.log(isAuthenticated);
    return (
        <Container data-testid="container">
            <Wrapper>
                <Link href="/">
                    <Logo />
                </Link>
                <Hamburger onClick={toggleMenu} active={showMenu}>
                    <NavbarToggleIcon />
                    <NavbarToggleIcon />
                    <NavbarToggleIcon />
                </Hamburger>
                <NavbarMenu show={showMenu}>
                    {isAuthenticated ? (
                        <NavbarMenuItem>
                            <MenuLink href="/create/group">
                                {t("components.header.links.createGroup")}
                            </MenuLink>
                        </NavbarMenuItem>
                    ) : null}
                    <NavbarMenuItem>
                        <MenuLink href="/contact">
                            {t("components.header.links.contact")}
                        </MenuLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <MenuLink href="/calculator">
                            {t("components.header.links.converter")}
                        </MenuLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <MenuLink href="/faq">
                            {t("components.header.links.faq")}
                        </MenuLink>
                    </NavbarMenuItem>
                    {isAuthenticated ? (
                        <NavbarMenuItem>
                            <Dropdown />
                        </NavbarMenuItem>
                    ) : (
                        <NavbarMenuItem>
                            <MenuLink href="/auth/login" isAction>
                                {t("components.header.links.login")}
                            </MenuLink>
                        </NavbarMenuItem>
                    )}
                </NavbarMenu>
            </Wrapper>
        </Container>
    );
};
export default Header;
