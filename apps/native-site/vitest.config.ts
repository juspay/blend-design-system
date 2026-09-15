import { defineConfig } from 'vitest/config'

/**
 * Covers the playground's pure layer only — `snippet.ts` and the option
 * helpers in `types.ts`, neither of which imports `react-native`. Component
 * behaviour is verified in `blend-native`'s own render suite; what this app
 * is for is being looked at on a device.
 */
export default defineConfig({
    test: {
        include: ['playground/**/*.test.ts'],
        environment: 'node',
    },
})
