import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import type { InputSizeV2, InputStateV2 } from '../inputV2.types'
import { InputFooterV2Tokens, InputLabelsV2Tokens } from '../inputV2.tokens'
import { Theme } from '../../../context/theme.enum'
import { getDropdownInputV2DarkTokens } from './DropdownInputV2.dark.tokens'
import { getDropdownInputV2LightTokens } from './DropdownInputV2.light.tokens'

export type DropdownInputV2TokensType = {
    gap: CSSObject['gap']
    topContainer: InputLabelsV2Tokens
    inputContainer: {
        gap: CSSObject['gap']
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        color: {
            [key in InputStateV2]: CSSObject['color']
        }

        borderRadius?: {
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

        backgroundColor: {
            [key in InputStateV2]: CSSObject['backgroundColor']
        }
    }
    bottomContainer: InputFooterV2Tokens
}

export type ResponsiveDropdownInputV2Tokens = {
    [key in keyof BreakpointType]: DropdownInputV2TokensType
}
export const getDropdownInputV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveDropdownInputV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getDropdownInputV2DarkTokens(foundationToken)
    }
    return getDropdownInputV2LightTokens(foundationToken)
}
