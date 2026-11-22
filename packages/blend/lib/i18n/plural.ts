/**
 * CLDR plural category selection.
 *
 * Uses `Intl.PluralRules` — correct categories, already in the platform, no
 * dependency. Blend's English fragments declare `.one` and `.other`; a Polish
 * or Arabic translator supplies `.few`, `.many`, `.zero` or `.two` in their own
 * dictionary.
 *
 * Pure: no React, no DOM.
 */

import { getPluralRules } from './format/formatterCache'
import type { BlendLocale, PluralCategory } from './types'

export const selectPluralCategory = (
    locale: BlendLocale,
    count: number
): PluralCategory => getPluralRules(locale).select(count) as PluralCategory

export default selectPluralCategory
