import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveBreadcrumbV2Tokens } from './breadcrumbV2.tokens'

export const getBreadcrumbV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveBreadcrumbV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[0],

            item: {
                padding: `${foundationToken.unit[4]} ${foundationToken.unit[8]}`,
                gap: foundationToken.unit[6],

                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[300],
                        active: foundationToken.colors.gray[400],
                    },
                },
            },
        },
        lg: {
            gap: foundationToken.unit[0],

            item: {
                padding: `${foundationToken.unit[4]} ${foundationToken.unit[8]}`,
                gap: foundationToken.unit[6],

                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[300],
                        active: foundationToken.colors.gray[400],
                    },
                },
            },
        },
    }
}
