import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveTooltipV2Tokens } from './tooltipV2.tokens'

export const getTooltipV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTooltipV2Tokens => {
    return {
        sm: {
            // background (size-independent)
            background: foundationToken.colors.gray[900],
            // borderRadius.[size]
            borderRadius: {
                sm: foundationToken.border.radius[6],
                lg: foundationToken.border.radius[8],
            },
            // maxWidth.[size]
            maxWidth: {
                sm: '320px',
                lg: '384px',
            },
            // padding.[size]
            padding: {
                sm: `${foundationToken.unit[4]} ${foundationToken.unit[6]}`,
                lg: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
            },

            // gap.[size]
            gap: {
                sm: foundationToken.unit[4],
                lg: foundationToken.unit[6],
            },
            text: {
                // text.color (size-independent)
                color: foundationToken.colors.gray[0],
                // text.fontWeight.[size]
                fontWeight: {
                    sm: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
                // text.fontSize.[size]
                fontSize: {
                    sm: `${foundationToken.font.size.body.xs.fontSize}px`,
                    lg: `${foundationToken.font.size.body.sm.fontSize}px`,
                },
                // text.lineHeight.[size]
                lineHeight: {
                    sm: `${foundationToken.font.size.body.xs.lineHeight}px`,
                    lg: `${foundationToken.font.size.body.sm.lineHeight}px`,
                },
            },
        },
        lg: {
            // background (size-independent)
            background: foundationToken.colors.gray[900],

            // borderRadius.[size]
            borderRadius: {
                sm: foundationToken.border.radius[6],
                lg: foundationToken.border.radius[8],
            },
            // maxWidth.[size]
            maxWidth: {
                sm: '320px',
                lg: '384px',
            },
            // padding.[size]
            padding: {
                sm: `${foundationToken.unit[4]} ${foundationToken.unit[6]}`,
                lg: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
            },

            // gap.[size]
            gap: {
                sm: foundationToken.unit[4],
                lg: foundationToken.unit[6],
            },

            text: {
                // text.color (size-independent)
                color: foundationToken.colors.gray[0],
                // text.fontWeight.[size]
                fontWeight: {
                    sm: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
                // text.fontSize.[size]
                fontSize: {
                    sm: `${foundationToken.font.size.body.xs.fontSize}px`,
                    lg: `${foundationToken.font.size.body.sm.fontSize}px`,
                },
                // text.lineHeight.[size]
                lineHeight: {
                    sm: `${foundationToken.font.size.body.xs.lineHeight}px`,
                    lg: `${foundationToken.font.size.body.sm.lineHeight}px`,
                },
            },
        },
    }
}
