import { render } from "@testing-library/react";
import LoadingButton from "@components/loading-button/index";
import { mockTheme } from "../mocks/theme";
import { ThemeProvider } from "styled-components";

describe("loading-button component", () => {
    it("renders correctly", () => {
        const { container } = render(
            <ThemeProvider theme={mockTheme}>
                <LoadingButton
                    disabled={false}
                    loading={false}
                    variety="CreateGroup"
                >
                    <div>Buttton</div>
                </LoadingButton>
            </ThemeProvider>,
        );
        expect(container).toMatchSnapshot();
    });
});
