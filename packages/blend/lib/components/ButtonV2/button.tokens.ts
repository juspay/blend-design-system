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

export type ButtonTokensType = Readonly<{
    gap: CSSObject['gap']
    slotMaxHeight: {
        [key in ButtonSize]: CSSObject['maxHeight']
    }
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
    [key in keyof BreakpointType]: ButtonTokensType
}

export const getButtonV2Tokens = (
    foundationToken: FoundationTokenType
): ResponsiveButtonV2Tokens => {
    const tokens = getButtonV2LightTokens(foundationToken)

    return {
        sm: tokens,
        md: tokens,
        lg: tokens,
    } as ResponsiveButtonV2Tokens
}
