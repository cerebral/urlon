module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2015,
  },
  rules: {
    'no-labels': 'off',
    'no-var': 'off',
    'no-void': 'off',
    'prettier/prettier': 'error',
  },
}
