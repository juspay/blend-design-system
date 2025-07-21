import progressBarTokens from './progressbar.tokens'
import { ProgressBarSize, ProgressBarVariant } from './types'
import type { CSSObject } from 'styled-components'

export const getProgressBarStyles = (size: ProgressBarSize): CSSObject => {
    return {
        height: progressBarTokens.height[size],
        borderRadius: progressBarTokens.container.borderRadius,
        overflow: progressBarTokens.container.overflow as 'hidden',
    }
}

export const getProgressBarFillStyles = (
    variant: ProgressBarVariant
): CSSObject => {
    const fillStyles =
        variant === ProgressBarVariant.SOLID
            ? progressBarTokens.fill.solid
            : progressBarTokens.fill.segmented

    return {
        height: '100%',
        transition: progressBarTokens.transition,
        backgroundColor: fillStyles.backgroundColor,
        borderRadius: fillStyles.borderRadius,
    }
}

export const getProgressBarEmptyStyles = (
    variant: ProgressBarVariant
): CSSObject => {
    const emptyStyles =
        variant === ProgressBarVariant.SOLID
            ? progressBarTokens.empty.solid
            : progressBarTokens.empty.segmented

    return {
        height: '100%',
        ...emptyStyles,
    }
}

export const getProgressBarLabelStyles = (): CSSObject => {
    return {
        fontSize: progressBarTokens.label.fontSize,
        fontWeight: progressBarTokens.label.fontWeight,
        color: progressBarTokens.label.color,
    }
}

export const clampValue = (value: number): number => {
    return Math.max(0, Math.min(100, value))
}
