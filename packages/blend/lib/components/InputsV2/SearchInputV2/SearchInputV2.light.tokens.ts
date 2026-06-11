import type { FoundationTokenType } from '../../../tokens/theme.token'
import type { ResponsiveSearchInputV2Tokens } from './SearchInputV2.tokens.types'

export const getSearchInputV2LightTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveSearchInputV2Tokens => {
    return {
        sm: {
            gap: foundationTokens.unit[8],
            label: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: {
                    default: foundationTokens.colors.gray[700],
                    hover: foundationTokens.colors.gray[700],
                    focus: foundationTokens.colors.gray[700],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            subLabel: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[600],
                },
            },
            hintText: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[500],
                    hover: foundationTokens.colors.gray[500],
                    focus: foundationTokens.colors.gray[500],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: foundationTokens.colors.red[600],
            },
            required: {
                color: foundationTokens.colors.red[600],
            },
            inputContainer: {
                placeholderColor: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[500],
                    focus: foundationTokens.colors.gray[500],
                    disabled: foundationTokens.colors.gray[500],
                    error: foundationTokens.colors.gray[500],
                },
                paddingTop: {
                    sm: foundationTokens.unit[7],
                    md: foundationTokens.unit[7],
                    lg: foundationTokens.unit[7],
                },
                paddingRight: {
                    sm: foundationTokens.unit[8],
                    md: foundationTokens.unit[8],
                    lg: foundationTokens.unit[8],
                },
                paddingBottom: {
                    sm: foundationTokens.unit[7],
                    md: foundationTokens.unit[7],
                    lg: foundationTokens.unit[7],
                },
                paddingLeft: {
                    sm: foundationTokens.unit[8],
                    md: foundationTokens.unit[8],
                    lg: foundationTokens.unit[8],
                },
                borderRadius: foundationTokens.unit[0],
                borderBottom: {
                    default: `1px solid ${foundationTokens.colors.gray[200]}`,
                    hover: `1px solid ${foundationTokens.colors.gray[400]}`,
                    focus: `1px solid ${foundationTokens.colors.primary[500]}`,
                    error: `1px solid ${foundationTokens.colors.red[500]}`,
                    disabled: `1px solid ${foundationTokens.colors.gray[200]}`,
                },
                outline: 'none',
                boxShadow: foundationTokens.shadows.sm,
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[700],
                    focus: foundationTokens.colors.gray[700],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[800],
                },
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                slot: {
                    left: {
                        top: foundationTokens.unit[7],
                        left: foundationTokens.unit[7],
                        bottom: foundationTokens.unit[7],
                    },
                    right: {
                        top: foundationTokens.unit[7],
                        right: foundationTokens.unit[7],
                        bottom: foundationTokens.unit[7],
                    },
                    transition:
                        'transform 200ms ease-in-out, opacity 200ms ease-in-out',
                    transform: 'scale(1.05)',
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[600],
                        focus: foundationTokens.colors.primary[500],
                        disabled: foundationTokens.colors.gray[300],
                        error: foundationTokens.colors.red[500],
                    },
                },
            },
            icon: {
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[600],
                    focus: foundationTokens.colors.primary[500],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[500],
                },
                width: foundationTokens.unit[16],
            },
        },
        lg: {
            gap: foundationTokens.unit[8],
            label: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: {
                    default: foundationTokens.colors.gray[700],
                    hover: foundationTokens.colors.gray[700],
                    focus: foundationTokens.colors.gray[700],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            subLabel: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[400],
                    focus: foundationTokens.colors.gray[400],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[600],
                },
            },
            hintText: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[400],
                color: {
                    default: foundationTokens.colors.gray[500],
                    hover: foundationTokens.colors.gray[500],
                    focus: foundationTokens.colors.gray[500],
                    disabled: foundationTokens.colors.gray[400],
                    error: foundationTokens.colors.red[600],
                },
            },
            errorMessage: {
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                color: foundationTokens.colors.red[600],
            },
            required: {
                color: foundationTokens.colors.red[600],
            },
            inputContainer: {
                placeholderColor: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[500],
                    focus: foundationTokens.colors.gray[500],
                    disabled: foundationTokens.colors.gray[500],
                    error: foundationTokens.colors.gray[500],
                },
                paddingTop: {
                    sm: foundationTokens.unit[7],
                    md: foundationTokens.unit[7],
                    lg: foundationTokens.unit[7],
                },
                paddingRight: {
                    sm: foundationTokens.unit[8],
                    md: foundationTokens.unit[8],
                    lg: foundationTokens.unit[8],
                },
                paddingBottom: {
                    sm: foundationTokens.unit[7],
                    md: foundationTokens.unit[7],
                    lg: foundationTokens.unit[7],
                },
                paddingLeft: {
                    sm: foundationTokens.unit[8],
                    md: foundationTokens.unit[8],
                    lg: foundationTokens.unit[8],
                },
                borderRadius: foundationTokens.unit[0],
                borderBottom: {
                    default: `1px solid ${foundationTokens.colors.gray[200]}`,
                    hover: `1px solid ${foundationTokens.colors.gray[400]}`,
                    focus: `1px solid ${foundationTokens.colors.primary[500]}`,
                    error: `1px solid ${foundationTokens.colors.red[500]}`,
                    disabled: `1px solid ${foundationTokens.colors.gray[200]}`,
                },
                outline: 'none',
                boxShadow: foundationTokens.shadows.sm,
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[700],
                    focus: foundationTokens.colors.gray[700],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[500],
                },
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
                slot: {
                    left: {
                        top: foundationTokens.unit[7],
                        left: foundationTokens.unit[7],
                        bottom: foundationTokens.unit[7],
                    },
                    right: {
                        top: foundationTokens.unit[7],
                        right: foundationTokens.unit[7],
                        bottom: foundationTokens.unit[7],
                    },
                    transition:
                        'transform 200ms ease-in-out, opacity 200ms ease-in-out',
                    transform: 'scale(1.05)',
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[600],
                        focus: foundationTokens.colors.primary[500],
                        disabled: foundationTokens.colors.gray[300],
                        error: foundationTokens.colors.red[500],
                    },
                },
            },
            icon: {
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[600],
                    focus: foundationTokens.colors.primary[500],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[500],
                },
                width: foundationTokens.unit[16],
            },
        },
    }
}
