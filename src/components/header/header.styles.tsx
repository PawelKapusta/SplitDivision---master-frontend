import { useState } from "react";
import styled from "styled-components";

export const Container = styled.header`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 200px;

    border: 1px solid red;

    @media ${(props) => props.theme.breakpoints.sm} {
        //display: grid;
        //grid-template-columns: repeat(5, 1fr);
        //grid-template-rows: repeat(2, 60px);
        //grid-column-gap: 0.5rem;
        //grid-row-gap: 0.5rem;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @media ${(props) => props.theme.breakpoints.sm} {
        //grid-area: 1 / 1 / 2 / 3;
    }
`;

export const Actions = styled.div`
    display: inline-block;
    padding: 15px 30px;
`;

export const NavbarToggleIcon = styled.span`
    display: block;
    width: 20px;
    height: 2px;
    background-color: #fff;
    margin: 4px 0;
`;

export const NavbarMenu = styled.ul<{ show: boolean }>`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    list-style-type: none;
    margin: 5px 0;
    padding: 0;

    li {
        display: inline;
    }

    a {
        display: inline-block;
        padding: 15px 30px;
    }

    @media (max-width: 768px) {
        display: ${({ show }) => (show ? "flex" : "none")};
        flex-direction: column;
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        background-color: #333;
        padding: 10px;

        li {
            width: 100%;
            text-align: center;
            padding: 5px 0;
        }

        a {
            width: 100%;
        }
    }
`;

export const NavbarMenuItem = styled.li`
    margin-left: 10px;

    @media (max-width: 768px) {
        margin: 10px 0;
    }
`;

type MenuLinkProps = {
    href: string;
};

export const MenuLink = styled.a<MenuLinkProps>`
    color: #fff;
    text-decoration: none;
`;

type HamburgerProps = {
    onClick: () => void;
    active: boolean;
};

export const Hamburger = styled.div<HamburgerProps>`
    display: none;

    @media (max-width: 768px) {
        display: block;
        width: 20px;
        height: 20px;
        position: relative;
        cursor: pointer;

        ${NavbarToggleIcon} {
            background-color: ${({ active }) =>
                active ? "transparent" : "#fff"};

            &:nth-child(1) {
                transform: ${({ active }) =>
                    active ? "rotate(45deg) translate(5px, 6px)" : "none"};
            }

            &:nth-child(2) {
                opacity: ${({ active }) => (active ? "0" : "1")};
            }

            &:nth-child(3) {
                transform: ${({ active }) =>
                    active ? "rotate(-45deg) translate(5px, -6px)" : "none"};
            }
        }
    }
`;
