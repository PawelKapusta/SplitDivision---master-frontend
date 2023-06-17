module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    transform: { "^.+\\.(js|jsx|ts|tsx)$": "babel-jest" },
    moduleNameMapper: { "\\.(css|less|scss)$": "identity-obj-proxy" },
};
