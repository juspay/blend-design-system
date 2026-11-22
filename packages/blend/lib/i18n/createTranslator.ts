/**
 * Builds a `translate` function from plain override objects.
 *
 * For consumers with no i18n runtime:
 *
 * ```tsx
 * <ThemeProvider locale="fr-FR" t={createTranslator(frenchOverrides)}>
 * ```
 *
 * This exists so `ThemeProvider` needs no `messages` object prop. Roughly 500
 * optional properties would come out of the ReScript binding generator as an
 * unstable record type at every call site, and keeping messages off the
 * provider is the single biggest contributor to the generated bindings staying
 * clean.
 */

import mergeTokenTree from '../context/mergeTokenTree'
import type { BlendMessageOverrides } from './catalog'
import type { BlendTranslate } from './types'

/**
 * Merge override layers left to right and look keys up in the result.
 *
 * Uses `mergeTokenTree` rather than object spread for one specific property:
 * spread copies an explicit `undefined` over a real value, while
 * `mergeTokenTree` skips it. So a later layer carrying `{ key: undefined }`
 * leaves an earlier layer's value intact — the same override semantics
 * `ThemeProvider` already gives component tokens, with one merge
 * implementation in the repo. Overrides are flat, so its recursion never
 * fires.
 *
 * Returns `undefined` for any key it does not carry, which the resolver reads
 * as a miss and falls back to the component's own English default. It
 * deliberately does **not** merge onto `BLEND_MESSAGES`: that would put the
 * whole aggregate catalog in this module's runtime graph, so every consumer
 * calling `createTranslator` would ship all ~500 strings and the
 * fragment-per-family tree-shaking would be lost. The aggregate enters here as
 * a type only, erased at build.
 */
export const createTranslator = (
    ...layers: BlendMessageOverrides[]
): BlendTranslate => {
    const merged = layers.reduce<Record<string, string>>(
        (accumulated, layer) =>
            mergeTokenTree(accumulated, layer) as Record<string, string>,
        {}
    )

    return (key) => merged[key]
}

export default createTranslator
