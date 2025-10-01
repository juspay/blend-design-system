import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { TextInputSize, TextInputState } from './types'
import { BreakpointType } from '../../../breakpoints/breakPoints'

export type TextInputTokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in TextInputState]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in TextInputState]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in TextInputState]: CSSObject['color']
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
            [key in TextInputState]: CSSObject['color']
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
            [key in TextInputState]: CSSObject['border']
        }
        backgroundColor: {
            [key in TextInputState]: CSSObject['backgroundColor']
        }
    }
}

export type ResponsiveTextInputTokens = {
    [key in keyof BreakpointType]: TextInputTokensType
}

export const getTextInputTokens = (
    foundationTheme: FoundationTokenType
): ResponsiveTextInputTokens => {
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
                    sm: foundationTheme.unit[10],
                    md: foundationTheme.unit[10],
                    lg: foundationTheme.unit[10],
                },
                fontSize: {
                    sm: foundationTheme.font.size.body.md.fontSize,
                    md: foundationTheme.font.size.body.md.fontSize,
                    lg: foundationTheme.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: foundationTheme.font.weight[500],
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
                        sm: foundationTheme.unit[10],
                        md: foundationTheme.unit[12],
                        lg: foundationTheme.unit[14],
                    },
                    y: {
                        sm: foundationTheme.unit[6],
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
                    sm: foundationTheme.unit[10],
                    md: foundationTheme.unit[10],
                    lg: foundationTheme.unit[10],
                },
                fontSize: {
                    sm: foundationTheme.font.size.body.md.fontSize,
                    md: foundationTheme.font.size.body.md.fontSize,
                    lg: foundationTheme.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: foundationTheme.font.weight[500],
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
                        sm: foundationTheme.unit[10],
                        md: foundationTheme.unit[12],
                        lg: foundationTheme.unit[14],
                    },
                    y: {
                        sm: foundationTheme.unit[6],
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
            },
        },
    }
}
