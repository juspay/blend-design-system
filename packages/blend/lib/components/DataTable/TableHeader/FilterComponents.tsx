import React, { useState, useEffect, useRef } from 'react'
import { ArrowUp, ArrowDown, Search, ChevronRight, Check } from 'lucide-react'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { SearchInput } from '../../Inputs/SearchInput'
import Slider from '../../Slider/Slider'
import { SliderSize, SliderValueType } from '../../Slider/types'
import {
    ColumnDefinition,
    ColumnType,
    FilterType,
    SortDirection,
} from '../types'
import { getColumnTypeConfig } from '../columnTypes'
import { TableTokenType } from '../dataTable.tokens'
import {
    SortHandlers,
    FilterHandlers,
    FilterState,
    ColumnFilterHandler,
    SortState,
} from './handlers'
import {
    getSelectMenuItems,
    getMultiSelectMenuItems,
    filterItemsBySearch,
} from './utils'
import { FOUNDATION_THEME } from '../../../tokens'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import { Popover } from '../../Popover'
import MobileFilterDrawer from './MobileFilterDrawer'
import { Checkbox } from '../../Checkbox'
import { CheckboxSize } from '../../Checkbox/types'
import { VirtualList, VirtualListItem } from '../../VirtualList'

type FilterComponentsProps = {
    column: ColumnDefinition<Record<string, unknown>>
    data?: Record<string, unknown>[]
    tableToken: TableTokenType
    sortHandlers: SortHandlers
    filterHandlers: FilterHandlers
    filterState: FilterState
    sortState: SortState
    onColumnFilter?: ColumnFilterHandler
    onPopoverClose?: () => void
    onFilterApplied?: () => void
}

