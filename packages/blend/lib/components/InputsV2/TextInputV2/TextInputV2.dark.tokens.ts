import { FoundationTokenType } from '../../../tokens/theme.token'
import { ResponsiveTextInputV2Tokens } from './TextInputV2.tokens'

export const getTextInputV2DarkTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveTextInputV2Tokens => {
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
                        // shadcn dark: foreground on dark bg (~slate-100)
                        default: foundationTokens.colors.gray[100],
                        hover: foundationTokens.colors.gray[100],
                        focus: foundationTokens.colors.gray[100],
                        disabled: foundationTokens.colors.gray[500],
                        error: foundationTokens.colors.red[400],
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
                        // muted foreground on dark (~slate-400)
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[600],
                        error: foundationTokens.colors.red[400],
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
                        hover: foundationTokens.colors.gray[300],
                        focus: foundationTokens.colors.gray[300],
                        disabled: foundationTokens.colors.gray[600],
                        error: foundationTokens.colors.red[400],
                    },
                },
                required: {
                    color: foundationTokens.colors.red[400],
                },
            },
            inputContainer: {
                gap: foundationTokens.unit[8],
                placeholder: {
                    color: {
                        // shadcn dark input placeholder (~slate-500)
                        default: foundationTokens.colors.gray[500],
                        hover: foundationTokens.colors.gray[500],
                        focus: foundationTokens.colors.gray[500],
                        disabled: foundationTokens.colors.gray[600],
                        error: foundationTokens.colors.red[400],
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
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                },
                inputText: {
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
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[18],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        // shadcn dark input foreground (~slate-100)
                        default: foundationTokens.colors.gray[100],
                        hover: foundationTokens.colors.gray[100],
                        focus: foundationTokens.colors.gray[100],
                        error: foundationTokens.colors.red[400],
                        disabled: foundationTokens.colors.gray[500],
                    },
                },
                borderRadius: {
                    sm: foundationTokens.unit[10],
                    md: foundationTokens.unit[10],
                    lg: foundationTokens.unit[10],
                },
                padding: {
                    top: {
                        sm: foundationTokens.unit[6],
                        md: foundationTokens.unit[7],
                        lg: foundationTokens.unit[15],
                    },
                    right: {
                        sm: foundationTokens.unit[12],
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[12],
                    },
                    bottom: {
                        sm: foundationTokens.unit[6],
                        md: foundationTokens.unit[7],
                        lg: foundationTokens.unit[15],
                    },
                    left: {
                        sm: foundationTokens.unit[12],
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[12],
                    },
                },
                border: {
                    // shadcn dark input/border on dark bg
                    default: `1px solid ${foundationTokens.colors.gray[800]}`,
                    hover: `1px solid ${foundationTokens.colors.gray[700]}`,
                    focus: `1px solid ${foundationTokens.colors.primary[500]}`,
                    error: `1px solid ${foundationTokens.colors.red[500]}`,
                    disabled: `1px solid ${foundationTokens.colors.gray[800]}`,
                },
                backgroundColor: {
                    // shadcn dark background (~#020817 / gray-950) approximated with gray[900]
                    default: foundationTokens.colors.gray[900],
                    disabled: foundationTokens.colors.gray[800],
                    hover: foundationTokens.colors.gray[900],
                    focus: foundationTokens.colors.gray[900],
                    error: foundationTokens.colors.gray[900],
                },
                boxShadow: foundationTokens.shadows.sm,
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
                        disabled: foundationTokens.colors.gray[600],
                        error: foundationTokens.colors.red[400],
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
                    color: foundationTokens.colors.red[400],
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
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[100],
                        hover: foundationTokens.colors.gray[100],
                        focus: foundationTokens.colors.gray[100],
                        disabled: foundationTokens.colors.gray[500],
                        error: foundationTokens.colors.red[400],
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
                        disabled: foundationTokens.colors.gray[600],
                        error: foundationTokens.colors.red[400],
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
                        hover: foundationTokens.colors.gray[300],
                        focus: foundationTokens.colors.gray[300],
                        disabled: foundationTokens.colors.gray[600],
                        error: foundationTokens.colors.red[400],
                    },
                },
                required: {
                    color: foundationTokens.colors.red[400],
                },
            },
            inputContainer: {
                gap: foundationTokens.unit[8],
                placeholder: {
                    color: {
                        default: foundationTokens.colors.gray[500],
                        hover: foundationTokens.colors.gray[500],
                        focus: foundationTokens.colors.gray[500],
                        disabled: foundationTokens.colors.gray[600],
                        error: foundationTokens.colors.red[400],
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
                },
                inputText: {
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
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[18],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[100],
                        hover: foundationTokens.colors.gray[100],
                        focus: foundationTokens.colors.gray[100],
                        error: foundationTokens.colors.red[400],
                        disabled: foundationTokens.colors.gray[500],
                    },
                },
                borderRadius: {
                    sm: foundationTokens.unit[10],
                    md: foundationTokens.unit[10],
                    lg: foundationTokens.unit[10],
                },
                padding: {
                    top: {
                        sm: foundationTokens.unit[6],
                        md: foundationTokens.unit[7],
                        lg: foundationTokens.unit[9],
                    },
                    right: {
                        sm: foundationTokens.unit[12],
                        md: foundationTokens.unit[12],
                        lg: foundationTokens.unit[14],
                    },
                    bottom: {
                        sm: foundationTokens.unit[6],
                        md: foundationTokens.unit[7],
                        lg: foundationTokens.unit[9],
                    },
                    left: {
                        sm: foundationTokens.unit[12],
                        md: foundationTokens.unit[12],
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
                        disabled: foundationTokens.colors.gray[600],
                        error: foundationTokens.colors.red[400],
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
                    color: foundationTokens.colors.red[400],
                },
            },
        },
    }
}
