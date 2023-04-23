import styled from "styled-components";

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 30px;
`;

export const Link = styled.a`
    font-size: 18px;
    &:hover {
        color: #ff9c00;
        transition: 200ms ease-in;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        font-size: 16px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        font-size: 14px;
    }
`;

export const Title = styled.p`
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: bold;

    @media ${(props) => props.theme.breakpoints.md} {
        font-size: 20px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        font-size: 18px;
    }
`;
