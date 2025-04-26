import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import typescript from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  // Backend (server)
  {
    files: ["./server/**/*.{js,ts}"],
    ignores: ["node_modules/"],
    plugins: {
      prettier,
      "@typescript-eslint": typescript,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser,
    },
    rules: {
      "prettier/prettier": "error", // Enforce Prettier formatting
      "@typescript-eslint/no-unused-vars": "warn",
      "semi": ["error", "always"],
    },
  },
  // Frontend
  {
    files: ["./frontend/**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules/"],
    plugins: {
      prettier,
      react,
      "jsx-a11y": jsxA11y,
      "@typescript-eslint": typescript,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "prettier/prettier": "error", // Enforce Prettier formatting
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/anchor-is-valid": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
