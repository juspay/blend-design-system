import { useCallback, useEffect, useId, useMemo, useRef } from 'react'
import Block from '../Primitives/Block/Block'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import {
    SelectV2Size,
    SelectV2Variant,
} from '../SelectV2/selectV2.shared.types'
import type { SingleSelectV2TokensType } from '../SingleSelectV2/singleSelectV2.tokens.types'
import SingleSelectV2Skeleton from '../SingleSelectV2/SingleSelectV2Skeleton'
import {
    filterSingleSelectV2MenuGroups,
    setupAccessibility,
} from '../SingleSelectV2/utils'
import {
    getFilteredItemsWithCustomValue,
    hasExactMatch,
    hasRenderableSelectItems,
} from '../Select/selectUtils'
import { useSelectSearchController } from '../Select/useSelectSearchController'
import type { VirtualListRef } from '../VirtualList/types'
import { getBaseVirtualViewportHeight } from '../common/virtualViewport'
import type {
    SelectListV2ChromeTokens,
    SelectListV2ItemType,
    SelectListV2Props,
} from './selectListV2.types'
import SelectListV2Rows from './SelectListV2Rows'
import SelectListV2Surface from './SelectListV2Surface'
import { useSelectListNavigation } from './useSelectListNavigation'
import {
    countSelectListV2Options,
    flattenSelectListV2Groups,
    SELECT_LIST_V2_VIRTUALIZE_HINT,
    getSelectListV2FocusTargets,
    warnOnce,
} from './utils'

/**
 * Always-visible single-select list.
 *
 * Same item model, grouping and search contract as `SingleSelectV2`, rendered
 * inline instead of behind a trigger and popover — for filter panels, settings
 * drawers and other surfaces that show every option at once.
 *
 * Semantics are APG listbox with a checkmark indicator, not `radiogroup`:
 * radiogroup mandates selection-follows-focus and composes badly with search,
 * grouping and virtualization, and it would make the inline list look and
 * behave unlike the dropdown built from the same items.
 */
const SelectListV2 = ({
    items,
    selected,
    onSelect,
    allowDeselect = false,
    label,
    name,
    disabled = false,
    size = SelectV2Size.MD,
    variant = SelectV2Variant.CONTAINER,
    search,
    maxHeight,
    enableVirtualization,
    virtualListItemHeight = 58,
    virtualListOverscan = 5,
    onEndReached,
    endReachedThreshold,
    hasMore,
    isLoadingMore = false,
    loadingComponent,
    skeleton,
    allowCustomValue = false,
    customValueLabel = 'Specify',
    'aria-label': ariaLabel,
}: SelectListV2Props) => {
    const tokens =
        useResponsiveTokens<SingleSelectV2TokensType>('SINGLE_SELECT_V2')

    const generatedId = useId()
    const { uniqueName, labelId } = setupAccessibility({
        name,
        generatedId,
        label,
        prefix: 'selectlistv2',
    })
    const listId = `${uniqueName}-list`

    if (!label && !ariaLabel) {
        warnOnce(
            'selectlistv2-unnamed',
            '[Blend] SelectListV2 has neither `label` nor `aria-label`, so its listbox is unnamed. Provide one.'
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
    const previousSearchTextRef = useRef(searchText)

    const hasMatch = useMemo(
        () => hasExactMatch(valueForSearchBehavior, items),
        [valueForSearchBehavior, items]
    )

    const filteredItems = useMemo(() => {
        const base =
            shouldFilterInternally && searchText
                ? filterSingleSelectV2MenuGroups(items, searchText)
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
    const shouldVirtualize =
        enableVirtualization ?? optionCount > SELECT_LIST_V2_VIRTUALIZE_HINT
    const effectiveMaxHeight = maxHeight ?? 320

    useEffect(() => {
        if (shouldVirtualize && previousSearchTextRef.current !== searchText) {
            virtualListRef.current?.scrollTo(0)
        }
        previousSearchTextRef.current = searchText
    }, [shouldVirtualize, searchText])

    if (
        enableVirtualization === false &&
        optionCount > SELECT_LIST_V2_VIRTUALIZE_HINT
    ) {
        warnOnce(
            'selectlistv2-unvirtualized',
            `[Blend] SelectListV2 is rendering ${optionCount} options without enableVirtualization. ` +
                'Every row mounts its own ResizeObserver, so lists this long will stutter. ' +
                'Set enableVirtualization and a maxHeight.'
        )
    }

    const isItemDisabled = useCallback(
        (item: SelectListV2ItemType) => Boolean(disabled || item.disabled),
        [disabled]
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
            if (allowDeselect && selected === value) {
                onSelect('')
                return
            }
            onSelect(value)
        },
        [allowDeselect, onSelect, selected]
    )

    const handleTypeahead = useCallback(
        (key: string) => {
            searchInputRef.current?.focus()
            dispatchUserValue((previous) => previous + key)
        },
        [dispatchUserValue]
    )

    const { activeItemIndex, getItemRef, handleKeyDown, focusFirstItem } =
        useSelectListNavigation({
            targets: focusTargets,
            virtualListRef: shouldVirtualize ? virtualListRef : undefined,
            onTypeahead: isSearchEnabled ? handleTypeahead : undefined,
        })

    const chrome: SelectListV2ChromeTokens = useMemo(
        () => ({
            itemTokens: tokens.menu.item,
            groupLabel: {
                fontSize: tokens.menu.item.groupLabelText.fontSize,
                fontWeight: tokens.menu.item.groupLabelText.fontWeight,
                color: tokens.menu.item.groupLabelText.color.default,
                paddingTop: tokens.menu.groupLabel.paddingTop,
                paddingRight: tokens.menu.groupLabel.paddingRight,
                paddingBottom: tokens.menu.groupLabel.paddingBottom,
                paddingLeft: tokens.menu.groupLabel.paddingLeft,
            },
            separator: tokens.menu.item.separator,
            listPadding: tokens.menu.padding[size][variant],
            emptyStateColor: tokens.menu.item.groupLabelText.color.default,
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

    const virtualization = shouldVirtualize
        ? {
              height: getBaseVirtualViewportHeight(effectiveMaxHeight),
              itemHeight: virtualListItemHeight,
              overscan: virtualListOverscan,
              listRef: virtualListRef,
              onEndReached,
              endReachedThreshold,
              hasMore,
              isLoadingMore,
              paginationKey: `${searchText}:${rows.length}`,
          }
        : undefined

    return (
        <Block
            data-select-list="single"
            data-status={disabled ? 'disabled' : 'enabled'}
            display="flex"
            flexDirection="column"
            width="100%"
            minWidth={0}
            gap={tokens.gap}
        >
            {label && (
                <InputLabels label={label} labelId={labelId} tokens={tokens} />
            )}

            <SelectListV2Surface
                listId={listId}
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
                        <SingleSelectV2Skeleton
                            singleSelectTokens={tokens}
                            skeleton={skeleton}
                        />
                    ) : undefined
                }
                maxHeight={virtualization ? undefined : effectiveMaxHeight}
                onListKeyDown={handleKeyDown}
                paginationKey={`${searchText}:${rows.length}`}
                isLoadingMore={isLoadingMore}
                {...(virtualization
                    ? {}
                    : {
                          onEndReached,
                          endReachedThreshold,
                          hasMore,
                          isLoadingMore,
                          loadingComponent,
                      })}
            >
                <SelectListV2Rows
                    rows={rows}
                    chrome={chrome}
                    mode="single"
                    selectedValues={selected ? [selected] : []}
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

SelectListV2.displayName = 'SelectListV2'

export default SelectListV2
