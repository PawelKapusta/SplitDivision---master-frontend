import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

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
    Avatar,
} from "./header.styles";
import { useSelector } from "react-redux";
import { selectAuthState } from "@redux/slices/authSlice";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { isAuthenticated } = useSelector(selectAuthState);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

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
                            <Avatar>
                                <Image
                                    priority
                                    src="/icons/avatar.svg"
                                    height={50}
                                    width={50}
                                    alt="Avatar icon"
                                />
                            </Avatar>
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
