import styled from "styled-components";

export const GroupContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 10px 0 ${({ theme }) => theme.palette.white};
    height: 60vh;
    margin-top: 50px;
    width: 100%;

    @media ${(props) => props.theme.breakpoints.md} {
        margin-top: 50px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        margin-right: 0;
        box-shadow: none;
    }
`;

export const FormCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 550px;
    width: 900px;

    button:nth-child(7) {
        margin-top: 30px;
        width: 30%;

        @media ${(props) => props.theme.breakpoints.sm} {
            width: 50%;
            font-size: 16px;
            margin-bottom: 20px;
        }
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        height: 400px;
        width: 750px;
    }
    @media ${(props) => props.theme.breakpoints.md} {
        width: 650px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        width: 350px;
    }
`;

export const Input = styled.input`
    margin-top: 15px;
    width: 100%;
    border-radius: 5px;
    height: 55px;
    font-size: 20px;
    border-color: ${({ theme }) => theme.palette.gold};
    padding: 10px;

    &:nth-child(1) {
        margin-top: 30px;
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        width: 80%;
        font-size: 18px;
    }
`;

export const InputDescription = styled.textarea`
    margin-top: 15px;
    width: 100%;
    border-radius: 5px;
    height: 180px;
    font-size: 20px;
    border-color: ${({ theme }) => theme.palette.gold};
    padding: 10px;

    &:nth-child(1) {
        margin-top: 30px;
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        width: 80%;
    }
`;

export const Error = styled.span`
    margin-top: 15px;

    &:nth-child(12) {
        margin-top: 0;
    }

    p {
        color: red;
    }
`;

export const Title = styled.div`
    margin-top: 30px;
    color: ${({ theme }) => theme.palette.gold};
    font-size: 36px;
    font-weight: bold;
    height: 40px;
    text-align: center;
    margin-bottom: 20px;
    @media ${(props) => props.theme.breakpoints.lg} {
        font-size: 32px;
    }
`;

export const UsersSelector = styled.div`
    margin-top: 20px;
    width: 500px;
    @media ${(props) => props.theme.breakpoints.sm} {
        width: 250px;
    }

    .search input {
        border: 1px solid white;
    }

    .search input:focus {
        background: black;
        color: white;
    }

    .clear-selected-button {
        display: flex;
        justify-content: center;
        width: 30px;
        margin-right: 20px;
    }

    .clear-selected-button:hover {
        box-shadow: 0 0 20px white;
        border-radius: 50px;
    }

    .search-clear-button {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }

    .search-clear-button:hover {
        box-shadow: 0 0 20px white;
        border-radius: 50px;
    }

    .select-item:hover {
        background: #eaaf57;

        & * {
            background-color: #eaaf57;
            color: black;
        }
    }

    .select-item.selected {
        background: #eaaf57;
        font-weight: bold;
        border: 1px solid #b77d30;

        & * {
            background-color: #eaaf57;
            color: black;
        }
    }

    .no-options {
        border: 4px solid #eaaf57;
    }
`;
