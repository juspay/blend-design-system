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
import { FOUNDATION_THEME } from '../../tokens'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import type { SingleSelectV2Props } from './types'
import {
    type SingleSelectV2GroupType,
    type SingleSelectV2ItemType,
    SingleSelectV2Size,
    SingleSelectV2Variant,
} from './types'
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
}: {
    item: SingleSelectV2ItemType
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

    return (
        <Block
            data-single-select-v2={label || 'single-select-v2'}
            data-status={disabled ? 'disabled' : 'enabled'}
            display="flex"
            flexDirection="column"
            gap={8}
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
                            onClick={() => setPanelOpen(true)}
                            slot={slot}
                            variant={variant}
                            isSmallScreenWithLargeSize={
                                isSmallScreenWithLargeSize
                            }
                            isItemSelected={isItemSelected}
                            inline={inline}
                            error={error}
                            disabled={disabled}
                            {...ariaAttributes}
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
                                            singleSelectTokens.popover.item
                                                .padding
                                        }
                                        display="flex"
                                        flexDirection="column"
                                        gap={
                                            singleSelectTokens.popover.item
                                                .gap || 4
                                        }
                                        borderRadius={
                                            singleSelectTokens.popover.item
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
                                                    singleSelectTokens.popover
                                                        .item.padding
                                                }
                                            >
                                                <Text
                                                    variant="body.md"
                                                    color={
                                                        singleSelectTokens
                                                            .popover.item
                                                            .optionsLabel.color
                                                            .default
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
                                                    singleSelectTokens.popover
                                                        .item.padding
                                                }
                                            >
                                                <Text
                                                    variant="body.md"
                                                    color={
                                                        singleSelectTokens
                                                            .popover.item
                                                            .optionsLabel.color
                                                            .default
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
                                                                            .popover
                                                                            .item
                                                                            .padding
                                                                    }
                                                                    margin={
                                                                        singleSelectTokens
                                                                            .popover
                                                                            .item
                                                                            .margin
                                                                    }
                                                                >
                                                                    <Text
                                                                        variant="body.sm"
                                                                        color={
                                                                            singleSelectTokens
                                                                                .popover
                                                                                .item
                                                                                .optionsLabel
                                                                                .color
                                                                                .default
                                                                        }
                                                                        textTransform="uppercase"
                                                                        fontSize={
                                                                            singleSelectTokens
                                                                                .popover
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
                                                                        <SingleSelectV2Item
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
                                                                                .popover
                                                                                .item
                                                                                .separator
                                                                                .height
                                                                        }
                                                                        backgroundColor={
                                                                            singleSelectTokens
                                                                                .popover
                                                                                .item
                                                                                .separator
                                                                                .color
                                                                        }
                                                                        margin={
                                                                            singleSelectTokens
                                                                                .popover
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
