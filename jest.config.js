module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // collectCoverageFrom: ['**/*.(t|j)s'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
};
