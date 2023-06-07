import styled from "styled-components";

export const CardLink = styled.a`
    width: 100%;
`;

export const CardContainer = styled.div<{
    isBill?: boolean;
    isAdmin?: boolean;
}>`
    display: flex;
    margin: 40px;
    height: 150px;
    justify-content: ${({ isBill }) => (isBill ? "space-around" : "none")};
    background-color: ${({ isAdmin }) => (isAdmin ? "#D3D3D3" : "white")};
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
    & * {
        background-color: ${({ isAdmin }) => (isAdmin ? "#D3D3D3" : "white")};
    }
    &:hover {
        box-shadow: 0 0 20px ${({ theme }) => theme.colors.white};
    }
`;

export const CardTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 250px;
    margin-left: 10px;
    p {
        color: ${({ theme }) => theme.colors.black};
        margin-bottom: 5px;
    }

    p:nth-child(1) {
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 5px;
    }
`;

export const CardImage = styled.div<{ isBill?: boolean }>`
    width: ${({ isBill }) => (isBill ? "70%" : "90%")};
    height: 80px;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
    }
`;
export const CardDescription = styled.div`
    margin: 10px 0 0 10px;

    span {
        color: ${({ theme }) => theme.colors.black};
    }
`;

export const CardCost = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        color: ${({ theme }) => theme.colors.black};
        font-weight: bold;
        font-size: 24px;
    }
`;
