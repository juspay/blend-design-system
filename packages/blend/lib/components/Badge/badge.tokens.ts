import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { BadgeTokensType, ResponsiveBadgeTokens } from './Badge.types'
import { getBadgeLightTokens } from './badge.light.tokens'
import { getBadgeDarkTokens } from './badge.dark.tokens'

// Tokens Pattern: component.[target].CSSProp.[size].[variant/type].[subVariant/subType].[state].value

export type { ResponsiveBadgeTokens }
export { getBadgeLightTokens, getBadgeDarkTokens }

const createBadgeTokens = (
    foundationToken: FoundationTokenType
): ResponsiveBadgeTokens => {
    // Background colors
    const backgroundColor = {
        alert: foundationToken.colors.red[500],
        neutral: foundationToken.colors.gray[500],
        warning: foundationToken.colors.yellow[500],
        primary: foundationToken.colors.primary[500],
        success: foundationToken.colors.green[500],
    }

    // Text color
    const textColor = foundationToken.colors.gray[0]

    const baseTokens: BadgeTokensType = {
        dot: {
            width: {
                sm: foundationToken.unit[6],
                md: foundationToken.unit[8],
                lg: foundationToken.unit[10],
            },
            height: {
                sm: foundationToken.unit[6],
                md: foundationToken.unit[8],
                lg: foundationToken.unit[10],
            },
        },
        pill: {
            minWidth: {
                sm: foundationToken.unit[16],
                md: foundationToken.unit[20],
                lg: foundationToken.unit[24],
            },
            height: {
                sm: foundationToken.unit[16],
                md: foundationToken.unit[20],
                lg: foundationToken.unit[24],
            },
            paddingX: {
                sm: foundationToken.unit[4],
                md: foundationToken.unit[6],
                lg: foundationToken.unit[8],
            },
            borderRadius: {
                sm: foundationToken.border.radius.full,
                md: foundationToken.border.radius.full,
                lg: foundationToken.border.radius.full,
            },
        },
        backgroundColor,
        text: {
            color: textColor,
            fontSize: {
                sm: foundationToken.font.fontSize[10],
                md: foundationToken.font.fontSize[12],
                lg: foundationToken.font.fontSize[14],
            },
            fontWeight: foundationToken.font.weight[600],
            lineHeight: {
                sm: foundationToken.unit[16],
                md: foundationToken.unit[20],
                lg: foundationToken.unit[24],
            },
        },
        position: {
            offset: {
                sm: foundationToken.unit[2],
                md: foundationToken.unit[4],
                lg: foundationToken.unit[6],
            },
        },
    }

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}

export const getBadgeTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveBadgeTokens => {
    switch (theme) {
        case Theme.LIGHT:
            return getBadgeLightTokens(foundationToken)
        case Theme.DARK:
            return getBadgeDarkTokens(foundationToken)
        default:
            return createBadgeTokens(foundationToken)
    }
}
