import { FlatCompat } from "@eslint/eslintrc";
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      'no-unused-vars': 'warn',
      '@next/next/no-html-link-for-pages': 'off',
    },
    ignores: ['node_modules/**', '.next/**', 'dist/**']
  }
];
