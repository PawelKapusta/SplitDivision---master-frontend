import styled from "styled-components";

export const GroupContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h4 {
        margin-top: 20px;
        color: #808080;
        margin-bottom: 50px;

        span {
            color: ${({ theme }) => theme.palette.gold};
        }
    }
`;
export const GroupCardContent = styled.div<{ isLongDescription: boolean }>`
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

export const GroupCardTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
    p:nth-child(2) {
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

export const GroupCardActions = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-end;

    img {
        cursor: pointer;
        height: 30px;
        width: 50px;
    }
`;

export const GroupCardDescription = styled.div<{ isLongDescription: boolean }>`
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

export const GroupCardImage = styled.div`
    background-color: ${({ theme }) => theme.palette.gold};
    border-radius: 20px;
    padding: 10px;
    width: 30%;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 20px;
    }
`;

export const CreateBillButton = styled.button`
    display: flex;
    align-items: center;
    margin-top: 40px;
    background: linear-gradient(to right, #f2994a, #f2c94c);
    cursor: pointer;
    width: 250px;
    height: 60px;
    border-radius: 20px;
    font-size: 20px;

    &:hover {
        box-shadow: 0 5px 10px 0 ${({ theme }) => theme.palette.gold};
        transition: transform 0.5s ease-in-out;
        transform: translateY(-5px);
    }

    img {
        background: none;
        margin-left: 15px;
        margin-right: 30px;
    }
`;

export const CenterTitle = styled.div`
    color: ${({ theme }) => theme.palette.gold};
    margin-top: 80px;
    font-size: 26px;
    font-weight: bold;
`;
export const Container = styled.div`
    width: 100%;
    max-width: 800px;
    border-radius: 20px;
    margin-top: 30px;
`;

export const ListItem = styled.div<{ isBlocked: boolean }>`
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border: 1px solid #b77d30;
    background-color: ${({ isBlocked, theme }) =>
        isBlocked ? "#cb2d3e" : theme.palette.gold}};
    & * {
        background-color: ${({ isBlocked, theme }) =>
            isBlocked ? "#cb2d3e" : theme.palette.gold};
    }

    &:nth-child(1) {
        border-radius: 20px 20px 0 0;
    }

    &:last-child {
        border-radius: 0 0 20px 20px;
    }

    img {
        display: block;
        height: 100%;
        width: 100%;
    }
`;

export const ListItemText = styled.div<{ isBlocked: boolean }>`
    margin-left: 16px;
    width: 30%;
    background-color: ${({ isBlocked, theme }) =>
        isBlocked ? "#cb2d3e" : theme.palette.gold};
`;

export const PrimaryText = styled.div`
    font-weight: 500;
    text-align: center;

    a:hover {
        color: ${({ theme }) => theme.palette.black};
    }
`;

export const SecondaryText = styled.div<{ isBlocked: boolean }>`
    color: ${({ isBlocked, theme }) =>
        isBlocked ? theme.palette.black : "#757575"};
    margin-top: 5px;
    text-align: center;
`;

export const EditGroupButton = styled.div`
    background-color: dodgerblue;
    border-radius: 30px;
    padding: 5px;
    img {
        background-color: dodgerblue;
        border-radius: 30px;
    }

    &:hover {
        box-shadow: 0 5px 10px 0 ${({ theme }) => theme.palette.white};
    }
`;

export const DeleteGroupButton = styled.div`
    background-color: #cb2d3e;
    border-radius: 30px;
    padding: 5px;
    img {
        background-color: #cb2d3e;
        border-radius: 30px;
    }

    &:hover {
        box-shadow: 0 5px 10px 0 ${({ theme }) => theme.palette.white};
    }
`;
