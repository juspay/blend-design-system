/**
 * Public i18n contract.
 *
 * Types only, zero imports — this is the leaf every other i18n module and
 * every migrated component depends on. Keeping it import-free is what lets
 * `lib/node.ts` (the React-free, CSS-free entry) re-export these for
 * `@juspay/blend-design-system/node` consumers such as `@juspay/blend-native`.
 *
 * Shape constraints are deliberate: the consumer does not use Blend directly,
 * they use `@juspay/rescript-blend`, generated from Blend's shipped `.d.ts` by
 * `@juspay/rescript-bindgen`. Scalars and `string => string` functions bind
 * cleanly; nested object props become unstable generated record names at every
 * call site, and `string | ReactNode` degrades to an awkward unboxed variant.
 * So: scalars and one function, never a nested options object.
 */

/** A BCP 47 language tag, e.g. `'en-US'`, `'fr-FR'`, `'ja-JP'`. */
export type BlendLocale = string

/**
 * Translation lookup supplied by the consumer.
 *
 * Returning `undefined`, `''`, or the key itself all count as a miss, and
 * Blend falls back to its own English default. The three-form miss test exists
 * because i18n libraries disagree on what they return for an unknown key —
 * without it, a consumer whose `t` echoes unknown keys would ship raw
 * `upload-v2.action.browse-files` text to users.
 *
 * `vars` values are pre-stringified by the caller (numbers run through
 * `Intl.NumberFormat` first), so this stays `string => string`.
 */
export type BlendTranslate = (
    key: string,
    vars?: Record<string, string>
) => string | undefined

/**
 * First day of the week, `0` = Sunday through `6` = Saturday.
 *
 * NOT the CLDR numbering. `Intl`'s `weekInfo.firstDay` is `1`–`7` with
 * `7` = Sunday; `resolveFirstDayOfWeek` converts. Mixing the two renders every
 * Sunday-first locale as Saturday-first.
 */
export type BlendFirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

/**
 * The materialised i18n context value.
 *
 * `translate` is present-but-`undefined` when no provider is mounted, which
 * the resolver reads as "use the English default". This mirrors the technique
 * `ThemeContext.tsx` uses for its own `createContext` default.
 */
export type BlendI18nValue = {
    locale: BlendLocale
    translate: BlendTranslate | undefined
    firstDayOfWeek: BlendFirstDayOfWeek
}

/**
 * What a pure, hook-free utility accepts as its optional i18n argument.
 *
 * `BlendI18nValue` is assignable to this, so a component can forward the
 * context value straight through. Used by public React-free helpers such as
 * `getPresetLabel`, which are called from non-React code and therefore cannot
 * become hooks.
 */
export type BlendI18nHandle = {
    locale: BlendLocale
    translate?: BlendTranslate
}

/**
 * One catalog fragment: a flat map of dotted keys to English defaults.
 *
 * Flat, not nested, precisely so `keyof typeof FRAGMENT` is the literal key
 * union directly and no recursive path-extraction helper is needed.
 */
export type MessageFragment = Readonly<Record<string, string>>

/**
 * CLDR plural categories.
 *
 * Declared locally rather than relying on `Intl.LDMLPluralRule` being present
 * in the configured TypeScript `lib` set.
 */
export type PluralCategory = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other'