export const SortOptions: React.FC<{
    column: ColumnDefinition<Record<string, unknown>>
    fieldKey: string
    tableToken: TableTokenType
    sortHandlers: SortHandlers
    sortState: SortState
    onFilterApplied?: () => void
    onPopoverClose?: () => void
}> = ({
    column,
    fieldKey,
    tableToken,
    sortHandlers,
    sortState,
    onFilterApplied,
    onPopoverClose,
}) => {
    const hasDeltaSort =
        column.isDeltaSortable === true && !!column.getSortField
    const isCurrentField = sortState.currentSortField === fieldKey
    const currentDirection = isCurrentField
        ? sortState.currentSortDirection
        : SortDirection.NONE
    const currentSortType = sortState.currentSortType

    const isPrimaryAscendingActive =
        isCurrentField &&
        currentDirection === SortDirection.ASCENDING &&
        (!currentSortType || currentSortType === 'primary')
    const isPrimaryDescendingActive =
        isCurrentField &&
        currentDirection === SortDirection.DESCENDING &&
        (!currentSortType || currentSortType === 'primary')
    const isDeltaAscendingActive =
        isCurrentField &&
        currentDirection === SortDirection.ASCENDING &&
        currentSortType === 'delta'
    const isDeltaDescendingActive =
        isCurrentField &&
        currentDirection === SortDirection.DESCENDING &&
        currentSortType === 'delta'

    const renderSortOption = (
        icon: React.ReactNode,
        label: string,
        onClick: () => void,
        isActive: boolean,
        checkColor?: string
    ) => (
        <Block
            display="flex"
            alignItems="center"
            gap={tableToken.dataTable.table.header.filter.itemGap}
            padding={
                tableToken.dataTable.table.header.filter.sortOption.padding
            }
            borderRadius={
                tableToken.dataTable.table.header.filter.sortOption.borderRadius
            }
            cursor="pointer"
            backgroundColor={
                isActive
                    ? tableToken.dataTable.table.header.filter.sortOption
                          .hoverBackground
                    : 'transparent'
            }
            _hover={{
                backgroundColor:
                    tableToken.dataTable.table.header.filter.sortOption
                        .hoverBackground,
            }}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    onClick()
                }
            }}
            tabIndex={0}
            role="menuitem"
            _focus={{ outline: 'none' }}
            _focusVisible={{
                outline: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
                outlineOffset: '2px',
            }}
        >
            {icon}
            <PrimitiveText
                style={{
                    fontSize:
                        tableToken.dataTable.table.header.filter.sortOption
                            .fontSize,
                    color: tableToken.dataTable.table.header.filter.sortOption
                        .textColor,
                    fontWeight:
                        tableToken.dataTable.table.header.filter.sortOption
                            .fontWeight,
                    flexGrow: 1,
                }}
            >
                {label}
            </PrimitiveText>
            {isActive && (
                <Check
                    size={FOUNDATION_THEME.unit[16]}
                    color={checkColor || FOUNDATION_THEME.colors.gray[900]}
                />
            )}
        </Block>
    )

    return (
        <Block
            display="flex"
            flexDirection="column"
            paddingBottom={FOUNDATION_THEME.unit[2]}
            role="menu"
        >
            <Block
                display="flex"
                flexDirection="column"
                gap={FOUNDATION_THEME.unit[2]}
            >
                {hasDeltaSort && (
                    <PrimitiveText
                        style={{
                            fontSize:
                                tableToken.dataTable.table.header.filter
                                    .groupLabelFontSize,
                            color: tableToken.dataTable.table.header.filter
                                .groupLabelColor,
                            fontWeight: 600,
                            padding: `${FOUNDATION_THEME.unit[4]} ${tableToken.dataTable.table.header.filter.sortOption.padding}`,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                        }}
                    >
                        Value
                    </PrimitiveText>
                )}
                {renderSortOption(
                    <ArrowUp
                        size={FOUNDATION_THEME.unit[16]}
                        color={
                            tableToken.dataTable.table.header.filter.sortOption
                                .iconColor
                        }
                    />,
                    'Sort Ascending',
                    () => {
                        sortHandlers.handleSortAscending(fieldKey, 'primary')
                        onFilterApplied?.()
                        onPopoverClose?.()
                    },
                    isPrimaryAscendingActive,
                    FOUNDATION_THEME.colors.gray[900]
                )}
                {renderSortOption(
                    <ArrowDown
                        size={FOUNDATION_THEME.unit[16]}
                        color={
                            tableToken.dataTable.table.header.filter.sortOption
                                .iconColor
                        }
                    />,
                    'Sort Descending',
                    () => {
                        sortHandlers.handleSortDescending(fieldKey, 'primary')
                        onFilterApplied?.()
                        onPopoverClose?.()
                    },
                    isPrimaryDescendingActive,
                    FOUNDATION_THEME.colors.green[900]
                )}
            </Block>
            {hasDeltaSort && (
                <>
                    <Block
                        height="1px"
                        backgroundColor={FOUNDATION_THEME.colors.gray[200]}
                        marginY={FOUNDATION_THEME.unit[4]}
                    />
                    <Block
                        display="flex"
                        flexDirection="column"
                        gap={FOUNDATION_THEME.unit[2]}
                    >
                        <PrimitiveText
                            style={{
                                fontSize:
                                    tableToken.dataTable.table.header.filter
                                        .groupLabelFontSize,
                                color: tableToken.dataTable.table.header.filter
                                    .groupLabelColor,
                                fontWeight: 600,
                                padding: `${FOUNDATION_THEME.unit[4]} ${tableToken.dataTable.table.header.filter.sortOption.padding}`,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                            }}
                        >
                            Delta
                        </PrimitiveText>
                        {renderSortOption(
                            <ArrowUp
                                size={FOUNDATION_THEME.unit[16]}
                                color={
                                    tableToken.dataTable.table.header.filter
                                        .sortOption.iconColor
                                }
                            />,
                            'Sort Ascending',
                            () => {
                                sortHandlers.handleSortAscending(
                                    fieldKey,
                                    'delta'
                                )
                                onFilterApplied?.()
                                onPopoverClose?.()
                            },
                            isDeltaAscendingActive,
                            FOUNDATION_THEME.colors.gray[900]
                        )}
                        {renderSortOption(
                            <ArrowDown
                                size={FOUNDATION_THEME.unit[16]}
                                color={
                                    tableToken.dataTable.table.header.filter
                                        .sortOption.iconColor
                                }
                            />,
                            'Sort Descending',
                            () => {
                                sortHandlers.handleSortDescending(
                                    fieldKey,
                                    'delta'
                                )
                                onFilterApplied?.()
                                onPopoverClose?.()
                            },
                            isDeltaDescendingActive,
                            FOUNDATION_THEME.colors.green[900]
                        )}
                    </Block>
                </>
            )}
        </Block>
    )
}

