import styled from "styled-components";

export const Container = styled.div<{ isSmall: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${({ isSmall }) => (isSmall ? "10vh" : "100vh")};
`;
