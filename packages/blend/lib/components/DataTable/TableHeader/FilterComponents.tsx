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
import { foundationToken } from '../../../foundationToken'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import { Popover } from '../../Popover'
import MobileFilterDrawer from './MobileFilterDrawer'
import { Checkbox } from '../../Checkbox'
import { CheckboxSize } from '../../Checkbox/types'

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
}

export const SortOptions: React.FC<{
    fieldKey: string
    tableToken: TableTokenType
    sortHandlers: SortHandlers
    sortState: SortState
}> = ({ fieldKey, tableToken, sortHandlers, sortState }) => {
    const isCurrentField = sortState.currentSortField === fieldKey
    const currentDirection = isCurrentField
        ? sortState.currentSortDirection
        : SortDirection.NONE

    const isAscendingActive = currentDirection === SortDirection.ASCENDING
    const isDescendingActive = currentDirection === SortDirection.DESCENDING

    return (
        <Block
            display="flex"
            flexDirection="column"
            paddingBottom={foundationToken.spacing[2]}
        >
            <Block
                display="flex"
                alignItems="center"
                gap={tableToken.dataTable.table.header.filter.itemGap}
                padding={
                    tableToken.dataTable.table.header.filter.sortOption.padding
                }
                borderRadius={
                    tableToken.dataTable.table.header.filter.sortOption
                        .borderRadius
                }
                cursor="pointer"
                backgroundColor={
                    isAscendingActive
                        ? tableToken.dataTable.table.header.filter.sortOption
                              .hoverBackground
                        : 'transparent'
                }
                _hover={{
                    backgroundColor:
                        tableToken.dataTable.table.header.filter.sortOption
                            .hoverBackground,
                }}
                onClick={() => sortHandlers.handleSortAscending(fieldKey)}
                _focus={{ outline: 'none' }}
                _focusVisible={{ outline: 'none' }}
            >
                <ArrowUp
                    size={FOUNDATION_THEME.unit[16]}
                    color={
                        tableToken.dataTable.table.header.filter.sortOption
                            .iconColor
                    }
                />
                <PrimitiveText
                    style={{
                        fontSize:
                            tableToken.dataTable.table.header.filter.sortOption
                                .fontSize,
                        color: tableToken.dataTable.table.header.filter
                            .sortOption.textColor,
                        fontWeight:
                            tableToken.dataTable.table.header.filter.sortOption
                                .fontWeight,
                        flexGrow: 1,
                    }}
                >
                    Sort Ascending
                </PrimitiveText>
                {isAscendingActive && (
                    <Check
                        size={FOUNDATION_THEME.unit[16]}
                        color={FOUNDATION_THEME.colors.gray[900]}
                    />
                )}
            </Block>
            <Block
                display="flex"
                alignItems="center"
                gap={tableToken.dataTable.table.header.filter.itemGap}
                padding={
                    tableToken.dataTable.table.header.filter.sortOption.padding
                }
                borderRadius={
                    tableToken.dataTable.table.header.filter.sortOption
                        .borderRadius
                }
                cursor="pointer"
                backgroundColor={
                    isDescendingActive
                        ? tableToken.dataTable.table.header.filter.sortOption
                              .hoverBackground
                        : 'transparent'
                }
                _hover={{
                    backgroundColor:
                        tableToken.dataTable.table.header.filter.sortOption
                            .hoverBackground,
                }}
                onClick={() => sortHandlers.handleSortDescending(fieldKey)}
            >
                <ArrowDown
                    size={FOUNDATION_THEME.unit[16]}
                    color={
                        tableToken.dataTable.table.header.filter.sortOption
                            .iconColor
                    }
                />
                <PrimitiveText
                    style={{
                        fontSize:
                            tableToken.dataTable.table.header.filter.sortOption
                                .fontSize,
                        color: tableToken.dataTable.table.header.filter
                            .sortOption.textColor,
                        fontWeight:
                            tableToken.dataTable.table.header.filter.sortOption
                                .fontWeight,
                        flexGrow: 1,
                    }}
                >
                    Sort Descending
                </PrimitiveText>
                {isDescendingActive && (
                    <Check
                        size={FOUNDATION_THEME.unit[16]}
                        color={FOUNDATION_THEME.colors.green[900]}
                    />
                )}
            </Block>
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

    return (
        <Block
            display="flex"
            flexDirection="column"
            maxHeight={tableToken.dataTable.table.header.filter.maxHeight}
            overflowY={tableToken.dataTable.table.header.filter.overflowY}
            marginTop={FOUNDATION_THEME.unit[2]}
        >
            {menuItems.map((group) =>
                filterItemsBySearch(
                    group.items,
                    filterState.columnSearchValues[fieldKey] || ''
                ).map((item) => {
                    const selectedValues =
                        filterState.columnSelectedValues[fieldKey]
                    const currentSelected = Array.isArray(selectedValues)
                        ? selectedValues[0]
                        : typeof selectedValues === 'string'
                          ? selectedValues
                          : ''

                    const isSelected = currentSelected === item.value

                    return (
                        <Block
                            key={item.value}
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
                                    item.value,
                                    onColumnFilter
                                )
                                onPopoverClose?.()
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
                                {item.label}
                            </PrimitiveText>
                            <Checkbox
                                checked={isSelected}
                                size={CheckboxSize.SMALL}
                            />
                        </Block>
                    )
                })
            )}
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

    return (
        <Block
            display="flex"
            flexDirection="column"
            maxHeight={tableToken.dataTable.table.header.filter.maxHeight}
            overflowY={tableToken.dataTable.table.header.filter.overflowY}
            marginTop={FOUNDATION_THEME.unit[2]}
        >
            {menuItems.map((group) =>
                filterItemsBySearch(
                    group.items,
                    filterState.columnSearchValues[fieldKey] || ''
                ).map((item) => {
                    const selectedValues =
                        filterState.columnSelectedValues[fieldKey]
                    const currentSelected = Array.isArray(selectedValues)
                        ? selectedValues
                        : []

                    const isSelected = currentSelected.includes(item.value)

                    return (
                        <Block
                            key={item.value}
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
                                    item.value,
                                    onColumnFilter
                                )
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
                                {item.label}
                            </PrimitiveText>
                            <Checkbox
                                checked={isSelected}
                                size={CheckboxSize.SMALL}
                            />
                        </Block>
                    )
                })
            )}
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
}) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isMobile = breakPointLabel === 'sm'
    const columnConfig = getColumnTypeConfig(column.type || ColumnType.TEXT)
    const fieldKey = String(column.field)
    const [nestedFilterOpen, setNestedFilterOpen] = useState(false)
    const hasFiltering = columnConfig.supportsFiltering

    const isSortingEnabled =
        columnConfig.supportsSorting && column.isSortable !== false
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
            display="flex"
            flexDirection="column"
            gap={FOUNDATION_THEME.unit[0]}
            padding={FOUNDATION_THEME.unit[4]}
            _focus={{ outline: 'none' }}
            _focusVisible={{ outline: 'none' }}
        >
            {isSortingEnabled && (
                <SortOptions
                    fieldKey={fieldKey}
                    tableToken={tableToken}
                    sortHandlers={sortHandlers}
                    sortState={sortState}
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
                    zIndex={1001}
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
                        padding={`${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[0]}`}
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
