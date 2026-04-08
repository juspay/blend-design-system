import type { CSSObject } from 'styled-components'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { InputFooterV2Tokens, InputLabelsV2Tokens } from '../inputV2.tokens'
import { InputStateV2 } from '../inputV2.types'
import { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getTextAreaV2DarkTokens } from './TextAreaV2.dark.tokens'
import { getTextAreaV2LightTokens } from './TextAreaV2.light.tokens'

export type TextAreaTokensType = {
    gap: CSSObject['gap']
    topContainer: InputLabelsV2Tokens
    inputContainer: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        borderRadius: CSSObject['borderRadius']
        boxShadow: CSSObject['boxShadow']
        border: {
            [key in InputStateV2]: CSSObject['border']
        }
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
        backgroundColor: {
            [key in InputStateV2]: CSSObject['backgroundColor']
        }
        placeholder: {
            color: CSSObject['color']
            transition: CSSObject['transition']
            fontWeight: CSSObject['fontWeight']
        }
    }
    bottomContainer: InputFooterV2Tokens
}

export type ResponsiveTextAreaTokens = {
    [key in keyof BreakpointType]: TextAreaTokensType
}

export type ResponsiveTextAreaV2Tokens = ResponsiveTextAreaTokens

export const getTextAreaV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTextAreaTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTextAreaV2DarkTokens(foundationToken)
    }
    return getTextAreaV2LightTokens(foundationToken)
}
