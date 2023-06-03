import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SwapIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    margin-left: 10px;
    color: #333;
    transition: transform 0.3s;

    &:hover {
        transform: rotate(180deg);
    }
`;

export const Icon = styled(FontAwesomeIcon)`
    margin-right: 10px;
`;
export const ConverterContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const Title = styled.h2`
    text-align: center;
`;

export const ConverterForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    padding: 10px;
    margin-bottom: 10px;
`;

export const Select = styled.select`
    padding: 10px;
    margin-bottom: 10px;
`;

export const Button = styled.button`
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
`;

export const Result = styled.p`
    text-align: center;
`;
