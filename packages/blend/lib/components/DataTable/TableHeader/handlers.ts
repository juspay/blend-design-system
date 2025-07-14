import { SortDirection, FilterType, ColumnDefinition } from '../types'

export type SortState = {
    currentSortField: string | null
    currentSortDirection: SortDirection
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
    handleSort: (field: string) => void
    handleSortAscending: (field: string) => void
    handleSortDescending: (field: string) => void
}

export type FilterHandlers = {
    handleSearchChange: (fieldKey: string, value: string) => void // Updates search state only
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

export const createSortHandlers = (
    sortState: SortState,
    setSortState: React.Dispatch<React.SetStateAction<SortState>>,
    onSort: (field: keyof Record<string, unknown>) => void
): SortHandlers => {
    const handleSort = (field: string) => {
        onSort(field as keyof Record<string, unknown>)
    }

    const handleSortAscending = (field: string) => {
        const fieldKey = field as keyof Record<string, unknown>

        if (
            sortState.currentSortField !== field ||
            sortState.currentSortDirection !== SortDirection.ASCENDING
        ) {
            setSortState({
                currentSortField: field,
                currentSortDirection: SortDirection.ASCENDING,
            })

            if (
                sortState.currentSortField === field &&
                sortState.currentSortDirection === SortDirection.DESCENDING
            ) {
                onSort(fieldKey)
            } else if (sortState.currentSortField !== field) {
                onSort(fieldKey)
            }
        }
    }

    const handleSortDescending = (field: string) => {
        const fieldKey = field as keyof Record<string, unknown>

        if (
            sortState.currentSortField !== field ||
            sortState.currentSortDirection !== SortDirection.DESCENDING
        ) {
            setSortState({
                currentSortField: field,
                currentSortDirection: SortDirection.DESCENDING,
            })

            if (
                sortState.currentSortField === field &&
                sortState.currentSortDirection === SortDirection.ASCENDING
            ) {
                onSort(fieldKey)
            } else if (sortState.currentSortField !== field) {
                onSort(fieldKey)
                setTimeout(() => onSort(fieldKey), 0)
            }
        }
    }

    return {
        handleSort,
        handleSortAscending,
        handleSortDescending,
    }
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
        setFilterState((prev) => ({
            ...prev,
            columnSelectedValues: {
                ...prev.columnSelectedValues,
                [fieldKey]: [value],
            },
        }))
        onColumnFilter?.(
            String(column.field),
            FilterType.SELECT,
            value,
            'equals'
        )
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
