import { defineConfig, globalIgnores } from "eslint/config";
import react from "eslint-plugin-react";
import jest from "eslint-plugin-jest";
import babelParser from "@babel/eslint-parser";

export default defineConfig([
  globalIgnores([
    "**/venv",
    "public/",
    ".cache/"
  ]),
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      react,
    },
    extends: [
      react.configs.flat.recommended,
    ],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          "jsx": true,
        }
      },
      ecmaVersion: "latest",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    }
  },
  // Additional config for test files to define Jest globals, etc.
  {
    files: ["**/tests/**/*.js", "**/*.test.js"],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
        // other browser related globals we need to passover
        module: "readonly",
        require: "readonly",
        global: "readonly",
        console: "readonly",
        document: "readonly",
      },
    },
  },
  // Additional config for Node/CommonJS configuration files (Gatsby, Jest, etc.)
  {
    files: [
      "gatsby-config.js",
      "gatsby-node.js",
      "jest.config.js",
      "lib/utils.js",
      "plugins/**/*.js"
    ],
    languageOptions: {
      // Set the source type to "script" since these files use CommonJS
      parserOptions: {
        sourceType: "script",
      },
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        exports: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        }
      ],
      "no-undef": "warn",
    }
  },
]);
