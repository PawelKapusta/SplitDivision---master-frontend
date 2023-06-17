import styled from "styled-components";

export const ContactCard = styled.div`
    display: flex;
    justify-content: center;
    height: 70vh;
    border-radius: 20px;
    box-shadow: 0 5px 10px 0 ${({ theme }) => theme.palette.white};
    margin: 150px 100px;

    form {
        margin-top: 50px;
        width: 60%;
    }

    h1 {
        margin-bottom: 30px;
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        height: 70vh;
    }

    @media ${(props) => props.theme.breakpoints.md} {
        width: 80%;
        margin: 50px auto;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        width: 90%;
        height: 100vh;
    }
`;

export const Title = styled.div`
    text-align: center;

    @media ${(props) => props.theme.breakpoints.md} {
        font-size: 20px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        font-size: 16px;
        margin-bottom: 60px;
    }
`;

export const ContactRow = styled.div`
    width: 100%;
    height: 130px;
    font-size: 20px;

    label {
        font-size: 26px;
        font-weight: bold;

        @media ${(props) => props.theme.breakpoints.sm} {
            font-size: 22px;
        }
    }

    input {
        width: 100%;
        margin-top: 20px;
        height: 50px;
        border-radius: 20px;
        padding: 15px;

        @media ${(props) => props.theme.breakpoints.sm} {
            font-size: 16px;
        }
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
