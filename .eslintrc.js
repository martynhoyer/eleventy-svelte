module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "prettier",
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "import/no-unresolved": 0,
    "no-console": [
      "error",
      {
        allow: ["warn"]
      }
    ]
  },
};

