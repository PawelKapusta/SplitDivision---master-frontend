import styled from "styled-components";

export const StatisticsPage = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const Title = styled.div`
    height: 100%;

    h1 {
        text-align: center;
        font-size: 36px;
        color: ${({ theme }) => theme.palette.gold};
    }
`;

export const StatisticsImage = styled.div`
    display: flex;
    justify-content: center;
    height: 350px;
`;

export const StatisticsContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    img {
        display: block;
        object-fit: contain;
        border-radius: 20px;
        width: 100%;
    }
`;

export const ApplicationStatistics = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin-bottom: 20px;
`;

export const SectionTitle = styled.div`
    color: ${({ theme }) => theme.palette.white};
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;

    @media ${(props) => props.theme.breakpoints.lg} {
        font-size: 30px;
    }
`;

export const StatisticsPageScreens = styled.div`
    h1 {
        color: dodgerblue;
        @media ${(props) => props.theme.breakpoints.lg} {
            font-size: 20px;
        }
    }

    h3 {
        margin: 20px;
        color: ${({ theme }) => theme.palette.gold};

        @media ${(props) => props.theme.breakpoints.lg} {
            margin: 5px;
            margin-bottom: 15px;
        }
    }

    p {
        color: red;
        margin-top: 10px;
        font-size: 22px;
        @media ${(props) => props.theme.breakpoints.lg} {
            font-size: 18px;
        }
    }
`;

export const CurrencyRow = styled.p<{ isFiat?: boolean; isCrypto?: boolean }>`
    color: ${({ isFiat, isCrypto, theme }) =>
        isFiat ? "green" : isCrypto ? theme.palette.gold : "blue"} !important;
    margin-top: 10px;
    font-size: 22px;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

export const SectionRow = styled.div`
    display: flex;
    flex-direction: column;
`;
