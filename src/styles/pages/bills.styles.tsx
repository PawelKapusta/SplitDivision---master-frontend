import styled from "styled-components";

export const BillsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 80px;
    width: 100%;

    h2 {
        text-align: center;
        font-weight: bold;
        color: #eaaf57;
    }

    h4 {
        color: #808080;
        margin-top: 20px;
        span {
            color: #eaaf57;
        }
    }
`;
