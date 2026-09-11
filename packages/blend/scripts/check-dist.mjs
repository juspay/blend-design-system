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
// Check 3 (compound statics, issue #1576) enumerates at runtime every
// public static on every export (e.g. `Skeleton.Avatar`) and asserts two
// things against `dist/main.d.ts`: (a) the static exists in the declared
// type at all — an explicit compound annotation silently drops statics that
// are added to `Object.assign` without updating it; and (b) a static that is
// the SAME VALUE as a flat export (`Skeleton.Avatar === SkeletonAvatar`) is
// declared as `typeof <FlatExport>`, not an inline prop re-declaration —
// inline types claim two independent components where there is one, so
// type-driven tooling emits duplicates. Discovery is by runtime value, so
// new compounds are covered automatically without registering them here.
import { readdirSync, existsSync, statSync, readFileSync } from 'node:fs'
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
const exportsOfMain = moduleSymbol
    ? checker.getExportsOfModule(moduleSymbol)
    : []

if (!moduleSymbol) {
    failed = true
    console.error(`✖ Could not load ${mainDts} as a module.`)
} else {
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

// ---------------------------------------------------------------------------
// Check 3: compound statics must be declared, and flat-export aliases `typeof`
// ---------------------------------------------------------------------------
// Runtime is the ground truth: every uppercase own property of an export is a
// public static and must appear in the declared type (explicit compound
// annotations drop statics added to `Object.assign` without updating them).
// A static that is `===` a top-level export must additionally be a `typeof`
// query resolving to that export's declaration. (A structural type comparison
// cannot catch that — the inline form is structurally identical.)
//
// A static that is deliberately kept out of the declared type must be
// exempted as '<Export>.<Static>' (none today); any export name of the
// owning component works.
const UNDECLARED_STATIC_ALLOWLIST = new Set()

const compoundStatics = []
try {
    // The bundle runs its module-load side effects on import (e.g. Highcharts
    // reads `window`), so provide a minimal browser environment. This only
    // needs globals touched at module-load time — NOT render/effect-time ones
    // like ResizeObserver, which never run here since the script imports but
    // never renders. If a future dependency reads a new global at load, the
    // import below throws and is caught (see catch); add the global here.
    const { JSDOM } = await import('jsdom')
    const dom = new JSDOM('', { pretendToBeVisual: true })
    global.window = dom.window
    global.document = dom.window.document
    global.HTMLElement = dom.window.HTMLElement
    global.getComputedStyle = dom.window.getComputedStyle
    Object.defineProperty(global, 'navigator', {
        value: dom.window.navigator,
        configurable: true,
    })

    const mod = await import(resolve(distDir, 'main.js'))

    const isComponentLike = (v) =>
        typeof v === 'function' ||
        (typeof v === 'object' && v !== null && '$$typeof' in v)

    const namesByValue = new Map()
    for (const [name, value] of Object.entries(mod)) {
        if (name === 'default' || !isComponentLike(value)) continue
        if (!namesByValue.has(value)) namesByValue.set(value, [])
        namesByValue.get(value).push(name)
    }

    const seen = new Set()
    for (const [name, value] of Object.entries(mod)) {
        if (name === 'default' || !isComponentLike(value)) continue
        for (const key of Object.keys(value)) {
            if (!/^[A-Z]/.test(key)) continue
            const staticValue = value[key]
            if (staticValue === value) continue
            // null flatNames = a compound-only static (no flat export) — only
            // its presence in the declared type is asserted
            const flatNames = namesByValue.get(staticValue) ?? null
            // the same compound value can be exported under several names —
            // check each (compound value, static) pair once
            const compoundNames = namesByValue.get(value)
            const id = compoundNames[0] + '.' + key
            if (seen.has(id)) continue
            seen.add(id)
            if (
                compoundNames.some((n) =>
                    UNDECLARED_STATIC_ALLOWLIST.has(`${n}.${key}`)
                )
            )
                continue
            compoundStatics.push({ compound: name, key, flatNames })
        }
    }
} catch (error) {
    failed = true
    console.error(
        '✖ Could not import dist/main.js to discover compound statics ' +
            '(a browser global read at module-load may need shimming in the ' +
            `setup block above): ${error.message}`
    )
}

let verifiedStatics = 0
if (moduleSymbol && compoundStatics.length > 0) {
    const resolveAlias = (symbol) =>
        symbol && symbol.flags & ts.SymbolFlags.Alias
            ? checker.getAliasedSymbol(symbol)
            : symbol

    for (const { compound, key, flatNames } of compoundStatics) {
        const compoundSymbol = exportsOfMain.find((s) => s.name === compound)
        if (!compoundSymbol) {
            failed = true
            console.error(
                `✖ \`${compound}\` exists at runtime in dist/main.js but ` +
                    'dist/main.d.ts does not export it.'
            )
            continue
        }
        const compoundType = checker.getTypeOfSymbolAtLocation(
            compoundSymbol,
            sourceFile
        )
        const prop = compoundType.getProperty(key)
        if (!prop) {
            failed = true
            console.error(
                `✖ \`${compound}.${key}\` exists at runtime but is missing ` +
                    `from \`${compound}\`'s declared type — its explicit ` +
                    'annotation has drifted behind the `Object.assign` value.'
            )
            continue
        }
        if (!flatNames) {
            // compound-only static — nothing to alias, presence is enough
            verifiedStatics++
            continue
        }

        const typeNode = prop.declarations?.[0]?.type
        let ok = false
        if (typeNode && ts.isTypeQueryNode(typeNode)) {
            const target = resolveAlias(
                checker.getSymbolAtLocation(typeNode.exprName)
            )
            ok =
                target !== undefined &&
                flatNames.some(
                    (flat) =>
                        resolveAlias(
                            exportsOfMain.find((s) => s.name === flat)
                        ) === target
                )
        }
        if (ok) {
            verifiedStatics++
        } else {
            failed = true
            const flats = flatNames.map((f) => `\`${f}\``).join(' / ')
            const expected = flatNames
                .map((f) => `\`typeof ${f}\``)
                .join(' or ')
            console.error(
                `✖ \`${compound}.${key}\` is the same runtime value as export ` +
                    `${flats}, but its emitted declaration is not ${expected}. ` +
                    'Annotate the compound const explicitly (see ' +
                    'SkeletonCompound.tsx) so declaration emit states the ' +
                    'value identity instead of inlining the props.'
            )
        }
    }
}

// ---------------------------------------------------------------------------
// Check 4: JS-referenced asset URLs (the Monaco worker chunks, issue #1734)
// must keep an explicit `./` — `new URL("assets/x", import.meta.url)` without
// it is a bare specifier that webpack-5 consumers re-bundling this ESM (e.g.
// Next.js transpilePackages) resolve as a node_modules module, breaking their
// build. The Vite config forces the `./`; this locks it in.
// ---------------------------------------------------------------------------
const bareAssetUrl = /new URL\(\s*(?:\/\*[^*]*\*\/\s*)?["']assets\//
for (const file of readdirSync(distDir).filter((f) => f.endsWith('.js'))) {
    const source = readFileSync(resolve(distDir, file), 'utf8')
    if (bareAssetUrl.test(source)) {
        failed = true
        console.error(
            `✖ dist/${file} references an asset with \`new URL("assets/…", import.meta.url)\` ` +
                'without a leading "./". A bare specifier breaks webpack-5 consumers — ' +
                'ensure vite.config `experimental.renderBuiltUrl` prefixes "./" for hostType "js".'
        )
    }
}

// ---------------------------------------------------------------------------
// Check 5: Monaco's editor stylesheet must ship self-contained in JS, not in
// the global style.css (issue #1744). CodeEditor injects the stylesheet at
// runtime (components/shared/monacoStyles.ts) so a self-hosted editor renders
// styled with NO `@juspay/blend-design-system/style.css` import. That means
// the editor CSS must (a) be present in a JS chunk — the inlined string — and
// (b) NOT be extracted into style.css, or it would double-ship ~260KB and
// re-introduce the global-stylesheet dependency the injection removes.
// The full Monaco editor CSS carries 700+ `.monaco-editor` selectors, so a
// generous threshold cleanly separates "the whole stylesheet is here" from the
// handful of ad-hoc `.monaco-editor` overrides the wrappers inline.
// ---------------------------------------------------------------------------
const MONACO_BULK_THRESHOLD = 100
const countMatches = (source, needle) => source.split(needle).length - 1

const stylePath = resolve(distDir, 'style.css')
if (existsSync(stylePath)) {
    const styleMonaco = countMatches(
        readFileSync(stylePath, 'utf8'),
        '.monaco-editor'
    )
    if (styleMonaco >= MONACO_BULK_THRESHOLD) {
        failed = true
        console.error(
            `✖ dist/style.css carries the full Monaco editor stylesheet ` +
                `(${styleMonaco} \`.monaco-editor\` selectors). CodeEditor injects ` +
                'it at runtime (monacoStyles.ts), so it must NOT also be extracted ' +
                'into style.css — a static `import` of a Monaco CSS file crept back in.'
        )
    }
}

const jsHasMonacoBulk = readdirSync(distDir)
    .filter((f) => f.endsWith('.js'))
    .some(
        (f) =>
            countMatches(
                readFileSync(resolve(distDir, f), 'utf8'),
                '.monaco-editor'
            ) >= MONACO_BULK_THRESHOLD
    )
if (!jsHasMonacoBulk) {
    failed = true
    console.error(
        '✖ No dist JS chunk contains the Monaco editor stylesheet. CodeEditor ' +
            'relies on monacoStyles.ts injecting it via `?inline`; the inline import ' +
            'appears to have been dropped, so a self-hosted editor renders unstyled.'
    )
}

if (failed) {
    process.exit(1)
}

console.log(
    `✔ dist/ has no file/directory collisions; key exports (${KEY_EXPORTS.join(', ')}) are typed; ` +
        `${verifiedStatics} compound statics declared (flat-export aliases as \`typeof\`); ` +
        'Monaco editor CSS ships self-contained in JS, not style.css.'
)
// Importing dist/main.js leaves live handles behind (styled-components /
// framer-motion timers under jsdom), so Node would hang without an explicit
// exit.
process.exit(0)
