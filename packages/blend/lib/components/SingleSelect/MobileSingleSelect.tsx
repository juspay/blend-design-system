import React, { useState } from 'react'
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
} from '../Drawer'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { FOUNDATION_THEME } from '../../tokens'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { SingleSelectTokensType } from './singleSelect.tokens'
import type { SingleSelectProps } from './types'
import {
    type SelectMenuGroupType,
    type SelectMenuItemType,
    SelectMenuSize,
    SelectMenuVariant,
} from '../Select'
import SingleSelectTrigger from './SingleSelectTrigger'
import { TextInput } from '../Inputs/TextInput'
import { TextInputSize } from '../Inputs/TextInput/types'
import { Check } from 'lucide-react'
import { Skeleton, SkeletonVariant } from '../Skeleton'
import {
    hasExactMatch as checkExactMatch,
    getFilteredItemsWithCustomValue,
} from '../Select/selectUtils'

type MobileSingleSelectProps = SingleSelectProps

const map = function getValueLabelMap(
    groups: SelectMenuGroupType[]
): Record<string, string> {
    const map: Record<string, string> = {}

    function traverse(items: SelectMenuItemType[]) {
        for (const item of items) {
            map[item.value] = item.label
            if (item.subMenu) {
                traverse(item.subMenu)
            }
        }
    }

    for (const group of groups) {
        traverse(group.items)
    }

    return map
}

const SingleSelectItem = ({
    item,
    isSelected,
    onSelect,
}: {
    item: SelectMenuItemType
    isSelected: boolean
    onSelect: (value: string) => void
}) => {
    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={4}
            padding={`${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[6]}`}
            margin={`0 ${FOUNDATION_THEME.unit[8]}`}
            borderRadius={4}
            cursor={item.disabled ? 'not-allowed' : 'pointer'}
            backgroundColor={
                isSelected ? FOUNDATION_THEME.colors.gray[50] : 'transparent'
            }
            style={{
                transition: 'background-color 0.15s ease-in-out',
            }}
            _hover={{
                backgroundColor: FOUNDATION_THEME.colors.gray[50],
            }}
            onClick={() => {
                if (!item.disabled) {
                    onSelect(item.value)
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
                    display="flex"
                    alignItems="center"
                    gap={4}
                    flexShrink={0}
                >
                    {item.slot2 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot2}
                        </Block>
                    )}
                    {item.slot3 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot3}
                        </Block>
                    )}
                    {item.slot4 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot4}
                        </Block>
                    )}
                    {isSelected && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            <Check
                                size={16}
                                color={FOUNDATION_THEME.colors.gray[600]}
                            />
                        </Block>
                    )}
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

const filterMenuItem = (
    item: SelectMenuItemType,
    searchText: string
): SelectMenuItemType | null => {
    const lower = searchText.toLowerCase()
    const matches =
        (item.label && item.label.toLowerCase().includes(lower)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(lower))

    if (item.subMenu) {
        const filteredSub = item.subMenu
            .map((sub: SelectMenuItemType) => filterMenuItem(sub, lower))
            .filter(Boolean) as SelectMenuItemType[]
        if (filteredSub.length > 0 || matches) {
            return { ...item, subMenu: filteredSub }
        }
        return null
    }
    return matches ? item : null
}

const filterMenuGroups = (
    groups: SelectMenuGroupType[],
    searchText: string
): SelectMenuGroupType[] => {
    if (!searchText) return groups
    return groups
        .map((group: SelectMenuGroupType) => {
            const filteredItems = group.items
                .map((item: SelectMenuItemType) =>
                    filterMenuItem(item, searchText)
                )
                .filter(Boolean) as SelectMenuItemType[]
            if (filteredItems.length === 0) return null
            return { ...group, items: filteredItems }
        })
        .filter(Boolean) as SelectMenuGroupType[]
}

