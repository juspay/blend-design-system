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
    SingleSelectV2Size,
    SingleSelectV2Variant,
} from './singleSelectV2.types'
import SingleSelectV2Trigger from './SingleSelectV2Trigger'
import { TextInput } from '../Inputs/TextInput'
import { TextInputSize } from '../Inputs/TextInput/types'
import { Skeleton, SkeletonVariant } from '../Skeleton'
import { setupAccessibility, getValueLabelMap } from './utils'
import {
    hasExactMatch as checkExactMatch,
    getFilteredItemsWithCustomValue,
} from '../Select/selectUtils'
import SingleSelectV2MobileItem from './mobile/SingleSelectV2MobileItem'
import { filterMobileMenuGroups } from './mobile/singleSelectV2.mobile.utils'

type MobileSingleSelectV2Props = SingleSelectV2Props

const MobileSingleSelectV2: React.FC<MobileSingleSelectV2Props> = ({
    label,
    subLabel,
    hintText,
    required,
    helpIconText,
    placeholder,
    error = {},
    size = SingleSelectV2Size.MD,
    items = [],
    variant = SingleSelectV2Variant.CONTAINER,
    selected,
    onSelect,
    search,
    slot,
    customTrigger,
    inline = false,
    triggerDimensions,
    skeleton = {
        count: 3,
        show: false,
        variant: 'pulse',
    },
    allowCustomValue = false,
    customValueLabel = 'Specify',
    ...rest
}) => {
    const { disabled, name, ...buttonRest } = rest as {
        disabled?: boolean
        name?: string
        onFocus?: React.FocusEventHandler<HTMLButtonElement>
        onBlur?: React.FocusEventHandler<HTMLButtonElement>
        [key: string]: unknown
    }

    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const enableSearch = search?.show
    const searchPlaceholder = search?.placeholder ?? 'Search options...'
    const wrapperWidth = isSmallScreen
        ? '100%'
        : (triggerDimensions?.width ?? 'fit-content')

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
        const baseFilteredItems = filterMobileMenuGroups(items, searchText)

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
        isSmallScreen && size === SingleSelectV2Size.LG

    const generatedId = useId()
    const { uniqueName, hintTextId, errorMessageId, ariaAttributes } =
        setupAccessibility({
            name,
            generatedId,
            label,
            hintText,
            error: error.show,
            errorMessage: error.message,
            rest: buttonRest,
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
            width={wrapperWidth}
            display="flex"
            flexDirection="column"
            gap={8}
            maxWidth="100%"
        >
            {variant === SingleSelectV2Variant.CONTAINER &&
                (!isSmallScreen || size !== SingleSelectV2Size.LG) && (
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
                    if (!isOpen && enableSearch) {
                        setSearchText('')
                    }
                }}
            >
                <DrawerTrigger>
                    {customTrigger || (
                        <SingleSelectV2Trigger
                            triggerDimensions={
                                isSmallScreen
                                    ? { ...triggerDimensions, width: '100%' }
                                    : triggerDimensions
                            }
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
                            error={error.show}
                            disabled={disabled}
                            {...triggerAriaAttributes}
                            {...buttonRest}
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
                                                                        <SingleSelectV2MobileItem
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
                    error={error.show}
                    errorMessage={error.message}
                    hintTextId={hintTextId}
                    errorMessageId={errorMessageId}
                />
            )}
        </Block>
    )
}

export default MobileSingleSelectV2
