import styled from "styled-components";

export const GroupContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 10px 0 ${({ theme }) => theme.colors.white};
    height: 60vh;
    margin: 80px 150px 0 150px;

    @media ${(props) => props.theme.breakpoints.md} {
        margin-top: 50px;
        align-items: flex-start;
    }
`;

export const FormCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 550px;
    width: 1000px;

    button:nth-child(7) {
        margin-top: 30px;
        width: 30%;
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        height: 400px;
    }
    @media ${(props) => props.theme.breakpoints.md} {
        margin-bottom: 50px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
    }
`;

export const Input = styled.input`
    margin-top: 15px;
    width: 100%;
    border-radius: 5px;
    height: 55px;
    font-size: 20px;
    border-color: ${({ theme }) => theme.colors.gold};
    padding: 10px;

    &:nth-child(1) {
        margin-top: 30px;
    }
`;

export const InputDescription = styled.textarea`
    margin-top: 15px;
    width: 100%;
    border-radius: 5px;
    height: 155px;
    font-size: 20px;
    border-color: ${({ theme }) => theme.colors.gold};
    padding: 10px;

    &:nth-child(1) {
        margin-top: 30px;
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
    color: ${({ theme }) => theme.colors.gold};
    font-size: 36px;
    font-weight: bold;
    height: 40px;
    text-align: center;
    margin-bottom: 20px;
`;

export const UsersSelector = styled.div`
    margin-top: 20px;
    width: 500px;

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
        background: ${({ theme }) => theme.colors.gold};

        & * {
            background-color: ${({ theme }) => theme.colors.gold};
            color: black;
        }
    }

    .select-item.selected {
        background: ${({ theme }) => theme.colors.gold};
        font-weight: bold;
        border: 1px solid #b77d30;

        & * {
            background-color: ${({ theme }) => theme.colors.gold};
            color: black;
        }
    }

    .no-options {
        border: 4px solid ${({ theme }) => theme.colors.gold};
    }
`;
