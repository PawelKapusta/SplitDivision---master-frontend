import React from "react";
import { render } from "@testing-library/react";
import FAQ from "@components/faq-table/index";
import { mockTheme } from "../mocks/theme";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({ useSelector: jest.fn() }));
describe("faq-table component", () => {
    beforeEach(() => {
        (useSelector as jest.Mock).mockReturnValue({
            faqs: [
                { id: 1, question: "Q1", answer: "A1" },
                {
                    id: 2,
                    question: "Q2",
                    answer: "A2",
                },
            ],
        });
    });
    it("renders correctly", () => {
        const { container } = render(
            <ThemeProvider theme={mockTheme}>
                <FAQ />
            </ThemeProvider>,
        );
        expect(container).toMatchSnapshot();
    });
});
