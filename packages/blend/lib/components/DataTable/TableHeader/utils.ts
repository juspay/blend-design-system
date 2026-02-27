import { ColumnDefinition } from '../types'
import { SelectMenuGroupType } from '../../Select/types'
import { MultiSelectMenuGroupType } from '../../MultiSelect/types'
import { getUniqueColumnValues } from '../utils'
import { FOUNDATION_THEME } from '../../../tokens'

export const getFilterOptions = (
    column: ColumnDefinition<Record<string, unknown>>,
    data?: Record<string, unknown>[]
) => {
    if (column.filterOptions && column.filterOptions.length > 0) {
        return column.filterOptions
    }

    if (!data || data.length === 0) {
        return []
    }

    try {
        const uniqueValues = getUniqueColumnValues(data, column.field)

        if (uniqueValues.length === 0) {
            return []
        }

        return uniqueValues.map((val: string, index: number) => {
            const normalizedVal = val.toLowerCase().replace(/[^a-z0-9]/g, '-')
            const uniqueId = normalizedVal
                ? `${normalizedVal}-${index}`
                : `option-${index}`

            return {
                id: uniqueId,
                label: val,
                value: val,
            }
        })
    } catch (error) {
        console.warn(
            `Error generating filter options for column "${column.header}":`,
            error
        )
        return []
    }
}

export const getSelectMenuItems = (
    column: ColumnDefinition<Record<string, unknown>>,
    data?: Record<string, unknown>[]
): SelectMenuGroupType[] => {
    const filterOptions = getFilterOptions(column, data)
    return [
        {
            groupLabel: `${column.header} Options`,
            items: filterOptions.map((option) => ({
                label: option.label,
                value: option.value,
                onClick: () => {},
            })),
            showSeparator: false,
        },
    ]
}

export const getMultiSelectMenuItems = (
    column: ColumnDefinition<Record<string, unknown>>,
    data?: Record<string, unknown>[]
): MultiSelectMenuGroupType[] => {
    const filterOptions = getFilterOptions(column, data)
    return [
        {
            groupLabel: `${column.header} Options`,
            items: filterOptions.map((option) => ({
                label: option.label,
                value: option.value,
            })),
            showSeparator: false,
        },
    ]
}

/**
 * Filters dropdown menu items based on search text
 * This is used to filter the visible options in select/multiselect dropdowns
 * NOT for applying column filters to data
 */
export const filterItemsBySearch = (
    items: Array<{ label: string; value: string }>,
    searchValue: string
): Array<{ label: string; value: string }> => {
    if (!searchValue) return items
    return items.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase())
    )
}

export const getPopoverAlignment = (
    index: number,
    totalColumns: number
): 'start' | 'center' | 'end' => {
    if (index === 0) return 'start'
    if (index === totalColumns - 1) return 'end'
    return 'center'
}

export const getFrozenColumnStyles = (
    index: number,
    columnFreeze: number,
    enableRowExpansion: boolean,
    enableRowSelection: boolean,
    visibleColumns: ColumnDefinition<Record<string, unknown>>[],
    getColumnWidth: (
        column: ColumnDefinition<Record<string, unknown>>,
        index: number
    ) => React.CSSProperties,
    backgroundColor: string
) => {
    if (index >= columnFreeze) return { padding: '0 16px' }

    const currentColumn = visibleColumns[index]
    const currentColumnStyles = getColumnWidth(currentColumn, index)

    let fixedWidth = 140
    if (currentColumn.maxWidth) {
        fixedWidth =
            parseInt(currentColumn.maxWidth.replace(/px|%|em|rem/g, '')) || 140
    } else if (currentColumn.minWidth) {
        fixedWidth =
            parseInt(currentColumn.minWidth.replace(/px|%|em|rem/g, '')) || 140
    } else if (currentColumnStyles.maxWidth) {
        fixedWidth =
            parseInt(
                String(currentColumnStyles.maxWidth).replace(/px|%|em|rem/g, '')
            ) || 140
    } else if (currentColumnStyles.minWidth) {
        fixedWidth =
            parseInt(
                String(currentColumnStyles.minWidth).replace(/px|%|em|rem/g, '')
            ) || 140
    }

    let leftOffset = 0
    if (enableRowExpansion) leftOffset += 50
    if (enableRowSelection) leftOffset += 60

    for (let i = 0; i < index; i++) {
        const prevColumn = visibleColumns[i]
        const prevStyles = getColumnWidth(prevColumn, i)
        let columnWidth = 140
        if (prevColumn.maxWidth) {
            columnWidth =
                parseInt(prevColumn.maxWidth.replace(/px|%|em|rem/g, '')) || 140
        } else if (prevColumn.minWidth) {
            columnWidth =
                parseInt(prevColumn.minWidth.replace(/px|%|em|rem/g, '')) || 140
        } else if (prevStyles.maxWidth) {
            columnWidth =
                parseInt(
                    String(prevStyles.maxWidth).replace(/px|%|em|rem/g, '')
                ) || 140
        } else if (prevStyles.minWidth) {
            columnWidth =
                parseInt(
                    String(prevStyles.minWidth).replace(/px|%|em|rem/g, '')
                ) || 120
        }
        leftOffset += columnWidth
    }

    const isLastFrozenColumn = index === columnFreeze - 1

    return {
        position: 'sticky' as const,
        left: `${leftOffset}px`,
        zIndex: 9,
        backgroundColor,
        padding: `0 ${FOUNDATION_THEME.unit[16]}`,
        width: `${fixedWidth}px`,
        minWidth: `${fixedWidth}px`,
        maxWidth: `${fixedWidth}px`,
        boxSizing: 'border-box' as const,
        ...(isLastFrozenColumn && {
            borderRight: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
        }),
    }
}
