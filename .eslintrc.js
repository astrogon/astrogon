module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  rules: {
    // Allow unused vars that start with underscore
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    // Allow any type occasionally 
    "@typescript-eslint/no-explicit-any": "warn",
    // Allow empty interfaces for extending
    "@typescript-eslint/no-empty-interface": "off",
  },
  overrides: [
    {
      files: ["*.astro"],
      extends: ["plugin:astro/recommended"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // Astro specific rules can go here
      },
    },
  ],
};
