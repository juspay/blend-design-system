import { type MultiSelectMenuItemType } from './types'
import MultiSelectSubMenu from './MultiSelectSubMenu'
import { type MultiSelectTokensType } from './multiSelect.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import SelectItem, { SelectItemType } from '../Select/SelectItem'

const MultiSelectMenuItem = ({
    item,
    onSelect,
    selected,
}: {
    item: MultiSelectMenuItemType
    onSelect: (value: string) => void
    selected: string[]
}) => {
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectTokensType>('MULTI_SELECT')

    if (item.subMenu) {
        return (
            <MultiSelectSubMenu
                item={item}
                onSelect={onSelect}
                selected={selected}
            />
        )
    }

    return (
        <SelectItem
            item={item}
            onSelect={onSelect}
            selected={selected}
            type={SelectItemType.MULTI}
            tokens={multiSelectTokens}
            showCheckmark={true}
        />
    )
}

MultiSelectMenuItem.displayName = 'MultiSelectMenuItem'

export default MultiSelectMenuItem
