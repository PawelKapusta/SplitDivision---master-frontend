import styled from "styled-components";

export const Container = styled.div<{ isSmall: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${({ isSmall }) => (isSmall ? "10vh" : "100vh")} !important;

    @media (min-width: 768px) {
        height: 50vh;
    }
    @media (min-width: 640px) {
        height: 25vh;
    }

    @media (min-width: 0px) {
        height: 10vh;
    }
`;
