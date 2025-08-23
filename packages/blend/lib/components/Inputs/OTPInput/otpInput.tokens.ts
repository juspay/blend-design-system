import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'

enum OTPInputState {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}

export type OTPInputTokensType = {
    input: {
        gap: CSSObject['gap']
        borderRadius: CSSObject['borderRadius']
        boxShadow: {
            [key in OTPInputState]: CSSObject['boxShadow']
        }
        padding: CSSObject['padding']
        outline: {
            [key in OTPInputState]: CSSObject['outline']
        }
        border: {
            [key in OTPInputState]: CSSObject['border']
        }
        color: {
            [key in OTPInputState]: CSSObject['color']
        }
        backgroundColor: {
            [key in OTPInputState]: CSSObject['backgroundColor']
        }
    }
}

export type ResponsiveOTPInputTokens = {
    [key in keyof BreakpointType]: OTPInputTokensType
}

export const getOTPInputTokens = (
    foundationToken: FoundationTokenType
): ResponsiveOTPInputTokens => {
    return {
        sm: {
            input: {
                gap: foundationToken.unit[8],
                borderRadius: foundationToken.border.radius[12],
                boxShadow: {
                    default: foundationToken.shadows.sm,
                    hover: foundationToken.shadows.sm,
                    focus: foundationToken.shadows.focusPrimary,
                    error: foundationToken.shadows.focusError,
                    disabled: foundationToken.shadows.sm,
                },
                padding: 8,
                border: {
                    default: `1px solid ${foundationToken.colors.gray[200]}`,
                    hover: `1px solid ${foundationToken.colors.gray[400]}`,
                    focus: `1px solid ${foundationToken.colors.primary[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                outline: {
                    default: 'none',
                    hover: 'none',
                    focus: 'none',
                    error: 'none',
                    disabled: 'none',
                },
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                    disabled: foundationToken.colors.gray[50],
                    hover: foundationToken.colors.gray[0],
                    focus: foundationToken.colors.gray[0],
                    error: foundationToken.colors.gray[0],
                },
                color: {
                    default: foundationToken.colors.gray[800],
                    hover: foundationToken.colors.gray[800],
                    focus: foundationToken.colors.gray[800],
                    error: foundationToken.colors.red[800],
                    disabled: foundationToken.colors.gray[300],
                },
            },
        },
        lg: {
            input: {
                gap: foundationToken.unit[8],
                borderRadius: foundationToken.border.radius[12],
                boxShadow: {
                    default: foundationToken.shadows.sm,
                    hover: foundationToken.shadows.sm,
                    focus: foundationToken.shadows.focusPrimary,
                    error: foundationToken.shadows.focusError,
                    disabled: foundationToken.shadows.sm,
                },
                padding: 8,
                border: {
                    default: `1px solid ${foundationToken.colors.gray[200]}`,
                    hover: `1px solid ${foundationToken.colors.gray[400]}`,
                    focus: `1px solid ${foundationToken.colors.primary[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                outline: {
                    default: 'none',
                    hover: 'none',
                    focus: 'none',
                    error: 'none',
                    disabled: 'none',
                },
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                    disabled: foundationToken.colors.gray[50],
                    hover: foundationToken.colors.gray[0],
                    focus: foundationToken.colors.gray[0],
                    error: foundationToken.colors.gray[0],
                },
                color: {
                    default: foundationToken.colors.gray[800],
                    hover: foundationToken.colors.gray[800],
                    focus: foundationToken.colors.gray[800],
                    error: foundationToken.colors.red[800],
                    disabled: foundationToken.colors.gray[300],
                },
            },
        },
    }
}
