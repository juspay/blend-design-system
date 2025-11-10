import type { CSSObject } from 'styled-components'
import { type ThemeType } from '../../tokens'
import { AvatarSize, AvatarShape } from '../Avatar/types'
import type { BreakpointType } from '../../breakpoints/breakPoints'

/**
 * AvatarGroup Tokens following the design system pattern
 *
 * Structure:
 * - gap: Spacing between avatars in the group
 * - container: Group container properties
 * - avatar: Individual avatar styling within the group
 * - overflowCounter: Overflow counter styling
 */
export type AvatarGroupTokensType = {
    gap: CSSObject['gap']

    container: {
        // Pattern: container.spacing.[size]
        marginLeft: {
            [key in AvatarSize]: CSSObject['margin']
        }
    }

    avatar: {
        // Pattern: avatar.selected
        selected: {
            ringColor: CSSObject['borderColor']
            ringWidth: CSSObject['borderWidth']
            ringOffset: CSSObject['outlineOffset']
        }
        // Pattern: avatar.border
        border: {
            width: CSSObject['borderWidth']
            color: CSSObject['borderColor']
        }
    }

    overflowCounter: {
        // Pattern: overflowCounter.background.[state]
        background: {
            default: CSSObject['backgroundColor']
            hover: CSSObject['backgroundColor']
            active: CSSObject['backgroundColor']
        }
        // Pattern: overflowCounter.text
        text: {
            color: CSSObject['color']
        }
        // Pattern: overflowCounter.border
        border: {
            width: CSSObject['borderWidth']
            color: CSSObject['borderColor']
        }
        // Pattern: overflowCounter.size.[size] (uses avatar sizing)
        size: {
            [key in AvatarSize]: {
                width: CSSObject['width']
                height: CSSObject['height']
                fontSize: CSSObject['fontSize']
            }
        }
        // Pattern: overflowCounter.borderRadius.[shape] (uses avatar shapes)
        borderRadius: {
            [key in AvatarShape]: CSSObject['borderRadius']
        }
    }

    menu: {
        marginTop: CSSObject['margin']
    }
}

export type ResponsiveAvatarGroupTokens = {
    [key in keyof BreakpointType]: AvatarGroupTokensType
}

export const getAvatarGroupTokens = (
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
                    ringColor: foundationToken.colors.primary[500],
                    ringWidth: '2px',
                    ringOffset: '2px',
                },
                border: {
                    width: '2px',
                    color: foundationToken.colors.gray[0],
                },
            },

            overflowCounter: {
                background: {
                    default: foundationToken.colors.gray[900],
                    hover: foundationToken.colors.gray[800],
                    active: foundationToken.colors.gray[950],
                },
                text: {
                    color: foundationToken.colors.gray[50],
                },
                border: {
                    width: '2px',
                    color: foundationToken.colors.gray[0],
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
                    ringColor: foundationToken.colors.primary[500],
                    ringWidth: '2px',
                    ringOffset: '2px',
                },
                border: {
                    width: '2px',
                    color: foundationToken.colors.gray[0],
                },
            },

            overflowCounter: {
                background: {
                    default: foundationToken.colors.gray[900],
                    hover: foundationToken.colors.gray[800],
                    active: foundationToken.colors.gray[950],
                },
                text: {
                    color: foundationToken.colors.gray[50],
                },
                border: {
                    width: '2px',
                    color: foundationToken.colors.gray[0],
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
