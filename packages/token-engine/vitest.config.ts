import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    resolve: {
        alias: {
            '@juspay/blend-design-system/node': path.resolve(
                __dirname,
                '../blend/lib/node.ts'
            ),
            '@juspay/blend-design-system': path.resolve(
                __dirname,
                '../blend/lib/main.ts'
            ),
        },
    },
    test: {
        environment: 'node',
    },
})
