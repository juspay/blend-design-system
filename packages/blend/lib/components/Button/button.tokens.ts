import type { CSSObject } from 'styled-components'
import { FOUNDATION_THEME } from '../../tokens'
import { ButtonSize, ButtonSubType, ButtonType } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type ButtonState = 'default' | 'hover' | 'active' | 'disabled'

/**
 * Button Tokens following the pattern: [target].CSSProp.[size].[variant].[subType].[state]
 *
 * Structure:
 * - target: container | text (defines what element the token applies to)
 * - CSSProp: backgroundColor | borderRadius | padding | border | shadow | outline | color
 * - size: sm | md | lg (only for size-dependent properties like padding)
 * - variant: primary | secondary | danger | success (button type/variant)
 * - subType: default | iconOnly | inline (button sub-type)
 * - state: default | hover | active | disabled (interaction state)
 *
 * Size-independent properties: backgroundColor, borderRadius, border, shadow, outline, color
 * Size-dependent properties: padding
 */
export type ButtonTokensType = {
    gap: CSSObject['gap']
    // Pattern: backgroundColor.[variant].[subType].[state]
    backgroundColor: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['background']
            }
        }
    }
    // Pattern: borderRadius.[size].[variant].[subType].[state]
    borderRadius: {
        [key in ButtonSize]: {
            [key in ButtonType]: {
                [key in ButtonSubType]: {
                    [key in ButtonState]: CSSObject['borderRadius']
                }
            }
        }
    }
    // Pattern: padding.[size].[variant].[subType] (size-dependent)
    padding: {
        [key in ButtonSize]: {
            [key in ButtonType]: {
                [key in ButtonSubType]: CSSObject['padding']
            }
        }
    }
    // Pattern: border.[variant].[subType].[state]
    border: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['border']
            }
        }
    }
    // Pattern: shadow.[size].[variant].[subType].[state]
    shadow: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['boxShadow']
            }
        }
    }
    // Pattern: outline.[variant].[subType].[state]
    outline: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['outline']
            }
        }
    }
    text: {
        // Pattern: text.color.[variant].[subType].[state]
        color: {
            [key in ButtonType]: {
                [key in ButtonSubType]: {
                    [key in ButtonState]: CSSObject['color']
                }
            }
        }
    }
}

export type ResponsiveButtonTokens = {
    [key in keyof BreakpointType]: ButtonTokensType
}

