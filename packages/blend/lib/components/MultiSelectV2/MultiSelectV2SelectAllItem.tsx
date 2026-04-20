import type { MouseEvent } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { Checkbox } from '../Checkbox'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'
import { getSelectAllState } from './utils'

type MultiSelectV2SelectAllItemProps = {
    selected: string[]
    availableValues: string[]
    onSelectAll: (selectAll: boolean) => void
    selectAllText: string
    disabled?: boolean
}

const MultiSelectV2SelectAllItem = ({
    selected,
    availableValues,
    onSelectAll,
    selectAllText,
    disabled,
}: MultiSelectV2SelectAllItemProps) => {
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectV2TokensType>('MULTI_SELECT_V2')
    const { allSelected, someSelected } = getSelectAllState(
        selected,
        availableValues
    )

    const handleClick = (e: MouseEvent) => {
        if (disabled) return
        e.preventDefault()
        e.stopPropagation()
        onSelectAll(!allSelected)
    }

    const checkboxState = allSelected
        ? true
        : someSelected
          ? 'indeterminate'
          : false

    return (
        <RadixMenu.Item asChild data-disabled={disabled}>
            <Block
                data-element="selectAll-checkbox"
                style={{
                    paddingTop: multiSelectTokens.menu.selectAll?.paddingTop,
                    paddingRight:
                        multiSelectTokens.menu.selectAll?.paddingRight,
                    paddingBottom:
                        multiSelectTokens.menu.selectAll?.paddingBottom,
                    paddingLeft: multiSelectTokens.menu.selectAll?.paddingLeft,
                    userSelect: 'none',
                }}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderRadius={multiSelectTokens.menu.selectAll?.borderRadius}
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
                onClick={handleClick}
            >
                <PrimitiveText
                    data-id={selectAllText || 'selectAll-checkbox'}
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
                    data-id={selectAllText || 'checkbox'}
                    data-state={checkboxState ? 'selected' : 'not selected'}
                    checked={checkboxState}
                    disabled={disabled}
                />
            </Block>
        </RadixMenu.Item>
    )
}

export default MultiSelectV2SelectAllItem
