import { useId, useMemo, useState } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    DrawerPortal,
    DrawerTitle,
    DrawerTrigger,
} from '../../Drawer'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import Button from '../../Button/Button'
import { ButtonSize, ButtonType } from '../../Button/types'
import { Checkbox } from '../../Checkbox'
import { CheckboxSize } from '../../Checkbox/types'
import { TextInput } from '../../Inputs/TextInput'
import { TextInputSize } from '../../Inputs/TextInput/types'
import InputFooter from '../../Inputs/utils/InputFooter/InputFooter'
import InputLabels from '../../Inputs/utils/InputLabels/InputLabels'
import { Skeleton, SkeletonVariant } from '../../Skeleton'
import VirtualList from '../../VirtualList/VirtualList'
import SelectItemV2 from '../../SelectV2/SelectItemV2'
import {
    hasExactMatch,
    getFilteredItemsWithCustomValue,
} from '../../Select/selectUtils'
import { setupAccessibility } from '../../SingleSelect/utils'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { MultiSelectV2TokensType } from '../multiSelectV2.tokens'
import {
    MultiSelectV2SelectionTagType,
    MultiSelectV2Size,
    MultiSelectV2Variant,
    type MultiSelectV2Props,
} from '../multiSelectV2.types'
import MultiSelectV2Trigger from '../MultiSelectV2Trigger'
import {
    filterMenuGroups,
    getAllAvailableValues,
    getSelectAllState,
    getValueLabelMap,
    handleSelectAll,
} from '../utils'
import {
    flattenMobileMultiSelectV2Groups,
    isSelectableItem,
    toVirtualListItems,
    type FlattenedMobileMultiSelectV2Item,
} from './mobileMultiSelectV2.utils'

