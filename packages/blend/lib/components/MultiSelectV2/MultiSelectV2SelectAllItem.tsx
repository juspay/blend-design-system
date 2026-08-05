import type { KeyboardEvent, MouseEvent } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { Checkbox } from '../Checkbox'
import SelectItemIndicator from '../SelectV2/SelectItemIndicator'
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
    /**
     * Set false to render outside a Radix Menu.Root (e.g. an always-visible
     * list), where RadixMenu.Item has no menu context to attach to. The row
     * then carries its own checkbox role, tab stop and key handling.
     */
    asMenuItem?: boolean
}

const MultiSelectV2SelectAllItem = ({
    selected,
    availableValues,
    onSelectAll,
    selectAllText,
    disabled,
    asMenuItem = true,
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

    const handleKeyDown = (e: KeyboardEvent) => {
        if (disabled) return
        if (e.key !== 'Enter' && e.key !== ' ') return
        e.preventDefault()
        onSelectAll(!allSelected)
    }

    const checkboxState = allSelected
        ? true
        : someSelected
          ? 'indeterminate'
          : false

    const row = (
        <Block
            data-element="selectAll-checkbox"
            style={{
                paddingTop: multiSelectTokens.menu.selectAll?.paddingTop,
                paddingRight: multiSelectTokens.menu.selectAll?.paddingRight,
                paddingBottom: multiSelectTokens.menu.selectAll?.paddingBottom,
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
                    ? multiSelectTokens.menu.item.optionsLabel.color.disabled
                    : selected.length === availableValues.length
                      ? multiSelectTokens.menu.item.optionsLabel.color.selected
                      : multiSelectTokens.menu.item.optionsLabel.color.default
            }
            backgroundColor={
                multiSelectTokens.menu.item.backgroundColor.default
            }
            cursor={disabled ? 'not-allowed' : 'pointer'}
            onClick={handleClick}
            {...(!asMenuItem && {
                role: 'checkbox',
                'aria-checked':
                    checkboxState === 'indeterminate'
                        ? ('mixed' as const)
                        : checkboxState,
                'aria-disabled': disabled ? true : undefined,
                tabIndex: disabled ? -1 : 0,
                onKeyDown: handleKeyDown,
            })}
        >
            <PrimitiveText
                data-id={selectAllText || 'selectAll-checkbox'}
                fontSize={multiSelectTokens.menu.item.optionsLabel.fontSize}
                fontWeight={multiSelectTokens.menu.item.optionsLabel.fontWeight}
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

            {asMenuItem ? (
                <Checkbox
                    data-status={disabled ? 'disabled' : 'enabled'}
                    data-element="checkbox"
                    data-id={selectAllText || 'checkbox'}
                    data-state={checkboxState ? 'selected' : 'not selected'}
                    checked={checkboxState}
                    disabled={disabled}
                />
            ) : (
                // The row itself is the checkbox widget here, so the indicator
                // must not be a second focusable control inside it.
                <Block
                    data-status={disabled ? 'disabled' : 'enabled'}
                    data-element="checkbox"
                    data-id={selectAllText || 'checkbox'}
                    data-state={checkboxState ? 'selected' : 'not selected'}
                    display="flex"
                    alignItems="center"
                    flexShrink={0}
                >
                    <SelectItemIndicator
                        checked={checkboxState}
                        disabled={disabled}
                    />
                </Block>
            )}
        </Block>
    )

    if (!asMenuItem) return row

    return (
        <RadixMenu.Item asChild data-disabled={disabled}>
            {row}
        </RadixMenu.Item>
    )
}

export default MultiSelectV2SelectAllItem
