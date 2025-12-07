import type { CSSObject } from 'styled-components'
import { type ThemeType } from '../../tokens'
import { AvatarSize, AvatarShape } from './types'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type AvatarState = 'default' | 'online'
export type AvatarVariant = 'withImage' | 'withoutImage'

/**
 * Avatar Tokens following the design system pattern
 *
 * Pattern: component.[target].CSSProp.[size].[variant].[subType].[state].value
 *
 * Structure:
 * - gap: Spacing between avatar and slots
 * - avatar: Main avatar container properties
 * - text: Fallback text styling
 * - indicator: Online status indicator
 * - slot: Leading and trailing slot styling
 */
export type AvatarTokensType = {
    gap: CSSObject['gap']

    container: {
        // Pattern: container.size.[size] (size-dependent)
        size: {
            [key in AvatarSize]: {
                width: CSSObject['width']
                height: CSSObject['height']
            }
        }

        // Pattern: container.backgroundColor.[variant].[state]
        backgroundColor: {
            [key in AvatarVariant]: {
                [key in AvatarState]: CSSObject['backgroundColor']
            }
        }

        // Pattern: container.border.[variant].[state]
        border: {
            [key in AvatarVariant]: {
                [key in AvatarState]: CSSObject['border']
            }
        }

        // Pattern: container.borderRadius.[shape]
        borderRadius: {
            [key in AvatarShape]: CSSObject['borderRadius']
        }
    }

    text: {
        // Pattern: text.color.[state]
        color: {
            [key in AvatarState]: CSSObject['color']
        }
        // Pattern: text.fontSize.[size]
        fontSize: { [key in AvatarSize]: CSSObject['fontSize'] }
        // Pattern: text.fontWeight.[size]
        fontWeight: { [key in AvatarSize]: CSSObject['fontWeight'] }
    }

    indicator: {
        // Pattern: indicator.backgroundColor.[state]
        backgroundColor: {
            [key in AvatarState]: CSSObject['backgroundColor']
        }
        // Pattern: indicator.border.[state]
        border: {
            [key in AvatarSize]: {
                [key in AvatarState]: {
                    color: CSSObject['borderColor']
                    width: CSSObject['borderWidth']
                }
            }
        }
        // Pattern: indicator.size.[size]
        size: {
            [key in AvatarSize]: {
                width: CSSObject['width']
                height: CSSObject['height']
            }
        }
        // Pattern: indicator.borderRadius
        borderRadius: CSSObject['borderRadius']
        // Pattern: indicator.boxShadow
        boxShadow: CSSObject['boxShadow']
    }

    slot: {
        // Pattern: slot.spacing
        spacing: CSSObject['margin']
        // Pattern: slot.color.[state]
        color: {
            [key in AvatarState]: CSSObject['color']
        }
    }
}

export type ResponsiveAvatarTokens = {
    [key in keyof BreakpointType]: AvatarTokensType
}

