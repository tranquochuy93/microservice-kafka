module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort', 'import'],
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
    'max-lines': [
      'error',
      {
          max: 400,
          skipComments: true
      }
    ],
    'max-lines-per-function': [
        'error',
        {
            max: 50,
            skipComments: true
        }
    ],
    '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'enumMember', format: ['UPPER_CASE'] },
        {
            selector: ['objectLiteralProperty'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE']
        },
        {
            selector: [
                'parameter',
                'variable',
                'function',
                'classProperty',
                'typeProperty',
                'parameterProperty',
                'classMethod',
                'objectLiteralMethod',
                'typeMethod'
            ],
            format: ['camelCase']
        },
        {
            selector: ['class', 'interface', 'enum'],
            format: ['PascalCase']
        },
        {
            selector: ['variable'],
            modifiers: ['exported'],
            format: ['PascalCase', 'camelCase', 'UPPER_CASE']
        },
        {
            selector: ['function'],
            modifiers: ['exported'],
            format: ['PascalCase', 'camelCase']
        }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    indent: 'off',
    'prettier/prettier': [
        'error',
        {
            useTabs: false,
            tabWidth: 4,
            printWidth: 120,
            singleQuote: true,
            trailingComma: 'none'
        }
    ],
    'prefer-const': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
        'warn',
        {
            // remove break line between groupings of imports
            groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']]
        }
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error'
  },
};
