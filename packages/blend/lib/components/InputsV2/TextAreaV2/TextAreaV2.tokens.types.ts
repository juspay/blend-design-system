import type { CSSObject } from 'styled-components'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { InputFooterV2Tokens, InputLabelsV2Tokens } from '../inputV2.tokens'
import { InputStateV2, InputSizeV2 } from '../inputV2.types'

export type TextAreaV2TokensType = {
    gap: CSSObject['gap']
    topContainer: InputLabelsV2Tokens
    inputContainer: {
        gap: CSSObject['gap']
        placeholder: {
            transition: CSSObject['transition']
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
        lineHeight: {
            [key in InputSizeV2]: CSSObject['lineHeight']
        }
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
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
    }
    bottomContainer: InputFooterV2Tokens
}

export type ResponsiveTextAreaV2Tokens = {
    [key in keyof BreakpointType]: TextAreaV2TokensType
}
