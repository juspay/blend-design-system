import React from 'react'
import {
    SortDirection,
    SortConfig,
    ColumnFilter,
    SearchConfig,
    FilterType,
    ColumnDefinition,
    ColumnType,
    FilterOption,
    PivotAggregationType,
    DateFormat,
    DateColumnProps,
} from './types'
import {
    validateColumnData,
    AvatarData,
    TagData,
    SelectData,
    MultiSelectData,
    DateData,
    DateRangeData,
} from './columnTypes'

export type DataTableBodyState = 'loading' | 'error' | 'empty' | 'rows'

export const getDataTableBodyState = ({
    isLoading,
    error,
    hasRows,
}: {
    isLoading: boolean
    error: boolean
    hasRows: boolean
}): DataTableBodyState => {
    if (isLoading && !hasRows) return 'loading'
    if (error && !isLoading) return 'error'
    if (!hasRows) return 'empty'
    return 'rows'
}

/**
 * Compares filter option lists by content. Consumers commonly build `columns`
 * inline, so a new-but-equal array must not count as a change: that would sync
 * column state on every parent render and re-run the whole data pipeline.
 *
 * Array-checked rather than truthy-checked, and indexed rather than using
 * `every`: this runs inside a render effect and JS consumers are not bound by
 * the type, so a malformed value must compare unequal instead of throwing and
 * taking the table down with it. Indexing also makes array holes compare
 * unequal, which `every` skips.
 *
 * Absent, empty and malformed values all compare equal to each other, because
 * they all render the same option list.
 */
const hasUsableFilterOptions = (
    value?: FilterOption[]
): value is FilterOption[] => Array.isArray(value) && value.length > 0

export const haveSameFilterOptions = (
    a?: FilterOption[],
    b?: FilterOption[]
): boolean => {
    if (a === b) return true

    // getFilterOptions only uses the prop when it is a non-empty array, and
    // otherwise derives options from the rows. So calling absent-vs-empty a
    // change would resync column state on every render, which is what this
    // comparator exists to prevent.
    if (!hasUsableFilterOptions(a) && !hasUsableFilterOptions(b)) return true
    if (!hasUsableFilterOptions(a) || !hasUsableFilterOptions(b)) return false

    if (a.length !== b.length) return false

    for (let index = 0; index < a.length; index++) {
        const option = a[index]
        const other = b[index]
        if (
            option?.id !== other?.id ||
            option?.label !== other?.label ||
            option?.value !== other?.value
        ) {
            return false
        }
    }

    return true
}

export const isDateOnlyString = (value: string): boolean =>
    /^\d{4}-\d{2}-\d{2}$/.test(value)

/**
 * Parse a date-only string (`YYYY-MM-DD`) as a local date at midnight.
 * Avoids JS `new Date("YYYY-MM-DD")` UTC parsing and off-by-one issues.
 */
export const parseDateOnlyLocal = (dateOnly: string): Date => {
    const [y, m, d] = dateOnly.split('-').map((p) => Number(p))
    return new Date(y, (m || 1) - 1, d || 1)
}

export const parseDateLike = (value: unknown): Date | null => {
    if (value instanceof Date) {
        return isNaN(value.getTime()) ? null : value
    }

    if (typeof value === 'string') {
        const trimmed = value.trim()
        if (!trimmed) return null
        const parsed = isDateOnlyString(trimmed)
            ? parseDateOnlyLocal(trimmed)
            : new Date(trimmed)
        return isNaN(parsed.getTime()) ? null : parsed
    }

    if (typeof value === 'object' && value !== null && 'date' in value) {
        const dateValue = (value as { date?: unknown }).date
        return parseDateLike(dateValue)
    }

    return null
}

export const toLocalDateString = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export const filterData = <T extends Record<string, unknown>>(
    data: T[],
    filters: Record<string, unknown>
): T[] => {
    return data.filter((row) => {
        return Object.entries(filters).every(([field, filterValue]) => {
            const cellValue = row[field]
            if (Array.isArray(filterValue)) {
                return filterValue.includes(cellValue)
            }
            return String(cellValue)
                .toLowerCase()
                .includes(String(filterValue).toLowerCase())
        })
    })
}

export const searchData = <T extends Record<string, unknown>>(
    data: T[],
    searchConfig: SearchConfig,
    columns: ColumnDefinition<T>[]
): T[] => {
    if (!searchConfig.query.trim()) {
        return data
    }

    const query = searchConfig.caseSensitive
        ? searchConfig.query.trim()
        : searchConfig.query.trim().toLowerCase()

    const searchFields = searchConfig.searchFields?.length
        ? searchConfig.searchFields
        : columns.map((col) => String(col.field))

    return data.filter((row) => {
        return searchFields.some((fieldStr) => {
            const cellValue = row[fieldStr as keyof T]
            if (cellValue == null) return false

            const searchableText = extractSearchableText(
                cellValue,
                searchConfig.caseSensitive || false
            )

            return searchableText.includes(query)
        })
    })
}

const extractSearchableText = (
    value: unknown,
    caseSensitive: boolean
): string => {
    if (value == null) return ''

    if (typeof value === 'object' && value !== null && 'text' in value) {
        const tagData = value as TagData
        const text = tagData.text || ''
        return caseSensitive ? text : text.toLowerCase()
    }

    if (typeof value === 'object' && value !== null && 'label' in value) {
        const avatarData = value as AvatarData
        const text = [avatarData.label, avatarData.sublabel]
            .filter(Boolean)
            .join(' ')
        return caseSensitive ? text : text.toLowerCase()
    }

    if (typeof value === 'object' && value !== null && 'values' in value) {
        const multiSelectData = value as MultiSelectData
        const allValues = [
            ...(multiSelectData.values || []),
            ...(multiSelectData.labels || []),
        ]
        const text = allValues.join(' ')
        return caseSensitive ? text : text.toLowerCase()
    }

    if (typeof value === 'object' && value !== null && 'value' in value) {
        const selectData = value as SelectData
        const text = [selectData.value, selectData.label]
            .filter(Boolean)
            .join(' ')
        return caseSensitive ? text : text.toLowerCase()
    }

    if (
        typeof value === 'object' &&
        value !== null &&
        'selectedValue' in value
    ) {
        const dropdownData = value as {
            selectedValue: unknown
            options?: Array<{ label: string; value: unknown }>
        }
        const selectedOption = dropdownData.options?.find(
            (opt) => opt.value === dropdownData.selectedValue
        )
        const text = selectedOption
            ? selectedOption.label
            : String(dropdownData.selectedValue)
        return caseSensitive ? text : text.toLowerCase()
    }

    if (typeof value === 'object' && value !== null && 'date' in value) {
        const dateData = value as DateData
        const text = String(dateData.date)
        return caseSensitive ? text : text.toLowerCase()
    }

    if (
        typeof value === 'object' &&
        value !== null &&
        'startDate' in value &&
        'endDate' in value
    ) {
        const dateRangeData = value as DateRangeData
        const text = `${dateRangeData.startDate} ${dateRangeData.endDate}`
        return caseSensitive ? text : text.toLowerCase()
    }

    if (Array.isArray(value)) {
        const text = value.map((item) => String(item)).join(' ')
        return caseSensitive ? text : text.toLowerCase()
    }

    const text = String(value)
    return caseSensitive ? text : text.toLowerCase()
}

