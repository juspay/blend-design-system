import { FoundationTokenType } from '../../../tokens/theme.token'
import { ResponsiveDropdownInputV2Tokens } from './DropdownInputV2.tokens'

export const getDropdownInputV2LightTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveDropdownInputV2Tokens => {
    return {
        sm: {
            gap: foundationTokens.unit[8],
            topContainer: {
                label: {
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
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[700],
                        hover: foundationTokens.colors.gray[700],
                        focus: foundationTokens.colors.gray[700],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.gray[700],
                    },
                },
                subLabel: {
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
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.gray[400],
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
                        error: foundationTokens.colors.gray[400],
                    },
                },

                required: {
                    color: foundationTokens.colors.red[600],
                },
            },
            inputContainer: {
                lineHeight: {
                    sm: foundationTokens.font.lineHeight[20],
                    md: foundationTokens.font.lineHeight[20],
                    lg: foundationTokens.font.lineHeight[20],
                },
                gap: foundationTokens.unit[8],
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

                borderRadius: {
                    sm: foundationTokens.unit[10],
                    md: foundationTokens.unit[10],
                    lg: foundationTokens.unit[10],
                },
                paddingTop: {
                    sm: foundationTokens.unit[6],
                    md: foundationTokens.unit[8],
                    lg: foundationTokens.unit[14],
                },
                paddingBottom: {
                    sm: foundationTokens.unit[6],
                    md: foundationTokens.unit[8],
                    lg: foundationTokens.unit[14],
                },
                paddingLeft: {
                    sm: foundationTokens.unit[10],
                    md: foundationTokens.unit[12],
                    lg: foundationTokens.unit[14],
                },
                paddingRight: {
                    sm: foundationTokens.unit[10],
                    md: foundationTokens.unit[12],
                    lg: foundationTokens.unit[14],
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
                backgroundColor: {
                    default: foundationTokens.colors.gray[0],
                    disabled: foundationTokens.colors.gray[50],
                    hover: foundationTokens.colors.gray[0],
                    focus: foundationTokens.colors.gray[0],
                    error: foundationTokens.colors.gray[0],
                },
                boxShadow: foundationTokens.shadows.sm,
            },
            bottomContainer: {
                hintText: {
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
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[700],
                        hover: foundationTokens.colors.gray[700],
                        focus: foundationTokens.colors.gray[700],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
                },
                subLabel: {
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
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[400],
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
                        error: foundationTokens.colors.gray[400],
                    },
                },
                required: {
                    color: foundationTokens.colors.red[600],
                },
            },

            inputContainer: {
                lineHeight: {
                    sm: foundationTokens.font.lineHeight[20],
                    md: foundationTokens.font.lineHeight[20],
                    lg: foundationTokens.font.lineHeight[20],
                },
                gap: foundationTokens.unit[8],
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
                borderRadius: {
                    sm: foundationTokens.unit[10],
                    md: foundationTokens.unit[10],
                    lg: foundationTokens.unit[10],
                },
                paddingTop: {
                    sm: foundationTokens.unit[6],
                    md: foundationTokens.unit[8],
                    lg: foundationTokens.unit[14],
                },
                paddingBottom: {
                    sm: foundationTokens.unit[6],
                    md: foundationTokens.unit[8],
                    lg: foundationTokens.unit[14],
                },
                paddingLeft: {
                    sm: foundationTokens.unit[10],
                    md: foundationTokens.unit[12],
                    lg: foundationTokens.unit[14],
                },
                paddingRight: {
                    sm: foundationTokens.unit[10],
                    md: foundationTokens.unit[12],
                    lg: foundationTokens.unit[14],
                },
                border: {
                    default: `1px solid ${foundationTokens.colors.gray[200]}`,
                    hover: `1px solid ${foundationTokens.colors.gray[200]}`,
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
                backgroundColor: {
                    default: foundationTokens.colors.gray[0],
                    disabled: foundationTokens.colors.gray[50],
                    hover: foundationTokens.colors.gray[50],
                    focus: foundationTokens.colors.gray[0],
                    error: foundationTokens.colors.gray[0],
                },
                boxShadow: foundationTokens.shadows.sm,
            },

            bottomContainer: {
                hintText: {
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
