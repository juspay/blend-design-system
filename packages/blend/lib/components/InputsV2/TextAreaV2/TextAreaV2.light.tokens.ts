import { FoundationTokenType } from '../../../tokens/theme.token'
import { ResponsiveTextAreaTokens } from './TextAreaV2.tokens'

export const getTextAreaV2LightTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveTextAreaTokens => {
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
                gap: foundationTokens.unit[8],
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                padding: {
                    top: {
                        sm: foundationTokens.unit[10],
                        md: foundationTokens.unit[10],
                        lg: foundationTokens.unit[10],
                    },
                    right: {
                        sm: foundationTokens.unit[14],
                        md: foundationTokens.unit[14],
                        lg: foundationTokens.unit[14],
                    },
                    bottom: {
                        sm: foundationTokens.unit[10],
                        md: foundationTokens.unit[10],
                        lg: foundationTokens.unit[10],
                    },
                    left: {
                        sm: foundationTokens.unit[14],
                        md: foundationTokens.unit[14],
                        lg: foundationTokens.unit[14],
                    },
                },
                borderRadius: foundationTokens.unit[8],
                boxShadow: foundationTokens.shadows.sm,
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
                    error: foundationTokens.colors.red[700],
                    disabled: foundationTokens.colors.gray[300],
                },
                backgroundColor: {
                    default: foundationTokens.colors.gray[0],
                    hover: foundationTokens.colors.gray[0],
                    focus: foundationTokens.colors.gray[0],
                    error: foundationTokens.colors.gray[0],
                    disabled: foundationTokens.colors.gray[50],
                },
                placeholder: {
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
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
                    transition: 'opacity 150ms ease-out',
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
                gap: foundationTokens.unit[8],
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                padding: {
                    top: {
                        sm: foundationTokens.unit[10],
                        md: foundationTokens.unit[10],
                        lg: foundationTokens.unit[10],
                    },
                    right: {
                        sm: foundationTokens.unit[14],
                        md: foundationTokens.unit[14],
                        lg: foundationTokens.unit[14],
                    },
                    bottom: {
                        sm: foundationTokens.unit[10],
                        md: foundationTokens.unit[10],
                        lg: foundationTokens.unit[10],
                    },
                    left: {
                        sm: foundationTokens.unit[14],
                        md: foundationTokens.unit[14],
                        lg: foundationTokens.unit[14],
                    },
                },
                borderRadius: foundationTokens.unit[8],
                boxShadow: foundationTokens.shadows.sm,
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
                    error: foundationTokens.colors.red[700],
                    disabled: foundationTokens.colors.gray[300],
                },
                backgroundColor: {
                    default: foundationTokens.colors.gray[0],
                    hover: foundationTokens.colors.gray[0],
                    focus: foundationTokens.colors.gray[0],
                    error: foundationTokens.colors.gray[0],
                    disabled: foundationTokens.colors.gray[50],
                },
                placeholder: {
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
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
                    transition: 'opacity 150ms ease-out',
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
