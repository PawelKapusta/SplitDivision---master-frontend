const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });
const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jest-environment-jsdom",
    modulePathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/__tests__/mocks/",
    ],
};
module.exports = createJestConfig(customJestConfig);
