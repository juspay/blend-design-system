import type { CSSObject } from 'styled-components'
import { FOUNDATION_THEME, type ThemeType } from '../../tokens'
import { SwitchSize } from './types'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type SwitchState = 'default' | 'hover' | 'disabled' | 'error'
export type SwitchIndicatorState = 'active' | 'inactive'

export type SwitchTokensType = {
    // Base spacing
    gap: CSSObject['gap']
    slotGap: CSSObject['gap']
    contentGap: CSSObject['gap']

    // Core dimensions
    height: {
        [key in SwitchSize]: CSSObject['height']
    }
    width: {
        [key in SwitchSize]: CSSObject['width']
    }

    // Border radius
    borderRadius: {
        base: CSSObject['borderRadius']
        thumb: CSSObject['borderRadius']
    }

    // Indicator (main switch)
    indicator: {
        [key in SwitchIndicatorState]: {
            background: {
                [key in Exclude<
                    SwitchState,
                    'error'
                >]: CSSObject['backgroundColor']
            }
            border: {
                [key in Exclude<SwitchState, 'error'>]: CSSObject['borderColor']
            }
        }
    }

    // Thumb (moving circle)
    thumb: {
        background: CSSObject['backgroundColor']
        border: {
            color: CSSObject['borderColor']
            width: CSSObject['borderWidth']
        }
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

    // Content styling
    content: {
        label: {
            color: {
                [key in SwitchState]: CSSObject['color']
            }
            font: {
                [key in SwitchSize]: {
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                }
            }
        }
        sublabel: {
            color: {
                [key in SwitchState]: CSSObject['color']
            }
            font: {
                [key in SwitchSize]: {
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                }
            }
            spacing: {
                left: {
                    [key in SwitchSize]: CSSObject['marginLeft']
                }
                top: CSSObject['marginTop']
            }
        }
    }

    // Border properties
    borderWidth: {
        [key in SwitchIndicatorState]: {
            [key in Exclude<SwitchState, 'error'>]: number
        }
    }

    // Focus state
    focus: {
        outline: {
            width: CSSObject['borderWidth']
            color: CSSObject['borderColor']
            offset: CSSObject['outlineOffset']
        }
    }

    // Slot (additional content)
    slot: {
        size: {
            [key in SwitchSize]: CSSObject['width']
        }
        spacing: CSSObject['margin']
    }

    // Required indicator
    required: {
        color: CSSObject['color']
        spacing: CSSObject['margin']
    }

    // Animation
    transition: {
        duration: CSSObject['transitionDuration']
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
            slotGap: foundationToken.unit[6],
            contentGap: foundationToken.unit[4],
            height: {
                sm: foundationToken.unit[18],
                md: foundationToken.unit[20],
            },
            width: {
                sm: foundationToken.unit[32],
                md: foundationToken.unit[36],
            },

            borderRadius: {
                base: foundationToken.border.radius.full,
                thumb: foundationToken.border.radius.full,
            },

            indicator: {
                active: {
                    background: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                    },
                    border: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[300],
                    },
                },
                inactive: {
                    background: {
                        default: foundationToken.colors.gray[200],
                        hover: foundationToken.colors.gray[200],
                        disabled: foundationToken.colors.gray[100],
                    },
                    border: {
                        default: foundationToken.colors.gray[150],
                        hover: foundationToken.colors.gray[200],
                        disabled: foundationToken.colors.gray[100],
                    },
                },
            },

            thumb: {
                background: foundationToken.colors.gray[0],
                border: {
                    color: foundationToken.colors.gray[200],
                    width: '0.5px',
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
            },

            content: {
                label: {
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[800],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                    },
                    font: {
                        sm: {
                            fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                            fontWeight: foundationToken.font.weight[500],
                        },
                        md: {
                            fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                            fontWeight: foundationToken.font.weight[500],
                        },
                    },
                },
                sublabel: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[500],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[600],
                    },
                    font: {
                        sm: {
                            fontSize: `${foundationToken.font.size.body.sm.fontSize}px`,
                            fontWeight: foundationToken.font.weight[400],
                        },
                        md: {
                            fontSize: `${foundationToken.font.size.body.sm.fontSize}px`,
                            fontWeight: foundationToken.font.weight[400],
                        },
                    },
                    spacing: {
                        left: {
                            sm: foundationToken.unit[32],
                            md: foundationToken.unit[36],
                        },
                        top: foundationToken.unit[4],
                    },
                },
            },

            borderWidth: {
                inactive: {
                    default: 1,
                    hover: 1,
                    disabled: 1,
                },
                active: {
                    default: 2,
                    hover: 2,
                    disabled: 1,
                },
            },

            focus: {
                outline: {
                    width: foundationToken.border.width[2],
                    color: foundationToken.colors.primary[200],
                    offset: foundationToken.unit[2],
                },
            },

            slot: {
                size: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[12],
                },
                spacing: foundationToken.unit[6],
            },

            required: {
                color: foundationToken.colors.red[600],
                spacing: foundationToken.unit[2],
            },

            transition: {
                duration: '300ms',
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
        lg: {
            gap: foundationToken.unit[8],
            slotGap: foundationToken.unit[6],
            contentGap: foundationToken.unit[4],
            height: {
                sm: foundationToken.unit[12],
                md: foundationToken.unit[16],
            },
            width: {
                sm: foundationToken.unit[24],
                md: foundationToken.unit[32],
            },

            borderRadius: {
                base: foundationToken.border.radius.full,
                thumb: foundationToken.border.radius.full,
            },

            indicator: {
                active: {
                    background: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                    },
                    border: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[300],
                    },
                },
                inactive: {
                    background: {
                        default: foundationToken.colors.gray[200],
                        hover: foundationToken.colors.gray[200],
                        disabled: foundationToken.colors.gray[100],
                    },
                    border: {
                        default: foundationToken.colors.gray[150],
                        hover: foundationToken.colors.gray[200],
                        disabled: foundationToken.colors.gray[100],
                    },
                },
            },

            thumb: {
                background: foundationToken.colors.gray[0],
                border: {
                    color: foundationToken.colors.gray[200],
                    width: '0.5px',
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
            },

            content: {
                label: {
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[800],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                    },
                    font: {
                        sm: {
                            fontSize: `${foundationToken.font.size.body.sm.fontSize}px`,
                            fontWeight: foundationToken.font.weight[500],
                        },
                        md: {
                            fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                            fontWeight: foundationToken.font.weight[500],
                        },
                    },
                },
                sublabel: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[500],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[600],
                    },
                    font: {
                        sm: {
                            fontSize: `${foundationToken.font.size.body.sm.fontSize}px`,
                            fontWeight: foundationToken.font.weight[400],
                        },
                        md: {
                            fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                            fontWeight: foundationToken.font.weight[400],
                        },
                    },
                    spacing: {
                        left: {
                            sm: foundationToken.unit[32],
                            md: foundationToken.unit[36],
                        },
                        top: foundationToken.unit[4],
                    },
                },
            },

            borderWidth: {
                inactive: {
                    default: 1,
                    hover: 1,
                    disabled: 1,
                },
                active: {
                    default: 2,
                    hover: 2,
                    disabled: 1,
                },
            },

            focus: {
                outline: {
                    width: foundationToken.border.width[2],
                    color: foundationToken.colors.primary[200],
                    offset: foundationToken.unit[2],
                },
            },

            slot: {
                size: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[12],
                },
                spacing: foundationToken.unit[6],
            },

            required: {
                color: foundationToken.colors.red[600],
                spacing: foundationToken.unit[2],
            },

            transition: {
                duration: '300ms',
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
    }
}

const switchTokens: ResponsiveSwitchTokens = getSwitchTokens(FOUNDATION_THEME)

export default switchTokens
