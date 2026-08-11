import { ReactNode } from 'react'
import { ButtonType, ButtonSize, ButtonSubType } from '../Button/types'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'
import { TooltipSide, TooltipAlign, TooltipSize } from '../Tooltip/types'

export enum SortDirection {
    NONE = 'none',
    ASCENDING = 'asc',
    DESCENDING = 'desc',
}

export enum FilterType {
    TEXT = 'text',
    NUMBER = 'number',
    SELECT = 'select',
    MULTISELECT = 'multiselect',
    DATE = 'date',
    BOOLEAN = 'boolean',
    SLIDER = 'slider',
}

export enum ColumnType {
    TEXT = 'text',
    NUMBER = 'number',
    AVATAR = 'avatar',
    TAG = 'tag',
    PROGRESS = 'progress',
    DROPDOWN = 'dropdown',
    REACT_ELEMENT = 'react_element',
    SELECT = 'select',
    MULTISELECT = 'multiselect',
    DATE = 'date',
    DATE_RANGE = 'date_range',
    SLIDER = 'slider',
    CUSTOM = 'custom',
}

export enum PivotAggregationType {
    SUM = 'sum',
    COUNT = 'count',
    AVERAGE = 'average',
    MEAN = 'mean',
    MEDIAN = 'median',
    MIN = 'min',
    MAX = 'max',
}

export type AvatarColumnProps = {
    src?: string
    alt?: string
    label: string
    sublabel?: string
    imageUrl?: string
}

export type TagColumnProps = {
    text: string
    variant?: 'filled' | 'subtle' | 'outlined' | 'no_fill'
    color?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'warning'
        | 'error'
        | 'neutral'
    size?: 'sm' | 'md' | 'lg'
    leftSlot?: ReactNode
    rightSlot?: ReactNode
}

