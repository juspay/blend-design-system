import { FoundationTokenType } from '../../../tokens/theme.token'
import type { ResponsiveNumberInputV2Tokens } from './numberInputV2.tokens.types'

/** Dark theme: aligned with TextInputV2 dark — light foreground on gray[900] field, slate-like borders */
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
            default: foundationToken.colors.gray[100],
            hover: foundationToken.colors.gray[100],
            focus: foundationToken.colors.gray[100],
            disabled: foundationToken.colors.gray[500],
            error: foundationToken.colors.red[400],
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
            disabled: foundationToken.colors.gray[600],
            error: foundationToken.colors.red[400],
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
            hover: foundationToken.colors.gray[300],
            focus: foundationToken.colors.gray[300],
            disabled: foundationToken.colors.gray[600],
            error: foundationToken.colors.red[400],
        },
    },
    required: {
        color: foundationToken.colors.red[400],
    },
})

const inputPlaceholder = (foundationToken: FoundationTokenType) => ({
    color: {
        default: foundationToken.colors.gray[500],
        hover: foundationToken.colors.gray[500],
        focus: foundationToken.colors.gray[500],
        disabled: foundationToken.colors.gray[600],
        error: foundationToken.colors.red[400],
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
            disabled: foundationToken.colors.gray[600],
            error: foundationToken.colors.red[400],
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
        color: foundationToken.colors.red[400],
    },
})

const darkInputContainer = (foundationToken: FoundationTokenType) => ({
    slot: {
        left: {
            width: {
                sm: foundationToken.unit[14],
                md: foundationToken.unit[14],
                lg: foundationToken.unit[14],
            },
            height: {
                sm: foundationToken.unit[14],
                md: foundationToken.unit[14],
                lg: foundationToken.unit[14],
            },
            margin: {
                sm: foundationToken.unit[15],
                md: foundationToken.unit[15],
                lg: foundationToken.unit[15],
            },
        },
        right: {
            width: {
                sm: foundationToken.unit[14],
                md: foundationToken.unit[14],
                lg: foundationToken.unit[14],
            },
            height: {
                sm: foundationToken.unit[14],
                md: foundationToken.unit[14],
                lg: foundationToken.unit[14],
            },
            margin: {
                sm: foundationToken.unit[14],
                md: foundationToken.unit[14],
                lg: foundationToken.unit[14],
            },
        },
    },
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
    lineHeight: {
        sm: foundationToken.unit[20],
        md: foundationToken.unit[20],
        lg: foundationToken.unit[20],
    },
    color: {
        default: foundationToken.colors.gray[100],
        hover: foundationToken.colors.gray[100],
        focus: foundationToken.colors.gray[100],
        error: foundationToken.colors.red[400],
        disabled: foundationToken.colors.gray[500],
    },
    paddingTop: {
        sm: foundationToken.unit[6],
        md: foundationToken.unit[8],
        lg: foundationToken.unit[14],
    },
    paddingRight: {
        sm: foundationToken.unit[10],
        md: foundationToken.unit[12],
        lg: foundationToken.unit[14],
    },
    paddingBottom: {
        sm: foundationToken.unit[6],
        md: foundationToken.unit[8],
        lg: foundationToken.unit[14],
    },
    paddingLeft: {
        sm: foundationToken.unit[10],
        md: foundationToken.unit[12],
        lg: foundationToken.unit[14],
    },
    border: {
        default: `1px solid ${foundationToken.colors.gray[800]}`,
        hover: `1px solid ${foundationToken.colors.gray[700]}`,
        focus: `1px solid ${foundationToken.colors.primary[500]}`,
        error: `1px solid ${foundationToken.colors.red[500]}`,
        disabled: `1px solid ${foundationToken.colors.gray[800]}`,
    },
    backgroundColor: {
        default: foundationToken.colors.gray[900],
        disabled: foundationToken.colors.gray[800],
        hover: foundationToken.colors.gray[900],
        focus: foundationToken.colors.gray[900],
        error: foundationToken.colors.gray[900],
    },
    boxShadow: foundationToken.shadows.sm,
    stepperButton: {
        width: {
            sm: foundationToken.unit[32],
            md: foundationToken.unit[32],
            lg: foundationToken.unit[32],
        },
        backgroundColor: {
            default: foundationToken.colors.gray[800],
            disabled: foundationToken.colors.gray[800],
            hover: foundationToken.colors.gray[100],
            focus: foundationToken.colors.gray[100],
            error: foundationToken.colors.gray[900],
        },
        icon: {
            color: {
                default: foundationToken.colors.gray[400],
                disabled: foundationToken.colors.gray[600],
                hover: foundationToken.colors.gray[300],
                focus: foundationToken.colors.gray[300],
                error: foundationToken.colors.gray[400],
            },
            width: {
                sm: foundationToken.unit[6],
                md: foundationToken.unit[6],
                lg: foundationToken.unit[6],
            },
        },
    },
})

