import { CSSObject } from 'styled-components'
import { TooltipSize } from './types'
import { VariantType } from '../Text/Text'
import { FoundationTokenType } from '../../tokens/theme.token'
export type TooltipTokensType = {
    background: CSSObject['backgroundColor']
    color: CSSObject['color']
    fontWeight: {
        [key in TooltipSize]: CSSObject['fontWeight']
    }
    borderRadius: {
        [key in TooltipSize]: CSSObject['borderRadius']
    }
    maxWidth: {
        [key in TooltipSize]: CSSObject['maxWidth']
    }
    padding: {
        [key in TooltipSize]: CSSObject['padding']
    }
    fontSize: {
        [key in TooltipSize]: VariantType
    }
    gap: {
        [key in TooltipSize]: CSSObject['gap']
    }
}
declare const tooltipTokens: TooltipTokensType
export declare const getTooltipTokens: (
    foundationToken: FoundationTokenType
) => TooltipTokensType
export default tooltipTokens
