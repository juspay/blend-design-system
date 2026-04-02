import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import { Theme } from '../../../context/theme.enum'
import { getNumberInputV2LightTokens } from './NumberInputV2.light.tokens'
import { getNumberInputV2DarkTokens } from './NumberInputV2.dark.tokens'
import type { InputLabelsV2Tokens } from '../utils/InputLabels/InputLabelsV2'

export type NumberInputV2TokensType = {
    gap: CSSObject['gap']
    topContainer: InputLabelsV2Tokens
    inputContainer: {
        placeholder: {
            color: {
                [key in InputStateV2]: CSSObject['color']
            }
            fontSize: {
                [key in InputSizeV2]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in InputSizeV2]: CSSObject['fontWeight']
            }
            lineHeight: {
                [key in InputSizeV2]: CSSObject['lineHeight']
            }
        }
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
        borderRadius: {
            [key in InputSizeV2]: CSSObject['borderRadius']
        }
        boxShadow: CSSObject['boxShadow']

        padding: {
            x: {
                [key in InputSizeV2]: CSSObject['padding']
            }
            y: {
                [key in InputSizeV2]: CSSObject['padding']
            }
        }
        border: {
            [key in InputStateV2]: CSSObject['border']
        }
        lineHeight: {
            [key in InputSizeV2]: CSSObject['lineHeight']
        }

        backgroundColor: {
            [key in InputStateV2]: CSSObject['backgroundColor']
        }
        stepperButton: {
            width: {
                [key in InputSizeV2]: CSSObject['width']
            }
            backgroundColor: {
                [key in InputStateV2]: CSSObject['backgroundColor']
            }
            icon: {
                color: {
                    [key in InputStateV2]: CSSObject['color']
                }
                width: {
                    [key in InputSizeV2]: CSSObject['width']
                }
            }
        }
    }
    bottomContainer: {
        hintText: {
            fontSize: {
                [key in InputSizeV2]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in InputSizeV2]: CSSObject['fontWeight']
            }
            lineHeight: {
                [key in InputSizeV2]: CSSObject['lineHeight']
            }
            color: {
                [key in InputStateV2]: CSSObject['color']
            }
        }
        errorMessage: {
            fontSize: {
                [key in InputSizeV2]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in InputSizeV2]: CSSObject['fontWeight']
            }
            lineHeight: {
                [key in InputSizeV2]: CSSObject['lineHeight']
            }
            color: CSSObject['color']
        }
    }
}
export type ResponsiveNumberInputV2Tokens = {
    [key in keyof BreakpointType]: NumberInputV2TokensType
}

export const getNumberInputV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveNumberInputV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getNumberInputV2DarkTokens(foundationToken)
    }
    return getNumberInputV2LightTokens(foundationToken)
}
