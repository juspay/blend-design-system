import type { CSSObject } from 'styled-components'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    PaddingDirection,
} from './buttonV2.types'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { getButtonV2LightTokens } from './buttonV2.light.tokens'
import { Theme } from '../../context/theme.enum'
import { getButtonV2DarkTokens } from './buttonV2.dark.tokens'

export type ButtonV2TokensType = Readonly<{
    gap: CSSObject['gap']
    backgroundColor: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSObject['background']
            }
        }
    }
    borderRadius: {
        [key in ButtonV2Size]: {
            [key in ButtonV2Type]: {
                [key in ButtonV2SubType]: CSSObject['borderRadius']
            }
        }
    }
    padding: {
        [key in PaddingDirection]: {
            [key in ButtonV2Size]: {
                [key in ButtonV2Type]: {
                    [key in ButtonV2SubType]: CSSObject['padding']
                }
            }
        }
    }
    border: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSObject['border']
            }
        }
    }
    shadow: {
        [key in ButtonV2Type]: {
            [key in ButtonV2SubType]: {
                [key in ButtonV2State]: CSSObject['boxShadow']
            }
        }
    }
    text: {
        color: {
            [key in ButtonV2Type]: {
                [key in ButtonV2SubType]: {
                    [key in ButtonV2State]: CSSObject['color']
                }
            }
        }
        fontSize: {
            [key in ButtonV2Size]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in ButtonV2Size]: CSSObject['fontWeight']
        }
        lineHeight: {
            [key in ButtonV2Size]: CSSObject['lineHeight']
        }
    }
}>

export type ResponsiveButtonV2Tokens = {
    [key in keyof BreakpointType]: ButtonV2TokensType
}

export const getButtonV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveButtonV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getButtonV2DarkTokens(foundationToken)
    }

    return getButtonV2LightTokens(foundationToken)
}
