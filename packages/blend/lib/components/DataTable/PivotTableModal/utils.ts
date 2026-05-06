import { ColumnDefinition, PivotAggregationType } from '../types'
import { PivotPreviewColumn, PivotPreviewRow, PivotValueConfig } from './types'

export const normalizePivotValue = (value: unknown): string => {
    if (value == null) return 'N/A'
    if (typeof value === 'string' || typeof value === 'number') {
        return String(value)
    }
    if (Array.isArray(value)) {
        return value.map((item) => normalizePivotValue(item)).join(', ')
    }
    if (typeof value === 'object') {
        const objectValue = value as Record<string, unknown>
        if ('text' in objectValue) return String(objectValue.text)
        if ('label' in objectValue) return String(objectValue.label)
        if ('value' in objectValue) return String(objectValue.value)
        if ('selectedValue' in objectValue)
            return String(objectValue.selectedValue)
        if ('values' in objectValue && Array.isArray(objectValue.values)) {
            return objectValue.values
                .map((item) => normalizePivotValue(item))
                .join(', ')
        }
        if ('name' in objectValue) return String(objectValue.name)
        try {
            return JSON.stringify(objectValue)
        } catch {
            return 'N/A'
        }
    }
    return String(value)
}

const truncatePivotLabel = (value: string, maxLength = 36): string => {
    if (value.length <= maxLength) return value
    return `${value.slice(0, maxLength - 3)}...`
}

const toNumeric = (value: unknown): number => {
    if (typeof value === 'number') return value
    const parsed = Number(
        normalizePivotValue(value)
            .replace(/,/g, '')
            .replace(/[^\d.-]/g, '')
    )
    return Number.isNaN(parsed) ? 0 : parsed
}

const aggregate = (
    rows: Array<Record<string, unknown>>,
    field: string,
    aggregation: PivotAggregationType
): number => {
    if (aggregation === PivotAggregationType.COUNT) {
        return rows.length
    }

    const values = rows.map((row) => toNumeric(row[field]))
    if (!values.length) return 0

    switch (aggregation) {
        case PivotAggregationType.SUM:
            return values.reduce((sum, value) => sum + value, 0)
        case PivotAggregationType.AVERAGE:
        case PivotAggregationType.MEAN:
            return values.reduce((sum, value) => sum + value, 0) / values.length
        case PivotAggregationType.MEDIAN: {
            const sorted = [...values].sort((a, b) => a - b)
            const middle = Math.floor(sorted.length / 2)
            return sorted.length % 2 === 0
                ? (sorted[middle - 1] + sorted[middle]) / 2
                : sorted[middle]
        }
        case PivotAggregationType.MIN:
            return Math.min(...values)
        case PivotAggregationType.MAX:
            return Math.max(...values)
        default:
            return values.reduce((sum, value) => sum + value, 0)
    }
}

export const getPivotFieldOptions = <T extends Record<string, unknown>>(
    columns: ColumnDefinition<T>[]
): Array<{ key: string; label: string }> =>
    columns.map((column) => ({
        key: String(column.field),
        label: column.header || String(column.field),
    }))

export const isPivotNumericValue = (value: unknown): boolean => {
    if (typeof value === 'number') return Number.isFinite(value)
    if (value == null) return false
    const normalized = normalizePivotValue(value)
        .replace(/,/g, '')
        .replace(/[^\d.-]/g, '')
        .trim()
    if (!normalized) return false
    const parsed = Number(normalized)
    return Number.isFinite(parsed)
}

export const getSupportedAggregationsForField = <
    T extends Record<string, unknown>,
>(
    data: T[],
    field: keyof T,
    allowedAggregations: PivotAggregationType[],
    isNumericColumn = false
): PivotAggregationType[] => {
    const hasNumericValue =
        isNumericColumn || data.some((row) => isPivotNumericValue(row[field]))

    return allowedAggregations.filter((aggregation) => {
        if (aggregation === PivotAggregationType.COUNT) return true
        return hasNumericValue
    })
}

/**
 * Builds the rectangular grid the modal preview renders as a {@link DataTable}.
 *
 * - **Columns:** First column key `__rowLabel` — header is joined row field names
 *   (or `All Rows`). Each unique combination of **column** dimension values
 *   becomes a group; for each group, every **value** config adds one column
 *   (`columnKey__field__aggregation`).
 * - **Rows:** One row per distinct row-dimension key; cells are aggregated from
 *   raw rows that match that row key and column key.
 * - **Grand total:** Appended last with `__pivotRowType: 'grand_total'` and
 *   `__rowLabel` `"Grand Total"`; each metric is aggregated over the full
 *   (already filtered) `data` for that column bucket.
 */
