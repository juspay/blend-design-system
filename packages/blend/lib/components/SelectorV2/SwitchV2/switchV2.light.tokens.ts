import { FoundationTokenType } from '../../../tokens/theme.token'
import { ResponsiveSwitchV2Tokens } from './switchV2.tokens'

export const getSwitchV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSwitchV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            switch: {
                height: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                    lg: foundationToken.unit[16],
                },
                width: {
                    sm: foundationToken.unit[24],
                    md: foundationToken.unit[32],
                    lg: foundationToken.unit[32],
                },
                backgroundColor: {
                    checked: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.red[500],
                    },
                    unchecked: {
                        default: foundationToken.colors.gray[200],
                        hover: foundationToken.colors.gray[300],
                        disabled: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[200],
                    },
                },

                thumb: {
                    backgroundColor: foundationToken.colors.gray[0],
                    border: `0.5px solid ${foundationToken.colors.gray[200]}`,
                    width: {
                        sm: foundationToken.unit[10],
                        md: foundationToken.unit[14],
                        lg: foundationToken.unit[14],
                    },
                    height: {
                        sm: foundationToken.unit[10],
                        md: foundationToken.unit[14],
                        lg: foundationToken.unit[14],
                    },
                    outline: `1px solid ${foundationToken.colors.primary[200]}`,
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
                    },
                    fontSize: {
                        sm: foundationToken.font.fontSize[12],
                        md: foundationToken.font.fontSize[14],
                        lg: foundationToken.font.fontSize[14],
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
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[500],
                    },
                    fontSize: {
                        sm: foundationToken.font.fontSize[12],
                        md: foundationToken.font.fontSize[14],
                        lg: foundationToken.font.fontSize[14],
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

            switch: {
                height: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                    lg: foundationToken.unit[16],
                },
                width: {
                    sm: foundationToken.unit[24],
                    md: foundationToken.unit[32],
                    lg: foundationToken.unit[32],
                },
                backgroundColor: {
                    checked: {
                        default: foundationToken.colors.primary[600],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.red[500],
                    },
                    unchecked: {
                        default: foundationToken.colors.gray[200],
                        hover: foundationToken.colors.gray[300],
                        disabled: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[200],
                    },
                },

                thumb: {
                    backgroundColor: foundationToken.colors.gray[0],
                    border: `0.5px solid ${foundationToken.colors.gray[200]}`,
                    width: {
                        sm: foundationToken.unit[10],
                        md: foundationToken.unit[14],
                        lg: foundationToken.unit[14],
                    },
                    height: {
                        sm: foundationToken.unit[10],
                        md: foundationToken.unit[14],
                        lg: foundationToken.unit[14],
                    },
                    outline: `1px solid ${foundationToken.colors.primary[200]}`,
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
                    },
                    fontSize: {
                        sm: foundationToken.font.fontSize[12],
                        md: foundationToken.font.fontSize[14],
                        lg: foundationToken.font.fontSize[14],
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
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[500],
                    },
                    fontSize: {
                        sm: foundationToken.font.fontSize[12],
                        md: foundationToken.font.fontSize[14],
                        lg: foundationToken.font.fontSize[14],
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
