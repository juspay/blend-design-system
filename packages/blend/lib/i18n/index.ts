/**
 * The public i18n surface, re-exported from `lib/main.ts`.
 *
 * Kept deliberately small: the ReScript binding generator reads every shipped
 * export, so each name here is a name it has to bind. The `Intl` formatter
 * getters and the plural selector are internal plumbing and ship only from
 * `lib/node.ts`, for `@juspay/blend-native`.
 *
 * Components do **not** import this barrel — it reaches the aggregate catalog
 * through `createTranslator`. They import `lib/i18n/useMessages` and their own
 * fragment by concrete path. A lint rule enforces that.
 */

export { default as I18nContext, useI18n } from './I18nContext'
export { useMessages } from './useMessages'
export type { UseMessagesResult } from './useMessages'
export { createTranslator } from './createTranslator'
export { resolveMessage, resetI18nWarnings } from './resolve'
export type { ResolveOptions } from './resolve'
export { interpolate } from './interpolate'
export { resolveFirstDayOfWeek } from './firstDayOfWeek'
export {
    DEFAULT_LOCALE,
    DEFAULT_FIRST_DAY_OF_WEEK,
    MESSAGE_GROUPS,
} from './constants'
export type { MessageGroup } from './constants'
export { getMonthNames, getWeekdayNames } from './format/calendarNames'
export { BLEND_MESSAGES } from './catalog'
export type { BlendMessageKey, BlendMessageOverrides } from './catalog'
export type {
    BlendFirstDayOfWeek,
    BlendI18nHandle,
    BlendI18nValue,
    BlendLocale,
    BlendTranslate,
    MessageFragment,
    PluralCategory,
} from './types'
