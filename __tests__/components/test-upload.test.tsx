import { render } from "@testing-library/react";
import FileUpl from "@components/file-upload/index";
import { mockTheme } from "../mocks/theme";
import { ThemeProvider } from "styled-components";

describe("file-upload component", () => {
    it("rednerds correctly", () => {
        const { container } = render(
            <ThemeProvider theme={mockTheme}>
                <FileUpl />
            </ThemeProvider>,
        );
        expect(container).toMatchSnapshot();
    });
});
