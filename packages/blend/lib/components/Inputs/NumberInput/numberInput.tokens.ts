import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'

enum TextInputSize {
    MD = 'md',
    LG = 'lg',
}

enum NumberInputState {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}

export type NumberInputTokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in NumberInputState]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in NumberInputState]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in NumberInputState]: CSSObject['color']
        }
    }
    helpIcon: {
        width: CSSObject['width']
        color: {
            [key in NumberInputState]: CSSObject['color']
        }
    }
    errorMessage: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    required: {
        color: CSSObject['color']
    }
    inputContainer: {
        fontSize: {
            [key in TextInputSize]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in TextInputSize]: CSSObject['fontWeight']
        }
        color: {
            [key in NumberInputState]: CSSObject['color']
        }
        borderRadius: {
            [key in TextInputSize]: CSSObject['borderRadius']
        }
        boxShadow: CSSObject['boxShadow']

        padding: {
            x: {
                [key in TextInputSize]: CSSObject['padding']
            }
            y: {
                [key in TextInputSize]: CSSObject['padding']
            }
        }
        border: {
            [key in NumberInputState]: CSSObject['border']
        }

        backgroundColor: {
            [key in NumberInputState]: CSSObject['backgroundColor']
        }
        stepperButton: {
            width: {
                [key in TextInputSize]: CSSObject['width']
            }
            backgroundColor: {
                [key in NumberInputState]: CSSObject['backgroundColor']
            }
            icon: {
                color: {
                    [key in NumberInputState]: CSSObject['color']
                }
                fill: {
                    [key in NumberInputState]: CSSObject['fill']
                }
                width: {
                    [key in TextInputSize]: CSSObject['width']
                }
            }
        }
    }
}
export type ResponsiveNumberInputTokens = {
    [key in keyof BreakpointType]: NumberInputTokensType
}

