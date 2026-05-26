import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    test: {
        environment: 'node',
        globals: false,
        setupFiles: ['./src/test/setup.integration.ts'],
        include: ['src/**/*.integration.test.ts', 'src/test/e2e/**/*.test.ts'],
        fileParallelism: false,
        clearMocks: true,
        restoreMocks: true,
        mockReset: true,
        testTimeout: 30000,
        hookTimeout: 30000,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            reportsDirectory: './coverage/integration-e2e',
        },
    },
})
