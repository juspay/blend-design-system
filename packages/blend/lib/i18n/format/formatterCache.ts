/**
 * The one place in `lib/` that constructs an `Intl` formatter.
 *
 * Generalises the per-zone cache in `components/shared/datetime/timeCore.ts`,
 * whose comment states the reason: constructing an `Intl.DateTimeFormat` costs
 * ~15x what formatting with one does, and formatters are immutable, so they
 * are worth caching.
 *
 * **Keyed by preset name, never by an options object.** An options-keyed cache
 * grows without bound whenever a caller builds its options inline, and
 * `JSON.stringify(options)` is sensitive to key order, so two equivalent
 * option sets would miss each other. A closed set of named presets fixes both.
 *
 * Centralising construction also means the bad-locale fallback and its
 * warn-once live in exactly one place rather than at every call site.
 *
 * Two sites in `lib/` are deliberately exempt and must stay exempt:
 *
 * - `components/shared/datetime/timeCore.ts` and
 *   `components/DateRangePicker/utils.ts` each build an `'en-US'`,
 *   `hour12: false` formatter whose output is consumed by `formatToParts` to
 *   decompose an instant into numeric parts. They display nothing, and the
 *   `'en-US'` is load-bearing for the part keying — switching them to the
 *   user's locale breaks parsing.
 *
 * Known not-yet-migrated: `components/DataTable/utils.ts` constructs `'en-IN'`
 * formatters directly. Those need a currency-parameterised preset and a
 * behaviour decision about currency vs. locale, so they move separately.
 *
 * Pure: no React, no DOM.
 */

import { DEFAULT_LOCALE } from '../constants'

export type DateTimePresetName =
    | 'month-long'
    | 'month-short'
    | 'weekday-long'
    | 'weekday-short'
    | 'weekday-narrow'
    | 'date-short'
    | 'date-medium'
    | 'date-long'
    | 'date-full'
    | 'time-12h'
    | 'time-24h'

export type NumberPresetName = 'integer' | 'decimal-2' | 'percent' | 'compact'

/**
 * `timeZone: 'UTC'` on the month and weekday presets is mandatory, not
 * tidiness: `calendarNames.ts` formats fixed UTC reference instants to build
 * its tables, and without the pin a machine west of UTC renders month index 0
 * as "December".
 */
const DATE_TIME_PRESETS: Record<
    DateTimePresetName,
    Intl.DateTimeFormatOptions
> = {
    'month-long': { month: 'long', timeZone: 'UTC' },
    'month-short': { month: 'short', timeZone: 'UTC' },
    'weekday-long': { weekday: 'long', timeZone: 'UTC' },
    'weekday-short': { weekday: 'short', timeZone: 'UTC' },
    'weekday-narrow': { weekday: 'narrow', timeZone: 'UTC' },
    'date-short': { dateStyle: 'short' },
    'date-medium': { dateStyle: 'medium' },
    'date-long': { dateStyle: 'long' },
    // Spelled out rather than `dateStyle: 'full'` because it replaces an
    // explicit option bag in an accessible-name template, and `dateStyle`
    // cannot be combined with individual date components.
    //
    // Deliberately NOT pinned to UTC, unlike the month and weekday presets:
    // callers pass dates built with `new Date(year, month, day)`, which are
    // local midnight, and pinning UTC would shift them a day west of UTC.
    'date-full': {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    },
    'time-12h': { hour: 'numeric', minute: '2-digit', hour12: true },
    'time-24h': { hour: '2-digit', minute: '2-digit', hour12: false },
}

const NUMBER_PRESETS: Record<NumberPresetName, Intl.NumberFormatOptions> = {
    integer: { maximumFractionDigits: 0 },
    'decimal-2': { minimumFractionDigits: 2, maximumFractionDigits: 2 },
    percent: { style: 'percent', maximumFractionDigits: 1 },
    compact: { notation: 'compact', maximumFractionDigits: 1 },
}

const dateTimeCache = new Map<string, Intl.DateTimeFormat>()
const numberCache = new Map<string, Intl.NumberFormat>()
const pluralCache = new Map<string, Intl.PluralRules>()
const listCache = new Map<string, ListJoiner>()

const warnedLocales = new Set<string>()
const warnedUnsupported = new Set<string>()

/**
 * Builds and caches, falling back to `DEFAULT_LOCALE` on an unusable tag.
 *
 * `locale` reaches us from a public prop typed `string`, so a typo like
 * `'en_US'` can raise `RangeError`. Every caller runs in React's render phase,
 * so an uncaught throw would white-screen the consumer's subtree — the same
 * hazard `timeCore.ts`'s `zoneFormatter` guards against. Unlike that one, this
 * falls back internally rather than returning `null`, so the warn-once and the
 * fallback exist in a single place.
 */
