import styled from "styled-components";

export const GroupContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 5px 10px 0px #fff;
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
    border-color: #eaaf57;
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
    border-color: #eaaf57;
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
    color: #eaaf57;
    font-size: 36px;
    font-weight: bold;
    height: 40px;
    text-align: center;
    margin-bottom: 20px;
`;

export const UsersSelector = styled.div`
    margin-top: 20px;
    width: 500px;

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

    .dropdown-content {
        border: 1px solid #eaaf57;
        background-color: #eaaf57;
        color: blue;
        overflow: auto;
        max-height: 200px;
        padding: 5px;

        div {
            &:hover {
                background-color: #eaaf57;
            }
        }
    }

    .dropdown-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        cursor: pointer;

        &:hover {
            background-color: #eaaf57;
        }

        &.selected {
            background-color: #eaaf57;
            color: #eaaf57;
        }
    }
`;
