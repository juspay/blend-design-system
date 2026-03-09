import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsivePopoverV2Tokens } from './popoverV2.token'

export const getPopoverV2LightToken = (
    foundationTokens: FoundationTokenType
): ResponsivePopoverV2Tokens => {
    return {
        sm: {
            // background (size-independent)
            background: foundationTokens.colors.gray[0],
            // border (size-independent)
            border: foundationTokens.border.radius[8],
            // shadow (size-independent)
            shadow: foundationTokens.shadows,
            // gap.[size]
            gap: {
                small: foundationTokens.unit[12],
                medium: foundationTokens.unit[12],
                large: foundationTokens.unit[12],
            },
            // zIndex (size-independent)
            zIndex: 1000,
            // borderRadius.[size]
            borderRadius: {
                small: foundationTokens.border.radius[8],
                medium: foundationTokens.border.radius[8],
                large: foundationTokens.border.radius[8],
            },
            // padding.[side].[size]
            padding: {
                left: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                    large: foundationTokens.unit[16],
                },
                right: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                    large: foundationTokens.unit[16],
                },
                top: {
                    small: foundationTokens.unit[12],
                    medium: foundationTokens.unit[12],
                    large: foundationTokens.unit[12],
                },
                bottom: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                    large: foundationTokens.unit[16],
                },
            },
            headerContainer: {
                heading: {
                    // heading.fontSize.[size]
                    fontSize: {
                        small: foundationTokens.font.size.body.md.fontSize,
                        medium: foundationTokens.font.size.body.lg.fontSize,
                        large: foundationTokens.font.size.body.lg.fontSize,
                    },
                    // heading.fontWeight.[size]
                    fontWeight: {
                        small: foundationTokens.font.weight[600],
                        medium: foundationTokens.font.weight[600],
                        large: foundationTokens.font.weight[600],
                    },
                    // heading.color (size-independent)
                    color: foundationTokens.colors.gray[900],
                    // heading.lineHeight.[size]
                    lineHeight: {
                        small: foundationTokens.font.size.body.md.lineHeight,
                        medium: foundationTokens.font.size.body.lg.lineHeight,
                        large: foundationTokens.font.size.body.lg.lineHeight,
                    },
                },
                description: {
                    // description.fontSize.[size]
                    fontSize: {
                        small: foundationTokens.font.size.body.sm.fontSize,
                        medium: foundationTokens.font.size.body.md.fontSize,
                        large: foundationTokens.font.size.body.lg.fontSize,
                    },
                    // description.fontWeight.[size]
                    fontWeight: {
                        small: foundationTokens.font.weight[500],
                        medium: foundationTokens.font.weight[500],
                        large: foundationTokens.font.weight[500],
                    },
                    // description.color (size-independent)
                    color: foundationTokens.colors.gray[500],
                    // description.lineHeight.[size]
                    lineHeight: {
                        small: foundationTokens.font.size.body.sm.lineHeight,
                        medium: foundationTokens.font.size.body.md.lineHeight,
                        large: foundationTokens.font.size.body.lg.lineHeight,
                    },
                },
            },
            footer: {
                // footer.gap.[size]
                gap: {
                    small: foundationTokens.unit[12],
                    medium: foundationTokens.unit[12],
                    large: foundationTokens.unit[12],
                },
            },
        },
        lg: {
            // background (size-independent)
            background: foundationTokens.colors.gray[0],
            // border (size-independent)
            border: foundationTokens.border.radius[8],
            // shadow (size-independent)
            shadow: foundationTokens.shadows,
            // gap.[size]
            gap: {
                small: foundationTokens.unit[12],
                medium: foundationTokens.unit[12],
                large: foundationTokens.unit[12],
            },
            // zIndex (size-independent)
            zIndex: 1000,
            // borderRadius.[size]
            borderRadius: {
                small: foundationTokens.border.radius[8],
                medium: foundationTokens.border.radius[8],
                large: foundationTokens.border.radius[8],
            },
            // padding.[side].[size]
            padding: {
                left: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                    large: foundationTokens.unit[16],
                },
                right: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                    large: foundationTokens.unit[16],
                },
                top: {
                    small: foundationTokens.unit[12],
                    medium: foundationTokens.unit[12],
                    large: foundationTokens.unit[12],
                },
                bottom: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                    large: foundationTokens.unit[16],
                },
            },
            headerContainer: {
                heading: {
                    // heading.fontSize.[size]
                    fontSize: {
                        small: foundationTokens.font.size.body.md.fontSize,
                        medium: foundationTokens.font.size.body.lg.fontSize,
                        large: foundationTokens.font.size.body.lg.fontSize,
                    },
                    // heading.fontWeight.[size]
                    fontWeight: {
                        small: foundationTokens.font.weight[600],
                        medium: foundationTokens.font.weight[600],
                        large: foundationTokens.font.weight[600],
                    },
                    // heading.color (size-independent)
                    color: foundationTokens.colors.gray[900],
                    // heading.lineHeight.[size]
                    lineHeight: {
                        small: foundationTokens.font.size.body.md.lineHeight,
                        medium: foundationTokens.font.size.body.lg.lineHeight,
                        large: foundationTokens.font.size.body.lg.lineHeight,
                    },
                },
                description: {
                    // description.fontSize.[size]
                    fontSize: {
                        small: foundationTokens.font.size.body.sm.fontSize,
                        medium: foundationTokens.font.size.body.md.fontSize,
                        large: foundationTokens.font.size.body.lg.fontSize,
                    },
                    // description.fontWeight.[size]
                    fontWeight: {
                        small: foundationTokens.font.weight[500],
                        medium: foundationTokens.font.weight[500],
                        large: foundationTokens.font.weight[500],
                    },
                    // description.color (size-independent)
                    color: foundationTokens.colors.gray[500],
                    // description.lineHeight.[size]
                    lineHeight: {
                        small: foundationTokens.font.size.body.sm.lineHeight,
                        medium: foundationTokens.font.size.body.md.lineHeight,
                        large: foundationTokens.font.size.body.lg.lineHeight,
                    },
                },
            },
            footer: {
                // footer.gap.[size]
                gap: {
                    small: foundationTokens.unit[12],
                    medium: foundationTokens.unit[12],
                    large: foundationTokens.unit[12],
                },
            },
        },
    }
}
