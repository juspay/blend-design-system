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
    },
    {
        // Tree-shaking guard for the message catalog, and load-bearing rather
        // than stylistic: `lib/i18n/catalog/index.ts` spreads every fragment,
        // so one component importing it makes all ~500 strings reachable from
        // that chunk and the per-component saving disappears entirely. The
        // `lib/i18n` barrel reaches the aggregate the same way, via
        // `createTranslator`.
        //
        // Components import their own fragment and `lib/i18n/useMessages` by
        // concrete path — the same advice `scripts/check-circular.mjs` gives
        // for cycles.
        //
        // Note these are errors, not warnings: this package's `lint` script is
        // a bare `eslint .` with no `--max-warnings`, so a warning would not
        // fail CI.
        files: ['lib/components/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            // `regex`, not `group`: a `group` pattern is
                            // gitignore-style, so `**/i18n` would also capture
                            // the leaf modules a component legitimately needs
                            // (`i18n/useMessages`, `i18n/resolve`,
                            // `i18n/catalog/<family>.messages`), and `!`
                            // negation does not un-restrict in this rule.
                            // Anchoring on `$` blocks the barrel and the
                            // aggregate while leaving their children allowed.
                            regex: '(^|/)i18n(/index)?$|(^|/)i18n/catalog(/index)?$',
                            message:
                                'Import the specific fragment (lib/i18n/catalog/<family>.messages) and lib/i18n/useMessages by concrete path. The i18n barrel and the aggregate catalog pull every message fragment into this chunk.',
                        },
                    ],
                },
            ],
        },
    },
    {
        // Import-direction guard. `lib/i18n/` is a leaf subtree:
        // `ThemeProvider` imports `I18nContext`, never the reverse. The one
        // permitted edge back into `lib/context/` is the zero-import leaf
        // `mergeTokenTree`, which `createTranslator` reuses for its
        // skip-explicit-`undefined` merge semantics.
        //
        // Keeping the subtree free of UI and of `lib/hooks/` (which itself
        // imports `lib/context/ShadowAware`) is also what lets `format/*` ship
        // through the React-free `./node` entry to `@juspay/blend-native`.
        files: ['lib/i18n/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            // Enumerated rather than a directory-wide
                            // `**/context`, because these are gitignore-style
                            // patterns: a directory pattern would also capture
                            // `./context/mergeTokenTree`, the one import this
                            // subtree is allowed, and `!` negation does not
                            // un-restrict in this rule.
                            //
                            // A bare `../context` barrel import is not listed
                            // because it is a genuine cycle
                            // (context/index -> ThemeProvider -> I18nContext)
                            // and `import-x/no-cycle` above already fails it.
                            group: [
                                '**/context/index',
                                '**/context/ThemeContext',
                                '**/context/ThemeProvider',
                                '**/context/initComponentTokens',
                                '**/context/useComponentToken',
                                '**/context/ShadowAware',
                            ],
                            message:
                                'lib/i18n/ must not import lib/context/ except the zero-import leaf ./context/mergeTokenTree — anything else turns the ThemeProvider -> I18nContext edge into a cycle.',
                        },
                        {
                            group: ['**/components/**', '**/hooks/**'],
                            message:
                                'lib/i18n/ must stay free of UI code and of lib/hooks, so format/* remains usable from the React-free ./node entry.',
                        },
                    ],
                },
            ],
        },
    }
)
