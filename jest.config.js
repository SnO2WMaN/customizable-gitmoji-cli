module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleNameMapper: {
    '^~/(.+)': '<rootDir>/src/$1',
    '^~~/(.+)': '<rootDir>/$1'
  },
  coverageDirectory: './coverage/',
  collectCoverage: true
}
