import React, { useState, useEffect, useRef } from 'react'
import {
    ArrowUp,
    ArrowDown,
    ListFilter,
    ChevronRight,
    Search,
} from 'lucide-react'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { TextInput } from '../../Inputs/TextInput'
import { Checkbox } from '../../Checkbox'
import { CheckboxSize } from '../../Checkbox/types'
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
import {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
} from '../../Drawer'

type MobileFilterDrawerProps = {
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

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
    column,
    data,
    sortHandlers,
    filterHandlers,
    filterState,
    sortState,
    onColumnFilter,
    onPopoverClose,
}) => {
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

    const columnConfig = getColumnTypeConfig(column.type || ColumnType.TEXT)
    const fieldKey = String(column.field)

    // Check if this column is currently sorted
    const isCurrentField = sortState.currentSortField === fieldKey
    const currentDirection = isCurrentField
        ? sortState.currentSortDirection
        : SortDirection.NONE
    const isAscendingActive = currentDirection === SortDirection.ASCENDING
    const isDescendingActive = currentDirection === SortDirection.DESCENDING

    const handleSortAndClose = (sortFn: () => void) => {
        sortFn()
        onPopoverClose?.()
    }

    const handleOpenFilterDrawer = () => {
        setFilterDrawerOpen(true)
    }

    const handleCloseFilterDrawer = () => {
        setFilterDrawerOpen(false)
    }

    const renderSortItem = (
        icon: React.ReactNode,
        label: string,
        onClick: () => void,
        isActive: boolean = false
    ) => (
        <Block
            display="flex"
            alignItems="center"
            gap={FOUNDATION_THEME.unit[8]}
            padding="14px 20px"
            cursor="pointer"
            backgroundColor={
                isActive ? FOUNDATION_THEME.colors.gray[50] : 'transparent'
            }
            _hover={{
                backgroundColor: FOUNDATION_THEME.colors.gray[50],
            }}
            onClick={onClick}
        >
            {icon}
            <PrimitiveText
                style={{
                    fontSize: 14,
                    color: FOUNDATION_THEME.colors.gray[700],
                    fontWeight: 500,
                }}
            >
                {label}
            </PrimitiveText>
        </Block>
    )

    const renderFilterItem = (
        label: string,
        isSelected: boolean,
        onClick: () => void
    ) => (
        <Block
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="14px 20px"
            cursor="pointer"
            backgroundColor={
                isSelected ? FOUNDATION_THEME.colors.gray[50] : 'transparent'
            }
            _hover={{
                backgroundColor: FOUNDATION_THEME.colors.gray[50],
            }}
            onClick={onClick}
        >
            <PrimitiveText
                style={{
                    fontSize: 14,
                    color: isSelected
                        ? FOUNDATION_THEME.colors.gray[700]
                        : FOUNDATION_THEME.colors.gray[600],
                    fontWeight: isSelected ? 600 : 500,
                    flexGrow: 1,
                }}
            >
                {label}
            </PrimitiveText>
            <Checkbox checked={isSelected} size={CheckboxSize.SMALL} />
        </Block>
    )

    // SliderFilter component to handle hooks properly
    const SliderFilter: React.FC = () => {
        const sliderColumn = column as ColumnDefinition<
            Record<string, unknown>
        > & {
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

        if (!sliderConfig) {
            return (
                <Block padding="14px 20px">
                    <PrimitiveText
                        style={{
                            fontSize: 14,
                            color: FOUNDATION_THEME.colors.gray[500],
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

            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }

            debounceRef.current = setTimeout(() => {
                const filterValue = { min: newValue[0], max: newValue[1] }
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
            <Block padding="14px 20px">
                <Block
                    display="flex"
                    flexDirection="column"
                    gap={FOUNDATION_THEME.unit[12]}
                >
                    <PrimitiveText
                        style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: FOUNDATION_THEME.colors.gray[700],
                        }}
                    >
                        Filter by Range
                    </PrimitiveText>

                    <Block
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <PrimitiveText
                            style={{
                                fontSize: 12,
                                color: FOUNDATION_THEME.colors.gray[600],
                            }}
                        >
                            {sliderConfig.prefix || ''}
                            {localValue[0]}
                            {sliderConfig.suffix || ''}
                        </PrimitiveText>
                        <PrimitiveText
                            style={{
                                fontSize: 12,
                                color: FOUNDATION_THEME.colors.gray[600],
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
                                fontSize: 11,
                                color: FOUNDATION_THEME.colors.gray[500],
                            }}
                        >
                            {sliderConfig.prefix || ''}
                            {min}
                            {sliderConfig.suffix || ''}
                        </PrimitiveText>
                        <PrimitiveText
                            style={{
                                fontSize: 11,
                                color: FOUNDATION_THEME.colors.gray[500],
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

    return (
        <>
            <Block display="flex" flexDirection="column" paddingBottom="20px">
                {columnConfig.supportsSorting && (
                    <>
                        {renderSortItem(
                            <ArrowUp
                                size={16}
                                color={FOUNDATION_THEME.colors.gray[600]}
                            />,
                            'Sort Ascending',
                            () =>
                                handleSortAndClose(() =>
                                    sortHandlers.handleSortAscending(fieldKey)
                                ),
                            isAscendingActive
                        )}
                        {renderSortItem(
                            <ArrowDown
                                size={16}
                                color={FOUNDATION_THEME.colors.gray[600]}
                            />,
                            'Sort Descending',
                            () =>
                                handleSortAndClose(() =>
                                    sortHandlers.handleSortDescending(fieldKey)
                                ),
                            isDescendingActive
                        )}
                    </>
                )}

                {columnConfig.supportsSorting &&
                    columnConfig.supportsFiltering && (
                        <Block
                            height="1px"
                            backgroundColor={FOUNDATION_THEME.colors.gray[200]}
                        />
                    )}

                {columnConfig.supportsFiltering && (
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        padding="14px 20px"
                        cursor="pointer"
                        backgroundColor="transparent"
                        _hover={{
                            backgroundColor: FOUNDATION_THEME.colors.gray[50],
                        }}
                        onClick={handleOpenFilterDrawer}
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={FOUNDATION_THEME.unit[8]}
                        >
                            <ListFilter
                                size={16}
                                color={FOUNDATION_THEME.colors.gray[600]}
                            />
                            <PrimitiveText
                                style={{
                                    fontSize: 14,
                                    color: FOUNDATION_THEME.colors.gray[700],
                                    fontWeight: 500,
                                }}
                            >
                                Filter
                            </PrimitiveText>
                        </Block>
                        <ChevronRight
                            size={16}
                            color={FOUNDATION_THEME.colors.gray[400]}
                        />
                    </Block>
                )}
            </Block>

            <Drawer
                open={filterDrawerOpen}
                onOpenChange={setFilterDrawerOpen}
                direction="bottom"
                modal={true}
                dismissible={true}
                showHandle={true}
            >
                <DrawerPortal>
                    <DrawerOverlay />
                    <DrawerContent contentDriven={true}>
                        <DrawerBody noPadding>
                            <Block
                                display="flex"
                                flexDirection="column"
                                paddingBottom="20px"
                            >
                                {(columnConfig.filterComponent ===
                                    'multiselect' ||
                                    columnConfig.filterComponent ===
                                        'select') && (
                                    <Block padding="14px 20px 8px 20px">
                                        <TextInput
                                            placeholder="Search"
                                            value={
                                                filterState.columnSearchValues[
                                                    fieldKey
                                                ] || ''
                                            }
                                            leftSlot={
                                                <Search
                                                    size={16}
                                                    color={
                                                        FOUNDATION_THEME.colors
                                                            .gray[400]
                                                    }
                                                />
                                            }
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                filterHandlers.handleSearchChange(
                                                    fieldKey,
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </Block>
                                )}

                                {columnConfig.filterComponent === 'select' && (
                                    <>
                                        {getSelectMenuItems(column, data).map(
                                            (group, groupIndex) =>
                                                filterItemsBySearch(
                                                    group.items,
                                                    filterState
                                                        .columnSearchValues[
                                                        fieldKey
                                                    ] || ''
                                                ).map((item, itemIndex) => {
                                                    const selectedValues =
                                                        filterState
                                                            .columnSelectedValues[
                                                            fieldKey
                                                        ]
                                                    const isSelected =
                                                        Array.isArray(
                                                            selectedValues
                                                        ) &&
                                                        selectedValues[0] ===
                                                            item.value

                                                    return (
                                                        <div
                                                            key={`select-${groupIndex}-${itemIndex}`}
                                                        >
                                                            {renderFilterItem(
                                                                item.label,
                                                                isSelected,
                                                                () => {
                                                                    filterHandlers.handleSelectFilter(
                                                                        column,
                                                                        fieldKey,
                                                                        item.value,
                                                                        onColumnFilter
                                                                    )
                                                                    handleCloseFilterDrawer()
                                                                }
                                                            )}
                                                        </div>
                                                    )
                                                })
                                        )}
                                    </>
                                )}

                                {columnConfig.filterComponent ===
                                    'multiselect' && (
                                    <>
                                        {getMultiSelectMenuItems(
                                            column,
                                            data
                                        ).map((group, groupIndex) =>
                                            filterItemsBySearch(
                                                group.items,
                                                filterState.columnSearchValues[
                                                    fieldKey
                                                ] || ''
                                            ).map((item, itemIndex) => {
                                                const selectedValues =
                                                    filterState
                                                        .columnSelectedValues[
                                                        fieldKey
                                                    ]
                                                const isSelected =
                                                    Array.isArray(
                                                        selectedValues
                                                    ) &&
                                                    selectedValues.includes(
                                                        item.value
                                                    )

                                                return (
                                                    <div
                                                        key={`multiselect-${groupIndex}-${itemIndex}`}
                                                    >
                                                        {renderFilterItem(
                                                            item.label,
                                                            isSelected,
                                                            () => {
                                                                filterHandlers.handleMultiSelectFilter(
                                                                    column,
                                                                    fieldKey,
                                                                    item.value,
                                                                    onColumnFilter
                                                                )
                                                            }
                                                        )}
                                                    </div>
                                                )
                                            })
                                        )}
                                    </>
                                )}

                                {columnConfig.filterComponent === 'slider' && (
                                    <SliderFilter />
                                )}

                                {!columnConfig.filterComponent && (
                                    <Block
                                        padding="14px 20px"
                                        textAlign="center"
                                    >
                                        <PrimitiveText
                                            style={{
                                                fontSize: 14,
                                                color: FOUNDATION_THEME.colors
                                                    .gray[500],
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            No filter component configured for
                                            this column type
                                        </PrimitiveText>
                                    </Block>
                                )}
                            </Block>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>
        </>
    )
}

export default MobileFilterDrawer
