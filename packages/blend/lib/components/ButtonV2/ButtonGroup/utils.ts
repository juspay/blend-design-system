import type { ButtonGroupPosition } from './types'
import { getGroupPosition, getGroupGap } from '../../Primitives/Group'

export function getButtonGroupPosition(
    index: number,
    totalCount: number
): ButtonGroupPosition | undefined {
    return getGroupPosition(index, totalCount, 'horizontal') as
        | ButtonGroupPosition
        | undefined
}

export function getButtonGroupGap(
    stacked: boolean,
    providedGap?: string | number
): string | number {
    return getGroupGap(stacked, providedGap, 'horizontal')
}
