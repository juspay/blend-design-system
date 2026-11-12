/**
 * The aggregate catalog.
 *
 * This module exists for exactly three things: the published key catalog that
 * consumers write translation files against, `createTranslator`'s override
 * type, and the coverage test.
 *
 * **Components must never import it.** Pulling the aggregate into a component
 * chunk makes every fragment reachable from it, so a consumer who renders one
 * component ships every component's strings. A lint rule enforces this; it is
 * load-bearing rather than stylistic.
 *
 * It also does not re-export the fragments, which would make importing one
 * through here look legitimate while having the same effect.
 */

import { COMMON_MESSAGES } from './common.messages'
import { TIME_PICKER_MESSAGES } from './timePicker.messages'
import { UPLOAD_MESSAGES } from './upload.messages'
import { DATE_RANGE_PICKER_MESSAGES } from './dateRangePicker.messages'
import { UPLOAD_V2_MESSAGES } from './uploadV2.messages'

/**
 * Spreading `as const` fragments preserves every key and value literal, so
 * `BlendMessageKey` is exact and a typo at a call site is a compile error.
 *
 * A key defined in two fragments would be silently resolved by spread order,
 * so `__tests__/i18n/catalog.test.ts` asserts the key counts add up.
 */
export const BLEND_MESSAGES = {
    ...COMMON_MESSAGES,
    ...UPLOAD_MESSAGES,
    ...UPLOAD_V2_MESSAGES,
    ...DATE_RANGE_PICKER_MESSAGES,
    ...TIME_PICKER_MESSAGES,
} as const

/**
 * Every message key Blend ships.
 *
 * Keys are flat and dot-delimited precisely so this is the literal union
 * directly, with no recursive path-extraction helper.
 */
export type BlendMessageKey = keyof typeof BLEND_MESSAGES

/** A partial dictionary, as passed to `createTranslator`. */
export type BlendMessageOverrides = Partial<Record<BlendMessageKey, string>>
