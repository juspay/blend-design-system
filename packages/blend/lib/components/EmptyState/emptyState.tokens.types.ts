import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type EmptyStateSize = 'sm' | 'md' | 'lg'

export type EmptyStateSizeTokens = {
    layout: {
        minHeight: CSSObject['minHeight']
        maxWidth: CSSObject['maxWidth']
        padding: CSSObject['padding']
        gap: CSSObject['gap']
        contentGap: CSSObject['gap']
        actionGap: CSSObject['gap']
    }
    title: {
        fontSize: CSSObject['fontSize']
        lineHeight: CSSObject['lineHeight']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    description: {
        fontSize: CSSObject['fontSize']
        lineHeight: CSSObject['lineHeight']
        color: CSSObject['color']
    }
}

export type EmptyStateTokensType = Record<EmptyStateSize, EmptyStateSizeTokens>

export type ResponsiveEmptyStateTokens = {
    [key in keyof BreakpointType]: EmptyStateTokensType
}
