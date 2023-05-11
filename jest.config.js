export default {
    testEnvironment: "jsdom",
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spect|test|tests).([tj]s?(x))',
    ],
    setupFilesAfterEnv: ['<rootDir/jest.setup.js>'],
}