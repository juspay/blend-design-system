import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
    plugins: [react(), libInjectCss(), dts({ include: ['lib'] })],
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'lib/main.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            external: (id) =>
                [
                    'react',
                    'react-dom',
                    'react/jsx-runtime',
                    'styled-components',
                ].some((pkg) => id === pkg || id.startsWith(`${pkg}/`)),
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: '[name].js',
            },
        },
    },
})
