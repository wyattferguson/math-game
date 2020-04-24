module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'prettier',
    'prettier/babel',
    'prettier/vue',
  ],
  plugins: ['vue'],
  rules: {},
};
