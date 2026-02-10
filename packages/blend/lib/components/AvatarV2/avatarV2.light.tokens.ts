import { FoundationTokenType } from '../../tokens/theme.token'
import { AvatarV2Size, AvatarV2Shape, AvatarV2Status } from './avatarV2.types'
import type { AvatarV2TokensType } from './avatarV2.tokens'
import type { BreakpointType } from '../../breakpoints/breakPoints'

type ResponsiveAvatarV2Tokens = {
    [key in keyof BreakpointType]: AvatarV2TokensType
}

export const getAvatarV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveAvatarV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            container: {
                width: {
                    [AvatarV2Size.XS]: foundationToken.unit[24],
                    [AvatarV2Size.SM]: foundationToken.unit[32],
                    [AvatarV2Size.MD]: foundationToken.unit[40],
                    [AvatarV2Size.LG]: foundationToken.unit[56],
                    [AvatarV2Size.XL]: foundationToken.unit[80],
                    [AvatarV2Size.XXL]: foundationToken.unit[96],
                },
                height: {
                    [AvatarV2Size.XS]: foundationToken.unit[24],
                    [AvatarV2Size.SM]: foundationToken.unit[32],
                    [AvatarV2Size.MD]: foundationToken.unit[40],
                    [AvatarV2Size.LG]: foundationToken.unit[56],
                    [AvatarV2Size.XL]: foundationToken.unit[80],
                    [AvatarV2Size.XXL]: foundationToken.unit[96],
                },
                borderRadius: {
                    [AvatarV2Shape.CIRCLE]: foundationToken.border.radius.full,
                    [AvatarV2Shape.ROUNDED]: foundationToken.border.radius[4],
                    [AvatarV2Shape.SQUARE]: foundationToken.border.radius[2],
                },
                border: {
                    image: `1px solid ${foundationToken.colors.gray[0]}`,
                    fallback: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                backgroundColor: {
                    fallback: foundationToken.colors.gray[100],
                },
                fallback: {
                    backgroundColor: foundationToken.colors.gray[100],
                    fontSize: {
                        [AvatarV2Size.XS]:
                            foundationToken.font.size.body.xs.fontSize,
                        [AvatarV2Size.SM]:
                            foundationToken.font.size.body.xs.fontSize,
                        [AvatarV2Size.MD]:
                            foundationToken.font.size.body.sm.fontSize,
                        [AvatarV2Size.LG]:
                            foundationToken.font.size.heading.md.fontSize,
                        [AvatarV2Size.XL]:
                            foundationToken.font.size.heading.lg.fontSize,
                        [AvatarV2Size.XXL]:
                            foundationToken.font.size.heading.xl.fontSize,
                    },
                    fontWeight: {
                        [AvatarV2Size.XS]: foundationToken.font.weight[500],
                        [AvatarV2Size.SM]: foundationToken.font.weight[500],
                        [AvatarV2Size.MD]: foundationToken.font.weight[500],
                        [AvatarV2Size.LG]: foundationToken.font.weight[600],
                        [AvatarV2Size.XL]: foundationToken.font.weight[600],
                        [AvatarV2Size.XXL]: foundationToken.font.weight[600],
                    },
                    lineHeight: {
                        [AvatarV2Size.XS]:
                            foundationToken.font.size.body.xs.lineHeight,
                        [AvatarV2Size.SM]:
                            foundationToken.font.size.body.xs.lineHeight,
                        [AvatarV2Size.MD]:
                            foundationToken.font.size.body.sm.lineHeight,
                        [AvatarV2Size.LG]:
                            foundationToken.font.size.heading.md.lineHeight,
                        [AvatarV2Size.XL]:
                            foundationToken.font.size.heading.lg.lineHeight,
                        [AvatarV2Size.XXL]:
                            foundationToken.font.size.heading.xl.lineHeight,
                    },
                    color: foundationToken.colors.gray[0],
                },
                status: {
                    width: {
                        [AvatarV2Size.XS]: foundationToken.unit[8],
                        [AvatarV2Size.SM]: foundationToken.unit[10],
                        [AvatarV2Size.MD]: foundationToken.unit[12],
                        [AvatarV2Size.LG]: foundationToken.unit[18],
                        [AvatarV2Size.XL]: foundationToken.unit[20],
                        [AvatarV2Size.XXL]: foundationToken.unit[24],
                    },
                    height: {
                        [AvatarV2Size.XS]: foundationToken.unit[8],
                        [AvatarV2Size.SM]: foundationToken.unit[10],
                        [AvatarV2Size.MD]: foundationToken.unit[12],
                        [AvatarV2Size.LG]: foundationToken.unit[18],
                        [AvatarV2Size.XL]: foundationToken.unit[20],
                        [AvatarV2Size.XXL]: foundationToken.unit[24],
                    },
                    border: {
                        [AvatarV2Size.XS]: `${foundationToken.unit[0.5]} solid ${foundationToken.colors.gray[0]}`,
                        [AvatarV2Size.SM]: `${foundationToken.unit[1]} solid ${foundationToken.colors.gray[0]}`,
                        [AvatarV2Size.MD]: `${foundationToken.unit[1]} solid ${foundationToken.colors.gray[0]}`,
                        [AvatarV2Size.LG]: `${foundationToken.unit[2]} solid ${foundationToken.colors.gray[0]}`,
                        [AvatarV2Size.XL]: `${foundationToken.unit[2]} solid ${foundationToken.colors.gray[0]}`,
                        [AvatarV2Size.XXL]: `${foundationToken.unit[2]} solid ${foundationToken.colors.gray[0]}`,
                    },
                    borderRadius: foundationToken.border.radius.full,
                    backgroundColor: {
                        [AvatarV2Status.NONE]: 'transparent',
                        [AvatarV2Status.ONLINE]:
                            foundationToken.colors.green[500],
                        [AvatarV2Status.OFFLINE]:
                            foundationToken.colors.gray[400],
                        [AvatarV2Status.AWAY]:
                            foundationToken.colors.yellow[500],
                        [AvatarV2Status.BUSY]: foundationToken.colors.red[500],
                    },
                    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.8)',
                },
            },
            slot: {
                height: foundationToken.unit[16],
                width: foundationToken.unit[16],
            },
        },
        lg: {
            gap: foundationToken.unit[12],

            container: {
                width: {
                    [AvatarV2Size.XS]: foundationToken.unit[28],
                    [AvatarV2Size.SM]: foundationToken.unit[40],
                    [AvatarV2Size.MD]: foundationToken.unit[56],
                    [AvatarV2Size.LG]: foundationToken.unit[80],
                    [AvatarV2Size.XL]: foundationToken.unit[128],
                    [AvatarV2Size.XXL]: foundationToken.unit[144],
                },
                height: {
                    [AvatarV2Size.XS]: foundationToken.unit[28],
                    [AvatarV2Size.SM]: foundationToken.unit[40],
                    [AvatarV2Size.MD]: foundationToken.unit[56],
                    [AvatarV2Size.LG]: foundationToken.unit[80],
                    [AvatarV2Size.XL]: foundationToken.unit[128],
                    [AvatarV2Size.XXL]: foundationToken.unit[144],
                },
                borderRadius: {
                    [AvatarV2Shape.CIRCLE]: foundationToken.border.radius.full,
                    [AvatarV2Shape.ROUNDED]: foundationToken.border.radius[6],
                    [AvatarV2Shape.SQUARE]: foundationToken.border.radius[4],
                },
                border: {
                    image: `1px solid ${foundationToken.colors.gray[0]}`,
                    fallback: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                backgroundColor: {
                    fallback: foundationToken.colors.gray[100],
                },
                fallback: {
                    backgroundColor: foundationToken.colors.gray[100],
                    fontSize: {
                        [AvatarV2Size.XS]:
                            foundationToken.font.size.body.xs.fontSize,
                        [AvatarV2Size.SM]:
                            foundationToken.font.size.body.xs.fontSize,
                        [AvatarV2Size.MD]:
                            foundationToken.font.size.body.sm.fontSize,
                        [AvatarV2Size.LG]:
                            foundationToken.font.size.heading.md.fontSize,
                        [AvatarV2Size.XL]:
                            foundationToken.font.size.heading.lg.fontSize,
                        [AvatarV2Size.XXL]:
                            foundationToken.font.size.heading.xl.fontSize,
                    },
                    fontWeight: {
                        [AvatarV2Size.XS]: foundationToken.font.weight[500],
                        [AvatarV2Size.SM]: foundationToken.font.weight[500],
                        [AvatarV2Size.MD]: foundationToken.font.weight[500],
                        [AvatarV2Size.LG]: foundationToken.font.weight[600],
                        [AvatarV2Size.XL]: foundationToken.font.weight[600],
                        [AvatarV2Size.XXL]: foundationToken.font.weight[600],
                    },
                    lineHeight: {
                        [AvatarV2Size.XS]:
                            foundationToken.font.size.body.xs.lineHeight,
                        [AvatarV2Size.SM]:
                            foundationToken.font.size.body.xs.lineHeight,
                        [AvatarV2Size.MD]:
                            foundationToken.font.size.body.sm.lineHeight,
                        [AvatarV2Size.LG]:
                            foundationToken.font.size.heading.md.lineHeight,
                        [AvatarV2Size.XL]:
                            foundationToken.font.size.heading.lg.lineHeight,
                        [AvatarV2Size.XXL]:
                            foundationToken.font.size.heading.xl.lineHeight,
                    },
                    color: foundationToken.colors.gray[0],
                },
                status: {
                    width: {
                        [AvatarV2Size.XS]: foundationToken.unit[8],
                        [AvatarV2Size.SM]: foundationToken.unit[12],
                        [AvatarV2Size.MD]: foundationToken.unit[14],
                        [AvatarV2Size.LG]: foundationToken.unit[20],
                        [AvatarV2Size.XL]: foundationToken.unit[28],
                        [AvatarV2Size.XXL]: foundationToken.unit[32],
                    },
                    height: {
                        [AvatarV2Size.XS]: foundationToken.unit[8],
                        [AvatarV2Size.SM]: foundationToken.unit[12],
                        [AvatarV2Size.MD]: foundationToken.unit[14],
                        [AvatarV2Size.LG]: foundationToken.unit[20],
                        [AvatarV2Size.XL]: foundationToken.unit[28],
                        [AvatarV2Size.XXL]: foundationToken.unit[32],
                    },
                    border: {
                        [AvatarV2Size.XS]: `${foundationToken.unit[0.5]} solid ${foundationToken.colors.gray[0]}`,
                        [AvatarV2Size.SM]: `${foundationToken.unit[1]} solid ${foundationToken.colors.gray[0]}`,
                        [AvatarV2Size.MD]: `${foundationToken.unit[1]} solid ${foundationToken.colors.gray[0]}`,
                        [AvatarV2Size.LG]: `${foundationToken.unit[2]} solid ${foundationToken.colors.gray[0]}`,
                        [AvatarV2Size.XL]: `${foundationToken.unit[2]} solid ${foundationToken.colors.gray[0]}`,
                        [AvatarV2Size.XXL]: `${foundationToken.unit[2]} solid ${foundationToken.colors.gray[0]}`,
                    },
                    borderRadius: foundationToken.border.radius.full,
                    backgroundColor: {
                        [AvatarV2Status.NONE]: 'transparent',
                        [AvatarV2Status.ONLINE]:
                            foundationToken.colors.green[500],
                        [AvatarV2Status.OFFLINE]:
                            foundationToken.colors.gray[400],
                        [AvatarV2Status.AWAY]:
                            foundationToken.colors.yellow[500],
                        [AvatarV2Status.BUSY]: foundationToken.colors.red[500],
                    },
                    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.8)',
                },
            },

            slot: {
                height: foundationToken.unit[20],
                width: foundationToken.unit[20],
            },
        },
    }
}
