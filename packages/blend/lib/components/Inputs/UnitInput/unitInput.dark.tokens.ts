import type { FoundationTokenType } from '../../../tokens/theme.token'
import type { ResponsiveUnitInputTokens } from './unitInput.tokens.types'

export const getUnitInputDarkTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveUnitInputTokens => {
    return {
        sm: {
            gap: foundationTokens.unit[8],
            label: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: {
                    default: foundationTokens.colors.gray[100],
                    hover: foundationTokens.colors.gray[100],
                    focus: foundationTokens.colors.gray[100],
                    disabled: foundationTokens.colors.gray[500],
                    error: foundationTokens.colors.red[400],
                },
            },
            subLabel: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[600],
                    error: foundationTokens.colors.red[400],
                },
            },
            helpIcon: {
                width: foundationTokens.unit[14],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[500],
                    error: foundationTokens.colors.red[400],
                },
            },
            hintText: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[500],
                    focus: foundationTokens.colors.gray[500],
                    disabled: foundationTokens.colors.gray[500],
                    error: foundationTokens.colors.red[400],
                },
            },
            errorMessage: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: foundationTokens.colors.red[400],
            },
            required: {
                color: foundationTokens.colors.red[400],
            },
            placeholder: {
                color: foundationTokens.colors.gray[500],
            },
            inputContainer: {
                borderRadius: {
                    sm: foundationTokens.unit[10],
                    md: foundationTokens.unit[10],
                    lg: foundationTokens.unit[10],
                },
                fontSize: {
                    sm: foundationTokens.font.size.body.md.fontSize,
                    md: foundationTokens.font.size.body.md.fontSize,
                    lg: foundationTokens.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: foundationTokens.font.weight[500],
                    md: foundationTokens.font.weight[500],
                    lg: foundationTokens.font.weight[500],
                },
                color: {
                    default: foundationTokens.colors.gray[100],
                    hover: foundationTokens.colors.gray[100],
                    focus: foundationTokens.colors.gray[100],
                    error: foundationTokens.colors.red[400],
                    disabled: foundationTokens.colors.gray[600],
                },
                padding: {
                    x: {
                        sm: foundationTokens.unit[10],
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[14],
                    },
                    y: {
                        sm: foundationTokens.unit[6],
                        md: foundationTokens.unit[8],
                        lg: foundationTokens.unit[14],
                    },
                },
                border: {
                    default: `1px solid ${foundationTokens.colors.gray[800]}`,
                    hover: `1px solid ${foundationTokens.colors.gray[700]}`,
                    focus: `1px solid ${foundationTokens.colors.primary[500]}`,
                    error: `1px solid ${foundationTokens.colors.red[500]}`,
                    disabled: `1px solid ${foundationTokens.colors.gray[800]}`,
                },
                backgroundColor: {
                    default: foundationTokens.colors.gray[900],
                    disabled: foundationTokens.colors.gray[800],
                    hover: foundationTokens.colors.gray[900],
                    focus: foundationTokens.colors.gray[900],
                    error: foundationTokens.colors.gray[900],
                },
                boxShadow: foundationTokens.shadows.sm,
                unit: {
                    fontSize: {
                        sm: foundationTokens.font.size.body.md.fontSize,
                        md: foundationTokens.font.size.body.md.fontSize,
                        lg: foundationTokens.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[500],
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[500],
                        focus: foundationTokens.colors.gray[500],
                        error: foundationTokens.colors.gray[500],
                        disabled: foundationTokens.colors.gray[600],
                    },
                    padding: {
                        sm: foundationTokens.unit[10],
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[14],
                    },
                    backgroundColor: {
                        default: foundationTokens.colors.gray[800],
                        disabled: foundationTokens.colors.gray[800],
                        hover: foundationTokens.colors.gray[900],
                        focus: foundationTokens.colors.gray[900],
                        error: foundationTokens.colors.gray[900],
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
                    default: foundationTokens.colors.gray[100],
                    hover: foundationTokens.colors.gray[100],
                    focus: foundationTokens.colors.gray[100],
                    disabled: foundationTokens.colors.gray[500],
                    error: foundationTokens.colors.red[400],
                },
            },
            subLabel: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[600],
                    error: foundationTokens.colors.red[400],
                },
            },
            helpIcon: {
                width: foundationTokens.unit[14],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[500],
                    error: foundationTokens.colors.red[400],
                },
            },
            hintText: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[500],
                    focus: foundationTokens.colors.gray[500],
                    disabled: foundationTokens.colors.gray[500],
                    error: foundationTokens.colors.red[400],
                },
            },
            errorMessage: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: foundationTokens.colors.red[400],
            },
            required: {
                color: foundationTokens.colors.red[400],
            },
            placeholder: {
                color: foundationTokens.colors.gray[500],
            },
            inputContainer: {
                borderRadius: {
                    sm: foundationTokens.unit[10],
                    md: foundationTokens.unit[10],
                    lg: foundationTokens.unit[10],
                },
                fontSize: {
                    sm: foundationTokens.font.size.body.md.fontSize,
                    md: foundationTokens.font.size.body.md.fontSize,
                    lg: foundationTokens.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: foundationTokens.font.weight[500],
                    md: foundationTokens.font.weight[500],
                    lg: foundationTokens.font.weight[500],
                },
                color: {
                    default: foundationTokens.colors.gray[100],
                    hover: foundationTokens.colors.gray[100],
                    focus: foundationTokens.colors.gray[100],
                    error: foundationTokens.colors.red[400],
                    disabled: foundationTokens.colors.gray[600],
                },
                padding: {
                    x: {
                        sm: foundationTokens.unit[10],
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[14],
                    },
                    y: {
                        sm: foundationTokens.unit[4],
                        md: foundationTokens.unit[6],
                        lg: foundationTokens.unit[8],
                    },
                },
                border: {
                    default: `1px solid ${foundationTokens.colors.gray[800]}`,
                    hover: `1px solid ${foundationTokens.colors.gray[700]}`,
                    focus: `1px solid ${foundationTokens.colors.primary[500]}`,
                    error: `1px solid ${foundationTokens.colors.red[500]}`,
                    disabled: `1px solid ${foundationTokens.colors.gray[800]}`,
                },
                backgroundColor: {
                    default: foundationTokens.colors.gray[900],
                    disabled: foundationTokens.colors.gray[800],
                    hover: foundationTokens.colors.gray[900],
                    focus: foundationTokens.colors.gray[900],
                    error: foundationTokens.colors.gray[900],
                },
                boxShadow: foundationTokens.shadows.sm,
                unit: {
                    fontSize: {
                        sm: foundationTokens.font.size.body.md.fontSize,
                        md: foundationTokens.font.size.body.md.fontSize,
                        lg: foundationTokens.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[500],
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[500],
                        focus: foundationTokens.colors.gray[500],
                        error: foundationTokens.colors.gray[500],
                        disabled: foundationTokens.colors.gray[600],
                    },
                    padding: {
                        sm: foundationTokens.unit[10],
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[14],
                    },
                    backgroundColor: {
                        default: foundationTokens.colors.gray[800],
                        disabled: foundationTokens.colors.gray[800],
                        hover: foundationTokens.colors.gray[900],
                        focus: foundationTokens.colors.gray[900],
                        error: foundationTokens.colors.gray[900],
                    },
                },
            },
        },
    }
}
