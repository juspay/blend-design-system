import React, { useId, useState } from 'react'
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
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import type { SingleSelectV2Props } from './singleSelectV2.types'
import {
    type SingleSelectV2GroupType,
    type SingleSelectV2ItemType,
    SingleSelectV2Size,
    SingleSelectV2Variant,
} from './singleSelectV2.types'
import SingleSelectV2Trigger from './SingleSelectV2Trigger'
import { TextInput } from '../Inputs/TextInput'
import { TextInputSize } from '../Inputs/TextInput/types'
import { Check } from 'lucide-react'
import { Skeleton, SkeletonVariant } from '../Skeleton'
import { setupAccessibility, getValueLabelMap } from './utils'
import {
    hasExactMatch as checkExactMatch,
    getFilteredItemsWithCustomValue,
} from '../Select/selectUtils'

type MobileSingleSelectV2Props = SingleSelectV2Props

const SingleSelectV2Item = ({
    item,
    isSelected,
    onSelect,
    itemTokens,
}: {
    item: SingleSelectV2ItemType
    isSelected: boolean
    onSelect: (value: string) => void
    itemTokens: SingleSelectV2TokensType['menu']['item']
}) => {
    const colorState = isSelected ? 'selected' : 'default'
    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={itemTokens.gap}
            padding={itemTokens.padding}
            margin={itemTokens.margin}
            borderRadius={itemTokens.borderRadius}
            cursor={item.disabled ? 'not-allowed' : 'pointer'}
            backgroundColor={
                item.disabled
                    ? itemTokens.backgroundColor.disabled
                    : isSelected
                      ? itemTokens.backgroundColor.selected
                      : itemTokens.backgroundColor.default
            }
            style={{ transition: 'background-color 0.15s ease-in-out' }}
            _hover={{
                backgroundColor: itemTokens.backgroundColor.hover,
            }}
            onClick={() => {
                if (!item.disabled) onSelect(item.value)
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
                        fontSize={itemTokens.option.fontSize}
                        fontWeight={itemTokens.option.fontWeight}
                        color={
                            item.disabled
                                ? itemTokens.option.color.disabled
                                : itemTokens.option.color[colorState]
                        }
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
                                color={itemTokens.option.color.selected}
                            />
                        </Block>
                    )}
                </Block>
            </Block>
            {item.subLabel && (
                <Block display="flex" alignItems="center" width="100%">
                    <Text
                        variant="body.sm"
                        fontSize={itemTokens.description.fontSize}
                        fontWeight={itemTokens.description.fontWeight}
                        color={itemTokens.description.color[colorState]}
                    >
                        {item.subLabel}
                    </Text>
                </Block>
            )}
        </Block>
    )
}

const filterMenuItem = (
    item: SingleSelectV2ItemType,
    searchText: string
): SingleSelectV2ItemType | null => {
    const lower = searchText.toLowerCase()
    const matches =
        (item.label && item.label.toLowerCase().includes(lower)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(lower))

    if (item.subMenu) {
        const filteredSub = item.subMenu
            .map((sub: SingleSelectV2ItemType) => filterMenuItem(sub, lower))
            .filter(Boolean) as SingleSelectV2ItemType[]
        if (filteredSub.length > 0 || matches) {
            return { ...item, subMenu: filteredSub }
        }
        return null
    }
    return matches ? item : null
}

const filterMenuGroups = (
    groups: SingleSelectV2GroupType[],
    searchText: string
): SingleSelectV2GroupType[] => {
    if (!searchText) return groups
    return groups
        .map((group: SingleSelectV2GroupType) => {
            const filteredItems = group.items
                .map((item: SingleSelectV2ItemType) =>
                    filterMenuItem(item, searchText)
                )
                .filter(Boolean) as SingleSelectV2ItemType[]
            if (filteredItems.length === 0) return null
            return { ...group, items: filteredItems }
        })
        .filter(Boolean) as SingleSelectV2GroupType[]
}

