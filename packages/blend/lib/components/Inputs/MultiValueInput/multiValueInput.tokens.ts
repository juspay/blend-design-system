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
    foundationTokens: FoundationTokenType
): ResponsiveMultiValueInputTokens => {
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
                fontSize: {
                    sm: foundationTokens.font.size.body.md.fontSize,
                    md: foundationTokens.font.size.body.md.fontSize,
                    lg: foundationTokens.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: foundationTokens.font.weight[400],
                    md: foundationTokens.font.weight[400],
                    lg: foundationTokens.font.weight[400],
                },
                gap: foundationTokens.unit[8],
                borderRadius: foundationTokens.unit[10],
                padding: {
                    x: {
                        sm: foundationTokens.unit[10],
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[14],
                    },
                    y: {
                        sm: foundationTokens.unit[6],
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
                color: {
                    default: foundationTokens.colors.gray[800],
                    hover: foundationTokens.colors.gray[800],
                    focus: foundationTokens.colors.gray[800],
                    error: foundationTokens.colors.red[800],
                    disabled: foundationTokens.colors.gray[300],
                },
                backgroundColor: {
                    default: foundationTokens.colors.gray[0],
                    disabled: foundationTokens.colors.gray[50],
                    hover: foundationTokens.colors.gray[0],
                    focus: foundationTokens.colors.gray[0],
                    error: foundationTokens.colors.gray[0],
                },
                boxShadow: {
                    default: foundationTokens.shadows.sm,
                    hover: foundationTokens.shadows.sm,
                    focus: foundationTokens.shadows.focusPrimary,
                    error: foundationTokens.shadows.focusError,
                    disabled: foundationTokens.shadows.sm,
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
                fontSize: {
                    sm: foundationTokens.font.size.body.md.fontSize,
                    md: foundationTokens.font.size.body.md.fontSize,
                    lg: foundationTokens.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: foundationTokens.font.weight[400],
                    md: foundationTokens.font.weight[400],
                    lg: foundationTokens.font.weight[400],
                },
                gap: foundationTokens.unit[8],
                borderRadius: foundationTokens.unit[10],
                padding: {
                    x: {
                        sm: foundationTokens.unit[10],
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[14],
                    },
                    y: {
                        sm: foundationTokens.unit[6],
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
                color: {
                    default: foundationTokens.colors.gray[800],
                    hover: foundationTokens.colors.gray[800],
                    focus: foundationTokens.colors.gray[800],
                    error: foundationTokens.colors.red[800],
                    disabled: foundationTokens.colors.gray[300],
                },
                backgroundColor: {
                    default: foundationTokens.colors.gray[0],
                    disabled: foundationTokens.colors.gray[50],
                    hover: foundationTokens.colors.gray[0],
                    focus: foundationTokens.colors.gray[0],
                    error: foundationTokens.colors.gray[0],
                },
                boxShadow: {
                    default: foundationTokens.shadows.sm,
                    hover: foundationTokens.shadows.sm,
                    focus: foundationTokens.shadows.focusPrimary,
                    error: foundationTokens.shadows.focusError,
                    disabled: foundationTokens.shadows.sm,
                },
            },
        },
    }
}
