import { defineConfig } from 'vitest/config'

/**
 * Test config for `@juspay/blend-native`.
 *
 * These suites cover the package's **pure** layer: the CSS-string adapters,
 * the surface-style resolver, the per-component style/utility functions, and
 * breakpoint resolution. None of it touches the RN runtime — every
 * `react-native` import in those modules is type-only and therefore erased —
 * so they run under plain vitest with no native mocking.
 *
 * Component render tests (`@testing-library/react-native`) are tracked
 * separately; they need a Jest + RN preset, which is a different toolchain
 * from the vitest setup the rest of this monorepo uses.
 */
export default defineConfig({
    test: {
        environment: 'node',
        include: ['__tests__/**/*.test.ts', '__tests__/**/*.test.tsx'],
        testTimeout: 15000,
        hookTimeout: 10000,
    },
})
