module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    "./.eslintrc-love-temp.js",
    "prettier",
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: "./tsconfig.json",
  },
  rules: {
  }
}
