import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import angular from "@angular-eslint/eslint-plugin"
import angularTemplate from "@angular-eslint/eslint-plugin-template"
import angularTemplateParser from "@angular-eslint/template-parser"

export default [
  // Base JS rules
  eslint.configs.recommended,

  // TypeScript rules (scopées aux .ts)
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["**/*.ts"],
  })),
  ...tseslint.configs.stylistic.map(config => ({
    ...config,
    files: ["**/*.ts"],
  })),

  {
    files: ["**/*.ts"],
    plugins: {
      "@angular-eslint": angular,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",

      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],
    },
  },

  // Angular HTML templates
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      "@angular-eslint/template": angularTemplate,
    },
    rules: {
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
    },
  },
  // {
  //   files: ["**/*.spec.ts"],
  //   plugins: {
  //     jasmine,
  //   },
  //   rules: {
  //     ...jasmine.configs.recommended.rules,
  //     "@typescript-eslint/no-explicit-any": "off",
  //     "@typescript-eslint/no-non-null-assertion": "off",
  //   },
  //   languageOptions: {
  //     globals: {
  //       jasmine: true, // évite les erreurs "describe is not defined"
  //     },
  //   },
  // }
]
