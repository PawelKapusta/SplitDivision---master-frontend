import { render } from "@test";

import { Card } from "./index";
import { describe, expect, it } from "@jest/globals";

describe("Wrapper component testing with testing-library", () => {
    const component = render(
        <Card title="Title">
            <div>Card ---</div>
        </Card>,
    );

    it("renders without crashing", () => {
        expect(component).toBeTruthy();
    });
});
