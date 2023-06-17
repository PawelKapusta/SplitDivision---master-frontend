import styled from "styled-components";

export const Container = styled.div<{ isSmall: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${({ isSmall }) => (isSmall ? "10vh" : "100vh")};

    @media (min-width: 768px) {
        height: 50vh;
    }
    @media (min-width: 640px) {
        height: 25vh;
    }

    @media (max-width: 640px) {
        height: 10vh;
    }
`;
