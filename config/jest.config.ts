export default {
    "transform": {
        ".ts": "ts-jest"
    },
    "testEnvironment": "node",
    "testMatch": [
        "<rootDir>/src/**/*.test.ts"
    ],
    "moduleFileExtensions": [
        "ts",
        "js"
    ],
    "modulePathIgnorePatterns": [
        "<rootDir>/lib"
    ],
    "globals": {
        "ts-jest": {
            "isolatedModules": true
        }
    }
};
