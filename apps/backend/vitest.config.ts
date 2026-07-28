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
        setupFiles: ['./src/test/setup.ts'],
        include: ['src/**/*.test.ts'],
        exclude: ['src/**/*.integration.test.ts'],
        clearMocks: true,
        restoreMocks: true,
        mockReset: true,
        testTimeout: 15000,
        hookTimeout: 15000,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            reportsDirectory: './coverage/unit-api',
            include: [
                'src/domains/shared/approval-policy.service.ts',
                'src/domains/mergerequests/entry-points/merge-request.routes.ts',
                'src/domains/branches/entry-points/publish-request.routes.ts',
            ],
            exclude: ['src/**/*.test.ts', 'src/**/*.d.ts'],
            thresholds: {
                lines: 90,
                functions: 90,
                branches: 85,
                statements: 90,
            },
        },
    },
})
