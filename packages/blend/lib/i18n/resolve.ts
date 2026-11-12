/**
 * The three-tier string resolver.
 *
 * Tier 1 (an explicit component prop) is handled at the call site — see
 * `useMessages`' `pick`. This module covers tiers 2 and 3:
 *
 * 2. the consumer's `translate`, if it returned something usable;
 * 3. Blend's own English default, from the component's catalog fragment.
 *
 * Pure: no React, no DOM, so public React-free helpers such as
 * `getPresetLabel` can call it directly instead of becoming hooks.
 */

import { interpolate } from './interpolate'
import type { BlendTranslate, MessageFragment } from './types'

const warned = new Set<string>()

const warnOnce = (dedupeKey: string, message: string): void => {
    if (warned.has(dedupeKey)) return
    warned.add(dedupeKey)
    console.warn(message)
}

/**
 * Test seam, so a suite can assert a warning fires rather than depending on
 * test order.
 *
 * @internal
 */
export const resetI18nWarnings = (): void => warned.clear()

export type ResolveOptions = {
    vars?: Record<string, string>
    translate?: BlendTranslate
}

/**
 * i18n libraries disagree on what they return for an unknown key: some give
 * `undefined`, some `''`, some echo the key back. All three mean "I don't have
 * this", so all three fall through to Blend's default. Without the key-echo
 * rule, a consumer whose `t` echoes would ship raw
 * `upload-v2.action.browse-files` text to users.
 */
const isMiss = (value: string | undefined, key: string): boolean =>
    value === undefined || value === '' || value === key

/**
 * Resolve `key` against the consumer's `translate`, then `fragment`.
 *
 * Always returns a string. On a total miss it returns the key itself, which
 * degrades to a visible token rather than a blank button — and warns once, so
 * the gap is diagnosable.
 */
export const resolveMessage = (
    fragment: MessageFragment,
    key: string,
    options?: ResolveOptions
): string => {
    let translated: string | undefined

    if (options?.translate) {
        // `translate` is consumer code running in React's render phase. An
        // uncaught throw would white-screen the subtree, so a throw is treated
        // as a miss — the same defensive posture `timeCore.ts` takes around a
        // consumer-supplied timezone string.
        try {
            translated = options.translate(key, options.vars)
        } catch (error) {
            warnOnce(
                `throw:${key}`,
                `[Blend] The translate function threw for key "${key}" — falling back to the English default. ${String(error)}`
            )
            translated = undefined
        }
    }

    const raw = isMiss(translated, key) ? fragment[key] : translated

    if (raw === undefined) {
        warnOnce(
            `missing:${key}`,
            `[Blend] No message found for key "${key}". Rendering the key itself.`
        )
        return key
    }

    // Runs over a translated string and an English default alike. A `translate`
    // that ignored `vars` still gets its placeholders filled, and an
    // ICU-capable one that already substituted is unaffected, because no
    // placeholder remains for this pass to find.
    return interpolate(raw, options?.vars)
}

export default resolveMessage
