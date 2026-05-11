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
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@juspay/blend-design-system/node': path.resolve(
                __dirname,
                '../../packages/blend/lib/node.ts'
            ),
            '@juspay/blend-design-system/tokens': path.resolve(
                __dirname,
                '../../packages/token-engine/src/index.ts'
            ),
            '@juspay/blend-design-system': path.resolve(
                __dirname,
                '../../packages/blend/lib/main.ts'
            ),
        },
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
    optimizeDeps: {
        include: [
            '@juspay/blend-design-system',
            '@juspay/blend-design-system/node',
            '@juspay/blend-design-system/tokens',
        ],
    },
}))
