import type { BlendTokenOverrides } from './types'
import { generatedDarkOverrides } from './darkOverrides.generated'
import { manualDarkOverrides } from './darkOverrides.manual'

type Plain = Record<string, unknown>

const isPlainObject = (value: unknown): value is Plain =>
    value !== null && typeof value === 'object' && !Array.isArray(value)

const deepMerge = (base: Plain, patch: Plain): Plain => {
    const out: Plain = { ...base }
    for (const [key, value] of Object.entries(patch)) {
        const existing = out[key]
        out[key] =
            isPlainObject(existing) && isPlainObject(value)
                ? deepMerge(existing, value)
                : value
    }
    return out
}

/**
 * Dark token overrides for the Blend slots the library resolves as light-only.
 *
 * Must stay a module-scope constant: ThemeProvider memoises resolved tokens on
 * the `componentTokens` reference, so a new object per render would re-run
 * every token factory.
 */
export const darkOverrides = deepMerge(
    generatedDarkOverrides as unknown as Plain,
    manualDarkOverrides as unknown as Plain
) as unknown as BlendTokenOverrides
