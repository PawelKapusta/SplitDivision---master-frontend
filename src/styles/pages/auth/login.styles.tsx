import styled from "styled-components";

export const LoginCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;

    @media ${(props) => props.theme.breakpoints.md} {
        margin-top: 50px;
        align-items: flex-start;
    }
`;

export const Form = styled.div`
    width: 50%;
    border-radius: 20px;

    @media ${(props) => props.theme.breakpoints.md} {
        margin-top: 50px;
        width: 100%;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
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

export const Description = styled.div`
    font-size: 20px;
    color: #eaaf57;
    text-align: center;
    margin-bottom: 20px;
`;

export const FormCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 550px;

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
    width: 80%;
    border-radius: 5px;
    height: 50px;
    font-size: 20px;
    border-color: #eaaf57;

    &:nth-child(1) {
        margin-top: 30px;
    }
`;

export const Error = styled.span`
    margin-top: 15px;
    p {
        color: red;
    }
`;

export const LoginButton = styled.button`
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;
    background: linear-gradient(to right, #6a0dad, #330766);
    width: 80%;
    height: 50px;
    font-size: 20px;
`;

export const OAuthLoginButton = styled.button`
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid #003366;
    width: 80%;
    height: 50px;
    font-size: 20px;
`;

export const RegisterDescription = styled.div`
    margin-top: 20px;
    font-size: 15px;

    a {
        color: purple;
    }
`;
