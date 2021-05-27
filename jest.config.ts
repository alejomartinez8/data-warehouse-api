import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    '.module.ts',
    'main.ts',
    'src/utils',
  ],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
};

export default config;
