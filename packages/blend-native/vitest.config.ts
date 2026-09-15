import { defineConfig } from 'vitest/config'

/**
 * Test config for `blend-native`.
 *
 * These suites cover the package's **pure** layer: the CSS-string adapters,
 * the surface-style resolver, the per-component style/utility functions, and
 * breakpoint resolution. None of it touches the RN runtime — every
 * `react-native` import in those modules is type-only and therefore erased —
 * so they run under plain vitest with no native mocking.
 *
 * Component render tests live in `*.render.test.tsx` and run under Jest
 * instead — mounting a component needs React Native's own babel transform,
 * which vitest cannot provide. See `jest.config.cjs`.
 */
export default defineConfig({
    test: {
        environment: 'node',
        include: ['__tests__/**/*.test.ts', '__tests__/**/*.test.tsx'],
        // `*.render.test.tsx` belongs to Jest — those mount components and
        // need the React Native babel transform, which vitest cannot provide.
        exclude: ['**/node_modules/**', '__tests__/**/*.render.test.tsx'],
        testTimeout: 15000,
        hookTimeout: 10000,
    },
})
