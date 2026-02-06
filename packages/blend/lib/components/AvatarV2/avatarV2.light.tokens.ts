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
            container: {
                size: {
                    [AvatarV2Size.XS]: {
                        width: foundationToken.unit[24],
                        height: foundationToken.unit[24],
                    },
                    [AvatarV2Size.SM]: {
                        width: foundationToken.unit[32],
                        height: foundationToken.unit[32],
                    },
                    [AvatarV2Size.MD]: {
                        width: foundationToken.unit[40],
                        height: foundationToken.unit[40],
                    },
                    [AvatarV2Size.LG]: {
                        width: foundationToken.unit[56],
                        height: foundationToken.unit[56],
                    },
                    [AvatarV2Size.XL]: {
                        width: foundationToken.unit[80],
                        height: foundationToken.unit[80],
                    },
                    [AvatarV2Size.XXL]: {
                        width: foundationToken.unit[96],
                        height: foundationToken.unit[96],
                    },
                },
                borderRadius: {
                    [AvatarV2Shape.CIRCLE]: foundationToken.border.radius.full,
                    [AvatarV2Shape.ROUNDED]: foundationToken.border.radius[4],
                    [AvatarV2Shape.SQUARE]: foundationToken.border.radius[2],
                },
            },
            border: {
                image: `1px solid ${foundationToken.colors.gray[0]}`,
                fallback: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            fallback: {
                backgroundColor: foundationToken.colors.gray[100],
                color: foundationToken.colors.gray[900],
            },
            typography: {
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
            },
            status: {
                indicator: {
                    size: {
                        [AvatarV2Size.XS]: {
                            width: foundationToken.unit[8],
                            height: foundationToken.unit[8],
                        },
                        [AvatarV2Size.SM]: {
                            width: foundationToken.unit[10],
                            height: foundationToken.unit[10],
                        },
                        [AvatarV2Size.MD]: {
                            width: foundationToken.unit[12],
                            height: foundationToken.unit[12],
                        },
                        [AvatarV2Size.LG]: {
                            width: foundationToken.unit[18],
                            height: foundationToken.unit[18],
                        },
                        [AvatarV2Size.XL]: {
                            width: foundationToken.unit[20],
                            height: foundationToken.unit[20],
                        },
                        [AvatarV2Size.XXL]: {
                            width: foundationToken.unit[24],
                            height: foundationToken.unit[24],
                        },
                    },
                    border: {
                        [AvatarV2Size.XS]: {
                            width: foundationToken.unit[0.5],
                            color: '#ffffff',
                        },
                        [AvatarV2Size.SM]: {
                            width: foundationToken.unit[1],
                            color: '#ffffff',
                        },
                        [AvatarV2Size.MD]: {
                            width: foundationToken.unit[1],
                            color: '#ffffff',
                        },
                        [AvatarV2Size.LG]: {
                            width: foundationToken.unit[2],
                            color: '#ffffff',
                        },
                        [AvatarV2Size.XL]: {
                            width: foundationToken.unit[2],
                            color: '#ffffff',
                        },
                        [AvatarV2Size.XXL]: {
                            width: foundationToken.unit[2],
                            color: '#ffffff',
                        },
                    },
                },
                backgroundColor: {
                    [AvatarV2Status.NONE]: 'transparent',
                    [AvatarV2Status.ONLINE]: foundationToken.colors.green[500],
                    [AvatarV2Status.OFFLINE]: foundationToken.colors.gray[400],
                    [AvatarV2Status.AWAY]: foundationToken.colors.yellow[500],
                    [AvatarV2Status.BUSY]: foundationToken.colors.red[500],
                },
                shadow: '0 0 0 1px rgba(255, 255, 255, 0.8)',
            },
            slot: {
                gap: foundationToken.unit[8],
                color: foundationToken.colors.gray[600],
            },
            image: {
                backgroundColor: foundationToken.colors.gray[200],
            },
        },
        lg: {
            container: {
                size: {
                    [AvatarV2Size.XS]: {
                        width: foundationToken.unit[28],
                        height: foundationToken.unit[28],
                    },
                    [AvatarV2Size.SM]: {
                        width: foundationToken.unit[40],
                        height: foundationToken.unit[40],
                    },
                    [AvatarV2Size.MD]: {
                        width: foundationToken.unit[56],
                        height: foundationToken.unit[56],
                    },
                    [AvatarV2Size.LG]: {
                        width: foundationToken.unit[80],
                        height: foundationToken.unit[80],
                    },
                    [AvatarV2Size.XL]: {
                        width: foundationToken.unit[128],
                        height: foundationToken.unit[128],
                    },
                    [AvatarV2Size.XXL]: {
                        width: foundationToken.unit[144],
                        height: foundationToken.unit[144],
                    },
                },
                borderRadius: {
                    [AvatarV2Shape.CIRCLE]: foundationToken.border.radius.full,
                    [AvatarV2Shape.ROUNDED]: foundationToken.border.radius[6],
                    [AvatarV2Shape.SQUARE]: foundationToken.border.radius[4],
                },
            },
            border: {
                image: `1px solid ${foundationToken.colors.gray[0]}`,
                fallback: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            fallback: {
                backgroundColor: foundationToken.colors.gray[100],
                color: foundationToken.colors.gray[900],
            },
            typography: {
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
            },
            status: {
                indicator: {
                    size: {
                        [AvatarV2Size.XS]: {
                            width: foundationToken.unit[8],
                            height: foundationToken.unit[8],
                        },
                        [AvatarV2Size.SM]: {
                            width: foundationToken.unit[12],
                            height: foundationToken.unit[12],
                        },
                        [AvatarV2Size.MD]: {
                            width: foundationToken.unit[14],
                            height: foundationToken.unit[14],
                        },
                        [AvatarV2Size.LG]: {
                            width: foundationToken.unit[20],
                            height: foundationToken.unit[20],
                        },
                        [AvatarV2Size.XL]: {
                            width: foundationToken.unit[28],
                            height: foundationToken.unit[28],
                        },
                        [AvatarV2Size.XXL]: {
                            width: foundationToken.unit[32],
                            height: foundationToken.unit[32],
                        },
                    },
                    border: {
                        [AvatarV2Size.XS]: {
                            width: foundationToken.unit[0.5],
                            color: '#ffffff',
                        },
                        [AvatarV2Size.SM]: {
                            width: foundationToken.unit[1],
                            color: '#ffffff',
                        },
                        [AvatarV2Size.MD]: {
                            width: foundationToken.unit[1],
                            color: '#ffffff',
                        },
                        [AvatarV2Size.LG]: {
                            width: foundationToken.unit[2],
                            color: '#ffffff',
                        },
                        [AvatarV2Size.XL]: {
                            width: foundationToken.unit[2],
                            color: '#ffffff',
                        },
                        [AvatarV2Size.XXL]: {
                            width: foundationToken.unit[2],
                            color: '#ffffff',
                        },
                    },
                },
                backgroundColor: {
                    [AvatarV2Status.NONE]: 'transparent',
                    [AvatarV2Status.ONLINE]: foundationToken.colors.green[500],
                    [AvatarV2Status.OFFLINE]: foundationToken.colors.gray[400],
                    [AvatarV2Status.AWAY]: foundationToken.colors.yellow[500],
                    [AvatarV2Status.BUSY]: foundationToken.colors.red[500],
                },
                shadow: '0 0 0 1px rgba(255, 255, 255, 0.8)',
            },
            slot: {
                gap: foundationToken.unit[12],
                color: foundationToken.colors.gray[600],
            },
            image: {
                backgroundColor: foundationToken.colors.gray[200],
            },
        },
    }
}