export const DropdownSearchSection: React.FC<{
    column: ColumnDefinition<Record<string, unknown>>
    fieldKey: string
    tableToken: TableTokenType
    filterHandlers: FilterHandlers
    filterState: FilterState
}> = ({ fieldKey, tableToken, filterHandlers, filterState }) => (
    <Block>
        <SearchInput
            placeholder={`Search`}
            value={filterState.columnSearchValues[fieldKey] || ''}
            leftSlot={
                <Search
                    size={FOUNDATION_THEME.unit[16]}
                    color={
                        tableToken.dataTable.table.header.filter.sortOption
                            .iconColor
                    }
                />
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value
                filterHandlers.handleSearchChange(fieldKey, value)
            }}
        />
    </Block>
)

export const Separator: React.FC<{ tableToken: TableTokenType }> = ({
    tableToken,
}) => (
    <Block
        height={FOUNDATION_THEME.unit[1]}
        backgroundColor={
            tableToken.dataTable.table.header.filter.separatorColor
        }
    />
)

export const SingleSelectItems: React.FC<{
    column: ColumnDefinition<Record<string, unknown>>
    fieldKey: string
    tableToken: TableTokenType
    filterHandlers: FilterHandlers
    filterState: FilterState
    data?: Record<string, unknown>[]
    onColumnFilter?: ColumnFilterHandler
    onPopoverClose?: () => void
}> = ({
    column,
    fieldKey,
    tableToken,
    filterHandlers,
    filterState,
    data,
    onColumnFilter,
    onPopoverClose,
}) => {
    const menuItems = getSelectMenuItems(column, data)
    const filterSearch = menuItems.map((group) =>
        filterItemsBySearch(
            group.items,
            filterState.columnSearchValues[fieldKey] || ''
        )
    )
    const items: VirtualListItem[] = filterSearch[0].map(
        (item: { label: string; value: string }) => ({
            id: item.value,
            label: item.label,
            value: item.value,
        })
    )

    return (
        <Block
            display="flex"
            flexDirection="column"
            maxHeight={tableToken.dataTable.table.header.filter.maxHeight}
            overflowY={tableToken.dataTable.table.header.filter.overflowY}
            marginTop={FOUNDATION_THEME.unit[2]}
            padding={`${FOUNDATION_THEME.unit[0]} ${FOUNDATION_THEME.unit[4]}`}
        >
            <VirtualList
                items={items}
                height={400}
                itemHeight={60}
                overscan={5}
                renderItem={({ item }) => {
                    const value = item.value as string
                    const label = item.label as React.ReactNode
                    const selectedValues =
                        filterState.columnSelectedValues[fieldKey]
                    const currentSelected = Array.isArray(selectedValues)
                        ? selectedValues[0]
                        : typeof selectedValues === 'string'
                          ? selectedValues
                          : ''

                    const isSelected = currentSelected === value

                    return (
                        <Block
                            key={value}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            padding={
                                tableToken.dataTable.table.header.filter
                                    .sortOption.padding
                            }
                            borderRadius={
                                tableToken.dataTable.table.header.filter
                                    .sortOption.borderRadius
                            }
                            cursor="pointer"
                            backgroundColor={
                                isSelected
                                    ? tableToken.dataTable.table.header.filter
                                          .sortOption.hoverBackground
                                    : 'transparent'
                            }
                            _hover={{
                                backgroundColor:
                                    tableToken.dataTable.table.header.filter
                                        .sortOption.hoverBackground,
                            }}
                            onClick={() => {
                                filterHandlers.handleSelectFilter(
                                    column,
                                    fieldKey,
                                    value,
                                    onColumnFilter
                                )
                                onPopoverClose?.()
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    filterHandlers.handleSelectFilter(
                                        column,
                                        fieldKey,
                                        value,
                                        onColumnFilter
                                    )
                                    onPopoverClose?.()
                                }
                            }}
                            tabIndex={0}
                            role="menuitemradio"
                            aria-checked={isSelected}
                            _focus={{ outline: 'none' }}
                            _focusVisible={{
                                outline: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
                                outlineOffset: '2px',
                            }}
                        >
                            <PrimitiveText
                                style={{
                                    fontSize:
                                        tableToken.dataTable.table.header.filter
                                            .sortOption.fontSize,
                                    color: tableToken.dataTable.table.header
                                        .filter.sortOption.textColor,
                                    fontWeight:
                                        tableToken.dataTable.table.header.filter
                                            .sortOption.fontWeight,
                                    flexGrow: 1,
                                }}
                            >
                                {label}
                            </PrimitiveText>
                            {isSelected && (
                                <Check
                                    size={FOUNDATION_THEME.unit[16]}
                                    color={FOUNDATION_THEME.colors.gray[600]}
                                />
                            )}
                        </Block>
                    )
                }}
            />
        </Block>
    )
}

