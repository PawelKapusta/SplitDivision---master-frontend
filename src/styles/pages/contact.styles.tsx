import styled from "styled-components";

export const ContactCard = styled.div`
    display: flex;
    justify-content: center;
    height: 60vh;
    border-radius: 20px;
    box-shadow: 0px 5px 10px 0px #fff;
    margin: 150px 100px;

    form {
        margin-top: 50px;
        width: 60%;
    }

    h1 {
        margin-bottom: 30px;
    }
`;

export const Title = styled.div`
    text-align: center;
`;

export const ContactRow = styled.div`
    width: 100%;
    height: 130px;
    font-size: 20px;

    label {
        font-size: 26px;
        font-weight: bold;
    }
    input {
        width: 100%;
        margin-top: 20px;
        height: 50px;
        border-radius: 20px;
        padding: 15px;
    }

    textarea {
        width: 100%;
        margin-top: 20px;
        height: 300px;
        border-radius: 20px;
        padding: 15px;
    }
`;

export const ContactButtonRow = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 260px;

    button {
        width: 300px;
    }
`;
