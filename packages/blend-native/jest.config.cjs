/**
 * Jest runs the **render** tests; vitest runs the pure layer.
 *
 * Two runners is deliberate. Vitest covers the adapters, resolvers and helpers
 * — modules with no `react-native` value import — and matches the rest of this
 * monorepo. But React Native's entrypoint ships Flow syntax that only its own
 * babel transform understands, so anything that actually mounts a component
 * needs the RN preset, which is Jest-only.
 *
 * `@react-native/jest-preset` is pinned to the same minor as `react-native`
 * itself; `jest-expo` would drag the whole Expo toolchain in for a peer this
 * package only optionally depends on.
 *
 * `.cjs` because the package is `"type": "module"` and Jest loads config as
 * CommonJS.
 */
const path = require('path')

module.exports = {
    preset: '@react-native/jest-preset',
    testMatch: ['**/__tests__/**/*.render.test.tsx'],
    // pnpm stores packages under `.pnpm/<name>@<version>/node_modules/<name>`,
    // so the usual `node_modules/(?!pkg)` pattern never matches — the package
    // name is not the first segment after `node_modules/`. The leading
    // `(.*[\\/])?` lets the allowlist match at any depth.
    transformIgnorePatterns: [
        'node_modules/(?!(.*[\\\\/])?((jest-)?react-native|@react-native([-/][a-z-]+)?|react-native-svg|react-native-reanimated|react-native-worklets|react-native-gesture-handler|react-native-safe-area-context|lucide-react-native)[\\\\/])',
    ],
    // Gesture Handler's own jest mock makes GestureDetector render its child
    // and gestures inert but constructible.
    setupFiles: ['react-native-gesture-handler/jestSetup.js'],
    // Worklets' resolver strips `.native` for its own modules so Reanimated's
    // mock loads the JS fallbacks instead of demanding native init.
    resolver: 'react-native-worklets/jest/resolver.js',
    moduleNameMapper: {
        // Jest replaces the preset's `moduleNameMapper` wholesale rather than
        // merging, so the preset's own react-native mapping has to be restored
        // here. Without it a second copy of react-native gets resolved, and
        // React Testing Library ends up with two module instances — `render`
        // populates one `screen` while the test reads the other.
        '^react-native($|/.*)': `${path.dirname(
            require.resolve('react-native')
        )}/$1`,
        // Match the tsconfig path mapping vitest and tsc already use, so all
        // three resolve the workspace package rather than the published one.
        '^@juspay/blend-design-system/node$': '<rootDir>/../blend/lib/node.ts',
        // Optional peer — see the mock's own note.
        '^expo-linear-gradient$':
            '<rootDir>/__tests__/mocks/expo-linear-gradient.tsx',
        // Reanimated's shipped mock resolves every animation synchronously
        // (values jump to their target, callbacks fire immediately), so
        // enter/exit flows assert without timer choreography.
        '^react-native-reanimated$': 'react-native-reanimated/mock',
        // lucide's `react-native` export condition points at an `.mjs` bundle,
        // which babel-jest does not transform by default. Its CJS build is
        // identical in behaviour, so point Jest straight at it rather than
        // widening the transform to cover `.mjs` across all of node_modules.
        '^lucide-react-native$':
            '<rootDir>/node_modules/lucide-react-native/dist/cjs/lucide-react-native.js',
    },
}
