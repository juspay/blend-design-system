import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import importX from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

export default tseslint.config(
    // `lib` is builder-bob's generated output — linting it reports on code
    // nobody wrote and that is not committed.
    { ignores: ['dist', 'lib', 'node_modules'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            // No browser globals — this package targets React Native.
            // RN globals (Platform, process) are provided by the consumer's
            // metro/babel toolchain at runtime; we don't declare them here
            // to avoid accidental web-DOM usage.
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
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
            'import-x/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'import-x/no-cycle': [
                'error',
                { maxDepth: Infinity, ignoreExternal: true },
            ],
        },
    }
)
