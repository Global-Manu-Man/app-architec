module.exports = {
  root: true,
  extends: [
    'some-other-config-you-use',
    'prettier',
    '@react-native',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