export const applyColumnFilters = <T extends Record<string, unknown>>(
    data: T[],
    filters: ColumnFilter[]
): T[] => {
    if (!filters.length) {
        return data
    }

    return data.filter((row) => {
        return filters.every((filter) => {
            const cellValue = row[filter.field as keyof T]
            const filterValue = filter.value
            const operator = filter.operator || 'contains'

            if (cellValue == null) return false

            switch (filter.type) {
                case FilterType.TEXT:
                    return applyTextFilter(
                        cellValue,
                        filterValue as string,
                        operator
                    )

                case FilterType.SELECT: {
                    if (filterValue === '' || filterValue == null) return true

                    if (
                        typeof cellValue === 'object' &&
                        cellValue !== null &&
                        'text' in cellValue
                    ) {
                        const tagData = cellValue as TagData
                        return (
                            String(tagData.text).trim().toLowerCase() ===
                            String(filterValue).trim().toLowerCase()
                        )
                    }

                    if (
                        typeof cellValue === 'object' &&
                        cellValue !== null &&
                        'label' in cellValue
                    ) {
                        const avatarData = cellValue as AvatarData
                        return (
                            String(avatarData.label).trim().toLowerCase() ===
                            String(filterValue).trim().toLowerCase()
                        )
                    }

                    if (
                        typeof cellValue === 'object' &&
                        cellValue !== null &&
                        'value' in cellValue
                    ) {
                        const selectData = cellValue as SelectData
                        return (
                            String(selectData.value).trim().toLowerCase() ===
                            String(filterValue).trim().toLowerCase()
                        )
                    }

                    // Handle dropdown data structure
                    if (
                        typeof cellValue === 'object' &&
                        cellValue !== null &&
                        'selectedValue' in cellValue
                    ) {
                        const dropdownData = cellValue as {
                            selectedValue: unknown
                            options?: Array<{ label: string; value: unknown }>
                        }
                        return (
                            String(dropdownData.selectedValue)
                                .trim()
                                .toLowerCase() ===
                            String(filterValue).trim().toLowerCase()
                        )
                    }

                    return (
                        String(cellValue).trim().toLowerCase() ===
                        String(filterValue).trim().toLowerCase()
                    )
                }

                case FilterType.MULTISELECT: {
                    const filterValues = Array.isArray(filterValue)
                        ? filterValue
                        : [filterValue]

                    if (filterValues.length === 0) return true

                    if (
                        typeof cellValue === 'object' &&
                        cellValue !== null &&
                        'values' in cellValue
                    ) {
                        const multiSelectData = cellValue as MultiSelectData
                        if (!Array.isArray(multiSelectData.values)) return false

                        return filterValues.some((filterVal) =>
                            multiSelectData.values.some(
                                (val) =>
                                    String(val).trim().toLowerCase() ===
                                    String(filterVal).trim().toLowerCase()
                            )
                        )
                    }

                    if (Array.isArray(cellValue)) {
                        return filterValues.some((filterVal) =>
                            cellValue.some(
                                (val) =>
                                    String(val).trim().toLowerCase() ===
                                    String(filterVal).trim().toLowerCase()
                            )
                        )
                    }

                    return filterValues.some(
                        (val) =>
                            String(cellValue).trim().toLowerCase() ===
                            String(val).trim().toLowerCase()
                    )
                }

                case FilterType.NUMBER:
                    return applyNumberFilter(
                        cellValue,
                        parseFloat(String(filterValue)),
                        operator
                    )

                case FilterType.SLIDER: {
                    if (
                        typeof filterValue === 'object' &&
                        filterValue !== null &&
                        'min' in filterValue &&
                        'max' in filterValue
                    ) {
                        const rangeFilter = filterValue as {
                            min: number
                            max: number
                        }
                        return applySliderFilter(cellValue, rangeFilter)
                    }
                    return true
                }

                case FilterType.DATE:
                    if (operator === 'range' && Array.isArray(filterValue)) {
                        const [startDate, endDate] = filterValue
                        if (!startDate || !endDate) return true
                        return applyDateRangeFilter(
                            cellValue,
                            startDate,
                            endDate
                        )
                    }
                    return applyDateFilter(cellValue, filterValue, operator)

                default:
                    return true
            }
        })
    })
}

const applySliderFilter = (
    cellValue: unknown,
    filterValue: { min: number; max: number }
): boolean => {
    const cellNum =
        typeof cellValue === 'number'
            ? cellValue
            : parseFloat(String(cellValue))
    if (isNaN(cellNum)) return false

    return cellNum >= filterValue.min && cellNum <= filterValue.max
}

const applyTextFilter = (
    cellValue: unknown,
    filterValue: string,
    operator: string
): boolean => {
    const cellStr = String(cellValue).toLowerCase()
    const filterStr = filterValue.toLowerCase()

    switch (operator) {
        case 'equals':
            return cellStr === filterStr
        case 'contains':
            return cellStr.includes(filterStr)
        case 'startsWith':
            return cellStr.startsWith(filterStr)
        case 'endsWith':
            return cellStr.endsWith(filterStr)
        default:
            return cellStr.includes(filterStr)
    }
}

const applyNumberFilter = (
    cellValue: unknown,
    filterValue: number,
    operator: string
): boolean => {
    const cellNum =
        typeof cellValue === 'number'
            ? cellValue
            : parseFloat(String(cellValue))
    if (isNaN(cellNum)) return false

    switch (operator) {
        case 'equals':
            return cellNum === filterValue
        case 'gt':
            return cellNum > filterValue
        case 'lt':
            return cellNum < filterValue
        case 'gte':
            return cellNum >= filterValue
        case 'lte':
            return cellNum <= filterValue
        default:
            return cellNum === filterValue
    }
}

