import React, { useState } from "react";
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

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { isAuthenticated } = useSelector(selectAuthState);
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
                    <NavbarMenuItem>
                        <MenuLink href="/about">About</MenuLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <MenuLink href="/contact">Contact</MenuLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <MenuLink href="/calculator">
                            Currency converter
                        </MenuLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <MenuLink href="/faq">FAQ</MenuLink>
                    </NavbarMenuItem>
                    {isAuthenticated ? (
                        <NavbarMenuItem>
                            <Dropdown />
                        </NavbarMenuItem>
                    ) : (
                        <NavbarMenuItem>
                            <MenuLink href="/auth/login" isAction>
                                Login
                            </MenuLink>
                        </NavbarMenuItem>
                    )}
                </NavbarMenu>
            </Wrapper>
        </Container>
    );
};
export default Header;
