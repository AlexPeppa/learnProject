module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    axios: require.resolve("axios"),
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  devDependencies: {
    "@types/axios": "^0.14.0",
    jest: "^27.5.1",
  },
  jest: { transformIgnorePatterns: ["node_modules/(?!axios)"] },
};
