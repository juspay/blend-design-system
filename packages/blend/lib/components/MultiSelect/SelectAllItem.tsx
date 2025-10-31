import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../tokens'
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
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectTokensType>('MULTI_SELECT')

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
                data-button-for="selectAll"
                padding={FOUNDATION_THEME.unit[8]}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderRadius={4}
                outline="none"
                color={
                    disabled
                        ? multiSelectTokens.menu.item.optionsLabel.color
                              .disabled
                        : selected.length === availableValues.length
                          ? multiSelectTokens.menu.item.optionsLabel.color
                                .selected
                          : multiSelectTokens.menu.item.optionsLabel.color
                                .default
                }
                backgroundColor={
                    multiSelectTokens.menu.item.backgroundColor.default
                }
                cursor={disabled ? 'not-allowed' : 'pointer'}
                style={{ userSelect: 'none' }}
                onClick={handleClick}
            >
                <PrimitiveText
                    data-button-text={selectAllText}
                    fontSize={multiSelectTokens.menu.item.optionsLabel.fontSize}
                    fontWeight={
                        multiSelectTokens.menu.item.optionsLabel.fontWeight
                    }
                    color={
                        disabled
                            ? multiSelectTokens.menu.item.optionsLabel.color
                                  .disabled
                            : selected.length === availableValues.length
                              ? multiSelectTokens.menu.item.optionsLabel.color
                                    .selected
                              : multiSelectTokens.menu.item.optionsLabel.color
                                    .default
                    }
                    textTransform="uppercase"
                    truncate
                >
                    {selectAllText}
                </PrimitiveText>
                <Checkbox
                    data-checkbox-value={selectAllText}
                    data-selected-checkbox={allSelected}
                    data-checkbox-status={disabled ? 'disabled' : 'enabled'}
                    checked={getCheckboxState()}
                    disabled={disabled}
                />
            </Block>
        </RadixMenu.Item>
    )
}

export default SelectAllItem
