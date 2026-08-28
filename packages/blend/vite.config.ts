import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
    // Relative asset base so URLs referenced from JS (e.g. the Monaco worker
    // chunks in monacoEnvironment) resolve relative to the module via
    // import.meta.url, and work wherever a consumer serves the package assets.
    // Only affects asset URLs (workers, CSS url()), not ES import specifiers.
    base: './',
    plugins: [
        react(),
        dts({
            include: ['lib'],
            entryRoot: resolve(__dirname, 'lib'),
            outDir: resolve(__dirname, 'dist'),
            insertTypesEntry: true,
        }),
    ],
    resolve: {
        alias: [
            {
                find: '@blend-design/token-engine/server',
                replacement: resolve(
                    __dirname,
                    '../token-engine/src/server.ts'
                ),
            },
            {
                find: '@blend-design/token-engine',
                replacement: resolve(__dirname, '../token-engine/src/index.ts'),
            },
            {
                find: '@juspay/blend-design-system/node',
                replacement: resolve(__dirname, 'lib/node.ts'),
            },
            {
                find: '@juspay/blend-design-system',
                replacement: resolve(__dirname, 'lib/main.ts'),
            },
        ],
    },
    // Emit Monaco's language workers (referenced via `new Worker(new URL(...,
    // import.meta.url), { type: 'module' })` in monacoEnvironment) as ES-module
    // worker chunks, so their URLs resolve relative to the module in consumers.
    worker: {
        format: 'es',
    },
    experimental: {
        // Force an explicit `./` on JS-referenced asset URLs (only the Monaco
        // worker chunks — the sole `new URL(..., import.meta.url)` refs in the
        // library). Without it Vite emits `new URL("assets/x", import.meta.url)`;
        // webpack-5 consumers that re-bundle this ESM (e.g. Next.js
        // transpilePackages) treat a bare `assets/x` as a module request and
        // fail to resolve it. CSS url() (hostType 'css') is left untouched.
        renderBuiltUrl(filename, { hostType }) {
            if (hostType === 'js') return './' + filename
            return { relative: true }
        },
    },
    build: {
        copyPublicDir: false,
        lib: {
            entry: {
                main: resolve(__dirname, 'lib/main.ts'),
                node: resolve(__dirname, 'lib/node.ts'),
                // IMPORTANT: this entry must NOT be named `tokens` — that would
                // emit `dist/tokens.js` / `dist/tokens.d.ts` next to the
                // `dist/tokens/` directory (built from `lib/tokens/`), and in
                // TypeScript module resolution a file always beats a directory.
                // The root's relative `./tokens` re-exports (FOUNDATION_THEME
                // etc.) would then resolve to the token-engine stub instead of
                // `dist/tokens/index.d.ts`, silently typing them as `any` for
                // every consumer. See issue #1556; scripts/check-dist.mjs
                // guards this class of collision post-build.
                'token-engine': resolve(__dirname, 'lib/token-engine.ts'),
                'tokens-server': resolve(
                    __dirname,
                    'lib/token-engine-server.ts'
                ),
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', 'react-dom/server'],
            output: {
                assetFileNames: (assetInfo) => {
                    // Publish a stable path for the library stylesheet:
                    // `@juspay/blend-design-system/style.css` -> `dist/style.css`
                    if (assetInfo.name?.endsWith('.css')) return 'style.css'
                    return 'assets/[name][extname]'
                },
                entryFileNames: '[name].js',
            },
        },
    },
})
