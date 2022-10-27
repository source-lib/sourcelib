import config from "./jest.config";

export default {
    ...config,
    // Jest-bench need its own test environment to function
    "testEnvironment": "jest-bench/environment",
    "testEnvironmentOptions": {
        testEnvironment: "jest-environment-node"
    },
    // always include "default" reporter along with Jest-bench reporter
    // for error reporting
    "reporters": ["default", "jest-bench/reporter"],
    "testMatch": [
        "<rootDir>/src/**/*.bench.ts"
    ]
};