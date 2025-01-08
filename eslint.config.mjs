import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'node_modules/',
      'dist/',
      '**/*.test.ts',
      'build/',
      'coverage',
      'Dockerfile',
      'Dockerfile.dev',
      'package-lock.json',
      'package.json',
      'tsconfig.json',
      'jest.config.ts',
      'prettierrc.json',
      '.env',
      '.dockerignore',
      'eslint.config.mjs',
    ],
    rules: {
      'no-multiple-empty-lines': [2, {max: 2}],
      semi: [2, 'always'],
      curly: 'warn',
      'prefer-template': 'warn',
      camelcase: 0,
      'no-return-assign': 0,
      quotes: ['warn', 'single'],
      indent: ['warn', 2],
      'no-unused-vars': ['warn'],
      eqeqeq: ['warn', 'always'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-unresolved': 0,
    },
  },
];
