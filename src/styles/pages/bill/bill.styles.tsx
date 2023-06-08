import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BillContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    width: 90%;

    & > * {
        background-color: ${({ theme }) => theme.palette.gold};
    }
`;

export const BillCardContent = styled.div<{ isLongDescription: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: ${({ theme }) => theme.palette.gold};
    margin-top: 30px;
    height: ${({ isLongDescription }) =>
        isLongDescription ? " 450px" : "400px"};
    color: ${({ theme }) => theme.palette.black};
    border-radius: 20px;
    width: 80%;
`;

export const BillCardTitle = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    margin-top: 20px;
    margin-left: 10px;
    padding: 20px;
    background-color: ${({ theme }) => theme.palette.gold};
    text-align: center;
    border-radius: 20px;

    p:nth-child(1) {
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 15px;
    }

    p:nth-child(2),
    p:nth-child(3) {
        img {
            margin-right: 15px;
        }
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        text-align: center;
        margin-top: 20px;
    }
    & * {
        background-color: ${({ theme }) => theme.palette.gold};
    }
`;

export const BillCardDescription = styled.div<{ isLongDescription: boolean }>`
    background-color: ${({ theme }) => theme.palette.gold};
    padding: 20px;
    height: 300px;
    width: 50%;
    font-size: 20px;
    line-height: ${({ isLongDescription }) =>
        isLongDescription ? "  1.1" : " 1.5"};

    & * {
        background-color: ${({ theme }) => theme.palette.gold};
    }
`;

export const BillCardImage = styled.div`
    background-color: ${({ theme }) => theme.palette.gold};
    border-radius: 20px;
    padding: 10px;
    width: 30%;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
    }
`;

export const BillAmount = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.palette.black};
    margin-top: 50px;

    & > * {
        background-color: ${({ theme }) => theme.palette.gold};
    }

    h3 {
        font-size: 20px;
        margin-bottom: 10px;
        text-align: center;
    }

    p {
        font-size: 16px;
        margin-bottom: 5px;
        text-align: center;
        & > * {
            background-color: ${({ theme }) => theme.palette.gold};
        }
    }
`;

export const BillImageContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const BillImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
`;

export const BillQRCode = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

export const QRCode = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
`;
