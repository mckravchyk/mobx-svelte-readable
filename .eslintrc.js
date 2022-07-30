module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    //
    // Miscellaneous
    //

    // Functions are hoisted - the order of definition does not matter.
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],

    // 'no-param-reassign' cannot enforce immutability (e.g. array.push) while blocking legitimate
    // uses like modifying a string that has been passed as the parameter.
    'no-param-reassign': 'off',

    //
    // Style
    //

    'no-unused-expressions': ['error', { allowTernary: true }],

    'no-mixed-operators': 'off',

    'prefer-destructuring': 'off',

    'brace-style': ['error', 'stroustrup'],

    curly: ['error', 'all'],

    //
    // TypeScript
    //

    // This is required for function type definitions.
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    '@typescript-eslint/no-non-null-assertion': 'off',

    //
    // Imports
    //

    'import/prefer-default-export': 'off',

    'import/no-default-export': 'error',

    // TypeScript will resolve the imports so there's no need for Eslint to check it. Additionally,
    // Eslint will not work with absolute paths (or it would have to be additionally configured).
    'import/no-unresolved': 'off',

    // This is another rule that does not work well with absolute  paths (probably because Eslint
    // is not configured to resolve them). This rule only takes effect for .js/.ts files. TypeScript
    // will enforce that .ts files should not end with an extension, so this rule is also not
    // required.
    'import/extensions': 'off',

    //
    // Loops
    //

    'no-await-in-loop': 'off',

    'no-continue': 'off',

    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      // {
      //   selector: 'ForOfStatement',
      //   message: '',
      // },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
    'import/core-modules': ['typescript'],
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        // This rule is not compatible with defining variables in the globals.d.ts and is redundant
        // in TypeScript files, as TypeScript will detect undefined variables by itself.
        'no-undef': 'off',
      },
    },

    // Type aware linting.
    {
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-floating-promises': ['error'],
      },
      // extends: [
      //   'plugin:@typescript-eslint/recommended-requiring-type-checking',
      // ],
    },
    {
      files: [
        'src/**/*.test.ts',
      ],
      env: {
        // now **/*.test.js files' env has both es6 *and* jest
        jest: true,
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
  ],
};
