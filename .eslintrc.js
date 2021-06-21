module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  extends: ["plugin:prettier/recommended"],
  rules: {
    // 不符prettier的地标出警告
    "prettier/prettier": "warn",
  },
};
