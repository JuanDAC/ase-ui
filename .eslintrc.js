// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    "eslint-plugin-tsdoc"
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "tsdoc/syntax": "warn",
  },
  parserOptions: {
    project: "./tsconfig.json",
  }
};