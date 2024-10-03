module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
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
	},
};
