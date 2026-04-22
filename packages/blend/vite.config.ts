import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
    // NOTE: Do not inject CSS into JS. This package exposes `./style.css` for consumers,
    // and keeping the JS entry CSS-free makes it safe to import in Node (e.g. CLI/token-engine).
    plugins: [react(), dts({ include: ['lib'] })],
    build: {
        copyPublicDir: false,
        lib: {
            entry: {
                main: resolve(__dirname, 'lib/main.ts'),
                node: resolve(__dirname, 'lib/node.ts'),
                tokens: resolve(__dirname, 'lib/token-engine.ts'),
                'tokens-server': resolve(__dirname, 'lib/token-engine-server.ts'),
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
