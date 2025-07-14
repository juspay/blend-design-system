import {
    SortConfig,
    ColumnFilter,
    SearchConfig,
    FilterType,
    ColumnDefinition,
} from './types'
import {
    AvatarData,
    TagData,
    SelectData,
    MultiSelectData,
    DateData,
    DateRangeData,
} from './columnTypes'
export declare const filterData: <T extends Record<string, unknown>>(
    data: T[],
    filters: Record<string, unknown>
) => T[]
export declare const searchData: <T extends Record<string, unknown>>(
    data: T[],
    searchConfig: SearchConfig,
    columns: ColumnDefinition<T>[]
) => T[]
export declare const applyColumnFilters: <T extends Record<string, unknown>>(
    data: T[],
    filters: ColumnFilter[]
) => T[]
export declare const getUniqueColumnValues: <T extends Record<string, unknown>>(
    data: T[],
    field: keyof T
) => string[]
export declare const sortData: <T extends Record<string, unknown>>(
    data: T[],
    sortConfig: SortConfig
) => T[]
export declare const formatCurrency: (
    amount: number,
    currency?: string
) => string
export declare const getDefaultColumnWidth: <T extends Record<string, unknown>>(
    column: ColumnDefinition<T>
) => {
    minWidth: string
    maxWidth: string
}
export declare const getColumnStyles: <T extends Record<string, unknown>>(
    column: ColumnDefinition<T>
) => React.CSSProperties
export declare const formatDate: (dateString: string) => string
export declare const updateColumnFilter: <T extends Record<string, unknown>>(
    currentFilters: ColumnFilter[],
    field: keyof T,
    type: FilterType,
    value: string | string[],
    operator?:
        | 'equals'
        | 'contains'
        | 'startsWith'
        | 'endsWith'
        | 'gt'
        | 'lt'
        | 'gte'
        | 'lte'
) => ColumnFilter[]
export declare const generateCSVContent: <T extends Record<string, unknown>>(
    data: T[],
    columns: ColumnDefinition<T>[]
) => string
export declare const downloadCSV: (
    csvContent: string,
    filename?: string
) => void
export declare const exportSelectedRowsToCSV: <
    T extends Record<string, unknown>,
>(
    allData: T[],
    selectedRows: Record<string, boolean>,
    columns: ColumnDefinition<T>[],
    idField: string,
    filename?: string
) => void
export declare const getSelectedRowCount: (
    selectedRows: Record<string, boolean>
) => number
export declare const createSearchConfig: (
    query: string,
    caseSensitive?: boolean,
    searchFields?: string[]
) => SearchConfig
export declare const clearAllFiltersAndSearch: () => {
    filters: ColumnFilter[]
    searchConfig: SearchConfig
}
export declare const createAvatarData: (
    label: string,
    options?: {
        sublabel?: string
        imageUrl?: string
        initials?: string
    }
) => AvatarData
export declare const createTagData: (
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
) => TagData
export declare const createSelectData: (
    value: string,
    options?: {
        label?: string
        disabled?: boolean
    }
) => SelectData
export declare const createMultiSelectData: (
    values: string[],
    labels?: string[]
) => MultiSelectData
export declare const createDateData: (
    date: Date | string,
    format?: string
) => DateData
export declare const createDateRangeData: (
    startDate: Date | string,
    endDate: Date | string,
    format?: string
) => DateRangeData
export declare const validateDataForColumnType: <
    T extends Record<string, unknown>,
>(
    data: T,
    columns: ColumnDefinition<T>[]
) => {
    isValid: boolean
    errors: string[]
}
export declare const enforceDataTypeMatching: <
    T extends Record<string, unknown>,
>(
    data: T[],
    columns: ColumnDefinition<T>[],
    options?: {
        throwOnError?: boolean
        logWarnings?: boolean
    }
) => boolean
