import { ColumnDefinition, FilterType } from '../types'

export type TableHeaderProps<T extends Record<string, unknown>> = {
    visibleColumns: ColumnDefinition<T>[]
    initialColumns: ColumnDefinition<T>[]
    selectAll: boolean | 'indeterminate'
    enableInlineEdit?: boolean
    enableColumnManager?: boolean
    enableRowExpansion?: boolean
    enableRowSelection?: boolean
    data?: T[]
    columnFreeze?: number
    onSort: (field: keyof T) => void
    onSelectAll: (checked: boolean | 'indeterminate') => void
    onColumnChange: (columns: ColumnDefinition<T>[]) => void
    onColumnFilter?: (
        field: string,
        type: FilterType,
        value: string | string[] | { min: number; max: number },
        operator?:
            | 'equals'
            | 'contains'
            | 'startsWith'
            | 'endsWith'
            | 'gt'
            | 'lt'
            | 'gte'
            | 'lte'
            | 'range'
    ) => void
    onHeaderChange?: (field: keyof T, newHeader: string) => void
    getColumnWidth: (
        column: ColumnDefinition<T>,
        index: number
    ) => React.CSSProperties
}