const applyDateFilter = (
    cellValue: unknown,
    filterValue: unknown,
    operator: string
): boolean => {
    const parsedFilter = parseDateLike(filterValue)
    if (!parsedFilter) return false

    const parsedCell = parseDateLike(cellValue)
    if (!parsedCell) return false

    const normalizeToDateOnly = (date: Date): number =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

    const cellTime = normalizeToDateOnly(parsedCell)
    const filterTime = normalizeToDateOnly(parsedFilter)

    switch (operator) {
        case 'equals':
            return cellTime === filterTime
        case 'gt':
            return cellTime > filterTime
        case 'lt':
            return cellTime < filterTime
        case 'gte':
            return cellTime >= filterTime
        case 'lte':
            return cellTime <= filterTime
        default:
            return cellTime === filterTime
    }
}

const applyDateRangeFilter = (
    cellValue: unknown,
    startValue: string,
    endValue: string
): boolean => {
    const startDate = parseDateLike(startValue)
    const endDate = parseDateLike(endValue)
    if (!startDate || !endDate) return false

    const parsedCell = parseDateLike(cellValue)
    if (!parsedCell) return false

    const normalizeToDateOnly = (date: Date): number =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

    const cellTime = normalizeToDateOnly(parsedCell)
    const startTime = normalizeToDateOnly(startDate)
    const endTime = normalizeToDateOnly(endDate)

    return (
        cellTime >= Math.min(startTime, endTime) &&
        cellTime <= Math.max(startTime, endTime)
    )
}

export const getUniqueColumnValues = <T extends Record<string, unknown>>(
    data: T[],
    field: keyof T
): string[] => {
    // Handle edge case: empty data array
    if (!data || data.length === 0) {
        return []
    }

    const uniqueValues = new Set<string>()
    const normalizedValues = new Map<string, string>() // normalized -> original mapping

    const addValue = (val: unknown) => {
        if (val == null || val === '') return

        const stringVal = String(val).trim()
        if (stringVal === '') return

        // Create normalized key for deduplication (lowercase, no extra spaces)
        const normalizedKey = stringVal.toLowerCase().replace(/\s+/g, ' ')

        // Only add if we haven't seen this normalized value before
        if (!normalizedValues.has(normalizedKey)) {
            normalizedValues.set(normalizedKey, stringVal)
            uniqueValues.add(stringVal)
        }
    }

    data.forEach((row) => {
        const value = row[field]

        if (value == null) return

        try {
            // Handle MultiSelect data structure: { values: string[], labels?: string[] }
            if (
                typeof value === 'object' &&
                value !== null &&
                'values' in value
            ) {
                const multiSelectData = value as MultiSelectData
                if (Array.isArray(multiSelectData.values)) {
                    multiSelectData.values.forEach((val) => addValue(val))
                }
            }
            // Handle plain arrays
            else if (Array.isArray(value)) {
                value.forEach((val) => addValue(val))
            }
            // Handle Tag data structure: { text: string, color?: string, variant?: string }
            else if (
                typeof value === 'object' &&
                value !== null &&
                'text' in value
            ) {
                const tagData = value as TagData
                addValue(tagData.text)
            }
            // Handle Avatar data structure: { label: string, sublabel?: string, imageUrl?: string }
            else if (
                typeof value === 'object' &&
                value !== null &&
                'label' in value
            ) {
                const avatarData = value as AvatarData
                addValue(avatarData.label)
            }
            // Handle Select data structure: { value: string, label?: string }
            else if (
                typeof value === 'object' &&
                value !== null &&
                'value' in value
            ) {
                const selectData = value as SelectData
                addValue(selectData.value)
            } else if (
                typeof value === 'object' &&
                value !== null &&
                'selectedValue' in value
            ) {
                const dropdownData = value as {
                    selectedValue: unknown
                    options?: Array<{ label: string; value: unknown }>
                }
                addValue(dropdownData.selectedValue)
                if (dropdownData.options) {
                    dropdownData.options.forEach((option) =>
                        addValue(option.value)
                    )
                }
            } else if (
                typeof value === 'object' &&
                value !== null &&
                'date' in value
            ) {
                const dateData = value as { date: Date | string }
                addValue(new Date(dateData.date).toLocaleDateString())
            } else if (typeof value === 'object' && value !== null) {
                const obj = value as Record<string, unknown>
                if ('name' in obj) addValue(obj.name)
                else if ('title' in obj) addValue(obj.title)
                else if ('id' in obj) addValue(obj.id)
                else {
                    addValue(JSON.stringify(value))
                }
            }
            // Handle primitive values (string, number, boolean)
            else {
                addValue(value)
            }
        } catch (error) {
            // Fallback for any unexpected data structures
            console.warn(
                `Error processing column value for field "${String(field)}":`,
                error
            )
            addValue(value)
        }
    })

    // Convert to array and sort intelligently
    const valuesArray = Array.from(uniqueValues)

    return valuesArray.sort((a, b) => {
        // Handle numeric sorting if both values are numbers
        const aNum = parseFloat(a)
        const bNum = parseFloat(b)

        if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum
        }

        // Handle case-insensitive string sorting
        const aLower = a.toLowerCase()
        const bLower = b.toLowerCase()

        if (aLower < bLower) return -1
        if (aLower > bLower) return 1
        return 0
    })
}

const extractSortableValue = (
    value: unknown,
    columnType?: ColumnType
): string | number => {
    if (value == null) return ''

    switch (columnType) {
        case ColumnType.AVATAR:
            if (
                typeof value === 'object' &&
                value !== null &&
                'label' in value
            ) {
                const avatarData = value as AvatarData
                return String(avatarData.label).toLowerCase()
            }
            break

        case ColumnType.TAG:
            if (
                typeof value === 'object' &&
                value !== null &&
                'text' in value
            ) {
                const tagData = value as TagData
                return String(tagData.text).toLowerCase()
            }
            if (Array.isArray(value) && value.length > 0) {
                const firstTag = value[0]
                if (
                    typeof firstTag === 'object' &&
                    firstTag !== null &&
                    'text' in firstTag
                ) {
                    return String((firstTag as TagData).text).toLowerCase()
                }
                return String(firstTag).toLowerCase()
            }
            break

        case ColumnType.SELECT:
            if (
                typeof value === 'object' &&
                value !== null &&
                'value' in value
            ) {
                const selectData = value as SelectData
                return String(selectData.value).toLowerCase()
            }
            break

        case ColumnType.MULTISELECT:
            if (
                typeof value === 'object' &&
                value !== null &&
                'values' in value
            ) {
                const multiSelectData = value as MultiSelectData
                return multiSelectData.values.length > 0
                    ? String(multiSelectData.values[0]).toLowerCase()
                    : ''
            }
            if (Array.isArray(value) && value.length > 0) {
                return String(value[0]).toLowerCase()
            }
            break

        case ColumnType.DROPDOWN:
            if (
                typeof value === 'object' &&
                value !== null &&
                'selectedValue' in value
            ) {
                const dropdownData = value as { selectedValue: unknown }
                return String(dropdownData.selectedValue).toLowerCase()
            }
            return String(value).toLowerCase()
            break

        case ColumnType.DATE: {
            if (
                typeof value === 'object' &&
                value !== null &&
                'date' in value
            ) {
                const dateData = value as DateData
                return new Date(dateData.date).getTime()
            }
            if (typeof value === 'string') {
                const dateTime = new Date(value).getTime()
                return isNaN(dateTime) ? value.toLowerCase() : dateTime
            }
            break
        }

        case ColumnType.DATE_RANGE: {
            if (
                typeof value === 'object' &&
                value !== null &&
                'startDate' in value
            ) {
                const dateRangeData = value as DateRangeData
                return new Date(dateRangeData.startDate).getTime()
            }
            if (typeof value === 'string') {
                const dateTime = new Date(value).getTime()
                return isNaN(dateTime) ? value.toLowerCase() : dateTime
            }
            break
        }

        case ColumnType.NUMBER: {
            if (typeof value === 'number') return value
            const numValue = parseFloat(String(value))
            return isNaN(numValue) ? 0 : numValue
        }

        case ColumnType.SLIDER: {
            if (typeof value === 'number') return value
            const numValue = parseFloat(String(value))
            return isNaN(numValue) ? 0 : numValue
        }

        case ColumnType.TEXT:
        default:
            return String(value).toLowerCase()
    }

    return String(value).toLowerCase()
}

