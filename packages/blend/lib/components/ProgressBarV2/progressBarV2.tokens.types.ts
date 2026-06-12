import { BreakpointType } from '../../breakpoints/breakPoints'
import type { CSSObject } from 'styled-components'

export enum ProgressBarV2Size {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

/** Bar geometry: horizontal track vs circular ring. */
export enum ProgressBarV2Variant {
    LINEAR = 'linear',
    CIRCULAR = 'circular',
}

/**
 * Fill / stroke style shared by linear and circular progress (continuous vs segmented).
 */
export enum ProgressBarV2Appearance {
    SOLID = 'solid',
    SEGMENTED = 'segmented',
}

export type ProgressBarV2TokenType = {
    linear: {
        height: {
            [key in ProgressBarV2Size]: CSSObject['height']
        }
        fill: {
            backgroundColor: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundColor']
            }
            borderRadius: {
                [key in ProgressBarV2Appearance]: CSSObject['borderRadius']
            }
        }
        empty: {
            backgroundColor: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundColor']
            }
            backgroundImage: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundImage']
            }
            backgroundSize: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundSize']
            }
        }
        borderRadius: {
            [key in ProgressBarV2Appearance]: CSSObject['borderRadius']
        }
        gap: CSSObject['gap']
    }
    circular: {
        size: {
            [key in ProgressBarV2Size]: CSSObject['width']
        }
        strokeWidth: {
            [key in ProgressBarV2Size]: number
        }
        stroke: {
            [key in ProgressBarV2Appearance]: CSSObject['stroke']
        }
        background: {
            [key in ProgressBarV2Appearance]: CSSObject['stroke']
        }
        dashArray: {
            [key in ProgressBarV2Appearance]: string
        }
        motion: string
    }
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    transition: string
}

export type ResponsiveProgressBarV2Tokens = {
    [key in keyof BreakpointType]: ProgressBarV2TokenType
}
