import { FoundationTokenType } from '../../../tokens/theme.token'
import { ResponsiveNumberInputV2Tokens } from './numberInputV2.tokens'

const labelTopContainer = (foundationToken: FoundationTokenType) => ({
    label: {
        fontSize: {
            sm: foundationToken.font.size.body.md.fontSize,
            md: foundationToken.font.size.body.md.fontSize,
            lg: foundationToken.font.size.body.md.fontSize,
        },
        fontWeight: {
            sm: foundationToken.font.weight[500],
            md: foundationToken.font.weight[500],
            lg: foundationToken.font.weight[500],
        },
        lineHeight: {
            sm: foundationToken.font.lineHeight[20],
            md: foundationToken.font.lineHeight[20],
            lg: foundationToken.font.lineHeight[20],
        },
        color: {
            default: foundationToken.colors.gray[700],
            hover: foundationToken.colors.gray[700],
            focus: foundationToken.colors.gray[700],
            disabled: foundationToken.colors.gray[400],
            error: foundationToken.colors.red[600],
        },
    },
    subLabel: {
        fontSize: {
            sm: foundationToken.font.size.body.md.fontSize,
            md: foundationToken.font.size.body.md.fontSize,
            lg: foundationToken.font.size.body.md.fontSize,
        },
        fontWeight: {
            sm: foundationToken.font.weight[400],
            md: foundationToken.font.weight[400],
            lg: foundationToken.font.weight[400],
        },
        lineHeight: {
            sm: foundationToken.font.lineHeight[20],
            md: foundationToken.font.lineHeight[20],
            lg: foundationToken.font.lineHeight[20],
        },
        color: {
            default: foundationToken.colors.gray[400],
            hover: foundationToken.colors.gray[400],
            focus: foundationToken.colors.gray[400],
            disabled: foundationToken.colors.gray[300],
            error: foundationToken.colors.red[600],
        },
    },
    helpIcon: {
        width: {
            sm: foundationToken.unit[14],
            md: foundationToken.unit[14],
            lg: foundationToken.unit[14],
        },
        color: {
            default: foundationToken.colors.gray[400],
            hover: foundationToken.colors.gray[400],
            focus: foundationToken.colors.gray[400],
            disabled: foundationToken.colors.gray[400],
            error: foundationToken.colors.red[600],
        },
    },
    required: {
        color: foundationToken.colors.red[600],
    },
})

const inputPlaceholder = (foundationToken: FoundationTokenType) => ({
    color: {
        default: foundationToken.colors.gray[400],
        hover: foundationToken.colors.gray[400],
        focus: foundationToken.colors.gray[400],
        disabled: foundationToken.colors.gray[400],
        error: foundationToken.colors.red[600],
    },
    fontWeight: {
        sm: foundationToken.font.weight[500],
        md: foundationToken.font.weight[500],
        lg: foundationToken.font.weight[500],
    },
    lineHeight: {
        sm: foundationToken.font.lineHeight[20],
        md: foundationToken.font.lineHeight[20],
        lg: foundationToken.font.lineHeight[20],
    },
    fontSize: {
        sm: foundationToken.font.size.body.md.fontSize,
        md: foundationToken.font.size.body.md.fontSize,
        lg: foundationToken.font.size.body.md.fontSize,
    },
})

const bottomContainer = (foundationToken: FoundationTokenType) => ({
    hintText: {
        fontSize: {
            sm: foundationToken.font.size.body.md.fontSize,
            md: foundationToken.font.size.body.md.fontSize,
            lg: foundationToken.font.size.body.md.fontSize,
        },
        fontWeight: {
            sm: foundationToken.font.weight[400],
            md: foundationToken.font.weight[400],
            lg: foundationToken.font.weight[400],
        },
        lineHeight: {
            sm: foundationToken.font.lineHeight[20],
            md: foundationToken.font.lineHeight[20],
            lg: foundationToken.font.lineHeight[20],
        },
        color: {
            default: foundationToken.colors.gray[500],
            hover: foundationToken.colors.gray[500],
            focus: foundationToken.colors.gray[500],
            disabled: foundationToken.colors.gray[400],
            error: foundationToken.colors.red[600],
        },
    },
    errorMessage: {
        fontSize: {
            sm: foundationToken.font.size.body.md.fontSize,
            md: foundationToken.font.size.body.md.fontSize,
            lg: foundationToken.font.size.body.md.fontSize,
        },
        fontWeight: {
            sm: foundationToken.font.weight[500],
            md: foundationToken.font.weight[500],
            lg: foundationToken.font.weight[500],
        },
        lineHeight: {
            sm: foundationToken.font.lineHeight[20],
            md: foundationToken.font.lineHeight[20],
            lg: foundationToken.font.lineHeight[20],
        },
        color: foundationToken.colors.red[600],
    },
})

