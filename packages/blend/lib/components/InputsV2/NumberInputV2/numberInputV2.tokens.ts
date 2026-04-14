import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import { Theme } from '../../../context/theme.enum'
import { getNumberInputV2LightTokens } from './NumberInputV2.light.tokens'
import { getNumberInputV2DarkTokens } from './NumberInputV2.dark.tokens'
import type {
    InputFooterV2Tokens,
    InputLabelsV2Tokens,
    FloatingLabelsV2Tokens,
} from '../inputV2.tokens'
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
        paddingTop: { [key in InputSizeV2]: CSSObject['paddingTop'] }
        paddingRight: { [key in InputSizeV2]: CSSObject['paddingRight'] }
        paddingBottom: { [key in InputSizeV2]: CSSObject['paddingBottom'] }
        paddingLeft: { [key in InputSizeV2]: CSSObject['paddingLeft'] }
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
    unit: {
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        paddingTop: { [key in InputSizeV2]: CSSObject['paddingTop'] }
        paddingRight: { [key in InputSizeV2]: CSSObject['paddingRight'] }
        paddingBottom: { [key in InputSizeV2]: CSSObject['paddingBottom'] }
        paddingLeft: { [key in InputSizeV2]: CSSObject['paddingLeft'] }
        borderRadius: { [key in InputSizeV2]: CSSObject['borderRadius'] }
        border: {
            [key in InputStateV2]: CSSObject['border']
        }
        backgroundColor: {
            [key in InputStateV2]: CSSObject['backgroundColor']
        }
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
    }
    floatingLabels: FloatingLabelsV2Tokens
    bottomContainer: InputFooterV2Tokens
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
