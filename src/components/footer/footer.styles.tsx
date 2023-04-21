import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 250px;
    padding: 10px;
    flex-shrink: 0;
    background: ${(props) => props.theme.palette.secondary.background.main};
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
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
            flex: 1 0 calc(50% - 10px);
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
