import type { CSSObject } from 'styled-components'
import type { InputSizeV2, InputStateV2 } from '../inputV2.types'
import type { BreakpointType } from '../../../breakpoints/breakPoints'
import { Theme } from '../../../context/theme.enum'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { getMultiValueInputV2DarkTokens } from './MultiValueInputV2.dark.tokens'
import { getMultiValueInputV2LightTokens } from './MultiValueInputV2.light.tokens'
import type {
    InputFooterV2Tokens,
    InputLabelsV2Tokens,
} from '../inputV2.tokens'

export type MultiValueInputV2TokensType = {
    gap: CSSObject['gap']
    borderRadius: CSSObject['borderRadius']
    topContainer: InputLabelsV2Tokens
    inputContainer: {
        offSet: number
        fontSize: {
            [key in InputSizeV2]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in InputSizeV2]: CSSObject['fontWeight']
        }
        gap: CSSObject['gap']
        borderRadius?: CSSObject['borderRadius']
        boxShadow: {
            [key in InputStateV2]: CSSObject['boxShadow']
        }
        paddingTop: { [key in InputSizeV2]: CSSObject['paddingTop'] }
        paddingRight: { [key in InputSizeV2]: CSSObject['paddingRight'] }
        paddingBottom: { [key in InputSizeV2]: CSSObject['paddingBottom'] }
        paddingLeft: { [key in InputSizeV2]: CSSObject['paddingLeft'] }
        border: {
            [key in InputStateV2]: CSSObject['border']
        }
        color: {
            [key in InputStateV2]: CSSObject['color']
        }
        placeholderColor: {
            default: CSSObject['color']
            focus: CSSObject['color']
            hover: CSSObject['color']
            error: CSSObject['color']
            disabled: CSSObject['color']
        }
        backgroundColor: {
            [key in InputStateV2]: CSSObject['backgroundColor']
        }
        closeButton: {
            width: CSSObject['width']
        }
        leftSlot: {
            width: CSSObject['width']
            height: CSSObject['height']
        }
        rightSlot: {
            width: CSSObject['width']
            height: CSSObject['height']
        }
        /** Vertical alignment for slot row vs tags (`top` / `marginTop` in layout) */
        slotAlignTop: {
            withTags: CSSObject['top']
            withoutTags: CSSObject['top']
        }
    }
    bottomContainer: InputFooterV2Tokens
}

export type ResponsiveMultiValueInputV2Tokens = {
    [key in keyof BreakpointType]: MultiValueInputV2TokensType
}

export const getMultiValueInputV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveMultiValueInputV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getMultiValueInputV2DarkTokens(foundationToken)
    }
    return getMultiValueInputV2LightTokens(foundationToken)
}
