import { ReactNode } from 'react'
import { ColumnDefinition, PivotAggregationType } from '../types'

export type PivotValueConfig<T extends Record<string, unknown>> = {
    field: keyof T
    aggregation: PivotAggregationType
}

export type PivotFilterConfig<T extends Record<string, unknown>> = {
    field: keyof T
    selectedValues: string[]
}

export type PivotTableConfig<T extends Record<string, unknown>> = {
    rows: Array<keyof T>
    columns: Array<keyof T>
    values: PivotValueConfig<T>[]
    filters: PivotFilterConfig<T>[]
}

export type PivotTableModalProps<T extends Record<string, unknown>> = {
    isOpen: boolean
    onClose: () => void
    data: T[]
    columns: ColumnDefinition<T>[]
    title?: string
    description?: string
    showFilters?: boolean
    showExport?: boolean
    initialConfig?: Partial<PivotTableConfig<T>>
    previewColumns?: PivotPreviewColumn[]
    previewRows?: PivotPreviewRow[]
    onConfigChange?: (config: PivotTableConfig<T>) => void
    onExport?: (config: PivotTableConfig<T>) => void
    trigger?: ReactNode
}

export type PivotPreviewColumn = {
    key: string
    label: string
}

export type PivotPreviewRow = Record<string, unknown> & {
    __pivotId: string
    __pivotRowType?: 'data' | 'grand_total'
}
