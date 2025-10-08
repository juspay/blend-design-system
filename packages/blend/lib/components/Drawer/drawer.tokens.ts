import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type DrawerDirection = 'top' | 'bottom' | 'left' | 'right'
export type DrawerState = 'default'

/**
 * Drawer Tokens following the pattern: [target].CSSProp.[variant].[state]
 *
 * Structure:
 * - target: overlay | content | handle | header | body | footer | mobileOffset (defines what element the token applies to)
 * - CSSProp: backgroundColor | borderRadius | boxShadow | zIndex | border | padding | fontSize | fontWeight | color | gap | etc.
 * - variant: top | bottom | left | right (drawer direction)
 * - state: default (interaction state)
 *
 * Pattern examples:
 * - overlay.backgroundColor.[state]
 * - overlay.zIndex (no variant dependency)
 * - content.backgroundColor.[variant].[state]
 * - content.borderRadius.[variant]
 * - handle.backgroundColor.[variant].[state]
 * - header.padding.[variant]
 * - header.text.title.fontSize (no variant dependency)
 * - body.padding.[variant]
 * - footer.gap.[variant]
 * - mobileOffset.top.[variant]
 */
export type DrawerTokensType = {
    // Overlay properties (state-dependent)
    overlay: {
        backgroundColor: {
            [key in DrawerState]: CSSObject['backgroundColor']
        }
        zIndex: CSSObject['zIndex']
    }

    // Content properties (most are consistent across directions)
    content: {
        backgroundColor: {
            [key in DrawerState]: CSSObject['backgroundColor']
        }
        borderRadius: CSSObject['borderRadius']
        boxShadow: CSSObject['boxShadow']
        zIndex: CSSObject['zIndex']
        border: CSSObject['border']
    }

    // Mobile offset properties (direction-dependent for positioning)
    mobileOffset: {
        top: CSSObject['top']
        bottom: CSSObject['bottom']
        left: CSSObject['left']
        right: CSSObject['right']
    }

    // Handle properties (mostly consistent)
    handle: {
        backgroundColor: {
            [key in DrawerState]: CSSObject['backgroundColor']
        }
        borderRadius: CSSObject['borderRadius']
        width: CSSObject['width']
        height: CSSObject['height']
    }

    // Header properties
    header: {
        padding: CSSObject['padding']
        borderBottom: CSSObject['borderBottom']
        backgroundColor: {
            [key in DrawerState]: CSSObject['backgroundColor']
        }
        text: {
            title: {
                color: {
                    [key in DrawerState]: CSSObject['color']
                }
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                lineHeight: CSSObject['lineHeight']
            }
            description: {
                color: {
                    [key in DrawerState]: CSSObject['color']
                }
                fontSize: CSSObject['fontSize']
                lineHeight: CSSObject['lineHeight']
            }
        }
    }

    // Body properties
    body: {
        padding: CSSObject['padding']
        backgroundColor: {
            [key in DrawerState]: CSSObject['backgroundColor']
        }
        overflowY: CSSObject['overflowY']
        borderRadius: CSSObject['borderRadius']
    }

    // Footer properties
    footer: {
        padding: CSSObject['padding']
        borderTop: CSSObject['borderTop']
        backgroundColor: {
            [key in DrawerState]: CSSObject['backgroundColor']
        }
        gap: CSSObject['gap']
        alignItems: CSSObject['alignItems']
        justifyContent: CSSObject['justifyContent']
    }
}

export type ResponsiveDrawerTokens = {
    [key in keyof BreakpointType]: DrawerTokensType
}

export const getDrawerComponentTokens = (
    foundationToken: FoundationTokenType
): ResponsiveDrawerTokens => {
    return {
        sm: {
            overlay: {
                backgroundColor: {
                    default: 'rgba(0, 0, 0, 0.8)',
                },
                zIndex: 1100,
            },
            content: {
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                },
                borderRadius: foundationToken.border.radius[16],
                boxShadow: foundationToken.shadows.xl,
                zIndex: 1200,
                border: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            mobileOffset: {
                top: '74px',
                bottom: '16px',
                left: '16px',
                right: '16px',
            },
            handle: {
                backgroundColor: {
                    default: foundationToken.colors.gray[300],
                },
                borderRadius: foundationToken.border.radius.full,
                width: '48px',
                height: '6px',
            },
            header: {
                padding: foundationToken.unit[16],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                },
                text: {
                    title: {
                        color: {
                            default: foundationToken.colors.gray[900],
                        },
                        fontSize: foundationToken.font.size.heading.md.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        lineHeight:
                            foundationToken.font.size.heading.md.lineHeight,
                    },
                    description: {
                        color: {
                            default: foundationToken.colors.gray[600],
                        },
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        lineHeight:
                            foundationToken.font.size.body.md.lineHeight,
                    },
                },
            },
            body: {
                padding: foundationToken.unit[16],
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                },
                overflowY: 'auto',
                borderRadius: foundationToken.border.radius[12],
            },
            footer: {
                padding: foundationToken.unit[16],
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                },
                gap: foundationToken.unit[12],
                alignItems: 'center',
                justifyContent: 'flex-end',
            },
        },
        lg: {
            overlay: {
                backgroundColor: {
                    default: 'rgba(0, 0, 0, 0.8)',
                },
                zIndex: 1100,
            },
            content: {
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                },
                borderRadius: foundationToken.border.radius[16],
                boxShadow: foundationToken.shadows.xl,
                zIndex: 1200,
                border: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            mobileOffset: {
                top: '74px',
                bottom: '16px',
                left: '16px',
                right: '16px',
            },
            handle: {
                backgroundColor: {
                    default: foundationToken.colors.gray[300],
                },
                borderRadius: foundationToken.border.radius.full,
                width: '48px',
                height: '6px',
            },
            header: {
                padding: foundationToken.unit[20],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                },
                text: {
                    title: {
                        color: {
                            default: foundationToken.colors.gray[900],
                        },
                        fontSize: foundationToken.font.size.heading.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        lineHeight:
                            foundationToken.font.size.heading.lg.lineHeight,
                    },
                    description: {
                        color: {
                            default: foundationToken.colors.gray[600],
                        },
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        lineHeight:
                            foundationToken.font.size.body.lg.lineHeight,
                    },
                },
            },
            body: {
                padding: foundationToken.unit[20],
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                },
                overflowY: 'auto',
                borderRadius: foundationToken.border.radius[16],
            },
            footer: {
                padding: foundationToken.unit[20],
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                },
                gap: foundationToken.unit[16],
                alignItems: 'center',
                justifyContent: 'flex-end',
            },
        },
    }
}
