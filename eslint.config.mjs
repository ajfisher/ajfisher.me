import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended", "plugin:react/recommended"), {
  languageOptions: {
    parser: babelParser,
    parserOptions: {
      requireConfigFile: false,
    }
  },

  // use this for defining new rules
  rules: {
    strict: 0,
    // call error on any unused vars but then allow _var for ignore
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
      }
    ],
  },
}];
