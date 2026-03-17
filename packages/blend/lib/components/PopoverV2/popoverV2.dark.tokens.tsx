import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsivePopoverV2Tokens } from './popoverV2.token'

export const getPopoverV2DarkToken = (
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
                sm: foundationTokens.unit[12],
                md: foundationTokens.unit[12],
                lg: foundationTokens.unit[12],
            },
            // zIndex (size-independent)
            zIndex: 101,
            // borderRadius.[size]
            borderRadius: {
                sm: foundationTokens.border.radius[8],
                md: foundationTokens.border.radius[8],
                lg: foundationTokens.border.radius[8],
            },
            // padding.[side].[size]
            padding: {
                left: {
                    sm: foundationTokens.unit[16],
                    md: foundationTokens.unit[16],
                    lg: foundationTokens.unit[16],
                },
                right: {
                    sm: foundationTokens.unit[16],
                    md: foundationTokens.unit[16],
                    lg: foundationTokens.unit[16],
                },
                top: {
                    sm: foundationTokens.unit[12],
                    md: foundationTokens.unit[12],
                    lg: foundationTokens.unit[12],
                },
                bottom: {
                    sm: foundationTokens.unit[16],
                    md: foundationTokens.unit[16],
                    lg: foundationTokens.unit[16],
                },
            },
            TopContainer: {
                gap: {
                    sm: foundationTokens.unit[8],
                    md: foundationTokens.unit[8],
                    lg: foundationTokens.unit[8],
                },
                heading: {
                    // heading.fontSize.[size]
                    fontSize: {
                        sm: foundationTokens.font.size.body.md.fontSize,
                        md: foundationTokens.font.size.body.lg.fontSize,
                        lg: foundationTokens.font.size.body.lg.fontSize,
                    },
                    // heading.fontWeight.[size]
                    fontWeight: {
                        sm: foundationTokens.font.weight[600],
                        md: foundationTokens.font.weight[600],
                        lg: foundationTokens.font.weight[600],
                    },
                    // heading.color (size-independent)
                    color: foundationTokens.colors.gray[900],
                    // heading.lineHeight.[size]
                    lineHeight: {
                        sm: foundationTokens.unit[24],
                        md: foundationTokens.unit[24],
                        lg: foundationTokens.unit[24],
                    },

                    IconSize: {
                        sm: foundationTokens.font.fontSize[18],
                        md: foundationTokens.font.fontSize[18],
                        lg: foundationTokens.font.fontSize[18],
                    },
                },
                description: {
                    // description.fontSize.[size]
                    fontSize: {
                        sm: foundationTokens.font.size.body.sm.fontSize,
                        md: foundationTokens.font.size.body.md.fontSize,
                        lg: foundationTokens.font.size.body.lg.fontSize,
                    },
                    // description.fontWeight.[size]
                    fontWeight: {
                        sm: foundationTokens.font.weight[500],
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    // description.color (size-independent)
                    color: foundationTokens.colors.gray[500],
                    // description.lineHeight.[size]
                    lineHeight: {
                        sm: foundationTokens.unit[16],
                        md: foundationTokens.unit[16],
                        lg: foundationTokens.unit[16],
                    },
                },
            },
            bottomContainer: {
                // footer.gap.[size]
                gap: {
                    sm: foundationTokens.unit[12],
                    md: foundationTokens.unit[12],
                    lg: foundationTokens.unit[12],
                },
            },
        },
        lg: {
            // background (size-independent)
            background: foundationTokens.colors.gray[900],
            // border (size-independent)
            border: foundationTokens.border.radius[8],
            // shadow (size-independent)
            shadow: foundationTokens.shadows,
            // gap.[size]
            gap: {
                sm: foundationTokens.unit[12],
                md: foundationTokens.unit[12],
                lg: foundationTokens.unit[12],
            },
            // zIndex (size-independent)
            zIndex: 101,
            // borderRadius.[size]
            borderRadius: {
                sm: foundationTokens.border.radius[8],
                md: foundationTokens.border.radius[8],
                lg: foundationTokens.border.radius[8],
            },
            // padding.[side].[size]
            padding: {
                left: {
                    sm: foundationTokens.unit[16],
                    md: foundationTokens.unit[16],
                    lg: foundationTokens.unit[16],
                },
                right: {
                    sm: foundationTokens.unit[16],
                    md: foundationTokens.unit[16],
                    lg: foundationTokens.unit[16],
                },
                top: {
                    sm: foundationTokens.unit[12],
                    md: foundationTokens.unit[12],
                    lg: foundationTokens.unit[12],
                },
                bottom: {
                    sm: foundationTokens.unit[16],
                    md: foundationTokens.unit[16],
                    lg: foundationTokens.unit[16],
                },
            },
            TopContainer: {
                gap: {
                    sm: foundationTokens.unit[8],
                    md: foundationTokens.unit[8],
                    lg: foundationTokens.unit[8],
                },
                heading: {
                    // heading.fontSize.[size]
                    fontSize: {
                        sm: foundationTokens.font.size.body.md.fontSize,
                        md: foundationTokens.font.size.body.lg.fontSize,
                        lg: foundationTokens.font.size.body.lg.fontSize,
                    },
                    // heading.fontWeight.[size]
                    fontWeight: {
                        sm: foundationTokens.font.weight[600],
                        md: foundationTokens.font.weight[600],
                        lg: foundationTokens.font.weight[600],
                    },
                    // heading.color (size-independent)
                    color: foundationTokens.colors.gray[0],
                    // heading.lineHeight.[size]
                    lineHeight: {
                        sm: foundationTokens.unit[24],
                        md: foundationTokens.unit[24],
                        lg: foundationTokens.unit[24],
                    },

                    IconSize: {
                        sm: foundationTokens.font.fontSize[18],
                        md: foundationTokens.font.fontSize[18],
                        lg: foundationTokens.font.fontSize[18],
                    },
                },
                description: {
                    // description.fontSize.[size]
                    fontSize: {
                        sm: foundationTokens.font.size.body.sm.fontSize,
                        md: foundationTokens.font.size.body.md.fontSize,
                        lg: foundationTokens.font.size.body.lg.fontSize,
                    },
                    // description.fontWeight.[size]
                    fontWeight: {
                        sm: foundationTokens.font.weight[500],
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    // description.color (size-independent)
                    color: foundationTokens.colors.gray[400],
                    // description.lineHeight.[size]
                    lineHeight: {
                        sm: foundationTokens.unit[20],
                        md: foundationTokens.unit[20],
                        lg: foundationTokens.unit[20],
                    },
                },
            },
            bottomContainer: {
                gap: {
                    sm: foundationTokens.unit[12],
                    md: foundationTokens.unit[12],
                    lg: foundationTokens.unit[12],
                },
            },
        },
    }
}
