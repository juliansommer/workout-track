/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  bracketSameLine: true,
  bracketSpacing: true,
  jsxSingleQuote: false,
  printWidth: 80,
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-organize-imports"],
};

export default config;
