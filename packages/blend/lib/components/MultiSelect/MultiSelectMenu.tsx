import React, { useState } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../tokens'
import {
    MultiSelectMenuAlignment,
    type MultiSelectMenuGroupType,
    type MultiSelectMenuItemType,
    type MultiSelectMenuProps,
    MultiSelectMenuSide,
} from './types'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import MultiSelectMenuItem from './MultiSelectMenuItem'
import { type MultiSelectTokensType } from './multiSelect.tokens'
import { SearchInput } from '../Inputs'
import { filterMenuGroups, getAllAvailableValues } from './utils'
import SelectAllItem from './SelectAllItem'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Button from '../Button/Button'
import { ButtonType, ButtonSize } from '../Button/types'

const Content = styled(RadixMenu.Content)(() => ({
    position: 'relative',
    backgroundColor: FOUNDATION_THEME.colors.gray[0],
    borderRadius: FOUNDATION_THEME.border.radius[8],
    boxShadow: FOUNDATION_THEME.shadows.lg,
    zIndex: 9999,
    border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
}))

const StickyHeader = styled(Block)(() => ({
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: FOUNDATION_THEME.colors.gray[0],
}))

const ScrollableContent = styled(Block)(() => ({
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    flexGrow: 1,
    '&::-webkit-scrollbar': {
        display: 'none',
    },
}))

const FixedActionButtons = styled(Block)(() => ({
    borderTop: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
    padding: FOUNDATION_THEME.unit[16],
    display: 'flex',
    gap: FOUNDATION_THEME.unit[8],
    justifyContent: 'flex-end',
    margin: '0',
    backgroundColor: FOUNDATION_THEME.colors.gray[0],
    flexShrink: 0,
}))

const MultiSelectMenu = ({
    items,
    selected,
    onSelect,
    trigger,
    minWidth,
    maxWidth,
    maxHeight,
    disabled = false,
    enableSearch = true,
    searchPlaceholder = 'Search options...',
    enableSelectAll = false,
    selectAllText = 'Select All',
    onSelectAll,
    alignment = MultiSelectMenuAlignment.CENTER,
    side = MultiSelectMenuSide.BOTTOM,
    sideOffset = 8,
    alignOffset = 0,
    open,
    onOpenChange,
    showActionButtons = true,
    primaryAction = {
        text: 'Apply',
        onClick: () => {},
        disabled: false,
        loading: false,
    },
    secondaryAction,
}: MultiSelectMenuProps) => {
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectTokensType>('MULTI_SELECT')

    const [searchText, setSearchText] = useState('')
    const filteredItems = filterMenuGroups(items, searchText)
    const availableValues = getAllAvailableValues(filteredItems)

    const handleOpenChange = (newOpen: boolean) => {
        if (disabled) return

        if (!newOpen && enableSearch) {
            setSearchText('')
        }

        onOpenChange(newOpen)
    }

    return (
        <RadixMenu.Root
            modal={false}
            open={open && !disabled}
            onOpenChange={handleOpenChange}
        >
            <RadixMenu.Trigger asChild disabled={disabled}>
                {trigger}
            </RadixMenu.Trigger>
            <Content
                align={alignment}
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                side={side}
                style={{
                    minWidth: minWidth || 250,
                    width:
                        minWidth || maxWidth
                            ? 'auto'
                            : 'max(var(--radix-dropdown-menu-trigger-width), 250px)',
                    maxWidth: maxWidth || 400,
                    maxHeight: maxHeight || 400,
                }}
            >
                <StickyHeader>
                    {enableSearch && (
                        <Block>
                            <SearchInput
                                placeholder={searchPlaceholder}
                                value={searchText}
                                onChange={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setSearchText(e.target.value)
                                }}
                            />
                        </Block>
                    )}
                    {enableSelectAll &&
                        onSelectAll &&
                        availableValues.length > 0 && (
                            <Block
                                borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                marginBottom={FOUNDATION_THEME.unit[6]}
                            >
                                <SelectAllItem
                                    selected={selected}
                                    availableValues={availableValues}
                                    onSelectAll={onSelectAll}
                                    selectAllText={selectAllText}
                                    disabled={disabled}
                                />
                            </Block>
                        )}
                </StickyHeader>
                <ScrollableContent
                    style={{
                        maxHeight: maxHeight ? `${maxHeight - 80}px` : '320px',
                        padding: `${FOUNDATION_THEME.unit[6]} 0`,
                    }}
                >
                    {filteredItems.map(
                        (group: MultiSelectMenuGroupType, groupId: number) => (
                            <React.Fragment key={groupId}>
                                {group.groupLabel && (
                                    <RadixMenu.Label asChild>
                                        <PrimitiveText
                                            fontSize={12}
                                            padding="6px 8px"
                                            userSelect="none"
                                            margin="0px 6px"
                                            textTransform="uppercase"
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                        >
                                            {group.groupLabel}
                                        </PrimitiveText>
                                    </RadixMenu.Label>
                                )}
                                {group.items.map(
                                    (
                                        item: MultiSelectMenuItemType,
                                        itemIndex: number
                                    ) => (
                                        <MultiSelectMenuItem
                                            key={`${groupId}-${itemIndex}`}
                                            selected={selected}
                                            item={item}
                                            onSelect={onSelect}
                                        />
                                    )
                                )}
                                {groupId !== filteredItems.length - 1 &&
                                    group.showSeparator && (
                                        <RadixMenu.Separator asChild>
                                            <Block
                                                height={
                                                    multiSelectTokens.dropdown
                                                        .seperator.height
                                                }
                                                backgroundColor={
                                                    multiSelectTokens.dropdown
                                                        .seperator.color
                                                }
                                                margin={
                                                    multiSelectTokens.dropdown
                                                        .seperator.margin
                                                }
                                            ></Block>
                                        </RadixMenu.Separator>
                                    )}
                            </React.Fragment>
                        )
                    )}
                </ScrollableContent>
                {showActionButtons && (primaryAction || secondaryAction) && (
                    <FixedActionButtons>
                        {secondaryAction && (
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                text={secondaryAction.text}
                                onClick={secondaryAction.onClick}
                                disabled={secondaryAction.disabled}
                                loading={secondaryAction.loading}
                            />
                        )}
                        {primaryAction && (
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.SMALL}
                                text={primaryAction.text}
                                onClick={() => {
                                    primaryAction.onClick()
                                    onOpenChange(false)
                                }}
                                disabled={primaryAction.disabled}
                                loading={primaryAction.loading}
                            />
                        )}
                    </FixedActionButtons>
                )}
            </Content>
        </RadixMenu.Root>
    )
}

export default MultiSelectMenu
