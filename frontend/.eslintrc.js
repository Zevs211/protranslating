module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-trailing-spaces': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'no-new': 0,
  },
};
