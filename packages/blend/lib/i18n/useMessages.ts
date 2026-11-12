/**
 * The hook components use to resolve their own strings.
 *
 * Lives beside the context it reads rather than in `lib/hooks/`: that barrel
 * imports `../context/ShadowAware`, so it is not a leaf, and it is exported
 * from neither build entry.
 *
 * Components import this module and their own catalog fragment by concrete
 * path, never through `lib/i18n/index.ts` or `lib/i18n/catalog/index.ts` —
 * the aggregate makes every fragment reachable from the importing chunk and
 * destroys the per-component tree-shaking. A lint rule enforces it.
 */

import { useMemo } from 'react'
import { getNumberFormat } from './format/formatterCache'
import { useI18n } from './I18nContext'
import { selectPluralCategory } from './plural'
import { resolveMessage } from './resolve'
import type {
    BlendFirstDayOfWeek,
    BlendI18nValue,
    BlendLocale,
    BlendTranslate,
    MessageFragment,
} from './types'

/**
 * The base keys of the plural pairs a fragment declares.
 *
 * A fragment must declare `.other` — it is the fallback for every CLDR
 * category the English catalog has nothing better to offer for. `.one` is
 * optional. So a key with no `.other` sibling is not a legal `mp` argument,
 * and passing one is a compile error rather than a runtime surprise.
 */
type PluralBaseKey<F> = {
    [K in keyof F & string]: K extends `${infer Base}.other` ? Base : never
}[keyof F & string]

export type UseMessagesResult<F extends MessageFragment> = {
    /** Resolve a key. A typo is a compile error. */
    m: <K extends keyof F & string>(
        key: K,
        vars?: Record<string, string>
    ) => string
    /**
     * Resolve a pluralized key by `count`, which is injected as `{count}`
     * already formatted for the locale.
     */
    mp: <K extends PluralBaseKey<F>>(
        key: K,
        count: number,
        vars?: Record<string, string>
    ) => string
    /**
     * Tier 1 then tiers 2–3: return `override` when the consumer passed one,
     * otherwise resolve `key`.
     */
    pick: <K extends keyof F & string>(
        override: string | undefined,
        key: K,
        vars?: Record<string, string>
    ) => string
    /** The context value, forwardable straight into a pure utility. */
    i18n: BlendI18nValue
    locale: BlendLocale
    firstDayOfWeek: BlendFirstDayOfWeek
    translate: BlendTranslate | undefined
}

/**
 * Bind a catalog fragment to the active locale and translate function.
 *
 * ```tsx
 * const { m, pick } = useMessages(UPLOAD_V2_MESSAGES)
 * <ButtonV2 text={pick(browseFilesText, 'upload-v2.action.browse-files')} />
 * ```
 *
 * `F` is inferred as the fragment's literal object type, so `keyof F & string`
 * is a literal union of its keys and a mistyped key fails inference with the
 * offending key named in the error.
 */
export const useMessages = <F extends MessageFragment>(
    fragment: F
): UseMessagesResult<F> => {
    const value = useI18n()
    const { locale, translate, firstDayOfWeek } = value

    return useMemo(() => {
        const m = (key: string, vars?: Record<string, string>): string =>
            resolveMessage(fragment, key, { vars, translate })

        const mp = (
            key: string,
            count: number,
            vars?: Record<string, string>
        ): string => {
            const category = selectPluralCategory(locale, count)

            // `count` is stringified here, which is what keeps the dictionary
            // `string => string` and leaves the ReScript generator no union to
            // degrade. A caller-supplied `count` wins, so a component that has
            // already formatted it its own way is not overridden.
            const merged = {
                count: getNumberFormat(locale, 'integer').format(count),
                ...vars,
            }

            // Only ask for the category-suffixed key when the English fragment
            // actually declares it. Otherwise a non-English category such as
            // `few` would miss both tiers and render the raw key; `.other` is
            // the honest fallback, because the English catalog has nothing
            // better for that category.
            const categoryKey = `${key}.${category}`
            return categoryKey in fragment
                ? resolveMessage(fragment, categoryKey, {
                      vars: merged,
                      translate,
                  })
                : resolveMessage(fragment, `${key}.other`, {
                      vars: merged,
                      translate,
                  })
        }

        // Tests `!== undefined`, not truthiness. An empty string is a
        // legitimate "render no label here", and `||` would discard it and
        // fall through to the English default instead.
        const pick = (
            override: string | undefined,
            key: string,
            vars?: Record<string, string>
        ): string => (override !== undefined ? override : m(key, vars))

        return {
            m,
            mp,
            pick,
            i18n: value,
            locale,
            firstDayOfWeek,
            translate,
        }
    }, [
        fragment,
        value,
        locale,
        translate,
        firstDayOfWeek,
    ]) as UseMessagesResult<F>
}

export default useMessages
