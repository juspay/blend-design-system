import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type ButtonGroupTokensType = {
    gap: {
        default: CSSObject['gap'] // non-stacked
        stacked: CSSObject['gap']
    }
    separator: {
        width: CSSObject['borderWidth']
        color: CSSObject['borderColor']
    }
}

export type ResponsiveButtonGroupTokens = {
    [key in keyof BreakpointType]: ButtonGroupTokensType
}
