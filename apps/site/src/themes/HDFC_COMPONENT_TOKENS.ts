import type { ComponentTokenType } from '../../../../packages/blend/lib/context/ThemeContext'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'

export const HDFC_COMPONENT_TOKENS: ComponentTokenType = {
    NUMBER_INPUT: {
        sm: {
            gap: FOUNDATION_THEME.unit[8],
            label: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: {
                    default: FOUNDATION_THEME.colors.gray[700],
                    hover: FOUNDATION_THEME.colors.gray[700],
                    focus: FOUNDATION_THEME.colors.gray[700],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            subLabel: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[400],
                    hover: FOUNDATION_THEME.colors.gray[400],
                    focus: FOUNDATION_THEME.colors.gray[400],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            hintText: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[500],
                    hover: FOUNDATION_THEME.colors.gray[500],
                    focus: FOUNDATION_THEME.colors.gray[500],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: FOUNDATION_THEME.colors.red[600],
            },
            required: {
                color: FOUNDATION_THEME.colors.red[600],
            },
            inputContainer: {
                borderRadius: {
                    md: FOUNDATION_THEME.unit[10],
                    lg: FOUNDATION_THEME.unit[10],
                },
                fontSize: {
                    md: FOUNDATION_THEME.font.size.body.md.fontSize,
                    lg: FOUNDATION_THEME.font.size.body.md.fontSize,
                },
                fontWeight: {
                    md: FOUNDATION_THEME.font.weight[500],
                    lg: FOUNDATION_THEME.font.weight[500],
                },
                color: {
                    default: FOUNDATION_THEME.colors.gray[800],
                    hover: FOUNDATION_THEME.colors.gray[800],
                    focus: FOUNDATION_THEME.colors.gray[800],
                    error: FOUNDATION_THEME.colors.red[800],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                },
                padding: {
                    x: {
                        md: FOUNDATION_THEME.unit[12],
                        lg: FOUNDATION_THEME.unit[14],
                    },
                    y: {
                        md: FOUNDATION_THEME.unit[8],
                        lg: FOUNDATION_THEME.unit[10],
                    },
                },
                border: {
                    default: `1px solid ${FOUNDATION_THEME.colors.green[500]}`,
                    hover: `1px solid ${FOUNDATION_THEME.colors.gray[400]}`,
                    focus: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
                    error: `1px solid ${FOUNDATION_THEME.colors.red[500]}`,
                    disabled: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                },
                backgroundColor: {
                    default: FOUNDATION_THEME.colors.gray[0],
                    disabled: FOUNDATION_THEME.colors.gray[50],
                    hover: FOUNDATION_THEME.colors.gray[0],
                    focus: FOUNDATION_THEME.colors.gray[0],
                    error: FOUNDATION_THEME.colors.gray[0],
                },
                boxShadow: FOUNDATION_THEME.shadows.sm,
                stepperButton: {
                    width: {
                        md: FOUNDATION_THEME.unit[32],
                        lg: FOUNDATION_THEME.unit[32],
                    },
                    backgroundColor: {
                        default: FOUNDATION_THEME.colors.gray[0],
                        disabled: FOUNDATION_THEME.colors.gray[50],
                        hover: FOUNDATION_THEME.colors.gray[100],
                        focus: FOUNDATION_THEME.colors.gray[100],
                        error: FOUNDATION_THEME.colors.gray[0],
                    },
                    icon: {
                        color: {
                            default: FOUNDATION_THEME.colors.gray[400],
                            disabled: FOUNDATION_THEME.colors.gray[300],
                            hover: FOUNDATION_THEME.colors.gray[400],
                            focus: FOUNDATION_THEME.colors.gray[400],
                            error: FOUNDATION_THEME.colors.gray[400],
                        },
                        fill: {
                            default: FOUNDATION_THEME.colors.gray[400],
                            disabled: FOUNDATION_THEME.colors.gray[300],
                            hover: FOUNDATION_THEME.colors.gray[400],
                            focus: FOUNDATION_THEME.colors.gray[400],
                            error: FOUNDATION_THEME.colors.gray[400],
                        },
                        width: {
                            md: FOUNDATION_THEME.unit[6],
                            lg: FOUNDATION_THEME.unit[6],
                        },
                    },
                },
            },
        },
        lg: {
            gap: FOUNDATION_THEME.unit[8],
            label: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: {
                    default: FOUNDATION_THEME.colors.gray[700],
                    hover: FOUNDATION_THEME.colors.gray[700],
                    focus: FOUNDATION_THEME.colors.gray[700],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            subLabel: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[400],
                    hover: FOUNDATION_THEME.colors.gray[400],
                    focus: FOUNDATION_THEME.colors.gray[400],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            hintText: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[500],
                    hover: FOUNDATION_THEME.colors.gray[500],
                    focus: FOUNDATION_THEME.colors.gray[500],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: FOUNDATION_THEME.colors.red[600],
            },
            required: {
                color: FOUNDATION_THEME.colors.red[600],
            },
            inputContainer: {
                borderRadius: {
                    md: FOUNDATION_THEME.unit[10],
                    lg: FOUNDATION_THEME.unit[10],
                },
                fontSize: {
                    md: FOUNDATION_THEME.font.size.body.md.fontSize,
                    lg: FOUNDATION_THEME.font.size.body.md.fontSize,
                },
                fontWeight: {
                    md: FOUNDATION_THEME.font.weight[500],
                    lg: FOUNDATION_THEME.font.weight[500],
                },
                color: {
                    default: FOUNDATION_THEME.colors.gray[800],
                    hover: FOUNDATION_THEME.colors.gray[800],
                    focus: FOUNDATION_THEME.colors.gray[800],
                    error: FOUNDATION_THEME.colors.red[800],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                },
                padding: {
                    x: {
                        md: FOUNDATION_THEME.unit[12],
                        lg: FOUNDATION_THEME.unit[14],
                    },
                    y: {
                        md: FOUNDATION_THEME.unit[8],
                        lg: FOUNDATION_THEME.unit[10],
                    },
                },
                border: {
                    default: `1px solid ${FOUNDATION_THEME.colors.green[500]}`,
                    hover: `1px solid ${FOUNDATION_THEME.colors.gray[400]}`,
                    focus: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
                    error: `1px solid ${FOUNDATION_THEME.colors.red[500]}`,
                    disabled: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                },
                backgroundColor: {
                    default: FOUNDATION_THEME.colors.gray[0],
                    disabled: FOUNDATION_THEME.colors.gray[50],
                    hover: FOUNDATION_THEME.colors.gray[0],
                    focus: FOUNDATION_THEME.colors.gray[0],
                    error: FOUNDATION_THEME.colors.gray[0],
                },
                boxShadow: FOUNDATION_THEME.shadows.sm,
                stepperButton: {
                    width: {
                        md: FOUNDATION_THEME.unit[32],
                        lg: FOUNDATION_THEME.unit[32],
                    },
                    backgroundColor: {
                        default: FOUNDATION_THEME.colors.gray[0],
                        disabled: FOUNDATION_THEME.colors.gray[50],
                        hover: FOUNDATION_THEME.colors.gray[100],
                        focus: FOUNDATION_THEME.colors.gray[100],
                        error: FOUNDATION_THEME.colors.gray[0],
                    },
                    icon: {
                        color: {
                            default: FOUNDATION_THEME.colors.gray[400],
                            disabled: FOUNDATION_THEME.colors.gray[300],
                            hover: FOUNDATION_THEME.colors.gray[400],
                            focus: FOUNDATION_THEME.colors.gray[400],
                            error: FOUNDATION_THEME.colors.gray[400],
                        },
                        fill: {
                            default: FOUNDATION_THEME.colors.gray[400],
                            disabled: FOUNDATION_THEME.colors.gray[300],
                            hover: FOUNDATION_THEME.colors.gray[400],
                            focus: FOUNDATION_THEME.colors.gray[400],
                            error: FOUNDATION_THEME.colors.gray[400],
                        },
                        width: {
                            md: FOUNDATION_THEME.unit[6],
                            lg: FOUNDATION_THEME.unit[6],
                        },
                    },
                },
            },
        },
    },
    TEXT_INPUT: {
        sm: {
            gap: FOUNDATION_THEME.unit[8],
            label: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: {
                    default: FOUNDATION_THEME.colors.gray[700],
                    hover: FOUNDATION_THEME.colors.gray[700],
                    focus: FOUNDATION_THEME.colors.gray[700],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            subLabel: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[400],
                    hover: FOUNDATION_THEME.colors.gray[400],
                    focus: FOUNDATION_THEME.colors.gray[400],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            hintText: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[500],
                    hover: FOUNDATION_THEME.colors.gray[500],
                    focus: FOUNDATION_THEME.colors.gray[500],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: FOUNDATION_THEME.colors.red[600],
            },
            required: {
                color: FOUNDATION_THEME.colors.red[600],
            },
            inputContainer: {
                borderRadius: {
                    sm: FOUNDATION_THEME.unit[10],
                    md: FOUNDATION_THEME.unit[10],
                    lg: FOUNDATION_THEME.unit[10],
                },
                fontSize: {
                    sm: FOUNDATION_THEME.font.size.body.md.fontSize,
                    md: FOUNDATION_THEME.font.size.body.md.fontSize,
                    lg: FOUNDATION_THEME.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: FOUNDATION_THEME.font.weight[500],
                    md: FOUNDATION_THEME.font.weight[500],
                    lg: FOUNDATION_THEME.font.weight[500],
                },
                color: {
                    default: FOUNDATION_THEME.colors.gray[800],
                    hover: FOUNDATION_THEME.colors.gray[800],
                    focus: FOUNDATION_THEME.colors.gray[800],
                    error: FOUNDATION_THEME.colors.red[800],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                },
                padding: {
                    x: {
                        sm: FOUNDATION_THEME.unit[10],
                        md: FOUNDATION_THEME.unit[12],
                        lg: FOUNDATION_THEME.unit[14],
                    },
                    y: {
                        sm: FOUNDATION_THEME.unit[6],
                        md: FOUNDATION_THEME.unit[8],
                        lg: FOUNDATION_THEME.unit[14],
                    },
                },
                border: {
                    default: `1px solid ${FOUNDATION_THEME.colors.red[200]}`,
                    hover: `1px solid ${FOUNDATION_THEME.colors.gray[400]}`,
                    focus: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
                    error: `1px solid ${FOUNDATION_THEME.colors.red[500]}`,
                    disabled: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                },
                backgroundColor: {
                    default: FOUNDATION_THEME.colors.gray[0],
                    disabled: FOUNDATION_THEME.colors.gray[50],
                    hover: FOUNDATION_THEME.colors.gray[0],
                    focus: FOUNDATION_THEME.colors.gray[0],
                    error: FOUNDATION_THEME.colors.gray[0],
                },
                boxShadow: FOUNDATION_THEME.shadows.sm,
            },
        },
        lg: {
            gap: FOUNDATION_THEME.unit[8],
            label: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: {
                    default: FOUNDATION_THEME.colors.gray[700],
                    hover: FOUNDATION_THEME.colors.gray[700],
                    focus: FOUNDATION_THEME.colors.gray[700],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            subLabel: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[400],
                    hover: FOUNDATION_THEME.colors.gray[400],
                    focus: FOUNDATION_THEME.colors.gray[400],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            hintText: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[500],
                    hover: FOUNDATION_THEME.colors.gray[500],
                    focus: FOUNDATION_THEME.colors.gray[500],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: FOUNDATION_THEME.colors.red[600],
            },
            required: {
                color: FOUNDATION_THEME.colors.red[600],
            },
            inputContainer: {
                borderRadius: {
                    sm: FOUNDATION_THEME.unit[10],
                    md: FOUNDATION_THEME.unit[10],
                    lg: FOUNDATION_THEME.unit[10],
                },
                fontSize: {
                    sm: FOUNDATION_THEME.font.size.body.md.fontSize,
                    md: FOUNDATION_THEME.font.size.body.md.fontSize,
                    lg: FOUNDATION_THEME.font.size.body.md.fontSize,
                },
                fontWeight: {
                    sm: FOUNDATION_THEME.font.weight[500],
                    md: FOUNDATION_THEME.font.weight[500],
                    lg: FOUNDATION_THEME.font.weight[500],
                },
                color: {
                    default: FOUNDATION_THEME.colors.gray[800],
                    hover: FOUNDATION_THEME.colors.gray[800],
                    focus: FOUNDATION_THEME.colors.gray[800],
                    error: FOUNDATION_THEME.colors.red[800],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                },
                padding: {
                    x: {
                        sm: FOUNDATION_THEME.unit[10],
                        md: FOUNDATION_THEME.unit[12],
                        lg: FOUNDATION_THEME.unit[14],
                    },
                    y: {
                        sm: FOUNDATION_THEME.unit[6],
                        md: FOUNDATION_THEME.unit[8],
                        lg: FOUNDATION_THEME.unit[10],
                    },
                },
                border: {
                    default: `1px solid ${FOUNDATION_THEME.colors.red[200]}`,
                    hover: `1px solid ${FOUNDATION_THEME.colors.gray[400]}`,
                    focus: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
                    error: `1px solid ${FOUNDATION_THEME.colors.red[500]}`,
                    disabled: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                },
                backgroundColor: {
                    default: FOUNDATION_THEME.colors.gray[0],
                    disabled: FOUNDATION_THEME.colors.gray[50],
                    hover: FOUNDATION_THEME.colors.gray[0],
                    focus: FOUNDATION_THEME.colors.gray[0],
                    error: FOUNDATION_THEME.colors.gray[0],
                },
                boxShadow: FOUNDATION_THEME.shadows.sm,
            },
        },
    },
    TEXT_AREA: {
        sm: {
            gap: FOUNDATION_THEME.unit[8],
            label: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: {
                    default: FOUNDATION_THEME.colors.gray[700],
                    hover: FOUNDATION_THEME.colors.gray[700],
                    focus: FOUNDATION_THEME.colors.gray[700],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            subLabel: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[400],
                    hover: FOUNDATION_THEME.colors.gray[400],
                    focus: FOUNDATION_THEME.colors.gray[400],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            hintText: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[500],
                    hover: FOUNDATION_THEME.colors.gray[500],
                    focus: FOUNDATION_THEME.colors.gray[500],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: FOUNDATION_THEME.colors.red[600],
            },
            required: {
                color: FOUNDATION_THEME.colors.red[600],
            },
            inputContainer: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                padding: {
                    x: FOUNDATION_THEME.unit[14],
                    y: FOUNDATION_THEME.unit[10],
                },
                borderRadius: FOUNDATION_THEME.unit[8],
                boxShadow: {
                    default: FOUNDATION_THEME.shadows.sm,
                    hover: FOUNDATION_THEME.shadows.sm,
                    focus: FOUNDATION_THEME.shadows.focusPrimary,
                    error: FOUNDATION_THEME.shadows.focusError,
                    disabled: FOUNDATION_THEME.shadows.sm,
                },
                outline: {
                    default: 'none',
                    hover: 'none',
                    focus: 'none',
                    error: 'none',
                    disabled: 'none',
                },
                border: {
                    default: `1px solid ${FOUNDATION_THEME.colors.green[200]}`,
                    hover: `1px solid ${FOUNDATION_THEME.colors.primary[400]}`,
                    focus: `1px solid ${FOUNDATION_THEME.colors.orange[500]}`,
                    error: `1px solid ${FOUNDATION_THEME.colors.red[500]}`,
                    disabled: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                },
                color: {
                    default: FOUNDATION_THEME.colors.gray[800],
                    hover: FOUNDATION_THEME.colors.gray[800],
                    focus: FOUNDATION_THEME.colors.gray[800],
                    error: FOUNDATION_THEME.colors.red[800],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                },
                backgroundColor: {
                    default: FOUNDATION_THEME.colors.gray[0],
                    hover: FOUNDATION_THEME.colors.gray[0],
                    focus: FOUNDATION_THEME.colors.gray[0],
                    error: FOUNDATION_THEME.colors.gray[0],
                    disabled: FOUNDATION_THEME.colors.gray[50],
                },
            },
        },
        lg: {
            gap: FOUNDATION_THEME.unit[8],
            label: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: {
                    default: FOUNDATION_THEME.colors.gray[700],
                    hover: FOUNDATION_THEME.colors.gray[700],
                    focus: FOUNDATION_THEME.colors.gray[700],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            subLabel: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[400],
                    hover: FOUNDATION_THEME.colors.gray[400],
                    focus: FOUNDATION_THEME.colors.gray[400],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            hintText: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                color: {
                    default: FOUNDATION_THEME.colors.gray[500],
                    hover: FOUNDATION_THEME.colors.gray[500],
                    focus: FOUNDATION_THEME.colors.gray[500],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    error: FOUNDATION_THEME.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                color: FOUNDATION_THEME.colors.red[600],
            },
            required: {
                color: FOUNDATION_THEME.colors.red[600],
            },
            inputContainer: {
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                fontWeight: FOUNDATION_THEME.font.weight[400],
                padding: {
                    x: FOUNDATION_THEME.unit[14],
                    y: FOUNDATION_THEME.unit[10],
                },
                borderRadius: FOUNDATION_THEME.unit[8],
                boxShadow: {
                    default: FOUNDATION_THEME.shadows.sm,
                    hover: FOUNDATION_THEME.shadows.sm,
                    focus: FOUNDATION_THEME.shadows.focusPrimary,
                    error: FOUNDATION_THEME.shadows.focusError,
                    disabled: FOUNDATION_THEME.shadows.sm,
                },
                outline: {
                    default: 'none',
                    hover: 'none',
                    focus: 'none',
                    error: 'none',
                    disabled: 'none',
                },
                border: {
                    default: `1px solid ${FOUNDATION_THEME.colors.green[200]}`,
                    hover: `1px solid ${FOUNDATION_THEME.colors.primary[400]}`,
                    focus: `1px solid ${FOUNDATION_THEME.colors.orange[500]}`,
                    error: `1px solid ${FOUNDATION_THEME.colors.red[500]}`,
                    disabled: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                },
                color: {
                    default: FOUNDATION_THEME.colors.gray[800],
                    hover: FOUNDATION_THEME.colors.gray[800],
                    focus: FOUNDATION_THEME.colors.gray[800],
                    error: FOUNDATION_THEME.colors.red[800],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                },
                backgroundColor: {
                    default: FOUNDATION_THEME.colors.gray[0],
                    hover: FOUNDATION_THEME.colors.gray[0],
                    focus: FOUNDATION_THEME.colors.gray[0],
                    error: FOUNDATION_THEME.colors.gray[0],
                    disabled: FOUNDATION_THEME.colors.gray[50],
                },
            },
        },
    },
    SEARCH_INPUT: {
        width: '100%',
        height: FOUNDATION_THEME.unit[40],
        gap: FOUNDATION_THEME.unit[8],
        padding: {
            x: FOUNDATION_THEME.unit[8],
            y: FOUNDATION_THEME.unit[8],
        },
        borderRadius: FOUNDATION_THEME.unit[0],
        borderTop: {
            default: 'none',
            hover: 'none',
            focus: 'none',
            error: 'none',
        },
        borderLeft: {
            default: 'none',
            hover: 'none',
            focus: 'none',
            error: 'none',
        },
        borderRight: {
            default: 'none',
            hover: 'none',
            focus: 'none',
            error: 'none',
        },
        borderBottom: {
            default: `1px solid ${FOUNDATION_THEME.colors.red[500]} !important`,
            hover: `1px solid ${FOUNDATION_THEME.colors.green[700]} !important`,
            focus: `1px solid ${FOUNDATION_THEME.colors.primary[500]} !important`,
            error: `1px solid ${FOUNDATION_THEME.colors.primary[500]} !important`,
        },
        outline: 'none',
        boxShadow: FOUNDATION_THEME.shadows.sm,
        color: FOUNDATION_THEME.colors.gray[800],
        fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
        fontWeight: FOUNDATION_THEME.font.weight[400],
        placeholderColor: FOUNDATION_THEME.colors.gray[400],
    },
    // TAGS: {
    //   background: {
    //     noFill: {
    //       neutral: FOUNDATION_THEME.colors.gray[0],
    //       primary: FOUNDATION_THEME.colors.gray[0],
    //       success: FOUNDATION_THEME.colors.gray[0],
    //       error: FOUNDATION_THEME.colors.gray[0],
    //       warning: FOUNDATION_THEME.colors.gray[0],
    //       purple: FOUNDATION_THEME.colors.gray[0],
    //     },
    //     attentive: {
    //       neutral: FOUNDATION_THEME.colors.gray[950],
    //       primary: FOUNDATION_THEME.colors.primary[600],
    //       success: FOUNDATION_THEME.colors.green[600],
    //       error: FOUNDATION_THEME.colors.red[600],
    //       warning: FOUNDATION_THEME.colors.orange[500],
    //       purple: FOUNDATION_THEME.colors.purple[500],
    //     },
    //     subtle: {
    //       neutral: FOUNDATION_THEME.colors.gray[50],
    //       primary: FOUNDATION_THEME.colors.primary[50],
    //       success: FOUNDATION_THEME.colors.green[50],
    //       error: FOUNDATION_THEME.colors.red[50],
    //       warning: FOUNDATION_THEME.colors.orange[50],
    //       purple: FOUNDATION_THEME.colors.purple[50],
    //     },
    //   },
    //   color: {
    //     noFill: {
    //       neutral: FOUNDATION_THEME.colors.gray[950],
    //       primary: FOUNDATION_THEME.colors.primary[800],
    //       success: FOUNDATION_THEME.colors.green[600],
    //       error: FOUNDATION_THEME.colors.red[600],
    //       warning: FOUNDATION_THEME.colors.orange[500],
    //       purple: FOUNDATION_THEME.colors.purple[500],
    //     },
    //     attentive: {
    //       neutral: FOUNDATION_THEME.colors.gray[0],
    //       primary: FOUNDATION_THEME.colors.gray[0],
    //       success: FOUNDATION_THEME.colors.gray[0],
    //       error: FOUNDATION_THEME.colors.gray[0],
    //       warning: FOUNDATION_THEME.colors.gray[0],
    //       purple: FOUNDATION_THEME.colors.gray[0],
    //     },
    //     subtle: {
    //       neutral: FOUNDATION_THEME.colors.gray[950],
    //       primary: FOUNDATION_THEME.colors.primary[600],
    //       success: FOUNDATION_THEME.colors.green[600],
    //       error: FOUNDATION_THEME.colors.red[600],
    //       warning: FOUNDATION_THEME.colors.orange[600],
    //       purple: FOUNDATION_THEME.colors.purple[600],
    //     },
    //   },
    //   borderColor: {
    //     noFill: {
    //       neutral: FOUNDATION_THEME.colors.gray[950],
    //       primary: FOUNDATION_THEME.colors.primary[600],
    //       success: FOUNDATION_THEME.colors.green[600],
    //       error: FOUNDATION_THEME.colors.red[600],
    //       warning: FOUNDATION_THEME.colors.orange[500],
    //       purple: FOUNDATION_THEME.colors.purple[500],
    //     },
    //     subtle: {
    //       neutral: FOUNDATION_THEME.colors.gray[200],
    //       primary: FOUNDATION_THEME.colors.primary[100],
    //       success: FOUNDATION_THEME.colors.green[100],
    //       error: FOUNDATION_THEME.colors.red[100],
    //       warning: FOUNDATION_THEME.colors.orange[100],
    //       purple: FOUNDATION_THEME.colors.purple[100],
    //     },
    //     attentive: {
    //       neutral: FOUNDATION_THEME.colors.gray[950],
    //       primary: FOUNDATION_THEME.colors.primary[600],
    //       success: FOUNDATION_THEME.colors.green[600],
    //       error: FOUNDATION_THEME.colors.red[600],
    //       warning: FOUNDATION_THEME.colors.orange[500],
    //       purple: FOUNDATION_THEME.colors.purple[500],
    //     },
    //   },
    //   borderRadius: {
    //     squarical: {
    //       xs: FOUNDATION_THEME.border.radius[6],
    //       sm: FOUNDATION_THEME.border.radius[6],
    //       md: FOUNDATION_THEME.border.radius[6],
    //       lg: FOUNDATION_THEME.border.radius[8],
    //     },
    //     rounded: {
    //       xs: FOUNDATION_THEME.border.radius.full,
    //       sm: FOUNDATION_THEME.border.radius.full,
    //       md: FOUNDATION_THEME.border.radius.full,
    //       lg: FOUNDATION_THEME.border.radius.full,
    //     },
    //   },
    //   borderWidth: {
    //     noFill: {
    //       neutral: 1,
    //       primary: 1,
    //       success: 1,
    //       error: 1,
    //       warning: 1,
    //       purple: 1,
    //     },
    //     subtle: {
    //       neutral: 1,
    //       primary: 1,
    //       success: 1,
    //       error: 1,
    //       warning: 1,
    //       purple: 1,
    //     },
    //     attentive: {
    //       neutral: 1,
    //       primary: 1,
    //       success: 1,
    //       error: 1,
    //       warning: 1,
    //       purple: 1,
    //     },
    //   },
    //   font: {
    //     xs: {
    //       fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
    //       fontWeight: FOUNDATION_THEME.font.weight[600],
    //     },
    //     sm: {
    //       fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
    //       fontWeight: FOUNDATION_THEME.font.weight[600],
    //     },
    //     md: {
    //       fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
    //       fontWeight: FOUNDATION_THEME.font.weight[600],
    //     },
    //     lg: {
    //       fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
    //       fontWeight: FOUNDATION_THEME.font.weight[600],
    //     },
    //   },
    //   gap: {
    //     xs: FOUNDATION_THEME.unit[6],
    //     sm: FOUNDATION_THEME.unit[6],
    //     md: FOUNDATION_THEME.unit[6],
    //     lg: FOUNDATION_THEME.unit[6],
    //   },
    //   padding: {
    //     xs: `${FOUNDATION_THEME.unit[2]} ${FOUNDATION_THEME.unit[6]}`,
    //     sm: `${FOUNDATION_THEME.unit[3]} ${FOUNDATION_THEME.unit[8]}`,
    //     md: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[10]}`,
    //     lg: `${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[12]}`,
    //   },
    //   height: {
    //     xs: FOUNDATION_THEME.unit[20],
    //     sm: FOUNDATION_THEME.unit[22],
    //     md: FOUNDATION_THEME.unit[24],
    //     lg: FOUNDATION_THEME.unit[28],
    //   },
    //   slot: {
    //     size: {
    //       xs: FOUNDATION_THEME.unit[12],
    //       sm: FOUNDATION_THEME.unit[12],
    //       md: FOUNDATION_THEME.unit[12],
    //       lg: FOUNDATION_THEME.unit[12],
    //     },
    //   },
    // },
}

export default HDFC_COMPONENT_TOKENS
