import type { AlertV2TokensType } from '@juspay/blend-design-system/node'

/**
 * Named aliases for AlertV2's deeply-nested token paths.
 *
 * The raw paths run five levels deep
 * (`mainContainer.content.actionContainer.primaryAction.fontSize`), so spelling
 * them out at each use site buried the prop types. These are type-only and
 * erase completely.
 */

export type AlertTextTokens =
    AlertV2TokensType['mainContainer']['content']['textContainer']

export type AlertActionTokens =
    AlertV2TokensType['mainContainer']['content']['actionContainer']

export type AlertCloseTokens = AlertV2TokensType['mainContainer']['closeButton']

/** One action's typography and per-type colour map. */
export type AlertActionVariantTokens = AlertActionTokens['primaryAction']

/** The shape shared by the heading and description token groups. */
export type AlertTextVariantTokens = AlertTextTokens['heading']
