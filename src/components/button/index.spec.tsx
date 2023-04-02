import { fireEvent, render } from "@test";

import { Button } from "./index";
import { describe, expect, it } from "@jest/globals";

describe("Button component testing with testing-library", () => {
    it("renders without crashing", () => {
        const component = render(<Button onClick={() => undefined} />);

        expect(component).toBeTruthy();
    });

    it("button is clickable", () => {
        const mockFn = jest.fn();
        const { getByTestId } = render(<Button onClick={mockFn} />);

        const btn = getByTestId("btn");
        fireEvent.click(btn);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
