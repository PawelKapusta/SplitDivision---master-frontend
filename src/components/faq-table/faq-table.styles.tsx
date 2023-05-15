import styled from "styled-components";

export const FAQTable = styled.div`
    margin: 100px auto;
    max-width: 1000px;
    h2 {
        text-align: center;
        font-weight: bold;
        color: #eaaf57;
    }
`;

export const FAQList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const FAQQuestion = styled.h3`
    font-size: 22px;
    font-weight: bold;
    margin: 30px 0 15px;
`;

export const FAQAnswer = styled.div`
    font-size: 18px;
    margin: 0;
`;
