import { SortDirection, FilterType, ColumnDefinition } from '../types'

export type SortState = {
    currentSortField: string | null
    currentSortDirection: SortDirection
    currentSortType?: string // Optional sort type (e.g., 'primary', 'delta', 'absolute')
}

export type FilterState = {
    columnSearchValues: Record<string, string>
    columnSelectedValues: Record<
        string,
        string[] | { min: number; max: number }
    >
}

export type ColumnFilterHandler = (
    field: string,
    filterType: FilterType,
    value: string | string[] | { min: number; max: number },
    operator?:
        | 'endsWith'
        | 'startsWith'
        | 'equals'
        | 'contains'
        | 'gt'
        | 'lt'
        | 'gte'
        | 'lte'
        | 'range'
) => void

export type SortHandlers = {
    handleSort: (field: string, sortType?: string) => void
    handleSortAscending: (field: string, sortType?: string) => void
    handleSortDescending: (field: string, sortType?: string) => void
}

export const createSortHandlers = (
    sortState: SortState,
    onSort: (field: keyof Record<string, unknown>, sortType?: string) => void,
    onSortAscending?: (
        field: keyof Record<string, unknown>,
        sortType?: string
    ) => void,
    onSortDescending?: (
        field: keyof Record<string, unknown>,
        sortType?: string
    ) => void
): SortHandlers => {
    const handleSort = (field: string, sortType?: string) => {
        onSort(field as keyof Record<string, unknown>, sortType)
    }

    const handleSortAscending = (field: string, sortType?: string) => {
        const fieldKey = field as keyof Record<string, unknown>
        if (onSortAscending) {
            onSortAscending(fieldKey, sortType)
            return
        }

        if (
            sortState.currentSortField === field &&
            sortState.currentSortDirection === SortDirection.ASCENDING
        ) {
            onSort(fieldKey, sortType)
            setTimeout(() => {
                onSort(fieldKey, sortType)
            }, 0)
        } else if (
            sortState.currentSortField === field &&
            sortState.currentSortDirection === SortDirection.DESCENDING
        ) {
            onSort(fieldKey, sortType)
            setTimeout(() => {
                onSort(fieldKey, sortType)
            }, 0)
        } else {
            onSort(fieldKey, sortType)
        }
    }

    const handleSortDescending = (field: string, sortType?: string) => {
        const fieldKey = field as keyof Record<string, unknown>

        if (onSortDescending) {
            onSortDescending(fieldKey, sortType)
            return
        }

        if (
            sortState.currentSortField === field &&
            sortState.currentSortDirection === SortDirection.DESCENDING
        ) {
            onSort(fieldKey, sortType)
        } else if (
            sortState.currentSortField === field &&
            sortState.currentSortDirection === SortDirection.ASCENDING
        ) {
            onSort(fieldKey, sortType)
        } else {
            onSort(fieldKey, sortType)
            setTimeout(() => {
                onSort(fieldKey, sortType)
            }, 0)
        }
    }

    return {
        handleSort,
        handleSortAscending,
        handleSortDescending,
    }
}

export type FilterHandlers = {
    handleSearchChange: (fieldKey: string, value: string) => void
    handleSelectFilter: (
        column: ColumnDefinition<Record<string, unknown>>,
        fieldKey: string,
        value: string,
        onColumnFilter?: ColumnFilterHandler
    ) => void
    handleMultiSelectFilter: (
        column: ColumnDefinition<Record<string, unknown>>,
        fieldKey: string,
        value: string,
        onColumnFilter?: ColumnFilterHandler
    ) => void
}

export const createFilterHandlers = (
    setFilterState: React.Dispatch<React.SetStateAction<FilterState>>
): FilterHandlers => {
    const handleSearchChange = (fieldKey: string, value: string) => {
        setFilterState((prev) => ({
            ...prev,
            columnSearchValues: {
                ...prev.columnSearchValues,
                [fieldKey]: value,
            },
        }))
    }

    const handleSelectFilter = (
        column: ColumnDefinition<Record<string, unknown>>,
        fieldKey: string,
        value: string,
        onColumnFilter?: ColumnFilterHandler
    ) => {
        setFilterState((prev) => {
            const currentSelected = prev.columnSelectedValues[fieldKey]
            const currentValue = Array.isArray(currentSelected)
                ? currentSelected[0]
                : typeof currentSelected === 'string'
                  ? currentSelected
                  : ''

            if (currentValue === value) {
                onColumnFilter?.(
                    String(column.field),
                    FilterType.SELECT,
                    '',
                    'equals'
                )
                return {
                    ...prev,
                    columnSelectedValues: {
                        ...prev.columnSelectedValues,
                        [fieldKey]: [],
                    },
                }
            } else {
                onColumnFilter?.(
                    String(column.field),
                    FilterType.SELECT,
                    value,
                    'equals'
                )
                return {
                    ...prev,
                    columnSelectedValues: {
                        ...prev.columnSelectedValues,
                        [fieldKey]: [value],
                    },
                }
            }
        })
    }

    const handleMultiSelectFilter = (
        column: ColumnDefinition<Record<string, unknown>>,
        fieldKey: string,
        value: string,
        onColumnFilter?: ColumnFilterHandler
    ) => {
        setFilterState((prev) => {
            const currentSelected = prev.columnSelectedValues[fieldKey]
            // Only handle array values for multiselect
            const currentArray = Array.isArray(currentSelected)
                ? currentSelected
                : []
            let newSelected = [...currentArray]
            if (newSelected.includes(value)) {
                newSelected = newSelected.filter((v) => v !== value)
            } else {
                newSelected.push(value)
            }

            onColumnFilter?.(
                String(column.field),
                FilterType.MULTISELECT,
                newSelected,
                'equals'
            )

            return {
                ...prev,
                columnSelectedValues: {
                    ...prev.columnSelectedValues,
                    [fieldKey]: newSelected,
                },
            }
        })
    }

    return {
        handleSearchChange,
        handleSelectFilter,
        handleMultiSelectFilter,
    }
}
