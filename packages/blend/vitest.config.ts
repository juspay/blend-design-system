import { defaultExclude, defineConfig } from 'vitest/config'
import { resolve } from 'path'

const PERFORMANCE_TESTS = '**/*.performance.test.tsx'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
        css: true,
        // Local machines are just as starved as CI once the full suite is
        // running; a single budget avoids "passes alone, times out in suite".
        testTimeout: 15000,
        hookTimeout: 10000,
        // Default is (cores - 1) workers. That many concurrent jsdom
        // environments starve each other and turn waitFor polls into timeouts.
        // Cap locally; CI (typically 2-core runners) keeps vitest's default.
        ...(process.env.CI ? {} : { maxWorkers: 6 }),
        pool: 'threads',
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    exclude: [...defaultExclude, PERFORMANCE_TESTS],
                },
            },
            {
                extends: true,
                test: {
                    name: 'performance',
                    include: [PERFORMANCE_TESTS],
                    // Wall-clock assertions: run after every other project,
                    // one file at a time, in a single worker.
                    sequence: { groupOrder: 1 },
                    poolOptions: { threads: { singleThread: true } },
                },
            },
        ],
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
                '**/lib/components/**/index.ts',
                '**/*.dark.tokens.ts',
            ],
            // Generate coverage even if tests fail
            reportOnFailure: true,
            // Issue #1886: enforce the measured status quo as a floor so
            // CI fails on coverage drops. Measured on dev, 28 Nov 2026:
            // statements 54.9%, branches 75.79%, functions 64.9%,
            // lines 54.9%. Floors are rounded down for run-to-run
            // headroom; ratchet upward toward 80% as coverage improves.
            thresholds: {
                statements: 54,
                branches: 75,
                functions: 64,
                lines: 54,
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './lib'),
            '@juspay/blend-design-system': resolve(__dirname, './lib/main.ts'),
        },
    },
})