export const sortData = <T extends Record<string, unknown>>(
    data: T[],
    sortConfig: SortConfig,
    columns?: ColumnDefinition<T>[]
): T[] => {
    return [...data].sort((a, b) => {
        const column = columns?.find(
            (col) => String(col.field) === sortConfig.field
        )

        const actualSortField = column?.getSortField
            ? column.getSortField(sortConfig.sortType)
            : sortConfig.field

        let aValue: unknown = (a as Record<string, unknown>)[actualSortField]
        let bValue: unknown = (b as Record<string, unknown>)[actualSortField]

        if (column?.sortValueFormatter) {
            try {
                aValue = column.sortValueFormatter(
                    aValue,
                    a,
                    column,
                    sortConfig.sortType
                )
                bValue = column.sortValueFormatter(
                    bValue,
                    b,
                    column,
                    sortConfig.sortType
                )
            } catch (error) {
                console.warn(
                    'sortValueFormatter error, using original values:',
                    error
                )
                aValue = (a as Record<string, unknown>)[actualSortField]
                bValue = (b as Record<string, unknown>)[actualSortField]
            }
        }

        if (aValue == null && bValue == null) return 0
        if (aValue == null) return 1
        if (bValue == null) return -1

        const columnType = column?.type

        const aCompare = extractSortableValue(aValue, columnType)
        const bCompare = extractSortableValue(bValue, columnType)

        let result = 0

        if (typeof aCompare === 'number' && typeof bCompare === 'number') {
            result = aCompare - bCompare
        } else {
            const aStr = String(aCompare)
            const bStr = String(bCompare)
            if (aStr < bStr) result = -1
            else if (aStr > bStr) result = 1
        }

        return sortConfig.direction === SortDirection.ASCENDING
            ? result
            : -result
    })
}

export const formatCurrency = (amount: number, currency = 'INR'): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
    }).format(amount)
}

const getTypeBasedDefaults = <T extends Record<string, unknown>>(
    column: ColumnDefinition<T>
): { minWidth: string; maxWidth: string } => {
    switch (column.type) {
        case ColumnType.AVATAR:
            return { minWidth: '200px', maxWidth: '300px' }
        case ColumnType.TAG:
            return { minWidth: '100px', maxWidth: '150px' }
        case ColumnType.SELECT:
            return { minWidth: '120px', maxWidth: '180px' }
        case ColumnType.MULTISELECT:
            return { minWidth: '150px', maxWidth: '220px' }
        case ColumnType.DROPDOWN:
            return { minWidth: '140px', maxWidth: '200px' }
        case ColumnType.DATE:
            return { minWidth: '120px', maxWidth: '160px' }
        case ColumnType.DATE_RANGE:
            return { minWidth: '160px', maxWidth: '220px' }
        case ColumnType.NUMBER:
            return { minWidth: '80px', maxWidth: '120px' }
        case ColumnType.TEXT:
            return { minWidth: '120px', maxWidth: '250px' }
        case ColumnType.CUSTOM:
            return { minWidth: '120px', maxWidth: '250px' }
        case ColumnType.REACT_ELEMENT:
            return { minWidth: '150px', maxWidth: '300px' }
        default:
            return { minWidth: '120px', maxWidth: '200px' }
    }
}

export const getDefaultColumnWidth = <T extends Record<string, unknown>>(
    column: ColumnDefinition<T>
): { minWidth: string; maxWidth: string } => {
    const defaults = getTypeBasedDefaults(column)

    return {
        minWidth: column.minWidth || defaults.minWidth,
        maxWidth: column.maxWidth || defaults.maxWidth,
    }
}

export const getColumnStyles = <T extends Record<string, unknown>>(
    column: ColumnDefinition<T>
): React.CSSProperties => {
    const { minWidth, maxWidth } = getDefaultColumnWidth(column)

    if (column.renderCell) {
        return {
            minWidth,
            maxWidth,
            width: 'auto',
            overflow: 'hidden',
            boxSizing: 'border-box',
        }
    }

    return {
        minWidth,
        maxWidth,
        width: 'auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
    }
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date)
}

/**
 * Token map for the lightweight format-string parser. Supports the common
 * dashboard tokens; anything else is passed through literally.
 *
 *   YYYY  -> 4-digit year          YY   -> 2-digit year
 *   MM    -> 2-digit month         MMM  -> short month name (Jan)
 *   DD    -> 2-digit day           dd   -> 2-digit day (alias)
 *   HH    -> 24h hour (2-digit)    hh   -> 12h hour (2-digit)
 *   mm    -> minutes (2-digit)     ss   -> seconds (2-digit)
 *   A     -> AM/PM                 a    -> am/pm
 */
const FORMAT_TOKEN_PATTERN = /YYYY|YY|MMM|MM|dd|DD|HH|hh|mm|ss|A|a/g

const pad2 = (n: number): string => String(n).padStart(2, '0')

