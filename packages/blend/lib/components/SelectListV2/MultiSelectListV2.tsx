import { useCallback, useId, useMemo, useRef } from 'react'
import Block from '../Primitives/Block/Block'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import { ButtonV2, ButtonV2Size, ButtonV2SubType } from '../ButtonV2'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import {
    SelectV2Size,
    SelectV2Variant,
} from '../SelectV2/selectV2.shared.types'
import type { MultiSelectV2TokensType } from '../MultiSelectV2/multiSelectV2.tokens.types'
import MultiSelectV2SelectAllItem from '../MultiSelectV2/MultiSelectV2SelectAllItem'
import MultiSelectV2Skeleton from '../MultiSelectV2/MultiSelectV2Skeleton'
import {
    filterMultiSelectV2MenuGroups,
    getAllAvailableValues,
} from '../MultiSelectV2/utils'
import { setupAccessibility } from '../SingleSelectV2/utils'
import {
    getFilteredItemsWithCustomValue,
    hasExactMatch,
    hasRenderableSelectItems,
} from '../Select/selectUtils'
import { useSelectSearchController } from '../Select/useSelectSearchController'
import {
    clampScopeToMaxSelections,
    emitLegacyScopeChanges,
    getNextSelectionAfterToggle,
    getNextSelectionForScope,
    isBlockedByMaxSelections,
} from '../shared/multiSelectSelection'
import type { VirtualListRef } from '../VirtualList/types'
import {
    getBaseVirtualViewportHeight,
    VIRTUAL_DEFAULT_VIEWPORT,
} from '../common/virtualViewport'
import type {
    MultiSelectListV2Props,
    SelectListV2ChromeTokens,
    SelectListV2ItemType,
} from './selectListV2.types'
import SelectListV2Rows from './SelectListV2Rows'
import SelectListV2Surface from './SelectListV2Surface'
import { useSelectListNavigation } from './useSelectListNavigation'
import {
    countSelectListV2Options,
    flattenSelectListV2Groups,
    getSelectListV2FocusTargets,
    warnOnce,
} from './utils'

/**
 * Always-visible multi-select list with APG listbox semantics.
 *
 * Same item model, grouping, search, select-all and max-selection contract as
 * `MultiSelectV2`, rendered inline instead of behind a trigger and popover.
 */
