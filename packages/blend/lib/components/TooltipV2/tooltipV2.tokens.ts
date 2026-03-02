import { type CSSObject } from 'styled-components'
import { TooltipV2Size } from './tooltipV2.types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getTooltipV2LightTokens } from './tooltipV2.light.tokens'
import { getTooltipV2DarkTokens } from './tooltipV2.dark.tokens'

export type TooltipV2TokensType = {
    // Pattern: background (size-independent)
    background: CSSObject['backgroundColor']
    // Pattern: borderRadius.[size]
    borderRadius: {
        [key in TooltipV2Size]: CSSObject['borderRadius']
    }
    // Pattern: maxWidth.[size]
    maxWidth: {
        [key in TooltipV2Size]: CSSObject['maxWidth']
    }
    // Pattern: padding.[size]
    padding: {
        [key in TooltipV2Size]: CSSObject['padding']
    }

    // Pattern: gap.[size]
    gap: {
        [key in TooltipV2Size]: CSSObject['gap']
    }
    // Pattern: text.color (size-independent) text.fontWeight.[size] text.fontSize.[size] text.lineHeight.[size]
    text: {
        // Pattern: text.color (size-independent)
        color: CSSObject['color']
        // Pattern: text.fontWeight.[size]
        fontWeight: {
            [key in TooltipV2Size]: CSSObject['fontWeight']
        }
        // Pattern: text.fontSize.[size]
        fontSize: {
            [key in TooltipV2Size]: CSSObject['fontSize']
        }
        // Pattern: text.lineHeight.[size]
        lineHeight: {
            [key in TooltipV2Size]: CSSObject['lineHeight']
        }
    }
}

export type ResponsiveTooltipV2Tokens = {
    [key in keyof BreakpointType]: TooltipV2TokensType
}

export const getTooltipV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTooltipV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTooltipV2DarkTokens(foundationToken)
    }

    return getTooltipV2LightTokens(foundationToken)
}
