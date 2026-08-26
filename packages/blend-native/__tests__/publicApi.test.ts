import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * The root barrel is the package's semver commitment.
 *
 * Low-level internals — the CSS-string parsers, the surface resolver, the token
 * registry, the grouped-control helpers — must stay out of it. They exist to
 * serve the primitives, their shapes will change as more components land, and
 * `Block` / `Pressable` already expose everything a consumer needs to build a
 * token-driven surface.
 *
 * This reads the barrel rather than importing it, because importing pulls in
 * `react-native` and its Flow syntax cannot be parsed outside Metro.
 */

const barrel = readFileSync(resolve(__dirname, '../src/index.ts'), 'utf8')

/** Value exports only — `export type` lines are erased and cost nothing. */
function exportedValues(source: string): Set<string> {
    const names = new Set<string>()
    const blocks = source.matchAll(/export\s*\{([^}]*)\}/g)
    for (const block of blocks) {
        const start = block.index ?? 0
        // Skip `export type { ... }`.
        if (/export\s+type\s*\{$/.test(source.slice(0, start + 14).trim()))
            continue
        if (source.slice(start, start + 12).includes('type')) continue
        for (const entry of block[1].split(',')) {
            const name = entry
                .trim()
                .split(/\s+as\s+/)
                .pop()
                ?.trim()
            if (name) names.add(name)
        }
    }
    return names
}

const INTERNAL = [
    // CSS-string adapters — implementation detail of the primitives.
    'parseDimension',
    'parseSize',
    'parseBorder',
    'parseBorderRadius',
    'parseBoxShadow',
    'parseBackground',
    'resolveSurfaceStyle',
    'resolveBackground',
    // Token wiring.
    'NATIVE_TOKEN_REGISTRY',
    'NATIVE_TOKEN_SLOTS',
    'isNativeTokenSlot',
    // Helpers behind public behaviour.
    'resolveHitSlop',
    'sameHitSlop',
    'resolveBreakpoint',
    'tintSlot',
    'getGroupedBorderRadius',
    'getGroupedBorderWidths',
    'buildAnnouncement',
]

describe('public API surface', () => {
    const exported = exportedValues(barrel)

    it.each(INTERNAL)('does not export %s', (name) => {
        expect(exported.has(name)).toBe(false)
    })

    it('exports the components', () => {
        for (const name of [
            'Alert',
            'Avatar',
            'Button',
            'ButtonGroup',
            'IconButton',
            'KeyValuePair',
            'LinkButton',
            'ProgressBar',
            'Spinner',
            'Tag',
            'TagGroup',
        ]) {
            expect(exported.has(name)).toBe(true)
        }
    })

    it('exports the theming entry points', () => {
        for (const name of [
            'BlendNativeProvider',
            'useNativeTokens',
            'useNativeBreakpoint',
        ]) {
            expect(exported.has(name)).toBe(true)
        }
    })

    it('exports the primitives for custom surfaces', () => {
        for (const name of ['Block', 'Pressable', 'Text', 'Slot']) {
            expect(exported.has(name)).toBe(true)
        }
    })

    it('stays small enough to review in one sitting', () => {
        // A guard against drift, not a hard architectural limit — if this
        // trips, decide deliberately whether the additions are public API.
        // Raised from 30 when the overlay foundation (Portal, BottomSheet,
        // useReduceMotion) became public, then to 40 for the field layer
        // (TextInput, PrimitiveInput, input enums) and the toast pair, then
        // to 44 for the Button/Tag family wave (IconButton, LinkButton,
        // ButtonGroup, TagGroup), then to 64 for the display wave (Spinner,
        // ProgressBar, Avatar, KeyValuePair, Card, Snackbar and their enums).
        expect(exported.size).toBeLessThanOrEqual(64)
    })
})
