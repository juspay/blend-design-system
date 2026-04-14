import { ReactNode } from 'react'
import type { TableTokenType } from '../dataTable.tokens'
import { ColumnDefinition, PivotAggregationType } from '../types'
import type { PivotModalStyleTokens } from './pivotModalStyleTokens'

export type PivotValueConfig<T extends Record<string, unknown>> = {
    field: keyof T
    aggregation: PivotAggregationType
}

export type PivotTableConfig<T extends Record<string, unknown>> = {
    rows: Array<keyof T>
    columns: Array<keyof T>
    values: PivotValueConfig<T>[]
}

export type PivotTableModalProps<T extends Record<string, unknown>> = {
    isOpen: boolean
    onClose: () => void
    data: T[]
    columns: ColumnDefinition<T>[]
    title?: string
    description?: string
    showExport?: boolean
    initialConfig?: Partial<PivotTableConfig<T>>
    previewColumns?: PivotPreviewColumn[]
    previewRows?: PivotPreviewRow[]
    onConfigChange?: (config: PivotTableConfig<T>) => void
    onExport?: (config: PivotTableConfig<T>) => void
    trigger?: ReactNode
    /**
     * Configure which aggregation operations are available in the Values section.
     * If not provided, all operations will be shown.
     * @example ['sum', 'count', 'average'] // Show only sum, count, and average
     */
    availableAggregations?: PivotAggregationType[]
}

export type PivotPreviewColumn = {
    key: string
    label: string
}

export type PivotPreviewRow = Record<string, unknown> & {
    __pivotId: string
    __pivotRowType?: 'data' | 'grand_total'
}

export type PivotPreviewPanelProps = {
    pivot: PivotModalStyleTokens
    tableToken: TableTokenType
    showExport: boolean
    previewRows?: PivotPreviewRow[]
    previewColumns?: PivotPreviewColumn[]
    previewTableColumns: ColumnDefinition<Record<string, unknown>>[]
    onExport: () => void
}
