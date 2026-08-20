/**
 * Generates dark-mode component token overrides for the Blend components whose
 * library tokens are light-only.
 *
 * Blend implements dark mode at the component-token layer: a `getXTokens`
 * factory dispatches to a light or dark leaf. 30 V1 factories never got a dark
 * leaf and are single-arity, so under `theme="dark"` they still return light
 * values. ThemeProvider deep-merges `componentTokens` on top of the resolved
 * defaults, so supplying dark values for exactly those slots fills the gap
 * without touching the library.
 *
 * The recolor mapping is ported from the library's own approach in
 * packages/blend/lib/components/DataTable/table.dark.tokens.ts, which derives
 * dark tokens from light by swapping foundation gray rungs.
 *
 * Run: pnpm --filter ascent gen:dark-tokens
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createJiti } from 'jiti'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const jiti = createJiti(__filename)

const LIB = '@juspay/blend-design-system/lib'

const REGISTRY = path.join(
    __dirname,
    '../node_modules/@juspay/blend-design-system/lib/context/initComponentTokens.ts'
)

/**
 * Reads Blend's own slot registry rather than hardcoding a list, so new or
 * renamed components are picked up automatically instead of silently drifting.
 *
 * Returns one entry per slot: which factory backs it, where that factory lives,
 * and whether the registry passes `theme` (i.e. whether the slot is even
 * capable of resolving dark values).
 */
const readSlotRegistry = () => {
    const src = fs.readFileSync(REGISTRY, 'utf8')

    const modules = new Map()
    const defaults = new Set()
    const importRe =
        /import\s+(?:\{\s*([\w\s,]+?)\s*\}|(\w+))\s+from\s+'(\.\.\/components\/[^']+)'/g
    for (const m of src.matchAll(importRe)) {
        const [, named, defaultName, modulePath] = m
        if (defaultName) {
            modules.set(defaultName, modulePath)
            defaults.add(defaultName)
        } else {
            for (const name of named.split(',')) {
                const clean = name.trim()
                if (clean) modules.set(clean, modulePath)
            }
        }
    }

    const slots = []
    const callRe = /(\w+):\s*mergeTokens\(\s*(get\w+)\(([^)]*)\)/g
    for (const m of src.matchAll(callRe)) {
        const [, slot, factory, args] = m
        const modulePath = modules.get(factory)
        if (!modulePath) continue
        slots.push({
            slot,
            factory,
            module: modulePath.replace('../', ''),
            isDefault: defaults.has(factory),
            themeAware: args.includes('theme'),
        })
    }
    return slots
}

// Recolor helpers, ported from DataTable/table.dark.tokens.ts
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const recolor = (value, replacements, colorPattern) => {
    if (typeof value === 'string') {
        return value.replace(
            colorPattern,
            (color) =>
                replacements.find(([light]) => light === color)?.[1] ?? color
        )
    }
    if (Array.isArray(value)) {
        return value.map((item) => recolor(item, replacements, colorPattern))
    }
    if (value !== null && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, child]) => [
                key,
                recolor(child, replacements, colorPattern),
            ])
        )
    }
    return value
}

/**
 * Dark values are derived by inverting each foundation colour scale.
 *
 * Gray is a full inversion (light surfaces become dark, dark text becomes
 * light). The library's own DataTable recolor covers only gray 0-900; gray 950
 * and 1000 are added here because several components (Breadcrumb, Menu) use
 * them for primary text, which would otherwise stay near-black on a dark page.
 *
 * Semantic families (primary/red/green/yellow/orange/purple) invert their tint
 * rungs so pastel backgrounds become deep ones, while the mid rungs stay near
 * the brand accent. These are MECHANICAL and want a design review -- correct
 * individual values in darkOverrides.manual.ts rather than editing this map.
 */
const GRAY_MAP = {
    0: 900,
    25: 800,
    50: 700,
    100: 600,
    150: 700,
    200: 700,
    300: 500,
    400: 400,
    500: 300,
    600: 200,
    700: 100,
    800: 50,
    900: 0,
    950: 25,
    1000: 0,
}

const SEMANTIC_MAP = {
    50: 950,
    100: 900,
    200: 800,
    300: 700,
    400: 400,
    500: 400,
    600: 500,
    700: 300,
    800: 200,
    900: 100,
    950: 50,
}

const SEMANTIC_FAMILIES = [
    'primary',
    'red',
    'green',
    'yellow',
    'orange',
    'purple',
]

const buildReplacements = (foundation) => {
    const pairs = []
    const addFamily = (family, map) => {
        const scale = foundation.colors[family]
        if (!scale) return
        for (const [from, to] of Object.entries(map)) {
            const light = scale[from]
            const dark = scale[to]
            if (typeof light === 'string' && typeof dark === 'string') {
                pairs.push([light, dark])
            }
        }
    }
    addFamily('gray', GRAY_MAP)
    SEMANTIC_FAMILIES.forEach((family) => addFamily(family, SEMANTIC_MAP))

    const replacements = pairs.filter(
        ([light, dark], index) =>
            light !== dark &&
            pairs.findIndex(([candidate]) => candidate === light) === index
    )
    const colorPattern = new RegExp(
        replacements
            .map(([light]) => escapeRegExp(light))
            .sort((a, b) => b.length - a.length)
            .join('|'),
        'g'
    )
    return { replacements, colorPattern }
}

/**
 * Keeps only the leaves that recoloring actually changed, so the committed
 * output is a reviewable diff rather than a full copy of every token tree.
 */
