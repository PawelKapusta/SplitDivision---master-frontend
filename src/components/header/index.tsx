import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

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

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                            <Button
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                            >
                                <Avatar>
                                    <Image
                                        priority
                                        src="/icons/avatar.svg"
                                        height={50}
                                        width={50}
                                        alt="Avatar icon"
                                    />
                                </Avatar>
                            </Button>
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
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </Container>
    );
};
export default Header;
