import { defineConfig } from 'tsup'

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        cli: 'src/cli.ts',
    },
    format: ['cjs'],
    target: 'node18',
    clean: true,
    sourcemap: true,
    dts: true,
    splitting: false,
    shims: true,
    banner: {},
})
