import styled from "styled-components";

export const AuthContainer = styled.div`
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
        border: 1px solid ${({ theme }) => theme.palette.gold};
        margin-top: 50px;
        width: 100%;
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
`;

export const Description = styled.div`
    font-size: 20px;
    color: ${({ theme }) => theme.palette.gold};
    text-align: center;
    margin-bottom: 20px;
`;

export const FormCard = styled.div<{ isRegisterForm?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 550px;

    overflow-y: ${({ isRegisterForm }) => (isRegisterForm ? "auto" : "none")};

    @media ${(props) => props.theme.breakpoints.lg} {
        height: 400px;
    }
    @media ${(props) => props.theme.breakpoints.md} {
        margin-bottom: 50px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
    }

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        margin-right: 13px;
        background-color: ${({ theme }) => theme.palette.white};
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.palette.gold};
        border-radius: 5px;
    }
`;

export const Input = styled.input`
    margin-top: 15px;
    width: 80%;
    border-radius: 5px;
    height: 55px;
    font-size: 20px;
    border-color: ${({ theme }) => theme.palette.gold};
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
    margin: 10px 10px 10px 20px;
    width: 80%;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.gold};
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
        color: #4b79a1;
    }
`;

export const CustomDatePicker = styled.div`
    position: relative;
    margin-top: 15px;
    width: 80%;

    .react-datepicker__input-container {
        input {
            background-color: ${({ theme }) => theme.palette.gold};
            text-align: center;
            color: #333;
            border: 1px solid ${({ theme }) => theme.palette.gold};
            width: 100%;
            font-weight: bold;
            cursor: pointer;
            border-radius: 4px;
            padding: 8px;
        }
    }

    .react-datepicker__calendar-container {
        background-color: ${({ theme }) => theme.palette.gold};
        border: 1px solid ${({ theme }) => theme.palette.gold};
    }

    .react-datepicker__current-month {
        color: ${({ theme }) => theme.palette.gold};
    }
    .react-datepicker__day-name {
        border-radius: 4px;
        color: ${({ theme }) => theme.palette.white};
        border: 1px solid ${({ theme }) => theme.palette.gold};
    }

    .react-datepicker-time__header {
        background-color: black;
        color: ${({ theme }) => theme.palette.gold};
    }

    .react-datepicker__time-list li {
        background-color: black;
        color: ${({ theme }) => theme.palette.gold};
    }

    .react-datepicker__time-list li:hover {
        color: black;
    }

    .react-datepicker__day-names {
        background-color: black;
        color: ${({ theme }) => theme.palette.white};
    }

    .react-datepicker__day {
        border-radius: 20px;
        color: ${({ theme }) => theme.palette.gold};
    }

    .react-datepicker__day:hover {
        background-color: ${({ theme }) => theme.palette.white};
        color: black;
    }

    .react-datepicker__day--selected {
        background-color: ${({ theme }) => theme.palette.gold};
        color: #333;
    }

    .react-datepicker__day--hovered {
        background-color: black;
        color: white;
    }

    .react-datepicker__day--disabled {
        color: #ccc;
    }
`;

export const Select = styled.select`
    width: 80%;
    height: 50px;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.palette.gold};
    margin: 15px 0;
    border-radius: 4px;
    color: ${({ theme }) => theme.palette.white};

    &::-ms-expand {
        display: none;
    }

    &::after {
        content: "\\25BC";
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        pointer-events: none;
        color: ${({ theme }) => theme.palette.gold};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    option {
        padding: 8px;
        background-color: ${({ theme }) => theme.palette.black};
        color: ${({ theme }) => theme.palette.gold};
    }

    option:checked {
        color: ${({ theme }) => theme.palette.white};
        font-weight: bold;
    }
`;
