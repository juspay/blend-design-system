import type { CSSObject } from 'styled-components'
import { PopoverSize } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

//Original Pattern: component.[target].CSSProp.[size].[variant].[state].value
/**
 * Popover Tokens following the pattern: [target].CSSProp.[size]
 *
 * Structure:
 * - target: container | headerContainer.heading | headerContainer.description | footer
 * - CSSProp:
 *   - container: background | border | shadow | gap | zIndex | borderRadius | padding.left | padding.right | padding.top | padding.bottom
 *   - headerContainer.heading: color | fontSize | fontWeight | lineHeight
 *   - headerContainer.description: color | fontSize | fontWeight | lineHeight
 *   - footer: gap
 * - size: small | medium (popover size)
 *
 * Notes:
 * - Size-independent properties: background, border, shadow, zIndex, header/description color
 * - Size-dependent properties: gap, borderRadius, all padding sides, heading/description fontSize/fontWeight/lineHeight, footer.gap
 */
export type PopoverTokenType = {
    // Pattern: background (size-independent)
    background: CSSObject['backgroundColor']
    // Pattern: border (size-independent)
    border: CSSObject['border']
    // Pattern: shadow (size-independent)
    shadow: FoundationTokenType['shadows']
    // Pattern: gap.[size]
    gap: {
        [key in PopoverSize]: CSSObject['gap']
    }
    // Pattern: zIndex (size-independent)
    zIndex: CSSObject['zIndex']
    // Pattern: borderRadius.[size]
    borderRadius: {
        [key in PopoverSize]: CSSObject['borderRadius']
    }
    // Pattern: padding.left.[size] | padding.right.[size] | padding.top.[size] | padding.bottom.[size]
    padding: {
        left: {
            [key in PopoverSize]: CSSObject['paddingLeft']
        }
        right: {
            [key in PopoverSize]: CSSObject['paddingRight']
        }
        top: {
            [key in PopoverSize]: CSSObject['paddingTop']
        }
        bottom: {
            [key in PopoverSize]: CSSObject['paddingBottom']
        }
    }
    headerContainer: {
        heading: {
            // Pattern: headerContainer.heading.color (size-independent)
            color: CSSObject['color']
            // Pattern: headerContainer.heading.fontSize.[size]
            fontSize: {
                [key in PopoverSize]: CSSObject['fontSize']
            }
            // Pattern: headerContainer.heading.fontWeight.[size]
            fontWeight: {
                [key in PopoverSize]: CSSObject['fontWeight']
            }
            // Pattern: headerContainer.heading.lineHeight.[size]
            lineHeight: {
                [key in PopoverSize]: CSSObject['lineHeight']
            }
        }
        description: {
            // Pattern: headerContainer.description.color (size-independent)
            color: CSSObject['color']
            // Pattern: headerContainer.description.fontSize.[size]
            fontSize: {
                [key in PopoverSize]: CSSObject['fontSize']
            }
            // Pattern: headerContainer.description.fontWeight.[size]
            fontWeight: {
                [key in PopoverSize]: CSSObject['fontWeight']
            }
            // Pattern: headerContainer.description.lineHeight.[size]
            lineHeight: {
                [key in PopoverSize]: CSSObject['lineHeight']
            }
        }
    }
    footer: {
        // Pattern: footer.gap.[size]
        gap: {
            [key in PopoverSize]: CSSObject['gap']
        }
    }
}

