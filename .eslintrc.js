module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { 'ignoreRestSiblings': true, 'argsIgnorePattern': "^_" }],
    'curly': 'error',
    'no-plusplus': ['warn', { 'allowForLoopAfterthoughts': true }],
    'no-magic-numbers': 'off',
    // '@typescript-eslint/no-magic-numbers': ['warn', {
    //   'ignore': [-1, 0, 1],
    //   'ignoreArrayIndexes': true,
    //   'ignoreEnums': true,
    //   'ignoreReadonlyClassProperties': true,
    //   'ignoreNumericLiteralTypes': true
    // }],
    // 'import/no-duplicates': 'error',
    'max-len': ['warn', { 'code': 120, 'tabWidth': 2 }],
    'max-params': ['warn', 7],
    'max-lines': ["error", { 'max': 750, 'skipComments': true, 'skipBlankLines': false }],
  },
};
