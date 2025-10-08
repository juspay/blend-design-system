import type { CSSObject } from 'styled-components'
import { UnitInputSize } from './types'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'

enum UnitInputState {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}

export type UnitInputTokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in UnitInputState]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in UnitInputState]: CSSObject['color']
        }
    }
    helpIcon: {
        width: CSSObject['width']
        color: {
            [key in UnitInputState]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in UnitInputState]: CSSObject['color']
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
            [key in UnitInputSize]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in UnitInputSize]: CSSObject['fontWeight']
        }
        color: {
            [key in UnitInputState]: CSSObject['color']
        }
        borderRadius: {
            [key in UnitInputSize]: CSSObject['borderRadius']
        }
        boxShadow: CSSObject['boxShadow']
        padding: {
            x: {
                [key in UnitInputSize]: CSSObject['padding']
            }
            y: {
                [key in UnitInputSize]: CSSObject['padding']
            }
        }
        border: {
            [key in UnitInputState]: CSSObject['border']
        }
        backgroundColor: {
            [key in UnitInputState]: CSSObject['backgroundColor']
        }
        unit: {
            fontSize: {
                [key in UnitInputSize]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in UnitInputSize]: CSSObject['fontWeight']
            }
            color: {
                [key in UnitInputState]: CSSObject['color']
            }
            padding: {
                [key in UnitInputSize]: CSSObject['padding']
            }
            backgroundColor: {
                [key in UnitInputState]: CSSObject['backgroundColor']
            }
        }
    }
}

export type ResponsiveUnitInputTokens = {
    [key in keyof BreakpointType]: UnitInputTokensType
}

export const getUnitInputTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveUnitInputTokens => {
    return {
        sm: {
            gap: foundationTokens.unit[8],
            label: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: {
                    default: foundationTokens.colors.gray[700],
                    hover: foundationTokens.colors.gray[700],
                    focus: foundationTokens.colors.gray[700],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            subLabel: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[600],
                },
            },
            helpIcon: {
                width: foundationTokens.unit[14],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            hintText: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[500],
                    hover: foundationTokens.colors.gray[500],
                    focus: foundationTokens.colors.gray[500],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: foundationTokens.colors.red[600],
            },
            required: {
                color: foundationTokens.colors.red[600],
            },
            inputContainer: {
                borderRadius: {
                    md: foundationTokens.unit[10],
                    lg: foundationTokens.unit[10],
                },
                fontSize: {
                    md: foundationTokens.font.size.body.md.fontSize,
                    lg: foundationTokens.font.size.body.md.fontSize,
                },
                fontWeight: {
                    md: foundationTokens.font.weight[500],
                    lg: foundationTokens.font.weight[500],
                },
                color: {
                    default: foundationTokens.colors.gray[800],
                    hover: foundationTokens.colors.gray[800],
                    focus: foundationTokens.colors.gray[800],
                    error: foundationTokens.colors.red[800],
                    disabled: foundationTokens.colors.gray[300],
                },
                padding: {
                    x: {
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[14],
                    },
                    y: {
                        md: foundationTokens.unit[8],
                        lg: foundationTokens.unit[14],
                    },
                },
                border: {
                    default: `1px solid ${foundationTokens.colors.gray[200]}`,
                    hover: `1px solid ${foundationTokens.colors.gray[400]}`,
                    focus: `1px solid ${foundationTokens.colors.primary[500]}`,
                    error: `1px solid ${foundationTokens.colors.red[500]}`,
                    disabled: `1px solid ${foundationTokens.colors.gray[200]}`,
                },
                backgroundColor: {
                    default: foundationTokens.colors.gray[0],
                    disabled: foundationTokens.colors.gray[50],
                    hover: foundationTokens.colors.gray[0],
                    focus: foundationTokens.colors.gray[0],
                    error: foundationTokens.colors.gray[0],
                },
                boxShadow: foundationTokens.shadows.sm,
                unit: {
                    fontSize: {
                        md: foundationTokens.font.size.body.md.fontSize,
                        lg: foundationTokens.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    color: {
                        default: foundationTokens.colors.gray[500],
                        hover: foundationTokens.colors.gray[500],
                        focus: foundationTokens.colors.gray[500],
                        error: foundationTokens.colors.gray[500],
                        disabled: foundationTokens.colors.gray[300],
                    },
                    padding: {
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[14],
                    },
                    backgroundColor: {
                        default: foundationTokens.colors.gray[0],
                        disabled: foundationTokens.colors.gray[50],
                        hover: foundationTokens.colors.gray[0],
                        focus: foundationTokens.colors.gray[0],
                        error: foundationTokens.colors.gray[0],
                    },
                },
            },
        },
        lg: {
            gap: foundationTokens.unit[8],
            label: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: {
                    default: foundationTokens.colors.gray[700],
                    hover: foundationTokens.colors.gray[700],
                    focus: foundationTokens.colors.gray[700],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            subLabel: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[600],
                },
            },
            helpIcon: {
                width: foundationTokens.unit[14],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            hintText: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[500],
                    hover: foundationTokens.colors.gray[500],
                    focus: foundationTokens.colors.gray[500],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: foundationTokens.colors.red[600],
            },
            required: {
                color: foundationTokens.colors.red[600],
            },
            inputContainer: {
                borderRadius: {
                    md: foundationTokens.unit[10],
                    lg: foundationTokens.unit[10],
                },
                fontSize: {
                    md: foundationTokens.font.size.body.md.fontSize,
                    lg: foundationTokens.font.size.body.md.fontSize,
                },
                fontWeight: {
                    md: foundationTokens.font.weight[500],
                    lg: foundationTokens.font.weight[500],
                },
                color: {
                    default: foundationTokens.colors.gray[800],
                    hover: foundationTokens.colors.gray[800],
                    focus: foundationTokens.colors.gray[800],
                    error: foundationTokens.colors.red[800],
                    disabled: foundationTokens.colors.gray[300],
                },
                padding: {
                    x: {
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[14],
                    },
                    y: {
                        md: foundationTokens.unit[8],
                        lg: foundationTokens.unit[10],
                    },
                },
                border: {
                    default: `1px solid ${foundationTokens.colors.gray[200]}`,
                    hover: `1px solid ${foundationTokens.colors.gray[400]}`,
                    focus: `1px solid ${foundationTokens.colors.primary[500]}`,
                    error: `1px solid ${foundationTokens.colors.red[500]}`,
                    disabled: `1px solid ${foundationTokens.colors.gray[200]}`,
                },
                backgroundColor: {
                    default: foundationTokens.colors.gray[0],
                    disabled: foundationTokens.colors.gray[50],
                    hover: foundationTokens.colors.gray[0],
                    focus: foundationTokens.colors.gray[0],
                    error: foundationTokens.colors.gray[0],
                },
                boxShadow: foundationTokens.shadows.sm,
                unit: {
                    fontSize: {
                        md: foundationTokens.font.size.body.md.fontSize,
                        lg: foundationTokens.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    color: {
                        default: foundationTokens.colors.gray[500],
                        hover: foundationTokens.colors.gray[500],
                        focus: foundationTokens.colors.gray[500],
                        error: foundationTokens.colors.gray[500],
                        disabled: foundationTokens.colors.gray[300],
                    },
                    padding: {
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[14],
                    },
                    backgroundColor: {
                        default: foundationTokens.colors.gray[0],
                        disabled: foundationTokens.colors.gray[50],
                        hover: foundationTokens.colors.gray[0],
                        focus: foundationTokens.colors.gray[0],
                        error: foundationTokens.colors.gray[0],
                    },
                },
            },
        },
    }
}
