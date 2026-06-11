import { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveBadgeTokens } from './badge.tokens.types'

export const getBadgeLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveBadgeTokens => {
    return {
        sm: {
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
                borderRadius: foundationToken.border.radius.full,
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
                paddingLeft: {
                    sm: foundationToken.unit[4],
                    md: foundationToken.unit[6],
                    lg: foundationToken.unit[8],
                },
                paddingRight: {
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
            backgroundColor: {
                alert: foundationToken.colors.red[500],
                neutral: foundationToken.colors.gray[500],
                warning: foundationToken.colors.yellow[500],
                primary: foundationToken.colors.primary[500],
                success: foundationToken.colors.green[500],
            },
            text: {
                color: foundationToken.colors.gray[0],
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
        },
        lg: {
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
                borderRadius: foundationToken.border.radius.full,
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
                paddingLeft: {
                    sm: foundationToken.unit[4],
                    md: foundationToken.unit[6],
                    lg: foundationToken.unit[8],
                },
                paddingRight: {
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
            backgroundColor: {
                alert: foundationToken.colors.red[500],
                neutral: foundationToken.colors.gray[500],
                warning: foundationToken.colors.yellow[500],
                primary: foundationToken.colors.primary[500],
                success: foundationToken.colors.green[500],
            },
            text: {
                color: foundationToken.colors.gray[0],
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
        },
    }
}
