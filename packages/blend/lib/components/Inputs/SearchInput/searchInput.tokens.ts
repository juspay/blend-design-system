import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'

enum SearchInputState {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}

export type SearchInputTokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in SearchInputState]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in SearchInputState]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in SearchInputState]: CSSObject['color']
        }
    }
    errorMessage: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    required: {
        color: CSSObject['color']
    }
    inputContainer: {
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        borderRadius: CSSObject['borderRadius']
        borderBottom: {
            [key in SearchInputState]: CSSObject['borderBottom']
        }
        outline: CSSObject['outline']
        boxShadow: CSSObject['boxShadow']
        color: {
            [key in SearchInputState]: CSSObject['color']
        }
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
    }
    icon: {
        color: {
            [key in SearchInputState]: CSSObject['color']
        }
        width: CSSObject['width']
    }
}

export type ResponsiveSearchInputTokens = {
    [key in keyof BreakpointType]: SearchInputTokensType
}

export const getSearchInputTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveSearchInputTokens => {
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
                padding: {
                    x: foundationTokens.unit[8],
                    y: foundationTokens.unit[8],
                },
                borderRadius: foundationTokens.unit[0],
                borderBottom: {
                    default: `1px solid ${foundationTokens.colors.gray[200]} !important`,
                    hover: `1px solid ${foundationTokens.colors.gray[400]} !important`,
                    focus: `1px solid ${foundationTokens.colors.primary[500]} !important`,
                    error: `1px solid ${foundationTokens.colors.red[500]} !important`,
                    disabled: `1px solid ${foundationTokens.colors.gray[200]} !important`,
                },
                outline: 'none',
                boxShadow: foundationTokens.shadows.sm,
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[800],
                    focus: foundationTokens.colors.gray[800],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[800],
                },
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
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
                padding: {
                    x: foundationTokens.unit[8],
                    y: foundationTokens.unit[8],
                },
                borderRadius: foundationTokens.unit[0],
                borderBottom: {
                    default: `1px solid ${foundationTokens.colors.gray[200]} !important`,
                    hover: `1px solid ${foundationTokens.colors.gray[400]} !important`,
                    focus: `1px solid ${foundationTokens.colors.primary[500]} !important`,
                    error: `1px solid ${foundationTokens.colors.red[500]} !important`,
                    disabled: `1px solid ${foundationTokens.colors.gray[200]} !important`,
                },
                outline: 'none',
                boxShadow: foundationTokens.shadows.sm,
                color: {
                    default: foundationTokens.colors.gray[400],
                    hover: foundationTokens.colors.gray[800],
                    focus: foundationTokens.colors.gray[800],
                    disabled: foundationTokens.colors.gray[300],
                    error: foundationTokens.colors.red[800],
                },
                fontSize: foundationTokens.font.size.body.md.fontSize,
                fontWeight: foundationTokens.font.weight[500],
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

export default getSearchInputTokens
