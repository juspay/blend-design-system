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
 * The returned object is ready to pass to <ThemeProvider componentTokens={...}>
 */

import type { FoundationTokenType } from '@juspay/blend-design-system/lib/tokens/theme.token'
import type { ComponentTokenType } from '@juspay/blend-design-system/lib/context/ThemeContext'
import { Theme } from '@juspay/blend-design-system/lib/context/theme.enum'

// ---------------------------------------------------------------------------
// V2 component token factory imports
// Each function: (foundation, theme) → { sm: tokens, lg: tokens }
// ---------------------------------------------------------------------------

import { getButtonV2Tokens } from '@juspay/blend-design-system/lib/components/ButtonV2/buttonV2.tokens'
import { getAccordionV2Tokens } from '@juspay/blend-design-system/lib/components/AccordionV2/accordionV2.tokens'
import { getAlertV2Tokens } from '@juspay/blend-design-system/lib/components/AlertV2/alertV2.tokens'
import { getAvatarV2Tokens } from '@juspay/blend-design-system/lib/components/AvatarV2/avatarV2.tokens'
import { getBreadcrumbV2Tokens } from '@juspay/blend-design-system/lib/components/BreadcrumbV2/breadcrumbV2.tokens'
import { getChartV2Tokens } from '@juspay/blend-design-system/lib/components/ChartsV2/chartV2.tokens'
import { getCheckboxV2Tokens } from '@juspay/blend-design-system/lib/components/SelectorV2/CheckboxV2/checkboxV2.tokens'
import { getCodeEditorV2Tokens } from '@juspay/blend-design-system/lib/components/CodeEditorV2/codeEditorV2.tokens'
import { getKeyValuePairV2Tokens } from '@juspay/blend-design-system/lib/components/KeyValuePairV2/keyValuePairV2.tokens'
import { getMenuV2Tokens } from '@juspay/blend-design-system/lib/components/MenuV2/menuV2.tokens'
import { getMultiSelectV2Tokens } from '@juspay/blend-design-system/lib/components/MultiSelectV2/multiSelectV2.tokens'
import { getPopoverV2Tokens } from '@juspay/blend-design-system/lib/components/PopoverV2/popoverV2.token'
import { getProgressBarV2Tokens } from '@juspay/blend-design-system/lib/components/ProgressBarV2/progressBarV2.tokens'
import { getRadioV2Tokens } from '@juspay/blend-design-system/lib/components/SelectorV2/RadioV2/radioV2.tokens'
import { getSingleSelectV2Tokens } from '@juspay/blend-design-system/lib/components/SingleSelectV2/singleSelectV2.tokens'
import { getSwitchV2Tokens } from '@juspay/blend-design-system/lib/components/SelectorV2/SwitchV2/switchV2.tokens'
import { getSnackbarV2Tokens } from '@juspay/blend-design-system/lib/components/SnackbarV2/snackbarV2.tokens'
import { getStatCardV2Tokens } from '@juspay/blend-design-system/lib/components/StatCardV2/statcardV2.tokens'
import { getTabsV2Tokens } from '@juspay/blend-design-system/lib/components/TabsV2/tabsV2.tokens'
import { getTagV2Tokens } from '@juspay/blend-design-system/lib/components/TagV2/tagV2.tokens'
import { getTextInputV2Tokens } from '@juspay/blend-design-system/lib/components/InputsV2/TextInputV2/TextInputV2.tokens'
import { getTimelineTokens } from '@juspay/blend-design-system/lib/components/Timeline/timeline.token'
import { getTooltipV2Tokens } from '@juspay/blend-design-system/lib/components/TooltipV2/tooltipV2.tokens'

/**
 * Registry of all V2 component token resolvers.
 *
 * Each entry maps a ComponentTokenType key to its factory function.
 * Adding a new V2 component requires only one line here.
 */
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
}

/**
 * Resolve all V2 component tokens from a foundation + theme.
 *
 * Returns a partial ComponentTokenType — only V2 keys are set.
 * V1 components fall back to defaults via ThemeProvider's initComponentTokens.
 */
export function resolveAllTokens(
    foundation: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ComponentTokenType {
    const tokens: Record<string, unknown> = {}

    for (const [key, resolver] of Object.entries(V2_RESOLVERS)) {
        tokens[key] = resolver(foundation, theme)
    }

    return tokens as ComponentTokenType
}

/** List of all V2 component keys the engine resolves. */
export const V2_COMPONENT_KEYS = Object.keys(V2_RESOLVERS)
