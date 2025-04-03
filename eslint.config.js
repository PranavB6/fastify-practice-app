import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginImportX from 'eslint-plugin-import-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // 🔹 Ignore files
  {
    ignores: [],
  },

  // 🌍 Global Configuration - Applies to JavaScript & TypeScript Files
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node, // Use Node.js global variables
    },
  },

  // 📜 JavaScript Rules (Core ESLint)
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },

  // 🔷 TypeScript Rules (typescript-eslint)
  tseslint.configs.recommended, // Standard TypeScript best practices
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // Ignore arguments starting with an underscore
          varsIgnorePattern: '^_', // Ignore variables starting with an underscore
        },
      ],
    },
  },

  // 📦 Import Plugin Rules (eslint-plugin-import-x)
  eslintPluginImportX.flatConfigs.recommended, // Recommended rules for JavaScript
  eslintPluginImportX.flatConfigs.typescript, // TypeScript-specific rules
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // ✅ Turn on errors for missing imports
      'import-x/no-unresolved': 'error',

      // ✅ Enforce a consistent import order
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin', // Built-in imports (come from NodeJS native) go first
            'external', // <- External imports
            'internal', // <- Absolute imports
            ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
            'index', // <- index imports
            'unknown', // <- unknown
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc', // Sort in ascending order. Options: ["ignore", "asc", "desc"]
            caseInsensitive: true, // Ignore case when sorting
          },
        },
      ],
    },
  },

  // 🎯 Special Rules for ESLint Config File (eslint.config.js)
  {
    files: ['eslint.config.js'],
    rules: {
      'import-x/no-named-as-default-member': 'off', // Disable named export errors
    },
  },

  // 🎨 Prettier Rules (Disables conflicting ESLint formatting rules)
  eslintConfigPrettier,
]);
