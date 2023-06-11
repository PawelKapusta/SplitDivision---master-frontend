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

export const BillCardActions = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    margin-top: 15px;

    img {
        cursor: pointer;
        height: 30px;
        width: 50px;
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

export const BillCenterTitle = styled.div`
    color: ${({ theme }) => theme.palette.gold};
    margin-top: 40px;
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 30px;
    background-color: ${({ theme }) => theme.palette.black};
`;

export const BillUsersContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 800px;

    img {
        width: 60px;
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

export const BillTotal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.palette.black};
    margin-top: 15px;

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
        margin: 5px;
        text-align: center;
        font-weight: bold;

        & > * {
            background-color: ${({ theme }) => theme.palette.gold};
        }
    }
`;

export const BillImageBox = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px;
`;

export const BillImageCard = styled.img`
    width: 200px;
    margin-bottom: 10px;
    height: 200px;
    border-radius: 20px;
`;

export const QRCodeBox = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`;

export const CodeQrDownloadLink = styled.div`
    background-color: ${({ theme }) => theme.palette.black};
    color: ${({ theme }) => theme.palette.gold};
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.palette.white};
    }
`;

export const RegulateSpan = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

export const RegulateButton = styled.button`
    display: flex;
    background-color: dodgerblue;
    border: 1px solid dodgerblue;
    padding: 5px;
    cursor: pointer;
    border-radius: 20px;

    &:hover {
        background-color: 0 5px 10px 0 ${({ theme }) => theme.palette.white};
    }
`;
