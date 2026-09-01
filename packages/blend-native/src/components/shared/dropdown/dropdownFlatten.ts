import type { DropdownFlatRow, DropdownItemAdapter } from './dropdown.types'

/**
 * Flatten groups into a row list for rendering / virtualization.
 *
 * Emits `label` rows for group labels, `item` rows for items, and
 * `separator` rows between groups that have `showSeparator` set. Mirrors
 * web's `flattenMenuV2Groups` / `flattenMenuGroups`.
 */
export function flattenGroups<TItem>(
    groups: Array<{
        label?: string
        items: DropdownItemAdapter<TItem>[]
        showSeparator?: boolean
    }>
): DropdownFlatRow<TItem>[] {
    const flattened: DropdownFlatRow<TItem>[] = []
    let idCounter = 0

    groups.forEach((group, groupId) => {
        if (group.label) {
            flattened.push({
                id: `label-${groupId}`,
                type: 'label',
                label: group.label,
                groupId,
            })
        }

        group.items.forEach((item) => {
            flattened.push({
                id: item.id || `item-${idCounter++}`,
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
