import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig(({ mode }) => ({
    plugins: [
        TanStackRouterVite({
            routesDirectory: './src/routes',
            generatedRouteTree: './src/routeTree.gen.ts',
        }),
        react(),
    ],
    resolve: {
        alias: [
            {
                find: /^@juspay\/blend-design-system\/deprecated\/(.+)$/,
                replacement: path.resolve(
                    __dirname,
                    '../../packages/blend/lib/deprecated/$1/index.ts'
                ),
            },
            { find: '@', replacement: path.resolve(__dirname, './src') },
            {
                find: '@juspay/blend-design-system/node',
                replacement: path.resolve(
                    __dirname,
                    '../../packages/blend/lib/node.ts'
                ),
            },
            {
                find: '@juspay/blend-design-system/tokens',
                replacement: path.resolve(
                    __dirname,
                    '../../packages/token-engine/src/index.ts'
                ),
            },
            {
                find: '@juspay/blend-design-system',
                replacement: path.resolve(
                    __dirname,
                    '../../packages/blend/lib/main.ts'
                ),
            },
        ],
    },
    base: mode === 'production' ? '/studio/' : '/',
    server: {
        port: 3000,
        proxy: {
            // Proxy API requests to a backend or serverless function
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: process.env.NODE_ENV !== 'production',
        minify: 'esbuild',
    },
}))