export const MultiSelectItems: React.FC<{
    column: ColumnDefinition<Record<string, unknown>>
    fieldKey: string
    tableToken: TableTokenType
    filterHandlers: FilterHandlers
    filterState: FilterState
    data?: Record<string, unknown>[]
    onColumnFilter?: ColumnFilterHandler
}> = ({
    column,
    fieldKey,
    tableToken,
    filterHandlers,
    filterState,
    data,
    onColumnFilter,
}) => {
    const menuItems = getMultiSelectMenuItems(column, data)
    const filterSearch = menuItems.map((group) =>
        filterItemsBySearch(
            group.items,
            filterState.columnSearchValues[fieldKey] || ''
        )
    )
    const items: VirtualListItem[] = filterSearch[0].map(
        (item: { label: string; value: string }) => ({
            id: item.value,
            label: item.label,
            value: item.value,
        })
    )

    return (
        <Block
            display="flex"
            flexDirection="column"
            maxHeight={tableToken.dataTable.table.header.filter.maxHeight}
            overflowY={tableToken.dataTable.table.header.filter.overflowY}
            marginTop={FOUNDATION_THEME.unit[2]}
        >
            <VirtualList
                items={items}
                height={400}
                itemHeight={60}
                overscan={5}
                renderItem={({ item }) => {
                    const value = item.value as string
                    const label = item.label as React.ReactNode
                    const selectedValues =
                        filterState.columnSelectedValues[fieldKey]
                    const currentSelected = Array.isArray(selectedValues)
                        ? selectedValues
                        : []

                    const isSelected = currentSelected.includes(value)

                    return (
                        <Block
                            key={value}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            padding={
                                tableToken.dataTable.table.header.filter
                                    .sortOption.padding
                            }
                            borderRadius={
                                tableToken.dataTable.table.header.filter
                                    .sortOption.borderRadius
                            }
                            cursor="pointer"
                            backgroundColor={
                                isSelected
                                    ? tableToken.dataTable.table.header.filter
                                          .sortOption.hoverBackground
                                    : 'transparent'
                            }
                            _hover={{
                                backgroundColor:
                                    tableToken.dataTable.table.header.filter
                                        .sortOption.hoverBackground,
                            }}
                            onClick={() => {
                                filterHandlers.handleMultiSelectFilter(
                                    column,
                                    fieldKey,
                                    value,
                                    onColumnFilter
                                )
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    filterHandlers.handleMultiSelectFilter(
                                        column,
                                        fieldKey,
                                        value,
                                        onColumnFilter
                                    )
                                }
                            }}
                            tabIndex={0}
                            role="menuitemcheckbox"
                            aria-checked={isSelected}
                            _focus={{ outline: 'none' }}
                            _focusVisible={{
                                outline: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
                                outlineOffset: '2px',
                            }}
                        >
                            <PrimitiveText
                                style={{
                                    fontSize:
                                        tableToken.dataTable.table.header.filter
                                            .sortOption.fontSize,
                                    color: tableToken.dataTable.table.header
                                        .filter.sortOption.textColor,
                                    fontWeight:
                                        tableToken.dataTable.table.header.filter
                                            .sortOption.fontWeight,
                                    flexGrow: 1,
                                }}
                            >
                                {label}
                            </PrimitiveText>
                            <Checkbox
                                checked={isSelected}
                                size={CheckboxSize.SMALL}
                            />
                        </Block>
                    )
                }}
            />
        </Block>
    )
}

