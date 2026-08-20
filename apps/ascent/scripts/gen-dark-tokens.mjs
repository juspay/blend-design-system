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

const recolor = (value, sets, path = '') => {
    if (typeof value === 'string') {
        if (isFilledText(path)) return value // white-on-fill stays white
        const set = BORDER_KEY.test(path) ? sets.border : sets.surface
        if (!set.colorPattern.source) return value
        return value.replace(
            set.colorPattern,
            (color) =>
                set.replacements.find(([light]) => light === color)?.[1] ??
                color
        )
    }
    if (Array.isArray(value)) {
        return value.map((item) => recolor(item, sets, path))
    }
    if (value !== null && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, child]) => [
                key,
                recolor(child, sets, path ? `${path}.${key}` : key),
            ])
        )
    }
    return value
}

/**
 * Blend's foundation gray is cool-tinted at the dark end (gray[900] is #181B25 --
 * blue channel 13 points above red), while the docs page background is pure
 * neutral. Left alone, every component reads blue against the page.
 *
 * These two knobs pull the gray axis back to neutral and deepen the dark end.
 * They apply ONLY to the gray family; semantic families keep their hue so alert
 * and status colours stay legible as colours.
 */
const GRAY_NEUTRALIZE = 1 // 0 = keep the library's blue cast, 1 = fully neutral
const GRAY_DARKEN = 0.18 // extra darkening applied to the dark end of the ramp

const hexToRgb = (hex) => {
    const value = hex.replace('#', '')
    const full =
        value.length === 3
            ? value
                  .split('')
                  .map((c) => c + c)
                  .join('')
            : value
    return [
        parseInt(full.slice(0, 2), 16),
        parseInt(full.slice(2, 4), 16),
        parseInt(full.slice(4, 6), 16),
    ]
}

const rgbToHex = ([r, g, b]) =>
    '#' +
    [r, g, b]
        .map((c) =>
            Math.max(0, Math.min(255, Math.round(c)))
                .toString(16)
                .padStart(2, '0')
                .toUpperCase()
        )
        .join('')

/**
 * Collapses a colour toward its own perceived brightness (removing hue cast),
 * then optionally darkens it. Darkening is weighted by how dark the colour
 * already is, so surfaces deepen while light text is left alone.
 */
