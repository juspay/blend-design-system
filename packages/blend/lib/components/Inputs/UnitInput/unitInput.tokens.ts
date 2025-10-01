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
    foundationTheme: FoundationTokenType
): ResponsiveUnitInputTokens => {
    return {
        sm: {
            gap: foundationTheme.unit[8],
            label: {
                fontSize: foundationTheme.font.size.body.md.fontSize,
                fontWeight: foundationTheme.font.weight[500],
                color: {
                    default: foundationTheme.colors.gray[700],
                    hover: foundationTheme.colors.gray[700],
                    focus: foundationTheme.colors.gray[700],
                    disabled: foundationTheme.colors.gray[400],
                    error: foundationTheme.colors.red[600],
                },
            },
            subLabel: {
                fontSize: foundationTheme.font.size.body.md.fontSize,
                fontWeight: foundationTheme.font.weight[400],
                color: {
                    default: foundationTheme.colors.gray[400],
                    hover: foundationTheme.colors.gray[400],
                    focus: foundationTheme.colors.gray[400],
                    disabled: foundationTheme.colors.gray[300],
                    error: foundationTheme.colors.red[600],
                },
            },
            hintText: {
                fontSize: foundationTheme.font.size.body.md.fontSize,
                fontWeight: foundationTheme.font.weight[400],
                color: {
                    default: foundationTheme.colors.gray[500],
                    hover: foundationTheme.colors.gray[500],
                    focus: foundationTheme.colors.gray[500],
                    disabled: foundationTheme.colors.gray[400],
                    error: foundationTheme.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: foundationTheme.font.size.body.md.fontSize,
                fontWeight: foundationTheme.font.weight[500],
                color: foundationTheme.colors.red[600],
            },
            required: {
                color: foundationTheme.colors.red[600],
            },
            inputContainer: {
                borderRadius: {
                    md: foundationTheme.unit[10],
                    lg: foundationTheme.unit[10],
                },
                fontSize: {
                    md: foundationTheme.font.size.body.md.fontSize,
                    lg: foundationTheme.font.size.body.md.fontSize,
                },
                fontWeight: {
                    md: foundationTheme.font.weight[500],
                    lg: foundationTheme.font.weight[500],
                },
                color: {
                    default: foundationTheme.colors.gray[800],
                    hover: foundationTheme.colors.gray[800],
                    focus: foundationTheme.colors.gray[800],
                    error: foundationTheme.colors.red[800],
                    disabled: foundationTheme.colors.gray[300],
                },
                padding: {
                    x: {
                        md: foundationTheme.unit[12],
                        lg: foundationTheme.unit[14],
                    },
                    y: {
                        md: foundationTheme.unit[8],
                        lg: foundationTheme.unit[14],
                    },
                },
                border: {
                    default: `1px solid ${foundationTheme.colors.gray[200]}`,
                    hover: `1px solid ${foundationTheme.colors.gray[400]}`,
                    focus: `1px solid ${foundationTheme.colors.primary[500]}`,
                    error: `1px solid ${foundationTheme.colors.red[500]}`,
                    disabled: `1px solid ${foundationTheme.colors.gray[200]}`,
                },
                backgroundColor: {
                    default: foundationTheme.colors.gray[0],
                    disabled: foundationTheme.colors.gray[50],
                    hover: foundationTheme.colors.gray[0],
                    focus: foundationTheme.colors.gray[0],
                    error: foundationTheme.colors.gray[0],
                },
                boxShadow: foundationTheme.shadows.sm,
                unit: {
                    fontSize: {
                        md: foundationTheme.font.size.body.md.fontSize,
                        lg: foundationTheme.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        md: foundationTheme.font.weight[500],
                        lg: foundationTheme.font.weight[500],
                    },
                    color: {
                        default: foundationTheme.colors.gray[500],
                        hover: foundationTheme.colors.gray[500],
                        focus: foundationTheme.colors.gray[500],
                        error: foundationTheme.colors.gray[500],
                        disabled: foundationTheme.colors.gray[300],
                    },
                    padding: {
                        md: foundationTheme.unit[12],
                        lg: foundationTheme.unit[14],
                    },
                    backgroundColor: {
                        default: foundationTheme.colors.gray[0],
                        disabled: foundationTheme.colors.gray[50],
                        hover: foundationTheme.colors.gray[0],
                        focus: foundationTheme.colors.gray[0],
                        error: foundationTheme.colors.gray[0],
                    },
                },
            },
        },
        lg: {
            gap: foundationTheme.unit[8],
            label: {
                fontSize: foundationTheme.font.size.body.md.fontSize,
                fontWeight: foundationTheme.font.weight[500],
                color: {
                    default: foundationTheme.colors.gray[700],
                    hover: foundationTheme.colors.gray[700],
                    focus: foundationTheme.colors.gray[700],
                    disabled: foundationTheme.colors.gray[400],
                    error: foundationTheme.colors.red[600],
                },
            },
            subLabel: {
                fontSize: foundationTheme.font.size.body.md.fontSize,
                fontWeight: foundationTheme.font.weight[400],
                color: {
                    default: foundationTheme.colors.gray[400],
                    hover: foundationTheme.colors.gray[400],
                    focus: foundationTheme.colors.gray[400],
                    disabled: foundationTheme.colors.gray[300],
                    error: foundationTheme.colors.red[600],
                },
            },
            hintText: {
                fontSize: foundationTheme.font.size.body.md.fontSize,
                fontWeight: foundationTheme.font.weight[400],
                color: {
                    default: foundationTheme.colors.gray[500],
                    hover: foundationTheme.colors.gray[500],
                    focus: foundationTheme.colors.gray[500],
                    disabled: foundationTheme.colors.gray[400],
                    error: foundationTheme.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: foundationTheme.font.size.body.md.fontSize,
                fontWeight: foundationTheme.font.weight[500],
                color: foundationTheme.colors.red[600],
            },
            required: {
                color: foundationTheme.colors.red[600],
            },
            inputContainer: {
                borderRadius: {
                    md: foundationTheme.unit[10],
                    lg: foundationTheme.unit[10],
                },
                fontSize: {
                    md: foundationTheme.font.size.body.md.fontSize,
                    lg: foundationTheme.font.size.body.md.fontSize,
                },
                fontWeight: {
                    md: foundationTheme.font.weight[500],
                    lg: foundationTheme.font.weight[500],
                },
                color: {
                    default: foundationTheme.colors.gray[800],
                    hover: foundationTheme.colors.gray[800],
                    focus: foundationTheme.colors.gray[800],
                    error: foundationTheme.colors.red[800],
                    disabled: foundationTheme.colors.gray[300],
                },
                padding: {
                    x: {
                        md: foundationTheme.unit[12],
                        lg: foundationTheme.unit[14],
                    },
                    y: {
                        md: foundationTheme.unit[8],
                        lg: foundationTheme.unit[10],
                    },
                },
                border: {
                    default: `1px solid ${foundationTheme.colors.gray[200]}`,
                    hover: `1px solid ${foundationTheme.colors.gray[400]}`,
                    focus: `1px solid ${foundationTheme.colors.primary[500]}`,
                    error: `1px solid ${foundationTheme.colors.red[500]}`,
                    disabled: `1px solid ${foundationTheme.colors.gray[200]}`,
                },
                backgroundColor: {
                    default: foundationTheme.colors.gray[0],
                    disabled: foundationTheme.colors.gray[50],
                    hover: foundationTheme.colors.gray[0],
                    focus: foundationTheme.colors.gray[0],
                    error: foundationTheme.colors.gray[0],
                },
                boxShadow: foundationTheme.shadows.sm,
                unit: {
                    fontSize: {
                        md: foundationTheme.font.size.body.md.fontSize,
                        lg: foundationTheme.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        md: foundationTheme.font.weight[500],
                        lg: foundationTheme.font.weight[500],
                    },
                    color: {
                        default: foundationTheme.colors.gray[500],
                        hover: foundationTheme.colors.gray[500],
                        focus: foundationTheme.colors.gray[500],
                        error: foundationTheme.colors.gray[500],
                        disabled: foundationTheme.colors.gray[300],
                    },
                    padding: {
                        md: foundationTheme.unit[12],
                        lg: foundationTheme.unit[14],
                    },
                    backgroundColor: {
                        default: foundationTheme.colors.gray[0],
                        disabled: foundationTheme.colors.gray[50],
                        hover: foundationTheme.colors.gray[0],
                        focus: foundationTheme.colors.gray[0],
                        error: foundationTheme.colors.gray[0],
                    },
                },
            },
        },
    }
}
