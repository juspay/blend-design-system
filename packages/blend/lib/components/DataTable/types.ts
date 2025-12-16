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

export type BulkActionsConfig = {
    showSelectAll?: boolean
    showDeselectAll?: boolean
    onSelectAll?: () => void
    onDeselectAll?: () => void
    customActions?: ReactNode
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
    onRowSelectionChange?: (
        selectedRowIds: string[],
        isSelected: boolean,
        rowId: string,
        rowData: T
    ) => void

    bulkActions?: BulkActionsConfig

    rowActions?: RowActionsConfig<T>

    getRowStyle?: (row: T, index: number) => React.CSSProperties

    tableBodyHeight?: string | number

    // Mobile configuration
    mobileColumnsToShow?: number
}
