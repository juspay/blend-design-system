import { ColumnDefinition } from '../types'

export type TableCellProps<T extends Record<string, unknown>> = {
    column: ColumnDefinition<T>
    row: T
    rowIndex: number
    isEditing: boolean
    currentValue: unknown
    width: React.CSSProperties
    frozenStyles?: React.CSSProperties
    isFirstRow?: boolean
    onFieldChange: (value: unknown) => void
    getDisplayValue?: (value: unknown, column: ColumnDefinition<T>) => unknown
}
