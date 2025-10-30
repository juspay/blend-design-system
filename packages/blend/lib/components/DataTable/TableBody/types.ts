import { ColumnDefinition, RowActionsConfig } from '../types'
import { MobileDataTableConfig } from '../hooks/useMobileDataTable'

export type TableBodyProps<T extends Record<string, unknown>> = {
    currentData: T[]
    visibleColumns: ColumnDefinition<T>[]
    idField: string
    tableTitle?: string
    selectedRows: Record<string, boolean>
    editingRows: Record<string, boolean>
    editValues: Record<string, T>
    expandedRows: Record<string, boolean>
    enableInlineEdit?: boolean
    enableColumnManager?: boolean
    enableRowExpansion?: boolean
    enableRowSelection?: boolean
    rowActions?: RowActionsConfig<T>
    columnFreeze?: number
    mobileConfig?: MobileDataTableConfig
    mobileOverflowColumns?: ColumnDefinition<T>[]
    onMobileOverflowClick?: (row: T) => void
    renderExpandedRow?: (expandedData: {
        row: T
        index: number
        isExpanded: boolean
        toggleExpansion: () => void
    }) => React.ReactNode
    isRowExpandable?: (row: T, index: number) => boolean
    onRowSelect: (rowId: unknown) => void
    onEditRow: (rowId: unknown) => void
    onSaveRow: (rowId: unknown) => void
    onCancelEdit: (rowId: unknown) => void
    onRowExpand: (rowId: unknown) => void
    onFieldChange: (rowId: unknown, field: keyof T, value: unknown) => void
    onRowClick?: (row: T, index: number) => void
    getColumnWidth: (
        column: ColumnDefinition<T>,
        index: number
    ) => React.CSSProperties
    getRowStyle?: (row: T, index: number) => React.CSSProperties
    getDisplayValue?: (value: unknown, column: ColumnDefinition<T>) => unknown
}
