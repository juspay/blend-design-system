/**
 * Live-region message construction.
 *
 * Kept RN-free so it stays unit-testable outside a renderer — the same split
 * as `theme/breakpoint.ts` and `primitives/touchTarget.ts`.
 */

/**
 * Compose the sentence a screen reader should announce for a status surface.
 *
 * Web relies on `aria-atomic="true"` to have the whole region re-read when any
 * part changes, so the announcement is heading and description together. iOS
 * has no live-region concept at all and must be told the exact string, so it
 * is built here rather than left to the platform.
 *
 * Returns `undefined` when there is nothing worth announcing, so callers can
 * skip the announcement entirely instead of interrupting the user with silence.
 *
 * ```
 * buildAnnouncement('Saved', 'Your changes are live')  -> 'Saved. Your changes are live'
 * buildAnnouncement('Saved', undefined)                -> 'Saved'
 * buildAnnouncement(undefined, 'Your changes are live')-> 'Your changes are live'
 * buildAnnouncement(undefined, undefined)              -> undefined
 * ```
 */
export function buildAnnouncement(
    heading?: string,
    description?: string
): string | undefined {
    const parts = [heading, description]
        .map((part) => part?.trim())
        .filter((part): part is string => Boolean(part))

    if (parts.length === 0) return undefined
    if (parts.length === 1) return parts[0]

    // Punctuate between the two so the reader pauses rather than running the
    // heading into the description as one sentence.
    const [head, rest] = parts
    return /[.!?:]$/.test(head) ? `${head} ${rest}` : `${head}. ${rest}`
}