export const SliderFilter: React.FC<{
    column: ColumnDefinition<Record<string, unknown>>
    fieldKey: string
    tableToken: TableTokenType
    filterHandlers: FilterHandlers
    filterState: FilterState
    data?: Record<string, unknown>[]
    onColumnFilter?: ColumnFilterHandler
}> = ({ column, fieldKey, tableToken, filterState, data, onColumnFilter }) => {
    const sliderColumn = column as ColumnDefinition<Record<string, unknown>> & {
        sliderConfig?: {
            min: number
            max: number
            step?: number
            valueType?: string
            prefix?: string
            suffix?: string
            decimalPlaces?: number
        }
    }
    const sliderConfig = sliderColumn.sliderConfig

    const dataValues =
        data
            ?.map((row) => {
                const value = row[column.field]
                return typeof value === 'number'
                    ? value
                    : parseFloat(String(value)) || 0
            })
            .filter((val) => !isNaN(val)) || []

    const dataMin = dataValues.length > 0 ? Math.min(...dataValues) : 0
    const dataMax = dataValues.length > 0 ? Math.max(...dataValues) : 100

    const min = sliderConfig?.min ?? dataMin
    const max = sliderConfig?.max ?? dataMax
    const step = sliderConfig?.step ?? 1

    const currentFilter = filterState.columnSelectedValues[fieldKey]
    const isRangeFilter =
        currentFilter &&
        typeof currentFilter === 'object' &&
        'min' in currentFilter &&
        'max' in currentFilter

    const currentMin =
        isRangeFilter && typeof currentFilter.min === 'number'
            ? currentFilter.min
            : min
    const currentMax =
        isRangeFilter && typeof currentFilter.max === 'number'
            ? currentFilter.max
            : max

    const validCurrentMin = Math.max(min, Math.min(max, currentMin))
    const validCurrentMax = Math.max(min, Math.min(max, currentMax))

    const [localValue, setLocalValue] = useState<[number, number]>([
        validCurrentMin,
        validCurrentMax,
    ])
    const debounceRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        setLocalValue([validCurrentMin, validCurrentMax])
    }, [validCurrentMin, validCurrentMax])

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
        }
    }, [])

    const debouncedFilterUpdate = (values: [number, number]) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(() => {
            const filterValue = { min: values[0], max: values[1] }
            if (onColumnFilter) {
                onColumnFilter(
                    fieldKey,
                    FilterType.SLIDER,
                    filterValue,
                    'range'
                )
            }
        }, 300)
    }

    if (!sliderConfig) {
        return (
            <Block
                display="flex"
                flexDirection="column"
                gap={tableToken.dataTable.table.header.filter.gap}
                padding={`${FOUNDATION_THEME.unit[0]} ${FOUNDATION_THEME.unit[8]}`}
            >
                <PrimitiveText
                    style={{
                        fontSize:
                            tableToken.dataTable.table.header.filter
                                .groupLabelFontSize,
                        color: tableToken.dataTable.table.header.filter
                            .groupLabelColor,
                    }}
                >
                    Slider configuration missing
                </PrimitiveText>
            </Block>
        )
    }

    const handleSliderChange = (values: number[]) => {
        const [newMin, newMax] = values
        const newValue: [number, number] = [newMin, newMax]

        setLocalValue(newValue)

        debouncedFilterUpdate(newValue)
    }

    const getValueType = (): SliderValueType => {
        switch (sliderConfig.valueType) {
            case 'percentage':
                return SliderValueType.PERCENTAGE
            case 'decimal':
                return SliderValueType.DECIMAL
            default:
                return SliderValueType.NUMBER
        }
    }

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={tableToken.dataTable.table.header.filter.gap}
            padding={`${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[8]}`}
        >
            <PrimitiveText
                style={{
                    fontSize:
                        tableToken.dataTable.table.header.filter
                            .groupLabelFontSize,
                    color: tableToken.dataTable.table.header.filter
                        .groupLabelColor,
                    fontWeight:
                        tableToken.dataTable.table.header.filter
                            .groupLabelFontWeight,
                    textTransform:
                        tableToken.dataTable.table.header.filter
                            .groupLabelTextTransform,
                    marginBottom: FOUNDATION_THEME.unit[8],
                }}
            >
                Filter by Range
            </PrimitiveText>

            <Block
                display="flex"
                flexDirection="column"
                gap={FOUNDATION_THEME.unit[8]}
            >
                <Block
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <PrimitiveText
                        style={{
                            fontSize:
                                tableToken.dataTable.table.header.filter
                                    .itemFontSize,
                            color: tableToken.dataTable.table.header.filter
                                .normalTextColor,
                        }}
                    >
                        {sliderConfig.prefix || ''}
                        {localValue[0]}
                        {sliderConfig.suffix || ''}
                    </PrimitiveText>
                    <PrimitiveText
                        style={{
                            fontSize:
                                tableToken.dataTable.table.header.filter
                                    .itemFontSize,
                            color: tableToken.dataTable.table.header.filter
                                .normalTextColor,
                        }}
                    >
                        {sliderConfig.prefix || ''}
                        {localValue[1]}
                        {sliderConfig.suffix || ''}
                    </PrimitiveText>
                </Block>

                <Slider
                    size={SliderSize.SMALL}
                    min={min}
                    max={max}
                    step={step}
                    value={localValue}
                    onValueChange={handleSliderChange}
                    valueFormat={{
                        type: getValueType(),
                        decimalPlaces: sliderConfig.decimalPlaces || 0,
                        prefix: sliderConfig.prefix || '',
                        suffix: sliderConfig.suffix || '',
                    }}
                    showValueLabels={false}
                />

                <Block
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <PrimitiveText
                        style={{
                            fontSize: '11px',
                            color: tableToken.dataTable.table.header.filter
                                .groupLabelColor,
                        }}
                    >
                        {sliderConfig.prefix || ''}
                        {min}
                        {sliderConfig.suffix || ''}
                    </PrimitiveText>
                    <PrimitiveText
                        style={{
                            fontSize: '11px',
                            color: tableToken.dataTable.table.header.filter
                                .groupLabelColor,
                        }}
                    >
                        {sliderConfig.prefix || ''}
                        {max}
                        {sliderConfig.suffix || ''}
                    </PrimitiveText>
                </Block>
            </Block>
        </Block>
    )
}

