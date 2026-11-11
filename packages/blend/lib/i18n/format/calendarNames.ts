/**
 * Localized month and weekday tables, built from `Intl` rather than hardcoded.
 *
 * Replaces three independent English tables that had drifted apart:
 * `DateRangePicker/utils.ts`'s month names and its Monday-first
 * `['Mo','Tu',…]` weekdays, and `Charts/DateTimeFormatter.ts`'s own month and
 * weekday arrays. One picker could already show a translated month in its
 * trigger and an English month in its grid.
 *
 * Pure: no React, no DOM. `locale` is always an explicit argument — these
 * modules never read context, which is what lets `@juspay/blend-native` and
 * the `./node` entry share this implementation.
 */

import { DEFAULT_FIRST_DAY_OF_WEEK } from '../constants'
import type { BlendFirstDayOfWeek, BlendLocale } from '../types'
import { getDateTimeFormat } from './formatterCache'

/**
 * Mid-month UTC instants, one per month. Mid-month (the 15th) so no timezone
 * or calendar rounding can slide a date into a neighbouring month.
 */
const MONTH_REFERENCE = Array.from(
    { length: 12 },
    (_, month) => new Date(Date.UTC(2021, month, 15))
)

/**
 * Seven consecutive UTC days starting on a Sunday (2021-08-01 was a Sunday),
 * so `WEEKDAY_REFERENCE[i]` is weekday `i` in Blend's `0` = Sunday numbering.
 */
const WEEKDAY_REFERENCE = Array.from(
    { length: 7 },
    (_, offset) => new Date(Date.UTC(2021, 7, 1 + offset))
)

const monthCache = new Map<string, readonly string[]>()
const weekdayCache = new Map<string, readonly string[]>()

/**
 * Frozen before caching: these arrays are shared across every caller, so one
 * caller's in-place `.sort()` or `.reverse()` would poison every later read.
 */
const freeze = (values: string[]): readonly string[] => Object.freeze(values)

/** January-first month names for `locale`. */
export const getMonthNames = (
    locale: BlendLocale,
    width: 'long' | 'short' = 'long'
): readonly string[] => {
    const cacheKey = `${locale}|${width}`
    const hit = monthCache.get(cacheKey)
    if (hit !== undefined) return hit

    const formatter = getDateTimeFormat(
        locale,
        width === 'long' ? 'month-long' : 'month-short'
    )
    const names = freeze(MONTH_REFERENCE.map((date) => formatter.format(date)))

    monthCache.set(cacheKey, names)
    return names
}

/**
 * Weekday names for `locale`, rotated so index 0 is `firstDayOfWeek`.
 *
 * `width` defaults to `'short'` rather than `'narrow'`: narrow collides in
 * English (T/T, S/S). Note the visual consequence — the old hardcoded table
 * returned two-letter `'Mo'` while `'short'` yields `'Mon'`, so calendar
 * weekday columns get wider. Do not truncate the result to two characters to
 * compensate; that mangles CJK and Cyrillic.
 */
export const getWeekdayNames = (
    locale: BlendLocale,
    width: 'long' | 'short' | 'narrow' = 'short',
    firstDayOfWeek: BlendFirstDayOfWeek = DEFAULT_FIRST_DAY_OF_WEEK
): readonly string[] => {
    const cacheKey = `${locale}|${width}|${firstDayOfWeek}`
    const hit = weekdayCache.get(cacheKey)
    if (hit !== undefined) return hit

    const preset =
        width === 'long'
            ? 'weekday-long'
            : width === 'narrow'
              ? 'weekday-narrow'
              : 'weekday-short'

    const formatter = getDateTimeFormat(locale, preset)
    const sundayFirst = WEEKDAY_REFERENCE.map((date) => formatter.format(date))

    const names = freeze([
        ...sundayFirst.slice(firstDayOfWeek),
        ...sundayFirst.slice(0, firstDayOfWeek),
    ])

    weekdayCache.set(cacheKey, names)
    return names
}

/**
 * Test seam, paired with `resetFormatterCache`.
 *
 * @internal
 */
export const resetCalendarNameCache = (): void => {
    monthCache.clear()
    weekdayCache.clear()
}
