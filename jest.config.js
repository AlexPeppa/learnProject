module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!axios|msw)/'],
  moduleNameMapper: {
    axios: require.resolve('axios'),
    uuid: require.resolve('uuid'),
    '^@store(.*)$': '<rootDir>/src/store$1',
    '^@rickMorty(.*)$': '<rootDir>/src/store/rickMorty$1',
    '^@utils(.*)$': '<rootDir>/src/containers/utils$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/imgMok.ts',
  },
};
