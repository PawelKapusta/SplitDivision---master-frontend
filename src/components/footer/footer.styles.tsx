import styled from "styled-components";

export const Container = styled.div`
    min-height: 250px;
    width: 100%;
    padding: 10px;
    flex-shrink: 0;
    background: #eaaf57;

    @media ${(props) => props.theme.breakpoints.sm} {
        margin-top: 50px;
        padding: 1px;
    }
`;

export const Wrapper = styled.div`
    justify-content: center;
    margin-top: 200px;

    @media ${(props) => props.theme.breakpoints.sm} {
        margin-top: 250px;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;

    @media ${(props) => props.theme.breakpoints.sm} {
        width: 100%;
    }
`;

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 40px;

    @media ${(props) => props.theme.breakpoints.md} {
        & > * {
            flex: 1 0 150px;
        }
    }
`;

export const Link = styled.a`
    color: #fff;
    margin-bottom: 20px;
    font-size: 18px;
    text-decoration: none;
    &:hover {
        color: #ff9c00;
        transition: 200ms ease-in;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        & > * {
            flex: 1 0 calc(50% - 10px);
        }
        font-size: 16px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        & > * {
            flex: 1 0 100%;
        }
        font-size: 12px;
    }
`;

export const Title = styled.p`
    font-size: 24px;
    color: #fff;
    margin-top: 20px;
    margin-bottom: 40px;
    font-weight: bold;

    @media ${(props) => props.theme.breakpoints.md} {
        & > * {
            flex: 1 0 calc(50% - 10px);
        }
        font-size: 20px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        & > * {
            flex: 1 0 100%;
        }
        font-size: 18px;
    }
`;
