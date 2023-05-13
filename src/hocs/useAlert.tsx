import React, { useState } from "react";
import MaterialUIAlert from "@components/alert";
import { TAlertProps } from "@components/alert";
interface UseAlertResult {
    showAlert: (message: string, type: TAlertProps["type"]) => void;
    AlertWrapper: React.FC;
}

const useAlert = (): UseAlertResult => {
    const [alert, setAlert] = useState<TAlertProps | null>(null);
    const showAlert = (message: string, type: TAlertProps["type"]) => {
        setAlert({ message, type });
        setTimeout(async () => {
            setAlert(null);
        }, 5000);
    };

    const AlertWrapper: React.FC = () => {
        return (
            <div
                style={{
                    position: "absolute",
                    bottom: 60,
                    left: 40,
                    zIndex: 1,
                }}
            >
                {alert && (
                    <MaterialUIAlert
                        message={alert.message}
                        type={alert.type}
                    />
                )}
            </div>
        );
    };

    return { showAlert, AlertWrapper };
};

export default useAlert;
