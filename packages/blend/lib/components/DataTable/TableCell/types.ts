import { ColumnDefinition } from '../types'

export type TableCellProps<T extends Record<string, unknown>> = {
    column: ColumnDefinition<T>
    row: T
    rowIndex: number
    colIndex?: number
    tableTitle?: string
    isEditing: boolean
    currentValue: unknown
    width: React.CSSProperties
    frozenStyles?: React.CSSProperties
    isFirstRow?: boolean
    customBackgroundColor?: string
    hasCustomBackground?: boolean
    onFieldChange: (value: unknown) => void
    getDisplayValue?: (value: unknown, column: ColumnDefinition<T>) => unknown
    'data-row-index'?: number
    'data-col-index'?: number
    tabIndex?: number
    onFocus?: () => void
    onClick?: () => void
    role?: string
}
