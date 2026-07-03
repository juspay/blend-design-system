// Post-build packaging gate for `dist/` (see issue #1556).
//
// Guards against the file-shadows-directory class of packaging bug: when
// `dist/X.d.ts` (or `dist/X.js`) is emitted next to a `dist/X/` directory,
// every standard TS resolution mode (Bundler, NodeNext, Node10) resolves a
// relative `./X` to the FILE, not the directory. The root re-exports in
// `dist/main.d.ts` (e.g. `export * from './tokens'`) then silently point at
// the wrong module and their symbols type as `any` for every consumer —
// runtime is bundled and unaffected, so nothing fails until a typed consumer
// notices. This happened in 0.0.37-beta.x: the token-engine entry was named
// `tokens`, emitting `dist/tokens.d.ts` next to `dist/tokens/`, which broke
// `FOUNDATION_THEME` (and everything else re-exported `from './tokens'`).
//
// Check 1 (collision guard) fails the build on ANY such basename collision.
// Check 2 (type smoke test) type-checks key root exports of `dist/main.d.ts`
// and fails if a symbol is missing or resolves to `any`.
import { readdirSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const distDir = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')

if (!existsSync(distDir)) {
    console.error(`✖ ${distDir} does not exist — run the build first.`)
    process.exit(1)
}

let failed = false

// ---------------------------------------------------------------------------
// Check 1: no dist/X.d.ts or dist/X.js may coexist with a dist/X/ directory
// ---------------------------------------------------------------------------
const entries = readdirSync(distDir)
const directories = new Set(
    entries.filter((e) => statSync(resolve(distDir, e)).isDirectory())
)

const collisions = entries.filter((e) => {
    const base = e.replace(/\.d\.ts$|\.js$/, '')
    return base !== e && directories.has(base)
})

if (collisions.length > 0) {
    failed = true
    console.error('✖ dist/ file-shadows-directory collision(s) found:\n')
    for (const file of collisions) {
        const base = file.replace(/\.d\.ts$|\.js$/, '')
        console.error(`  dist/${file} shadows dist/${base}/`)
    }
    console.error(
        '\nA file always beats a sibling directory in TS module resolution, so\n' +
            'relative `./X` imports inside dist/ now resolve to the file — the\n' +
            'directory (and everything re-exported from it) becomes unreachable\n' +
            'and types silently degrade to `any`. Rename the vite build entry so\n' +
            'its output name does not clash with a lib/ directory (see the\n' +
            '`token-engine` entry in vite.config.ts).\n'
    )
}

// ---------------------------------------------------------------------------
// Check 2: key root exports must exist and must not type as `any`
// ---------------------------------------------------------------------------
const KEY_EXPORTS = ['FOUNDATION_THEME']

const mainDts = resolve(distDir, 'main.d.ts')
const program = ts.createProgram([mainDts], {
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
    skipLibCheck: true,
    noEmit: true,
})
const checker = program.getTypeChecker()
const sourceFile = program.getSourceFile(mainDts)
const moduleSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile)

if (!moduleSymbol) {
    failed = true
    console.error(`✖ Could not load ${mainDts} as a module.`)
} else {
    const exportsOfMain = checker.getExportsOfModule(moduleSymbol)
    for (const name of KEY_EXPORTS) {
        const symbol = exportsOfMain.find((s) => s.name === name)
        if (!symbol) {
            failed = true
            console.error(`✖ dist/main.d.ts does not export \`${name}\`.`)
            continue
        }
        const type = checker.getTypeOfSymbolAtLocation(symbol, sourceFile)
        if (type.flags & ts.TypeFlags.Any) {
            failed = true
            console.error(
                `✖ dist/main.d.ts exports \`${name}\` but it types as \`any\` — ` +
                    'its re-export chain is broken (likely a file/directory collision above).'
            )
        }
    }
}

if (failed) {
    process.exit(1)
}

console.log(
    `✔ dist/ has no file/directory collisions; key exports (${KEY_EXPORTS.join(', ')}) are typed.`
)
