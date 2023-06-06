import React, { ReactElement } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { TButton } from "../../types/button";
import { Button } from "./loading-button.styles";

type TLoadingButtonProps = {
    disabled: boolean;
    children: React.ReactNode;
    loading: boolean;
    variety: TButton;
};

const LoadingButton = ({
    loading,
    disabled,
    children,
    variety,
}: TLoadingButtonProps): ReactElement => {
    return (
        <Button
            disabled={loading || disabled}
            style={{ position: "relative" }}
            type="submit"
            variety={variety}
        >
            {children}
            {loading && (
                <CircularProgress
                    size={25}
                    style={{
                        position: "relative",
                        top: 5,
                        left: 20,
                        borderRadius: "50%",
                    }}
                />
            )}
        </Button>
    );
};

export default LoadingButton;
