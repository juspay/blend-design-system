import { type CSSObject } from 'styled-components'
import { TooltipSize } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

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
        [key in TooltipSize]: CSSObject['fontSize']
    }
    lineHeight: {
        [key in TooltipSize]: CSSObject['lineHeight']
    }
    gap: {
        [key in TooltipSize]: CSSObject['gap']
    }
}

export type ResponsiveTooltipTokens = {
    [key in keyof BreakpointType]: TooltipTokensType
}

export const getTooltipTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTooltipTokens => {
    return {
        sm: {
            fontWeight: {
                sm: foundationToken.font.weight[500],
                lg: foundationToken.font.weight[500],
            },
            background: foundationToken.colors.gray[900],
            color: foundationToken.colors.gray[0],
            borderRadius: {
                sm: foundationToken.border.radius[6],
                lg: foundationToken.border.radius[8],
            },
            maxWidth: {
                sm: '320px',
                lg: '384px',
            },
            padding: {
                sm: `${foundationToken.unit[4]} ${foundationToken.unit[6]}`,
                lg: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
            },
            fontSize: {
                sm: `${foundationToken.font.size.body.xs.fontSize}px`,
                lg: `${foundationToken.font.size.body.sm.fontSize}px`,
            },
            lineHeight: {
                sm: `${foundationToken.font.size.body.xs.lineHeight}px`,
                lg: `${foundationToken.font.size.body.sm.lineHeight}px`,
            },
            gap: {
                sm: foundationToken.unit[4],
                lg: foundationToken.unit[6],
            },
        },
        lg: {
            fontWeight: {
                sm: foundationToken.font.weight[500],
                lg: foundationToken.font.weight[500],
            },
            background: foundationToken.colors.gray[900],
            color: foundationToken.colors.gray[0],
            borderRadius: {
                sm: foundationToken.border.radius[6],
                lg: foundationToken.border.radius[8],
            },
            maxWidth: {
                sm: '320px',
                lg: '384px',
            },
            padding: {
                sm: `${foundationToken.unit[4]} ${foundationToken.unit[6]}`,
                lg: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
            },
            fontSize: {
                sm: `${foundationToken.font.size.body.xs.fontSize}px`,
                lg: `${foundationToken.font.size.body.sm.fontSize}px`,
            },
            lineHeight: {
                sm: `${foundationToken.font.size.body.xs.lineHeight}px`,
                lg: `${foundationToken.font.size.body.sm.lineHeight}px`,
            },
            gap: {
                sm: foundationToken.unit[4],
                lg: foundationToken.unit[6],
            },
        },
    }
}
