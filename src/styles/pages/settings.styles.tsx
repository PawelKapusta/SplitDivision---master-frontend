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
