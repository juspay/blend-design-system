import type { CSSObject } from 'styled-components'
import { FOUNDATION_THEME } from '../../../tokens'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { TextInputSize, TextInputState } from './types'
import { BreakpointType } from '../../../breakpoints/breakPoints'

export type TextInputTokensType = {
    input: {
        gap: CSSObject['gap']
        borderRadius?: CSSObject['borderRadius']
        boxShadow: {
            [key in TextInputState]: CSSObject['boxShadow']
        }
        paddingX: {
            [key in TextInputSize]: CSSObject['padding']
        }
        paddingY: {
            [key in TextInputSize]: CSSObject['padding']
        }
        border: {
            [key in TextInputState]: CSSObject['border']
        }
        color: {
            [key in TextInputState]: CSSObject['color']
        }
        outline: {
            [key in TextInputState]: CSSObject['outline']
        }
        backgroundColor: {
            [key in TextInputState]: CSSObject['backgroundColor']
        }
    }
}

const textInputTokens: Readonly<TextInputTokensType> = {
    input: {
        gap: FOUNDATION_THEME.unit[8],
        borderRadius: FOUNDATION_THEME.unit[10],
        boxShadow: {
            default: FOUNDATION_THEME.shadows.sm,
            hover: FOUNDATION_THEME.shadows.sm,
            focus: FOUNDATION_THEME.shadows.focusPrimary,
            error: FOUNDATION_THEME.shadows.focusError,
            disabled: FOUNDATION_THEME.shadows.sm,
        },
        paddingX: {
            md: FOUNDATION_THEME.unit[12],
            lg: FOUNDATION_THEME.unit[14],
            sm: FOUNDATION_THEME.unit[10],
        },
        paddingY: {
            md: FOUNDATION_THEME.unit[8],
            lg: FOUNDATION_THEME.unit[10],
            sm: FOUNDATION_THEME.unit[6],
        },
        border: {
            default: 'none',
            hover: 'none',
            focus: 'none',
            error: 'none',
            disabled: 'none',
        },
        outline: {
            default: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
            hover: `1px solid ${FOUNDATION_THEME.colors.gray[400]}`,
            focus: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
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
            disabled: FOUNDATION_THEME.colors.gray[50],
            hover: FOUNDATION_THEME.colors.gray[0],
            focus: FOUNDATION_THEME.colors.gray[0],
            error: FOUNDATION_THEME.colors.gray[0],
        },
    },
}
export type ResponsiveTextInputTokens = {
    [key in keyof BreakpointType]: TextInputTokensType
}

export const getTextInputTokens = (
    foundationTheme: FoundationTokenType
): ResponsiveTextInputTokens => {
    return {
        sm: {
            input: {
                gap: foundationTheme.unit[8],
                borderRadius: foundationTheme.unit[10],
                paddingX: {
                    md: foundationTheme.unit[12],
                    lg: foundationTheme.unit[14],
                    sm: foundationTheme.unit[10],
                },
                paddingY: {
                    md: foundationTheme.unit[8],
                    lg: foundationTheme.unit[14],
                    sm: foundationTheme.unit[6],
                },
                border: {
                    default: 'none',
                    hover: 'none',
                    focus: 'none',
                    error: 'none',
                    disabled: 'none',
                },
                outline: {
                    default: `1px solid ${foundationTheme.colors.gray[200]}`,
                    hover: `1px solid ${foundationTheme.colors.gray[400]}`,
                    focus: `1px solid ${foundationTheme.colors.primary[500]}`,
                    error: `1px solid ${foundationTheme.colors.red[500]}`,
                    disabled: `1px solid ${foundationTheme.colors.gray[200]}`,
                },
                color: {
                    default: foundationTheme.colors.gray[800],
                    hover: foundationTheme.colors.gray[800],
                    focus: foundationTheme.colors.gray[800],
                    error: foundationTheme.colors.red[800],
                    disabled: foundationTheme.colors.gray[300],
                },
                backgroundColor: {
                    default: foundationTheme.colors.gray[0],
                    disabled: foundationTheme.colors.gray[50],
                    hover: foundationTheme.colors.gray[0],
                    focus: foundationTheme.colors.gray[0],
                    error: foundationTheme.colors.gray[0],
                },
                boxShadow: {
                    default: FOUNDATION_THEME.shadows.sm,
                    hover: FOUNDATION_THEME.shadows.sm,
                    focus: FOUNDATION_THEME.shadows.focusPrimary,
                    error: FOUNDATION_THEME.shadows.focusError,
                    disabled: FOUNDATION_THEME.shadows.sm,
                },
            },
        },
        lg: {
            input: {
                gap: foundationTheme.unit[8],
                borderRadius: foundationTheme.unit[10],
                paddingX: {
                    md: foundationTheme.unit[12],
                    lg: foundationTheme.unit[14],
                    sm: foundationTheme.unit[10],
                },
                paddingY: {
                    md: foundationTheme.unit[8],
                    lg: foundationTheme.unit[10],
                    sm: foundationTheme.unit[6],
                },
                border: {
                    default: 'none',
                    hover: 'none',
                    focus: 'none',
                    error: 'none',
                    disabled: 'none',
                },
                outline: {
                    default: `1px solid ${foundationTheme.colors.gray[200]}`,
                    hover: `1px solid ${foundationTheme.colors.gray[400]}`,
                    focus: `1px solid ${foundationTheme.colors.primary[500]}`,
                    error: `1px solid ${foundationTheme.colors.red[500]}`,
                    disabled: `1px solid ${foundationTheme.colors.gray[200]}`,
                },
                color: {
                    default: foundationTheme.colors.gray[800],
                    hover: foundationTheme.colors.gray[800],
                    focus: foundationTheme.colors.gray[800],
                    error: foundationTheme.colors.red[800],
                    disabled: foundationTheme.colors.gray[300],
                },
                backgroundColor: {
                    default: foundationTheme.colors.gray[0],
                    disabled: foundationTheme.colors.gray[50],
                    hover: foundationTheme.colors.gray[0],
                    focus: foundationTheme.colors.gray[0],
                    error: foundationTheme.colors.gray[0],
                },
                boxShadow: {
                    default: FOUNDATION_THEME.shadows.sm,
                    hover: FOUNDATION_THEME.shadows.sm,
                    focus: FOUNDATION_THEME.shadows.focusPrimary,
                    error: FOUNDATION_THEME.shadows.focusError,
                    disabled: FOUNDATION_THEME.shadows.sm,
                },
            },
        },
    }
}

export default textInputTokens
