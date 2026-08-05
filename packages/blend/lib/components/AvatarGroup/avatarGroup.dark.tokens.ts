import { type ThemeType } from '../../tokens'
import { AvatarSize, AvatarShape } from '../Avatar/types'
import type { ResponsiveAvatarGroupTokens } from './avatarGroup.tokens.types'

export const getAvatarGroupDarkTokens = (
    foundationToken: ThemeType
): ResponsiveAvatarGroupTokens => {
    return {
        sm: {
            gap: foundationToken.unit[2],

            container: {
                marginLeft: {
                    [AvatarSize.SM]: foundationToken.unit[4],
                    [AvatarSize.REGULAR]: foundationToken.unit[6],
                    [AvatarSize.MD]: foundationToken.unit[8],
                    [AvatarSize.LG]: foundationToken.unit[12],
                    [AvatarSize.XL]: foundationToken.unit[16],
                },
            },

            avatar: {
                selected: {
                    ringColor: foundationToken.colors.primary[400],
                    ringWidth: '2px',
                    ringOffset: '2px',
                    outlineColor: foundationToken.colors.gray[900],
                },
                border: {
                    width: '2px',
                    color: foundationToken.colors.gray[900],
                },
            },

            overflowCounter: {
                background: {
                    default: foundationToken.colors.gray[100],
                    hover: foundationToken.colors.gray[200],
                    active: foundationToken.colors.gray[50],
                },
                text: {
                    color: foundationToken.colors.gray[900],
                },
                border: {
                    width: '2px',
                    color: foundationToken.colors.gray[900],
                },
                size: {
                    [AvatarSize.SM]: {
                        width: foundationToken.unit[24], // 24px - matches avatar xs size
                        height: foundationToken.unit[24], // 24px
                        fontSize: foundationToken.font.size.body.xs.fontSize, // body xs
                    },
                    [AvatarSize.REGULAR]: {
                        width: foundationToken.unit[32], // 32px - matches avatar sm size
                        height: foundationToken.unit[32], // 32px
                        fontSize: foundationToken.font.size.body.sm.fontSize, // body sm
                    },
                    [AvatarSize.MD]: {
                        width: foundationToken.unit[48], // 48px - matches avatar md size
                        height: foundationToken.unit[48], // 48px
                        fontSize: foundationToken.font.size.body.lg.fontSize, // body lg
                    },
                    [AvatarSize.LG]: {
                        width: foundationToken.unit[80], // 80px - matches avatar lg size
                        height: foundationToken.unit[80], // 80px
                        fontSize: foundationToken.font.size.heading.xl.fontSize, // heading xl
                    },
                    [AvatarSize.XL]: {
                        width: foundationToken.unit[144], // 144px - matches avatar xl size
                        height: foundationToken.unit[144], // 144px
                        fontSize: foundationToken.font.size.display.sm.fontSize, // display sm
                    },
                },
                borderRadius: {
                    [AvatarShape.CIRCULAR]: foundationToken.border.radius.full,
                    [AvatarShape.ROUNDED]: foundationToken.border.radius[8],
                },
            },

            menu: {
                marginTop: foundationToken.unit[4],
            },
        },
        lg: {
            gap: foundationToken.unit[2],

            container: {
                marginLeft: {
                    [AvatarSize.SM]: foundationToken.unit[3],
                    [AvatarSize.REGULAR]: foundationToken.unit[4],
                    [AvatarSize.MD]: foundationToken.unit[6],
                    [AvatarSize.LG]: foundationToken.unit[8],
                    [AvatarSize.XL]: foundationToken.unit[12],
                },
            },

            avatar: {
                selected: {
                    ringColor: foundationToken.colors.primary[400],
                    ringWidth: '2px',
                    ringOffset: '2px',
                    outlineColor: foundationToken.colors.gray[900],
                },
                border: {
                    width: '2px',
                    color: foundationToken.colors.gray[900],
                },
            },

            overflowCounter: {
                background: {
                    default: foundationToken.colors.gray[100],
                    hover: foundationToken.colors.gray[200],
                    active: foundationToken.colors.gray[50],
                },
                text: {
                    color: foundationToken.colors.gray[900],
                },
                border: {
                    width: '2px',
                    color: foundationToken.colors.gray[900],
                },
                size: {
                    [AvatarSize.SM]: {
                        width: foundationToken.unit[20], // 20px - matches avatar xs size for lg breakpoint
                        height: foundationToken.unit[20], // 20px
                        fontSize: foundationToken.font.size.body.xs.fontSize, // body xs
                    },
                    [AvatarSize.REGULAR]: {
                        width: foundationToken.unit[28], // 28px - matches avatar sm size for lg breakpoint
                        height: foundationToken.unit[28], // 28px
                        fontSize: foundationToken.font.size.body.sm.fontSize, // body sm
                    },
                    [AvatarSize.MD]: {
                        width: foundationToken.unit[40], // 40px - matches avatar md size for lg breakpoint
                        height: foundationToken.unit[40], // 40px
                        fontSize: foundationToken.font.size.body.lg.fontSize, // body lg
                    },
                    [AvatarSize.LG]: {
                        width: foundationToken.unit[64], // 64px - matches avatar lg size for lg breakpoint
                        height: foundationToken.unit[64], // 64px
                        fontSize: foundationToken.font.size.heading.xl.fontSize, // heading xl
                    },
                    [AvatarSize.XL]: {
                        width: foundationToken.unit[120], // 120px - matches avatar xl size for lg breakpoint
                        height: foundationToken.unit[120], // 120px
                        fontSize: foundationToken.font.size.display.sm.fontSize, // display sm
                    },
                },
                borderRadius: {
                    [AvatarShape.CIRCULAR]: foundationToken.border.radius.full,
                    [AvatarShape.ROUNDED]: foundationToken.border.radius[6],
                },
            },

            menu: {
                marginTop: foundationToken.unit[4],
            },
        },
    }
}
