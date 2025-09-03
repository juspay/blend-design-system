import { type MultiSelectMenuItemType } from './types'
import MultiSelectSubMenu from './MultiSelectSubMenu'
import SelectItem, { SelectItemType } from '../Select/SelectItem'

const MultiSelectMenuItem = ({
    item,
    onSelect,
    selected,
    maxSelections,
    allItems,
}: {
    item: MultiSelectMenuItemType
    onSelect: (value: string) => void
    selected: string[]
    maxSelections?: number
    allItems?: MultiSelectMenuItemType[]
}) => {
    const isSelected = selected.includes(item.value)
    const isMaxReached =
        maxSelections !== undefined &&
        selected.length >= maxSelections &&
        !isSelected
    const isItemDisabled = item.disabled || isMaxReached

    const getSelectedPosition = ():
        | 'first'
        | 'middle'
        | 'last'
        | 'only'
        | 'none' => {
        if (!isSelected || !allItems) return 'none'

        const selectedItems = allItems.filter((listItem) =>
            selected.includes(listItem.value)
        )

        if (selectedItems.length === 1) return 'only'

        const currentIndex = selectedItems.findIndex(
            (selectedItem) => selectedItem.value === item.value
        )

        if (currentIndex === 0) return 'first'
        if (currentIndex === selectedItems.length - 1) return 'last'
        return 'middle'
    }

    if (item.subMenu) {
        return (
            <MultiSelectSubMenu
                item={item}
                onSelect={onSelect}
                selected={selected}
                maxSelections={maxSelections}
            />
        )
    }

    return (
        <SelectItem
            item={{
                ...item,
                disabled: isItemDisabled,
            }}
            onSelect={onSelect}
            selected={selected}
            type={SelectItemType.MULTI}
            showCheckmark={true}
            selectedPosition={getSelectedPosition()}
        />
    )
}

MultiSelectMenuItem.displayName = 'MultiSelectMenuItem'

export default MultiSelectMenuItem
