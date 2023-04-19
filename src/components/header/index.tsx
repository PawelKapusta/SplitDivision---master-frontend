import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = React.lazy(() => import("@components/logo"));

import {
    Container,
    Wrapper,
    MainNav,
    Actions,
    Hamburger,
    NavbarToggleIcon,
    NavbarMenu,
    NavbarMenuItem,
    MenuLink,
    LogoContainer,
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
                        <div>
                            <Image
                                priority
                                src="/icons/avatar.svg"
                                height={32}
                                width={32}
                                alt="Follow us on Twitter"
                            />
                        </div>
                    </NavbarMenuItem>
                </NavbarMenu>
                {/*<MainNav>*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <a href="/about">About</a>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <a href="/contact">Contact</a>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <a href="/calculator">Currency converter</a>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <a href="/faq">FAQ</a>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Actions>*/}
                {/*                <Avatar*/}
                {/*                    alt="Remy Sharp"*/}
                {/*                    src="/static/images/avatar/1.jpg"*/}
                {/*                />*/}
                {/*            </Actions>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</MainNav>*/}
            </Wrapper>
        </Container>
    );
};
export default Header;