export const getAvatarTokens = (
    foundationToken: ThemeType
): ResponsiveAvatarTokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],

            container: {
                size: {
                    [AvatarSize.SM]: {
                        width: foundationToken.unit[24], // 24px
                        height: foundationToken.unit[24], // 24px
                    },
                    [AvatarSize.REGULAR]: {
                        width: foundationToken.unit[28], // 28px
                        height: foundationToken.unit[28], // 28px
                    },
                    [AvatarSize.MD]: {
                        width: foundationToken.unit[32], // 32px
                        height: foundationToken.unit[32], // 32px
                    },
                    [AvatarSize.LG]: {
                        width: foundationToken.unit[56], // 56px
                        height: foundationToken.unit[56], // 56px
                    },
                    [AvatarSize.XL]: {
                        width: foundationToken.unit[64], // 64px
                        height: foundationToken.unit[64], // 64px
                    },
                },

                backgroundColor: {
                    withImage: {
                        default: 'transparent',
                        online: 'transparent',
                    },
                    withoutImage: {
                        default: foundationToken.colors.gray[100],
                        online: foundationToken.colors.gray[100],
                    },
                },

                border: {
                    withImage: {
                        default: `1px solid ${foundationToken.colors.gray[0]}`,
                        online: `1px solid ${foundationToken.colors.gray[0]}`,
                    },
                    withoutImage: {
                        default: `1px solid ${foundationToken.colors.gray[200]}`,
                        online: `1px solid ${foundationToken.colors.gray[200]}`,
                    },
                },

                borderRadius: {
                    [AvatarShape.CIRCULAR]: foundationToken.border.radius.full,
                    [AvatarShape.ROUNDED]: foundationToken.border.radius[8],
                },
            },

            text: {
                color: {
                    default: foundationToken.colors.gray[900],
                    online: foundationToken.colors.gray[900],
                },
                fontSize: {
                    [AvatarSize.SM]: foundationToken.font.size.body.xs.fontSize, // body sm
                    [AvatarSize.REGULAR]:
                        foundationToken.font.size.body.xs.fontSize, // body md
                    [AvatarSize.MD]: foundationToken.font.size.body.sm.fontSize, // body lg
                    [AvatarSize.LG]:
                        foundationToken.font.size.heading.md.fontSize, // heading xl
                    [AvatarSize.XL]:
                        foundationToken.font.size.heading.lg.fontSize, // heading xl
                },
                fontWeight: {
                    [AvatarSize.SM]: foundationToken.font.weight[500],
                    [AvatarSize.REGULAR]: foundationToken.font.weight[500],
                    [AvatarSize.MD]: foundationToken.font.weight[500],
                    [AvatarSize.LG]: foundationToken.font.weight[600],
                    [AvatarSize.XL]: foundationToken.font.weight[600],
                },
            },

            indicator: {
                backgroundColor: {
                    default: foundationToken.colors.gray[300],
                    online: foundationToken.colors.green[400],
                },
                border: {
                    [AvatarSize.SM]: {
                        default: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[0.5],
                        },
                        online: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[0.5],
                        },
                    },
                    [AvatarSize.REGULAR]: {
                        default: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[1],
                        },
                        online: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[1],
                        },
                    },
                    [AvatarSize.MD]: {
                        default: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[1],
                        },
                        online: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[1],
                        },
                    },
                    [AvatarSize.LG]: {
                        default: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[2],
                        },
                        online: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[2],
                        },
                    },
                    [AvatarSize.XL]: {
                        default: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[2],
                        },
                        online: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[2],
                        },
                    },
                },
                size: {
                    [AvatarSize.SM]: {
                        width: foundationToken.unit[8],
                        height: foundationToken.unit[8],
                    },
                    [AvatarSize.REGULAR]: {
                        width: foundationToken.unit[10],
                        height: foundationToken.unit[10],
                    },
                    [AvatarSize.MD]: {
                        width: foundationToken.unit[12],
                        height: foundationToken.unit[12],
                    },
                    [AvatarSize.LG]: {
                        width: foundationToken.unit[18],
                        height: foundationToken.unit[18],
                    },
                    [AvatarSize.XL]: {
                        width: foundationToken.unit[20],
                        height: foundationToken.unit[20],
                    },
                },
                borderRadius: foundationToken.border.radius.full,
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.8)',
            },

            slot: {
                spacing: foundationToken.unit[8],
                color: {
                    default: foundationToken.colors.gray[700],
                    online: foundationToken.colors.gray[700],
                },
            },
        },
        lg: {
            gap: foundationToken.unit[6],

            container: {
                size: {
                    [AvatarSize.SM]: {
                        width: foundationToken.unit[24], // 24px
                        height: foundationToken.unit[24], // 24px
                    },
                    [AvatarSize.REGULAR]: {
                        width: foundationToken.unit[32], // 32px
                        height: foundationToken.unit[32], // 32px
                    },
                    [AvatarSize.MD]: {
                        width: foundationToken.unit[40], // 40px
                        height: foundationToken.unit[40], // 40px
                    },
                    [AvatarSize.LG]: {
                        width: foundationToken.unit[80], // 80px
                        height: foundationToken.unit[80], // 80px
                    },
                    [AvatarSize.XL]: {
                        width: foundationToken.unit[144], // 144px
                        height: foundationToken.unit[144], // 144px
                    },
                },

                backgroundColor: {
                    withImage: {
                        default: 'transparent',
                        online: 'transparent',
                    },
                    withoutImage: {
                        default: foundationToken.colors.gray[100],
                        online: foundationToken.colors.gray[100],
                    },
                },

                border: {
                    withImage: {
                        default: `1px solid ${foundationToken.colors.gray[0]}`,
                        online: `1px solid ${foundationToken.colors.gray[0]}`,
                    },
                    withoutImage: {
                        default: `1px solid ${foundationToken.colors.gray[200]}`,
                        online: `1px solid ${foundationToken.colors.gray[200]}`,
                    },
                },

                borderRadius: {
                    [AvatarShape.CIRCULAR]: foundationToken.border.radius.full,
                    [AvatarShape.ROUNDED]: foundationToken.border.radius[6],
                },
            },

            text: {
                color: {
                    default: foundationToken.colors.gray[900],
                    online: foundationToken.colors.gray[900],
                },
                fontSize: {
                    [AvatarSize.SM]: foundationToken.font.size.body.xs.fontSize, // body sm
                    [AvatarSize.REGULAR]:
                        foundationToken.font.size.body.xs.fontSize, // body md
                    [AvatarSize.MD]: foundationToken.font.size.body.sm.fontSize, // body lg
                    [AvatarSize.LG]:
                        foundationToken.font.size.heading.md.fontSize, // heading xl
                    [AvatarSize.XL]:
                        foundationToken.font.size.heading.lg.fontSize, // heading xl
                },
                fontWeight: {
                    [AvatarSize.SM]: foundationToken.font.weight[500],
                    [AvatarSize.REGULAR]: foundationToken.font.weight[500],
                    [AvatarSize.MD]: foundationToken.font.weight[500],
                    [AvatarSize.LG]: foundationToken.font.weight[600],
                    [AvatarSize.XL]: foundationToken.font.weight[600],
                },
            },

            indicator: {
                backgroundColor: {
                    default: foundationToken.colors.gray[300],
                    online: foundationToken.colors.green[400],
                },
                border: {
                    [AvatarSize.SM]: {
                        default: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[0.5],
                        },
                        online: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[0.5],
                        },
                    },
                    [AvatarSize.REGULAR]: {
                        default: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[1],
                        },
                        online: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[1],
                        },
                    },
                    [AvatarSize.MD]: {
                        default: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[1],
                        },
                        online: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[1],
                        },
                    },
                    [AvatarSize.LG]: {
                        default: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[2],
                        },
                        online: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[2],
                        },
                    },
                    [AvatarSize.XL]: {
                        default: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[2],
                        },
                        online: {
                            color: foundationToken.colors.gray[0],
                            width: foundationToken.unit[2],
                        },
                    },
                },
                size: {
                    [AvatarSize.SM]: {
                        width: foundationToken.unit[8],
                        height: foundationToken.unit[8],
                    },
                    [AvatarSize.REGULAR]: {
                        width: foundationToken.unit[12],
                        height: foundationToken.unit[12],
                    },
                    [AvatarSize.MD]: {
                        width: foundationToken.unit[14],
                        height: foundationToken.unit[14],
                    },
                    [AvatarSize.LG]: {
                        width: foundationToken.unit[20],
                        height: foundationToken.unit[20],
                    },
                    [AvatarSize.XL]: {
                        width: foundationToken.unit[28],
                        height: foundationToken.unit[28],
                    },
                },
                borderRadius: foundationToken.border.radius.full,
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.8)',
            },

            slot: {
                spacing: foundationToken.unit[6],
                color: {
                    default: foundationToken.colors.gray[700],
                    online: foundationToken.colors.gray[700],
                },
            },
        },
    }
}
