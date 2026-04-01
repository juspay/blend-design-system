import { BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { FoundationTokenType } from '../../tokens/theme.token'
import { getProgressBarV2DarkTokens } from './progressBarV2.dark.tokens'
import { getProgressBarV2LightTokens } from './progressBarV2.light.tokens'
import type {
    ProgressBarV2Appearance,
    ProgressBarV2Size,
} from './progressBarV2.types'
import type { CSSObject } from 'styled-components'

export type ProgressBarV2TokenType = {
    linear: {
        height: {
            [key in ProgressBarV2Size]: CSSObject['height']
        }
        fill: {
            backgroundColor: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundColor']
            }
            borderRadius: {
                [key in ProgressBarV2Appearance]: CSSObject['borderRadius']
            }
        }
        empty: {
            backgroundColor: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundColor']
            }
            backgroundImage: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundImage']
            }
            backgroundSize: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundSize']
            }
        }
        borderRadius: {
            [key in ProgressBarV2Appearance]: CSSObject['borderRadius']
        }
        gap: CSSObject['gap']
    }
    circular: {
        size: {
            [key in ProgressBarV2Size]: CSSObject['width']
        }
        strokeWidth: {
            [key in ProgressBarV2Size]: number
        }
        stroke: {
            [key in ProgressBarV2Appearance]: CSSObject['stroke']
        }
        background: {
            [key in ProgressBarV2Appearance]: CSSObject['stroke']
        }
        dashArray: {
            [key in ProgressBarV2Appearance]: string
        }
        dashOffset: {
            [key in ProgressBarV2Appearance]: string
        }
    }
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    transition: string
}

export type ResponsiveProgressBarV2Tokens = {
    [key in keyof BreakpointType]: ProgressBarV2TokenType
}

export const getProgressBarV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveProgressBarV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getProgressBarV2DarkTokens(foundationToken)
    }

    return getProgressBarV2LightTokens(foundationToken)
}
