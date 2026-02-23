import type { CSSObject } from 'styled-components'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { getBreadcrumbV2LightTokens } from './breadcrumbV2.light.tokens'
import { Theme } from '../../context/theme.enum'
import { getBreadcrumbV2DarkTokens } from './breadcrumbV2.dark.tokens'

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
}

export type ResponsiveBreadcrumbV2Tokens = {
    [key in keyof BreakpointType]: BreadcrumbV2TokensType
}

export const getBreadcrumbV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveBreadcrumbV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getBreadcrumbV2DarkTokens(foundationToken)
    }

    return getBreadcrumbV2LightTokens(foundationToken)
}