export const ColumnFilter: React.FC<FilterComponentsProps> = ({
    column,
    data,
    tableToken,
    sortHandlers,
    filterHandlers,
    filterState,
    sortState,
    onColumnFilter,
    onPopoverClose,
    onFilterApplied,
}) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isMobile = breakPointLabel === 'sm'
    const columnConfig = getColumnTypeConfig(column.type || ColumnType.TEXT)
    const fieldKey = String(column.field)
    const [nestedFilterOpen, setNestedFilterOpen] = useState(false)
    const hasFiltering = columnConfig.supportsFiltering
    const menuRef = useRef<HTMLDivElement>(null)
    const [focusedIndex, setFocusedIndex] = useState<number>(-1)

    const isSortingEnabled =
        columnConfig.supportsSorting && column.isSortable !== false

    // Get all focusable menu items
    const getMenuItems = (): HTMLElement[] => {
        if (!menuRef.current) return []
        return Array.from(
            menuRef.current.querySelectorAll(
                '[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"]'
            )
        ) as HTMLElement[]
    }

    // Handle arrow key navigation
    const handleMenuKeyDown = (e: React.KeyboardEvent) => {
        const items = getMenuItems()
        if (items.length === 0) return

        // Find current focused item index
        const currentFocused = document.activeElement as HTMLElement
        const currentIndex = items.findIndex((item) => item === currentFocused)
        let newIndex = currentIndex >= 0 ? currentIndex : focusedIndex

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                e.stopPropagation()
                newIndex = newIndex < items.length - 1 ? newIndex + 1 : 0
                setFocusedIndex(newIndex)
                items[newIndex]?.focus()
                break
            case 'ArrowUp':
                e.preventDefault()
                e.stopPropagation()
                newIndex = newIndex > 0 ? newIndex - 1 : items.length - 1
                setFocusedIndex(newIndex)
                items[newIndex]?.focus()
                break
            case 'Home':
                e.preventDefault()
                e.stopPropagation()
                setFocusedIndex(0)
                items[0]?.focus()
                break
            case 'End':
                e.preventDefault()
                e.stopPropagation()
                setFocusedIndex(items.length - 1)
                items[items.length - 1]?.focus()
                break
            case 'Escape':
                e.preventDefault()
                e.stopPropagation()
                onPopoverClose?.()
                break
        }
    }

    // Reset focused index when nested filter opens/closes
    useEffect(() => {
        if (nestedFilterOpen) {
            setFocusedIndex(-1)
        }
    }, [nestedFilterOpen])

    // Use mobile component for small screens
    if (isMobile) {
        return (
            <MobileFilterDrawer
                column={column}
                data={data}
                tableToken={tableToken}
                sortHandlers={sortHandlers}
                filterHandlers={filterHandlers}
                filterState={filterState}
                sortState={sortState}
                onColumnFilter={onColumnFilter}
                onPopoverClose={onPopoverClose}
            />
        )
    }

    return (
        <Block
            ref={menuRef}
            display="flex"
            flexDirection="column"
            gap={FOUNDATION_THEME.unit[0]}
            padding={FOUNDATION_THEME.unit[4]}
            onKeyDown={handleMenuKeyDown}
            role="menu"
            _focus={{ outline: 'none' }}
            _focusVisible={{ outline: 'none' }}
        >
            {isSortingEnabled && (
                <SortOptions
                    column={column}
                    fieldKey={fieldKey}
                    tableToken={tableToken}
                    sortHandlers={sortHandlers}
                    sortState={sortState}
                    onFilterApplied={onFilterApplied}
                    onPopoverClose={onPopoverClose}
                />
            )}

            {isSortingEnabled && hasFiltering && (
                <Separator tableToken={tableToken} />
            )}

            {hasFiltering && (
                <Popover
                    trigger={
                        <Block
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            gap={
                                tableToken.dataTable.table.header.filter.itemGap
                            }
                            padding={
                                tableToken.dataTable.table.header.filter
                                    .sortOption.padding
                            }
                            borderRadius={
                                tableToken.dataTable.table.header.filter
                                    .sortOption.borderRadius
                            }
                            cursor="pointer"
                            backgroundColor="transparent"
                            _hover={{
                                backgroundColor:
                                    tableToken.dataTable.table.header.filter
                                        .sortOption.hoverBackground,
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setNestedFilterOpen(!nestedFilterOpen)
                                }
                            }}
                            tabIndex={0}
                            role="menuitem"
                            _focus={{ outline: 'none' }}
                            _focusVisible={{
                                outline: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
                                outlineOffset: '2px',
                            }}
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                gap={
                                    tableToken.dataTable.table.header.filter
                                        .itemGap
                                }
                            >
                                <Search
                                    size={FOUNDATION_THEME.unit[16]}
                                    color={
                                        tableToken.dataTable.table.header.filter
                                            .sortOption.iconColor
                                    }
                                />
                                <PrimitiveText
                                    style={{
                                        fontSize:
                                            tableToken.dataTable.table.header
                                                .filter.sortOption.fontSize,
                                        color: tableToken.dataTable.table.header
                                            .filter.sortOption.textColor,
                                        fontWeight:
                                            tableToken.dataTable.table.header
                                                .filter.sortOption.fontWeight,
                                    }}
                                >
                                    Filter
                                </PrimitiveText>
                            </Block>
                            <ChevronRight
                                size={FOUNDATION_THEME.unit[16]}
                                color={
                                    tableToken.dataTable.table.header.filter
                                        .sortOption.iconColor
                                }
                            />
                        </Block>
                    }
                    maxWidth={220}
                    minWidth={220}
                    side="right"
                    align="start"
                    sideOffset={10}
                    open={nestedFilterOpen}
                    onOpenChange={setNestedFilterOpen}
                >
                    <Block
                        display="flex"
                        flexDirection="column"
                        gap={FOUNDATION_THEME.unit[4]}
                        maxHeight="300px"
                        overflow="auto"
                    >
                        {(columnConfig.filterComponent === 'multiselect' ||
                            columnConfig.filterComponent === 'select') && (
                            <DropdownSearchSection
                                column={column}
                                fieldKey={fieldKey}
                                tableToken={tableToken}
                                filterHandlers={filterHandlers}
                                filterState={filterState}
                            />
                        )}

                        {columnConfig.filterComponent === 'select' && (
                            <SingleSelectItems
                                column={column}
                                fieldKey={fieldKey}
                                tableToken={tableToken}
                                filterHandlers={filterHandlers}
                                filterState={filterState}
                                data={data}
                                onColumnFilter={onColumnFilter}
                                onPopoverClose={() => {
                                    setNestedFilterOpen(false)
                                    onPopoverClose?.()
                                }}
                            />
                        )}

                        {columnConfig.filterComponent === 'multiselect' && (
                            <MultiSelectItems
                                column={column}
                                fieldKey={fieldKey}
                                tableToken={tableToken}
                                filterHandlers={filterHandlers}
                                filterState={filterState}
                                data={data}
                                onColumnFilter={onColumnFilter}
                            />
                        )}

                        {columnConfig.filterComponent === 'slider' && (
                            <SliderFilter
                                column={column}
                                fieldKey={fieldKey}
                                tableToken={tableToken}
                                filterHandlers={filterHandlers}
                                filterState={filterState}
                                data={data}
                                onColumnFilter={onColumnFilter}
                            />
                        )}
                    </Block>
                </Popover>
            )}
        </Block>
    )
}
