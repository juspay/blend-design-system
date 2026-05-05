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

export enum CursorDirection {
    NEXT = 'next',
    PREV = 'prev',
}

/** How the table footer drives pagination: numbered pages vs next/previous cursors. */
export type DataTablePaginationMode = 'page' | 'cursor'

export type CursorValueMap = Record<string, unknown>

type BivariantCallback<T extends (...args: never[]) => unknown> = {
    bivarianceHack: T
}['bivarianceHack']

/**
 * `onPageChange` handler for DataTable.
 * - **Page mode:** first argument is the 1-based page index.
 * - **Cursor mode:** first argument is `CursorDirection`; second is the cursor payload for the API; third is the row limit for that request.
 */
export type DataTableOnPageChange = BivariantCallback<
    (
        pageOrCursorDirection: number | CursorDirection,
        cursorPayload?: unknown,
        limit?: number
    ) => void
>

/** @deprecated Use {@link DataTableOnPageChange} instead. */
export type DataTablePageChangeHandler = DataTableOnPageChange

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

export type DateColumnProps = {
    date: Date | string
    format?: string
    showTime?: boolean
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
          dateFormat?: string
          showTime?: boolean
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

/**
 * Cursor-based pagination state for APIs without total counts (next/previous only).
 * Pass as `pagination` when `paginationMode` is `"cursor"` (or legacy `cursorBasedPagination`).
 *
 * @example
 * {
 *   direction: CursorDirection.NEXT,
 *   limit: 20,
 *   cursor: "last_row_id",
 *   hasNextPage: true,
 *   hasPrevPage: false,
 *   limitOptions: [10, 20, 50]
 * }
 */
export type CursorPaginationConfig = {
    direction: CursorDirection
    limit: number
    /**
     * Single cursor when next/prev share one token; ignored if `nextCursor` / `prevCursor` / `cursorParams` are set as needed.
     */
    cursor?: unknown
    /** Token(s) for the next page request (e.g. endCursor, cursorAfterId). */
    nextCursor?: unknown
    /** Token(s) for the previous page request (e.g. startCursor, cursorBeforeId). */
    prevCursor?: unknown
    /**
     * Full request payload for APIs that need multiple fields (e.g. cursorAfterId + cursorAfterCreatedAt).
     * Sent as the callback’s `cursorPayload` for both next and prev unless you split with `nextCursor` / `prevCursor`.
     */
    cursorParams?: CursorValueMap
    hasNextPage: boolean
    hasPrevPage: boolean
    limitOptions?: number[]
    /** Optional; omit when the API does not expose a total. */
    totalRows?: number
    /** Optional display hint when mapping cursor pages to a synthetic page index. */
    currentPage?: number
    /** Alias for `limit` (rows per request). */
    pageSize?: number
}

/** @deprecated Use {@link CursorPaginationConfig} instead. */
export type CursorConfig = CursorPaginationConfig

/** Union of offset (page index) and cursor pagination props for `DataTable`. */
export type DataTablePaginationConfig =
    | PaginationConfig
    | CursorPaginationConfig

export function isCursorPaginationConfig(
    pagination?: DataTablePaginationConfig
): pagination is CursorPaginationConfig {
    if (!pagination || typeof pagination !== 'object') {
        return false
    }

    return 'direction' in pagination && 'limit' in pagination
}

/** @deprecated Use {@link isCursorPaginationConfig} instead. */
export const isCursorConfig = isCursorPaginationConfig

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
    /**
     * Pagination configuration: {@link PaginationConfig} (page index + total) or {@link CursorPaginationConfig} (cursors).
     */
    pagination?: DataTablePaginationConfig
    serverSidePagination?: boolean
    /**
     * `'page'` — numbered pages and jump UI. `'cursor'` — next/previous only; pair with {@link CursorPaginationConfig}.
     * @default 'page'
     */
    paginationMode?: DataTablePaginationMode
    /**
     * @deprecated Use `paginationMode="cursor"` instead.
     */
    cursorBasedPagination?: boolean
    onPageChange?: DataTableOnPageChange
    onPageSizeChange?: (pageSize: number) => void

    isLoading?: boolean
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
    onRowSave?: (rowId: unknown, updatedRow: T) => void
    onRowCancel?: (rowId: unknown) => void
    onRowClick?: (row: T, index: number) => void
    onFieldChange?: (rowId: unknown, fieldName: keyof T, value: unknown) => void

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

    rowActions?: RowActionsConfig<T>

    onOperations?: (field: keyof T) => void
    onInsertLeft?: (field: keyof T) => void
    onInsertRight?: (field: keyof T) => void
    onDeleteColumn?: (field: keyof T) => void

    getRowStyle?: (row: T, index: number) => React.CSSProperties

    tableBodyHeight?: string | number

    // Mobile configuration
    mobileColumnsToShow?: number
}
