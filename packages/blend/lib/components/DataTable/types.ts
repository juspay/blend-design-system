import { ColumnType } from "./columnTypes";

export enum SortDirection {
  ASCENDING = "asc",
  DESCENDING = "desc",
  NONE = "none",
}

export enum FilterType {
  TEXT = "text",
  SELECT = "select",
  MULTISELECT = "multiselect",
  DATE = "date",
  NUMBER = "number",
}

export type ColumnDefinition<T extends Record<string, unknown>> = {
  /** Field key in data object - must be a valid key of T */
  field: keyof T;
  /** Header text to display - must be a string */
  header: string;
  /** Column type for filtering and display - must be a valid ColumnType */
  type: ColumnType;
  /** Minimum width of the column - must be a valid CSS width string */
  minWidth?: string;
  /** Maximum width of the column - must be a valid CSS width string */
  maxWidth?: string;
  /** Whether column is sortable */
  isSortable?: boolean;
  /** Whether column is initially visible */
  isVisible?: boolean;
  /** Whether column can be hidden by user */
  canHide?: boolean;
  /** Whether column is editable inline */
  isEditable?: boolean;
  /** Whether column is filterable */
  isFilterable?: boolean;
  /** Type of filter for this column - must be a valid FilterType */
  filterType?: FilterType;
  /** Filter options for select/multiselect filters */
  filterOptions?: FilterOption[];
  /** Custom classes to apply to the column - must be a string */
  className?: string;
  /** Custom render function for display mode */
  renderCell?: (value: T[keyof T], row: T) => React.ReactNode;
  /** Custom render for edit mode */
  renderEditCell?: (
    value: T[keyof T],
    row: T,
    onChange: (value: unknown) => void,
  ) => React.ReactNode;
};

export type TypeSafeColumn<
  T extends Record<string, unknown>,
  Field extends keyof T,
> = ColumnDefinition<T> & {
  field: Field;
};

export type CreateColumnDefinition<T extends Record<string, unknown>> = {
  <K extends keyof T>(column: TypeSafeColumn<T, K>): TypeSafeColumn<T, K>;
};

export type FilterOption = {
  /** Unique identifier for the filter option - must be a non-empty string */
  id: string;
  /** Display label for the filter - must be a non-empty string */
  label: string;
  /** Value to filter by - must be a string */
  value: string;
  /** Optional nested options */
  options?: FilterOption[];
};

export type Filter = {
  /** Unique identifier for the filter */
  id: string;
  /** Display label for the filter */
  label: string;
  /** Filter options */
  options: FilterOption[];
  /** Currently selected value(s) */
  selectedValues?: string[];
  /** Whether multiple selections are allowed */
  isMultiSelect?: boolean;
};

export type ColumnFilter = {
  /** Column field to filter */
  field: keyof Record<string, unknown>;
  /** Filter type */
  type: FilterType;
  /** Filter value(s) */
  value: string | string[] | number | Date;
  /** Filter operator (equals, contains, startsWith, endsWith, greater than, etc.) */
  operator?:
    | "equals"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "gt"
    | "lt"
    | "gte"
    | "lte";
};

export type SearchConfig = {
  /** Search query string */
  query: string;
  /** Fields to search in (if empty, searches all visible columns) */
  searchFields?: string[];
  /** Whether search is case sensitive */
  caseSensitive?: boolean;
};

export type SortConfig = {
  field: string;
  direction: SortDirection;
};

export type PaginationConfig = {
  currentPage: number;
  pageSize: number;
  totalRows: number;
  pageSizeOptions: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
};

export type ColumnManagerProps<T extends Record<string, unknown>> = {
  columns: ColumnDefinition<T>[];
  visibleColumns: ColumnDefinition<T>[];
  onColumnChange: (columns: ColumnDefinition<T>[]) => void;
};

export type AdvancedFilterProps = {
  /** Current filters applied */
  filters: unknown[];
  /** Callback when filters change */
  onFiltersChange: (filters: unknown[]) => void;
  /** Callback to clear all filters */
  onClearFilters: () => void;
};

export type DataTableProps<T extends Record<string, unknown>> = {
  /** Array of data objects to display */
  data: T[];
  /** Column definitions */
  columns: ColumnDefinition<T>[];
  /** Field name to use as unique identifier for rows */
  idField: string;
  /** Optional table title */
  title?: string;
  /** Optional table description */
  description?: string;
  /** Whether to show hover effects on rows */
  isHoverable?: boolean;
  /** Default sort configuration */
  defaultSort?: SortConfig;
  /** Whether to enable universal search */
  enableSearch?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Whether to enable column filtering (local) */
  enableFiltering?: boolean;
  /** Whether to enable advanced filtering (user-controlled) */
  enableAdvancedFilter?: boolean;
  /** Custom advanced filter component */
  advancedFilterComponent?: React.ComponentType<AdvancedFilterProps>;
  /** Current filters for advanced filter */
  advancedFilters?: unknown[];
  /** Whether search is handled server-side (disables local search) */
  serverSideSearch?: boolean;
  /** Whether filtering is handled server-side (disables local filtering) */
  serverSideFiltering?: boolean;
  /** Whether pagination is handled server-side (disables local pagination) */
  serverSidePagination?: boolean;
  /** Whether data is currently being loaded (shows loading states) */
  isLoading?: boolean;
  /** Whether to show column manager */
  enableColumnManager?: boolean;
  /** Whether to show toolbar */
  showToolbar?: boolean;
  /** Whether to enable inline editing */
  enableInlineEdit?: boolean;
  /** Whether to enable row expansion */
  enableRowExpansion?: boolean;
  /** Render function for expanded row content with access to row data and utilities */
  renderExpandedRow?: (expandedData: {
    row: T;
    index: number;
    isExpanded: boolean;
    toggleExpansion: () => void;
  }) => React.ReactNode;
  /** Optional function to determine if a row should be expandable */
  isRowExpandable?: (row: T, index: number) => boolean;
  /** Optional expanded row data mapping function */
  getExpandedRowData?: (row: T, index: number) => Record<string, unknown>;
  /** Pagination configuration */
  pagination?: PaginationConfig;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (size: number) => void;
  /** Callback when sort changes */
  onSortChange?: (sortConfig: SortConfig) => void;
  /** Callback when search changes */
  onSearchChange?: (searchConfig: SearchConfig) => void;
  /** Callback when column filters change (local) */
  onFilterChange?: (filters: ColumnFilter[]) => void;
  /** Callback when advanced filters change */
  onAdvancedFiltersChange?: (filters: unknown[]) => void;
  /** Callback when row is saved after editing */
  onRowSave?: (rowId: unknown, updatedRow: T) => void;
  /** Callback when row edit is cancelled */
  onRowCancel?: (rowId: unknown) => void;
  /** Callback when row expansion changes */
  onRowExpansionChange?: (
    rowId: unknown,
    isExpanded: boolean,
    rowData: T,
  ) => void;
  /** Callback when row is clicked */
  onRowClick?: (row: T, index: number) => void;
  /** Optional additional class name */
  className?: string;
  /** Custom slot on the left side of the toolbar */
  headerSlot1?: React.ReactNode;
  /** Custom slot in the middle of the toolbar */
  headerSlot2?: React.ReactNode;
  /** Custom slot on the right side of the toolbar */
  headerSlot3?: React.ReactNode;
  /** Custom bulk actions */
  bulkActions?: React.ReactNode;
};
