import { FoundationTokenType } from '../../../tokens/theme.token'
import { ResponsiveRadioV2Tokens } from './radioV2.tokens'

export const getRadioV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveRadioV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            group: {
                gap: foundationToken.unit[12],
            },
            radio: {
                height: {
                    sm: foundationToken.unit[16],
                    md: foundationToken.unit[20],
                    lg: foundationToken.unit[20],
                },
                borderWidth: {
                    inactive: {
                        default: 1,
                        hover: 1,
                        disabled: 1,
                        error: 1,
                    },
                    active: {
                        default: 1,
                        hover: 1,
                        disabled: 1,
                        error: 1,
                    },
                },
                indicator: {
                    inactive: {
                        backgroundColor: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[150],
                            disabled: foundationToken.colors.gray[100],
                            error: foundationToken.colors.red[600],
                        },
                        borderColor: {
                            default: foundationToken.colors.gray[300],
                            hover: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[200],
                            error: foundationToken.colors.red[600],
                        },
                    },
                    active: {
                        backgroundColor: {
                            default: foundationToken.colors.primary[100],
                            hover: foundationToken.colors.primary[100],
                            disabled: foundationToken.colors.gray[50],
                            error: foundationToken.colors.red[600],
                        },
                        borderColor: {
                            default: foundationToken.colors.primary[600],
                            hover: foundationToken.colors.primary[600],
                            disabled: foundationToken.colors.primary[300],
                            error: foundationToken.colors.red[600],
                        },
                    },
                },
                activeIndicator: {
                    active: {
                        backgroundColor: {
                            default: foundationToken.colors.primary[600],
                            disabled: foundationToken.colors.primary[300],
                        },
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
                        focus: foundationToken.colors.gray[700],
                    },

                    fontSize: {
                        sm: `${foundationToken.font.size.body.md.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                        lg: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[500],
                        md: foundationToken.font.weight[500],
                        lg: foundationToken.font.weight[500],
                    },
                    lineHeight: {
                        sm: foundationToken.font.lineHeight[14],
                        md: foundationToken.font.lineHeight[16],
                        lg: foundationToken.font.lineHeight[16],
                    },
                    slot: {
                        maxHeight: {
                            sm: foundationToken.unit[12],
                            md: foundationToken.unit[14],
                            lg: foundationToken.unit[14],
                        },
                    },
                },
                subLabel: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[500],
                        hover: foundationToken.colors.gray[400],
                        focus: foundationToken.colors.gray[700],
                    },

                    fontSize: {
                        sm: `${foundationToken.font.size.body.sm.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                        lg: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[400],
                        md: foundationToken.font.weight[400],
                        lg: foundationToken.font.weight[400],
                    },
                    lineHeight: {
                        sm: foundationToken.font.lineHeight[12],
                        md: foundationToken.font.lineHeight[16],
                        lg: foundationToken.font.lineHeight[16],
                    },
                },
                required: {
                    color: foundationToken.colors.red[600],
                },
            },
        },
        lg: {
            gap: foundationToken.unit[8],
            group: {
                gap: foundationToken.unit[12],
            },
            radio: {
                height: {
                    sm: foundationToken.unit[14],
                    md: foundationToken.unit[16],
                    lg: foundationToken.unit[20],
                },
                borderWidth: {
                    inactive: {
                        default: 1,
                        hover: 1,
                        disabled: 1,
                        error: 1,
                    },
                    active: {
                        default: 1,
                        hover: 1,
                        disabled: 1,
                        error: 1,
                    },
                },
                indicator: {
                    inactive: {
                        backgroundColor: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[150],
                            disabled: foundationToken.colors.gray[100],
                            error: foundationToken.colors.red[600],
                        },
                        borderColor: {
                            default: foundationToken.colors.gray[300],
                            hover: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[200],
                            error: foundationToken.colors.red[600],
                        },
                    },
                    active: {
                        backgroundColor: {
                            default: foundationToken.colors.primary[100],
                            hover: foundationToken.colors.primary[100],
                            disabled: foundationToken.colors.gray[50],
                            error: foundationToken.colors.red[600],
                        },
                        borderColor: {
                            default: foundationToken.colors.primary[600],
                            hover: foundationToken.colors.primary[600],
                            disabled: foundationToken.colors.primary[300],
                            error: foundationToken.colors.red[600],
                        },
                    },
                },
                activeIndicator: {
                    active: {
                        backgroundColor: {
                            default: foundationToken.colors.primary[600],
                            disabled: foundationToken.colors.primary[300],
                        },
                    },
                },
            },
            content: {
                gap: foundationToken.unit[6],
                label: {
                    gap: foundationToken.unit[6],
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[800],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                        focus: foundationToken.colors.gray[700],
                    },

                    fontSize: {
                        sm: `${foundationToken.font.size.body.sm.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                        lg: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[500],
                        md: foundationToken.font.weight[500],
                        lg: foundationToken.font.weight[500],
                    },
                    lineHeight: {
                        sm: foundationToken.font.lineHeight[12],
                        md: foundationToken.font.lineHeight[16],
                        lg: foundationToken.font.lineHeight[16],
                    },
                    slot: {
                        maxHeight: {
                            sm: foundationToken.unit[12],
                            md: foundationToken.unit[14],
                            lg: foundationToken.unit[14],
                        },
                    },
                },
                subLabel: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[500],
                        focus: foundationToken.colors.gray[500],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[500],
                    },

                    fontSize: {
                        sm: `${foundationToken.font.size.body.sm.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                        lg: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[400],
                        md: foundationToken.font.weight[400],
                        lg: foundationToken.font.weight[400],
                    },
                    lineHeight: {
                        sm: foundationToken.font.lineHeight[12],
                        md: foundationToken.font.lineHeight[16],
                        lg: foundationToken.font.lineHeight[16],
                    },
                },
                required: {
                    color: foundationToken.colors.red[600],
                },
            },
        },
    }
}
