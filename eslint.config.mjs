import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
export default tseslint.config(
	js.configs.recommended,
	reactPlugin.configs.flat.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			'ts-Plugin': tseslint.plugin,
			'plugin-React': reactPlugin,
		},
	},
	{
		rules: {
			'no-unused-vars': 'off',
			'no-console': 'warn',
			...prettier.rules,
			...reactPlugin.configs['jsx-runtime'].rules,
		},
	},
	{
		files: ['**/*.{ts,jsx,tsx}'],
	},
	{
		languageOptions: {
			globals: globals.browser,
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: { modules: true },
				ecmaVersion: 'latest',
				project: './tsconfig.json',
			},
		},
	},
	{
		ignores: ['node_modules', 'dist', 'prettier.config.js'],
	},
	{
		settings: { react: { version: '18.2.0' } },
	},
);
