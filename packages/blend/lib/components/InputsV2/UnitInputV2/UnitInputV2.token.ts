import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import {
    FloatingLabelsV2Tokens,
    InputFooterV2Tokens,
    InputLabelsV2Tokens,
} from '../inputV2.tokens'
import { Theme } from '../../../context/theme.enum'
import { getUnitInputV2LightTokens } from './UnitInputV2.light.token'
import { getUnitInputV2DarkTokens } from './UnitInputV2.dark.tokens'

export type UnitInputV2TokensType = {
    gap: CSSObject['gap']
    topContainer: InputLabelsV2Tokens
    floatingLabels: FloatingLabelsV2Tokens
    inputContainer: {
        placeholderColor: CSSObject['color']
        lineHeight: CSSObject['lineHeight']
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
        backgroundColor: {
            [key in InputStateV2]: CSSObject['backgroundColor']
        }
        unit: {
            fontSize: {
                [key in InputSizeV2]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in InputSizeV2]: CSSObject['fontWeight']
            }
            color: {
                [key in InputStateV2]: CSSObject['color']
            }
            padding: {
                [key in InputSizeV2]: CSSObject['padding']
            }
            backgroundColor: {
                [key in InputStateV2]: CSSObject['backgroundColor']
            }
        }
    }
    bottomContainer: InputFooterV2Tokens
}

export type ResponsiveUnitInputV2Tokens = {
    [key in keyof BreakpointType]: UnitInputV2TokensType
}

export const getUnitInputV2Tokens = (
    foundationTokens: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveUnitInputV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getUnitInputV2DarkTokens(foundationTokens)
    }
    return getUnitInputV2LightTokens(foundationTokens)
}