export const buildPivotPreview = <T extends Record<string, unknown>>(
    data: T[],
    rowFields: Array<keyof T> | Array<{ field: keyof T; showTotal?: boolean }>,
    columnFields:
        | Array<keyof T>
        | Array<{ field: keyof T; showTotal?: boolean }>,
    valueConfigs: PivotValueConfig<T>[]
): { columns: PivotPreviewColumn[]; rows: PivotPreviewRow[] } => {
    if (!valueConfigs.length) return { columns: [], rows: [] }

    const normalizedRowFields = rowFields.map((field) =>
        typeof field === 'object' && field !== null ? field.field : field
    ) as Array<keyof T>
    const normalizedColumnFields = columnFields.map((field) =>
        typeof field === 'object' && field !== null ? field.field : field
    ) as Array<keyof T>

    const shouldShowRowGrandTotal =
        !rowFields.length ||
        rowFields.some(
            (field) =>
                typeof field !== 'object' ||
                field === null ||
                field.showTotal !== false
        )
    const shouldShowColumnTotals =
        normalizedColumnFields.length > 0 &&
        columnFields.some(
            (field) =>
                typeof field !== 'object' ||
                field === null ||
                field.showTotal !== false
        )

    const rowGroups = new Map<string, T[]>()
    const columnKeySet = new Set<string>()

    data.forEach((row) => {
        const rowKey = normalizedRowFields.length
            ? normalizedRowFields
                  .map((field) => normalizePivotValue(row[field]))
                  .join(' | ')
            : 'All Rows'
        const columnKey = normalizedColumnFields.length
            ? normalizedColumnFields
                  .map((field) => normalizePivotValue(row[field]))
                  .join(' | ')
            : 'All Columns'

        if (!rowGroups.has(rowKey)) {
            rowGroups.set(rowKey, [])
        }
        rowGroups.get(rowKey)!.push(row)
        columnKeySet.add(columnKey)
    })

    const orderedColumnKeys = Array.from(columnKeySet).sort((a, b) =>
        a.localeCompare(b)
    )
    const rowLabel = normalizedRowFields.length
        ? normalizedRowFields.map((field) => String(field)).join(' / ')
        : 'All Rows'

    const previewColumns: PivotPreviewColumn[] = [
        { key: '__rowLabel', label: rowLabel },
        ...orderedColumnKeys.flatMap((columnKey) =>
            valueConfigs.map((valueConfig, valueIndex) => ({
                key: `${columnKey}__${String(valueConfig.field)}__${valueConfig.aggregation}__valueIndex_${valueIndex}`,
                label: `${truncatePivotLabel(columnKey)} | ${valueConfig.aggregation}(${String(valueConfig.field)})`,
            }))
        ),
        ...(shouldShowColumnTotals
            ? valueConfigs.map((valueConfig, valueIndex) => ({
                  key: `__columnTotal__${String(valueConfig.field)}__${valueConfig.aggregation}__valueIndex_${valueIndex}`,
                  label: `Total | ${valueConfig.aggregation}(${String(valueConfig.field)})`,
              }))
            : []),
    ]

    const dataRows: PivotPreviewRow[] = Array.from(rowGroups.entries()).map(
        ([rowKey, groupedRows], index) => {
            const row: PivotPreviewRow = {
                __pivotId: `pivot-row-${index}`,
                __rowLabel: truncatePivotLabel(rowKey, 60),
                __pivotRowType: 'data',
            }

            orderedColumnKeys.forEach((columnKey) => {
                const columnRows = normalizedColumnFields.length
                    ? groupedRows.filter(
                          (groupRow) =>
                              normalizedColumnFields
                                  .map((field) =>
                                      normalizePivotValue(groupRow[field])
                                  )
                                  .join(' | ') === columnKey
                      )
                    : groupedRows

                valueConfigs.forEach((valueConfig, valueIndex) => {
                    const key = `${columnKey}__${String(valueConfig.field)}__${valueConfig.aggregation}__valueIndex_${valueIndex}`
                    row[key] = Number(
                        aggregate(
                            columnRows as Array<Record<string, unknown>>,
                            String(valueConfig.field),
                            valueConfig.aggregation
                        ).toFixed(2)
                    )
                })
            })
            if (shouldShowColumnTotals) {
                valueConfigs.forEach((valueConfig, valueIndex) => {
                    const key = `__columnTotal__${String(valueConfig.field)}__${valueConfig.aggregation}__valueIndex_${valueIndex}`
                    row[key] = Number(
                        aggregate(
                            groupedRows as Array<Record<string, unknown>>,
                            String(valueConfig.field),
                            valueConfig.aggregation
                        ).toFixed(2)
                    )
                })
            }

            return row
        }
    )

    const rows: PivotPreviewRow[] = [...dataRows]
    if (shouldShowRowGrandTotal) {
        const grandTotalRow: PivotPreviewRow = {
            __pivotId: 'pivot-grand-total',
            __rowLabel: 'Grand Total',
            __pivotRowType: 'grand_total',
        }

        orderedColumnKeys.forEach((columnKey) => {
            const columnRows = normalizedColumnFields.length
                ? data.filter(
                      (row) =>
                          normalizedColumnFields
                              .map((field) => normalizePivotValue(row[field]))
                              .join(' | ') === columnKey
                  )
                : data
            valueConfigs.forEach((valueConfig, valueIndex) => {
                const key = `${columnKey}__${String(valueConfig.field)}__${valueConfig.aggregation}__valueIndex_${valueIndex}`
                grandTotalRow[key] = Number(
                    aggregate(
                        columnRows as Array<Record<string, unknown>>,
                        String(valueConfig.field),
                        valueConfig.aggregation
                    ).toFixed(2)
                )
            })
        })
        if (shouldShowColumnTotals) {
            valueConfigs.forEach((valueConfig, valueIndex) => {
                const key = `__columnTotal__${String(valueConfig.field)}__${valueConfig.aggregation}__valueIndex_${valueIndex}`
                grandTotalRow[key] = Number(
                    aggregate(
                        data as Array<Record<string, unknown>>,
                        String(valueConfig.field),
                        valueConfig.aggregation
                    ).toFixed(2)
                )
            })
        }
        rows.push(grandTotalRow)
    }

    return {
        columns: previewColumns,
        rows,
    }
}
