/**
 * Named `{placeholder}` substitution. Zero imports, no React, no DOM.
 *
 * Not ICU parsing — that would mean shipping a message parser or taking a
 * dependency, both ruled out. Pluralization is handled separately, by
 * CLDR-category key suffixes plus `Intl.PluralRules`.
 */

/**
 * Var names are restricted to `[A-Za-z0-9_]` so a literal brace in a message
 * (`'{ "a": 1 }'`) is never mistaken for a placeholder.
 */
const PLACEHOLDER = /\{([A-Za-z0-9_]+)\}/g

/**
 * Substitute `{name}` occurrences in `template` from `vars`.
 *
 * Two properties this relies on:
 *
 * 1. **Idempotent.** An ICU-capable consumer `t` that already substituted
 *    leaves no `{name}` behind, so the fast path below returns the string
 *    untouched. That is what lets Blend run its own pass unconditionally over
 *    both a translated string and its own English default.
 * 2. **An unknown placeholder is left literal, not blanked.** A missing var
 *    then shows up as `{count}` in development instead of silently rendering
 *    an empty label.
 */
export const interpolate = (
    template: string,
    vars?: Record<string, string>
): string => {
    if (!vars || template.indexOf('{') === -1) return template

    return template.replace(PLACEHOLDER, (match, name: string) =>
        Object.prototype.hasOwnProperty.call(vars, name) ? vars[name] : match
    )
}

export default interpolate
