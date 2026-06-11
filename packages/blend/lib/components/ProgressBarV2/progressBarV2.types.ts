import type { HTMLAttributes } from 'react'
import {
    ProgressBarV2Size,
    ProgressBarV2Variant,
    ProgressBarV2Appearance,
    type ProgressBarV2TokenType,
} from './progressBarV2.tokens.types'

// Re-exported for backward compatibility: these enums were previously declared
// here and are part of the public API.
export {
    ProgressBarV2Size,
    ProgressBarV2Variant,
    ProgressBarV2Appearance,
} from './progressBarV2.tokens.types'

export type ProgressBarV2Props = {
    value: number
    size?: ProgressBarV2Size
    variant?: ProgressBarV2Variant
    appearance?: ProgressBarV2Appearance
    showLabel?: boolean
    min?: number
    max?: number
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'style'>

export type ProgressBarV2InternalProps = {
    value: number
    min: number
    max: number
    ariaLabel?: string
    ariaLabelledby?: string
    showLabel: boolean
    tokens: ProgressBarV2TokenType
}
export type CircularProgressBarV2Props = ProgressBarV2InternalProps & {
    size: ProgressBarV2Size
    appearance: ProgressBarV2Appearance
}
export type LinearProgressBarV2Props = ProgressBarV2InternalProps & {
    size: ProgressBarV2Size
    appearance: ProgressBarV2Appearance
}
