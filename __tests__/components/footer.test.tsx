import { render } from "@testing-library/react";
import Footer from "@components/footer/index";
import { mockTheme } from "../mocks/theme";
import { ThemeProvider } from "styled-components";

describe("footer component", () => {
    it("renders correctly", () => {
        const { container } = render(
            <ThemeProvider theme={mockTheme}>
                <Footer />
            </ThemeProvider>,
        );
        expect(container).toMatchSnapshot();
    });
});
