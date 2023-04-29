import "isomorphic-unfetch";
import * as nock from "nock";
import * as dotenv from "dotenv";

import axios from "axios";

dotenv.config({ path: ".env.local.test" });

afterAll(() => {
    nock.cleanAll();
    nock.restore();
});

window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
});

window.scroll = jest.fn();
window.alert = jest.fn();
