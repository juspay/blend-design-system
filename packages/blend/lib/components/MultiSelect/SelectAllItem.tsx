import { useComponentToken } from '../../context/useComponentToken'
import { Checkbox } from '../Checkbox'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { type MultiSelectTokensType } from './multiSelect.tokens'
import { getSelectAllState } from './utils'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'

const SelectAllItem = ({
    selected,
    availableValues,
    onSelectAll,
    selectAllText,
    disabled,
}: {
    selected: string[]
    availableValues: string[]
    onSelectAll: (selectAll: boolean) => void
    selectAllText: string
    disabled?: boolean
}) => {
    const multiSelectTokens = useComponentToken(
        'MULTI_SELECT'
    ) as MultiSelectTokensType

    const { allSelected, someSelected } = getSelectAllState(
        selected,
        availableValues
    )

    const handleClick = (e: React.MouseEvent) => {
        if (disabled) return
        e.preventDefault()
        e.stopPropagation()
        onSelectAll(!allSelected)
    }

    const getCheckboxState = () => {
        if (allSelected) return true
        if (someSelected) return 'indeterminate'
        return false
    }

    return (
        <RadixMenu.Item asChild data-disabled={disabled}>
            <Block
                margin="0px 6px"
                padding="12px 6px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderRadius={4}
                outline="none"
                color={
                    disabled
                        ? multiSelectTokens.dropdown.item.label.color.disabled
                        : selected.length === availableValues.length
                          ? multiSelectTokens.dropdown.item.label.color.selected
                          : multiSelectTokens.dropdown.item.label.color.default
                }
                backgroundColor={
                    multiSelectTokens.dropdown.item.backgroundColor.default
                }
                cursor={disabled ? 'not-allowed' : 'pointer'}
                style={{ userSelect: 'none' }}
                onClick={handleClick}
            >
                <PrimitiveText
                    fontSize={multiSelectTokens.dropdown.item.label.fontSize}
                    fontWeight={
                        multiSelectTokens.dropdown.item.label.fontWeight
                    }
                    color={
                        disabled
                            ? multiSelectTokens.dropdown.item.label.color
                                  .disabled
                            : selected.length === availableValues.length
                              ? multiSelectTokens.dropdown.item.label.color
                                    .selected
                              : multiSelectTokens.dropdown.item.label.color
                                    .default
                    }
                    truncate
                >
                    {selectAllText}
                </PrimitiveText>
                <Checkbox checked={getCheckboxState()} disabled={disabled} />
            </Block>
        </RadixMenu.Item>
    )
}

export default SelectAllItem
