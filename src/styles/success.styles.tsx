import styled from "styled-components";

export const SuccessPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
`;

export const SuccessPageBox = styled.div<{
    isPending?: boolean;
    isError?: boolean;
}>`
    text-align: center;

    h1 {
        font-size: 30px;
        margin-bottom: 10px;
        color: ${({ isPending, isError, theme }) =>
            isPending ? "dodgerblue" : isError ? "red" : theme.palette.gold};
    }

    p {
        font-size: 20px;
    }
`;
