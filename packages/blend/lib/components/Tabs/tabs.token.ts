import type { CSSObject } from 'styled-components'
import { type ThemeType } from '../../tokens'
import { TabsVariant, TabsSize } from './types'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type TabsState = 'default' | 'hover' | 'active' | 'disabled'

/**
 * Tabs Tokens following the pattern: [target].CSSProp.[size].[variant].[state]
 *
 * Structure:
 * - target: container | trigger | text | underline (defines what element the token applies to)
 * - CSSProp: backgroundColor | borderRadius | padding | border | color | fontSize | fontWeight | gap | height
 * - size: md | lg (only for size-dependent properties)
 * - variant: underline | boxed | floating | pills (tabs variant)
 * - state: default | hover | active | disabled (interaction state)
 *
 * Size-independent properties: backgroundColor, border, color
 * Size-dependent properties: borderRadius, padding, fontSize, fontWeight
 */
export type TabsTokensType = {
    gap: CSSObject['gap']
    // Pattern: backgroundColor.[variant].[state]
    backgroundColor: {
        [key in TabsVariant]: {
            [key in TabsState]: CSSObject['backgroundColor']
        }
    }
    // Pattern: borderRadius.[size].[variant]
    borderRadius: {
        [key in TabsSize]: {
            [key in TabsVariant]: CSSObject['borderRadius']
        }
    }
    // Pattern: padding.size.variant.top/right/bottom/left.value
    padding: {
        [key in TabsSize]: {
            [key in TabsVariant]: {
                top: CSSObject['paddingTop']
                right: CSSObject['paddingRight']
                bottom: CSSObject['paddingBottom']
                left: CSSObject['paddingLeft']
            }
        }
    }
    // Pattern: border.[variant]
    border: {
        [key in TabsVariant]: CSSObject['border']
    }
    container: {
        // Pattern: container.backgroundColor.[variant]
        backgroundColor: {
            [key in TabsVariant]: CSSObject['backgroundColor']
        }
        // Pattern: container.borderRadius.[size].[variant]
        borderRadius: {
            [key in TabsSize]: {
                [key in TabsVariant]: CSSObject['borderRadius']
            }
        }
        // Pattern: container.padding.size.variant.top/right/bottom/left.value
        padding: {
            [key in TabsSize]: {
                [key in TabsVariant]: {
                    top: CSSObject['paddingTop']
                    right: CSSObject['paddingRight']
                    bottom: CSSObject['paddingBottom']
                    left: CSSObject['paddingLeft']
                }
            }
        }
    }
    trigger: {
        // Pattern: trigger.gap
        gap: CSSObject['gap']
        // Active indicator
        activeIndicator: {
            height: CSSObject['height']
            color: CSSObject['color']
        }
        // Text inside trigger
        text: {
            // Pattern: trigger.text.color.[variant].[state]
            color: {
                [key in TabsVariant]: {
                    [key in TabsState]: CSSObject['color']
                }
            }
            // Pattern: trigger.text.fontSize.[size] (size-dependent)
            fontSize: {
                [key in TabsSize]: CSSObject['fontSize']
            }
            // Pattern: trigger.text.fontWeight.[size] (size-dependent)
            fontWeight: {
                [key in TabsSize]: CSSObject['fontWeight']
            }
        }
    }
}

export type ResponsiveTabsTokens = {
    [key in keyof BreakpointType]: TabsTokensType
}