const MobileMultiSelectV2 = ({
    selectedValues,
    onChange,
    items,
    label,
    subLabel,
    helpIconText,
    required = false,
    variant = MultiSelectV2Variant.CONTAINER,
    selectionTagType = MultiSelectV2SelectionTagType.COUNT,
    slot,
    hintText,
    placeholder,
    size = MultiSelectV2Size.MD,
    search,
    enableSelectAll = false,
    selectAllText = 'Select All',
    maxSelections,
    customTrigger,
    error = {},
    showActionButtons = true,
    primaryAction,
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
    allowCustomValue = false,
    customValueLabel = 'Specify',
    onOpenChange,
    triggerDimensions,
    inline = false,
    disabled = false,
    name,
    ...buttonRest
}: MultiSelectV2Props) => {
    const safeItems = items ?? []
    const [open, setOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectV2TokensType>('MULTI_SELECT_V2')
    const valueLabelMap = useMemo(
        () => getValueLabelMap(safeItems),
        [safeItems]
    )
    const generatedId = useId()

    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const isContainer = variant === MultiSelectV2Variant.CONTAINER
    const enableSearch = search?.show ?? false
    const searchPlaceholder = search?.placeholder ?? 'Search options...'

    const { uniqueName, labelId, hintTextId, errorMessageId, ariaAttributes } =
        setupAccessibility({
            name,
            generatedId,
            label,
            hintText,
            error: error.show,
            errorMessage: error.message,
            rest: buttonRest,
            prefix: 'multiselectv2-mobile',
        })

    const hasMatch = useMemo(
        () => hasExactMatch(searchText, safeItems),
        [searchText, safeItems]
    )

    const filteredItems = useMemo(() => {
        const baseFilteredItems = filterMenuGroups(safeItems, searchText)
        return getFilteredItemsWithCustomValue(
            baseFilteredItems,
            searchText,
            hasMatch,
            allowCustomValue,
            enableSearch,
            customValueLabel
        )
    }, [
        safeItems,
        searchText,
        hasMatch,
        allowCustomValue,
        enableSearch,
        customValueLabel,
    ])

    const flattenedItems = useMemo(
        () => flattenMobileMultiSelectV2Groups(filteredItems, enableSelectAll),
        [filteredItems, enableSelectAll]
    )

    const selectableValues = useMemo(
        () => getAllAvailableValues(filteredItems),
        [filteredItems]
    )
    const { allSelected, someSelected } = getSelectAllState(
        selectedValues,
        selectableValues
    )

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)
        if (!nextOpen && enableSearch) {
            setSearchText('')
        }
        onOpenChange?.(nextOpen)
    }

    const handleSelect = (value: string) => {
        const selected = selectedValues.includes(value)
        const maxReached =
            maxSelections !== undefined &&
            selectedValues.length >= maxSelections &&
            !selected

        if (maxReached || !isSelectableItem(value, filteredItems)) {
            return
        }
        onChange(value)
    }

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

    const renderMenuItem = (flatItem: FlattenedMobileMultiSelectV2Item) => {
        if (flatItem.type === 'selectAll') {
            return (
                <Block
                    style={{
                        paddingTop: multiSelectTokens.menu.selectAll.paddingTop,
                        paddingRight:
                            multiSelectTokens.menu.selectAll.paddingRight,
                        paddingBottom:
                            multiSelectTokens.menu.selectAll.paddingBottom,
                        paddingLeft:
                            multiSelectTokens.menu.selectAll.paddingLeft,
                    }}
                    borderRadius={multiSelectTokens.menu.selectAll.borderRadius}
                    borderBottom={multiSelectTokens.menu.header.borderBottom}
                    backgroundColor={
                        multiSelectTokens.menu.header.backgroundColor
                    }
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        paddingLeft={
                            multiSelectTokens.menu.header
                                .selectAllRowPaddingLeft
                        }
                        paddingRight={
                            multiSelectTokens.menu.header
                                .selectAllRowPaddingRight
                        }
                        cursor="pointer"
                        onClick={() =>
                            handleSelectAll(
                                !allSelected,
                                filteredItems,
                                selectedValues,
                                (newValue) => onChange(newValue)
                            )
                        }
                    >
                        <Text
                            variant="body.md"
                            fontSize={
                                multiSelectTokens.menu.item.option.fontSize
                            }
                            fontWeight={
                                multiSelectTokens.menu.item.option.fontWeight
                            }
                            color={
                                multiSelectTokens.menu.item.option.color.default
                            }
                        >
                            {selectAllText}
                        </Text>
                        <Checkbox
                            size={CheckboxSize.SMALL}
                            checked={
                                allSelected
                                    ? true
                                    : someSelected
                                      ? 'indeterminate'
                                      : false
                            }
                            onCheckedChange={(checked) =>
                                handleSelectAll(
                                    checked === true ||
                                        checked === 'indeterminate',
                                    filteredItems,
                                    selectedValues,
                                    (newValue) => onChange(newValue)
                                )
                            }
                        />
                    </Block>
                </Block>
            )
        }

        if (flatItem.type === 'label') {
            return (
                <Block
                    style={{
                        paddingTop:
                            multiSelectTokens.menu.item.optionsLabel.paddingTop,
                        paddingRight:
                            multiSelectTokens.menu.item.optionsLabel
                                .paddingRight,
                        paddingBottom:
                            multiSelectTokens.menu.item.optionsLabel
                                .paddingBottom,
                        paddingLeft:
                            multiSelectTokens.menu.item.optionsLabel
                                .paddingLeft,
                    }}
                >
                    <Text
                        variant="body.sm"
                        textTransform="uppercase"
                        fontSize={
                            multiSelectTokens.menu.item.optionsLabel.fontSize
                        }
                        fontWeight={
                            multiSelectTokens.menu.item.optionsLabel.fontWeight
                        }
                        color={
                            multiSelectTokens.menu.item.optionsLabel.color
                                .default
                        }
                    >
                        {flatItem.label}
                    </Text>
                </Block>
            )
        }

        if (flatItem.type === 'separator') {
            return (
                <Block
                    height={multiSelectTokens.menu.item.seperator.height}
                    backgroundColor={
                        multiSelectTokens.menu.item.seperator.color
                    }
                    margin={multiSelectTokens.menu.item.seperator.margin}
                />
            )
        }

        if (flatItem.type === 'item' && flatItem.item) {
            return (
                <SelectItemV2
                    mode="multi"
                    item={flatItem.item}
                    selectedValues={selectedValues}
                    onSelect={handleSelect}
                    itemTokens={multiSelectTokens.menu.item}
                />
            )
        }

        return null
    }

    return (
        <Block
            data-multi-select="multi-select"
            data-status={disabled ? 'disabled' : 'enabled'}
            width={
                isSmallScreen ? '100%' : (triggerDimensions?.width ?? '100%')
            }
            maxWidth={triggerDimensions?.maxWidth ?? '100%'}
            minWidth={triggerDimensions?.minWidth}
            display="flex"
            flexDirection="column"
            gap={multiSelectTokens.gap}
        >
            {isContainer &&
                (!isSmallScreen || size !== MultiSelectV2Size.LG) && (
                    <InputLabels
                        label={label}
                        sublabel={subLabel}
                        helpIconHintText={helpIconText}
                        name={uniqueName}
                        required={required}
                        labelId={labelId}
                        tokens={multiSelectTokens}
                    />
                )}

            <Drawer open={open} onOpenChange={handleOpenChange}>
                <DrawerTrigger>
                    {customTrigger || (
                        <MultiSelectV2Trigger
                            selectedValues={selectedValues}
                            slot={slot}
                            variant={variant}
                            size={size}
                            isSmallScreen={isSmallScreen}
                            name={uniqueName}
                            label={label}
                            placeholder={placeholder}
                            required={required}
                            selectionTagType={selectionTagType}
                            valueLabelMap={valueLabelMap}
                            open={open}
                            multiSelectTokens={multiSelectTokens}
                            inline={inline}
                            error={error.show}
                            disabled={disabled}
                            triggerDimensions={
                                isSmallScreen
                                    ? { ...triggerDimensions, width: '100%' }
                                    : triggerDimensions
                            }
                            borderRadius={String(
                                multiSelectTokens.trigger.borderRadius[size][
                                    variant
                                ]
                            )}
                            {...triggerAriaAttributes}
                            {...buttonRest}
                        />
                    )}
                </DrawerTrigger>

                <DrawerPortal>
                    <DrawerOverlay />
                    <DrawerContent contentDriven={true}>
                        <DrawerHeader>
                            <Block
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                style={{
                                    paddingTop:
                                        multiSelectTokens.drawer.header
                                            .paddingTop,
                                    paddingRight:
                                        multiSelectTokens.drawer.header
                                            .paddingRight,
                                    paddingBottom:
                                        multiSelectTokens.drawer.header
                                            .paddingBottom,
                                    paddingLeft:
                                        multiSelectTokens.drawer.header
                                            .paddingLeft,
                                }}
                                {...(showHeaderBorder && {
                                    borderBottom:
                                        multiSelectTokens.drawer.header
                                            .borderBottom,
                                })}
                            >
                                <DrawerTitle>
                                    {label || 'Select options'}
                                </DrawerTitle>
                            </Block>
                        </DrawerHeader>

                        <DrawerBody noPadding={true}>
                            {skeleton.show ? (
                                <Block
                                    display="flex"
                                    flexDirection="column"
                                    gap={multiSelectTokens.menu.item.gap}
                                    style={{
                                        paddingTop:
                                            multiSelectTokens.menu.item
                                                .paddingTop,
                                        paddingRight:
                                            multiSelectTokens.menu.item
                                                .paddingRight,
                                        paddingBottom:
                                            multiSelectTokens.menu.item
                                                .paddingBottom,
                                        paddingLeft:
                                            multiSelectTokens.menu.item
                                                .paddingLeft,
                                    }}
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
                                    gap={multiSelectTokens.drawer.content.gap}
                                >
                                    {enableSearch && (
                                        <Block
                                            style={{
                                                paddingTop:
                                                    multiSelectTokens.drawer
                                                        .search.paddingTop,
                                                paddingRight:
                                                    multiSelectTokens.drawer
                                                        .search.paddingRight,
                                                paddingBottom:
                                                    multiSelectTokens.drawer
                                                        .search.paddingBottom,
                                                paddingLeft:
                                                    multiSelectTokens.drawer
                                                        .search.paddingLeft,
                                                marginTop:
                                                    multiSelectTokens.drawer
                                                        .search.marginTop,
                                                marginBottom:
                                                    multiSelectTokens.drawer
                                                        .search.marginBottom,
                                            }}
                                        >
                                            <TextInput
                                                size={TextInputSize.MEDIUM}
                                                placeholder={searchPlaceholder}
                                                value={searchText}
                                                onChange={(e) =>
                                                    setSearchText(
                                                        e.target.value
                                                    )
                                                }
                                                aria-label={searchPlaceholder}
                                            />
                                        </Block>
                                    )}

                                    <Block
                                        role="listbox"
                                        aria-multiselectable="true"
                                        flexGrow={1}
                                        flexShrink={1}
                                        minHeight={0}
                                        overflow="auto"
                                        style={{
                                            paddingTop:
                                                multiSelectTokens.menu.list
                                                    .paddingTop,
                                            paddingRight:
                                                multiSelectTokens.menu.list
                                                    .paddingRight,
                                            paddingBottom:
                                                multiSelectTokens.menu.list
                                                    .paddingBottom,
                                            paddingLeft:
                                                multiSelectTokens.menu.list
                                                    .paddingLeft,
                                        }}
                                    >
                                        {safeItems.length === 0 ? (
                                            <Text
                                                variant="body.md"
                                                textAlign="center"
                                                color={
                                                    multiSelectTokens.menu.item
                                                        .optionsLabel.color
                                                        .default
                                                }
                                            >
                                                No items available
                                            </Text>
                                        ) : filteredItems.length === 0 &&
                                          searchText.length > 0 ? (
                                            <Text
                                                variant="body.md"
                                                textAlign="center"
                                                color={
                                                    multiSelectTokens.menu.item
                                                        .optionsLabel.color
                                                        .default
                                                }
                                            >
                                                No results found
                                            </Text>
                                        ) : enableVirtualization ? (
                                            <VirtualList
                                                items={toVirtualListItems(
                                                    flattenedItems
                                                )}
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
                                                renderItem={({ item }) =>
                                                    renderMenuItem(
                                                        item as FlattenedMobileMultiSelectV2Item
                                                    )
                                                }
                                            />
                                        ) : (
                                            <Block
                                                display="flex"
                                                flexDirection="column"
                                                gap={showItemDividers ? 2 : 0}
                                            >
                                                {flattenedItems.map(
                                                    (flatItem) => (
                                                        <Block
                                                            key={flatItem.id}
                                                        >
                                                            {renderMenuItem(
                                                                flatItem
                                                            )}
                                                        </Block>
                                                    )
                                                )}
                                            </Block>
                                        )}
                                    </Block>

                                    {showActionButtons &&
                                        (primaryAction || secondaryAction) && (
                                            <Block
                                                style={{
                                                    paddingTop:
                                                        multiSelectTokens.menu
                                                            .actions.paddingTop,
                                                    paddingRight:
                                                        multiSelectTokens.menu
                                                            .actions
                                                            .paddingRight,
                                                    paddingBottom:
                                                        multiSelectTokens.menu
                                                            .actions
                                                            .paddingBottom,
                                                    paddingLeft:
                                                        multiSelectTokens.menu
                                                            .actions
                                                            .paddingLeft,
                                                }}
                                                gap={
                                                    multiSelectTokens.menu
                                                        .actions.gap
                                                }
                                                display="flex"
                                                justifyContent="flex-end"
                                                borderTop={
                                                    multiSelectTokens.menu
                                                        .actions.borderTop
                                                }
                                                backgroundColor={
                                                    multiSelectTokens.menu
                                                        .actions.backgroundColor
                                                }
                                                flexShrink={0}
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
                                                        onClick={
                                                            secondaryAction.onClick
                                                        }
                                                        disabled={
                                                            secondaryAction.disabled
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
                                                            setOpen(false)
                                                        }}
                                                        disabled={
                                                            primaryAction.disabled
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

            {isContainer && (
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

export default MobileMultiSelectV2
