import styled from "styled-components";

export const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    margin-right: 10px;

    @media ${(props) => props.theme.breakpoints.md} {
        width: 100%;
    }
`;

export const DropdownToggle = styled.button`
    background-color: black;
    border-radius: 50%;
    border: none;
    cursor: pointer;

    @media ${(props) => props.theme.breakpoints.md} {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 5%;
    width: 200px;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.gold};
    border-radius: 4px;

    a {
        display: block;
        border-radius: 10px;
        padding: 10px;
        text-decoration: none;
        text-align: center;
        color: white;
        width: 100%;
    }

    a:hover {
        box-shadow: 0 0 20px ${({ theme }) => theme.colors.white};
    }

    @media ${(props) => props.theme.breakpoints.md} {
        right: 0;
        width: 100%;
    }
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
        box-shadow: 0 5px 10px 0 ${({ theme }) => theme.colors.white};
    }

    @media ${(props) => props.theme.breakpoints.md} {
        img:hover {
            box-shadow: none;
        }
    }
`;

export const AdminLinks = styled.span`
    a {
        color: red;
    }
`;
