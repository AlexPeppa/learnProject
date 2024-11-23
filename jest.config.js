module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  transformIgnorePatterns: ['node_modules/(?!axios)'],
  moduleNameMapper: {
    axios: require.resolve('axios'),
    '^@store(.*)$': '<rootDir>/src/store$1',
    '^@rickMorty(.*)$': '<rootDir>/src/store/rickMorty$1',
    '^@utils(.*)$': '<rootDir>/src/containers/utils$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/imgMok.ts',
  },
};
