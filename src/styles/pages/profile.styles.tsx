import styled from "styled-components";

export const ProfileCard = styled.div`
    height: 100vh;
    width: 100%;
`;

export const AvatarCard = styled.div`
    display: flex;
    justify-content: center;

    img {
        display: block;
        max-width: 300px;
        height: 100%;
        object-fit: contain;
        border-radius: 30px;
    }
`;

export const FormCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    height: 550px;

    @media ${(props) => props.theme.breakpoints.lg} {
        height: 400px;
    }
    @media ${(props) => props.theme.breakpoints.md} {
        margin-bottom: 50px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
    }

    select {
        width: 60%;
    }

    button {
        width: 30%;
    }

    input:nth-child(2) {
        max-width: 20%;
    }

    .react-datepicker__input-container {
        display: flex;
        justify-content: center;
    }
`;

export const Input = styled.input`
    margin-top: 15px;
    width: 60%;
    border-radius: 5px;
    height: 55px;
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

export const BirthLabel = styled.label`
    margin: 20px 10px 10px 20px;
    width: 60%;
    font-weight: bold;
    color: #eaaf57;
    font-size: 20px;
`;
