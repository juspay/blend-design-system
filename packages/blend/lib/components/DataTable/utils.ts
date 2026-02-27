import {
    SortDirection,
    SortConfig,
    ColumnFilter,
    SearchConfig,
    FilterType,
    ColumnDefinition,
    ColumnType,
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
                    return applyDateFilter(
                        cellValue,
                        new Date(String(filterValue)),
                        operator
                    )

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
    filterValue: Date,
    operator: string
): boolean => {
    const cellDate = new Date(String(cellValue))
    if (isNaN(cellDate.getTime())) return false

    const cellTime = cellDate.getTime()
    const filterTime = filterValue.getTime()

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
    column: ColumnDefinition<T>
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
            if (
                typeof value === 'object' &&
                value !== null &&
                'date' in value
            ) {
                const dateData = value as {
                    date: Date | string
                    format?: string
                    showTime?: boolean
                }
                const date = new Date(dateData.date)
                if (isNaN(date.getTime())) return 'Invalid Date'

                const options: Intl.DateTimeFormatOptions = {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                }

                if (dateData.showTime) {
                    options.hour = '2-digit'
                    options.minute = '2-digit'
                }

                return new Intl.DateTimeFormat('en-US', options).format(date)
            }
            if (value instanceof Date) {
                return new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                }).format(value)
            }
            if (typeof value === 'string') {
                const date = new Date(value)
                if (!isNaN(date.getTime())) {
                    return new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                    }).format(date)
                }
            }
            return String(value)
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
    format?: string
): DateData => ({
    date,
    format,
})

export const createDateRangeData = (
    startDate: Date | string,
    endDate: Date | string,
    format?: string
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
            return 'DateData { date: Date | string, format?: string } or Date or string'
        case ColumnType.DATE_RANGE:
            return 'DateRangeData { startDate: Date | string, endDate: Date | string, format?: string }'
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
