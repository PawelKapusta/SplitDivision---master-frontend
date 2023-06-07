import styled from "styled-components";

export const Title = styled.div`
    display: flex;
    justify-content: center;
    font-size: 36px;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.gold};
`;

export const Actions = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-left: 5px;
`;

export const DeleteIconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    border-color: red;
    cursor: pointer;
    background-color: red !important;
    margin-right: 10px;

    img {
        border-radius: 50%;
        background-color: red;
    }
    &:hover {
        box-shadow: 0 0 10px ${({ theme }) => theme.palette.white};
    }
`;

export const GoIconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    border-color: dodgerblue;
    cursor: pointer;
    background-color: dodgerblue !important;

    img {
        border-radius: 50%;
        background-color: dodgerblue;
    }

    a {
        background-color: dodgerblue;
    }
    &:hover {
        box-shadow: 0 0 10px ${({ theme }) => theme.palette.white};
    }
`;

export const DeleteModalContent = styled.div`
    flex-direction: column;
    height: 200px;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.black} !important;

    & > * {
        background-color: ${({ theme }) => theme.palette.black} !important;
    }
    button {
        position: absolute;
        top: 40px;
    }
`;

export const DeleteModalTitle = styled.div`
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.gold};
`;

export const DeleteModalDescription = styled.div`
    font-size: 20px;
    color: red;
    margin-top: 20px;
`;

export const DeleteButtonActions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DeleteModalButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    width: 300px;
    height: 50px;
    border-radius: 20px;
    background-color: red;
    cursor: pointer;

    img {
        background-color: red;
    }
`;
