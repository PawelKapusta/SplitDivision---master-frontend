import { render } from "@testing-library/react";
import Modal from "@components/modal/index";
import { mockTheme } from "../mocks/theme";
import { ThemeProvider } from "styled-components";

describe("modal component", () => {
    it("renders correctly", () => {
        const { container } = render(
            <ThemeProvider theme={mockTheme}>
                <Modal
                    isOpen={false}
                    onClose={() => {
                        return true;
                    }}
                >
                    <div>Children</div>
                </Modal>
            </ThemeProvider>,
        );
        expect(container).toMatchSnapshot();
    });
});
