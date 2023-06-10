import styled from "styled-components";

export const TranslationSelect = styled.select`
    height: 50px;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.palette.gold};
    margin: 15px 0;
    border-radius: 4px;
    color: ${({ theme }) => theme.palette.white};
    cursor: pointer;

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