export type ProgressColumnProps = {
    value: number
    max?: number
    label?: string
    showPercentage?: boolean
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

export type DropdownColumnProps = {
    options: Array<{
        id: string
        label: string
        value: unknown
        icon?: React.ReactNode
    }>
    selectedValue?: unknown
    placeholder?: string
    onSelect?: (value: unknown) => void
}

/**
 * Format string for date display in DataTable DATE columns.
 * @example 'DD MMM YYYY'           → "24 Jun 2026"
 * @example 'DD/MM/YYYY'            → "24/06/2026"
 * @example 'DD MMM YYYY, hh:mm A'  → "24 Jun 2026, 10:30 AM"
 */

export type DateFormat =
    | 'DD MMM YYYY'
    | 'DD/MM/YYYY'
    | 'MM/DD/YYYY'
    | 'YYYY-MM-DD'
    | 'DD MMM YYYY, hh:mm A'
    | 'DD MMM YYYY, HH:mm'
    | 'MMM DD, YYYY'
    | 'YYYY/MM/DD HH:mm'
    | 'HH:mm:ss'
    | (string & {})

export type DateColumnProps = {
    date: Date | string
    format?: DateFormat
    showTime?: boolean
    dateLabel?: string
}

export type SliderColumnProps = {
    min: number
    max: number
    step?: number
    valueType?: 'number' | 'percentage' | 'decimal'
    decimalPlaces?: number
    prefix?: string
    suffix?: string
}

export type FilterOption = {
    id: string
    label: string
    value: string // Changed from unknown to string for compatibility
}

export type ColumnManagerProps<T extends Record<string, unknown>> = {
    columns: ColumnDefinition<T>[]
    visibleColumns: ColumnDefinition<T>[]
    onColumnChange: (columns: ColumnDefinition<T>[]) => void
    maxSelections?: number
    alwaysSelectedColumns?: string[]
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
    multiSelectWidth?: number
    disabled?: boolean
}

export type AdvancedFilterProps = {
    filters: unknown[]
    onFiltersChange: (filters: unknown[]) => void
    onClearFilters: () => void
}

export type BaseColumnDefinition<T> = {
    field: keyof T
    header: string
    headerSubtext?: string
    minWidth?: string
    maxWidth?: string
    width?: string
    isVisible?: boolean
    isSortable?: boolean
    isEditable?: boolean
    filterOptions?: FilterOption[]
    canHide?: boolean
    frozen?: boolean
    className?: string
    /**
     * Explicitly selects the filter UI for this column, overriding what `type` would infer.
     * - SELECT and MULTISELECT work on any column whose cell values are strings or numbers.
     * - DATE requires cell values that can be parsed as dates; rows whose value can't be
     *   parsed are filtered out rather than shown.
     * - SLIDER additionally requires `sliderConfig`, which the `ColumnDefinition` union only
     *   provides when `type` is `ColumnType.SLIDER` — so SLIDER is effectively limited to
     *   slider columns today.
     * - TEXT, NUMBER, and BOOLEAN have no filter component, so the column falls back to
     *   the `type`-derived filter behaviour instead of disabling filtering.
     * @example
     * // A TEXT column filtered as a multiselect against a fixed set of options
     * {
     *   field: 'status',
     *   header: 'Status',
     *   type: ColumnType.TEXT,
     *   filterType: FilterType.MULTISELECT,
     *   filterOptions: [
     *     { id: 'active', label: 'Active', value: 'active' },
     *     { id: 'inactive', label: 'Inactive', value: 'inactive' },
     *   ],
     * }
     */
    filterType?: FilterType
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    /**
     * Function to get the field to sort by. Allows sorting by a different field than the column's field.
     * @param sortType - Optional sort type identifier (e.g., 'primary', 'delta', 'absolute')
     * @returns The field name to sort by
     * @example
     * // Sort by delta_total_volume when sortType is 'delta'
     * getSortField: (sortType) => sortType === 'delta' ? 'delta_total_volume' : 'total_volume'
     */
    getSortField?: (sortType?: string) => string
    /**
     * Enable delta sorting UI in the sorting popover. When true, shows "Value | Delta" sections.
     * Requires getSortField to be provided for delta sorting to work.
     * @default false
     */
    isDeltaSortable?: boolean
    /**
     * Optional function to format/transform values before comparison during sorting.
     * Useful for custom sorting logic (e.g., extracting numbers from formatted strings like "INR 276").
     * The sortType parameter allows you to apply different formatting logic for delta sorting vs primary sorting.
     * @param value - The raw value from the data row
     * @param row - The entire row data
     * @param column - The column definition
     * @param sortType - Optional sort type identifier (e.g., 'primary', 'delta', 'absolute') - same value passed to getSortField. Use this to determine if delta sorting is active and apply appropriate formatting.
     * @returns The formatted value to use for comparison
     * @example
     * // Different formatting for delta vs primary sorting
     * sortValueFormatter: (value, row, column, sortType) => {
     *   // For delta sorting, values might already be numbers
     *   if (sortType === 'delta') {
     *     return typeof value === 'number' ? value : 0
     *   }
     *   // For primary sorting, extract numeric value from formatted string
     *   if (typeof value === 'string') {
     *     const num = parseFloat(value.replace(/[^\d.-]/g, ''))
     *     return isNaN(num) ? 0 : num
     *   }
     *   return value
     * }
     */
    sortValueFormatter?: (
        value: unknown,
        row: T,
        column: ColumnDefinition<T>,
        sortType?: string
    ) => unknown
}

export type ColumnDefinition<T> =
    | (BaseColumnDefinition<T> & {
          type: ColumnType.TEXT
          renderCell?: (value: string, row: T, index: number) => ReactNode
      })
    | (BaseColumnDefinition<T> & {
          type: ColumnType.NUMBER
          renderCell?: (value: number, row: T, index: number) => ReactNode
          format?: 'integer' | 'decimal' | 'currency' | 'percentage'
          precision?: number
      })
    | (BaseColumnDefinition<T> & {
          type: ColumnType.AVATAR
          renderCell?: (
              value: AvatarColumnProps,
              row: T,
              index: number
          ) => ReactNode
      })
    | (BaseColumnDefinition<T> & {
          type: ColumnType.TAG
          renderCell?: (
              value: TagColumnProps,
              row: T,
              index: number
          ) => ReactNode
      })
    | (BaseColumnDefinition<T> & {
          type: ColumnType.PROGRESS
          renderCell?: (
              value: ProgressColumnProps,
              row: T,
              index: number
          ) => ReactNode
      })
    | (BaseColumnDefinition<T> & {
          type: ColumnType.DROPDOWN
          renderCell?: (
              value: DropdownColumnProps,
              row: T,
              index: number
          ) => ReactNode
          dropdownOptions?: Array<{ id: string; label: string; value: unknown }>
      })
    | (BaseColumnDefinition<T> & {
          type: ColumnType.DATE
          renderCell?: (
              value: DateColumnProps,
              row: T,
              index: number
          ) => ReactNode
          dateFormat?: DateFormat
          showTime?: boolean
          /**
           * Optional label appended after the formatted date, e.g. "(IST)".
           * Column-level value can be overridden per-cell via DateColumnProps.dateLabel.
           */
          dateLabel?: string
      })
    | (BaseColumnDefinition<T> & {
          type: ColumnType.SLIDER
          renderCell?: (value: number, row: T, index: number) => ReactNode
          sliderConfig: SliderColumnProps
      })
    | (BaseColumnDefinition<T> & {
          type: ColumnType.REACT_ELEMENT
          renderCell: (value: unknown, row: T, index: number) => ReactNode
          isSortable: false // React elements cannot be sorted
      })
    | (BaseColumnDefinition<T> & {
          type:
              | ColumnType.SELECT
              | ColumnType.MULTISELECT
              | ColumnType.DATE_RANGE
              | ColumnType.CUSTOM
          renderCell?: (value: unknown, row: T, index?: number) => ReactNode
      })

export type SortConfig = {
    field: string
    direction: SortDirection
    sortType?: string // Optional sort type (e.g., 'primary', 'delta', 'absolute')
}

export type SearchConfig = {
    query: string
    caseSensitive?: boolean
    searchFields?: string[]
}

export type DataTableExportFormat = 'csv' | 'xlsx'

export type DataTableExportScope = 'currentPage' | 'allLoaded'

export type DataTableExportContext<T extends Record<string, unknown>> = {
    visibleColumns: ColumnDefinition<T>[]
    filters: ColumnFilter[]
    advancedFilters: unknown[]
    search: SearchConfig
    sort: SortConfig | null
    scope: DataTableExportScope
}

export type DataTableExportConfig<T extends Record<string, unknown>> = {
    enabled: boolean
    fileName?: string
    formats?: DataTableExportFormat[]
    scope?: DataTableExportScope
    onExport?: (
        context: DataTableExportContext<T>
    ) => T[] | void | Promise<T[] | void>
}

export type ColumnFilter = {
    field: keyof Record<string, unknown>
    type: FilterType
    value: string | string[] | { min: number; max: number }
    operator:
        | 'equals'
        | 'contains'
        | 'startsWith'
        | 'endsWith'
        | 'gt'
        | 'lt'
        | 'gte'
        | 'lte'
        | 'range'
}

export type PaginationConfig = {
    currentPage: number
    pageSize: number
    totalRows: number
    pageSizeOptions?: number[]
}

export type BulkActionsConfig = {
    showSelectAll?: boolean
    showDeselectAll?: boolean
    onSelectAll?: () => void
    onDeselectAll?: () => void
    customActions?: ReactNode
    showExport?: boolean
}

export type RowActionConfig<T extends Record<string, unknown>> = {
    id: string
    text?: string
    buttonType?: ButtonType
    size?: ButtonSize
    subType?: ButtonSubType
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    disabled?: boolean | ((row: T, index: number) => boolean)
    hidden?: boolean | ((row: T, index: number) => boolean)
    onClick: (row: T, index: number) => void
}

export type RowActionsConfig<T extends Record<string, unknown>> = {
    showEditAction?: boolean
    slot1?: RowActionConfig<T>
    slot2?: RowActionConfig<T>
}

export type RowSelectionConfig<T extends Record<string, unknown>> = {
    isDisabled?: (row: T, index: number) => boolean
    disabledText?: (row: T, index: number) => string
}

type BaseRowAnimationConfig = {
    /** Enter animation duration in seconds. */
    enterDuration: number
    /** Enter animation Y offset in pixels. */
    enterOffset: number
}

export type RowAnimationConfig = BaseRowAnimationConfig &
    (
        | {
              /** Transition type for layout animations. */
              transitionType: 'bezier'
              /** Bezier duration in seconds. */
              duration: number
              /** Bezier easing curve as [x1, y1, x2, y2] cubic-bezier control points. */
              bezier: [number, number, number, number]
          }
        | {
              /** Transition type for layout animations. */
              transitionType: 'spring'
              /** Spring stiffness. */
              stiffness: number
              /** Spring damping. */
              damping: number
              /** Spring mass. */
              mass: number
          }
    )

export type DataTableProps<T extends Record<string, unknown>> = {
    data: T[]
    columns: ColumnDefinition<T>[]
    idField: keyof T
    title?: string
    description?: string
    descriptionTooltipProps?: {
        side?: TooltipSide
        align?: TooltipAlign
        size?: TooltipSize
        showArrow?: boolean
        delayDuration?: number
        offset?: number
    }
    className?: string
    isHoverable?: boolean
    defaultSort?: SortConfig
    onSortChange?: (sortConfig: SortConfig) => void
    enableSearch?: boolean
    searchPlaceholder?: string
    serverSideSearch?: boolean
    onSearchChange?: (searchConfig: SearchConfig) => void
    enableFiltering?: boolean
    enableAdvancedFilter?: boolean
    advancedFilterComponent?: React.ComponentType<AdvancedFilterProps>
    advancedFilters?: unknown[]
    serverSideFiltering?: boolean
    onFilterChange?: (filters: ColumnFilter[]) => void
    onAdvancedFiltersChange?: (filters: unknown[]) => void
    columnFreeze?: number
    /** Freeze last N columns on the right side (sticky right). */
    columnFreezeRight?: number
    enableColumnManager?: boolean
    enableColumnReordering?: boolean
    onColumnReorder?: (columns: ColumnDefinition<T>[]) => void
    columnManagerMaxSelections?: number
    columnManagerAlwaysSelected?: (keyof T)[]
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
    columnManagerWidth?: number
    pagination?: PaginationConfig
    serverSidePagination?: boolean
    onPageChange?: (page: number) => void
    onPageSizeChange?: (pageSize: number) => void

    isLoading?: boolean
    error?: boolean
    renderErrorState?: (retry?: () => void) => ReactNode
    onRetry?: () => void
    showEmptyState?: boolean
    renderEmptyState?: () => ReactNode
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    isRowLoading?: (row: T, index: number) => boolean
    showHeader?: boolean
    showToolbar?: boolean
    showSettings?: boolean
    showFooter?: boolean
    headerSlot1?: ReactNode
    headerSlot2?: ReactNode

    enableInlineEdit?: boolean
    showActionsColumn?: boolean
    onRowSave?: (rowId: unknown, updatedRow: T) => void
    onRowCancel?: (rowId: unknown) => void
    onRowClick?: (row: T, index: number) => void
    onFieldChange?: (rowId: unknown, fieldName: keyof T, value: unknown) => void
    onHeaderChange?: (field: keyof T, newHeader: string) => void

    enableRowExpansion?: boolean
    renderExpandedRow?: (expandedData: {
        row: T
        index: number
        isExpanded: boolean
        toggleExpansion: () => void
    }) => ReactNode
    isRowExpandable?: (row: T, index: number) => boolean
    onRowExpansionChange?: (
        rowId: unknown,
        isExpanded: boolean,
        rowData: T
    ) => void

    enableRowSelection?: boolean
    rowSelectionConfig?: RowSelectionConfig<T>
    showBulkActionBar?: boolean
    onRowSelectionChange?: (
        selectedRowIds: string[],
        isSelected: boolean,
        rowId: string,
        rowData: T
    ) => void

    bulkActions?: BulkActionsConfig

    /** Export the visible table columns and the rows in the configured scope. */
    exportConfig?: DataTableExportConfig<T>

    rowActions?: RowActionsConfig<T>

    onOperations?: (field: keyof T) => void
    onInsertLeft?: (field: keyof T) => void
    onInsertRight?: (field: keyof T) => void
    onDeleteColumn?: (field: keyof T) => void

    getRowStyle?: (row: T, index: number) => React.CSSProperties

    enableRowAnimation?: boolean
    rowAnimationConfig?: RowAnimationConfig

    tableBodyHeight?: string | number

    // Mobile configuration
    mobileColumnsToShow?: number

    /**
     * Optional label appended after formatted dates in DATE columns,
     * e.g. "(IST)". Can be overridden per-column or per-cell.
     */
    dateLabel?: string

    // Internal pivot modal configuration
    enablePivotTable?: boolean
    pivotTableConfig?: {
        triggerButton?: ReactNode
        triggerSlot?: 1 | 2 | 3
        title?: string
        description?: string
        showExport?: boolean
        initialConfig?: {
            rows?: (keyof T)[]
            columns?: (keyof T)[]
            values?: Array<{
                field: keyof T
                aggregation: PivotAggregationType
            }>
        }
        previewColumns?: Array<{
            key: string
            label: string
        }>
        previewRows?: Array<Record<string, unknown> & { __pivotId: string }>
        /**
         * Configure which aggregation operations are available in the Values section.
         * If not provided, all operations will be shown.
         * @example ['sum', 'count', 'average'] // Show only sum, count, and average
         */
        availableAggregations?: PivotAggregationType[]
        onConfigChange?: (config: {
            rows: (keyof T)[]
            columns: (keyof T)[]
            values: Array<{
                field: keyof T
                aggregation: PivotAggregationType
            }>
        }) => void
        onExport?: (config: {
            rows: (keyof T)[]
            columns: (keyof T)[]
            values: Array<{
                field: keyof T
                aggregation: PivotAggregationType
            }>
        }) => void
    }
}
