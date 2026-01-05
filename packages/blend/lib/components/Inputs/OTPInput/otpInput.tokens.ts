import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'

enum OTPInputState {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}

export type OTPInputTokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in OTPInputState]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in OTPInputState]: CSSObject['color']
        }
    }
    helpIcon: {
        width: CSSObject['width']
        color: {
            [key in OTPInputState]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in OTPInputState]: CSSObject['color']
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
        gap: CSSObject['gap']
        input: {
            height: CSSObject['height']
            width: CSSObject['width']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: {
                [key in OTPInputState]: CSSObject['color']
            }
            borderRadius: CSSObject['borderRadius']
            boxShadow: CSSObject['boxShadow']
            border: {
                [key in OTPInputState]: CSSObject['border']
            }
            backgroundColor: {
                [key in OTPInputState]: CSSObject['backgroundColor']
            }
        }
    }
}

export type ResponsiveOTPInputTokens = {
    [key in keyof BreakpointType]: OTPInputTokensType
}

export const getOTPInputTokens = (
    foundationToken: FoundationTokenType
): ResponsiveOTPInputTokens => {
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
                gap: foundationToken.unit[12],

                input: {
                    height: foundationToken.unit[48],
                    width: foundationToken.unit[42],
                    fontSize: foundationToken.font.size.heading.md.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    borderRadius: foundationToken.border.radius[12],
                    boxShadow: foundationToken.shadows.sm,

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
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[700],
                        focus: foundationToken.colors.gray[700],
                        error: foundationToken.colors.red[800],
                        disabled: foundationToken.colors.gray[300],
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
                gap: foundationToken.unit[12],
                input: {
                    height: foundationToken.unit[48],
                    width: foundationToken.unit[42],
                    fontSize: foundationToken.font.size.heading.md.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    borderRadius: foundationToken.border.radius[12],
                    boxShadow: foundationToken.shadows.sm,
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
                    color: {
                        default: foundationToken.colors.gray[800],
                        hover: foundationToken.colors.gray[800],
                        focus: foundationToken.colors.gray[800],
                        error: foundationToken.colors.red[800],
                        disabled: foundationToken.colors.gray[300],
                    },
                },
            },
        },
    }
}
