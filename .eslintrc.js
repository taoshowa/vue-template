module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // https://eslint.vuejs.org/rules/
  // https://standardjs.com/
  extends: ['plugin:vue/essential', '@vue/standard'],
  // 'off' === 0, 'warn' === 1, 'error' === 2
  rules: {
    'no-console': process.env.NODE_ENV !== 'production' ? 0 : 2,
    'no-debugger': process.env.NODE_ENV !== 'production' ? 0 : 2
  },
  // false === readonly, true === writable
  globals: {
    document: false,
    navigator: false,
    window: false
  }
}
