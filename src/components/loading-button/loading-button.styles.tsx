import styled from "styled-components";
import { ButtonTypes, TButton } from "../../types/button";

export const Button = styled.button<{ variety: TButton; isBillForm?: boolean }>`
    margin-top: ${({ isBillForm }) => (isBillForm ? "30px" : "20px")};
    cursor: pointer;
    border-radius: 5px;
    background: ${({ variety }) => ButtonTypes[variety].background};
    width: ${({ isBillForm }) => (isBillForm ? "30%" : "80%")};
    height: 50px;
    font-size: 20px;
    padding: 8px;
    margin-bottom: ${({ isBillForm }) => (isBillForm ? "20px" : "0")};
`;
