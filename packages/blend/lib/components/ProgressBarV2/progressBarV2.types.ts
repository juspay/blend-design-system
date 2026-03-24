import { HTMLAttributes } from 'react'
import { ProgressBarV2TokenType } from './progressBarV2.tokens'

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

export type ProgressBarV2Props = {
    value: number
    size?: ProgressBarV2Size
    variant?: ProgressBarV2Variant
    appearance?: ProgressBarV2Appearance
    showLabel?: boolean
    min?: number
    max?: number
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>

export type ProgressBarV2InternalProps = {
    value: number
    min: number
    max: number
    ariaLabel?: string
    ariaLabelledby?: string
    showLabel: boolean
    tokens: ProgressBarV2TokenType
    ref?: React.Ref<HTMLDivElement>
}
