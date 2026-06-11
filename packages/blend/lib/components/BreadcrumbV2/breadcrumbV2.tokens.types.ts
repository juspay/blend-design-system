import type { CSSObject } from 'styled-components'
import { type BreakpointType } from '../../breakpoints/breakPoints'

export type BreadcrumbV2State = 'default' | 'hover' | 'active'
export type BreadcrumbV2TokensType = {
    gap: CSSObject['gap']

    item: {
        padding: CSSObject['padding']
        gap: CSSObject['gap']

        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: {
                [key in BreadcrumbV2State]: CSSObject['color']
            }
        }
    }
    ellipsis: {
        color: CSSObject['color']
        borderRadius: CSSObject['borderRadius']
        size: number
    }
    separator: {
        color: CSSObject['color']
    }
}

export type ResponsiveBreadcrumbV2Tokens = {
    [key in keyof BreakpointType]: BreadcrumbV2TokensType
}
