import styled from "styled-components";

export const BillCardContainer = styled.div`
    display: flex;
    justify-content: center;
`;
export const FormCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 1200px;

    overflow-y: auto;

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
    width: 95%;
    border-radius: 5px;
    height: 55px;
    font-size: 20px;
    border-color: ${({ theme }) => theme.palette.gold};
    padding: 10px;

    &:nth-child(1) {
        margin-top: 30px;
    }
`;

export const DebtInput = styled.input`
    width: 100%;
    border-radius: 5px;
    height: 43px;
    font-size: 20px;
    border-color: ${({ theme }) => theme.palette.gold};
    padding: 10px;
`;

export const InputDescription = styled.textarea`
    margin-top: 15px;
    width: 95%;
    border-radius: 5px;
    height: 155px;
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

export const Title = styled.div`
    margin-top: 30px;
    color: ${({ theme }) => theme.palette.gold};
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
        border: 1px solid ${({ theme }) => theme.palette.white};
    }

    .search input:focus {
        background: black;
        color: ${({ theme }) => theme.palette.white};
    }

    .clear-selected-button {
        display: flex;
        justify-content: center;
        width: 30px;
        margin-right: 20px;
    }

    .clear-selected-button:hover {
        box-shadow: 0 0 20px ${({ theme }) => theme.palette.white};
        border-radius: 50px;
    }

    .search-clear-button {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }

    .search-clear-button:hover {
        box-shadow: 0 0 20px ${({ theme }) => theme.palette.white};
        border-radius: 50px;
    }

    .select-item:hover {
        background: ${({ theme }) => theme.palette.gold};

        & * {
            background-color: ${({ theme }) => theme.palette.gold};
            color: black;
        }
    }

    .select-item.selected {
        background: ${({ theme }) => theme.palette.gold};
        font-weight: bold;
        border: 1px solid #b77d30;

        & * {
            background-color: ${({ theme }) => theme.palette.gold};
            color: black;
        }
    }

    .no-options {
        border: 4px solid ${({ theme }) => theme.palette.gold};
    }
`;

export const DateLabel = styled.label`
    margin: 20px 10px 10px 20px;
    width: 60%;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.gold};
    font-size: 20px;
`;

export const BillCustomDatePicker = styled.div`
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
        color: ${({ theme }) => theme.palette.white};
    }

    .react-datepicker__day--disabled {
        color: #ccc;
    }
`;

export const CurrencySelectorContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;

    img {
        width: 50px;
        margin-right: 10px;
    }
`;

export const CurrencySelector = styled.select`
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.palette.gold};
    border-radius: 4px;
    font-size: 18px;
    margin: 10px;
`;

export const CurrencyOption = styled.option`
    font-size: 18px;
`;

export const SelectedUserDebtBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const SelectedUserDebtLabel = styled.label`
    color: ${({ theme }) => theme.palette.gold};
    font-weight: bold;
`;

export const SelectedUserDebtInput = styled.input`
    border-radius: 5px;
    height: 36px;
    font-size: 20px;
    border-color: ${({ theme }) => theme.palette.gold};
    padding: 10px;
    margin: 10px;
`;

export const DebtDivideEvenlyCheckbox = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.palette.gold};

    input {
        margin-left: 10px;
    }
`;