const MobileSingleSelectV2: React.FC<MobileSingleSelectV2Props> = ({
    label,
    subLabel,
    hintText,
    required,
    helpIconText,
    placeholder,
    error = false,
    errorMessage,
    size = SingleSelectV2Size.MEDIUM,
    items = [],
    name,
    variant = SingleSelectV2Variant.CONTAINER,
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
    fullWidth = false,
    skeleton = {
        count: 3,
        show: false,
        variant: 'pulse',
    },
    maxTriggerWidth,
    minTriggerWidth,
    allowCustomValue = false,
    customValueLabel = 'Specify',
    ...rest
}) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const singleSelectTokens =
        useResponsiveTokens<SingleSelectV2TokensType>('SINGLE_SELECT_V2')
    const [panelOpen, setPanelOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const valueLabelMap = getValueLabelMap(items)

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
        isSmallScreen && size === SingleSelectV2Size.LARGE

    const generatedId = useId()
    const { uniqueName, hintTextId, errorMessageId, ariaAttributes } =
        setupAccessibility({
            name,
            generatedId,
            label,
            hintText,
            error,
            errorMessage,
            rest,
            prefix: 'singleselectv2-mobile',
        })
    const triggerAriaAttributes = {
        'aria-describedby': ariaAttributes['aria-describedby'] as
            | string
            | undefined,
        'aria-labelledby': ariaAttributes['aria-labelledby'] as
            | string
            | undefined,
        'aria-label': ariaAttributes['aria-label'] as string | undefined,
        'aria-invalid': ariaAttributes['aria-invalid'] as boolean | undefined,
    }

    return (
        <Block
            data-single-select-v2={label || 'single-select-v2'}
            data-status={disabled ? 'disabled' : 'enabled'}
            width={fullWidth ? '100%' : 'fit-content'}
            display="flex"
            flexDirection="column"
            gap={8}
            maxWidth="100%"
        >
            {variant === SingleSelectV2Variant.CONTAINER &&
                (!isSmallScreen || size !== SingleSelectV2Size.LARGE) && (
                    <InputLabels
                        label={label}
                        sublabel={subLabel}
                        helpIconHintText={helpIconText}
                        name={uniqueName}
                        required={required}
                    />
                )}

            <Drawer
                open={panelOpen}
                onOpenChange={(isOpen) => {
                    setPanelOpen(isOpen)
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
                        <SingleSelectV2Trigger
                            maxTriggerWidth={maxTriggerWidth}
                            minTriggerWidth={minTriggerWidth}
                            singleSelectTokens={singleSelectTokens}
                            size={size}
                            selected={selected}
                            label={label || ''}
                            name={uniqueName}
                            placeholder={placeholder}
                            required={required || false}
                            valueLabelMap={valueLabelMap}
                            open={panelOpen}
                            slot={slot}
                            variant={variant}
                            isSmallScreenWithLargeSize={
                                isSmallScreenWithLargeSize
                            }
                            isItemSelected={isItemSelected}
                            inline={inline}
                            error={error}
                            disabled={disabled}
                            fullWidth={fullWidth}
                            {...triggerAriaAttributes}
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
                                                position="sticky"
                                                top={0}
                                                left={0}
                                                right={0}
                                                style={{
                                                    paddingInline:
                                                        singleSelectTokens
                                                            .mobilePanel.header
                                                            .paddingInline,
                                                    paddingBlock:
                                                        singleSelectTokens
                                                            .mobilePanel.header
                                                            .paddingBlockEnd,
                                                }}
                                                backgroundColor={
                                                    singleSelectTokens.menu
                                                        .content.backgroundColor
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
                                                    singleSelectTokens.menu.item
                                                        .padding
                                                }
                                            >
                                                <Text
                                                    variant="body.md"
                                                    fontSize={
                                                        singleSelectTokens.menu
                                                            .item.groupLabelText
                                                            .fontSize
                                                    }
                                                    fontWeight={
                                                        singleSelectTokens.menu
                                                            .item.groupLabelText
                                                            .fontWeight
                                                    }
                                                    color={
                                                        singleSelectTokens.menu
                                                            .item.groupLabelText
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
                                                    fontSize={
                                                        singleSelectTokens.menu
                                                            .item.groupLabelText
                                                            .fontSize
                                                    }
                                                    fontWeight={
                                                        singleSelectTokens.menu
                                                            .item.groupLabelText
                                                            .fontWeight
                                                    }
                                                    color={
                                                        singleSelectTokens.menu
                                                            .item.groupLabelText
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
                                                                                .groupLabelText
                                                                                .color
                                                                                .default
                                                                        }
                                                                        textTransform="uppercase"
                                                                        fontSize={
                                                                            singleSelectTokens
                                                                                .menu
                                                                                .item
                                                                                .groupLabelText
                                                                                .fontSize
                                                                        }
                                                                        fontWeight={
                                                                            singleSelectTokens
                                                                                .menu
                                                                                .item
                                                                                .groupLabelText
                                                                                .fontWeight
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
                                                                        <SingleSelectV2Item
                                                                            key={`${groupId}-${itemIndex}`}
                                                                            item={
                                                                                item
                                                                            }
                                                                            isSelected={
                                                                                isSelected
                                                                            }
                                                                            itemTokens={
                                                                                singleSelectTokens
                                                                                    .menu
                                                                                    .item
                                                                            }
                                                                            onSelect={(
                                                                                value
                                                                            ) => {
                                                                                onSelect(
                                                                                    value
                                                                                )
                                                                                setPanelOpen(
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
                                                                                .separator
                                                                                .height
                                                                        }
                                                                        backgroundColor={
                                                                            singleSelectTokens
                                                                                .menu
                                                                                .item
                                                                                .separator
                                                                                .color
                                                                        }
                                                                        margin={
                                                                            singleSelectTokens
                                                                                .menu
                                                                                .item
                                                                                .separator
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

            {variant === SingleSelectV2Variant.CONTAINER && (
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

export default MobileSingleSelectV2
