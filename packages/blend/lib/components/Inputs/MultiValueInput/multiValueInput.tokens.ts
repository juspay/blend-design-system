import type { CSSObject } from 'styled-components'
import { FOUNDATION_THEME } from '../../../tokens'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { MultiValueInputSize, MultiValueInputState } from './types'

export type MultiValueInputTokensType = {
    input: {
        gap: CSSObject['gap']
        borderRadius?: CSSObject['borderRadius']
        boxShadow: {
            [key in MultiValueInputState]: CSSObject['boxShadow']
        }
        paddingX: {
            [key in MultiValueInputSize]: CSSObject['padding']
        }
        paddingY: {
            [key in MultiValueInputSize]: CSSObject['padding']
        }
        border: {
            [key in MultiValueInputState]: CSSObject['border']
        }
        color: {
            [key in MultiValueInputState]: CSSObject['color']
        }
        outline: {
            [key in MultiValueInputState]: CSSObject['outline']
        }
        backgroundColor: {
            [key in MultiValueInputState]: CSSObject['backgroundColor']
        }
    }
}

const multiValueInputTokens: Readonly<MultiValueInputTokensType> = {
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
        },
        paddingY: {
            md: FOUNDATION_THEME.unit[8],
            lg: FOUNDATION_THEME.unit[10],
        },
        border: {
            default: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
            hover: `1px solid ${FOUNDATION_THEME.colors.gray[400]}`,
            focus: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
            error: `1px solid ${FOUNDATION_THEME.colors.red[500]}`,
            disabled: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
        },
        outline: {
            default: 'none',
            hover: 'none',
            focus: 'none',
            error: 'none',
            disabled: 'none',
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

export const getMultiValueInputTokens = (
    foundationTheme: FoundationTokenType
): MultiValueInputTokensType => {
    return {
        input: {
            gap: foundationTheme.unit[8],
            borderRadius: foundationTheme.unit[10],
            paddingX: {
                md: foundationTheme.unit[12],
                lg: foundationTheme.unit[14],
            },
            paddingY: {
                md: foundationTheme.unit[8],
                lg: foundationTheme.unit[10],
            },
            border: {
                default: `1px solid ${foundationTheme.colors.gray[200]}`,
                hover: `1px solid ${foundationTheme.colors.gray[400]}`,
                focus: `1px solid ${foundationTheme.colors.primary[500]}`,
                error: `1px solid ${foundationTheme.colors.red[500]}`,
                disabled: `1px solid ${foundationTheme.colors.gray[200]}`,
            },
            outline: {
                default: 'none',
                hover: 'none',
                focus: 'none',
                error: 'none',
                disabled: 'none',
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
                default: foundationTheme.shadows.sm,
                hover: foundationTheme.shadows.sm,
                focus: foundationTheme.shadows.focusPrimary,
                error: foundationTheme.shadows.focusError,
                disabled: foundationTheme.shadows.sm,
            },
        },
    }
}

export default multiValueInputTokens