const MultiSelectListV2 = ({
    items,
    selectedValues,
    onChange,
    onSelectionChange,
    label,
    name,
    disabled = false,
    size = SelectV2Size.MD,
    variant = SelectV2Variant.CONTAINER,
    search,
    maxHeight,
    enableVirtualization = false,
    virtualListItemHeight = 48,
    virtualListOverscan = 5,
    onEndReached,
    endReachedThreshold,
    hasMore,
    loadingComponent,
    skeleton,
    allowCustomValue = false,
    customValueLabel = 'Specify',
    enableSelectAll = false,
    selectAllText = 'Select All',
    showClearAll = false,
    clearAllText = 'Clear all',
    onClearAll,
    maxSelections,
    'aria-label': ariaLabel,
}: MultiSelectListV2Props) => {
    const tokens =
        useResponsiveTokens<MultiSelectV2TokensType>('MULTI_SELECT_V2')

    const generatedId = useId()
    const { uniqueName, labelId } = setupAccessibility({
        name,
        generatedId,
        label,
        prefix: 'multiselectlistv2',
    })
    const listId = `${uniqueName}-list`

    if (!label && !ariaLabel) {
        warnOnce(
            'multiselectlistv2-unnamed',
            '[Blend] MultiSelectListV2 has neither `label` nor `aria-label`, so its listbox is unnamed. Provide one.'
        )
    }

    const {
        value: searchText,
        isControlled: isSearchControlled,
        isSearchEnabled,
        shouldFilterInternally,
        valueForSearchBehavior,
        dispatchUserValue,
    } = useSelectSearchController({
        controlledValue: search?.searchText,
        onValueChange: search?.onSearchChange,
        explicitShow: search?.show,
        existingSurfaceDefault: false,
    })
    const searchInputRef = useRef<HTMLInputElement>(null)
    const virtualListRef = useRef<VirtualListRef>(null)

    const hasMatch = useMemo(
        () => hasExactMatch(valueForSearchBehavior, items),
        [valueForSearchBehavior, items]
    )

    const filteredItems = useMemo(() => {
        const base =
            shouldFilterInternally && searchText
                ? filterMultiSelectV2MenuGroups(items, searchText)
                : items
        return getFilteredItemsWithCustomValue(
            base,
            searchText,
            hasMatch,
            allowCustomValue,
            isSearchEnabled && !search?.isSearchLoading,
            customValueLabel
        )
    }, [
        items,
        searchText,
        shouldFilterInternally,
        hasMatch,
        allowCustomValue,
        isSearchEnabled,
        search?.isSearchLoading,
        customValueLabel,
    ])

    const rows = useMemo(
        () => flattenSelectListV2Groups(filteredItems),
        [filteredItems]
    )
    const optionCount = useMemo(() => countSelectListV2Options(rows), [rows])

    const isItemDisabled = useCallback(
        (item: SelectListV2ItemType) => {
            if (disabled || item.disabled || item.alwaysSelected) return true
            return isBlockedByMaxSelections(
                selectedValues,
                item.value,
                maxSelections
            )
        },
        [disabled, maxSelections, selectedValues]
    )

    const focusTargets = useMemo(
        () =>
            getSelectListV2FocusTargets(rows, (row) =>
                isItemDisabled(row.item)
            ),
        [rows, isItemDisabled]
    )

    const handleToggle = useCallback(
        (value: string) => {
            // Disabling the row is not enough on its own: the cap must also be
            // enforced here, or a programmatic/synthetic gesture slips past it.
            if (isBlockedByMaxSelections(selectedValues, value, maxSelections))
                return
            const nextSelection = getNextSelectionAfterToggle(
                selectedValues,
                value
            )
            onChange?.(value)
            onSelectionChange?.(nextSelection)
        },
        [maxSelections, onChange, onSelectionChange, selectedValues]
    )

    // Controlled search hands the caller ownership of `items`, so select-all
    // covers everything provided rather than a locally filtered subset.
    const selectAllScope = isSearchControlled ? items : filteredItems
    const availableValues = useMemo(
        () => getAllAvailableValues(selectAllScope),
        [selectAllScope]
    )

    const handleSelectAll = useCallback(
        (selectAll: boolean) => {
            const scopedValues = selectAll
                ? clampScopeToMaxSelections(
                      selectedValues,
                      availableValues,
                      maxSelections
                  )
                : availableValues
            const nextSelection = getNextSelectionForScope(
                selectedValues,
                scopedValues,
                selectAll
            )
            emitLegacyScopeChanges(
                selectAll,
                scopedValues,
                selectedValues,
                onChange ? (value) => onChange(value) : undefined
            )
            onSelectionChange?.(nextSelection)
        },
        [
            availableValues,
            maxSelections,
            onChange,
            onSelectionChange,
            selectedValues,
        ]
    )

    const handleClearAll = useCallback(() => {
        if (onClearAll) {
            onClearAll()
            return
        }
        emitLegacyScopeChanges(
            false,
            selectedValues,
            selectedValues,
            onChange ? (value) => onChange(value) : undefined
        )
        onSelectionChange?.([])
    }, [onChange, onClearAll, onSelectionChange, selectedValues])

    const handleTypeahead = useCallback(
        (key: string) => {
            searchInputRef.current?.focus()
            dispatchUserValue(searchText + key)
        },
        [dispatchUserValue, searchText]
    )

    const { activeItemIndex, getItemRef, handleKeyDown, focusFirstItem } =
        useSelectListNavigation({
            targets: focusTargets,
            virtualListRef: enableVirtualization ? virtualListRef : undefined,
            onTypeahead: isSearchEnabled ? handleTypeahead : undefined,
        })

    const chrome: SelectListV2ChromeTokens = useMemo(
        () => ({
            itemTokens: tokens.menu.item,
            groupLabel: {
                fontSize: tokens.menu.item.optionsLabel.fontSize,
                fontWeight: tokens.menu.item.optionsLabel.fontWeight,
                color: tokens.menu.item.optionsLabel.color.default,
                paddingTop: tokens.menu.item.optionsLabel.paddingTop,
                paddingRight: tokens.menu.item.optionsLabel.paddingRight,
                paddingBottom: tokens.menu.item.optionsLabel.paddingBottom,
                paddingLeft: tokens.menu.item.optionsLabel.paddingLeft,
            },
            separator: tokens.menu.item.seperator,
            listPadding: tokens.menu.padding[size][variant],
            emptyStateColor: tokens.menu.item.optionsLabel.color.default,
            gap: tokens.gap,
        }),
        [tokens, size, variant]
    )

    const hasSourceItems = isSearchControlled
        ? hasRenderableSelectItems(items)
        : items.length > 0
    const isEmpty = isSearchControlled
        ? !hasRenderableSelectItems(filteredItems)
        : filteredItems.length === 0
    const emptyStateText =
        search?.emptyStateText ||
        (!hasSourceItems ? 'No items available' : 'No results found')

    const virtualization = enableVirtualization
        ? {
              height: maxHeight
                  ? getBaseVirtualViewportHeight(maxHeight)
                  : VIRTUAL_DEFAULT_VIEWPORT,
              itemHeight: virtualListItemHeight,
              overscan: virtualListOverscan,
              listRef: virtualListRef,
              onEndReached,
              endReachedThreshold,
              hasMore,
          }
        : undefined

    const showSelectAllRow = enableSelectAll && availableValues.length > 0
    const header =
        showSelectAllRow || showClearAll ? (
            <Block
                display="flex"
                flexDirection="column"
                borderBottom={tokens.menu.header?.borderBottom}
                paddingLeft={tokens.menu.header?.selectAllRowPaddingLeft}
                paddingRight={tokens.menu.header?.selectAllRowPaddingRight}
            >
                {showSelectAllRow && (
                    <MultiSelectV2SelectAllItem
                        selected={selectedValues}
                        availableValues={availableValues}
                        onSelectAll={handleSelectAll}
                        selectAllText={selectAllText}
                        disabled={disabled}
                        asMenuItem={false}
                    />
                )}
                {showClearAll && (
                    <Block display="flex" justifyContent="flex-end">
                        <ButtonV2
                            type="button"
                            text={clearAllText}
                            size={ButtonV2Size.SMALL}
                            subType={ButtonV2SubType.INLINE}
                            disabled={disabled || selectedValues.length === 0}
                            onClick={handleClearAll}
                        />
                    </Block>
                )}
            </Block>
        ) : undefined

    return (
        <Block
            data-select-list="multi"
            data-status={disabled ? 'disabled' : 'enabled'}
            display="flex"
            flexDirection="column"
            width="100%"
            minWidth={0}
            gap={tokens.gap}
        >
            {label && (
                <InputLabels
                    label={label}
                    name={uniqueName}
                    labelId={labelId}
                    tokens={tokens}
                />
            )}

            <SelectListV2Surface
                listId={listId}
                multiSelectable
                ariaLabelledBy={label ? labelId : undefined}
                ariaLabel={label ? undefined : ariaLabel}
                chrome={chrome}
                showSearch={isSearchEnabled}
                searchPlaceholder={search?.placeholder ?? 'Search options...'}
                searchValue={searchText}
                searchInputRef={searchInputRef}
                onSearchChange={dispatchUserValue}
                onSearchArrowDown={focusFirstItem}
                isSearchControlled={isSearchControlled}
                isSearchLoading={Boolean(
                    isSearchEnabled && search?.isSearchLoading
                )}
                isEmpty={isEmpty}
                emptyStateText={emptyStateText}
                disabled={disabled}
                skeleton={
                    skeleton?.show ? (
                        <MultiSelectV2Skeleton
                            multiSelectTokens={tokens}
                            skeleton={skeleton}
                        />
                    ) : undefined
                }
                header={header}
                maxHeight={virtualization ? undefined : maxHeight}
                onListKeyDown={handleKeyDown}
                {...(virtualization
                    ? {}
                    : {
                          onEndReached,
                          endReachedThreshold,
                          hasMore,
                          loadingComponent,
                      })}
            >
                <SelectListV2Rows
                    rows={rows}
                    chrome={chrome}
                    mode="multi"
                    selectedValues={selectedValues}
                    onToggle={handleToggle}
                    isItemDisabled={isItemDisabled}
                    activeItemIndex={activeItemIndex}
                    getItemRef={getItemRef}
                    optionCount={optionCount}
                    virtualization={virtualization}
                    loadingComponent={loadingComponent}
                />
            </SelectListV2Surface>
        </Block>
    )
}

MultiSelectListV2.displayName = 'MultiSelectListV2'

export default MultiSelectListV2
