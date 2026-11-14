import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getSidebarV2Tokens } from '../SidebarV2/sidebarV2.tokens'
import type {
    ResponsiveSidebarV2Tokens,
    SidebarV2TokensType,
} from '../SidebarV2/sidebarV2.tokens.types'

export type SidebarV3TokensType = SidebarV2TokensType & {
    frame: {
        stripHeight: CSSObject['height']
        stripPaddingInline: CSSObject['paddingInline']
        stripBackgroundColor: CSSObject['backgroundColor']
        stripColor: CSSObject['color']
        surfaceRadius: CSSObject['borderRadius']
        sidebarBackgroundColor: CSSObject['backgroundColor']
    }
    search: { padding: CSSObject['padding'] }
    merchant: { triggerPaddingInline: CSSObject['paddingInline'] }
    navigation: {
        hoverBackgroundColor: CSSObject['backgroundColor']
        selectedBackgroundColor: CSSObject['backgroundColor']
        selectedColor: CSSObject['color']
        separatorColor: CSSObject['color']
        separatorWidth: CSSObject['width']
        separatorOffset: CSSObject['top']
        guideColor: CSSObject['color']
        guideOffset: CSSObject['left']
        motionDuration: CSSObject['animationDuration']
        feedbackDuration: CSSObject['animationDuration']
        feedbackEasing: CSSObject['animationTimingFunction']
    }
}

export type ResponsiveSidebarV3Tokens = {
    sm: SidebarV3TokensType
    lg: SidebarV3TokensType
}

export const getSidebarV3Tokens = (
    foundation: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSidebarV3Tokens => {
    const base: ResponsiveSidebarV2Tokens = getSidebarV2Tokens(
        foundation,
        theme
    )
    const dark = theme === Theme.DARK || theme === 'dark'
    const create = (tokens: SidebarV2TokensType): SidebarV3TokensType => ({
        ...tokens,
        container: {
            ...tokens.container,
            backgroundColor: dark
                ? foundation.colors.gray[950]
                : foundation.colors.gray[0],
        },
        header: {
            ...tokens.header,
            backgroundColor: dark
                ? foundation.colors.gray[950]
                : foundation.colors.gray[0],
        },
        footer: {
            ...tokens.footer,
            backgroundColor: dark
                ? foundation.colors.gray[950]
                : foundation.colors.gray[0],
        },
        frame: {
            stripHeight: foundation.unit[48],
            stripPaddingInline: foundation.unit[16],
            stripBackgroundColor: foundation.colors.gray[950],
            stripColor: foundation.colors.gray[0],
            surfaceRadius: foundation.border.radius[16],
            sidebarBackgroundColor: dark
                ? foundation.colors.gray[950]
                : '#FCFCFD',
        },
        search: {
            padding: `${foundation.unit[0]} ${foundation.unit[8]} ${foundation.unit[8]}`,
        },
        merchant: { triggerPaddingInline: foundation.unit[8] },
        navigation: {
            hoverBackgroundColor: dark
                ? foundation.colors.gray[800]
                : foundation.colors.gray[100],
            selectedBackgroundColor: dark
                ? foundation.colors.primary[900]
                : foundation.colors.primary[50],
            selectedColor: dark
                ? foundation.colors.primary[200]
                : foundation.colors.primary[600],
            separatorColor: foundation.colors.gray[150],
            separatorWidth: foundation.border.width[1],
            separatorOffset: foundation.unit[12],
            guideColor: dark
                ? foundation.colors.gray[700]
                : foundation.colors.gray[200],
            guideOffset: foundation.unit[6],
            motionDuration: '150ms',
            feedbackDuration: '200ms',
            feedbackEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
    })
    return { sm: create(base.sm), lg: create(base.lg) }
}
