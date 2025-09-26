import { ColumnDefinition, FilterType, RowActionsConfig } from '../types'
import { MobileDataTableConfig } from '../hooks/useMobileDataTable'

export type TableHeaderProps<T extends Record<string, unknown>> = {
    visibleColumns: ColumnDefinition<T>[]
    allVisibleColumns?: ColumnDefinition<T>[]
    initialColumns: ColumnDefinition<T>[]
    selectAll: boolean | 'indeterminate'
    enableInlineEdit?: boolean
    enableColumnManager?: boolean
    columnManagerMaxSelections?: number
    columnManagerAlwaysSelected?: string[]
    columnManagerPrimaryAction?: {
        text: string
        onClick: (selectedColumns: string[]) => void
        disabled?: boolean
        loading?: boolean
    }
    columnManagerSecondaryAction?: {
        text: string
        onClick: () => void
        disabled?: boolean
        loading?: boolean
    }
    enableRowExpansion?: boolean
    enableRowSelection?: boolean
    rowActions?: RowActionsConfig<T>
    data?: T[]
    columnFreeze?: number
    mobileConfig?: MobileDataTableConfig
    mobileOverflowColumns?: ColumnDefinition<T>[]
    onMobileOverflowClick?: (row: T) => void
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
