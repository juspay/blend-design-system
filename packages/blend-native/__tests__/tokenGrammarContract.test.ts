import { describe, it, expect } from 'vitest'
import {
    parseBackground,
    parseBorder,
    parseBorderRadius,
    parseBoxShadow,
    parseDimension,
    parseDuration,
    parseSize,
} from '../src/adapters/cssStringAdapter'

/**
 * The factory→adapter grammar contract.
 *
 * The export contract (`nodeEntryContract.test.ts`) proves the web factories
 * *exist*; this test proves the strings they *emit* stay parseable. That gap
 * is real: `surfaceStyle.put()` silently drops any value a parser refuses, so
 * a web-side token written in a grammar the adapter does not know (a `to top`
 * gradient, a `rem` length) degrades on device with no error anywhere.
 *
 * Every registered slot is resolved for both themes and both breakpoints, and
 * every leaf is fed to the parser its key name selects — the same key→parser
 * mapping `surfaceStyle.ts` and the component utils use. Key names, not value
 * shapes, decide the parser: `'600'`, `'ease-in-out'`, and `'1px solid #…'`
 * are all just strings, and two slots deliberately cross-type their keys
 * (BUTTONV2's `backgroundColor` holds gradients; ALERTV2's `border` holds the
 * shorthand despite its `color` typing).
 *
 * Registering a new slot in `nativeTokenRegistry.ts` extends this contract
 * automatically. If a token fails here: fix the adapter or fix the token —
 * only a value that is genuinely handled outside the adapters may join
 * `EXCEPTIONS`, with the handler named.
 */

const THEMES = ['light', 'dark'] as const
const BREAKPOINTS = ['sm', 'lg'] as const

/**
 * Values resolved outside the adapter layer. Each entry names the code that
 * actually handles the value, so a reader can verify the exception is real.
 */
const EXCEPTIONS: { pattern: RegExp; handler: string }[] = [
    {
        // '50%' — resolveSkeletonRadius() computes a numeric half-box radius
        // for circles before parseBorderRadius is ever consulted.
        pattern: /^SKELETON\.\w+\.\w+\.borderRadius\.circle$/,
        handler: 'skeleton.utils.ts resolveSkeletonRadius',
    },
    {
        // 'calc(100vw - 32px)' — screen-relative width comes from the toast
        // outlet's horizontal insets; calc()/vw are unsupported by design
        // and the native snackbar never consumes this token.
        pattern: /^SNACKBARV2\.\w+\.\w+\.maxWidth$/,
        handler: 'ToastOutlet stack paddingHorizontal',
    },
    {
        // The accordion type key is literally 'border', so this leaf's own
        // segment name collides with the border style key. It is a plain
        // color, consumed by Accordion's Separator.
        pattern: /^ACCORDIONV2\.\w+\.\w+\.separator\.color\./,
        handler: 'Accordion.tsx Separator color',
    },
]

type Leaf = { path: string; segments: string[]; value: unknown }

function collectLeaves(
    node: unknown,
    path: string[],
    out: Leaf[] = []
): Leaf[] {
    if (node !== null && typeof node === 'object') {
        for (const [key, value] of Object.entries(node)) {
            collectLeaves(value, [...path, key], out)
        }
        return out
    }
    out.push({ path: path.join('.'), segments: path, value: node })
    return out
}

const STYLE_KEY_RE =
    /^(background|backgroundColor|border|borderRadius.*|boxShadow|shadow|focusRing|duration|fontSize|lineHeight|letterSpacing|padding.*|gap)$|(width|height)$/i

/**
 * The token key that selects the parser. Token trees nest state/size maps
 * BELOW the style key (`backgroundColor.default`, `border.primary.subtle`),
 * so the leaf's own key is usually a state name — walk from the leaf upward
 * to the nearest segment that names a style property.
 */
function styleKeyFor(segments: string[]): string | null {
    // segments[0..2] are slot/theme/breakpoint — never style keys. Scan from
    // the ROOT down: the style key always sits above its variant/state maps,
    // and a variant key can itself be named like a style key (ACCORDIONV2's
    // type key is literally 'border', so `backgroundColor.border.hover` must
    // dispatch on `backgroundColor`, not `border`).
    for (let i = 3; i < segments.length; i++) {
        if (STYLE_KEY_RE.test(segments[i])) return segments[i]
    }
    return null
}

