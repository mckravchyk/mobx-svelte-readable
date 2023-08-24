/* eslint-disable @typescript-eslint/no-var-requires */

const typeAwareLinting = require('eslint-config-mckravchyk/type_aware_linting');

module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'mckravchyk/base',
  ],
  overrides: [
    typeAwareLinting({
      ecmaVersion: 11,
      sourceType: 'module',
      __dirname,
      project: ['./tsconfig.json'],
    }),
  ],
};
