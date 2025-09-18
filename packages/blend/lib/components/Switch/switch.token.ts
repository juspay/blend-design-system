import type { CSSObject } from 'styled-components'
import { FOUNDATION_THEME, type ThemeType } from '../../tokens'
import { SwitchSize } from './types'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type SwitchState = 'default' | 'hover' | 'disabled' | 'error'

/**
 * Switch Tokens following the pattern: [target].CSSProp.[size].[variant].[subType].[state]
 *
 * Structure:
 * - target: container | thumb | text (defines what element the token applies to)
 * - CSSProp: backgroundColor | borderRadius | padding | border | color | fontSize | fontWeight | gap | height | width
 * - size: sm | md (only for size-dependent properties like height, width, fontSize)
 * - variant: active | inactive (switch state variant)
 * - subType: N/A for switch (no sub-types needed)
 * - state: default | hover | disabled (interaction state)
 *
 * Size-independent properties: backgroundColor, border, color
 * Size-dependent properties: height, width, fontSize, fontWeight, borderRadius
 */
export type SwitchTokensType = {
    gap: CSSObject['gap']
    marginTop: CSSObject['marginTop']

    // Pattern: backgroundColor.[variant].[state]
    backgroundColor: {
        active: {
            [key in Exclude<SwitchState, 'error'>]: CSSObject['backgroundColor']
        }
        inactive: {
            [key in Exclude<SwitchState, 'error'>]: CSSObject['backgroundColor']
        }
    }

    // Pattern: borderRadius.[size] (size-dependent)
    borderRadius: {
        [key in SwitchSize]: {
            container: CSSObject['borderRadius']
            thumb: CSSObject['borderRadius']
        }
    }

    // Pattern: border.[variant].[state]
    border: {
        active: {
            [key in Exclude<SwitchState, 'error'>]: CSSObject['border']
        }
        inactive: {
            [key in Exclude<SwitchState, 'error'>]: CSSObject['border']
        }
    }

    container: {
        // Pattern: container.height.[size] (size-dependent)
        height: {
            [key in SwitchSize]: CSSObject['height']
        }
        // Pattern: container.width.[size] (size-dependent)
        width: {
            [key in SwitchSize]: CSSObject['width']
        }
    }

    thumb: {
        // Pattern: thumb.backgroundColor
        backgroundColor: CSSObject['backgroundColor']
        // Pattern: thumb.border
        border: {
            color: CSSObject['borderColor']
            width: CSSObject['borderWidth']
        }
        // Pattern: thumb.size.[size] (size-dependent)
        size: {
            [key in SwitchSize]: {
                width: CSSObject['width']
                height: CSSObject['height']
                top: CSSObject['top']
                left: CSSObject['left']
                offset: {
                    active: CSSObject['left']
                    inactive: CSSObject['left']
                }
            }
        }
    }

    text: {
        // Pattern: text.color.[state]
        color: {
            [key in SwitchState]: CSSObject['color']
        }
        // Pattern: text.fontSize.[size] (size-dependent)
        fontSize: {
            [key in SwitchSize]: CSSObject['fontSize']
        }
        // Pattern: text.fontWeight.[size] (size-dependent)
        fontWeight: {
            [key in SwitchSize]: CSSObject['fontWeight']
        }
    }

    subtext: {
        // Pattern: subtext.color.[state]
        color: {
            [key in SwitchState]: CSSObject['color']
        }
        // Pattern: subtext.fontSize.[size] (size-dependent)
        fontSize: {
            [key in SwitchSize]: CSSObject['fontSize']
        }
        // Pattern: subtext.fontWeight.[size] (size-dependent)
        fontWeight: {
            [key in SwitchSize]: CSSObject['fontWeight']
        }
        // Pattern: subtext.spacing.[size] (size-dependent)
        spacing: {
            [key in SwitchSize]: {
                left: CSSObject['marginLeft']
                top: CSSObject['marginTop']
            }
        }
    }

    focus: {
        // Pattern: focus.outline
        outline: {
            width: CSSObject['borderWidth']
            color: CSSObject['borderColor']
            offset: CSSObject['outlineOffset']
        }
    }

    slot: {
        // Pattern: slot.size.[size] (size-dependent)
        size: {
            [key in SwitchSize]: CSSObject['width']
        }
        // Pattern: slot.spacing
        spacing: CSSObject['margin']
    }

    required: {
        // Pattern: required.color
        color: CSSObject['color']
        // Pattern: required.spacing
        spacing: CSSObject['margin']
    }

    transition: {
        // Pattern: transition.duration
        duration: CSSObject['transitionDuration']
        // Pattern: transition.easing
        easing: CSSObject['transitionTimingFunction']
    }
}

