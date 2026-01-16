import type { CSSObject } from 'styled-components'
import {
    ButtonSize,
    ButtonState,
    ButtonSubType,
    ButtonType,
} from './buttonV2.types'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { getButtonV2LightTokens } from './buttonV2.light.tokens'
import { Theme } from '../../context/theme.enum'
import { getButtonV2DarkTokens } from './buttonV2.dark.tokens'

export type ButtonV2TokensType = Readonly<{
    gap: CSSObject['gap']
    backgroundColor: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['background']
            }
        }
    }
    borderRadius: {
        [key in ButtonSize]: {
            [key in ButtonType]: {
                [key in ButtonSubType]: {
                    [key in ButtonState]: CSSObject['borderRadius']
                }
            }
        }
    }
    padding: {
        [key in ButtonSize]: {
            [key in ButtonType]: {
                [key in ButtonSubType]: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
            }
        }
    }
    border: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['border']
            }
        }
    }
    shadow: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['boxShadow']
            }
        }
    }
    outline: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['outline']
            }
        }
    }
    text: {
        color: {
            [key in ButtonType]: {
                [key in ButtonSubType]: {
                    [key in ButtonState]: CSSObject['color']
                }
            }
        }
        fontSize: {
            [key in ButtonSize]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in ButtonSize]: CSSObject['fontWeight']
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
    console.log('theme', theme)
    if (theme === Theme.DARK || theme === 'dark') {
        debugger
        return getButtonV2DarkTokens(foundationToken)
    }

    return getButtonV2LightTokens(foundationToken)
}
