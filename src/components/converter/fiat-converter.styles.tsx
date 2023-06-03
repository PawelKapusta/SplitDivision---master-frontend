import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export const Converter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 50px;
    width: 1000px;
    height: 400px;
`;

export const Title = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;

    img {
        margin: 0 10px;
        border-radius: 10px;
    }

    h2:nth-child(1) {
        margin-right: 10px;
    }
`;

export const TitleCurrencyName = styled.h2`
    color: #b77d30;
`;
export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    width: 100%;
    margin-top: 30px;
`;

export const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
`;

export const Button = styled.button`
    padding: 8px 20px;
    background-color: #eaaf57;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 30px 20px 0 20px;
    display: flex;
    align-items: center;

    &:hover {
        box-shadow: 0 0 10px white;
    }

    img {
        width: 20px;
        background-color: #eaaf57;
        margin-left: 10px;
    }
`;

export const ButtonsList = styled.div`
    display: flex;
    flex-direction: row;
`;

export const CurrencyItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
`;

export const CurrencySelect = styled.select`
    padding: 8px;
    border-radius: 4px;
    font-size: 20px;
    border: 1px solid #ccc;
    outline: none;
    margin-left: 10px;

    option {
        font-size: 20px;
    }

    option:hover {
        color: black;
        background-color: #eaaf57;
    }
`;