const neutralizeGray = (hex) => {
    if (!/^#[0-9A-Fa-f]{3,6}$/.test(hex)) return hex
    const [r, g, b] = hexToRgb(hex)
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    let next = [
        r + (luma - r) * GRAY_NEUTRALIZE,
        g + (luma - g) * GRAY_NEUTRALIZE,
        b + (luma - b) * GRAY_NEUTRALIZE,
    ]
    const darkness = 1 - luma / 255
    next = next.map((c) => c * (1 - GRAY_DARKEN * darkness))
    return rgbToHex(next)
}

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

/**
 * Borders, outlines and shadows need a gentler inversion than surfaces.
 * A full flip sends the focus border gray[700] -> gray[100] (#F2F2F2), which
 * reads as a glaring near-white ring. These land on a mid grey instead:
 * clearly visible against a dark surface without glowing.
 */
const GRAY_BORDER_MAP = {
    0: 900,
    25: 800,
    50: 800,
    100: 700,
    150: 700,
    200: 700,
    300: 600,
    400: 500,
    500: 500,
    600: 500,
    700: 400,
    800: 300,
    900: 300,
    950: 300,
    1000: 200,
}

/** Keys whose values are borders/outlines/shadows rather than fills. */
const BORDER_KEY = /border|outline|shadow|divider|stroke/i

/**
 * Foreground colours sitting on a SEMANTIC fill must not invert -- white text
 * on a blue button has to stay white in dark mode. Matched against the dotted
 * token path, e.g. `BUTTON.lg.text.color.primary.default.hover`.
 */
const FILLED_TEXT_PATHS = [
    /\btext\.color\.(primary|danger|success|error|warning)\b/i,
    /\bcolor\.(primary|danger|success|error|warning)\b.*\b(default|hover|active)\b/i,
]

const isFilledText = (path) => FILLED_TEXT_PATHS.some((re) => re.test(path))

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

const compile = (pairs) => {
    const replacements = pairs.filter(
        ([light, dark], index) =>
            light !== dark &&
            pairs.findIndex(([candidate]) => candidate === light) === index
    )
    return {
        replacements,
        colorPattern: new RegExp(
            replacements
                .map(([light]) => escapeRegExp(light))
                .sort((a, b) => b.length - a.length)
                .join('|'),
            'g'
        ),
    }
}

const familyPairs = (foundation, family, map, transform) => {
    const scale = foundation.colors[family]
    if (!scale) return []
    const out = []
    for (const [from, to] of Object.entries(map)) {
        const light = scale[from]
        const dark = scale[to]
        if (typeof light === 'string' && typeof dark === 'string') {
            out.push([light, transform ? transform(dark) : dark])
        }
    }
    return out
}

/**
 * Inversion sets, for slots with no dark tokens at all: light values are
 * flipped across the ramp and neutralised.
 */
const buildInvertSets = (foundation) => {
    const semantic = SEMANTIC_FAMILIES.flatMap((family) =>
        familyPairs(foundation, family, SEMANTIC_MAP)
    )
    return {
        surface: compile([
            ...familyPairs(foundation, 'gray', GRAY_MAP, neutralizeGray),
            ...semantic,
        ]),
        // Semantic accents are deliberately left alone on borders/outlines:
        // mapping primary[500] -> primary[400] made focus rings BRIGHTER than
        // in light mode, which is the opposite of what dark mode wants.
        border: compile(
            familyPairs(foundation, 'gray', GRAY_BORDER_MAP, neutralizeGray)
        ),
    }
}

/**
 * Neutralise-only set, for slots that DO have library dark tokens. Those are
 * already dark -- they just carry the foundation's blue cast, so each grey maps
 * to its own neutral equivalent and nothing is inverted.
 */
const buildNeutraliseSets = (foundation) => {
    const scale = foundation.colors.gray || {}
    const pairs = Object.values(scale)
        .filter((hex) => typeof hex === 'string')
        .map((hex) => [hex, neutralizeGray(hex)])
    const set = compile(pairs)
    return { surface: set, border: set }
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
    const invertSets = buildInvertSets(FOUNDATION)
    const neutraliseSets = buildNeutraliseSets(FOUNDATION)

    const registry = readSlotRegistry()
    const overrides = {}
    const failures = []
    const skipped = []
    const partial = []
    let lightOnlyCount = 0
    let neutralisedCount = 0
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
            let recoloured
            let source

            if (!themeAware) {
                // No dark tokens at all -- invert the whole light tree.
                source = light
                recoloured = recolor(light, invertSets)
                lightOnlyCount += 1
            } else {
                const dark = fn(FOUNDATION, 'dark')
                const gaps = identicalBreakpoints(light, dark)
                // Already dark, but carrying the foundation's blue cast.
                source = dark
                recoloured = recolor(dark, neutraliseSets)
                neutralisedCount += 1
                // Any breakpoint the library never finished still needs the
                // full inversion, since its "dark" values are really light.
                for (const bp of gaps) {
                    recoloured[bp] = recolor(light[bp], invertSets)
                }
                if (gaps.length) partial.push(`${slot} (${gaps.join(', ')})`)
            }

            const pruned = pruneUnchanged(recoloured, source)
            if (!pruned) continue
            overrides[slot] = pruned
            totalLeaves += countLeaves(pruned)
        } catch (error) {
            const reason = String(error.message).split('\n')[0]
            if (themeAware) {
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
    console.log(`  light-only slots inverted        : ${lightOnlyCount}`)
    console.log(`  library-dark slots neutralised   : ${neutralisedCount}`)
    console.log(`  unfinished breakpoints inverted  : ${partial.length}`)
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
