import type { DiffGapExpansionState } from './types'

export const getGapLineTotal = (start: number, end: number): number =>
    end - start + 1

export const getGapHiddenLineCount = (
    start: number,
    end: number,
    state: DiffGapExpansionState | undefined
): number => {
    const total = getGapLineTotal(start, end)
    const top = state?.revealedFromTop ?? 0
    const bottom = state?.revealedFromBottom ?? 0
    return Math.max(0, total - top - bottom)
}

export const isGapFullyExpanded = (
    start: number,
    end: number,
    state: DiffGapExpansionState | undefined
): boolean => {
    const total = getGapLineTotal(start, end)
    const top = state?.revealedFromTop ?? 0
    const bottom = state?.revealedFromBottom ?? 0
    return top + bottom >= total
}
