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

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

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
                </NavbarMenu>
            </Wrapper>
        </Container>
    );
};
export default Header;
