import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "./spinner.styles";
import { ReactElement } from "react";

export type TSpinnerProps = {
    isSmall?: boolean;
};
export const Spinner = ({ isSmall = false }: TSpinnerProps): ReactElement => {
    return (
        <Container isSmall>
            <CircularProgress
                style={{ color: "#eaaf57" }}
                size={isSmall ? 60 : 120}
            />
        </Container>
    );
};

export default Spinner;
