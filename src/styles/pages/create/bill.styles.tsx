import styled from "styled-components";

export const BillCardContainer = styled.div`
    display: flex;
    justify-content: center;
`;
export const FormCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 550px;
    width: 1000px;

    //button:nth-child(7) {
    //    margin-top: 30px;
    //    width: 30%;
    //}

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

export const DateLabel = styled.label`
    margin: 20px 10px 10px 20px;
    width: 60%;
    font-weight: bold;
    color: #eaaf57;
    font-size: 20px;
`;

export const BillCustomDatePicker = styled.div`
    position: relative;
    margin-top: 15px;
    width: 80%;

    .react-datepicker__input-container {
        input {
            background-color: #eaaf57;
            text-align: center;
            color: #333;
            border: 1px solid #eaaf57;
            width: 100%;
            font-weight: bold;
            cursor: pointer;
            border-radius: 4px;
            padding: 8px;
        }
    }

    .react-datepicker__calendar-container {
        background-color: #eaaf57;
        border: 1px solid #eaaf57;
    }

    .react-datepicker__current-month {
        color: #eaaf57;
    }
    .react-datepicker__day-name {
        border-radius: 4px;
        color: #fff;
        border: 1px solid #eaaf57;
    }

    .react-datepicker-time__header {
        background-color: black;
        color: #eaaf57;
    }

    .react-datepicker__time-list li {
        background-color: black;
        color: #eaaf57;
    }

    .react-datepicker__time-list li:hover {
        color: black;
    }

    .react-datepicker__day-names {
        background-color: black;
        color: #fff;
    }

    .react-datepicker__day {
        border-radius: 20px;
        color: #eaaf57;
    }

    .react-datepicker__day:hover {
        background-color: #fff;
        color: black;
    }

    .react-datepicker__day--selected {
        background-color: #eaaf57;
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
