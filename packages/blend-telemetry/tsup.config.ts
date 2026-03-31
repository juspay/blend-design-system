import { defineConfig } from 'tsup'
import { readFileSync } from 'fs'

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
    version: string
}

// ── Build-time guard ───────────────────────────────────────────────────────────
// Firebase config must be baked in at build time via env vars.
// Fail loudly in CI/publish builds (NODE_ENV=production) if config is missing.
// Local dev builds (no NODE_ENV) produce an empty-config binary that simply
// skips uploads — safe for iterating on the tool locally.
if (process.env.NODE_ENV === 'production') {
    const required = [
        'BLEND_FIREBASE_API_KEY',
        'BLEND_FIREBASE_PROJECT_ID',
        'BLEND_FIREBASE_APP_ID',
    ]
    const missing = required.filter((k) => !process.env[k]?.trim())
    if (missing.length > 0) {
        throw new Error(
            `[blend-telemetry] Missing required Firebase env vars for production build:\n` +
                missing.map((k) => `  • ${k}`).join('\n') +
                `\nSet them as GitHub Secrets or in your local shell before running npm publish.`
        )
    }
}

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        cli: 'src/cli.ts',
    },
    format: ['cjs'],
    target: 'node18',
    clean: true,
    sourcemap: false,
    dts: true,
    splitting: false,
    shims: true,
    banner: {},
    // ── Version + Firebase config baked in at build time ─────────────────────
    // All values are inlined as string literals in the compiled bundle.
    // __BLEND_TOOL_VERSION__ — read from package.json; single source of truth.
    // Firebase values — set as env vars in CI; apiKey is public (not a secret).
    define: {
        __BLEND_TOOL_VERSION__: JSON.stringify(version),
        __BLEND_FIREBASE_API_KEY__: JSON.stringify(
            process.env.BLEND_FIREBASE_API_KEY ?? ''
        ),
        __BLEND_FIREBASE_AUTH_DOMAIN__: JSON.stringify(
            process.env.BLEND_FIREBASE_AUTH_DOMAIN ?? ''
        ),
        __BLEND_FIREBASE_PROJECT_ID__: JSON.stringify(
            process.env.BLEND_FIREBASE_PROJECT_ID ?? ''
        ),
        __BLEND_FIREBASE_STORAGE_BUCKET__: JSON.stringify(
            process.env.BLEND_FIREBASE_STORAGE_BUCKET ?? ''
        ),
        __BLEND_FIREBASE_MESSAGING_SENDER_ID__: JSON.stringify(
            process.env.BLEND_FIREBASE_MESSAGING_SENDER_ID ?? ''
        ),
        __BLEND_FIREBASE_APP_ID__: JSON.stringify(
            process.env.BLEND_FIREBASE_APP_ID ?? ''
        ),
    },
})
