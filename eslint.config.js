import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import tailwindcss from "tailwindcss";

export default tseslint.config(
  { ignores: ['dist'] },
  {
      overrideConfig: {
          linterOptions: {
              reportUnusedDisableDirectives: true,
          },
      },
    extends: [js.configs.recommended, ...tseslint.configs.recommended,'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:tailwindcss/recommended',],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
      parser: '@typescript-eslint/parser',
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
        'tailwindcss':tailwindcss ,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