export const getNumberInputTokens = (
    foundationToken: FoundationTokenType
): ResponsiveNumberInputTokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            label: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: {
                    default: foundationToken.colors.gray[700],
                    hover: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[700],
                    disabled: foundationToken.colors.gray[400],
                    error: foundationToken.colors.red[600],
                },
            },
            subLabel: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: {
                    default: foundationToken.colors.gray[400],
                    hover: foundationToken.colors.gray[400],
                    focus: foundationToken.colors.gray[400],
                    disabled: foundationToken.colors.gray[300],
                    error: foundationToken.colors.red[600],
                },
            },
            helpIcon: {
                width: foundationToken.unit[14],
                color: {
                    default: foundationToken.colors.gray[400],
                    hover: foundationToken.colors.gray[400],
                    focus: foundationToken.colors.gray[400],
                    disabled: foundationToken.colors.gray[400],
                    error: foundationToken.colors.red[600],
                },
            },
            hintText: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: {
                    default: foundationToken.colors.gray[500],
                    hover: foundationToken.colors.gray[500],
                    focus: foundationToken.colors.gray[500],
                    disabled: foundationToken.colors.gray[400],
                    error: foundationToken.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: foundationToken.colors.red[600],
            },
            required: {
                color: foundationToken.colors.red[600],
            },

            inputContainer: {
                borderRadius: {
                    md: foundationToken.unit[10],
                    lg: foundationToken.unit[10],
                },
                fontSize: {
                    md: foundationToken.font.size.body.md.fontSize,
                    lg: foundationToken.font.size.body.md.fontSize,
                },
                fontWeight: {
                    md: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
                color: {
                    default: foundationToken.colors.gray[800],
                    hover: foundationToken.colors.gray[800],
                    focus: foundationToken.colors.gray[800],
                    error: foundationToken.colors.red[800],
                    disabled: foundationToken.colors.gray[300],
                },
                padding: {
                    x: {
                        md: foundationToken.unit[12],
                        lg: foundationToken.unit[14],
                    },
                    y: {
                        md: foundationToken.unit[8],
                        lg: foundationToken.unit[10],
                    },
                },
                border: {
                    default: `1px solid ${foundationToken.colors.gray[200]}`,
                    hover: `1px solid ${foundationToken.colors.gray[400]}`,
                    focus: `1px solid ${foundationToken.colors.primary[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                    disabled: foundationToken.colors.gray[50],
                    hover: foundationToken.colors.gray[0],
                    focus: foundationToken.colors.gray[0],
                    error: foundationToken.colors.gray[0],
                },
                boxShadow: foundationToken.shadows.sm,
                stepperButton: {
                    width: {
                        md: foundationToken.unit[32],
                        lg: foundationToken.unit[32],
                    },
                    backgroundColor: {
                        default: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[50],
                        hover: foundationToken.colors.gray[100],
                        focus: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[0],
                    },
                    icon: {
                        color: {
                            default: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[300],
                            hover: foundationToken.colors.gray[400],
                            focus: foundationToken.colors.gray[400],
                            error: foundationToken.colors.gray[400],
                        },

                        fill: {
                            default: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[300],
                            hover: foundationToken.colors.gray[400],
                            focus: foundationToken.colors.gray[400],
                            error: foundationToken.colors.gray[400],
                        },
                        width: {
                            md: foundationToken.unit[6],
                            lg: foundationToken.unit[6],
                        },
                    },
                },
            },
        },
        lg: {
            gap: foundationToken.unit[8],
            label: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: {
                    default: foundationToken.colors.gray[700],
                    hover: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[700],
                    disabled: foundationToken.colors.gray[400],
                    error: foundationToken.colors.red[600],
                },
            },
            subLabel: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: {
                    default: foundationToken.colors.gray[400],
                    hover: foundationToken.colors.gray[400],
                    focus: foundationToken.colors.gray[400],
                    disabled: foundationToken.colors.gray[300],
                    error: foundationToken.colors.red[600],
                },
            },
            helpIcon: {
                width: foundationToken.unit[14],
                color: {
                    default: foundationToken.colors.gray[400],
                    hover: foundationToken.colors.gray[400],
                    focus: foundationToken.colors.gray[400],
                    disabled: foundationToken.colors.gray[400],
                    error: foundationToken.colors.red[600],
                },
            },
            hintText: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: {
                    default: foundationToken.colors.gray[500],
                    hover: foundationToken.colors.gray[500],
                    focus: foundationToken.colors.gray[500],
                    disabled: foundationToken.colors.gray[400],
                    error: foundationToken.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: foundationToken.colors.red[600],
            },
            required: {
                color: foundationToken.colors.red[600],
            },
            inputContainer: {
                borderRadius: {
                    md: foundationToken.unit[10],
                    lg: foundationToken.unit[10],
                },
                fontSize: {
                    md: foundationToken.font.size.body.md.fontSize,
                    lg: foundationToken.font.size.body.md.fontSize,
                },
                fontWeight: {
                    md: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
                color: {
                    default: foundationToken.colors.gray[800],
                    hover: foundationToken.colors.gray[800],
                    focus: foundationToken.colors.gray[800],
                    error: foundationToken.colors.red[800],
                    disabled: foundationToken.colors.gray[300],
                },
                padding: {
                    x: {
                        md: foundationToken.unit[12],
                        lg: foundationToken.unit[14],
                    },
                    y: {
                        md: foundationToken.unit[8],
                        lg: foundationToken.unit[10],
                    },
                },
                border: {
                    default: `1px solid ${foundationToken.colors.gray[200]}`,
                    hover: `1px solid ${foundationToken.colors.gray[400]}`,
                    focus: `1px solid ${foundationToken.colors.primary[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[200]}`,
                },

                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                    disabled: foundationToken.colors.gray[50],
                    hover: foundationToken.colors.gray[0],
                    focus: foundationToken.colors.gray[0],
                    error: foundationToken.colors.gray[0],
                },
                boxShadow: foundationToken.shadows.sm,
                stepperButton: {
                    width: {
                        md: foundationToken.unit[32],
                        lg: foundationToken.unit[32],
                    },
                    backgroundColor: {
                        default: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[50],
                        hover: foundationToken.colors.gray[100],
                        focus: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[0],
                    },
                    icon: {
                        color: {
                            default: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[300],
                            hover: foundationToken.colors.gray[400],
                            focus: foundationToken.colors.gray[400],
                            error: foundationToken.colors.gray[400],
                        },

                        fill: {
                            default: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[300],
                            hover: foundationToken.colors.gray[400],
                            focus: foundationToken.colors.gray[400],
                            error: foundationToken.colors.gray[400],
                        },
                        width: {
                            md: foundationToken.unit[6],
                            lg: foundationToken.unit[6],
                        },
                    },
                },
            },
        },
    }
}
