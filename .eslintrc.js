module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-unresolved': 'off',
    'no-var': 2,
    'prefer-const': 2,
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    // TODO: check disabled rules
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'import/no-cycle': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'array-callback-return': 0,
    'global-require': 0,
    'no-restricted-globals': 0,
    'vue/no-template-shadow': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'prefer-destructuring': 0,
    'consistent-return': 0,
    'no-return-assign': 0,
    'default-case': 0,
    'no-unused-vars': 0,
    'vue/require-v-for-key': 0,
    camelcase: 0,
    radix: 0,
    'no-alert': 0,
    'no-shadow': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