// Format a Date using a format string like "DD MMM YYYY, hh:mm A"
export const formatDateString = (date: Date, format: string): string => {
    if (isNaN(date.getTime())) return '-'

    const parts = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).formatToParts(date)

    const lookup: Record<string, string> = {}
    for (const p of parts) {
        if (p.type !== 'literal') lookup[p.type] = p.value
    }

    const year = lookup.year ?? ''
    const monthNum = lookup.month ?? ''
    const day = lookup.day ?? ''
    const hour24 = lookup.hour ?? ''
    const minute = lookup.minute ?? ''
    const second = lookup.second ?? ''

    // Short month name via a separate formatter (month: 'short' gives 'Jan' etc.)
    const shortMonth = new Intl.DateTimeFormat('en-US', {
        month: 'short',
    }).format(date)

    // Normalize the 24-hour value: some browsers/locales return "24" for
    // midnight instead of "00". Convert 24 -> 0 so HH always prints 00.
    const hourNumRaw = parseInt(hour24, 10)
    const hourNum = hourNumRaw === 24 ? 0 : hourNumRaw
    const hour12 = (hourNum % 12 || 12).toString()
    const ampm = hourNum < 12 ? 'AM' : 'PM'

    FORMAT_TOKEN_PATTERN.lastIndex = 0
    return format.replace(FORMAT_TOKEN_PATTERN, (token) => {
        switch (token) {
            case 'YYYY':
                return year
            case 'YY':
                return year.slice(-2)
            case 'MMM':
                return shortMonth
            case 'MM':
                return monthNum
            case 'DD':
            case 'dd':
                return day
            case 'HH':
                return pad2(hourNum)
            case 'hh':
                return pad2(parseInt(hour12, 10))
            case 'mm':
                return minute
            case 'ss':
                return second
            case 'A':
                return ampm
            case 'a':
                return ampm.toLowerCase()
            default:
                return token
        }
    })
}

export const updateColumnFilter = (
    currentFilters: ColumnFilter[],
    field: keyof Record<string, unknown>,
    type: FilterType,
    value: string | string[] | { min: number; max: number },
    operator:
        | 'equals'
        | 'contains'
        | 'startsWith'
        | 'endsWith'
        | 'gt'
        | 'lt'
        | 'gte'
        | 'lte'
        | 'range' = 'contains'
): ColumnFilter[] => {
    const newFilters = [...currentFilters]
    const existingFilterIndex = newFilters.findIndex(
        (filter) => filter.field === field
    )

    const isEmptyValue = () => {
        if (
            typeof value === 'object' &&
            value !== null &&
            'min' in value &&
            'max' in value
        ) {
            return false // Range values are never considered empty
        }
        return value === '' || (Array.isArray(value) && value.length === 0)
    }

    if (existingFilterIndex >= 0) {
        if (isEmptyValue()) {
            newFilters.splice(existingFilterIndex, 1)
        } else {
            newFilters[existingFilterIndex] = {
                field: String(field),
                type,
                value,
                operator,
            }
        }
    } else if (!isEmptyValue()) {
        newFilters.push({ field: String(field), type, value, operator })
    }

    return newFilters
}

const getExportValue = <T extends Record<string, unknown>>(
    value: unknown,
    column: ColumnDefinition<T>,
    defaultDateLabel?: string
): string => {
    if (value == null) return ''

    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No'
    }

    switch (column.type) {
        case ColumnType.DROPDOWN: {
            if (
                typeof value === 'object' &&
                value !== null &&
                'selectedValue' in value
            ) {
                const dropdownData = value as {
                    selectedValue: unknown
                    options?: Array<{ label: string; value: unknown }>
                }
                const selectedOption = dropdownData.options?.find(
                    (opt) => opt.value === dropdownData.selectedValue
                )
                return selectedOption
                    ? selectedOption.label
                    : String(dropdownData.selectedValue)
            }
            return String(value)
        }

        case ColumnType.DATE: {
            const dateData =
                typeof value === 'object' && value !== null && 'date' in value
                    ? (value as DateColumnProps)
                    : ({
                          date: value as Date | string,
                          showTime: false,
                      } as DateColumnProps)
            const date = parseDateLike(dateData.date)
            if (!date) return '-'

            const format =
                dateData.format ||
                column.dateFormat ||
                (dateData.showTime ? 'DD MMM YYYY, hh:mm A' : 'DD MMM YYYY')
            const label =
                dateData.dateLabel || column.dateLabel || defaultDateLabel
            const formattedDate = formatDateString(date, format)

            return label ? `${formattedDate} ${label}` : formattedDate
        }

        case ColumnType.AVATAR: {
            if (
                typeof value === 'object' &&
                value !== null &&
                'label' in value
            ) {
                const avatarData = value as { label: string; sublabel?: string }
                return avatarData.sublabel
                    ? `${avatarData.label} (${avatarData.sublabel})`
                    : avatarData.label
            }
            return String(value)
        }

        case ColumnType.TAG: {
            if (
                typeof value === 'object' &&
                value !== null &&
                'text' in value
            ) {
                const tagData = value as { text: string }
                return tagData.text
            }
            return String(value)
        }

        case ColumnType.SELECT: {
            if (
                typeof value === 'object' &&
                value !== null &&
                'value' in value
            ) {
                const selectData = value as { value: string; label?: string }
                return selectData.label || selectData.value
            }
            return String(value)
        }

        case ColumnType.MULTISELECT: {
            if (
                typeof value === 'object' &&
                value !== null &&
                'values' in value
            ) {
                const multiSelectData = value as {
                    values: string[]
                    labels?: string[]
                }
                return (
                    multiSelectData.labels?.join(', ') ||
                    multiSelectData.values.join(', ')
                )
            }
            if (Array.isArray(value)) {
                return value.join(', ')
            }
            return String(value)
        }

        case ColumnType.DATE_RANGE: {
            if (
                typeof value === 'object' &&
                value !== null &&
                'startDate' in value &&
                'endDate' in value
            ) {
                const dateRangeData = value as {
                    startDate: Date | string
                    endDate: Date | string
                }
                const startDate = new Date(dateRangeData.startDate)
                const endDate = new Date(dateRangeData.endDate)
                const format = (date: Date) =>
                    new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                    }).format(date)

                return `${format(startDate)} - ${format(endDate)}`
            }
            return String(value)
        }

        default:
            return String(value)
    }
}

type ReactNodeText = {
    text?: string
    complete: boolean
}

const getTextFromReactNode = (node: React.ReactNode): ReactNodeText => {
    if (
        typeof node === 'string' ||
        typeof node === 'number' ||
        typeof node === 'bigint'
    ) {
        return { text: String(node), complete: true }
    }

    if (Array.isArray(node)) {
        const parts = node.map(getTextFromReactNode)
        const textParts = parts
            .map((part) => part.text)
            .filter((part): part is string => part !== undefined)
        return {
            text: textParts.length > 0 ? textParts.join('') : undefined,
            complete: parts.every((part) => part.complete),
        }
    }

    if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
        if (
            typeof node.type !== 'string' ||
            'dangerouslySetInnerHTML' in node.props
        ) {
            return { complete: false }
        }

        return getTextFromReactNode(node.props.children)
    }

    if (node == null || typeof node === 'boolean') {
        return { complete: true }
    }

    return { complete: false }
}

