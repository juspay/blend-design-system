import React, { useState, useMemo, useId } from 'react'
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
} from '../Drawer'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { MultiSelectTrigger, SkeletonVariant } from '../../main'
import { FOUNDATION_THEME } from '../../tokens'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { map, filterMenuGroups } from './utils'
import {
    hasExactMatch as checkExactMatch,
    getFilteredItemsWithCustomValue,
} from '../Select/selectUtils'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { MultiSelectTokensType } from './multiSelect.tokens'
import type {
    MultiSelectProps,
    MultiSelectMenuGroupType,
    MultiSelectMenuItemType,
} from './types'
import {
    MultiSelectMenuSize,
    MultiSelectVariant,
    MultiSelectSelectionTagType,
} from './types'
import Button from '../Button/Button'
import { ButtonType, ButtonSize } from '../Button/types'
import { Checkbox } from '../Checkbox'
import { CheckboxSize } from '../Checkbox/types'
import { TextInput } from '../Inputs/TextInput'
import { TextInputSize } from '../Inputs/TextInput/types'
import VirtualList from '../VirtualList/VirtualList'
import type { VirtualListItem } from '../VirtualList/types'
import Skeleton from '../Skeleton/Skeleton'
import { setupAccessibility } from '../SingleSelect/utils'

type MobileMultiSelectProps = MultiSelectProps

type FlattenedMobileMultiSelectItem = VirtualListItem & {
    type: 'item' | 'label' | 'separator' | 'selectAll'
    item?: MultiSelectMenuItemType
    label?: string
    groupId?: number
}

const flattenMobileMultiSelectGroups = (
    groups: MultiSelectMenuGroupType[],
    enableSelectAll: boolean
): FlattenedMobileMultiSelectItem[] => {
    const flattened: FlattenedMobileMultiSelectItem[] = []
    let idCounter = 0

    if (enableSelectAll) {
        flattened.push({
            id: 'select-all',
            type: 'selectAll',
        })
    }

    groups.forEach((group, groupId) => {
        if (group.groupLabel) {
            flattened.push({
                id: `label-${groupId}`,
                type: 'label',
                label: group.groupLabel,
                groupId,
            })
        }

        group.items.forEach((item) => {
            flattened.push({
                id: `item-${idCounter++}`,
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

const SelectAllItem = ({
    items,
    selectedValues,
    onChange,
    selectAllText,
}: {
    items: MultiSelectMenuGroupType[]
    selectedValues: string[]
    onChange: (value: string) => void
    selectAllText: string
}) => {
    const allValues = items.flatMap((group) =>
        group.items
            .filter((item) => !item.disabled && !item.alwaysSelected)
            .map((item) => item.value)
    )

    const allSelected =
        allValues.length > 0 &&
        allValues.every((value) => selectedValues.includes(value))

    const someSelected = selectedValues.some((value) =>
        allValues.includes(value)
    )

    const handleSelectAll = (checked: boolean | 'indeterminate') => {
        if (checked === true || checked === 'indeterminate') {
            allValues.forEach((value) => {
                if (!selectedValues.includes(value)) {
                    onChange(value)
                }
            })
        } else {
            selectedValues.forEach((value) => {
                if (allValues.includes(value)) {
                    onChange(value)
                }
            })
        }
    }

    const getCheckboxState = (): boolean | 'indeterminate' => {
        if (allSelected) return true
        if (someSelected) return 'indeterminate'
        return false
    }

    return (
        <Block
            borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
            marginBottom={8}
            paddingBottom={8}
        >
            <Block
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="12px 6px"
                margin="0px 8px"
                borderRadius={4}
                cursor="pointer"
                backgroundColor="transparent"
                _hover={{
                    backgroundColor: FOUNDATION_THEME.colors.gray[50],
                }}
                onClick={() => handleSelectAll(!allSelected)}
            >
                <Text
                    variant="body.md"
                    fontWeight={600}
                    color={FOUNDATION_THEME.colors.gray[700]}
                >
                    {selectAllText}
                </Text>
                <Block
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                    }}
                >
                    <Checkbox
                        size={CheckboxSize.SMALL}
                        checked={getCheckboxState()}
                        onCheckedChange={handleSelectAll}
                    />
                </Block>
            </Block>
        </Block>
    )
}

const MultiSelectItem = ({
    item,
    isSelected,
    onChange,
    maxSelections,
    selectedCount,
}: {
    item: MultiSelectMenuItemType
    isSelected: boolean
    onChange: (value: string) => void
    maxSelections?: number
    selectedCount: number
}) => {
    const isMaxReached =
        maxSelections !== undefined &&
        selectedCount >= maxSelections &&
        !isSelected
    const isItemDisabled = item.disabled || isMaxReached || item.alwaysSelected

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={4}
            padding="8px 6px"
            margin="0px 8px"
            borderRadius={4}
            cursor={isItemDisabled ? 'not-allowed' : 'pointer'}
            _hover={{
                backgroundColor: FOUNDATION_THEME.colors.gray[50],
            }}
            onClick={() => {
                if (!isItemDisabled) {
                    onChange(item.value)
                }
            }}
        >
            <Block
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={8}
            >
                <Block display="flex" alignItems="center" gap={8} flexGrow={1}>
                    {item.slot1 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot1}
                        </Block>
                    )}
                    <Text
                        variant="body.md"
                        color={
                            isSelected
                                ? FOUNDATION_THEME.colors.gray[700]
                                : FOUNDATION_THEME.colors.gray[600]
                        }
                        fontWeight={500}
                        truncate
                    >
                        {item.label}
                    </Text>
                </Block>
                <Block
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                    }}
                >
                    <Checkbox
                        size={CheckboxSize.SMALL}
                        checked={isSelected}
                        disabled={isItemDisabled}
                        onCheckedChange={() => {
                            if (!isItemDisabled) {
                                onChange(item.value)
                            }
                        }}
                    />
                </Block>
            </Block>
            {item.subLabel && (
                <Block display="flex" alignItems="center" width="100%">
                    <Text
                        variant="body.sm"
                        color={FOUNDATION_THEME.colors.gray[400]}
                        fontWeight={400}
                    >
                        {item.subLabel}
                    </Text>
                </Block>
            )}
        </Block>
    )
}

