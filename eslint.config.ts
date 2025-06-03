import { FlatCompat } from "@eslint/eslintrc"
import eslint from "@eslint/js"
import perfectionist from "eslint-plugin-perfectionist"
import tseslint from "typescript-eslint"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default tseslint.config(
  {
    ignores: [".next"],
  },
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    plugins: {
      perfectionist,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        { format: ["camelCase", "PascalCase"], selector: "variable" },
        { format: ["camelCase", "PascalCase"], selector: "function" },
        { format: ["PascalCase"], selector: "interface" },
        { format: ["PascalCase"], selector: "typeAlias" },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/require-await": "off",
      "no-console": "warn",
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            ["type-import", "value-builtin", "value-external"],
            ["type-internal", "value-internal"],
            [
              "type-parent",
              "type-sibling",
              "type-index",
              "value-parent",
              "value-sibling",
              "value-index",
              "ts-equals-import",
              "unknown",
            ],
          ],
          internalPattern: ["^@/"],
        },
      ],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)
