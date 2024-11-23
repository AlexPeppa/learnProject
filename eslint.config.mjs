import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import airbnb from 'eslint-config-airbnb';
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import jest from 'eslint-plugin-jest';

const compat = new FlatCompat();
export default tseslint.config(
  ...tseslint.configs.recommended,
  ...fixupConfigRules(compat.extends(...airbnb.extends)),

  {
    plugins: {
      'ts-Plugin': tseslint.plugin,
    },
  },
  {
    rules: {
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'error',
      'no-param-reassign': 'off',
      'no-unused-vars': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-shadow': [
        'error',
        { ignoreFunctionTypeParameterNameValueShadow: true },
      ],
      'import/no-extraneous-dependencies': ['error', { peerDependencies: true }],
      'import/no-import-module-exports': ['error', { exceptions: ['**/*/*.ts'] }],
      'import/extensions': ['error', 'never'],
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
      ...prettier.rules,
    },
  },
  {
    files: ['**/*.{ts,jsx,tsx}'],
    ...jest.configs['flat/recommended'],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: { modules: true },
        ecmaVersion: 'latest',
        projectService: true,
      },
    },
  },
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    settings: {
      react: { version: '18.2.0' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
);