const MobileMultiSelect: React.FC<MobileMultiSelectProps> = ({
    selectedValues,
    onChange,
    items = [],
    label,
    sublabel,
    disabled,
    helpIconHintText,
    name,
    required,
    variant = MultiSelectVariant.CONTAINER,
    selectionTagType = MultiSelectSelectionTagType.COUNT,
    slot,
    hintText,
    placeholder,
    size = MultiSelectMenuSize.MEDIUM,
    enableSearch = true,
    searchPlaceholder = 'Search options...',
    enableSelectAll = false,
    selectAllText = 'Select All',
    maxSelections,
    customTrigger,
    onBlur,
    onFocus,
    error,
    errorMessage,
    showActionButtons = true,
    primaryAction = {
        text: 'Apply',
        onClick: () => {},
        disabled: false,
        loading: false,
    },
    secondaryAction,
    showItemDividers = false,
    showHeaderBorder = false,
    enableVirtualization = false,
    virtualListItemHeight = 56,
    virtualListOverscan = 5,
    onEndReached,
    endReachedThreshold,
    hasMore,
    skeleton = {
        count: 3,
        show: false,
        variant: 'pulse',
    },
    maxTriggerWidth,
    minTriggerWidth,
    allowCustomValue = false,
    customValueLabel = 'Specify',
    onOpenChange,
}) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectTokensType>('MULTI_SELECT')
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const valueLabelMap = map(items)

    const generatedId = useId()
    const { uniqueName, labelId, hintTextId, errorMessageId } =
        setupAccessibility({
            name,
            generatedId,
            label,
            hintText,
            error,
            errorMessage,
            prefix: 'multiselect',
            needsMenuId: false,
        })

    const hasMatch = React.useMemo(
        () => checkExactMatch(searchText, items),
        [searchText, items]
    )

    const filteredItems = React.useMemo(() => {
        const baseFilteredItems = filterMenuGroups(items, searchText)

        return getFilteredItemsWithCustomValue(
            baseFilteredItems,
            searchText,
            hasMatch,
            allowCustomValue,
            enableSearch,
            customValueLabel
        )
    }, [
        items,
        searchText,
        allowCustomValue,
        hasMatch,
        enableSearch,
        customValueLabel,
    ])

    const flattenedItems = useMemo(
        () => flattenMobileMultiSelectGroups(filteredItems, enableSelectAll),
        [filteredItems, enableSelectAll]
    )

    return (
        <Block
            data-multi-select={label || 'multi-select'}
            data-status={disabled ? 'disabled' : 'enabled'}
            width="100%"
            display="flex"
            flexDirection="column"
            gap={8}
        >
            {variant === MultiSelectVariant.CONTAINER &&
                (!isSmallScreen || size !== MultiSelectMenuSize.LARGE) && (
                    <InputLabels
                        label={label}
                        sublabel={sublabel}
                        helpIconHintText={helpIconHintText}
                        name={uniqueName}
                        required={required}
                        labelId={labelId}
                    />
                )}

            <Drawer
                open={drawerOpen}
                onOpenChange={(isOpen) => {
                    setDrawerOpen(isOpen)
                    if (isOpen) {
                        onFocus?.()
                    } else {
                        onBlur?.()
                        if (enableSearch) {
                            setSearchText('')
                        }
                    }
                    onOpenChange?.(isOpen)
                }}
            >
                <DrawerTrigger>
                    {customTrigger || (
                        <MultiSelectTrigger
                            maxTriggerWidth={maxTriggerWidth}
                            minTriggerWidth={minTriggerWidth}
                            onChange={onChange}
                            name={uniqueName}
                            label={label}
                            placeholder={placeholder}
                            required={required || false}
                            selectionTagType={selectionTagType}
                            valueLabelMap={valueLabelMap}
                            open={false}
                            variant={variant}
                            size={size}
                            isSmallScreen={isSmallScreen}
                            selectedValues={selectedValues}
                            slot={slot}
                            onClick={() => setDrawerOpen(true)}
                            multiSelectTokens={multiSelectTokens}
                            error={error}
                            disabled={disabled}
                        />
                    )}
                </DrawerTrigger>

                <DrawerPortal>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            <Block
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                paddingX={
                                    multiSelectTokens.drawer.header.paddingX
                                }
                                paddingBottom={
                                    multiSelectTokens.drawer.header
                                        .paddingBottom
                                }
                                {...(showHeaderBorder && {
                                    borderBottom:
                                        multiSelectTokens.drawer.header
                                            .borderBottom,
                                })}
                            >
                                <DrawerTitle>
                                    {label || 'Select Options'}
                                </DrawerTitle>
                            </Block>
                        </DrawerHeader>

                        <DrawerBody noPadding={true}>
                            {skeleton.show ? (
                                <Block
                                    padding={
                                        multiSelectTokens.menu.item.padding
                                    }
                                    display="flex"
                                    flexDirection="column"
                                    gap={multiSelectTokens.menu.item.gap || 4}
                                    borderRadius={
                                        multiSelectTokens.menu.item.borderRadius
                                    }
                                    outline="none"
                                    border="none"
                                    width="100%"
                                    maxWidth="100%"
                                >
                                    {Array.from({
                                        length: skeleton.count || 3,
                                    }).map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            width="100%"
                                            height="33px"
                                            variant={
                                                (skeleton.variant as SkeletonVariant) ||
                                                'pulse'
                                            }
                                        />
                                    ))}
                                </Block>
                            ) : (
                                <Block
                                    display="flex"
                                    flexDirection="column"
                                    height="100%"
                                    overflow="hidden"
                                >
                                    <Block
                                        display="flex"
                                        flexDirection="column"
                                        gap={4}
                                        overflow="auto"
                                        flexGrow={1}
                                        role="listbox"
                                        aria-multiselectable="true"
                                    >
                                        {enableSearch && (
                                            <Block
                                                paddingX={
                                                    multiSelectTokens.drawer
                                                        .search.paddingX
                                                }
                                                marginTop={
                                                    multiSelectTokens.drawer
                                                        .search.marginTop
                                                }
                                                marginBottom={
                                                    multiSelectTokens.drawer
                                                        .search.marginBottom
                                                }
                                                backgroundColor={
                                                    FOUNDATION_THEME.colors
                                                        .gray[0]
                                                }
                                                zIndex={50}
                                            >
                                                <TextInput
                                                    size={TextInputSize.MEDIUM}
                                                    placeholder={
                                                        searchPlaceholder
                                                    }
                                                    value={searchText}
                                                    onChange={(e) =>
                                                        setSearchText(
                                                            e.target.value
                                                        )
                                                    }
                                                    aria-label={
                                                        searchPlaceholder ||
                                                        'Search options'
                                                    }
                                                />
                                            </Block>
                                        )}

                                        {items.length === 0 ? (
                                            <Block
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                padding={
                                                    multiSelectTokens.menu.item
                                                        .padding
                                                }
                                            >
                                                <Text
                                                    variant="body.md"
                                                    color={
                                                        multiSelectTokens.menu
                                                            .item.optionsLabel
                                                            .color.default
                                                    }
                                                    textAlign="center"
                                                >
                                                    No items available
                                                </Text>
                                            </Block>
                                        ) : filteredItems.length === 0 &&
                                          searchText.length > 0 ? (
                                            <Block
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                padding={
                                                    multiSelectTokens.menu.item
                                                        .padding
                                                }
                                            >
                                                <Text
                                                    variant="body.md"
                                                    color={
                                                        multiSelectTokens.menu
                                                            .item.optionsLabel
                                                            .color.default
                                                    }
                                                    textAlign="center"
                                                >
                                                    No results found
                                                </Text>
                                            </Block>
                                        ) : enableVirtualization &&
                                          flattenedItems.length > 0 ? (
                                            <VirtualList
                                                items={flattenedItems}
                                                height={600}
                                                itemHeight={
                                                    virtualListItemHeight
                                                }
                                                overscan={virtualListOverscan}
                                                onEndReached={onEndReached}
                                                endReachedThreshold={
                                                    endReachedThreshold
                                                }
                                                hasMore={hasMore}
                                                renderItem={({
                                                    item: flatItem,
                                                }) => {
                                                    const typed =
                                                        flatItem as FlattenedMobileMultiSelectItem

                                                    if (
                                                        typed.type ===
                                                        'selectAll'
                                                    ) {
                                                        return (
                                                            <Block
                                                                borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                                                marginBottom={8}
                                                                paddingBottom={
                                                                    8
                                                                }
                                                            >
                                                                <SelectAllItem
                                                                    items={
                                                                        filteredItems
                                                                    }
                                                                    selectedValues={
                                                                        selectedValues
                                                                    }
                                                                    onChange={
                                                                        onChange
                                                                    }
                                                                    selectAllText={
                                                                        selectAllText
                                                                    }
                                                                />
                                                            </Block>
                                                        )
                                                    }

                                                    if (
                                                        typed.type === 'label'
                                                    ) {
                                                        return (
                                                            <Block
                                                                padding={`${multiSelectTokens.menu.item.gap} ${multiSelectTokens.menu.item.padding}`}
                                                                margin={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .margin
                                                                }
                                                            >
                                                                <Text
                                                                    variant="body.sm"
                                                                    color={
                                                                        multiSelectTokens
                                                                            .menu
                                                                            .item
                                                                            .optionsLabel
                                                                            .color
                                                                            .default
                                                                    }
                                                                    textTransform="uppercase"
                                                                >
                                                                    {
                                                                        typed.label
                                                                    }
                                                                </Text>
                                                            </Block>
                                                        )
                                                    }

                                                    if (
                                                        typed.type ===
                                                        'separator'
                                                    ) {
                                                        return (
                                                            <Block
                                                                height={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .seperator
                                                                        .height
                                                                }
                                                                backgroundColor={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .seperator
                                                                        .color
                                                                }
                                                                margin={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .seperator
                                                                        .margin
                                                                }
                                                            />
                                                        )
                                                    }

                                                    if (
                                                        typed.type === 'item' &&
                                                        typed.item
                                                    ) {
                                                        const isSelected =
                                                            selectedValues.includes(
                                                                typed.item.value
                                                            )
                                                        return (
                                                            <MultiSelectItem
                                                                item={
                                                                    typed.item
                                                                }
                                                                isSelected={
                                                                    isSelected
                                                                }
                                                                onChange={
                                                                    onChange
                                                                }
                                                                maxSelections={
                                                                    maxSelections
                                                                }
                                                                selectedCount={
                                                                    selectedValues.length
                                                                }
                                                            />
                                                        )
                                                    }

                                                    return null
                                                }}
                                            />
                                        ) : (
                                            <Block
                                                paddingX={
                                                    multiSelectTokens.menu
                                                        .padding[size][variant]
                                                        .x
                                                }
                                                paddingY={
                                                    multiSelectTokens.menu
                                                        .padding[size][variant]
                                                        .y
                                                }
                                            >
                                                {enableSelectAll && (
                                                    <SelectAllItem
                                                        items={filteredItems}
                                                        selectedValues={
                                                            selectedValues
                                                        }
                                                        onChange={onChange}
                                                        selectAllText={
                                                            selectAllText
                                                        }
                                                    />
                                                )}

                                                {filteredItems.map(
                                                    (group, groupId) => {
                                                        const isLastGroup =
                                                            groupId ===
                                                            filteredItems.length -
                                                                1

                                                        return (
                                                            <React.Fragment
                                                                key={groupId}
                                                            >
                                                                {group.groupLabel && (
                                                                    <Block
                                                                        padding={`${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[8]}`}
                                                                        margin={`0 ${FOUNDATION_THEME.unit[6]}`}
                                                                    >
                                                                        <Text
                                                                            variant="body.sm"
                                                                            color={
                                                                                FOUNDATION_THEME
                                                                                    .colors
                                                                                    .gray[400]
                                                                            }
                                                                            textTransform="uppercase"
                                                                            fontSize={
                                                                                12
                                                                            }
                                                                        >
                                                                            {
                                                                                group.groupLabel
                                                                            }
                                                                        </Text>
                                                                    </Block>
                                                                )}
                                                                {group.items.map(
                                                                    (
                                                                        item,
                                                                        itemIndex
                                                                    ) => {
                                                                        const isSelected =
                                                                            selectedValues.includes(
                                                                                item.value
                                                                            )
                                                                        const isLastItemInGroup =
                                                                            itemIndex ===
                                                                            group
                                                                                .items
                                                                                .length -
                                                                                1
                                                                        const isLastItemOverall =
                                                                            isLastGroup &&
                                                                            isLastItemInGroup
                                                                        const shouldShowDivider =
                                                                            showItemDividers &&
                                                                            !isLastItemOverall

                                                                        return (
                                                                            <React.Fragment
                                                                                key={`${groupId}-${itemIndex}`}
                                                                            >
                                                                                <MultiSelectItem
                                                                                    item={
                                                                                        item
                                                                                    }
                                                                                    isSelected={
                                                                                        isSelected
                                                                                    }
                                                                                    onChange={
                                                                                        onChange
                                                                                    }
                                                                                    maxSelections={
                                                                                        maxSelections
                                                                                    }
                                                                                    selectedCount={
                                                                                        selectedValues.length
                                                                                    }
                                                                                />
                                                                                {shouldShowDivider && (
                                                                                    <Block
                                                                                        height={
                                                                                            1
                                                                                        }
                                                                                        flexShrink={
                                                                                            0
                                                                                        }
                                                                                        width="auto"
                                                                                        display="block"
                                                                                        style={{
                                                                                            borderTop: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                                                                                            minHeight:
                                                                                                '1px',
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </React.Fragment>
                                                                        )
                                                                    }
                                                                )}
                                                                {!isLastGroup &&
                                                                    group.showSeparator && (
                                                                        <Block
                                                                            height={
                                                                                1
                                                                            }
                                                                            backgroundColor={
                                                                                FOUNDATION_THEME
                                                                                    .colors
                                                                                    .gray[200]
                                                                            }
                                                                            margin="8px 0px"
                                                                        />
                                                                    )}
                                                            </React.Fragment>
                                                        )
                                                    }
                                                )}
                                            </Block>
                                        )}
                                    </Block>

                                    {showActionButtons &&
                                        (primaryAction || secondaryAction) && (
                                            <Block
                                                borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                                padding={
                                                    FOUNDATION_THEME.unit[16]
                                                }
                                                display="flex"
                                                gap={FOUNDATION_THEME.unit[12]}
                                                justifyContent="flex-end"
                                                flexShrink={0}
                                                backgroundColor={
                                                    FOUNDATION_THEME.colors
                                                        .gray[0]
                                                }
                                            >
                                                {secondaryAction && (
                                                    <Button
                                                        buttonType={
                                                            ButtonType.SECONDARY
                                                        }
                                                        size={ButtonSize.MEDIUM}
                                                        text={
                                                            secondaryAction.text
                                                        }
                                                        onClick={() => {
                                                            secondaryAction.onClick()
                                                        }}
                                                        disabled={
                                                            secondaryAction.disabled ||
                                                            selectedValues.length ===
                                                                0
                                                        }
                                                        loading={
                                                            secondaryAction.loading
                                                        }
                                                        fullWidth
                                                    />
                                                )}
                                                {primaryAction && (
                                                    <Button
                                                        buttonType={
                                                            ButtonType.PRIMARY
                                                        }
                                                        size={ButtonSize.MEDIUM}
                                                        text={
                                                            primaryAction.text
                                                        }
                                                        onClick={() => {
                                                            primaryAction.onClick(
                                                                selectedValues
                                                            )
                                                            setDrawerOpen(false)
                                                        }}
                                                        disabled={
                                                            primaryAction.disabled ||
                                                            selectedValues.length ===
                                                                0
                                                        }
                                                        loading={
                                                            primaryAction.loading
                                                        }
                                                        fullWidth
                                                    />
                                                )}
                                            </Block>
                                        )}
                                </Block>
                            )}
                        </DrawerBody>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>

            {variant === MultiSelectVariant.CONTAINER && (
                <InputFooter
                    hintText={hintText}
                    error={error}
                    errorMessage={errorMessage}
                    hintTextId={hintTextId}
                    errorMessageId={errorMessageId}
                />
            )}
        </Block>
    )
}

export default MobileMultiSelect
