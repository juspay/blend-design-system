import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './coverage',
            include: ['**/lib/components/**/*.tsx'],
            exclude: [
                'node_modules/',
                'dist/',
                '**/*.d.ts',
                '**/*.config.*',
                '**/mockData.ts',
                '**/*.stories.tsx',
                '**/lib/components/ButtonV2/**/accessibility/**',
            ],
            // Generate coverage even if tests fail
            reportOnFailure: true,
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './lib'),
        },
    },
})