export const getButtonTokens = (
    foundationToken: FoundationTokenType
): ResponsiveButtonTokens => {
    return {
        sm: {
            gap: FOUNDATION_THEME.unit[6],
            // Pattern: backgroundColor.[variant].[subType].[state]
            // Example: backgroundColor.primary.default.hover
            backgroundColor: {
                primary: {
                    default: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                        hover: foundationToken.colors.primary[500],
                        active: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                        disabled: foundationToken.colors.primary[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                        hover: foundationToken.colors.primary[500],
                        active: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                        disabled: foundationToken.colors.primary[300],
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                secondary: {
                    default: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[150],
                    },
                    iconOnly: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[150],
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                danger: {
                    default: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} 0%, ${foundationToken.colors.red[500]} 93.75%)`,
                        hover: foundationToken.colors.red[500],
                        active: foundationToken.colors.red[500],
                        disabled: foundationToken.colors.red[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} 0%, ${foundationToken.colors.red[500]} 93.75%)`,
                        hover: foundationToken.colors.red[500],
                        active: foundationToken.colors.red[500],
                        disabled: foundationToken.colors.red[300],
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                success: {
                    default: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.green[600]} 0%, ${foundationToken.colors.green[500]} 100%)`,
                        hover: foundationToken.colors.green[500],
                        active: foundationToken.colors.green[600],
                        disabled: foundationToken.colors.green[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.green[600]} 0%, ${foundationToken.colors.green[500]} 100%)`,
                        hover: foundationToken.colors.green[500],
                        active: foundationToken.colors.green[600],
                        disabled: foundationToken.colors.green[300],
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
            },
            // Pattern: borderRadius.[size].[variant].[subType].[state]
            // Example: borderRadius.sm.secondary.iconOnly.active
            borderRadius: {
                sm: {
                    primary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    secondary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    danger: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    success: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                },
                md: {
                    primary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    secondary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    danger: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    success: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                },
                lg: {
                    primary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    secondary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    danger: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    success: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                },
            },
            // Pattern: padding.[size].[variant].[subType] (size-dependent)
            // Example: padding.lg.primary.inline
            padding: {
                sm: {
                    primary: {
                        default: '6px 16px',
                        iconOnly: '9px 9px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    secondary: {
                        default: '6px 16px',
                        iconOnly: '9px 9px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    danger: {
                        default: '6px 16px',
                        iconOnly: '9px 9px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    success: {
                        default: '6px 16px',
                        iconOnly: '9px 9px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                },
                md: {
                    primary: {
                        default: '8px 16px',
                        iconOnly: '10px 10px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    secondary: {
                        default: '8px 16px',
                        iconOnly: '10px 10px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    danger: {
                        default: '8px 16px',
                        iconOnly: '10px 10px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    success: {
                        default: '8px 16px',
                        iconOnly: '10px 10px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                },
                lg: {
                    primary: {
                        default: '14px 16px',
                        iconOnly: '16px 16px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    secondary: {
                        default: '14px 16px',
                        iconOnly: '16px 16px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    danger: {
                        default: '14px 16px',
                        iconOnly: '16px 16px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    success: {
                        default: '14px 16px',
                        iconOnly: '16px 16px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                },
            },
            // Pattern: border.[variant].[subType].[state]
            // Example: border.danger.default.disabled
            border: {
                primary: {
                    default: {
                        default: `1.5px solid ${foundationToken.colors.primary[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.primary[500]}`,
                        active: `1.5px solid ${foundationToken.colors.primary[600]}`,
                        disabled: `1.5px solid ${foundationToken.colors.primary[300]}`,
                    },
                    iconOnly: {
                        default: `1.5px solid ${foundationToken.colors.primary[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.primary[500]}`,
                        active: `1.5px solid ${foundationToken.colors.primary[600]}`,
                        disabled: `1.5px solid ${foundationToken.colors.primary[300]}`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
                secondary: {
                    default: {
                        default: `1px solid ${foundationToken.colors.gray[200]}`,
                        hover: `1px solid ${foundationToken.colors.gray[150]}`,
                        active: `1px solid ${foundationToken.colors.gray[200]}`,
                        disabled: `1px solid ${foundationToken.colors.gray[150]}`,
                    },
                    iconOnly: {
                        default: `1px solid ${foundationToken.colors.gray[200]}`,
                        hover: `1px solid ${foundationToken.colors.gray[150]}`,
                        active: `1px solid ${foundationToken.colors.gray[200]}`,
                        disabled: `1px solid ${foundationToken.colors.gray[150]}`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
                danger: {
                    default: {
                        default: `1.5px solid ${foundationToken.colors.red[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.red[500]}`,
                        active: `1.5px solid ${foundationToken.colors.red[500]}`,
                        disabled: `1.5px solid ${foundationToken.colors.red[300]}`,
                    },
                    iconOnly: {
                        default: `1.5px solid ${foundationToken.colors.red[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.red[500]}`,
                        active: `1.5px solid ${foundationToken.colors.red[500]}`,
                        disabled: `1.5px solid ${foundationToken.colors.red[300]}`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
                success: {
                    default: {
                        default: `1.5px solid ${foundationToken.colors.green[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.green[500]}`,
                        active: `1.5px solid ${foundationToken.colors.green[600]}`,
                        disabled: `1.5px solid ${foundationToken.colors.green[300]}`,
                    },
                    iconOnly: {
                        default: `1.5px solid ${foundationToken.colors.green[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.green[500]}`,
                        active: `1.5px solid ${foundationToken.colors.green[600]}`,
                        disabled: `1.5px solid ${foundationToken.colors.green[300]}`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
            },
            // Pattern: shadow.[variant].[subType].[state]
            // Example: shadow.primary.default.hover
            shadow: {
                primary: {
                    default: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                secondary: {
                    default: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                danger: {
                    default: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                success: {
                    default: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
            },
            // Pattern: outline.[variant].[subType].[state]
            // Example: outline.success.iconOnly.active
            outline: {
                primary: {
                    default: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.primary[200]}`,
                        disabled: `none`,
                    },
                    iconOnly: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.primary[200]}`,
                        disabled: `none`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `1px solid ${foundationToken.colors.primary[500]}`,
                        disabled: `none`,
                    },
                },
                secondary: {
                    default: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.gray[100]}`,
                        disabled: `none`,
                    },
                    iconOnly: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.gray[100]}`,
                        disabled: `none`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.gray[100]}`,
                        disabled: `none`,
                    },
                },
                danger: {
                    default: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.red[200]}`,
                        disabled: `none`,
                    },
                    iconOnly: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.red[200]}`,
                        disabled: `none`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.red[200]}`,
                        disabled: `none`,
                    },
                },
                success: {
                    default: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.green[200]}`,
                        disabled: `none`,
                    },
                    iconOnly: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.green[200]}`,
                        disabled: `none`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.green[200]}`,
                        disabled: `none`,
                    },
                },
            },
            text: {
                // Pattern: text.color.[variant].[subType].[state]
                // Example: text.color.primary.inline.hover
                color: {
                    primary: {
                        default: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        iconOnly: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        inline: {
                            default: foundationToken.colors.primary[600],
                            hover: foundationToken.colors.primary[600],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.primary[300],
                        },
                    },
                    secondary: {
                        default: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[600],
                            disabled: foundationToken.colors.gray[300],
                        },
                        iconOnly: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[600],
                            disabled: foundationToken.colors.gray[400],
                        },
                        inline: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[600],
                            disabled: foundationToken.colors.gray[400],
                        },
                    },
                    danger: {
                        default: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        iconOnly: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        inline: {
                            default: foundationToken.colors.red[600],
                            hover: foundationToken.colors.red[600],
                            active: foundationToken.colors.red[600],
                            disabled: foundationToken.colors.red[400],
                        },
                    },
                    success: {
                        default: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        iconOnly: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        inline: {
                            default: foundationToken.colors.green[600],
                            hover: foundationToken.colors.green[600],
                            active: foundationToken.colors.green[600],
                            disabled: foundationToken.colors.green[400],
                        },
                    },
                },
            },
        },
        lg: {
            gap: FOUNDATION_THEME.unit[6],
            backgroundColor: {
                primary: {
                    default: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                        hover: foundationToken.colors.primary[500],
                        active: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                        disabled: foundationToken.colors.primary[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                        hover: foundationToken.colors.primary[500],
                        active: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                        disabled: foundationToken.colors.primary[300],
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                secondary: {
                    default: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[150],
                    },
                    iconOnly: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[150],
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                danger: {
                    default: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} 0%, ${foundationToken.colors.red[500]} 93.75%)`,
                        hover: foundationToken.colors.red[500],
                        active: foundationToken.colors.red[500],
                        disabled: foundationToken.colors.red[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} 0%, ${foundationToken.colors.red[500]} 93.75%)`,
                        hover: foundationToken.colors.red[500],
                        active: foundationToken.colors.red[500],
                        disabled: foundationToken.colors.red[300],
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                success: {
                    default: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.green[600]} 0%, ${foundationToken.colors.green[500]} 100%)`,
                        hover: foundationToken.colors.green[500],
                        active: foundationToken.colors.green[600],
                        disabled: foundationToken.colors.green[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.green[600]} 0%, ${foundationToken.colors.green[500]} 100%)`,
                        hover: foundationToken.colors.green[500],
                        active: foundationToken.colors.green[600],
                        disabled: foundationToken.colors.green[300],
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
            },
            // Pattern: borderRadius.[size].[variant].[subType].[state]
            // Example: borderRadius.sm.secondary.iconOnly.active
            borderRadius: {
                sm: {
                    primary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    secondary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    danger: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    success: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                },
                md: {
                    primary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    secondary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    danger: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    success: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                },
                lg: {
                    primary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    secondary: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    danger: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                    success: {
                        default: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        iconOnly: {
                            default: foundationToken.border.radius[10],
                            hover: foundationToken.border.radius[10],
                            active: foundationToken.border.radius[10],
                            disabled: foundationToken.border.radius[10],
                        },
                        inline: {
                            default: foundationToken.border.radius[6],
                            hover: foundationToken.border.radius[6],
                            active: foundationToken.border.radius[6],
                            disabled: foundationToken.border.radius[6],
                        },
                    },
                },
            },
            // Pattern: padding.[size].[variant].[subType] (size-dependent)
            // Example: padding.lg.primary.inline
            padding: {
                sm: {
                    primary: {
                        default: '6px 16px',
                        iconOnly: '9px 9px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    secondary: {
                        default: '6px 16px',
                        iconOnly: '9px 9px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    danger: {
                        default: '6px 16px',
                        iconOnly: '9px 9px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    success: {
                        default: '6px 16px',
                        iconOnly: '9px 9px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                },
                md: {
                    primary: {
                        default: '8px 16px',
                        iconOnly: '10px 10px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    secondary: {
                        default: '8px 16px',
                        iconOnly: '10px 10px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    danger: {
                        default: '8px 16px',
                        iconOnly: '10px 10px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    success: {
                        default: '8px 16px',
                        iconOnly: '10px 10px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                },
                lg: {
                    primary: {
                        default: '10px 16px',
                        iconOnly: '12px 12px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    secondary: {
                        default: '10px 16px',
                        iconOnly: '12px 12px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    danger: {
                        default: '10px 16px',
                        iconOnly: '12px 12px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                    success: {
                        default: '10px 16px',
                        iconOnly: '12px 12px',
                        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    },
                },
            },
            // Pattern: border.[variant].[subType].[state]
            // Example: border.danger.default.disabled
            border: {
                primary: {
                    default: {
                        default: `1.5px solid ${foundationToken.colors.primary[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.primary[500]}`,
                        active: `1.5px solid ${foundationToken.colors.primary[600]}`,
                        disabled: `1.5px solid ${foundationToken.colors.primary[300]}`,
                    },
                    iconOnly: {
                        default: `1.5px solid ${foundationToken.colors.primary[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.primary[500]}`,
                        active: `1.5px solid ${foundationToken.colors.primary[600]}`,
                        disabled: `1.5px solid ${foundationToken.colors.primary[300]}`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
                secondary: {
                    default: {
                        default: `1px solid ${foundationToken.colors.gray[200]}`,
                        hover: `1px solid ${foundationToken.colors.gray[150]}`,
                        active: `1px solid ${foundationToken.colors.gray[200]}`,
                        disabled: `1px solid ${foundationToken.colors.gray[150]}`,
                    },
                    iconOnly: {
                        default: `1px solid ${foundationToken.colors.gray[200]}`,
                        hover: `1px solid ${foundationToken.colors.gray[150]}`,
                        active: `1px solid ${foundationToken.colors.gray[200]}`,
                        disabled: `1px solid ${foundationToken.colors.gray[150]}`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
                danger: {
                    default: {
                        default: `1.5px solid ${foundationToken.colors.red[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.red[500]}`,
                        active: `1.5px solid ${foundationToken.colors.red[500]}`,
                        disabled: `1.5px solid ${foundationToken.colors.red[300]}`,
                    },
                    iconOnly: {
                        default: `1.5px solid ${foundationToken.colors.red[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.red[500]}`,
                        active: `1.5px solid ${foundationToken.colors.red[500]}`,
                        disabled: `1.5px solid ${foundationToken.colors.red[300]}`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
                success: {
                    default: {
                        default: `1.5px solid ${foundationToken.colors.green[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.green[500]}`,
                        active: `1.5px solid ${foundationToken.colors.green[600]}`,
                        disabled: `1.5px solid ${foundationToken.colors.green[300]}`,
                    },
                    iconOnly: {
                        default: `1.5px solid ${foundationToken.colors.green[600]}`,
                        hover: `1.5px solid ${foundationToken.colors.green[500]}`,
                        active: `1.5px solid ${foundationToken.colors.green[600]}`,
                        disabled: `1.5px solid ${foundationToken.colors.green[300]}`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
            },
            // Pattern: shadow.[variant].[subType].[state]
            // Example: shadow.primary.default.hover
            shadow: {
                primary: {
                    default: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                secondary: {
                    default: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                danger: {
                    default: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
                success: {
                    default: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    inline: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                    },
                },
            },
            // Pattern: outline.[variant].[subType].[state]
            // Example: outline.success.iconOnly.active
            outline: {
                primary: {
                    default: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.primary[200]}`,
                        disabled: `none`,
                    },
                    iconOnly: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.primary[200]}`,
                        disabled: `none`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `1px solid ${foundationToken.colors.primary[500]}`,
                        disabled: `none`,
                    },
                },
                secondary: {
                    default: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.gray[100]}`,
                        disabled: `none`,
                    },
                    iconOnly: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.gray[100]}`,
                        disabled: `none`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.gray[100]}`,
                        disabled: `none`,
                    },
                },
                danger: {
                    default: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.red[200]}`,
                        disabled: `none`,
                    },
                    iconOnly: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.red[200]}`,
                        disabled: `none`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.red[200]}`,
                        disabled: `none`,
                    },
                },
                success: {
                    default: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.green[200]}`,
                        disabled: `none`,
                    },
                    iconOnly: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.green[200]}`,
                        disabled: `none`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `3px solid ${foundationToken.colors.green[200]}`,
                        disabled: `none`,
                    },
                },
            },
            text: {
                // Pattern: text.color.[variant].[subType].[state]
                // Example: text.color.primary.inline.hover
                color: {
                    primary: {
                        default: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        iconOnly: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        inline: {
                            default: foundationToken.colors.primary[600],
                            hover: foundationToken.colors.primary[600],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.primary[300],
                        },
                    },
                    secondary: {
                        default: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[600],
                            disabled: foundationToken.colors.gray[300],
                        },
                        iconOnly: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[600],
                            disabled: foundationToken.colors.gray[400],
                        },
                        inline: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[600],
                            disabled: foundationToken.colors.gray[400],
                        },
                    },
                    danger: {
                        default: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        iconOnly: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        inline: {
                            default: foundationToken.colors.red[600],
                            hover: foundationToken.colors.red[600],
                            active: foundationToken.colors.red[600],
                            disabled: foundationToken.colors.red[400],
                        },
                    },
                    success: {
                        default: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        iconOnly: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        inline: {
                            default: foundationToken.colors.green[600],
                            hover: foundationToken.colors.green[600],
                            active: foundationToken.colors.green[600],
                            disabled: foundationToken.colors.green[400],
                        },
                    },
                },
            },
        },
    }
}
