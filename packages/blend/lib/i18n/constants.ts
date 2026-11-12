/**
 * i18n defaults and the closed key vocabulary. Zero imports.
 */

/**
 * The default locale, as an explicit string — never `undefined`.
 *
 * This is the whole backward-compatibility story. Leaving it `undefined` lets
 * `Intl` fall through to the host machine locale, which would silently change
 * rendered dates and numbers for every existing consumer who never sets a
 * locale. With an explicit default, the visual diff for current users is zero.
 */
export const DEFAULT_LOCALE = 'en-US'

/**
 * Monday, and deliberately not locale-derived.
 *
 * `Intl.Locale.prototype.getWeekInfo()` is unavailable in Firefox and older
 * Safari/JSC, so deriving this by default would make identical props render
 * differently per browser. Consumers who want CLDR behaviour opt in with
 * `resolveFirstDayOfWeek(locale)`.
 */
export const DEFAULT_FIRST_DAY_OF_WEEK = 1 as const

/**
 * The closed `group` vocabulary for message keys
 * (`{component}.{group}.{item}`).
 *
 * Reserving `a11y` is what makes "which accessible names are localized yet"
 * a one-line grep. Enforced by `__tests__/i18n/catalog.test.ts`.
 */
export const MESSAGE_GROUPS = [
    'action',
    'label',
    'placeholder',
    'status',
    'empty',
    'error',
    'preset',
    'unit',
    'a11y',
] as const

export type MessageGroup = (typeof MESSAGE_GROUPS)[number]
