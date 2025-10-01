import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { MultiValueInputSize, MultiValueInputState } from './types'
import { BreakpointType } from '../../../breakpoints/breakPoints'

export type MultiValueInputTokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in MultiValueInputState]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in MultiValueInputState]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in MultiValueInputState]: CSSObject['color']
        }
    }
    helpIcon: {
        width: CSSObject['width']
        color: {
            [key in MultiValueInputState]: CSSObject['color']
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
            [key in MultiValueInputSize]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in MultiValueInputSize]: CSSObject['fontWeight']
        }
        gap: CSSObject['gap']
        borderRadius?: CSSObject['borderRadius']
        boxShadow: {
            [key in MultiValueInputState]: CSSObject['boxShadow']
        }
        padding: {
            x: {
                [key in MultiValueInputSize]: CSSObject['padding']
            }

            y: {
                [key in MultiValueInputSize]: CSSObject['padding']
            }
        }
        border: {
            [key in MultiValueInputState]: CSSObject['border']
        }
        color: {
            [key in MultiValueInputState]: CSSObject['color']
        }

        backgroundColor: {
            [key in MultiValueInputState]: CSSObject['backgroundColor']
        }
    }
}

export type ResponsiveMultiValueInputTokens = {
    [key in keyof BreakpointType]: MultiValueInputTokensType
}

export const getMultiValueInputTokens = (
    foundationTheme: FoundationTokenType
): ResponsiveMultiValueInputTokens => {
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
            helpIcon: {
                width: foundationTheme.unit[14],
                color: {
                    default: foundationTheme.colors.gray[400],
                    hover: foundationTheme.colors.gray[400],
                    focus: foundationTheme.colors.gray[400],
                    disabled: foundationTheme.colors.gray[400],
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
                fontSize: {
                    sm: foundationTheme.font.size.body.md.fontSize,
                    md: foundationTheme.font.size.body.md.fontSize,
                    lg: foundationTheme.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: foundationTheme.font.weight[400],
                    md: foundationTheme.font.weight[400],
                    lg: foundationTheme.font.weight[400],
                },
                gap: foundationTheme.unit[8],
                borderRadius: foundationTheme.unit[10],
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
                color: {
                    default: foundationTheme.colors.gray[800],
                    hover: foundationTheme.colors.gray[800],
                    focus: foundationTheme.colors.gray[800],
                    error: foundationTheme.colors.red[800],
                    disabled: foundationTheme.colors.gray[300],
                },
                backgroundColor: {
                    default: foundationTheme.colors.gray[0],
                    disabled: foundationTheme.colors.gray[50],
                    hover: foundationTheme.colors.gray[0],
                    focus: foundationTheme.colors.gray[0],
                    error: foundationTheme.colors.gray[0],
                },
                boxShadow: {
                    default: foundationTheme.shadows.sm,
                    hover: foundationTheme.shadows.sm,
                    focus: foundationTheme.shadows.focusPrimary,
                    error: foundationTheme.shadows.focusError,
                    disabled: foundationTheme.shadows.sm,
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
            helpIcon: {
                width: foundationTheme.unit[14],
                color: {
                    default: foundationTheme.colors.gray[400],
                    hover: foundationTheme.colors.gray[400],
                    focus: foundationTheme.colors.gray[400],
                    disabled: foundationTheme.colors.gray[400],
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
                fontSize: {
                    sm: foundationTheme.font.size.body.md.fontSize,
                    md: foundationTheme.font.size.body.md.fontSize,
                    lg: foundationTheme.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: foundationTheme.font.weight[400],
                    md: foundationTheme.font.weight[400],
                    lg: foundationTheme.font.weight[400],
                },
                gap: foundationTheme.unit[8],
                borderRadius: foundationTheme.unit[10],
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
                color: {
                    default: foundationTheme.colors.gray[800],
                    hover: foundationTheme.colors.gray[800],
                    focus: foundationTheme.colors.gray[800],
                    error: foundationTheme.colors.red[800],
                    disabled: foundationTheme.colors.gray[300],
                },
                backgroundColor: {
                    default: foundationTheme.colors.gray[0],
                    disabled: foundationTheme.colors.gray[50],
                    hover: foundationTheme.colors.gray[0],
                    focus: foundationTheme.colors.gray[0],
                    error: foundationTheme.colors.gray[0],
                },
                boxShadow: {
                    default: foundationTheme.shadows.sm,
                    hover: foundationTheme.shadows.sm,
                    focus: foundationTheme.shadows.focusPrimary,
                    error: foundationTheme.shadows.focusError,
                    disabled: foundationTheme.shadows.sm,
                },
            },
        },
    }
}
