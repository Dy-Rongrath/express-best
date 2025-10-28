import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";

export default [
  // Base configuration for all files
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn", // Change to warn instead of error
      // Disable strict import ordering for now
      "import/order": "off"
    }
  },
  // TypeScript source files (with project config) - excluding tests
  {
    files: ["src/**/*.{ts,js}"],
    ignores: ["src/tests/**"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json"
      }
    }
  },
  // Config files (without strict project config)
  {
    files: ["*.config.{ts,js}", "vitest.config.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    }
  },
  // Test files (without project config since they're excluded from tsconfig)
  {
    files: ["src/tests/**/*.{ts,js}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off" // Allow any in tests
    }
  },
  // Ignore patterns
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "*.js",
      "!eslint.config.js",
      "!vitest.config.ts"
    ]
  }
];