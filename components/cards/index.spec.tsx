import { render } from "@test";

import { Cards } from "./index";

describe("Cards component testing with testing-library", () => {
    it("renders without crashing", () => {
        const component = render(<Cards />);

        expect(component).toBeTruthy();
    });
});
