import { CSSObject } from 'styled-components'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getTextInputV2DarkTokens } from './TextInputV2.dark.tokens'
import { getTextInputV2LightTokens } from './TextInputV2.light.tokens'

export type TextInputV2TokensType = {
    gap: CSSObject['gap']
    topContainer: {
        label: {
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
        subLabel: {
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
        required: {
            color: CSSObject['color']
        }
        helpIcon: {
            width: {
                [key in InputSizeV2]: CSSObject['width']
            }
            color: {
                [key in InputStateV2]: CSSObject['color']
            }
        }
    }
    inputContainer: {
        gap: CSSObject['gap']
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
        inputText: {
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
        borderRadius: {
            [key in InputSizeV2]: CSSObject['borderRadius']
        }
        boxShadow: CSSObject['boxShadow']
        padding: {
            top: {
                [key in InputSizeV2]: CSSObject['padding']
            }
            right: {
                [key in InputSizeV2]: CSSObject['padding']
            }
            bottom: {
                [key in InputSizeV2]: CSSObject['padding']
            }
            left: {
                [key in InputSizeV2]: CSSObject['padding']
            }
        }
        border: {
            [key in InputStateV2]: CSSObject['border']
        }
        backgroundColor: {
            [key in InputStateV2]: CSSObject['backgroundColor']
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

export type ResponsiveTextInputV2Tokens = {
    [key in keyof BreakpointType]: TextInputV2TokensType
}

export const getTextInputV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTextInputV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTextInputV2DarkTokens(foundationToken)
    }
    return getTextInputV2LightTokens(foundationToken)
}