/** `null` means the leaf parses cleanly; a string is the violation reason. */
function checkLeaf(leaf: Leaf): string | null {
    const { value } = leaf
    const key = styleKeyFor(leaf.segments) ?? ''

    // Absent optional tokens are skippable by design (`put()` drops them).
    if (value === undefined || value === null) return null

    const str = String(value)

    // Backgrounds — BUTTONV2's `backgroundColor` includes gradients, so both
    // keys go through parseBackground (surfaceStyle passes `backgroundColor`
    // through raw, but Button routes it via `background`).
    if (key === 'background' || key === 'backgroundColor') {
        if (str === 'none' || str === 'transparent') return null
        const parsed = parseBackground(str)
        if (parsed === null) return 'parseBackground returned null'
        // Runtime degrades an unsupported gradient to its first stop so a
        // screen never crashes — but the contract is stricter: a token that
        // IS a gradient must parse AS a gradient, or web has started
        // emitting grammar the adapter cannot express.
        if (/gradient\(/i.test(str) && parsed.type !== 'gradient') {
            return 'gradient token degraded to a flat color (unsupported syntax)'
        }
        if (parsed.type === 'flat' && /gradient\(/i.test(parsed.color)) {
            return `flat color is a raw gradient string: ${parsed.color}`
        }
        if (parsed.type === 'gradient') {
            const locs = parsed.locations
            const monotonic = locs.every(
                (l, i) => l >= 0 && l <= 1 && (i === 0 || l >= locs[i - 1])
            )
            if (!monotonic) {
                return `gradient locations not monotonic in [0,1]: [${locs}]`
            }
        }
        return null
    }

    if (key === 'border') {
        if (str === 'none' || str === 'transparent') return null
        const parsed = parseBorder(str)
        if (
            parsed.borderWidth === undefined ||
            parsed.borderColor === undefined
        ) {
            return 'parseBorder could not extract width + color'
        }
        return null
    }

    if (key.startsWith('borderRadius')) {
        if (parseBorderRadius(str) === undefined) {
            return 'parseBorderRadius returned undefined'
        }
        return null
    }

    if (key === 'boxShadow' || key === 'shadow' || key === 'focusRing') {
        if (str === 'none') return null
        if (parseBoxShadow(str) === null) {
            // Inset-only shadows are deliberately dropped — RN cannot render
            // inset at all, and parseBoxShadow documents null as "no shadow".
            // BUTTONV2's pressed-state shadows are all inset.
            if (/\binset\b/i.test(str)) return null
            return 'parseBoxShadow returned null'
        }
        return null
    }

    if (key === 'duration') {
        if (parseDuration(str) === undefined) {
            return 'parseDuration returned undefined'
        }
        return null
    }

    if (key === 'fontSize' || key === 'lineHeight' || key === 'letterSpacing') {
        if (parseDimension(value as string | number) === undefined) {
            return 'parseDimension returned undefined'
        }
        return null
    }

    if (key.startsWith('padding') || key === 'gap') {
        // Padding tokens may be multi-value shorthands ("20px 16px" —
        // ACCORDIONV2's trigger padding); every part must be a length.
        const parts = str.split(/\s+/)
        if (
            parts.some((part) => parseDimension(part) === undefined) &&
            parseDimension(value as string | number) === undefined
        ) {
            return 'parseDimension returned undefined (a % here is a bug)'
        }
        return null
    }

    if (/(width|height)$/i.test(key)) {
        if (parseSize(value as string | number) === undefined) {
            return 'parseSize returned undefined'
        }
        return null
    }

    // Everything else (colors, font families, keywords, flags) passes
    // through unparsed — it just has to be a printable primitive.
    if (typeof value === 'number' && !Number.isFinite(value)) {
        return 'non-finite number'
    }
    if (
        typeof value !== 'string' &&
        typeof value !== 'number' &&
        typeof value !== 'boolean'
    ) {
        return `unexpected leaf type: ${typeof value}`
    }
    return null
}

describe('token grammar contract', () => {
    it('every registered factory emits only adapter-parseable values', async () => {
        // Imported dynamically so a stale dist fails with a build hint, not a
        // cryptic resolution error (vitest resolves the workspace link to the
        // built dist/node.js, unlike jest which maps it to source).
        let registry: typeof import('../src/theme/nativeTokenRegistry')
        try {
            registry = await import('../src/theme/nativeTokenRegistry')
        } catch (error) {
            throw new Error(
                'Could not load the token registry — the workspace link ' +
                    'serves built dist/, so run `pnpm build:blend` first.\n' +
                    String(error)
            )
        }
        const { FOUNDATION_THEME, Theme } =
            await import('@juspay/blend-design-system/node')
        const themeValues = { light: Theme.LIGHT, dark: Theme.DARK }

        const violations: string[] = []
        let leafCount = 0

        for (const slot of registry.NATIVE_TOKEN_SLOTS) {
            const factory = registry.NATIVE_TOKEN_REGISTRY[slot]
            for (const theme of THEMES) {
                const responsive = factory(FOUNDATION_THEME, themeValues[theme])
                for (const bp of BREAKPOINTS) {
                    const leaves = collectLeaves(responsive[bp], [
                        slot,
                        theme,
                        bp,
                    ])
                    leafCount += leaves.length
                    for (const leaf of leaves) {
                        if (EXCEPTIONS.some((e) => e.pattern.test(leaf.path))) {
                            continue
                        }
                        const reason = checkLeaf(leaf)
                        if (reason) {
                            violations.push(
                                `${leaf.path} = ${JSON.stringify(leaf.value)} → ${reason}`
                            )
                        }
                    }
                }
            }
        }

        // Sanity: the walk actually visited real token trees.
        expect(leafCount).toBeGreaterThan(100)

        expect(
            violations,
            'Token values the native adapters cannot parse — fix the ' +
                'adapter, fix the token, or (only for values handled outside ' +
                'the adapters) add a documented exception:\n  ' +
                violations.join('\n  ')
        ).toEqual([])
    })

    it('every exception still matches a live token path (no dead entries)', async () => {
        const registry = await import('../src/theme/nativeTokenRegistry')
        const { FOUNDATION_THEME, Theme } =
            await import('@juspay/blend-design-system/node')

        const allPaths: string[] = []
        for (const slot of registry.NATIVE_TOKEN_SLOTS) {
            const factory = registry.NATIVE_TOKEN_REGISTRY[slot]
            for (const theme of THEMES) {
                const responsive = factory(
                    FOUNDATION_THEME,
                    theme === 'light' ? Theme.LIGHT : Theme.DARK
                )
                for (const bp of BREAKPOINTS) {
                    for (const leaf of collectLeaves(responsive[bp], [
                        slot,
                        theme,
                        bp,
                    ])) {
                        allPaths.push(leaf.path)
                    }
                }
            }
        }

        const dead = EXCEPTIONS.filter(
            (e) => !allPaths.some((p) => e.pattern.test(p))
        )
        expect(
            dead.map((e) => String(e.pattern)),
            'Exceptions that no longer match any token path — remove them:'
        ).toEqual([])
    })
})