export type ResponsiveSwitchTokens = {
    [key in keyof BreakpointType]: SwitchTokensType
}

export const getSwitchTokens = (
    foundationToken: ThemeType
): ResponsiveSwitchTokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            marginTop: foundationToken.unit[4], // 3px margin-top to fix alignment

            // Pattern: backgroundColor.[variant].[state]
            // Example: backgroundColor.active.hover
            backgroundColor: {
                active: {
                    default: foundationToken.colors.primary[500],
                    hover: foundationToken.colors.primary[600],
                    disabled: foundationToken.colors.primary[200],
                },
                inactive: {
                    default: foundationToken.colors.gray[200],
                    hover: foundationToken.colors.gray[200],
                    disabled: foundationToken.colors.gray[100],
                },
            },

            // Pattern: borderRadius.[size]
            // Example: borderRadius.md.container
            borderRadius: {
                sm: {
                    container: foundationToken.border.radius.full,
                    thumb: foundationToken.border.radius.full,
                },
                md: {
                    container: foundationToken.border.radius.full,
                    thumb: foundationToken.border.radius.full,
                },
            },

            // Pattern: border.[variant].[state]
            // Example: border.inactive.disabled
            border: {
                active: {
                    default: `2px solid ${foundationToken.colors.primary[500]}`,
                    hover: `2px solid ${foundationToken.colors.primary[600]}`,
                    disabled: `1px solid ${foundationToken.colors.primary[300]}`,
                },
                inactive: {
                    default: `1px solid ${foundationToken.colors.gray[150]}`,
                    hover: `1px solid ${foundationToken.colors.gray[200]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[100]}`,
                },
            },

            container: {
                // Pattern: container.height.[size]
                // Example: container.height.md
                height: {
                    sm: foundationToken.unit[18],
                    md: foundationToken.unit[20],
                },
                // Pattern: container.width.[size]
                // Example: container.width.sm
                width: {
                    sm: foundationToken.unit[32],
                    md: foundationToken.unit[36],
                },
            },

            thumb: {
                // Pattern: thumb.backgroundColor
                backgroundColor: foundationToken.colors.gray[0],
                // Pattern: thumb.border
                border: {
                    color: foundationToken.colors.gray[200],
                    width: '0.5px',
                },
                // Pattern: thumb.size.[size]
                // Example: thumb.size.md
                size: {
                    sm: {
                        width: foundationToken.unit[14],
                        height: foundationToken.unit[14],
                        top: '2px',
                        left: '4px',
                        offset: {
                            active: foundationToken.unit[12],
                            inactive: foundationToken.unit[2],
                        },
                    },
                    md: {
                        width: foundationToken.unit[16],
                        height: foundationToken.unit[16],
                        top: '2px',
                        left: '2px',
                        offset: {
                            active: foundationToken.unit[16],
                            inactive: foundationToken.unit[2],
                        },
                    },
                },
            },

            text: {
                // Pattern: text.color.[state]
                // Example: text.color.error
                color: {
                    default: foundationToken.colors.gray[700],
                    hover: foundationToken.colors.gray[800],
                    disabled: foundationToken.colors.gray[300],
                    error: foundationToken.colors.red[600],
                },
                // Pattern: text.fontSize.[size]
                // Example: text.fontSize.md
                fontSize: {
                    sm: foundationToken.font.size.body.md.fontSize,
                    md: foundationToken.font.size.body.md.fontSize,
                },
                // Pattern: text.fontWeight.[size]
                // Example: text.fontWeight.sm
                fontWeight: {
                    sm: foundationToken.font.weight[500],
                    md: foundationToken.font.weight[500],
                },
            },

            subtext: {
                // Pattern: subtext.color.[state]
                // Example: subtext.color.disabled
                color: {
                    default: foundationToken.colors.gray[400],
                    hover: foundationToken.colors.gray[500],
                    disabled: foundationToken.colors.gray[200],
                    error: foundationToken.colors.red[600],
                },
                // Pattern: subtext.fontSize.[size]
                // Example: subtext.fontSize.sm
                fontSize: {
                    sm: foundationToken.font.size.body.sm.fontSize,
                    md: foundationToken.font.size.body.sm.fontSize,
                },
                // Pattern: subtext.fontWeight.[size]
                // Example: subtext.fontWeight.md
                fontWeight: {
                    sm: foundationToken.font.weight[400],
                    md: foundationToken.font.weight[400],
                },
                // Pattern: subtext.spacing.[size]
                // Example: subtext.spacing.md.left
                spacing: {
                    sm: {
                        left: foundationToken.unit[32],
                        top: foundationToken.unit[4],
                    },
                    md: {
                        left: foundationToken.unit[36],
                        top: foundationToken.unit[4],
                    },
                },
            },

            focus: {
                // Pattern: focus.outline
                outline: {
                    width: foundationToken.border.width[2],
                    color: foundationToken.colors.primary[200],
                    offset: foundationToken.unit[2],
                },
            },

            slot: {
                // Pattern: slot.size.[size]
                // Example: slot.size.md
                size: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[12],
                },
                // Pattern: slot.spacing
                spacing: foundationToken.unit[6],
            },

            required: {
                // Pattern: required.color
                color: foundationToken.colors.red[600],
                // Pattern: required.spacing
                spacing: foundationToken.unit[2],
            },

            transition: {
                // Pattern: transition.duration
                duration: '300ms',
                // Pattern: transition.easing
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
        lg: {
            gap: foundationToken.unit[8],
            marginTop: foundationToken.unit[4], // 3px margin-top to fix alignment

            // Pattern: backgroundColor.[variant].[state]
            // Example: backgroundColor.inactive.hover
            backgroundColor: {
                active: {
                    default: foundationToken.colors.primary[500],
                    hover: foundationToken.colors.primary[600],
                    disabled: foundationToken.colors.primary[200],
                },
                inactive: {
                    default: foundationToken.colors.gray[200],
                    hover: foundationToken.colors.gray[200],
                    disabled: foundationToken.colors.gray[100],
                },
            },

            // Pattern: borderRadius.[size]
            // Example: borderRadius.sm.thumb
            borderRadius: {
                sm: {
                    container: foundationToken.border.radius.full,
                    thumb: foundationToken.border.radius.full,
                },
                md: {
                    container: foundationToken.border.radius.full,
                    thumb: foundationToken.border.radius.full,
                },
            },

            // Pattern: border.[variant].[state]
            // Example: border.active.default
            border: {
                active: {
                    default: `2px solid ${foundationToken.colors.primary[500]}`,
                    hover: `2px solid ${foundationToken.colors.primary[600]}`,
                    disabled: `1px solid ${foundationToken.colors.primary[300]}`,
                },
                inactive: {
                    default: `1px solid ${foundationToken.colors.gray[150]}`,
                    hover: `1px solid ${foundationToken.colors.gray[200]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[100]}`,
                },
            },

            container: {
                // Pattern: container.height.[size]
                // Example: container.height.sm
                height: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                },
                // Pattern: container.width.[size]
                // Example: container.width.md
                width: {
                    sm: foundationToken.unit[24],
                    md: foundationToken.unit[32],
                },
            },

            thumb: {
                // Pattern: thumb.backgroundColor
                backgroundColor: foundationToken.colors.gray[0],
                // Pattern: thumb.border
                border: {
                    color: foundationToken.colors.gray[200],
                    width: '0.5px',
                },
                // Pattern: thumb.size.[size]
                // Example: thumb.size.sm
                size: {
                    sm: {
                        width: foundationToken.unit[10],
                        height: foundationToken.unit[10],
                        top: '1px',
                        left: '1px',
                        offset: {
                            active: foundationToken.unit[12],
                            inactive: foundationToken.unit[2],
                        },
                    },
                    md: {
                        width: foundationToken.unit[14],
                        height: foundationToken.unit[14],
                        top: '1px',
                        left: '1px',
                        offset: {
                            active: foundationToken.unit[16],
                            inactive: foundationToken.unit[2],
                        },
                    },
                },
            },

            text: {
                // Pattern: text.color.[state]
                // Example: text.color.hover
                color: {
                    default: foundationToken.colors.gray[700],
                    hover: foundationToken.colors.gray[800],
                    disabled: foundationToken.colors.gray[300],
                    error: foundationToken.colors.red[600],
                },
                // Pattern: text.fontSize.[size]
                // Example: text.fontSize.lg
                fontSize: {
                    sm: foundationToken.font.size.body.sm.fontSize,
                    md: foundationToken.font.size.body.md.fontSize,
                },
                // Pattern: text.fontWeight.[size]
                // Example: text.fontWeight.md
                fontWeight: {
                    sm: foundationToken.font.weight[500],
                    md: foundationToken.font.weight[500],
                },
            },

            subtext: {
                // Pattern: subtext.color.[state]
                // Example: subtext.color.default
                color: {
                    default: foundationToken.colors.gray[400],
                    hover: foundationToken.colors.gray[500],
                    disabled: foundationToken.colors.gray[200],
                    error: foundationToken.colors.red[600],
                },
                // Pattern: subtext.fontSize.[size]
                // Example: subtext.fontSize.lg
                fontSize: {
                    sm: foundationToken.font.size.body.sm.fontSize,
                    md: foundationToken.font.size.body.md.fontSize,
                },
                // Pattern: subtext.fontWeight.[size]
                // Example: subtext.fontWeight.sm
                fontWeight: {
                    sm: foundationToken.font.weight[400],
                    md: foundationToken.font.weight[400],
                },
                // Pattern: subtext.spacing.[size]
                // Example: subtext.spacing.sm.top
                spacing: {
                    sm: {
                        left: foundationToken.unit[32],
                        top: foundationToken.unit[4],
                    },
                    md: {
                        left: foundationToken.unit[36],
                        top: foundationToken.unit[4],
                    },
                },
            },

            focus: {
                // Pattern: focus.outline
                outline: {
                    width: foundationToken.border.width[2],
                    color: foundationToken.colors.primary[200],
                    offset: foundationToken.unit[2],
                },
            },

            slot: {
                // Pattern: slot.size.[size]
                // Example: slot.size.sm
                size: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[12],
                },
                // Pattern: slot.spacing
                spacing: foundationToken.unit[6],
            },

            required: {
                // Pattern: required.color
                color: foundationToken.colors.red[600],
                // Pattern: required.spacing
                spacing: foundationToken.unit[2],
            },

            transition: {
                // Pattern: transition.duration
                duration: '300ms',
                // Pattern: transition.easing
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
    }
}

const switchTokens: ResponsiveSwitchTokens = getSwitchTokens(FOUNDATION_THEME)

export default switchTokens
