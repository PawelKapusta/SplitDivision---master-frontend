import { render } from "@testing-library/react";
import Card from "@components/card-content/index";
import { mockTheme } from "../mocks/theme";
import { ThemeProvider } from "styled-components";

describe("card-content component", () => {
    it("renders correctly", () => {
        const { container } = render(
            <ThemeProvider theme={mockTheme}>
                <Card src="/path/image.png" text="Text" />
            </ThemeProvider>,
        );
        expect(container).toMatchSnapshot();
    });
});
