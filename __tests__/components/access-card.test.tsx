import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import AccessCard from "@components/access-card/index";
import { mockTheme } from "../mocks/theme";

describe("access-card component", () => {
    it("renders correctly", () => {
        const { container } = render(
            <ThemeProvider theme={mockTheme}>
                <AccessCard imageSrc={"/path/image.png"}>
                    <div>Children</div>
                </AccessCard>
            </ThemeProvider>,
        );
        const image = screen.getByAltText("/path/image.png image");
        const children = screen.getByText("Children");
        expect(image).toBeInTheDocument();
        expect(children).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