const MobileSingleSelect: React.FC<MobileSingleSelectProps> = ({
    label,
    subLabel,
    hintText,
    required,
    helpIconText,
    placeholder,
    error = false,
    errorMessage,
    size = SelectMenuSize.MEDIUM,
    items = [],
    name,
    variant = SelectMenuVariant.CONTAINER,
    disabled,
    selected,
    onSelect,
    enableSearch = false,
    searchPlaceholder = 'Search options...',
    slot,
    customTrigger,
    onBlur,
    onFocus,
    inline = false,
    skeleton = {
        count: 3,
        show: false,
        variant: 'pulse',
    },
    maxTriggerWidth,
    minTriggerWidth,
    allowCustomValue = false,
    customValueLabel = 'Specify',
}) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const singleSelectTokens =
        useResponsiveTokens<SingleSelectTokensType>('SINGLE_SELECT')
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const valueLabelMap = map(items)

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
            enableSearch || false,
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

    const isItemSelected = selected.length > 0
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === SelectMenuSize.LARGE

    return (
        <Block
            data-single-select={label || 'single-select'}
            data-status={disabled ? 'disabled' : 'enabled'}
            display="flex"
            flexDirection="column"
            gap={8}
        >
            {variant === SelectMenuVariant.CONTAINER &&
                (!isSmallScreen || size !== SelectMenuSize.LARGE) && (
                    <InputLabels
                        label={label}
                        sublabel={subLabel}
                        disabled={disabled}
                        helpIconHintText={helpIconText}
                        name={name}
                        required={required}
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
                }}
            >
                <DrawerTrigger>
                    {customTrigger || (
                        <SingleSelectTrigger
                            maxTriggerWidth={maxTriggerWidth}
                            minTriggerWidth={minTriggerWidth}
                            singleSelectTokens={singleSelectTokens}
                            size={size}
                            selected={selected}
                            label={label || ''}
                            name={name || ''}
                            placeholder={placeholder}
                            required={required || false}
                            valueLabelMap={valueLabelMap}
                            open={drawerOpen}
                            onClick={() => setDrawerOpen(true)}
                            slot={slot}
                            variant={variant}
                            isSmallScreenWithLargeSize={
                                isSmallScreenWithLargeSize
                            }
                            isItemSelected={isItemSelected}
                            inline={inline}
                            error={error}
                            disabled={disabled}
                        />
                    )}
                </DrawerTrigger>

                <DrawerPortal>
                    <DrawerOverlay />
                    <DrawerContent contentDriven={true}>
                        <DrawerBody noPadding={true}>
                            <Block
                                display="flex"
                                flexDirection="column"
                                height="100%"
                                overflow="hidden"
                            >
                                {skeleton.show ? (
                                    <Block
                                        padding={
                                            singleSelectTokens.menu.item.padding
                                        }
                                        display="flex"
                                        flexDirection="column"
                                        gap={
                                            singleSelectTokens.menu.item.gap ||
                                            4
                                        }
                                        borderRadius={
                                            singleSelectTokens.menu.item
                                                .borderRadius
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
                                        gap={4}
                                        overflow="auto"
                                        flexGrow={1}
                                    >
                                        {enableSearch && (
                                            <Block
                                                padding="16px 16px 8px 16px"
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
                                                />
                                            </Block>
                                        )}

                                        {items.length === 0 ? (
                                            <Block
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                padding={
                                                    singleSelectTokens.menu.item
                                                        .padding
                                                }
                                            >
                                                <Text
                                                    variant="body.md"
                                                    color={
                                                        singleSelectTokens.menu
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
                                                    singleSelectTokens.menu.item
                                                        .padding
                                                }
                                            >
                                                <Text
                                                    variant="body.md"
                                                    color={
                                                        singleSelectTokens.menu
                                                            .item.optionsLabel
                                                            .color.default
                                                    }
                                                    textAlign="center"
                                                >
                                                    No results found
                                                </Text>
                                            </Block>
                                        ) : (
                                            <Block
                                                display="flex"
                                                flexDirection="column"
                                                gap={4}
                                            >
                                                {filteredItems.map(
                                                    (group, groupId) => (
                                                        <React.Fragment
                                                            key={groupId}
                                                        >
                                                            {group.groupLabel && (
                                                                <Block
                                                                    padding={
                                                                        singleSelectTokens
                                                                            .menu
                                                                            .item
                                                                            .padding
                                                                    }
                                                                    margin={
                                                                        singleSelectTokens
                                                                            .menu
                                                                            .item
                                                                            .margin
                                                                    }
                                                                >
                                                                    <Text
                                                                        variant="body.sm"
                                                                        color={
                                                                            singleSelectTokens
                                                                                .menu
                                                                                .item
                                                                                .optionsLabel
                                                                                .color
                                                                                .default
                                                                        }
                                                                        textTransform="uppercase"
                                                                        fontSize={
                                                                            singleSelectTokens
                                                                                .menu
                                                                                .item
                                                                                .optionsLabel
                                                                                .fontSize
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
                                                                        selected ===
                                                                        item.value
                                                                    return (
                                                                        <SingleSelectItem
                                                                            key={`${groupId}-${itemIndex}`}
                                                                            item={
                                                                                item
                                                                            }
                                                                            isSelected={
                                                                                isSelected
                                                                            }
                                                                            onSelect={(
                                                                                value
                                                                            ) => {
                                                                                onSelect(
                                                                                    value
                                                                                )
                                                                                setDrawerOpen(
                                                                                    false
                                                                                )
                                                                            }}
                                                                        />
                                                                    )
                                                                }
                                                            )}
                                                            {groupId !==
                                                                filteredItems.length -
                                                                    1 &&
                                                                group.showSeparator && (
                                                                    <Block
                                                                        height={
                                                                            singleSelectTokens
                                                                                .menu
                                                                                .item
                                                                                .seperator
                                                                                .height
                                                                        }
                                                                        backgroundColor={
                                                                            singleSelectTokens
                                                                                .menu
                                                                                .item
                                                                                .seperator
                                                                                .color
                                                                        }
                                                                        margin={
                                                                            singleSelectTokens
                                                                                .menu
                                                                                .item
                                                                                .seperator
                                                                                .margin
                                                                        }
                                                                    />
                                                                )}
                                                        </React.Fragment>
                                                    )
                                                )}
                                            </Block>
                                        )}
                                    </Block>
                                )}
                            </Block>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>

            {variant === SelectMenuVariant.CONTAINER && (
                <InputFooter
                    hintText={hintText}
                    error={error}
                    errorMessage={errorMessage}
                />
            )}
        </Block>
    )
}

export default MobileSingleSelect
