import type { CSSObject } from 'styled-components'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { type FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getMobileNavigationV2LightTokens } from './mobile.light.tokens'
import { getMobileNavigationV2DarkTokens } from './mobile.dark.tokens'

export type MobileNavigationV2State = 'default' | 'active'

export type MobileNavigationV2TokenType = {
    /**
     * MobileNavigationV2 anatomy
     * - container: floating dock surface
     * - layout: padding/gaps/safe-area offsets used for height calculations
     * - row: a horizontal strip of items (primary and optional secondary rows)
     * - item: each navigation button
     * - primaryAction: optional center primary action button
     */
    container: {
        zIndex: CSSObject['zIndex']
        backgroundColor: CSSObject['backgroundColor']
        opacity: CSSObject['opacity']
        border: CSSObject['border']
        borderWidth: CSSObject['borderWidth']
        borderRadius: CSSObject['borderRadius']
        backdropFilter: CSSObject['backdropFilter']
        transition: CSSObject['transition']
    }
    layout: {
        safeAreaOffset: CSSObject['padding']
        floatingPadding: CSSObject['padding']
        primaryActionMarginX: CSSObject['margin']
        itemLabelMarginTop: CSSObject['margin']
        itemLabelLineHeight: CSSObject['lineHeight']
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        paddingRight: CSSObject['paddingRight']
        gap: CSSObject['gap']
        rowPaddingTop: CSSObject['paddingTop']
        rowPaddingBottom: CSSObject['paddingBottom']
        rowPaddingLeft: CSSObject['paddingLeft']
        rowPaddingRight: CSSObject['paddingRight']
        rowGap: CSSObject['gap']
    }
    item: {
        width: CSSObject['width']
        height: CSSObject['height']
        borderRadius: CSSObject['borderRadius']
        gap: CSSObject['gap']
        backgroundColor: {
            [key in MobileNavigationV2State]: CSSObject['backgroundColor']
        }
        color: { [key in MobileNavigationV2State]: CSSObject['color'] }
        fontWeight: CSSObject['fontWeight']
        icon: {
            width: CSSObject['width']
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
            transition: CSSObject['transition']
        }
        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            textAlign: CSSObject['textAlign']
        }
    }
    rowPrimaryAction: {
        width: CSSObject['width']
        height: CSSObject['height']
        borderRadius: CSSObject['borderRadius']
        background: CSSObject['background']
        boxShadow: CSSObject['boxShadow']
        color: CSSObject['color']
        icon: { width: CSSObject['width']; height: CSSObject['height'] }
    }
}

export type ResponsiveMobileNavigationV2Tokens = {
    [key in keyof BreakpointType]: MobileNavigationV2TokenType
}

export const getMobileNavigationV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveMobileNavigationV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getMobileNavigationV2DarkTokens(foundationToken)
    }
    return getMobileNavigationV2LightTokens(foundationToken)
}
