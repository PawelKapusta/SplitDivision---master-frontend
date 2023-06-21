import { render } from "@testing-library/react";
import Logo from "@components/logo/index";
import { mockTheme } from "../mocks/theme";
import { ThemeProvider } from "styled-components";

describe("logo component", () => {
    it("renders correctly", () => {
        const { container } = render(
            <ThemeProvider theme={mockTheme}>
                <Logo />
            </ThemeProvider>,
        );
        expect(container).toMatchSnapshot();
    });
});
