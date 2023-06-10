import styled from "styled-components";

export const SettingsPage = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;

    h1 {
        color: ${({ theme }) => theme.palette.gold};
        font-size: 36px;
    }
`;

export const SettingRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    margin: 50px;
`;

export const BuyPremiumButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.palette.gold};
    cursor: pointer;
    border-radius: 20px;
    width: 200px;
    height: 50px;
    margin: 20px;

    &:hover {
        background-color: 0 5px 10px 0 ${({ theme }) => theme.palette.white};
    }

    & > * {
        background-color: ${({ theme }) => theme.palette.gold};
    }

    img {
        margin-right: 10px;
        display: block;
        object-fit: cover;
    }
`;