export const getTabsTokens = (
    foundationToken: ThemeType
): ResponsiveTabsTokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            // Pattern: backgroundColor.[variant].[state]
            // Example: backgroundColor.floating.hover
            backgroundColor: {
                [TabsVariant.UNDERLINE]: {
                    default: 'transparent',
                    hover: 'transparent',
                    active: 'transparent',
                    disabled: 'transparent',
                },
                [TabsVariant.BOXED]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[0],
                    active: foundationToken.colors.gray[0],
                    disabled: 'transparent',
                },
                [TabsVariant.FLOATING]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[50],
                    active: foundationToken.colors.gray[100],
                    disabled: 'transparent',
                },
                [TabsVariant.PILLS]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[50],
                    active: foundationToken.colors.gray[100],
                    disabled: 'transparent',
                },
            },
            // Pattern: borderRadius.[size].[variant]
            // Example: borderRadius.lg.pills
            borderRadius: {
                [TabsSize.MD]: {
                    [TabsVariant.UNDERLINE]: '0',
                    [TabsVariant.BOXED]: foundationToken.border.radius[8],
                    [TabsVariant.FLOATING]: foundationToken.border.radius[8],
                    [TabsVariant.PILLS]: foundationToken.border.radius[28],
                },
                [TabsSize.LG]: {
                    [TabsVariant.UNDERLINE]: '0',
                    [TabsVariant.BOXED]: foundationToken.border.radius[8],
                    [TabsVariant.FLOATING]: foundationToken.border.radius[8],
                    [TabsVariant.PILLS]: foundationToken.border.radius[28],
                },
            },
            // Pattern: padding.size.variant.top/right/bottom/left.value
            // Example: padding.md.underline.top
            padding: {
                [TabsSize.MD]: {
                    [TabsVariant.UNDERLINE]: {
                        top: foundationToken.unit[2],
                        right: foundationToken.unit[8],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[8],
                    },
                    [TabsVariant.BOXED]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[12],
                    },
                    [TabsVariant.FLOATING]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[12],
                    },
                    [TabsVariant.PILLS]: {
                        top: foundationToken.unit[4],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[4],
                        left: foundationToken.unit[12],
                    },
                },
                [TabsSize.LG]: {
                    [TabsVariant.UNDERLINE]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[8],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[8],
                    },
                    [TabsVariant.BOXED]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                    [TabsVariant.FLOATING]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                    [TabsVariant.PILLS]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[12],
                    },
                },
            },
            // Pattern: border.[variant]
            // Example: border.pills
            border: {
                [TabsVariant.UNDERLINE]: 'none',
                [TabsVariant.BOXED]: 'none',
                [TabsVariant.FLOATING]: 'none',
                [TabsVariant.PILLS]: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            container: {
                // Pattern: container.backgroundColor.[variant]
                // Example: container.backgroundColor.boxed
                backgroundColor: {
                    [TabsVariant.UNDERLINE]: 'transparent',
                    [TabsVariant.BOXED]: foundationToken.colors.gray[50],
                    [TabsVariant.FLOATING]: 'transparent',
                    [TabsVariant.PILLS]: 'transparent',
                },
                // Pattern: container.borderRadius.[size].[variant]
                // Example: container.borderRadius.md.floating
                borderRadius: {
                    [TabsSize.MD]: {
                        [TabsVariant.UNDERLINE]: '0',
                        [TabsVariant.BOXED]: foundationToken.border.radius[8],
                        [TabsVariant.FLOATING]: '0',
                        [TabsVariant.PILLS]: '0',
                    },
                    [TabsSize.LG]: {
                        [TabsVariant.UNDERLINE]: '0',
                        [TabsVariant.BOXED]: foundationToken.border.radius[8],
                        [TabsVariant.FLOATING]: '0',
                        [TabsVariant.PILLS]: '0',
                    },
                },
                // Pattern: container.padding.size.variant.top/right/bottom/left.value
                // Example: container.padding.md.underline.top
                padding: {
                    [TabsSize.MD]: {
                        [TabsVariant.UNDERLINE]: {
                            top: foundationToken.unit[8],
                            right: '0',
                            bottom: '0',
                            left: '0',
                        },
                        [TabsVariant.BOXED]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsVariant.FLOATING]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsVariant.PILLS]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                    },
                    [TabsSize.LG]: {
                        [TabsVariant.UNDERLINE]: {
                            top: foundationToken.unit[8],
                            right: '0',
                            bottom: '0',
                            left: '0',
                        },
                        [TabsVariant.BOXED]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsVariant.FLOATING]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsVariant.PILLS]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                    },
                },
            },
            trigger: {
                // Pattern: trigger.gap
                gap: foundationToken.unit[8],
                // Pattern: trigger.underline (for underline variant)
                activeIndicator: {
                    height: foundationToken.border.width[2],
                    color: foundationToken.colors.gray[700],
                },
                // Text inside trigger
                text: {
                    // Pattern: trigger.text.color.[variant].[state]
                    // Example: trigger.text.color.pills.hover
                    color: {
                        [TabsVariant.UNDERLINE]: {
                            default: foundationToken.colors.gray[500],
                            hover: foundationToken.colors.gray[500],
                            active: foundationToken.colors.gray[700],
                            disabled: foundationToken.colors.gray[400],
                        },
                        [TabsVariant.BOXED]: {
                            default: foundationToken.colors.gray[500],
                            hover: foundationToken.colors.gray[500],
                            active: foundationToken.colors.gray[700],
                            disabled: foundationToken.colors.gray[400],
                        },
                        [TabsVariant.FLOATING]: {
                            default: foundationToken.colors.gray[500],
                            hover: foundationToken.colors.gray[700],
                            active: foundationToken.colors.gray[700],
                            disabled: foundationToken.colors.gray[400],
                        },
                        [TabsVariant.PILLS]: {
                            default: foundationToken.colors.gray[500],
                            hover: foundationToken.colors.gray[700],
                            active: foundationToken.colors.gray[700],
                            disabled: foundationToken.colors.gray[400],
                        },
                    },
                    // Pattern: trigger.text.fontSize.[size]
                    // Example: trigger.text.fontSize.md
                    fontSize: {
                        [TabsSize.MD]:
                            foundationToken.font.size.body.md.fontSize,
                        [TabsSize.LG]:
                            foundationToken.font.size.body.md.fontSize,
                    },
                    // Pattern: trigger.text.fontWeight.[size]
                    // Example: trigger.text.fontWeight.lg
                    fontWeight: {
                        [TabsSize.MD]: foundationToken.font.weight[500],
                        [TabsSize.LG]: foundationToken.font.weight[500],
                    },
                },
            },
        },
        lg: {
            gap: foundationToken.unit[8],
            // Pattern: backgroundColor.[variant].[state]
            // Example: backgroundColor.boxed.active
            backgroundColor: {
                [TabsVariant.UNDERLINE]: {
                    default: 'transparent',
                    hover: 'transparent',
                    active: 'transparent',
                    disabled: 'transparent',
                },
                [TabsVariant.BOXED]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[0],
                    active: foundationToken.colors.gray[0],
                    disabled: 'transparent',
                },
                [TabsVariant.FLOATING]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[50],
                    active: foundationToken.colors.gray[100],
                    disabled: 'transparent',
                },
                [TabsVariant.PILLS]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[50],
                    active: foundationToken.colors.gray[100],
                    disabled: 'transparent',
                },
            },
            // Pattern: borderRadius.[size].[variant]
            // Example: borderRadius.lg.pills
            borderRadius: {
                [TabsSize.MD]: {
                    [TabsVariant.UNDERLINE]: '0',
                    [TabsVariant.BOXED]: foundationToken.border.radius[8],
                    [TabsVariant.FLOATING]: foundationToken.border.radius[8],
                    [TabsVariant.PILLS]: foundationToken.border.radius[28],
                },
                [TabsSize.LG]: {
                    [TabsVariant.UNDERLINE]: '0',
                    [TabsVariant.BOXED]: foundationToken.border.radius[8],
                    [TabsVariant.FLOATING]: foundationToken.border.radius[8],
                    [TabsVariant.PILLS]: foundationToken.border.radius[28],
                },
            },
            // Pattern: padding.size.variant.top/right/bottom/left.value
            // Example: padding.lg.boxed.top
            padding: {
                [TabsSize.MD]: {
                    [TabsVariant.UNDERLINE]: {
                        top: foundationToken.unit[2],
                        right: foundationToken.unit[8],
                        bottom: foundationToken.unit[12],
                        left: foundationToken.unit[8],
                    },
                    [TabsVariant.BOXED]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[12],
                    },
                    [TabsVariant.FLOATING]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[12],
                    },
                    [TabsVariant.PILLS]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[12],
                    },
                },
                [TabsSize.LG]: {
                    [TabsVariant.UNDERLINE]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[8],
                        bottom: foundationToken.unit[12],
                        left: foundationToken.unit[8],
                    },
                    [TabsVariant.BOXED]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                    [TabsVariant.FLOATING]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                    [TabsVariant.PILLS]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                },
            },
            // Pattern: border.[variant]
            // Example: border.pills
            border: {
                [TabsVariant.UNDERLINE]: 'none',
                [TabsVariant.BOXED]: 'none',
                [TabsVariant.FLOATING]: 'none',
                [TabsVariant.PILLS]: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            container: {
                // Pattern: container.backgroundColor.[variant]
                // Example: container.backgroundColor.pills
                backgroundColor: {
                    [TabsVariant.UNDERLINE]: 'transparent',
                    [TabsVariant.BOXED]: foundationToken.colors.gray[50],
                    [TabsVariant.FLOATING]: 'transparent',
                    [TabsVariant.PILLS]: 'transparent',
                },
                // Pattern: container.borderRadius.[size].[variant]
                // Example: container.borderRadius.lg.boxed
                borderRadius: {
                    [TabsSize.MD]: {
                        [TabsVariant.UNDERLINE]: '0',
                        [TabsVariant.BOXED]: foundationToken.border.radius[8],
                        [TabsVariant.FLOATING]: '0',
                        [TabsVariant.PILLS]: '0',
                    },
                    [TabsSize.LG]: {
                        [TabsVariant.UNDERLINE]: '0',
                        [TabsVariant.BOXED]: foundationToken.border.radius[8],
                        [TabsVariant.FLOATING]: '0',
                        [TabsVariant.PILLS]: '0',
                    },
                },
                // Pattern: container.padding.size.variant.top/right/bottom/left.value
                // Example: container.padding.lg.floating.top
                padding: {
                    [TabsSize.MD]: {
                        [TabsVariant.UNDERLINE]: {
                            top: foundationToken.unit[8],
                            right: '0',
                            bottom: '0',
                            left: '0',
                        },
                        [TabsVariant.BOXED]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsVariant.FLOATING]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsVariant.PILLS]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                    },
                    [TabsSize.LG]: {
                        [TabsVariant.UNDERLINE]: {
                            top: foundationToken.unit[8],
                            right: '0',
                            bottom: '0',
                            left: '0',
                        },
                        [TabsVariant.BOXED]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsVariant.FLOATING]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsVariant.PILLS]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                    },
                },
            },
            trigger: {
                // Pattern: trigger.gap
                gap: foundationToken.unit[8],
                // Pattern: trigger.underline (for underline variant)
                activeIndicator: {
                    height: foundationToken.border.width[2],
                    color: foundationToken.colors.gray[700],
                },
                // Text inside trigger
                text: {
                    // Pattern: trigger.text.color.[variant].[state]
                    // Example: trigger.text.color.underline.disabled
                    color: {
                        [TabsVariant.UNDERLINE]: {
                            default: foundationToken.colors.gray[500],
                            hover: foundationToken.colors.gray[500],
                            active: foundationToken.colors.gray[700],
                            disabled: foundationToken.colors.gray[400],
                        },
                        [TabsVariant.BOXED]: {
                            default: foundationToken.colors.gray[500],
                            hover: foundationToken.colors.gray[500],
                            active: foundationToken.colors.gray[700],
                            disabled: foundationToken.colors.gray[400],
                        },
                        [TabsVariant.FLOATING]: {
                            default: foundationToken.colors.gray[500],
                            hover: foundationToken.colors.gray[700],
                            active: foundationToken.colors.gray[700],
                            disabled: foundationToken.colors.gray[400],
                        },
                        [TabsVariant.PILLS]: {
                            default: foundationToken.colors.gray[500],
                            hover: foundationToken.colors.gray[700],
                            active: foundationToken.colors.gray[700],
                            disabled: foundationToken.colors.gray[400],
                        },
                    },
                    // Pattern: trigger.text.fontSize.[size]
                    // Example: trigger.text.fontSize.lg
                    fontSize: {
                        [TabsSize.MD]:
                            foundationToken.font.size.body.md.fontSize,
                        [TabsSize.LG]:
                            foundationToken.font.size.body.md.fontSize,
                    },
                    // Pattern: trigger.text.fontWeight.[size]
                    // Example: trigger.text.fontWeight.md
                    fontWeight: {
                        [TabsSize.MD]: foundationToken.font.weight[500],
                        [TabsSize.LG]: foundationToken.font.weight[500],
                    },
                },
            },
        },
    }
}