type DataTableExportValueOptions<T extends Record<string, unknown>> = {
    getDisplayValue?: (value: unknown, column: ColumnDefinition<T>) => unknown
    dateLabel?: string
}

type DataTableExportCell = {
    text: string
    rendered?: React.ReactNode
}

const getDataTableExportCell = <T extends Record<string, unknown>>(
    row: T,
    column: ColumnDefinition<T>,
    rowIndex: number,
    options: DataTableExportValueOptions<T> = {}
): DataTableExportCell => {
    const value = row[column.field]
    const displayValue = options.getDisplayValue
        ? options.getDisplayValue(value, column)
        : value
    const fallback = getExportValue(displayValue, column, options.dateLabel)

    if (
        column.type === ColumnType.DATE ||
        column.type === ColumnType.DROPDOWN
    ) {
        return { text: fallback }
    }

    if (column.type !== ColumnType.REACT_ELEMENT && column.renderCell) {
        try {
            const rendered = (
                column.renderCell as (
                    value: unknown,
                    row: T,
                    index: number
                ) => React.ReactNode
            )(displayValue, row, rowIndex)
            const directText = getTextFromReactNode(rendered)

            if (directText.complete) {
                return { text: directText.text ?? fallback }
            }

            if (rendered !== undefined) {
                return { text: fallback, rendered }
            }
        } catch {
            // A visual-only renderer should not prevent raw-value export.
        }
    }

    return { text: fallback }
}

const EXPORT_ROW_BATCH_SIZE = 250
const EXPORT_RENDER_RECOVERY_ATTEMPT_LIMIT = 32

