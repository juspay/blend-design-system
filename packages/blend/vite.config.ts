import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
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
    build: {
        copyPublicDir: false,
        lib: {
            entry: {
                main: resolve(__dirname, 'lib/main.ts'),
                node: resolve(__dirname, 'lib/node.ts'),
                tokens: resolve(__dirname, 'lib/token-engine.ts'),
                'tokens-server': resolve(
                    __dirname,
                    'lib/token-engine-server.ts'
                ),
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime'],
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
