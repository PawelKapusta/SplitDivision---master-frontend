import styled from "styled-components";
import { alertTypes } from "../../types/alert";

export const Container = styled.div<{ type: keyof typeof alertTypes }>`
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    background: ${({ type }) => alertTypes[type].background};
    color: ${({ type }) => alertTypes[type].color};
`;

export const AlertIcon = styled.span<{ type: keyof typeof alertTypes }>`
    background-color: ${({ type }) => alertTypes[type].background};
    margin-right: 10px;
    margin-top: 5px;

    img {
        all: unset;
        width: 30px;
        fill: white;
    }
`;
