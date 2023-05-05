import React from "react";
import { Container, AlertIcon } from "./alert.styles";
import { alertTypes } from "../../types/alert";

export type TAlertProps = {
    message: string;
    type: keyof typeof alertTypes;
};

const AlertContainer = ({ message, type }: TAlertProps) => {
    return (
        <Container type={type}>
            <AlertIcon type={type}>
                <img src={alertTypes[type].icon} alt="Alert Icon" />
            </AlertIcon>
            {message}
        </Container>
    );
};

export default AlertContainer;