export type ResponsivePopoverTokens = {
    [key in keyof BreakpointType]: PopoverTokenType
}
export const getPopoverTokens = (
    foundationTokens: FoundationTokenType
): ResponsivePopoverTokens => {
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
            },
            // zIndex (size-independent)
            zIndex: 1000,
            // borderRadius.[size]
            borderRadius: {
                small: foundationTokens.border.radius[8],
                medium: foundationTokens.border.radius[8],
            },
            // padding.[side].[size]
            padding: {
                left: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                },
                right: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                },
                top: {
                    small: foundationTokens.unit[12],
                    medium: foundationTokens.unit[12],
                },
                bottom: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                },
            },
            headerContainer: {
                heading: {
                    // heading.fontSize.[size]
                    fontSize: {
                        small: foundationTokens.font.size.body.md.fontSize,
                        medium: foundationTokens.font.size.body.lg.fontSize,
                    },
                    // heading.fontWeight.[size]
                    fontWeight: {
                        small: foundationTokens.font.weight[600],
                        medium: foundationTokens.font.weight[600],
                    },
                    // heading.color (size-independent)
                    color: foundationTokens.colors.gray[900],
                    // heading.lineHeight.[size]
                    lineHeight: {
                        small: foundationTokens.font.size.body.md.lineHeight,
                        medium: foundationTokens.font.size.body.lg.lineHeight,
                    },
                },
                description: {
                    // description.fontSize.[size]
                    fontSize: {
                        small: foundationTokens.font.size.body.sm.fontSize,
                        medium: foundationTokens.font.size.body.md.fontSize,
                    },
                    // description.fontWeight.[size]
                    fontWeight: {
                        small: foundationTokens.font.weight[500],
                        medium: foundationTokens.font.weight[500],
                    },
                    // description.color (size-independent)
                    color: foundationTokens.colors.gray[500],
                    // description.lineHeight.[size]
                    lineHeight: {
                        small: foundationTokens.font.size.body.sm.lineHeight,
                        medium: foundationTokens.font.size.body.md.lineHeight,
                    },
                },
            },
            footer: {
                // footer.gap.[size]
                gap: {
                    small: foundationTokens.unit[12],
                    medium: foundationTokens.unit[12],
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
            },
            // zIndex (size-independent)
            zIndex: 1000,
            // borderRadius.[size]
            borderRadius: {
                small: foundationTokens.border.radius[8],
                medium: foundationTokens.border.radius[8],
            },
            // padding.[side].[size]
            padding: {
                left: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                },
                right: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                },
                top: {
                    small: foundationTokens.unit[12],
                    medium: foundationTokens.unit[12],
                },
                bottom: {
                    small: foundationTokens.unit[16],
                    medium: foundationTokens.unit[16],
                },
            },
            headerContainer: {
                heading: {
                    // heading.fontSize.[size]
                    fontSize: {
                        small: foundationTokens.font.size.body.md.fontSize,
                        medium: foundationTokens.font.size.body.lg.fontSize,
                    },
                    // heading.fontWeight.[size]
                    fontWeight: {
                        small: foundationTokens.font.weight[600],
                        medium: foundationTokens.font.weight[600],
                    },
                    // heading.color (size-independent)
                    color: foundationTokens.colors.gray[900],
                    // heading.lineHeight.[size]
                    lineHeight: {
                        small: foundationTokens.font.size.body.md.lineHeight,
                        medium: foundationTokens.font.size.body.lg.lineHeight,
                    },
                },
                description: {
                    // description.fontSize.[size]
                    fontSize: {
                        small: foundationTokens.font.size.body.sm.fontSize,
                        medium: foundationTokens.font.size.body.md.fontSize,
                    },
                    // description.fontWeight.[size]
                    fontWeight: {
                        small: foundationTokens.font.weight[500],
                        medium: foundationTokens.font.weight[500],
                    },
                    // description.color (size-independent)
                    color: foundationTokens.colors.gray[500],
                    // description.lineHeight.[size]
                    lineHeight: {
                        small: foundationTokens.font.size.body.sm.lineHeight,
                        medium: foundationTokens.font.size.body.md.lineHeight,
                    },
                },
            },
            footer: {
                // footer.gap.[size]
                gap: {
                    small: foundationTokens.unit[12],
                    medium: foundationTokens.unit[12],
                },
            },
        },
    }
}
