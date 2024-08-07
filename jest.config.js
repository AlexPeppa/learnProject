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
  jest: { transformIgnorePatterns: ["node_modules/(?!axios)"] },
};
