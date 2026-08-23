/**
 * Deep-merge for component token overrides.
 *
 * Lives in its own leaf module — with no imports — for two reasons:
 *
 * 1. `initComponentTokens.ts` barrel-imports React components (e.g.
 *    `from '../components/AlertV2'`), so re-exporting this function through
 *    that module would pull UI code into the React-free `lib/node.ts` entry.
 * 2. `@juspay/blend-native` resolves the same component tokens outside React
 *    and must apply overrides with identical semantics. Sharing one
 *    implementation is what keeps web and native from drifting.
 *
 * Pure, no React, no DOM.
 */

type TokenRecord = Record<string, unknown>

const isTokenRecord = (value: unknown): value is TokenRecord =>
    typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Recursively merge `overrides` onto `defaults`.
 *
 * Plain objects are merged key-by-key; anything else (including arrays and
 * primitives) replaces the default outright. `undefined` overrides are
 * skipped, so consumers can supply only the token paths they want to change
 * and every untouched path keeps its light/dark theme value.
 */
export const mergeTokenTree = (
    defaults: unknown,
    overrides: unknown
): unknown => {
    if (overrides === undefined) return defaults
    if (!isTokenRecord(defaults) || !isTokenRecord(overrides)) {
        return overrides
    }

    const merged: TokenRecord = { ...defaults }
    for (const key of Object.keys(overrides)) {
        const overrideValue = overrides[key]
        if (overrideValue === undefined) continue

        merged[key] = mergeTokenTree(defaults[key], overrideValue)
    }

    return merged
}

export default mergeTokenTree
