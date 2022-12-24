/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  // transform: {
  //   '^.+\\.(t|j)sx?$': ['@swc/jest'],
  // },
  testEnvironment: 'node',
  collectCoverageFrom: ['src/*.ts'],
  collectCoverage: true,
};
