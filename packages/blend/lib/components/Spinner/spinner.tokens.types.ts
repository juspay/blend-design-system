import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type SpinnerSize = 'sm' | 'md' | 'lg'
export type SpinnerColor = 'default' | 'primary' | 'inverse'

export type SpinnerTokensType = {
    size: Record<SpinnerSize, CSSObject['width']>
    strokeWidth: Record<SpinnerSize, number>
    colors: Record<SpinnerColor, CSSObject['color']>
    trackColor: CSSObject['color']
    animation: {
        duration: string
    }
    overlay: {
        backgroundColor: CSSObject['backgroundColor']
        zIndex: CSSObject['zIndex']
    }
}

export type ResponsiveSpinnerTokens = {
    [key in keyof BreakpointType]: SpinnerTokensType
}
