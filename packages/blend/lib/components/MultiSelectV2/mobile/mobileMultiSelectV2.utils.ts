import type { VirtualListItem } from '../../VirtualList/types'
import type {
    FlattenedMultiSelectV2Item,
    MultiSelectV2GroupType,
} from '../multiSelectV2.types'

export type FlattenedMobileMultiSelectV2Item = Omit<
    FlattenedMultiSelectV2Item,
    'type'
> & {
    type: FlattenedMultiSelectV2Item['type'] | 'selectAll'
}

export const flattenMobileMultiSelectV2Groups = (
    groups: MultiSelectV2GroupType[],
    enableSelectAll: boolean
): FlattenedMobileMultiSelectV2Item[] => {
    const flattened: FlattenedMobileMultiSelectV2Item[] = []
    let idCounter = 0

    if (enableSelectAll) {
        flattened.push({
            id: 'select-all',
            type: 'selectAll',
        })
    }

    groups.forEach((group, groupId) => {
        if (group.groupLabel) {
            flattened.push({
                id: `label-${groupId}`,
                type: 'label',
                label: group.groupLabel,
                groupId,
            })
        }

        group.items.forEach((item) => {
            flattened.push({
                id: `item-${idCounter++}`,
                type: 'item',
                item,
                groupId,
            })
        })

        if (groupId !== groups.length - 1 && group.showSeparator) {
            flattened.push({
                id: `separator-${groupId}`,
                type: 'separator',
                groupId,
            })
        }
    })

    return flattened
}

export const isSelectableItem = (
    value: string,
    groups: MultiSelectV2GroupType[]
) =>
    groups.some((group) =>
        group.items.some(
            (item) =>
                item.value === value && !item.disabled && !item.alwaysSelected
        )
    )

export const toVirtualListItems = (
    items: FlattenedMobileMultiSelectV2Item[]
): VirtualListItem[] => items as unknown as VirtualListItem[]