const build = <T>(
    cache: Map<string, T>,
    cacheKey: string,
    locale: string,
    make: (resolvedLocale: string) => T
): T => {
    const hit = cache.get(cacheKey)
    if (hit !== undefined) return hit

    let value: T
    try {
        value = make(locale)
    } catch {
        if (!warnedLocales.has(locale)) {
            warnedLocales.add(locale)
            console.warn(
                `[Blend] Unknown locale "${locale}" — falling back to "${DEFAULT_LOCALE}".`
            )
        }
        value = make(DEFAULT_LOCALE)
    }

    cache.set(cacheKey, value)
    return value
}

/**
 * Warns once when the runtime has no data for a locale it nonetheless accepts.
 *
 * The SSR hazard here is hydration mismatch, not availability: a small-ICU
 * Node build returns English month names on the server while the browser
 * returns French, producing a hydration warning on every calendar. Reporting
 * it is the difference between a diagnosable problem and a mysterious one.
 */
const warnIfUnsupported = (locale: string): void => {
    if (warnedUnsupported.has(locale)) return
    warnedUnsupported.add(locale)

    try {
        if (Intl.DateTimeFormat.supportedLocalesOf([locale]).length === 0) {
            console.warn(
                `[Blend] This runtime has no date-time data for locale "${locale}" and will fall back to its default. ` +
                    'On the server this usually means a small-ICU build, which can cause a hydration mismatch.'
            )
        }
    } catch {
        // A tag malformed enough to break `supportedLocalesOf` is already
        // reported by `build`'s fallback path.
    }
}

export const getDateTimeFormat = (
    locale: string,
    preset: DateTimePresetName,
    timeZone?: string
): Intl.DateTimeFormat => {
    warnIfUnsupported(locale)

    return build(
        dateTimeCache,
        `${locale}|${preset}|${timeZone ?? ''}`,
        locale,
        (resolved) =>
            new Intl.DateTimeFormat(resolved, {
                ...DATE_TIME_PRESETS[preset],
                ...(timeZone ? { timeZone } : {}),
            })
    )
}

export const getNumberFormat = (
    locale: string,
    preset: NumberPresetName
): Intl.NumberFormat =>
    build(
        numberCache,
        `${locale}|${preset}`,
        locale,
        (resolved) => new Intl.NumberFormat(resolved, NUMBER_PRESETS[preset])
    )

/**
 * Joins fragments of an accessible name in a locale-appropriate way.
 *
 * `type: 'unit'` with `style: 'short'` yields `"a, b, c"` in English, which
 * is exactly what the hand-rolled `', selected'` / `', today'` suffixes
 * produced — so migrating to it keeps English output byte-identical while
 * letting the separator follow the locale.
 *
 * Not `style: 'narrow'`, which joins with a bare space (`"a b c"`), and not
 * `type: 'conjunction'`, which inserts "and".
 *
 * Typed locally because `Intl.ListFormat` is ES2021 and this package compiles
 * against `lib: ["ES2020", …]`. Raising the project's lib target is a wider
 * change than this module should make, and the structural type below is all
 * that is used.
 */
type ListJoiner = { format: (items: string[]) => string }

type ListFormatCapable = {
    ListFormat?: new (
        locale: string,
        options: { style: string; type: string }
    ) => ListJoiner
}

export const getListFormat = (locale: string): ListJoiner =>
    build(listCache, locale, locale, (resolved) => {
        const ctor = (Intl as unknown as ListFormatCapable).ListFormat
        // Universal in current engines, but React Native on Android ships
        // reduced ICU unless the app opts into full ICU, so fall back to the
        // English separator rather than throwing.
        if (!ctor) return { format: (items) => items.join(', ') }
        return new ctor(resolved, { style: 'short', type: 'unit' })
    })

export const getPluralRules = (locale: string): Intl.PluralRules =>
    build(
        pluralCache,
        locale,
        locale,
        (resolved) => new Intl.PluralRules(resolved)
    )

/**
 * Test seam. Clears every cache and the warn-once registries, so a suite can
 * assert the fallback warning fires rather than depending on test order.
 *
 * @internal
 */
export const resetFormatterCache = (): void => {
    dateTimeCache.clear()
    numberCache.clear()
    pluralCache.clear()
    listCache.clear()
    warnedLocales.clear()
    warnedUnsupported.clear()
}
