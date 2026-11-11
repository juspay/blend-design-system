/**
 * The i18n context.
 *
 * Deliberately separate from `ThemeContext`. `ThemeProvider`'s
 * `themeContextValue` memo feeds every `useComponentToken` call site, and
 * `initTokens` memoizes its ~90 token factories by object reference — so a
 * `translate` function that a consumer rebuilds inline on each render would,
 * if it lived in that value, re-render every token consumer and re-run every
 * factory. Keeping i18n in its own context means a changing `translate`
 * re-renders only the components that read strings.
 *
 * `.ts`, not `.tsx`: `createContext` needs no JSX.
 */

import { createContext, useContext } from 'react'
import { DEFAULT_FIRST_DAY_OF_WEEK, DEFAULT_LOCALE } from './constants'
import type { BlendI18nValue } from './types'

/**
 * A fully materialised default, with `translate` present but `undefined`.
 *
 * This is what lets every component work with no `ThemeProvider` mounted,
 * exactly as they do today — the resolver reads an absent `translate` as "use
 * the English default". Same technique `ThemeContext.tsx` uses, though there
 * the default is expensive (it invokes every token factory at module load)
 * while here it is three scalars.
 */
const I18nContext = createContext<BlendI18nValue>({
    locale: DEFAULT_LOCALE,
    translate: undefined,
    firstDayOfWeek: DEFAULT_FIRST_DAY_OF_WEEK,
})

/**
 * Read the active locale, translate function and first day of week.
 *
 * Unlike `useTheme`, this does **not** throw when unprovided: working without
 * a provider is the contract, not an error. (`useTheme`'s `if (!context)
 * throw` is in any case a dead branch, since `createContext` was given a
 * non-null default.)
 */
export const useI18n = (): BlendI18nValue => useContext(I18nContext)

export default I18nContext
