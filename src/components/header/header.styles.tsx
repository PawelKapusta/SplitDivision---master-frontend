import { useState } from "react";
import styled from "styled-components";

export const Container = styled.header`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 200px;

    //border: 1px solid red;
    box-shadow: 0 3px 5px #393f484d;

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

export const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;

    img {
        border-radius: 50%;
    }

    img:hover {
        box-shadow: 0px 5px 10px 0px #fff;
        transform: translateX(-50%);
        animation: jump 0.5s ease-in-out infinite alternate;
    }

    @keyframes jump {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-10px);
        }
    }
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
        border-radius: 20px;
    }

    li:hover:not(:last-child) {
        box-shadow: 0px 5px 10px 0px #fff;
        transition: transform 0.2s ease;
        transform: translateY(-5px);
    }

    a {
        display: inline-block;
        padding: 15px 30px;
    }

    a:hover {
        text-decoration: none;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        display: ${({ show }) => (show ? "flex" : "none")};
        flex-direction: column;
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;

        li {
            width: 100%;
            text-align: center;
            padding: 5px 0;
        }

        li:last-child {
            display: flex;
            justify-content: center;
        }

        a {
            width: 100%;
        }
    }
`;

export const NavbarMenuItem = styled.li`
    margin-left: 10px;

    @media ${(props) => props.theme.breakpoints.md} {
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

    @media ${(props) => props.theme.breakpoints.md} {
        display: block;
        position: relative;
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin-bottom: 50px;

        ${NavbarToggleIcon} {
            background-color: ${({ active }) => (active ? "red" : "#fff")};
            border: ${({ active }) => (active ? "2px solid red" : "")};

            &:hover {
                box-shadow: ${({ active }) =>
                    active ? "50px 51px 100px 0px red" : "none"};
            }

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