const createExportBatchToken = (): string => {
    if (
        typeof crypto !== 'undefined' &&
        typeof crypto.randomUUID === 'function'
    ) {
        return crypto.randomUUID()
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

const applyRenderedCellText = (
    cells: DataTableExportCell[],
    renderToStaticMarkup: (
        node: React.ReactNode,
        options?: { identifierPrefix?: string }
    ) => string
): void => {
    const pendingCells = cells.filter((cell) => cell.rendered !== undefined)
    if (pendingCells.length === 0 || typeof DOMParser === 'undefined') return

    const batchToken = createExportBatchToken()

    const markup = renderToStaticMarkup(
        React.createElement(
            'div',
            { 'data-blend-export-root': batchToken },
            pendingCells.map((cell, index) =>
                React.createElement(
                    'div',
                    {
                        key: index,
                        'data-blend-export-cell': `${batchToken}-${index}`,
                    },
                    cell.rendered
                )
            )
        )
    )
    const renderedDocument = new DOMParser().parseFromString(
        markup,
        'text/html'
    )
    renderedDocument
        .querySelectorAll('script, style, noscript')
        .forEach((element) => element.remove())
    const roots = Array.from(
        renderedDocument.querySelectorAll('[data-blend-export-root]')
    ).filter(
        (root) => root.getAttribute('data-blend-export-root') === batchToken
    )
    const wrappers = roots.length === 1 ? Array.from(roots[0].children) : []

    if (wrappers.length !== pendingCells.length) {
        throw new Error('DataTable export renderer boundary was invalid')
    }

    const renderedText = wrappers.map((wrapper, index) => {
        const expectedToken = `${batchToken}-${index}`

        if (wrapper.getAttribute('data-blend-export-cell') !== expectedToken) {
            throw new Error('DataTable export renderer boundary was invalid')
        }

        return wrapper.textContent
    })

    pendingCells.forEach((cell, index) => {
        const text = renderedText[index]
        if (text) cell.text = text
    })
}

const applyRenderedCellTextSafely = (
    cells: DataTableExportCell[],
    renderToStaticMarkup: (
        node: React.ReactNode,
        options?: { identifierPrefix?: string }
    ) => string,
    recoveryBudget: { remaining: number },
    isRecoveryAttempt = false
): void => {
    const pendingCells = cells.filter((cell) => cell.rendered !== undefined)
    if (pendingCells.length === 0) return

    if (isRecoveryAttempt) {
        if (recoveryBudget.remaining === 0) return
        recoveryBudget.remaining -= 1
    }

    try {
        applyRenderedCellText(pendingCells, renderToStaticMarkup)
    } catch {
        if (pendingCells.length === 1) return

        const midpoint = Math.ceil(pendingCells.length / 2)
        applyRenderedCellTextSafely(
            pendingCells.slice(0, midpoint),
            renderToStaticMarkup,
            recoveryBudget,
            true
        )
        applyRenderedCellTextSafely(
            pendingCells.slice(midpoint),
            renderToStaticMarkup,
            recoveryBudget,
            true
        )
    }
}

const serializeDataTableRows = async <T extends Record<string, unknown>>(
    data: T[],
    columns: ColumnDefinition<T>[],
    options: DataTableExportValueOptions<T>,
    rowIndexOffset = 0
): Promise<string[][]> => {
    const rows: string[][] = []
    const renderRecoveryBudget = {
        remaining: EXPORT_RENDER_RECOVERY_ATTEMPT_LIMIT,
    }
    let staticRenderer:
        | (typeof import('react-dom/server'))['renderToStaticMarkup']
        | undefined

    for (
        let batchStart = 0;
        batchStart < data.length;
        batchStart += EXPORT_ROW_BATCH_SIZE
    ) {
        const batch = data.slice(batchStart, batchStart + EXPORT_ROW_BATCH_SIZE)
        const cells = batch.map((row, index) =>
            columns.map((column) =>
                getDataTableExportCell(
                    row,
                    column,
                    rowIndexOffset + batchStart + index,
                    options
                )
            )
        )
        const flattenedCells = cells.flat()

        if (flattenedCells.some((cell) => cell.rendered !== undefined)) {
            staticRenderer ??= (await import('react-dom/server'))
                .renderToStaticMarkup
            applyRenderedCellTextSafely(
                flattenedCells,
                staticRenderer,
                renderRecoveryBudget
            )
        }

        rows.push(...cells.map((row) => row.map((cell) => cell.text)))
    }

    return rows
}

export const getDataTableExportValue = async <
    T extends Record<string, unknown>,
>(
    row: T,
    column: ColumnDefinition<T>,
    rowIndex: number,
    options: DataTableExportValueOptions<T> = {}
): Promise<string> => {
    const [serializedRow] = await serializeDataTableRows(
        [row],
        [column],
        options,
        rowIndex
    )
    return serializedRow[0]
}

const escapeCSVValue = (value: string): string => {
    const safeValue = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
    if (!/[",\r\n]/.test(safeValue)) return safeValue
    return `"${safeValue.replace(/"/g, '""')}"`
}

export const generateDataTableCSV = async <T extends Record<string, unknown>>(
    data: T[],
    columns: ColumnDefinition<T>[],
    options: DataTableExportValueOptions<T> = {}
): Promise<string> => {
    if (data.length === 0) {
        throw new Error('No data available for export')
    }

    const header = columns.map((column) => column.header)
    const rows = await serializeDataTableRows(data, columns, options)

    return [header, ...rows]
        .map((row) => row.map(escapeCSVValue).join(','))
        .join('\r\n')
}

export const getDataTableExportMatrix = async <
    T extends Record<string, unknown>,
>(
    data: T[],
    columns: ColumnDefinition<T>[],
    options: DataTableExportValueOptions<T> = {}
): Promise<string[][]> => {
    if (data.length === 0) {
        throw new Error('No data available for export')
    }

    const rows = await serializeDataTableRows(data, columns, options)

    return [columns.map((column) => column.header), ...rows]
}

const getExportFileName = (fileName: string, extension: string): string => {
    const knownExtension = /\.(csv|xlsx)$/i
    return knownExtension.test(fileName)
        ? fileName.replace(knownExtension, `.${extension}`)
        : `${fileName}.${extension}`
}

const downloadBlob = (blob: Blob, fileName: string): void => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = fileName
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

export const downloadDataTableExport = async <
    T extends Record<string, unknown>,
>(
    data: T[],
    columns: ColumnDefinition<T>[],
    format: 'csv' | 'xlsx',
    fileName: string,
    options: DataTableExportValueOptions<T> = {}
): Promise<void> => {
    if (format === 'csv') {
        downloadBlob(
            new Blob([await generateDataTableCSV(data, columns, options)], {
                type: 'text/csv;charset=utf-8;',
            }),
            getExportFileName(fileName, format)
        )
        return
    }

    const { default: writeXlsxFile } = await import('write-excel-file/browser')
    const workbookBlob = await writeXlsxFile(
        await getDataTableExportMatrix(data, columns, options),
        { sheet: 'Data' }
    ).toBlob()

    downloadBlob(workbookBlob, getExportFileName(fileName, format))
}

export const generateCSVContent = <T extends Record<string, unknown>>(
    data: T[],
    columns: ColumnDefinition<T>[]
): string => {
    if (data.length === 0) {
        throw new Error('No data available for export')
    }

    const headers = columns.map((col) => col.header)
    const fields = columns.map((col) => col.field)

    let csvContent = headers.join(',') + '\n'

    data.forEach((row) => {
        const rowData = fields.map((field, index) => {
            const value = row[field]
            const column = columns[index]

            if (value != null) {
                const exportValue = getExportValue(value, column)
                const escapedValue = exportValue.replace(/"/g, '""')
                return `"${escapedValue}"`
            }
            return ''
        })
        csvContent += rowData.join(',') + '\n'
    })

    return csvContent
}

export const downloadCSV = (csvContent: string, filename?: string): void => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.setAttribute('href', url)
    link.setAttribute(
        'download',
        filename || `export-${new Date().toISOString().split('T')[0]}.csv`
    )
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
}

export const exportSelectedRowsToCSV = <T extends Record<string, unknown>>(
    allData: T[],
    selectedRows: Record<string, boolean>,
    columns: ColumnDefinition<T>[],
    idField: string,
    filename?: string
): void => {
    const selectedData = allData.filter((row) => {
        const rowId = String(row[idField])
        return selectedRows[rowId]
    })

    if (selectedData.length === 0) {
        throw new Error('Please select at least one row to export')
    }

    const csvContent = generateCSVContent(selectedData, columns)
    downloadCSV(csvContent, filename)
}

export const getSelectedRowCount = (
    selectedRows: Record<string, boolean>
): number => {
    return Object.values(selectedRows).filter((selected) => selected).length
}

export const createSearchConfig = (
    query: string,
    caseSensitive = false,
    searchFields?: string[]
): SearchConfig => ({
    query: query,
    caseSensitive,
    searchFields,
})

export const clearAllFiltersAndSearch = (): {
    filters: ColumnFilter[]
    searchConfig: SearchConfig
} => ({
    filters: [],
    searchConfig: createSearchConfig(''),
})

export const createAvatarData = (
    label: string,
    options?: {
        sublabel?: string
        imageUrl?: string
        initials?: string
    }
): AvatarData => ({
    label,
    ...options,
})

export const createTagData = (
    text: string,
    options?: {
        color?:
            | 'primary'
            | 'secondary'
            | 'success'
            | 'warning'
            | 'error'
            | 'neutral'
        variant?: 'solid' | 'subtle' | 'outline'
        size?: 'sm' | 'md' | 'lg'
    }
): TagData => ({
    text,
    ...options,
})

export const createSelectData = (
    value: string,
    options?: {
        label?: string
        disabled?: boolean
    }
): SelectData => ({
    value,
    ...options,
})

export const createMultiSelectData = (
    values: string[],
    labels?: string[]
): MultiSelectData => ({
    values,
    labels,
})

export const createDateData = (
    date: Date | string,
    format?: DateFormat
): DateData => ({
    date,
    format,
})

export const createDateRangeData = (
    startDate: Date | string,
    endDate: Date | string,
    format?: DateFormat
): DateRangeData => ({
    startDate,
    endDate,
    format,
})

export const validateDataForColumnType = <T extends Record<string, unknown>>(
    data: T,
    columns: ColumnDefinition<T>[]
): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    for (const column of columns) {
        const fieldValue = data[column.field]
        const validator = validateColumnData[column.type]

        if (!validator(fieldValue)) {
            errors.push(
                `Field "${String(column.field)}" (${column.type}) has invalid data type. Expected: ${getExpectedTypeDescription(column.type)}, Got: ${typeof fieldValue}`
            )
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

const getExpectedTypeDescription = (columnType: ColumnType): string => {
    switch (columnType) {
        case ColumnType.AVATAR:
            return 'AvatarData { label: string, sublabel?: string, imageUrl?: string, initials?: string }'
        case ColumnType.TAG:
            return 'TagData { text: string, color?: string, variant?: string, size?: string }'
        case ColumnType.SELECT:
            return 'SelectData { value: string, label?: string, disabled?: boolean } or string'
        case ColumnType.MULTISELECT:
            return 'MultiSelectData { values: string[], labels?: string[] } or string[]'
        case ColumnType.DATE:
            return 'DateData { date: Date | string, format?: DateFormat } or Date or string'
        case ColumnType.DATE_RANGE:
            return 'DateRangeData { startDate: Date | string, endDate: Date | string, format?: DateFormat }'
        case ColumnType.TEXT:
            return 'string or number'
        case ColumnType.NUMBER:
            return 'number'
        case ColumnType.CUSTOM:
            return 'any'
        default:
            return 'unknown'
    }
}

export const enforceDataTypeMatching = <T extends Record<string, unknown>>(
    data: T[],
    columns: ColumnDefinition<T>[],
    options?: { throwOnError?: boolean; logWarnings?: boolean }
): boolean => {
    const { throwOnError = false, logWarnings = true } = options || {}
    let hasErrors = false

    for (let i = 0; i < data.length; i++) {
        const row = data[i]
        const validation = validateDataForColumnType(row, columns)

        if (!validation.isValid) {
            hasErrors = true
            const errorMessage = `DataTable type validation failed for row ${i}:\n${validation.errors.join('\n')}`

            if (throwOnError) {
                throw new Error(errorMessage)
            } else if (logWarnings) {
                console.warn(errorMessage)
            }
        }
    }

    return !hasErrors
}

type PivotValueConfig<T extends Record<string, unknown>> = {
    field: keyof T
    aggregation: PivotAggregationType
    label?: string
}

type PivotResultRow = Record<string, unknown>

const normalizePivotValue = (value: unknown): string | number => {
    if (value == null) return 'N/A'
    if (typeof value === 'number') return value
    if (typeof value === 'string') return value

    if (typeof value === 'object' && value !== null) {
        if ('text' in value) {
            return String((value as { text: unknown }).text)
        }
        if ('label' in value) {
            return String((value as { label: unknown }).label)
        }
        if ('value' in value) {
            return String((value as { value: unknown }).value)
        }
        if ('selectedValue' in value) {
            return String((value as { selectedValue: unknown }).selectedValue)
        }
    }

    return String(value)
}

const aggregatePivotValues = (
    values: number[],
    aggregation: PivotAggregationType
): number => {
    if (aggregation === PivotAggregationType.COUNT) {
        return values.length
    }

    if (values.length === 0) return 0

    switch (aggregation) {
        case PivotAggregationType.SUM:
            return values.reduce((sum, value) => sum + value, 0)
        case PivotAggregationType.AVERAGE:
        case PivotAggregationType.MEAN:
            return values.reduce((sum, value) => sum + value, 0) / values.length
        case PivotAggregationType.MEDIAN: {
            const sorted = [...values].sort((a, b) => a - b)
            const middle = Math.floor(sorted.length / 2)
            if (sorted.length % 2 === 0) {
                return (sorted[middle - 1] + sorted[middle]) / 2
            }
            return sorted[middle]
        }
        case PivotAggregationType.MIN:
            return Math.min(...values)
        case PivotAggregationType.MAX:
            return Math.max(...values)
        default:
            return values.reduce((sum, value) => sum + value, 0)
    }
}

export const buildPivotData = <T extends Record<string, unknown>>(
    data: T[],
    rowFields: (keyof T)[],
    columnFields: (keyof T)[],
    valueConfigs: PivotValueConfig<T>[],
    filterValues?: Record<string, string[]>
): {
    columns: Array<{ key: string; label: string }>
    rows: PivotResultRow[]
} => {
    if (!data.length || !valueConfigs.length) {
        return { columns: [], rows: [] }
    }

    const filteredData = data.filter((row) => {
        if (!filterValues) return true
        return Object.entries(filterValues).every(([field, selected]) => {
            if (!selected.length) return true
            const value = normalizePivotValue(row[field as keyof T])
            return selected.includes(String(value))
        })
    })

    const rowMap = new Map<string, PivotResultRow>()
    const dynamicColumnOrder: string[] = []

    filteredData.forEach((row) => {
        const rowKeyParts = rowFields.map((field) =>
            String(normalizePivotValue(row[field]))
        )
        const rowKey = rowKeyParts.join(' | ') || 'All Rows'

        const columnKeyParts = columnFields.map((field) =>
            String(normalizePivotValue(row[field]))
        )
        const columnKeyBase = columnKeyParts.join(' | ') || 'All Columns'

        if (!rowMap.has(rowKey)) {
            const baseRow: PivotResultRow = {}
            rowFields.forEach((field, index) => {
                baseRow[String(field)] = rowKeyParts[index] || 'N/A'
            })
            rowMap.set(rowKey, baseRow)
        }

        const resultRow = rowMap.get(rowKey)!

        valueConfigs.forEach((valueConfig) => {
            const rawValue = row[valueConfig.field]
            const numericValue =
                typeof rawValue === 'number'
                    ? rawValue
                    : Number(normalizePivotValue(rawValue))
            const valueListKey = `__pivot_values__::${encodeURIComponent(columnKeyBase)}::${String(valueConfig.field)}::${valueConfig.aggregation}`
            const existingValues = (resultRow[valueListKey] as number[]) || []
            if (!Number.isNaN(numericValue)) {
                existingValues.push(numericValue)
            } else if (valueConfig.aggregation === PivotAggregationType.COUNT) {
                existingValues.push(1)
            }
            resultRow[valueListKey] = existingValues
        })
    })

    const rows = Array.from(rowMap.values()).map((row) => {
        const outputRow: PivotResultRow = {}

        rowFields.forEach((field) => {
            outputRow[String(field)] = row[String(field)] || 'N/A'
        })

        Object.keys(row).forEach((key) => {
            if (!key.startsWith('__pivot_values__')) return

            const pivotKeyParts = key.split('::')
            if (pivotKeyParts.length !== 4) return

            const columnKey = decodeURIComponent(pivotKeyParts[1] || '')
            const valueField = pivotKeyParts[2] || ''
            const aggregation = pivotKeyParts[3] as PivotAggregationType
            const values = (row[key] as unknown as number[]) || []
            const label = `${columnKey} | ${valueField} (${aggregation})`
            outputRow[label] = Number(
                aggregatePivotValues(
                    values,
                    aggregation as PivotAggregationType
                ).toFixed(2)
            )
            if (!dynamicColumnOrder.includes(label)) {
                dynamicColumnOrder.push(label)
            }
        })

        return outputRow
    })

    const columns = [
        ...rowFields.map((field) => ({
            key: String(field),
            label: String(field),
        })),
        ...dynamicColumnOrder.map((key) => ({
            key,
            label: key,
        })),
    ]

    return { columns, rows }
}

export const exportPivotToCSV = (
    rows: PivotResultRow[],
    columns: Array<{ key: string; label: string }>,
    filename: string
): void => {
    if (!rows.length || !columns.length) {
        throw new Error('No pivot data available for export')
    }

    const header = columns.map((column) => `"${column.label}"`).join(',')
    const lines = rows.map((row) =>
        columns
            .map(
                (column) =>
                    `"${String(row[column.key] ?? '').replace(/"/g, '""')}"`
            )
            .join(',')
    )

    downloadCSV([header, ...lines].join('\n'), filename)
}
