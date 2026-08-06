import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type SkeletonVariant = 'pulse' | 'wave' | 'shimmer'
export type SkeletonShape = 'rectangle' | 'circle' | 'rounded'

export type SkeletonTokensType = {
    animation: {
        duration: CSSObject['animationDuration']
        timingFunction: CSSObject['animationTimingFunction']
        iterationCount: CSSObject['animationIterationCount']
        direction: CSSObject['animationDirection']
    }
    colors: {
        base: CSSObject['backgroundColor']
        highlight: CSSObject['backgroundColor']
        shimmer: CSSObject['backgroundColor']
    }
    borderRadius: {
        rectangle: CSSObject['borderRadius']
        rounded: CSSObject['borderRadius']
        circle: CSSObject['borderRadius']
    }
    spacing: {
        gap: CSSObject['gap']
        margin: CSSObject['margin']
    }
    sizes: {
        text: {
            height: CSSObject['height']
            minWidth: CSSObject['minWidth']
        }
        avatar: {
            sm: CSSObject['width']
            md: CSSObject['width']
            lg: CSSObject['width']
        }
        button: {
            sm: {
                height: CSSObject['height']
                minWidth: CSSObject['minWidth']
            }
            md: {
                height: CSSObject['height']
                minWidth: CSSObject['minWidth']
            }
            lg: {
                height: CSSObject['height']
                minWidth: CSSObject['minWidth']
            }
        }
    }
}

export type ResponsiveSkeletonTokens = {
    [key in keyof BreakpointType]: SkeletonTokensType
}
