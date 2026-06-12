import { SelectItemV2 } from '../SelectV2'
import type { MultiSelectV2ItemType } from './multiSelectV2.types'
import MultiSelectV2SubMenu from './MultiSelectV2SubMenu'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'

type MultiSelectV2MenuItemProps = {
    item: MultiSelectV2ItemType
    onSelect: (value: string) => void
    selected: string[]
    maxSelections?: number
    allItems?: MultiSelectV2ItemType[]
    index?: number
}

const MultiSelectV2MenuItem = ({
    item,
    onSelect,
    selected,
    maxSelections,
    allItems,
    index = 0,
}: MultiSelectV2MenuItemProps) => {
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectV2TokensType>('MULTI_SELECT_V2')
    const isSelected = selected.includes(item.value)
    const isMaxReached =
        maxSelections !== undefined &&
        selected.length >= maxSelections &&
        !isSelected
    const isItemDisabled = item.disabled || isMaxReached || item.alwaysSelected

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
            <MultiSelectV2SubMenu
                item={item}
                onSelect={onSelect}
                selected={selected}
                maxSelections={maxSelections}
            />
        )
    }

    return (
        <SelectItemV2
            mode="multi"
            item={{ ...item, disabled: isItemDisabled }}
            selectedValues={selected}
            onSelect={onSelect}
            itemTokens={multiSelectTokens.menu.item}
            selectedPosition={getSelectedPosition()}
            index={index}
        />
    )
}

export default MultiSelectV2MenuItem
