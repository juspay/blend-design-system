import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Checkbox } from '../Checkbox'
import {
    SelectV2Alignment,
    SelectV2Side,
    SelectV2Variant,
    SelectV2Size,
    SelectorV2Size,
    MultiSelectV2SelectionTagType,
    type MultiSelectV2TokensType,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { BottomSheet } from '../../overlay/sheet/BottomSheet'
import { Block } from '../../primitives/Block'
import { DropdownContent, DropdownList, useDropdown } from '../shared/dropdown'
import { flattenGroups } from '../shared/dropdown/dropdownFlatten'
import { MultiSelectTrigger } from './MultiSelectTrigger'
import { MultiSelectMenuHeader } from './MultiSelectMenuHeader'
import { MultiSelectMenuActions } from './MultiSelectMenuActions'
import {
    getMultiSelectContentTokens,
    getMultiSelectItemTokens,
    getTriggerState,
    getValueLabelMap,
    getSelectionTagText,
    getSelectAllState,
    getAllAvailableValues,
    handleSelectAll,
    filterMultiSelectV2MenuGroups,
    flattenMultiSelectGroups,
    getNextSelectionAfterToggle as toggleSelection,
    isBlockedByMaxSelections as isBlocked,
} from './multiSelect.utils'
import type {
    MultiSelectNativeProps,
    MultiSelectRef,
} from './multiSelect.types'

const PLACEMENT_MAP: Record<SelectV2Side, 'top' | 'bottom' | 'left' | 'right'> =
    {
        [SelectV2Side.TOP]: 'top',
        [SelectV2Side.BOTTOM]: 'bottom',
        [SelectV2Side.LEFT]: 'left',
        [SelectV2Side.RIGHT]: 'right',
    }

const ALIGN_MAP: Record<SelectV2Alignment, 'start' | 'center' | 'end'> = {
    [SelectV2Alignment.START]: 'start',
    [SelectV2Alignment.CENTER]: 'center',
    [SelectV2Alignment.END]: 'end',
}

/**
 * MultiSelect — React Native implementation of web's `MultiSelectV2`.
 *
 * A trigger button opens a dropdown panel with multi-select items. Supports
 * select-all, action buttons, maxSelections, clear button, search, and
 * mobile bottom-sheet mode.
 */
const MultiSelect = forwardRef<MultiSelectRef, MultiSelectNativeProps>(
    function MultiSelect(
        {
            label,
            subLabel,
            hintText,
            required = false,
            placeholder,
            size = SelectV2Size.MD,
            variant = SelectV2Variant.CONTAINER,
            selectionTagType = MultiSelectV2SelectionTagType.COUNT,
            items = [],
            selectedValues,
            onChange,
            onSelectionChange,
            search,
            enableSelectAll = false,
            selectAllText = 'Select All',
            maxSelections,
            customTrigger,
            open: openProp,
            onOpenChange,
            usePanelOnMobile = true,
            alignment = SelectV2Alignment.START,
            side = SelectV2Side.BOTTOM,
            sideOffset = 8,
            error,
            disabled = false,
            showActionButtons = false,
            primaryAction,
            secondaryAction,
            showClearButton = false,
            onClearAllClick,
            enableVirtualization = false,
            menuFooter,
            testID,
            accessibilityLabel,
        },
        ref
    ) {
        const tokens =
            useNativeTokens<MultiSelectV2TokensType>('MULTI_SELECT_V2')
        const [searchText, setSearchText] = useState('')

        const dropdown = useDropdown({
            open: openProp,
            onOpenChange,
            placement: PLACEMENT_MAP[side],
            alignment: ALIGN_MAP[alignment],
            offset: sideOffset,
            usePanelOnMobile,
        })

        const hasError = Boolean(error?.show)
        const triggerState = getTriggerState(dropdown.open, disabled, hasError)

        const valueLabelMap = useMemo(() => getValueLabelMap(items), [items])
        const selectionTagText = getSelectionTagText(
            selectionTagType,
            selectedValues,
            valueLabelMap
        )

        const contentTokens = useMemo(
            () => getMultiSelectContentTokens(tokens, size, variant),
            [tokens, size, variant]
        )

        const itemTokens = useMemo(
            () => getMultiSelectItemTokens(tokens),
            [tokens]
        )

        const enableSearch = search?.show ?? false

        const filteredGroups = useMemo(() => {
            if (!enableSearch || !searchText) return items
            return filterMultiSelectV2MenuGroups(items, searchText)
        }, [items, enableSearch, searchText])

        const adapterGroups = useMemo(
            () =>
                flattenMultiSelectGroups(
                    filteredGroups,
                    selectedValues,
                    (adapter) => ({
                        ...adapter,
                        leadingAccessory: (
                            <View pointerEvents="none">
                                <Checkbox
                                    checked={Boolean(adapter.isSelected)}
                                    disabled={Boolean(adapter.disabled)}
                                    size={SelectorV2Size.SM}
                                    accessibilityLabel={adapter.primaryText}
                                />
                            </View>
                        ),
                    })
                ),
            [filteredGroups, selectedValues]
        )

        const flatRows = useMemo(
            () => flattenGroups(adapterGroups),
            [adapterGroups]
        )

        const availableValues = useMemo(
            () => getAllAvailableValues(items),
            [items]
        )
        const { allSelected, someSelected } = getSelectAllState(
            selectedValues,
            availableValues
        )

        const handleItemPress = useCallback(
            (item: unknown) => {
                const msItem = item as { value: string; disabled?: boolean }
                if (isBlocked(selectedValues, msItem.value, maxSelections)) {
                    return
                }
                const nextSelection = toggleSelection(
                    selectedValues,
                    msItem.value
                )
                onSelectionChange?.(nextSelection)
                if (
                    !selectedValues.includes(msItem.value) ||
                    nextSelection.includes(msItem.value)
                ) {
                    // Emit legacy per-item callback only when the item is
                    // being added (matching web's onChange semantics)
                    if (
                        nextSelection.includes(msItem.value) &&
                        !selectedValues.includes(msItem.value)
                    ) {
                        onChange?.(msItem.value)
                    } else if (
                        !nextSelection.includes(msItem.value) &&
                        selectedValues.includes(msItem.value)
                    ) {
                        onChange?.(msItem.value)
                    }
                }
            },
            [selectedValues, maxSelections, onSelectionChange, onChange]
        )

        const handleSelectAllToggle = useCallback(() => {
            const nextSelection = handleSelectAll(
                !allSelected,
                items,
                selectedValues,
                onChange,
                maxSelections
            )
            onSelectionChange?.(nextSelection)
        }, [
            allSelected,
            items,
            selectedValues,
            onChange,
            maxSelections,
            onSelectionChange,
        ])

        const handleClear = useCallback(() => {
            onSelectionChange?.([])
            onClearAllClick?.()
        }, [onSelectionChange, onClearAllClick])

        React.useEffect(() => {
            if (!dropdown.open) setSearchText('')
        }, [dropdown.open])

        const triggerElement = customTrigger ? (
            React.cloneElement(customTrigger, {
                ref: dropdown.anchorRef,
                onPress: dropdown.handleOpen,
            } as React.Attributes)
        ) : (
            <MultiSelectTrigger
                ref={dropdown.anchorRef}
                label={label}
                subLabel={subLabel}
                hintText={hintText}
                required={required}
                placeholder={placeholder}
                selectionTagText={selectionTagText}
                selectedCount={selectedValues.length}
                selectionTagType={selectionTagType}
                size={size}
                variant={variant}
                disabled={disabled}
                state={triggerState}
                error={error}
                tokens={tokens}
                showClearButton={showClearButton}
                testID={testID ? `${testID}-trigger` : undefined}
                accessibilityLabel={accessibilityLabel}
                onPress={dropdown.handleOpen}
                onClear={handleClear}
            />
        )

        const content = (
            <View
                style={{
                    paddingHorizontal: 16,
                    paddingTop: 8,
                    paddingBottom: 8,
                }}
            >
                {enableSelectAll || enableSearch ? (
                    <MultiSelectMenuHeader
                        allSelected={allSelected}
                        someSelected={someSelected}
                        selectAllText={selectAllText}
                        onSelectAllToggle={handleSelectAllToggle}
                        tokens={tokens}
                        searchValue={searchText}
                        onSearchChange={setSearchText}
                        searchPlaceholder={search?.placeholder}
                        enableSearch={enableSearch}
                        testID={testID}
                    />
                ) : null}
                <DropdownList
                    rows={flatRows}
                    itemTokens={itemTokens}
                    separatorColor={String(tokens.menu.item.seperator.color)}
                    separatorHeight={tokens.menu.item.seperator.height}
                    separatorMargin={tokens.menu.item.seperator.margin}
                    labelColor={String(
                        tokens.menu.item.optionsLabel.color.default
                    )}
                    labelFontSize={tokens.menu.item.optionsLabel.fontSize ?? 14}
                    labelFontWeight={
                        tokens.menu.item.optionsLabel.fontWeight ?? '500'
                    }
                    labelPaddingTop={tokens.menu.item.optionsLabel.paddingTop}
                    labelPaddingBottom={
                        tokens.menu.item.optionsLabel.paddingBottom
                    }
                    onItemPress={handleItemPress}
                    enableVirtualization={enableVirtualization}
                    testID={testID ? `${testID}-list` : undefined}
                />
                {showActionButtons ? (
                    <MultiSelectMenuActions
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        tokens={tokens}
                        selectedValues={selectedValues}
                        testID={testID ? `${testID}-actions` : undefined}
                    />
                ) : null}
                {menuFooter ? <Block paddingTop={4}>{menuFooter}</Block> : null}
            </View>
        )

        if (dropdown.shouldUseSheet && dropdown.open) {
            return (
                <View ref={ref} testID={testID}>
                    {triggerElement}
                    <BottomSheet
                        open={dropdown.open}
                        onClose={() => dropdown.setOpen(false)}
                        backgroundColor={contentTokens.backgroundColor}
                        topRadius={16}
                        accessibilityLabel={
                            accessibilityLabel ?? 'Multi-select'
                        }
                        testID={testID ? `${testID}-sheet` : undefined}
                    >
                        {content}
                    </BottomSheet>
                </View>
            )
        }

        return (
            <View ref={ref} testID={testID}>
                {triggerElement}
                <DropdownContent
                    open={dropdown.open}
                    onClose={() => dropdown.setOpen(false)}
                    position={dropdown.position}
                    onContentLayout={dropdown.onContentLayout}
                    tokens={contentTokens}
                    accessibilityLabel={accessibilityLabel ?? 'Multi-select'}
                    testID={testID ? `${testID}-content` : undefined}
                >
                    {content}
                </DropdownContent>
            </View>
        )
    }
)

export default memo(MultiSelect)
MultiSelect.displayName = 'MultiSelect'
