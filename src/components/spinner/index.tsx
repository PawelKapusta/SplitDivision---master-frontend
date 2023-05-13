import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "./spinner.styles";

export const Spinner = (): JSX.Element => {
    return (
        <Container>
            <CircularProgress style={{ color: "#eaaf57" }} size={120} />
        </Container>
    );
};

export default Spinner;
