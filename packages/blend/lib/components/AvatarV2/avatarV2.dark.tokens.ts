import { FoundationTokenType } from '../../tokens/theme.token'
import { AvatarV2Size, AvatarV2Shape, AvatarV2Status } from './avatarV2.types'
import type { AvatarV2TokensType } from './avatarV2.tokens'
import type { BreakpointType } from '../../breakpoints/breakPoints'

type ResponsiveAvatarV2Tokens = {
    [key in keyof BreakpointType]: AvatarV2TokensType
}

export const getAvatarV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveAvatarV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            container: {
                backgroundColor: foundationToken.colors.gray[800],
                width: {
                    [AvatarV2Size.SM]: foundationToken.unit[24],
                    [AvatarV2Size.REGULAR]: foundationToken.unit[28],
                    [AvatarV2Size.MD]: foundationToken.unit[32],
                    [AvatarV2Size.LG]: foundationToken.unit[56],
                    [AvatarV2Size.XL]: foundationToken.unit[64],
                },
                height: {
                    [AvatarV2Size.SM]: foundationToken.unit[24],
                    [AvatarV2Size.REGULAR]: foundationToken.unit[28],
                    [AvatarV2Size.MD]: foundationToken.unit[32],
                    [AvatarV2Size.LG]: foundationToken.unit[56],
                    [AvatarV2Size.XL]: foundationToken.unit[64],
                },
                borderRadius: {
                    [AvatarV2Shape.CIRCULAR]:
                        foundationToken.border.radius.full,
                    [AvatarV2Shape.ROUNDED]: foundationToken.border.radius[8],
                },
                image: {
                    border: `1px solid ${foundationToken.colors.gray[0]}`,
                },
                fallbackText: {
                    border: `1px solid ${foundationToken.colors.gray[700]}`,
                    fontSize: {
                        [AvatarV2Size.SM]:
                            foundationToken.font.size.body.xs.fontSize,
                        [AvatarV2Size.REGULAR]:
                            foundationToken.font.size.body.xs.fontSize,
                        [AvatarV2Size.MD]:
                            foundationToken.font.size.body.sm.fontSize,
                        [AvatarV2Size.LG]:
                            foundationToken.font.size.heading.md.fontSize,
                        [AvatarV2Size.XL]:
                            foundationToken.font.size.heading.lg.fontSize,
                    },
                    fontWeight: {
                        [AvatarV2Size.SM]: foundationToken.font.weight[500],
                        [AvatarV2Size.REGULAR]:
                            foundationToken.font.weight[500],
                        [AvatarV2Size.MD]: foundationToken.font.weight[500],
                        [AvatarV2Size.LG]: foundationToken.font.weight[600],
                        [AvatarV2Size.XL]: foundationToken.font.weight[600],
                    },
                    lineHeight: {
                        [AvatarV2Size.SM]:
                            foundationToken.font.size.body.xs.lineHeight,
                        [AvatarV2Size.REGULAR]:
                            foundationToken.font.size.body.xs.lineHeight,
                        [AvatarV2Size.MD]:
                            foundationToken.font.size.body.sm.lineHeight,
                        [AvatarV2Size.LG]:
                            foundationToken.font.size.heading.md.lineHeight,
                        [AvatarV2Size.XL]:
                            foundationToken.font.size.heading.lg.lineHeight,
                    },
                    color: foundationToken.colors.gray[0],
                },
                status: {
                    width: {
                        [AvatarV2Size.SM]: foundationToken.unit[8],
                        [AvatarV2Size.REGULAR]: foundationToken.unit[10],
                        [AvatarV2Size.MD]: foundationToken.unit[12],
                        [AvatarV2Size.LG]: foundationToken.unit[18],
                        [AvatarV2Size.XL]: foundationToken.unit[20],
                    },
                    height: {
                        [AvatarV2Size.SM]: foundationToken.unit[8],
                        [AvatarV2Size.REGULAR]: foundationToken.unit[10],
                        [AvatarV2Size.MD]: foundationToken.unit[12],
                        [AvatarV2Size.LG]: foundationToken.unit[18],
                        [AvatarV2Size.XL]: foundationToken.unit[20],
                    },
                    border: {
                        [AvatarV2Size.SM]: `${foundationToken.unit[0.5]} solid ${foundationToken.colors.gray[700]}`,
                        [AvatarV2Size.REGULAR]: `${foundationToken.unit[1]} solid ${foundationToken.colors.gray[700]}`,
                        [AvatarV2Size.MD]: `${foundationToken.unit[1]} solid ${foundationToken.colors.gray[700]}`,
                        [AvatarV2Size.LG]: `${foundationToken.unit[2]} solid ${foundationToken.colors.gray[700]}`,
                        [AvatarV2Size.XL]: `${foundationToken.unit[2]} solid ${foundationToken.colors.gray[700]}`,
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
                    position: {
                        [AvatarV2Shape.CIRCULAR]: {
                            [AvatarV2Size.SM]: {
                                top: '-2px',
                                right: '-2px',
                                bottom: '0px',
                            },
                            [AvatarV2Size.REGULAR]: {
                                top: '-3px',
                                right: '-3px',
                                bottom: '0px',
                            },
                            [AvatarV2Size.MD]: {
                                top: '-3px',
                                right: '-4px',
                                bottom: '0px',
                            },
                            [AvatarV2Size.LG]: {
                                top: '0.2px',
                                right: '-3px',
                                bottom: '0px',
                            },
                            [AvatarV2Size.XL]: {
                                top: '1.167px',
                                right: '-3px',
                                bottom: '0px',
                            },
                        },
                        [AvatarV2Shape.ROUNDED]: {
                            [AvatarV2Size.SM]: {
                                top: '-2px',
                                right: '-3px',
                                bottom: '-1px',
                            },
                            [AvatarV2Size.REGULAR]: {
                                top: '-2px',
                                right: '-3px',
                                bottom: '-1px',
                            },
                            [AvatarV2Size.MD]: {
                                top: '-3.667px',
                                right: '-5px',
                                bottom: '-3px',
                            },
                            [AvatarV2Size.LG]: {
                                top: '-3.111px',
                                right: '-8.222px',
                                bottom: '-3px',
                            },
                            [AvatarV2Size.XL]: {
                                top: '-3.111px',
                                right: '-10.222px',
                                bottom: '-4px',
                            },
                        },
                    },
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
                backgroundColor: foundationToken.colors.gray[800],
                width: {
                    [AvatarV2Size.SM]: foundationToken.unit[24],
                    [AvatarV2Size.REGULAR]: foundationToken.unit[32],
                    [AvatarV2Size.MD]: foundationToken.unit[40],
                    [AvatarV2Size.LG]: foundationToken.unit[80],
                    [AvatarV2Size.XL]: foundationToken.unit[144],
                },
                height: {
                    [AvatarV2Size.SM]: foundationToken.unit[24],
                    [AvatarV2Size.REGULAR]: foundationToken.unit[32],
                    [AvatarV2Size.MD]: foundationToken.unit[40],
                    [AvatarV2Size.LG]: foundationToken.unit[80],
                    [AvatarV2Size.XL]: foundationToken.unit[144],
                },
                borderRadius: {
                    [AvatarV2Shape.CIRCULAR]:
                        foundationToken.border.radius.full,
                    [AvatarV2Shape.ROUNDED]: foundationToken.border.radius[6],
                },
                image: {
                    border: `1px solid ${foundationToken.colors.gray[0]}`,
                },
                fallbackText: {
                    border: `1px solid ${foundationToken.colors.gray[700]}`,
                    fontSize: {
                        [AvatarV2Size.SM]:
                            foundationToken.font.size.body.xs.fontSize,
                        [AvatarV2Size.REGULAR]:
                            foundationToken.font.size.body.xs.fontSize,
                        [AvatarV2Size.MD]:
                            foundationToken.font.size.body.sm.fontSize,
                        [AvatarV2Size.LG]:
                            foundationToken.font.size.heading.md.fontSize,
                        [AvatarV2Size.XL]:
                            foundationToken.font.size.heading.lg.fontSize,
                    },
                    fontWeight: {
                        [AvatarV2Size.SM]: foundationToken.font.weight[500],
                        [AvatarV2Size.REGULAR]:
                            foundationToken.font.weight[500],
                        [AvatarV2Size.MD]: foundationToken.font.weight[500],
                        [AvatarV2Size.LG]: foundationToken.font.weight[600],
                        [AvatarV2Size.XL]: foundationToken.font.weight[600],
                    },
                    lineHeight: {
                        [AvatarV2Size.SM]:
                            foundationToken.font.size.body.xs.lineHeight,
                        [AvatarV2Size.REGULAR]:
                            foundationToken.font.size.body.xs.lineHeight,
                        [AvatarV2Size.MD]:
                            foundationToken.font.size.body.sm.lineHeight,
                        [AvatarV2Size.LG]:
                            foundationToken.font.size.heading.md.lineHeight,
                        [AvatarV2Size.XL]:
                            foundationToken.font.size.heading.lg.lineHeight,
                    },
                    color: foundationToken.colors.gray[0],
                },
                status: {
                    width: {
                        [AvatarV2Size.SM]: foundationToken.unit[8],
                        [AvatarV2Size.REGULAR]: foundationToken.unit[12],
                        [AvatarV2Size.MD]: foundationToken.unit[14],
                        [AvatarV2Size.LG]: foundationToken.unit[20],
                        [AvatarV2Size.XL]: foundationToken.unit[28],
                    },
                    height: {
                        [AvatarV2Size.SM]: foundationToken.unit[8],
                        [AvatarV2Size.REGULAR]: foundationToken.unit[12],
                        [AvatarV2Size.MD]: foundationToken.unit[14],
                        [AvatarV2Size.LG]: foundationToken.unit[20],
                        [AvatarV2Size.XL]: foundationToken.unit[28],
                    },
                    border: {
                        [AvatarV2Size.SM]: `${foundationToken.unit[0.5]} solid ${foundationToken.colors.gray[700]}`,
                        [AvatarV2Size.REGULAR]: `${foundationToken.unit[1]} solid ${foundationToken.colors.gray[700]}`,
                        [AvatarV2Size.MD]: `${foundationToken.unit[1]} solid ${foundationToken.colors.gray[700]}`,
                        [AvatarV2Size.LG]: `${foundationToken.unit[2]} solid ${foundationToken.colors.gray[700]}`,
                        [AvatarV2Size.XL]: `${foundationToken.unit[2]} solid ${foundationToken.colors.gray[700]}`,
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
                    position: {
                        [AvatarV2Shape.CIRCULAR]: {
                            [AvatarV2Size.SM]: {
                                top: '-2px',
                                right: '-2px',
                                bottom: '0px',
                            },
                            [AvatarV2Size.REGULAR]: {
                                top: '-3px',
                                right: '-3px',
                                bottom: '0px',
                            },
                            [AvatarV2Size.MD]: {
                                top: '-3px',
                                right: '-3px',
                                bottom: '0px',
                            },
                            [AvatarV2Size.LG]: {
                                top: '0px',
                                right: '2px',
                                bottom: '0px',
                            },
                            [AvatarV2Size.XL]: {
                                top: '8px',
                                right: '3px',
                                bottom: '0px',
                            },
                        },
                        [AvatarV2Shape.ROUNDED]: {
                            [AvatarV2Size.SM]: {
                                top: '-3px',
                                right: '-3px',
                                bottom: '-3px',
                            },
                            [AvatarV2Size.REGULAR]: {
                                top: '-3px',
                                right: '-3px',
                                bottom: '-3px',
                            },
                            [AvatarV2Size.MD]: {
                                top: '-3px',
                                right: '-3px',
                                bottom: '-3px',
                            },
                            [AvatarV2Size.LG]: {
                                top: '-5px',
                                right: '-5px',
                                bottom: '-5px',
                            },
                            [AvatarV2Size.XL]: {
                                top: '-8px',
                                right: '-8px',
                                bottom: '-8px',
                            },
                        },
                    },
                },
            },
            slot: {
                height: foundationToken.unit[20],
                width: foundationToken.unit[20],
            },
        },
    }
}
