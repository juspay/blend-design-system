import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveCheckboxV2Tokens } from './checkboxV2.tokens'

export const getCheckboxV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveCheckboxV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],

            checkbox: {
                width: {
                    sm: foundationToken.unit[16],
                    md: foundationToken.unit[20],
                },
                height: {
                    sm: foundationToken.unit[16],
                    md: foundationToken.unit[20],
                },
                backgroundColor: {
                    unchecked: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[150],
                        disabled: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[0],
                    },
                    checked: {
                        default: foundationToken.colors.primary[600],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.primary[500],
                    },
                    indeterminate: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.primary[500],
                    },
                },

                borderRadius: {
                    sm: foundationToken.border.radius[4],
                    md: foundationToken.border.radius[4],
                },
                border: {
                    unchecked: {
                        default: `1px solid ${foundationToken.colors.gray[300]}`,
                        hover: `1px solid ${foundationToken.colors.gray[400]}`,
                        disabled: `1px solid ${foundationToken.colors.gray[200]}`,
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                    checked: {
                        default: 'transparent',
                        hover: 'transparent',
                        disabled: 'transparent',
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                    indeterminate: {
                        default: 'transparent',
                        hover: 'transparent',
                        disabled: 'transparent',
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                },

                outline: `1px solid ${foundationToken.colors.primary[200]}`,
                outlineOffset: foundationToken.unit[2],
                boxShadow: `0 0 0 2px ${foundationToken.colors.primary[100]}`,

                icon: {
                    color: {
                        checked: {
                            default: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        indeterminate: {
                            default: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                    },
                    width: {
                        sm: foundationToken.unit[12],
                        md: foundationToken.unit[14],
                    },
                    height: {
                        sm: foundationToken.unit[12],
                        md: foundationToken.unit[14],
                    },
                    strokeWidth: {
                        sm: 2.5,
                        md: 2.5,
                    },
                },
            },

            content: {
                gap: foundationToken.unit[0],
                label: {
                    gap: foundationToken.unit[0],
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                    },

                    fontSize: {
                        sm: `${foundationToken.font.size.body.md.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[500],
                        md: foundationToken.font.weight[500],
                    },
                    lineHeight: {
                        sm: foundationToken.font.lineHeight[14],
                        md: foundationToken.font.lineHeight[16],
                    },
                    slot: {
                        maxHeight: {
                            sm: foundationToken.unit[12],
                            md: foundationToken.unit[14],
                        },
                    },
                },
                subLabel: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[500],
                        hover: foundationToken.colors.gray[400],
                    },

                    fontSize: {
                        sm: `${foundationToken.font.size.body.sm.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[400],
                        md: foundationToken.font.weight[400],
                    },
                    lineHeight: {
                        sm: foundationToken.font.lineHeight[12],
                        md: foundationToken.font.lineHeight[16],
                    },
                },
                required: {
                    color: foundationToken.colors.red[600],
                },
            },
        },
        lg: {
            gap: foundationToken.unit[8],

            checkbox: {
                width: {
                    sm: foundationToken.unit[14],
                    md: foundationToken.unit[16],
                },

                height: {
                    sm: foundationToken.unit[14],
                    md: foundationToken.unit[16],
                },

                backgroundColor: {
                    unchecked: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[150],
                        disabled: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[0],
                    },
                    checked: {
                        default: foundationToken.colors.primary[600],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.primary[500],
                    },
                    indeterminate: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.primary[500],
                    },
                },
                borderRadius: {
                    sm: foundationToken.border.radius[4],
                    md: foundationToken.border.radius[4],
                },
                border: {
                    unchecked: {
                        default: `1px solid ${foundationToken.colors.gray[300]}`,
                        hover: `1px solid ${foundationToken.colors.gray[400]}`,
                        disabled: `1px solid ${foundationToken.colors.gray[200]}`,
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                    checked: {
                        default: 'transparent',
                        hover: 'transparent',
                        disabled: 'transparent',
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                    indeterminate: {
                        default: 'transparent',
                        hover: 'transparent',
                        disabled: 'transparent',
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                },
                outline: `1px solid ${foundationToken.colors.primary[200]}`,
                outlineOffset: foundationToken.unit[2],
                boxShadow: `0 0 0 2px ${foundationToken.colors.primary[100]}`,
                icon: {
                    color: {
                        checked: {
                            default: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        indeterminate: {
                            default: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                    },

                    width: {
                        sm: foundationToken.unit[10],
                        md: foundationToken.unit[12],
                    },
                    height: {
                        sm: foundationToken.unit[10],
                        md: foundationToken.unit[12],
                    },
                    strokeWidth: {
                        sm: 2.5,
                        md: 2.5,
                    },
                },
            },
            content: {
                gap: foundationToken.unit[6],
                label: {
                    gap: foundationToken.unit[6],
                    color: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                    },

                    fontSize: {
                        sm: `${foundationToken.font.size.body.sm.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[500],
                        md: foundationToken.font.weight[500],
                    },
                    lineHeight: {
                        sm: foundationToken.font.lineHeight[12],
                        md: foundationToken.font.lineHeight[16],
                    },
                    slot: {
                        maxHeight: {
                            sm: foundationToken.unit[12],
                            md: foundationToken.unit[14],
                        },
                    },
                },
                subLabel: {
                    color: {
                        default: foundationToken.colors.gray[300],
                        hover: foundationToken.colors.gray[300],
                        disabled: foundationToken.colors.gray[600],
                        error: foundationToken.colors.red[400],
                    },

                    fontSize: {
                        sm: `${foundationToken.font.size.body.sm.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[400],
                        md: foundationToken.font.weight[400],
                    },
                    lineHeight: {
                        sm: foundationToken.font.lineHeight[12],
                        md: foundationToken.font.lineHeight[16],
                    },
                },
                required: {
                    color: foundationToken.colors.red[600],
                },
            },
        },
    }
}
