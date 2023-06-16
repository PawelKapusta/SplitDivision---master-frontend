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
        margin-right: 4px;
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

export const DeleteModalButton = styled.button<{
    isBlock?: boolean;
    isAdmin?: boolean;
    isWarningBlock?: boolean;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: ${({ isWarningBlock }) => (isWarningBlock ? "120px" : "100px")};
    width: ${({ isAdmin }) => (isAdmin ? "350px" : "300px")};
    height: 50px;
    border-radius: 20px;
    background-color: ${({ isBlock, isAdmin }) =>
        isBlock ? "purple" : isAdmin ? "green" : "red !important"};
    cursor: pointer;

    img {
        background-color: ${({ isBlock, isAdmin }) =>
            isBlock ? "purple" : isAdmin ? "green" : "red"};
        margin-right: 10px;
    }
`;

export const AdminUsersPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

export const UserCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 150px;
    flex-wrap: wrap;
    width: 90%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
    margin-top: 20px;
    padding: 60px;
`;

export const UserColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
        margin-bottom: 10px;
    }
`;

export const UserTitle = styled.span`
    color: ${({ theme }) => theme.palette.gold};
    font-weight: bold;
    margin-bottom: 5px;
    margin-top: 10px;
`;

export const ButtonActions = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const BlockButton = styled.button`
    background-color: purple;
    color: #fff;
    margin-right: 20px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 10px ${({ theme }) => theme.palette.white};
    }
`;

export const DeleteButton = styled.button`
    background-color: red;
    color: #fff;
    margin-right: 20px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 10px ${({ theme }) => theme.palette.white};
    }
`;

export const AdminButton = styled.button`
    background-color: green;
    color: #fff;
    margin-right: 20px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 10px ${({ theme }) => theme.palette.white};
    }
`;

export const Avatar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;

    img {
        display: block;
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        img:hover {
            box-shadow: none;
        }
    }
`;

export const AvatarList = styled.div`
    img {
        display: block;
        border-radius: 50%;
        width: 80px;
        height: 80px;
    }
`;
