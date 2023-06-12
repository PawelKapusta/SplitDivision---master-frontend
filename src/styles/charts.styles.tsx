import styled from "styled-components";

export const CurrencyCard = styled.div`
    height: 60px;
    width: 30%;
    margin-bottom: 10px;

    button {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;
        width: 100%;
        background-color: ${({ theme }) => theme.palette.gold};
        border-radius: 20px;

        img {
            display: block;
            border-radius: 50%;
        }
    }
`;

export const ChartContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
        margin-bottom: 20px;
    }
`;

export const ChartSelect = styled.select`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #ccc;
    color: #333;
`;

export const ChartTitle = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 200px;

    img {
        margin-top: 20px;
    }
`;

export const ChartCoinDescriptionTitle = styled.div`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.gold};
    margin: 40px 0;
`;

export const ChartDescriptionCard = styled.div`
    border: 1px solid;
    border-radius: 20px;
    padding: 10px;
    line-height: 1.5;
    color: ${({ theme }) => theme.palette.gold};
    width: 90%;
    font-size: 20px;
    margin-bottom: 60px;
`;
