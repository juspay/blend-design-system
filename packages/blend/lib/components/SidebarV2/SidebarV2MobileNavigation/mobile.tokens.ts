import type { CSSObject } from 'styled-components'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { type FoundationTokenType } from '../../../tokens/theme.token'

export type MobileNavigationV2State = 'default' | 'active'

export type MobileNavigationV2TokenType = {
    /**
     * MobileNavigationV2 anatomy
     * - container: floating dock surface
     * - row: a horizontal strip of items (primary and optional secondary rows)
     * - item: each navigation button
     * - primaryAction: optional center primary action button
     */
    backgroundColor: CSSObject['backgroundColor']
    drawerBorderRadius: CSSObject['borderRadius']
    drawerBorderTop: CSSObject['borderTop']
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
    foundationToken: FoundationTokenType
): ResponsiveMobileNavigationV2Tokens => {
    const baseTokens: MobileNavigationV2TokenType = {
        backgroundColor: foundationToken.colors.gray[0],
        drawerBorderRadius: foundationToken.border.radius[24],
        drawerBorderTop: `1px solid ${foundationToken.colors.gray[200]}`,
        safeAreaOffset: foundationToken.unit[8],
        floatingPadding: foundationToken.unit[16],
        primaryActionMarginX: foundationToken.unit[14],
        itemLabelMarginTop: foundationToken.unit[2],
        itemLabelLineHeight: '1',
        paddingTop: foundationToken.unit[4],
        paddingBottom: foundationToken.unit[4],
        paddingLeft: foundationToken.unit[24],
        paddingRight: foundationToken.unit[24],
        gap: foundationToken.unit[12],
        rowPaddingTop: foundationToken.unit[12],
        rowPaddingBottom: foundationToken.unit[12],
        rowPaddingLeft: foundationToken.unit[0],
        rowPaddingRight: foundationToken.unit[0],
        rowGap: foundationToken.unit[10],
        item: {
            width: foundationToken.unit[56],
            height: foundationToken.unit[48],
            borderRadius: foundationToken.border.radius[24],
            gap: foundationToken.unit[4],
            backgroundColor: {
                default: 'transparent',
                active: 'transparent',
            },
            color: {
                default: foundationToken.colors.gray[400],
                active: foundationToken.colors.gray[800],
            },
            fontWeight: foundationToken.font.weight[500],
            icon: {
                width: foundationToken.unit[20],
                height: foundationToken.unit[20],
                borderRadius: foundationToken.border.radius[12],
                transition: 'color 0.2s ease',
            },
            text: {
                fontSize: foundationToken.font.size.body.sm.fontSize,
                fontWeight: foundationToken.font.weight[400],
                textAlign: 'center',
            },
        },
        rowPrimaryAction: {
            width: foundationToken.unit[48],
            height: foundationToken.unit[48],
            borderRadius: foundationToken.border.radius[28],
            background: `linear-gradient(135deg, ${foundationToken.colors.primary[400]} 0%, ${foundationToken.colors.primary[600]} 100%)`,
            boxShadow: foundationToken.shadows['2xl'],
            color: foundationToken.colors.gray[0],
            icon: {
                width: '24px',
                height: '24px',
            },
        },
    }

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
