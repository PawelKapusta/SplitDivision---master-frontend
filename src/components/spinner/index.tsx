import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "./spinner.styles";

export type TSpinnerProps = {
    isSmall?: boolean;
};
export const Spinner = ({ isSmall = false }: TSpinnerProps): JSX.Element => {
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
