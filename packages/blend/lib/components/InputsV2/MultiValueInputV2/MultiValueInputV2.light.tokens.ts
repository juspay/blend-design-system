import { FoundationTokenType } from '../../../tokens/theme.token'
import { ResponsiveMultiValueInputV2Tokens } from './MultiValueInputV2.tokens'

export const getMultiValueInputV2LightTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveMultiValueInputV2Tokens => {
    return {
        sm: {
            gap: foundationTokens.unit[8],
            borderRadius: foundationTokens.unit[8],
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
                closeButton: {
                    size: foundationTokens.unit[12],
                },
                offSet: 24,
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
                        sm: foundationTokens.unit[5],
                        md: foundationTokens.unit[7],
                        lg: foundationTokens.unit[13],
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
                    default: foundationTokens.colors.gray[700],
                    hover: foundationTokens.colors.gray[700],
                    focus: foundationTokens.colors.gray[700],
                    error: foundationTokens.colors.red[800],
                    disabled: foundationTokens.colors.gray[300],
                },
                placeholderColor: foundationTokens.colors.gray[400],
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
                leftSlot: {
                    width: foundationTokens.unit[16],
                    height: foundationTokens.unit[16],
                },
                rightSlot: {
                    width: foundationTokens.unit[16],
                    height: foundationTokens.unit[16],
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
            borderRadius: foundationTokens.unit[8],
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
                closeButton: {
                    size: foundationTokens.unit[12],
                },
                offSet: 24,
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
                        sm: foundationTokens.unit[4],
                        md: foundationTokens.unit[6],
                        lg: foundationTokens.unit[8],
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
                    default: foundationTokens.colors.gray[700],
                    hover: foundationTokens.colors.gray[700],
                    focus: foundationTokens.colors.gray[700],
                    error: foundationTokens.colors.red[800],
                    disabled: foundationTokens.colors.gray[300],
                },
                placeholderColor: foundationTokens.colors.gray[400],
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
                leftSlot: {
                    width: foundationTokens.unit[16],
                    height: foundationTokens.unit[16],
                },
                rightSlot: {
                    width: foundationTokens.unit[16],
                    height: foundationTokens.unit[16],
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
