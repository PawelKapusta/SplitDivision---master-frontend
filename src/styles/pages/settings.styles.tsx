import styled from "styled-components";

export const SettingsPage = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;

    h1 {
        color: ${({ theme }) => theme.palette.gold};
        font-size: 36px;
        margin-right: 65px;
        width: 100%;
    }

    @media ${(props) => props.theme.breakpoints.lg} {
        h1 {
            font-size: 32px;
        }
    }
    @media ${(props) => props.theme.breakpoints.md} {
        h1 {
            font-size: 28px;
        }
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        h1 {
            font-size: 24px;
        }

        font-size: 16px;
    }
`;

export const SettingRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    margin-top: 50px;
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

    @media ${(props) => props.theme.breakpoints.lg} {
        width: 150px;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
        width: 120px;
        height: 40px;
    }
`;

export const MessageForNotPremiumUsers = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.palette.gold};
    width: 50%;
    margin-top: 30px;
`;

export const MoreFeaturesSoon = styled.div`
    margin-top: 30px;
    text-align: center;
    color: grey;

    @media ${(props) => props.theme.breakpoints.sm} {
        font-size: 16px;
    }
`;
