import type { CSSObject } from 'styled-components'
import { FOUNDATION_THEME, type ThemeType } from '../../tokens'
import { SwitchSize } from './types'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type SwitchState = 'default' | 'hover' | 'disabled' | 'error'
export type SwitchVariant = 'active' | 'inactive'

/**
 * Switch Tokens following the design system pattern
 *
 * Structure aligned with Checkbox and Radio components:
 * - switchContainer: Main switch element properties
 * - content: Text and subtext styling
 * - slot: Slot element styling
 * - required: Required indicator styling
 */
export type SwitchTokensType = {
    gap: CSSObject['gap']

    switchContainer: {
        // Pattern: switchContainer.height.[size] (size-dependent)
        height: {
            [key in SwitchSize]: CSSObject['height']
        }
        // Pattern: switchContainer.width.[size] (size-dependent)
        width: {
            [key in SwitchSize]: CSSObject['width']
        }
        // Pattern: switchContainer.borderRadius.[size] (size-dependent)
        borderRadius: {
            [key in SwitchSize]: CSSObject['borderRadius']
        }

        // Pattern: switchContainer.backgroundColor.[variant].[state]
        backgroundColor: {
            [key in SwitchVariant]: {
                [key in SwitchState]: CSSObject['backgroundColor']
            }
        }

        thumb: {
            marginTop: CSSObject['marginTop']
            // Pattern: switchContainer.thumb.backgroundColor
            backgroundColor: CSSObject['backgroundColor']
            // Pattern: switchContainer.thumb.border
            border: {
                color: CSSObject['borderColor']
                width: CSSObject['borderWidth']
            }
            // Pattern: switchContainer.thumb.borderRadius.[size] (size-dependent)
            borderRadius: {
                [key in SwitchSize]: CSSObject['borderRadius']
            }
            // Pattern: switchContainer.thumb.size.[size] (size-dependent)
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
            outline: CSSObject['outline']
            outlineOffset: CSSObject['outlineOffset']
            boxShadow: CSSObject['boxShadow']
        }
    }

    content: {
        label: {
            color: {
                [key in SwitchState]: CSSObject['color']
            }
            fontSize: { [key in SwitchSize]: CSSObject['fontSize'] }
            fontWeight: { [key in SwitchSize]: CSSObject['fontWeight'] }
            gap: CSSObject['gap']
        }

        subtext: {
            color: {
                [key in SwitchState]: CSSObject['color']
            }
            fontSize: { [key in SwitchSize]: CSSObject['fontSize'] }
            fontWeight: { [key in SwitchSize]: CSSObject['fontWeight'] }
        }
        gap: CSSObject['gap']
    }
    required: {
        color: CSSObject['color']
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

            switchContainer: {
                height: {
                    sm: foundationToken.unit[18],
                    md: foundationToken.unit[20],
                },
                width: {
                    sm: foundationToken.unit[32],
                    md: foundationToken.unit[36],
                },
                borderRadius: {
                    sm: foundationToken.border.radius.full,
                    md: foundationToken.border.radius.full,
                },

                backgroundColor: {
                    active: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.red[500],
                    },
                    inactive: {
                        default: foundationToken.colors.gray[200],
                        hover: foundationToken.colors.gray[300],
                        disabled: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[200],
                    },
                },

                thumb: {
                    marginTop: foundationToken.unit[4], // 3px margin-top to fix alignment
                    backgroundColor: foundationToken.colors.gray[0],
                    border: {
                        color: foundationToken.colors.gray[200],
                        width: '0.5px',
                    },
                    borderRadius: {
                        sm: foundationToken.border.radius.full,
                        md: foundationToken.border.radius.full,
                    },
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
                    outline: `1px solid ${foundationToken.colors.primary[200]}`,
                    outlineOffset: foundationToken.unit[2],
                    boxShadow: `0 0 0 2px ${foundationToken.colors.primary[100]}`,
                },
            },

            content: {
                label: {
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[800],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                    },
                    fontSize: {
                        sm: foundationToken.font.size.body.md.fontSize,
                        md: foundationToken.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[500],
                        md: foundationToken.font.weight[500],
                    },
                    gap: foundationToken.unit[6],
                },

                subtext: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[500],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[500],
                    },
                    fontSize: {
                        sm: foundationToken.font.size.body.sm.fontSize,
                        md: foundationToken.font.size.body.sm.fontSize,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[400],
                        md: foundationToken.font.weight[400],
                    },
                },
                gap: foundationToken.unit[0],
            },

            required: {
                color: foundationToken.colors.red[600],
            },
        },
        lg: {
            gap: foundationToken.unit[8],

            switchContainer: {
                height: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                },
                width: {
                    sm: foundationToken.unit[24],
                    md: foundationToken.unit[32],
                },
                borderRadius: {
                    sm: foundationToken.border.radius.full,
                    md: foundationToken.border.radius.full,
                },

                backgroundColor: {
                    active: {
                        default: foundationToken.colors.primary[600],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.red[500],
                    },
                    inactive: {
                        default: foundationToken.colors.gray[200],
                        hover: foundationToken.colors.gray[300],
                        disabled: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[200],
                    },
                },

                thumb: {
                    marginTop: foundationToken.unit[4],
                    backgroundColor: foundationToken.colors.gray[0],
                    border: {
                        color: foundationToken.colors.gray[200],
                        width: '0.5px',
                    },
                    borderRadius: {
                        sm: foundationToken.border.radius.full,
                        md: foundationToken.border.radius.full,
                    },
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

                    outline: `1px solid ${foundationToken.colors.primary[200]}`,
                    outlineOffset: foundationToken.unit[2],
                    boxShadow: `0 0 0 2px ${foundationToken.colors.primary[100]}`,
                },
            },

            content: {
                label: {
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[800],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                    },
                    fontSize: {
                        sm: foundationToken.font.size.body.sm.fontSize,
                        md: foundationToken.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[500],
                        md: foundationToken.font.weight[500],
                    },
                    gap: foundationToken.unit[6],
                },

                subtext: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[500],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[500],
                    },
                    fontSize: {
                        sm: foundationToken.font.size.body.sm.fontSize,
                        md: foundationToken.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[400],
                        md: foundationToken.font.weight[400],
                    },
                },
                gap: foundationToken.unit[0],
            },

            required: {
                color: foundationToken.colors.red[600],
            },
        },
    }
}

const switchTokens: ResponsiveSwitchTokens = getSwitchTokens(FOUNDATION_THEME)

export default switchTokens