const pruneUnchanged = (dark, light) => {
    if (dark === light) return undefined
    if (
        dark === null ||
        typeof dark !== 'object' ||
        light === null ||
        typeof light !== 'object' ||
        Array.isArray(dark)
    ) {
        return JSON.stringify(dark) === JSON.stringify(light) ? undefined : dark
    }
    const out = {}
    for (const [key, darkChild] of Object.entries(dark)) {
        const pruned = pruneUnchanged(darkChild, light[key])
        if (pruned !== undefined) out[key] = pruned
    }
    return Object.keys(out).length ? out : undefined
}

const countLeaves = (node) => {
    if (node === null || typeof node !== 'object') return 1
    return Object.values(node).reduce((n, child) => n + countLeaves(child), 0)
}

const BREAKPOINTS = ['sm', 'lg']

/**
 * Per-breakpoint gap: a breakpoint whose dark output equals its light output.
 *
 * Only responsive `{ sm, lg }` token sets are considered. A few factories
 * (CHAT_INPUTV2_MOBILE) return a flat object, where every key would look like
 * an unfinished breakpoint.
 */
const identicalBreakpoints = (light, dark) => {
    if (!light || typeof light !== 'object') return []
    const keys = Object.keys(light)
    if (!keys.length || !keys.every((key) => BREAKPOINTS.includes(key))) {
        return []
    }
    return keys.filter(
        (bp) => JSON.stringify(light[bp]) === JSON.stringify(dark?.[bp])
    )
}

async function main() {
    const themeMod = await jiti.import(`${LIB}/tokens/theme.token`)
    const FOUNDATION = themeMod.default ?? themeMod.FOUNDATION_THEME
    const { replacements, colorPattern } = buildReplacements(FOUNDATION)

    const registry = readSlotRegistry()
    const overrides = {}
    const failures = []
    const skipped = []
    const partial = []
    let lightOnlyCount = 0
    let totalLeaves = 0

    for (const entry of registry) {
        const {
            slot,
            factory,
            module: modulePath,
            isDefault,
            themeAware,
        } = entry
        try {
            const mod = await jiti.import(`${LIB}/${modulePath}`)
            const fn = isDefault ? mod.default : mod[factory]
            if (typeof fn !== 'function') {
                failures.push(`${slot}: ${factory} is not a function`)
                continue
            }

            const light = fn(FOUNDATION, 'light')
            let source

            if (!themeAware) {
                // No dark leaf at all -- recolor the whole tree.
                source = light
                lightOnlyCount += 1
            } else {
                // Has dark tokens, but some breakpoints may be unfinished.
                const dark = fn(FOUNDATION, 'dark')
                const gaps = identicalBreakpoints(light, dark)
                if (!gaps.length) continue
                source = Object.fromEntries(gaps.map((bp) => [bp, light[bp]]))
                partial.push(`${slot} (${gaps.join(', ')})`)
            }

            const recolored = recolor(source, replacements, colorPattern)
            const pruned = pruneUnchanged(recolored, source)
            if (!pruned) {
                failures.push(`${slot}: recolor produced no changes`)
                continue
            }
            overrides[slot] = pruned
            totalLeaves += countLeaves(pruned)
        } catch (error) {
            const reason = String(error.message).split('\n')[0]
            if (themeAware) {
                // Not loadable here, but it has its own dark tokens already;
                // we only lose the ability to gap-check it.
                skipped.push(`${slot}: ${reason}`)
            } else {
                failures.push(`${slot}: ${reason}`)
            }
        }
    }

    const outPath = path.join(
        __dirname,
        '../lib/blend-theme/darkOverrides.generated.ts'
    )
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(
        outPath,
        `// GENERATED by scripts/gen-dark-tokens.mjs -- do not edit by hand.\n` +
            `// Regenerate with: pnpm --filter ascent gen:dark-tokens\n` +
            `//\n` +
            `// Dark values for Blend slots the library resolves as light.\n` +
            `// Covers slots with no dark tokens at all, plus slots whose dark tokens\n` +
            `// are unfinished at some breakpoint. Derived by inverting the foundation\n` +
            `// colour scales, pruned to only the values that changed. Hand-tuned\n` +
            `// corrections belong in darkOverrides.manual.ts, merged over this file.\n` +
            `import type { BlendTokenOverrides } from './types'\n\n` +
            `export const generatedDarkOverrides = ${JSON.stringify(overrides, null, 4)} as unknown as BlendTokenOverrides\n`
    )

    console.log(`registry slots scanned: ${registry.length}`)
    console.log(`  light-only slots recoloured : ${lightOnlyCount}`)
    console.log(`  partial-dark slots patched  : ${partial.length}`)
    partial.forEach((p) => console.log(`      ${p}`))
    console.log(
        `\n${Object.keys(overrides).length} slots, ${totalLeaves} values`
    )
    console.log(`written: ${path.relative(process.cwd(), outPath)}`)
    if (skipped.length) {
        console.log(
            `\n${skipped.length} theme-aware slot(s) not gap-checked (they keep their library dark tokens):`
        )
        skipped.forEach((entry) => console.log(`  ${entry}`))
    }
    if (failures.length) {
        console.log(
            `\n${failures.length} light-only slot(s) FAILED -- hand-author these in darkOverrides.manual.ts:`
        )
        failures.forEach((entry) => console.log(`  ${entry}`))
    }
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
