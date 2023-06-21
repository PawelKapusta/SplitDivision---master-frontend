import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Alert from "@components/alert/index";
import { mockTheme } from "../mocks/theme";

describe("alert component", () => {
    it("renders correctly", () => {
        const { container } = render(
            <ThemeProvider theme={mockTheme}>
                <Alert message="Test alert message" type="success" />
            </ThemeProvider>,
        );
        expect(screen.getByText("Test alert message")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
