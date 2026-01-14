import type { ButtonGroupPosition } from './types'
import { getGroupPosition, getGroupGap } from '../../Primitives/Group'
import { GroupOrientation } from '../../Primitives/Group/types'

export function getButtonGroupPosition(
    index: number,
    totalCount: number
): ButtonGroupPosition | undefined {
    return getGroupPosition(index, totalCount, GroupOrientation.HORIZONTAL) as
        | ButtonGroupPosition
        | undefined
}

export function getButtonGroupGap(
    stacked: boolean,
    providedGap?: string | number
): string | number {
    return getGroupGap(stacked, providedGap, GroupOrientation.HORIZONTAL)
}
