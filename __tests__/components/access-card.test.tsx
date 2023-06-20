import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import AccessCard from "@components/access-card/index";

const mockTheme = { palette: { gold: "gold" }, breakpoints: "lg" };
describe("access-card component", () => {
    it("renders correctly", () => {
        render(
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
    });
});
