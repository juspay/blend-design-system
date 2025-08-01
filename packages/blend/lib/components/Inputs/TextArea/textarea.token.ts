import type { CSSObject } from 'styled-components'
import { FOUNDATION_THEME } from '../../../tokens'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'

type TextAreaState = 'default' | 'hover' | 'focus' | 'error' | 'disabled'

export type TextAreaTokensType = {
    fontFamily: CSSObject['fontFamily']
    paddingX: CSSObject['padding']
    paddingY: CSSObject['padding']
    borderRadius: CSSObject['borderRadius']
    boxShadow: {
        [key in TextAreaState]: CSSObject['boxShadow']
    }
    outline: {
        [key in TextAreaState]: CSSObject['outline']
    }
    border: {
        [key in TextAreaState]: CSSObject['border']
    }
    color: {
        [key in TextAreaState]: CSSObject['color']
    }
    backgroundColor: {
        [key in TextAreaState]: CSSObject['backgroundColor']
    }
}

export type ResponsiveTextAreaTokens = {
    [key in keyof BreakpointType]: TextAreaTokensType
}

export const textAreaTokens: TextAreaTokensType = {
    fontFamily: 'InterDisplay',
    paddingX: FOUNDATION_THEME.unit[14],
    paddingY: FOUNDATION_THEME.unit[10],
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
        hover: FOUNDATION_THEME.colors.gray[0],
        focus: FOUNDATION_THEME.colors.gray[0],
        error: FOUNDATION_THEME.colors.gray[0],
        disabled: FOUNDATION_THEME.colors.gray[50],
    },
}

export const getTextAreaTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveTextAreaTokens => {
    return {
        sm: {
            fontFamily: 'InterDisplay',
            paddingX: foundationTokens.unit[14],
            paddingY: foundationTokens.unit[10],
            borderRadius: foundationTokens.unit[8],
            boxShadow: {
                default: foundationTokens.shadows.sm,
                hover: foundationTokens.shadows.sm,
                focus: foundationTokens.shadows.focusPrimary,
                error: foundationTokens.shadows.focusError,
                disabled: foundationTokens.shadows.sm,
            },
            outline: {
                default: 'none',
                hover: 'none',
                focus: 'none',
                error: 'none',
                disabled: 'none',
            },
            border: {
                default: `1px solid ${foundationTokens.colors.gray[200]}`,
                hover: `1px solid ${foundationTokens.colors.gray[400]}`,
                focus: `1px solid ${foundationTokens.colors.primary[500]}`,
                error: `1px solid ${foundationTokens.colors.red[500]}`,
                disabled: `1px solid ${foundationTokens.colors.gray[200]}`,
            },
            color: {
                default: foundationTokens.colors.gray[800],
                hover: foundationTokens.colors.gray[800],
                focus: foundationTokens.colors.gray[800],
                error: foundationTokens.colors.red[800],
                disabled: foundationTokens.colors.gray[300],
            },
            backgroundColor: {
                default: foundationTokens.colors.gray[0],
                hover: foundationTokens.colors.gray[0],
                focus: foundationTokens.colors.gray[0],
                error: foundationTokens.colors.gray[0],
                disabled: foundationTokens.colors.gray[50],
            },
        },
        lg: {
            fontFamily: 'InterDisplay',
            paddingX: foundationTokens.unit[14],
            paddingY: foundationTokens.unit[10],
            borderRadius: foundationTokens.unit[8],
            boxShadow: {
                default: foundationTokens.shadows.sm,
                hover: foundationTokens.shadows.sm,
                focus: foundationTokens.shadows.focusPrimary,
                error: foundationTokens.shadows.focusError,
                disabled: foundationTokens.shadows.sm,
            },
            outline: {
                default: 'none',
                hover: 'none',
                focus: 'none',
                error: 'none',
                disabled: 'none',
            },
            border: {
                default: `1px solid ${foundationTokens.colors.gray[200]}`,
                hover: `1px solid ${foundationTokens.colors.gray[400]}`,
                focus: `1px solid ${foundationTokens.colors.primary[500]}`,
                error: `1px solid ${foundationTokens.colors.red[500]}`,
                disabled: `1px solid ${foundationTokens.colors.gray[200]}`,
            },
            color: {
                default: foundationTokens.colors.gray[800],
                hover: foundationTokens.colors.gray[800],
                focus: foundationTokens.colors.gray[800],
                error: foundationTokens.colors.red[800],
                disabled: foundationTokens.colors.gray[300],
            },
            backgroundColor: {
                default: foundationTokens.colors.gray[0],
                hover: foundationTokens.colors.gray[0],
                focus: foundationTokens.colors.gray[0],
                error: foundationTokens.colors.gray[0],
                disabled: foundationTokens.colors.gray[50],
            },
        },
    }
}

export default textAreaTokens
