// @ts-check

import tseslint from "typescript-eslint"
import nextPlugin from "@next/eslint-plugin-next"
import prettierConfig from "eslint-config-prettier"
// @ts-expect-error
import importPlugin from 'eslint-plugin-import'
import unusedImportsPlugin from "eslint-plugin-unused-imports"
import reactPlugin from "eslint-plugin-react"
import hooksPlugin from "eslint-plugin-react-hooks"
import eslint from "@eslint/js"
import { fixupPluginRules } from "@eslint/compat"
import globals from "globals"


export default tseslint.config(
  {
    name: "ignore",
    ignores: [".next/", "build/", ".*", "*.config.{js,mjs}"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    name: "typescript",
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/consistent-type-exports": "warn",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-indexed-object-style": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
        }
      ],
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": false,
          "ts-nocheck": false,
          "ts-check": false,
        }
      ],
    },
  },
  {
    name: "disableTypeChecked",
    files: ["src/**/*.js", "src/**/*.jsx"],
    // @ts-ignore
    rules: {
      ...tseslint.configs.disableTypeChecked,
    },
  },
  {
    name: "react",
    files: ['**/*.tsx'],
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat["jsx-runtime"],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    name: "react-hooks",
    files: ["**/*.tsx"],
    plugins: {
      // @ts-expect-error
      "react-hooks": fixupPluginRules(hooksPlugin),
      // @ts-expect-error
      "@next/next": fixupPluginRules(nextPlugin),
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      "react/button-has-type": "warn",
      "react/checked-requires-onchange-or-readonly": "warn",
      "react/jsx-key": "error",
      "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
      "react/jsx-no-leaked-render": "error",
      "react/jsx-no-target-blank": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/self-closing-comp": "warn",
    },
  },
  {
    name: "next",
    plugins: {
      // @ts-expect-error
      "@next/next": fixupPluginRules(nextPlugin),
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    name: "import",
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
        },
      ],
      "unused-imports/no-unused-imports": "warn",
    },
  },
  {
    name: "prettier",
    rules: {
      ...prettierConfig.rules,
    },
  },
)
