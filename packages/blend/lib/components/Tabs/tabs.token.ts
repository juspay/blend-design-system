import type { CSSObject } from 'styled-components'
import { type ThemeType } from '../../tokens'
import { TabsVariant, TabsSize } from './types'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type TabsState = 'default' | 'hover' | 'active' | 'disabled'

/**
 * Tabs Tokens following the pattern: [target].CSSProp.[size].[variant].[subType].[state]
 *
 * Structure:
 * - target: container | text (defines what element the token applies to)
 * - CSSProp: backgroundColor | borderRadius | padding | border | color | fontWeight | gap | height
 * - size: md | lg (only for size-dependent properties like padding, height)
 * - variant: underline | boxed | floating | pills (tabs variant)
 * - subType: N/A for tabs (no sub-types like Button's default/iconOnly/inline)
 * - state: default | hover | active | disabled (interaction state)
 *
 * Size-independent properties: backgroundColor, border, color, fontWeight
 * Size-dependent properties: borderRadius, padding, gap, height, fontSize
 */
export type TabsTokensType = {
    gap: CSSObject['gap']
    // Pattern: backgroundColor.[variant].[state]
    backgroundColor: {
        [key in TabsVariant]: {
            [key in TabsState]: CSSObject['backgroundColor']
        }
    }
    // Pattern: borderRadius.[size].[variant].[state]
    borderRadius: {
        [key in TabsSize]: {
            [key in TabsVariant]: {
                [key in TabsState]: CSSObject['borderRadius']
            }
        }
    }
    // Pattern: padding.[size].[variant] (size-dependent)
    padding: {
        [key in TabsSize]: {
            [key in TabsVariant]: CSSObject['padding']
        }
    }
    // Pattern: border.[variant].[state]
    border: {
        [key in TabsVariant]: {
            [key in TabsState]: CSSObject['border']
        }
    }
    // Pattern: shadow.[variant].[state]
    shadow: {
        [key in TabsVariant]: {
            [key in TabsState]: CSSObject['boxShadow']
        }
    }
    // Pattern: outline.[variant].[state]
    outline: {
        [key in TabsVariant]: {
            [key in TabsState]: CSSObject['outline']
        }
    }
    container: {
        // Pattern: container.backgroundColor.[variant]
        backgroundColor: {
            [key in TabsVariant]: CSSObject['backgroundColor']
        }
        // Pattern: container.borderRadius.[variant]
        borderRadius: {
            [key in TabsVariant]: CSSObject['borderRadius']
        }
        // Pattern: container.padding.[variant]
        padding: {
            [key in TabsVariant]: CSSObject['padding']
        }
        // Pattern: container.border.[variant]
        border: {
            [key in TabsVariant]: CSSObject['border']
        }
    }
    trigger: {
        // Pattern: trigger.height.[size] (size-dependent)
        height: {
            [key in TabsSize]: CSSObject['height']
        }
        // Pattern: trigger.gap
        gap: CSSObject['gap']
    }
    text: {
        // Pattern: text.color.[variant].[state]
        color: {
            [key in TabsVariant]: {
                [key in TabsState]: CSSObject['color']
            }
        }
        // Pattern: text.fontSize.[size] (size-dependent)
        fontSize: {
            [key in TabsSize]: CSSObject['fontSize']
        }
        // Pattern: text.fontWeight.[size] (size-dependent)
        fontWeight: {
            [key in TabsSize]: CSSObject['fontWeight']
        }
    }
    underline: {
        // Pattern: underline.height
        height: CSSObject['height']
        // Pattern: underline.color
        color: CSSObject['color']
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
            // Pattern: borderRadius.[size].[variant].[state]
            // Example: borderRadius.lg.pills.active
            borderRadius: {
                [TabsSize.MD]: {
                    [TabsVariant.UNDERLINE]: {
                        default: '0',
                        hover: '0',
                        active: '0',
                        disabled: '0',
                    },
                    [TabsVariant.BOXED]: {
                        default: foundationToken.border.radius[8],
                        hover: foundationToken.border.radius[8],
                        active: foundationToken.border.radius[8],
                        disabled: foundationToken.border.radius[8],
                    },
                    [TabsVariant.FLOATING]: {
                        default: foundationToken.border.radius[8],
                        hover: foundationToken.border.radius[8],
                        active: foundationToken.border.radius[8],
                        disabled: foundationToken.border.radius[8],
                    },
                    [TabsVariant.PILLS]: {
                        default: foundationToken.border.radius[28],
                        hover: foundationToken.border.radius[28],
                        active: foundationToken.border.radius[28],
                        disabled: foundationToken.border.radius[28],
                    },
                },
                [TabsSize.LG]: {
                    [TabsVariant.UNDERLINE]: {
                        default: '0',
                        hover: '0',
                        active: '0',
                        disabled: '0',
                    },
                    [TabsVariant.BOXED]: {
                        default: foundationToken.border.radius[8],
                        hover: foundationToken.border.radius[8],
                        active: foundationToken.border.radius[8],
                        disabled: foundationToken.border.radius[8],
                    },
                    [TabsVariant.FLOATING]: {
                        default: foundationToken.border.radius[8],
                        hover: foundationToken.border.radius[8],
                        active: foundationToken.border.radius[8],
                        disabled: foundationToken.border.radius[8],
                    },
                    [TabsVariant.PILLS]: {
                        default: foundationToken.border.radius[28],
                        hover: foundationToken.border.radius[28],
                        active: foundationToken.border.radius[28],
                        disabled: foundationToken.border.radius[28],
                    },
                },
            },
            // Pattern: padding.[size].[variant]
            // Example: padding.md.underline
            padding: {
                [TabsSize.MD]: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.unit[2]}  ${foundationToken.unit[8]} ${foundationToken.unit[6]}`,
                    [TabsVariant.BOXED]: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
                    [TabsVariant.FLOATING]: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
                    [TabsVariant.PILLS]: `${foundationToken.unit[4]} ${foundationToken.unit[12]}`,
                },
                [TabsSize.LG]: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.unit[2]}  ${foundationToken.unit[8]} ${foundationToken.unit[6]}`,
                    [TabsVariant.BOXED]: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
                    [TabsVariant.FLOATING]: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                    [TabsVariant.PILLS]: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
                },
            },
            // Pattern: border.[variant].[state]
            // Example: border.pills.disabled
            border: {
                [TabsVariant.UNDERLINE]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.BOXED]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.FLOATING]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.PILLS]: {
                    default: `1px solid ${foundationToken.colors.gray[200]}`,
                    hover: `1px solid ${foundationToken.colors.gray[200]}`,
                    active: `1px solid ${foundationToken.colors.gray[200]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[200]}`,
                },
            },
            // Pattern: shadow.[variant].[state]
            // Example: shadow.floating.hover
            shadow: {
                [TabsVariant.UNDERLINE]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.BOXED]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.FLOATING]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.PILLS]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
            // Pattern: outline.[variant].[state]
            // Example: outline.boxed.active
            outline: {
                [TabsVariant.UNDERLINE]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.BOXED]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.FLOATING]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.PILLS]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
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
                // Pattern: container.borderRadius.[variant]
                // Example: container.borderRadius.floating
                borderRadius: {
                    [TabsVariant.UNDERLINE]: '0',
                    [TabsVariant.BOXED]: foundationToken.border.radius[8],
                    [TabsVariant.FLOATING]: '0',
                    [TabsVariant.PILLS]: '0',
                },
                // Pattern: container.padding.[variant]
                // Example: container.padding.underline
                padding: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.unit[8]} 0 0 0`,
                    [TabsVariant.BOXED]: foundationToken.unit[4],
                    [TabsVariant.FLOATING]: foundationToken.unit[4],
                    [TabsVariant.PILLS]: foundationToken.unit[4],
                },
                // Pattern: container.border.[variant]
                // Example: container.border.pills
                border: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    [TabsVariant.BOXED]: 'none',
                    [TabsVariant.FLOATING]: 'none',
                    [TabsVariant.PILLS]: 'none',
                },
            },
            trigger: {
                // Pattern: trigger.height.[size]
                // Example: trigger.height.md
                height: {
                    [TabsSize.MD]: foundationToken.unit[36],
                    [TabsSize.LG]: foundationToken.unit[40],
                },
                // Pattern: trigger.gap
                gap: foundationToken.unit[8],
            },
            text: {
                // Pattern: text.color.[variant].[state]
                // Example: text.color.pills.hover
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
                // Pattern: text.fontSize.[size]
                // Example: text.fontSize.md
                fontSize: {
                    [TabsSize.MD]: foundationToken.font.size.body.md.fontSize,
                    [TabsSize.LG]: foundationToken.font.size.body.md.fontSize,
                },
                // Pattern: text.fontWeight.[size]
                // Example: text.fontWeight.lg
                fontWeight: {
                    [TabsSize.MD]: foundationToken.font.weight[500],
                    [TabsSize.LG]: foundationToken.font.weight[500],
                },
            },
            underline: {
                // Pattern: underline.height
                height: foundationToken.border.width[2],
                // Pattern: underline.color
                color: foundationToken.colors.gray[700],
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
            // Pattern: borderRadius.[size].[variant].[state]
            // Example: borderRadius.md.underline.hover
            borderRadius: {
                [TabsSize.MD]: {
                    [TabsVariant.UNDERLINE]: {
                        default: '0',
                        hover: '0',
                        active: '0',
                        disabled: '0',
                    },
                    [TabsVariant.BOXED]: {
                        default: foundationToken.border.radius[8],
                        hover: foundationToken.border.radius[8],
                        active: foundationToken.border.radius[8],
                        disabled: foundationToken.border.radius[8],
                    },
                    [TabsVariant.FLOATING]: {
                        default: foundationToken.border.radius[8],
                        hover: foundationToken.border.radius[8],
                        active: foundationToken.border.radius[8],
                        disabled: foundationToken.border.radius[8],
                    },
                    [TabsVariant.PILLS]: {
                        default: foundationToken.border.radius[28],
                        hover: foundationToken.border.radius[28],
                        active: foundationToken.border.radius[28],
                        disabled: foundationToken.border.radius[28],
                    },
                },
                [TabsSize.LG]: {
                    [TabsVariant.UNDERLINE]: {
                        default: '0',
                        hover: '0',
                        active: '0',
                        disabled: '0',
                    },
                    [TabsVariant.BOXED]: {
                        default: foundationToken.border.radius[8],
                        hover: foundationToken.border.radius[8],
                        active: foundationToken.border.radius[8],
                        disabled: foundationToken.border.radius[8],
                    },
                    [TabsVariant.FLOATING]: {
                        default: foundationToken.border.radius[8],
                        hover: foundationToken.border.radius[8],
                        active: foundationToken.border.radius[8],
                        disabled: foundationToken.border.radius[8],
                    },
                    [TabsVariant.PILLS]: {
                        default: foundationToken.border.radius[28],
                        hover: foundationToken.border.radius[28],
                        active: foundationToken.border.radius[28],
                        disabled: foundationToken.border.radius[28],
                    },
                },
            },
            // Pattern: padding.[size].[variant]
            // Example: padding.lg.boxed
            padding: {
                [TabsSize.MD]: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.unit[2]}  ${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                    [TabsVariant.BOXED]: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                    [TabsVariant.FLOATING]: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                    [TabsVariant.PILLS]: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                },
                [TabsSize.LG]: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.unit[2]}  ${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                    [TabsVariant.BOXED]: `${foundationToken.unit[10]} ${foundationToken.unit[12]}`,
                    [TabsVariant.FLOATING]: `${foundationToken.unit[10]} ${foundationToken.unit[12]}`,
                    [TabsVariant.PILLS]: `${foundationToken.unit[10]} ${foundationToken.unit[12]}`,
                },
            },
            // Pattern: border.[variant].[state]
            // Example: border.underline.disabled
            border: {
                [TabsVariant.UNDERLINE]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.BOXED]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.FLOATING]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.PILLS]: {
                    default: `1px solid ${foundationToken.colors.gray[200]}`,
                    hover: `1px solid ${foundationToken.colors.gray[200]}`,
                    active: `1px solid ${foundationToken.colors.gray[200]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[200]}`,
                },
            },
            // Pattern: shadow.[variant].[state]
            // Example: shadow.pills.hover
            shadow: {
                [TabsVariant.UNDERLINE]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.BOXED]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.FLOATING]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.PILLS]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
            // Pattern: outline.[variant].[state]
            // Example: outline.floating.active
            outline: {
                [TabsVariant.UNDERLINE]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.BOXED]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.FLOATING]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
                [TabsVariant.PILLS]: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
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
                // Pattern: container.borderRadius.[variant]
                // Example: container.borderRadius.boxed
                borderRadius: {
                    [TabsVariant.UNDERLINE]: '0',
                    [TabsVariant.BOXED]: foundationToken.border.radius[8],
                    [TabsVariant.FLOATING]: '0',
                    [TabsVariant.PILLS]: '0',
                },
                // Pattern: container.padding.[variant]
                // Example: container.padding.floating
                padding: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.unit[8]} 0 0 0`,
                    [TabsVariant.BOXED]: foundationToken.unit[4],
                    [TabsVariant.FLOATING]: foundationToken.unit[4],
                    [TabsVariant.PILLS]: foundationToken.unit[4],
                },
                // Pattern: container.border.[variant]
                // Example: container.border.underline
                border: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    [TabsVariant.BOXED]: 'none',
                    [TabsVariant.FLOATING]: 'none',
                    [TabsVariant.PILLS]: 'none',
                },
            },
            trigger: {
                // Pattern: trigger.height.[size]
                // Example: trigger.height.lg
                height: {
                    [TabsSize.MD]: foundationToken.unit[36],
                    [TabsSize.LG]: foundationToken.unit[40],
                },
                // Pattern: trigger.gap
                gap: foundationToken.unit[8],
            },
            text: {
                // Pattern: text.color.[variant].[state]
                // Example: text.color.underline.disabled
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
                // Pattern: text.fontSize.[size]
                // Example: text.fontSize.lg
                fontSize: {
                    [TabsSize.MD]: foundationToken.font.size.body.md.fontSize,
                    [TabsSize.LG]: foundationToken.font.size.body.md.fontSize,
                },
                // Pattern: text.fontWeight.[size]
                // Example: text.fontWeight.md
                fontWeight: {
                    [TabsSize.MD]: foundationToken.font.weight[500],
                    [TabsSize.LG]: foundationToken.font.weight[500],
                },
            },
            underline: {
                // Pattern: underline.height
                height: foundationToken.border.width[2],
                // Pattern: underline.color
                color: foundationToken.colors.gray[700],
            },
        },
    }
}
