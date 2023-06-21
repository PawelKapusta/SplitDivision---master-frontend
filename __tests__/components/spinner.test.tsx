import { render } from "@testing-library/react";
import Spinner from "@components/spinner/index";
import { mockTheme } from "../mocks/theme";
import { ThemeProvider } from "styled-components";

describe("spinner component", () => {
    it("renders correctly", () => {
        const { container } = render(
            <ThemeProvider theme={mockTheme}>
                <Spinner />
            </ThemeProvider>,
        );
        expect(container).toMatchSnapshot();
    });
});
