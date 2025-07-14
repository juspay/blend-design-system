import { FilterType, ColumnDefinition, ColumnFilter } from '../types'
export type ColumnFilterProps<T extends Record<string, unknown>> = {
    column: ColumnDefinition<T>
    data: T[]
    currentFilter?: ColumnFilter
    onFilter: (
        field: keyof T,
        type: FilterType,
        value: string | string[],
        operator?: string
    ) => void
}
declare const ColumnFilter: import('react').ForwardRefExoticComponent<
    ColumnFilterProps<Record<string, unknown>> &
        import('react').RefAttributes<HTMLDivElement>
>
export default ColumnFilter
