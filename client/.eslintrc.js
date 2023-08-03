module.exports = {
  env: {
    "node": true,
    "browser": true,
    "mocha": true,
    "es6": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: [
    "@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-console': 'error',
    'semi': ['error', 'always'],
    'no-undef': ['error'],
  }
};
