// Force CommonJS for Jest config
'use strict';

module.exports = {
  preset: 'ts-jest/presets/default',
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  
  // Module name mapper for path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@contracts/(.*)$': '<rootDir>/contracts/$1',
    '^\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^chai$': '<rootDir>/node_modules/chai/chai.js',
    '^(\\.{1,2}/.*)\\.js$': '$1', // Support for .js imports in TypeScript files
  },
  
  // Transform configuration
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { 
            targets: { node: 'current' },
            modules: 'commonjs',
            useBuiltIns: 'usage',
            corejs: 3,
          }],
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-transform-modules-commonjs',
        ],
      },
    ],
  },
  
  // Ignore node_modules except for specific packages that need to be transformed
  transformIgnorePatterns: [
    'node_modules/(?!(chai|@testing-library|@babel|@nomicfoundation|@nomiclabs|@openzeppelin|@truffle|ethers|hardhat|tslib|uuid)/)',
  ],
  
  // Test environment options
  testEnvironmentOptions: {
    url: 'http://localhost/',
    customExportConditions: ['node', 'node-addons'],
  },
  
  // Module resolution
  moduleDirectories: ['node_modules', 'src'],
  
  // Reset mocks between tests
  resetMocks: true,
  
  // Clear mock calls between tests
  clearMocks: true,
  
  // Reset modules between tests to avoid state leakage
  resetModules: true,
  
  // Coverage configuration
  collectCoverage: true,
  coverageProvider: 'v8',
  
  // Setup files
  setupFiles: ['<rootDir>/tests/setupTests.ts'],
  
  // Global setup and teardown
  // globalSetup: '<rootDir>/tests/globalSetup.ts',
  // globalTeardown: '<rootDir>/tests/globalTeardown.ts'
};