export const getNumberInputV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveNumberInputV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            topContainer: labelTopContainer(foundationToken),
            inputContainer: darkInputContainer(foundationToken),
            bottomContainer: bottomContainer(foundationToken),
            floatingLabels: {
                placeholder: inputPlaceholder(foundationToken),
                required: {
                    color: foundationToken.colors.red[600],
                },
            },
            unit: {
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
                paddingTop: {
                    sm: foundationToken.unit[6],
                    md: foundationToken.unit[7],
                    lg: foundationToken.unit[15],
                },
                paddingRight: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[12],
                    lg: foundationToken.unit[14],
                },
                paddingBottom: {
                    sm: foundationToken.unit[6],
                    md: foundationToken.unit[7],
                    lg: foundationToken.unit[15],
                },
                paddingLeft: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[12],
                    lg: foundationToken.unit[12],
                },
                borderRadius: {
                    sm: foundationToken.unit[10],
                    md: foundationToken.unit[10],
                    lg: foundationToken.unit[10],
                },
                border: {
                    default: `1px solid ${foundationToken.colors.gray[800]}`,
                    hover: `1px solid ${foundationToken.colors.gray[700]}`,
                    focus: `1px solid ${foundationToken.colors.primary[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[800]}`,
                },
                color: {
                    default: foundationToken.colors.gray[100],
                    hover: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[700],
                    error: foundationToken.colors.red[800],
                    disabled: foundationToken.colors.gray[300],
                },
            },
        },
        lg: {
            gap: foundationToken.unit[8],
            topContainer: labelTopContainer(foundationToken),
            inputContainer: darkInputContainer(foundationToken),
            bottomContainer: bottomContainer(foundationToken),
            floatingLabels: {
                placeholder: inputPlaceholder(foundationToken),
                required: {
                    color: foundationToken.colors.red[600],
                },
            },
            unit: {
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
                paddingTop: {
                    sm: foundationToken.unit[6],
                    md: foundationToken.unit[7],
                    lg: foundationToken.unit[9],
                },
                paddingRight: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[12],
                    lg: foundationToken.unit[14],
                },
                paddingBottom: {
                    sm: foundationToken.unit[6],
                    md: foundationToken.unit[7],
                    lg: foundationToken.unit[9],
                },
                paddingLeft: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[12],
                    lg: foundationToken.unit[14],
                },
                borderRadius: {
                    sm: foundationToken.unit[10],
                    md: foundationToken.unit[10],
                    lg: foundationToken.unit[10],
                },
                border: {
                    default: `1px solid ${foundationToken.colors.gray[800]}`,
                    hover: `1px solid ${foundationToken.colors.gray[700]}`,
                    focus: `1px solid ${foundationToken.colors.primary[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[800]}`,
                },
                color: {
                    default: foundationToken.colors.gray[100],
                    hover: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[700],
                    error: foundationToken.colors.red[800],
                    disabled: foundationToken.colors.gray[300],
                },
            },
        },
    }
}