export const getNumberInputV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveNumberInputV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            topContainer: labelTopContainer(foundationToken),
            inputContainer: {
                placeholder: inputPlaceholder(foundationToken),
                borderRadius: {
                    sm: foundationToken.unit[10],
                    md: foundationToken.unit[10],
                    lg: foundationToken.unit[10],
                },
                fontSize: {
                    sm: foundationToken.font.size.body.md.fontSize,
                    md: foundationToken.font.size.body.md.fontSize,
                    lg: foundationToken.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: foundationToken.font.weight[500],
                    md: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
                color: {
                    default: foundationToken.colors.gray[700],
                    hover: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[700],
                    error: foundationToken.colors.red[800],
                    disabled: foundationToken.colors.gray[300],
                },
                padding: {
                    x: {
                        sm: foundationToken.unit[10],
                        md: foundationToken.unit[12],
                        lg: foundationToken.unit[14],
                    },
                    y: {
                        sm: foundationToken.unit[6],
                        md: foundationToken.unit[8],
                        lg: foundationToken.unit[14],
                    },
                },
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
                boxShadow: foundationToken.shadows.sm,
                stepperButton: {
                    width: {
                        sm: foundationToken.unit[32],
                        md: foundationToken.unit[32],
                        lg: foundationToken.unit[32],
                    },
                    backgroundColor: {
                        default: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[50],
                        hover: foundationToken.colors.gray[100],
                        focus: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[0],
                    },
                    icon: {
                        color: {
                            default: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[300],
                            hover: foundationToken.colors.gray[400],
                            focus: foundationToken.colors.gray[400],
                            error: foundationToken.colors.gray[400],
                        },
                        width: {
                            sm: foundationToken.unit[6],
                            md: foundationToken.unit[6],
                            lg: foundationToken.unit[6],
                        },
                    },
                },
            },
            bottomContainer: bottomContainer(foundationToken),
        },
        lg: {
            gap: foundationToken.unit[8],
            topContainer: labelTopContainer(foundationToken),
            inputContainer: {
                placeholder: inputPlaceholder(foundationToken),
                borderRadius: {
                    sm: foundationToken.unit[10],
                    md: foundationToken.unit[10],
                    lg: foundationToken.unit[10],
                },
                fontSize: {
                    sm: foundationToken.font.size.body.md.fontSize,
                    md: foundationToken.font.size.body.md.fontSize,
                    lg: foundationToken.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: foundationToken.font.weight[500],
                    md: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
                color: {
                    default: foundationToken.colors.gray[700],
                    hover: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[700],
                    error: foundationToken.colors.red[800],
                    disabled: foundationToken.colors.gray[300],
                },
                padding: {
                    x: {
                        sm: foundationToken.unit[10],
                        md: foundationToken.unit[12],
                        lg: foundationToken.unit[14],
                    },
                    y: {
                        sm: foundationToken.unit[4],
                        md: foundationToken.unit[6],
                        lg: foundationToken.unit[8],
                    },
                },
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
                boxShadow: foundationToken.shadows.sm,
                stepperButton: {
                    width: {
                        sm: foundationToken.unit[32],
                        md: foundationToken.unit[32],
                        lg: foundationToken.unit[32],
                    },
                    backgroundColor: {
                        default: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[50],
                        hover: foundationToken.colors.gray[100],
                        focus: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[0],
                    },
                    icon: {
                        color: {
                            default: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[300],
                            hover: foundationToken.colors.gray[400],
                            focus: foundationToken.colors.gray[400],
                            error: foundationToken.colors.gray[400],
                        },

                        width: {
                            sm: foundationToken.unit[6],
                            md: foundationToken.unit[6],
                            lg: foundationToken.unit[6],
                        },
                    },
                },
            },
            bottomContainer: bottomContainer(foundationToken),
        },
    }
}
