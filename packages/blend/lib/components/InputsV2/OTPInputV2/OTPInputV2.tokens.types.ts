import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../../breakpoints/breakPoints'
import type {
    InputFooterV2Tokens,
    InputLabelsV2Tokens,
} from '../inputV2.tokens'
import type { InputStateV2 } from '../inputV2.types'

export type OTPInputV2TokensType = {
    gap: CSSObject['gap']
    topContainer: InputLabelsV2Tokens
    inputContainer: {
        gap: CSSObject['gap']
        input: {
            height: CSSObject['height']
            width: CSSObject['width']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: {
                [key in InputStateV2]: CSSObject['color']
            }
            borderRadius: CSSObject['borderRadius']
            border: {
                [key in InputStateV2]: CSSObject['border']
            }
            backgroundColor: {
                [key in InputStateV2]: CSSObject['backgroundColor']
            }
        }
    }
    bottomContainer: InputFooterV2Tokens
}

export type ResponsiveOTPInputV2Tokens = {
    [key in keyof BreakpointType]: OTPInputV2TokensType
}
