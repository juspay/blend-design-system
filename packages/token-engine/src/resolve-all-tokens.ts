/**
 * Resolve All V2 Component Tokens
 *
 * Takes a (possibly brand-modified) FoundationTokenType and a theme,
 * then calls every V2 component's getXXXTokens() function to produce
 * the full ComponentTokenType object.
 *
 * This is the expansion step:
 *   ~20-line BrandConfig → ~10,000+ token values across all components
 *
 * IMPORTANT: This module should only be used in client-side code or CLI.
 * Do not import in Next.js API routes as it pulls in React components.
 */

import {
    Theme,
    getButtonV2Tokens,
    getAccordionV2Tokens,
    getAlertV2Tokens,
    getAvatarV2Tokens,
    getBreadcrumbV2Tokens,
    getChartV2Tokens,
    getCheckboxV2Tokens,
    getCodeEditorV2Tokens,
    getKeyValuePairV2Tokens,
    getMenuV2Tokens,
    getMultiSelectV2Tokens,
    getPopoverV2Tokens,
    getProgressBarV2Tokens,
    getRadioV2Tokens,
    getSingleSelectV2Tokens,
    getSwitchV2Tokens,
    getSnackbarV2Tokens,
    getStatCardV2Tokens,
    getTabsV2Tokens,
    getTagV2Tokens,
    getTextInputV2Tokens,
    getTimelineTokens,
    getTooltipV2Tokens,
    getTopbarTokens,
    getSidebarTokens,
    getMobileNavigationTokens,
} from '@juspay/blend-design-system/node'
import type { FoundationTokenType } from '@juspay/blend-design-system/node'

const V2_RESOLVERS: Record<
    string,
    (foundation: FoundationTokenType, theme: Theme | string) => unknown
> = {
    BUTTONV2: getButtonV2Tokens,
    ACCORDIONV2: getAccordionV2Tokens,
    ALERTV2: getAlertV2Tokens,
    AVATARV2: getAvatarV2Tokens,
    BREADCRUMBV2: getBreadcrumbV2Tokens,
    CHARTSV2: getChartV2Tokens,
    CHECKBOXV2: getCheckboxV2Tokens,
    CODEEDITORV2: getCodeEditorV2Tokens,
    KEYVALUEPAIRV2: getKeyValuePairV2Tokens,
    MENU_V2: getMenuV2Tokens,
    MULTI_SELECT_V2: getMultiSelectV2Tokens,
    POPOVERV2: getPopoverV2Tokens,
    PROGRESS_BARV2: getProgressBarV2Tokens,
    RADIOV2: getRadioV2Tokens,
    SINGLE_SELECT_V2: getSingleSelectV2Tokens,
    SWITCHV2: getSwitchV2Tokens,
    SNACKBARV2: getSnackbarV2Tokens,
    STATCARDV2: getStatCardV2Tokens,
    TABSV2: getTabsV2Tokens,
    TAGV2: getTagV2Tokens,
    TEXT_INPUTV2: getTextInputV2Tokens,
    TIMELINE: getTimelineTokens,
    TOOLTIPV2: getTooltipV2Tokens,
    TOPBARV2: getTopbarTokens,
    SIDEBARV2: getSidebarTokens,
    MOBILE_NAVIGATION_V2: getMobileNavigationTokens,
}

export function resolveAllTokens(
    foundation: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): Record<string, unknown> {
    const tokens: Record<string, unknown> = {}

    for (const [key, resolver] of Object.entries(V2_RESOLVERS)) {
        tokens[key] = resolver(foundation, theme)
    }

    return tokens
}

/**
 * Resolve tokens for a single component.
 * Used by component-level overrides to re-resolve just the affected component.
 *
 * @returns The resolved tokens for the component, or undefined if the key is not found.
 */
export function resolveComponentTokens(
    componentKey: string,
    foundation: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): unknown | undefined {
    const resolver = V2_RESOLVERS[componentKey]
    if (!resolver) return undefined
    return resolver(foundation, theme)
}

export const V2_COMPONENT_KEYS = Object.keys(V2_RESOLVERS)
