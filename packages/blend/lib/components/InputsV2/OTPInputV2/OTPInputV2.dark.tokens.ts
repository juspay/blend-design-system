import { FoundationTokenType } from '../../../tokens/theme.token'
import { ResponsiveOTPInputV2Tokens } from './OTPInputV2.tokens'

export const getOTPInputV2DarkTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveOTPInputV2Tokens => {
    return {
        sm: {
            gap: foundationTokens.unit[8],
            topContainer: {
                label: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[500],
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    color: {
                        default: foundationTokens.colors.gray[700],
                        hover: foundationTokens.colors.gray[700],
                        focus: foundationTokens.colors.gray[700],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                },
                subLabel: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[400],
                        md: foundationTokens.font.weight[400],
                        lg: foundationTokens.font.weight[400],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[300],
                        error: foundationTokens.colors.red[600],
                    },
                },
                helpIcon: {
                    width: {
                        sm: foundationTokens.unit[14],
                        md: foundationTokens.unit[14],
                        lg: foundationTokens.unit[14],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
                },
                required: {
                    color: foundationTokens.colors.red[600],
                },
            },
            inputContainer: {
                gap: foundationTokens.unit[12],
                input: {
                    height: foundationTokens.unit[48],
                    width: foundationTokens.unit[42],
                    fontSize: foundationTokens.font.size.heading.md.fontSize,
                    fontWeight: foundationTokens.font.weight[600],
                    borderRadius: foundationTokens.border.radius[12],
                    boxShadow: foundationTokens.shadows.sm,
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
                    color: {
                        default: foundationTokens.colors.gray[100],
                        hover: foundationTokens.colors.gray[100],
                        focus: foundationTokens.colors.gray[100],
                        error: foundationTokens.colors.red[400],
                        disabled: foundationTokens.colors.gray[500],
                    },
                },
            },
            bottomContainer: {
                hintText: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[400],
                        md: foundationTokens.font.weight[400],
                        lg: foundationTokens.font.weight[400],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[500],
                        hover: foundationTokens.colors.gray[500],
                        focus: foundationTokens.colors.gray[500],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
                },
                errorMessage: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[500],
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: foundationTokens.colors.red[600],
                },
            },
        },
        lg: {
            gap: foundationTokens.unit[8],
            topContainer: {
                label: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[500],
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    color: {
                        default: foundationTokens.colors.gray[0],
                        hover: foundationTokens.colors.gray[700],
                        focus: foundationTokens.colors.gray[700],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                },
                subLabel: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[400],
                        md: foundationTokens.font.weight[400],
                        lg: foundationTokens.font.weight[400],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[300],
                        error: foundationTokens.colors.red[600],
                    },
                },
                helpIcon: {
                    width: {
                        sm: foundationTokens.unit[14],
                        md: foundationTokens.unit[14],
                        lg: foundationTokens.unit[14],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
                },
                required: {
                    color: foundationTokens.colors.red[600],
                },
            },
            inputContainer: {
                gap: foundationTokens.unit[12],
                input: {
                    height: foundationTokens.unit[48],
                    width: foundationTokens.unit[42],
                    fontSize: foundationTokens.font.size.heading.md.fontSize,
                    fontWeight: foundationTokens.font.weight[600],
                    borderRadius: foundationTokens.border.radius[12],
                    boxShadow: foundationTokens.shadows.xs,
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
                    color: {
                        default: foundationTokens.colors.gray[100],
                        hover: foundationTokens.colors.gray[100],
                        focus: foundationTokens.colors.gray[100],
                        error: foundationTokens.colors.red[400],
                        disabled: foundationTokens.colors.gray[500],
                    },
                },
            },
            bottomContainer: {
                hintText: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[400],
                        md: foundationTokens.font.weight[400],
                        lg: foundationTokens.font.weight[400],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[500],
                        hover: foundationTokens.colors.gray[500],
                        focus: foundationTokens.colors.gray[500],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
                },
                errorMessage: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[500],
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: foundationTokens.colors.red[600],
                },
            },
        },
    }
}
