import styled from "styled-components";

export const Container = styled.header`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 200px;
    box-shadow: 0 3px 5px #393f484d;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const NavbarToggleIcon = styled.span`
    display: block;
    width: 20px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.white};
    margin: 4px 0;
`;

export const NavbarMenu = styled.ul<{
    show: boolean;
}>`
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
        box-shadow: 0 5px 10px 0 ${({ theme }) => theme.colors.white};
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

        li:last-child:hover {
            display: flex;
            justify-content: center;
            box-shadow: 0 5px 10px 0 ${({ theme }) => theme.colors.white};
            transition: transform 0.2s ease;
            transform: translateY(-5px);
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
    isAction?: boolean;
};

export const MenuLink = styled.a<MenuLinkProps>`
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    background: ${({ isAction }) =>
        isAction ? "linear-gradient(to right, #6a0dad, #330766)" : "none"};
    border-radius: ${({ isAction }) => (isAction ? "20px" : "none")};
    margin-right: ${({ isAction }) => (isAction ? "10px" : "none")};
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
            background-color: ${({ active }) =>
                active ? "red" : "${({ theme }) => theme.colors.white}"};
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
