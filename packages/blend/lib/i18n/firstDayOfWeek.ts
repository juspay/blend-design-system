/**
 * Opt-in CLDR first-day-of-week derivation.
 *
 * `ThemeProvider` never calls this. `Intl.Locale.prototype.getWeekInfo()` is
 * unavailable in Firefox and older Safari/JSC, so deriving the value by
 * default would make identical props render differently per browser. Blend
 * defaults to Monday and exposes this for consumers who explicitly want CLDR
 * behaviour and accept the variance.
 *
 * Pure: no React, no DOM.
 */

import { DEFAULT_FIRST_DAY_OF_WEEK } from './constants'
import type { BlendFirstDayOfWeek, BlendLocale } from './types'

/**
 * `Intl.Locale` gained `weekInfo` as an accessor in some engines before the
 * `getWeekInfo()` method was standardised, so both are probed.
 */
type WeekInfoCapable = Intl.Locale & {
    getWeekInfo?: () => { firstDay: number }
    weekInfo?: { firstDay: number }
}

/**
 * Best-effort first day of week for `locale`, or Monday when the runtime has
 * no week data.
 *
 * Converts CLDR's numbering to Blend's. CLDR uses `1`–`7` with `7` = Sunday;
 * Blend uses `0`–`6` with `0` = Sunday. Skipping the conversion renders every
 * Sunday-first locale as Saturday-first.
 */
export const resolveFirstDayOfWeek = (
    locale: BlendLocale
): BlendFirstDayOfWeek => {
    try {
        const resolved = new Intl.Locale(locale) as WeekInfoCapable
        const firstDay =
            resolved.getWeekInfo?.().firstDay ?? resolved.weekInfo?.firstDay

        if (typeof firstDay !== 'number') return DEFAULT_FIRST_DAY_OF_WEEK
        if (firstDay < 1 || firstDay > 7) return DEFAULT_FIRST_DAY_OF_WEEK

        return (firstDay === 7 ? 0 : firstDay) as BlendFirstDayOfWeek
    } catch {
        return DEFAULT_FIRST_DAY_OF_WEEK
    }
}

export default resolveFirstDayOfWeek
