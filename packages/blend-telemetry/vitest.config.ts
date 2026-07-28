import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: false,
        environment: 'node',
    },
    define: {
        // In tests, the baked Firebase tokens are empty strings.
        // This mirrors the behavior of a local dev build where no env vars are set.
        // The cloud reporter's "not configured" guard handles this path.
        __BLEND_TOOL_VERSION__: JSON.stringify('0.0.0-test'),
        __BLEND_FIREBASE_API_KEY__: JSON.stringify(''),
        __BLEND_FIREBASE_AUTH_DOMAIN__: JSON.stringify(''),
        __BLEND_FIREBASE_PROJECT_ID__: JSON.stringify(''),
        __BLEND_FIREBASE_STORAGE_BUCKET__: JSON.stringify(''),
        __BLEND_FIREBASE_MESSAGING_SENDER_ID__: JSON.stringify(''),
        __BLEND_FIREBASE_APP_ID__: JSON.stringify(''),
    },
})
