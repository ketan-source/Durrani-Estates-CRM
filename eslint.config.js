// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'
// import { defineConfig, globalIgnores } from 'eslint/config'

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs['recommended-latest'],
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//   },
// ])

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"], // 🔥 IMPORTANT FIX

    plugins: {
      react,
      "react-hooks": reactHooks
    },

    rules: {
      // =========================
      // ✅ VARIABLE ≤ 15
      // =========================
      "@typescript-eslint/naming-convention": [
        "error",

        {
          selector: "variableLike",
          format: ["camelCase"],
          custom: {
            regex: "^[a-z][a-zA-Z0-9]{0,14}$",
            match: true
          }
        },

        // =========================
        // ✅ FUNCTION ≤ 10
        // =========================
        {
          selector: "function",
          format: ["camelCase"],
          custom: {
            regex: "^[a-z][a-zA-Z0-9]{0,9}$",
            match: true
          }
        }
      ],

      // =========================
      // ✅ BACKUP LENGTH CHECK
      // =========================
      "id-length": ["error", { max: 15 }],

      // =========================
      // ✅ UNDEFINED FUNCTION
      // =========================
      "no-undef": "error",

      // =========================
      // ✅ FUNCTION SIZE
      // =========================
      "max-lines-per-function": ["error", 40]
    }
  }
];