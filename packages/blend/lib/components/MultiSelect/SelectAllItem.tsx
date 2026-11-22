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
    dataIdText,
    disabled,
}: {
    selected: string[]
    availableValues: string[]
    onSelectAll: (selectAll: boolean) => void
    selectAllText: string
    /**
     * Value for the `data-id` hooks only: the consumer's raw `selectAllText`,
     * else the catalog's English default. Kept separate from the displayed
     * (possibly translated) text so selectors stay stable across locales.
     */
    dataIdText?: string
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
                data-element="selectAll-checkbox"
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
                    data-id={
                        (dataIdText ?? selectAllText) || 'selectAll-checkbox'
                    }
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
                    data-status={disabled ? 'disabled' : 'enabled'}
                    data-element="checkbox"
                    data-id={(dataIdText ?? selectAllText) || 'checkbox'}
                    data-state={
                        getCheckboxState() ? 'selected' : 'not selected'
                    }
                    checked={getCheckboxState()}
                    disabled={disabled}
                />
            </Block>
        </RadixMenu.Item>
    )
}

export default SelectAllItem
