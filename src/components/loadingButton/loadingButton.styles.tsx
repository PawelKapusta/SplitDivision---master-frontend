import styled from "styled-components";
import { ButtonTypes, TButton } from "../../types/button";

export const Button = styled.button<{ variety: TButton }>`
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;
    background: ${({ variety }) => ButtonTypes[variety].background};
    width: 80%;
    height: 50px;
    font-size: 20px;
    padding: 8px;
`;
