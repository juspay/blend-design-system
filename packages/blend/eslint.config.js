import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importX from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist', '.history', 'coverage'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'import-x': importX,
        },
        settings: {
            'import-x/resolver-next': [
                createTypeScriptImportResolver({
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                }),
            ],
            'import-x/extensions': ['.ts', '.tsx', '.js', '.jsx'],
            // Tell import-x which parser to use when it opens transitively
            // imported files from disk — without this it falls back to espree,
            // which cannot parse TypeScript syntax, so cycles go undetected.
            'import-x/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            // Guards against circular dependencies (including type-only cycles)
            // re-appearing in the library. See issue #1473.
            'import-x/no-cycle': [
                'error',
                { maxDepth: Infinity, ignoreExternal: true },
            ],
        },
    },
    {
        // The circular-dependency gate targets the shipped library only. Test
        // utilities and stories are excluded (consistent with the `madge`
        // `check:circular` exclusion), so cycles there do not block CI.
        files: ['**/__tests__/**', '**/*.{test,spec,stories}.{ts,tsx}'],
        rules: {
            'import-x/no-cycle': 'off',
        },
    },
    {
        files: [
            'lib/token-engine/**/*.{ts,tsx}',
            '__tests__/token-engine/**/*.{ts,tsx}',
        ],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    }
)
