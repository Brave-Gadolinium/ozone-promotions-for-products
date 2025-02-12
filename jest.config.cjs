module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'text'],
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
};