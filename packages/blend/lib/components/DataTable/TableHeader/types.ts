import { ColumnDefinition, ColumnFilter, FilterType } from "../types";

export type TableHeaderProps<T extends Record<string, unknown>> = {
  visibleColumns: ColumnDefinition<T>[];
  initialColumns: ColumnDefinition<T>[];
  selectAll: boolean | "indeterminate";
  enableInlineEdit?: boolean;
  enableColumnManager?: boolean;
  enableRowExpansion?: boolean;
  data?: T[];
  columnFilters?: ColumnFilter[];
  onSort: (field: keyof T) => void;
  onSelectAll: (checked: boolean | "indeterminate") => void;
  onColumnChange: (columns: ColumnDefinition<T>[]) => void;
  onColumnFilter?: (
    field: keyof T,
    type: FilterType,
    value: string | string[],
    operator?:
      | "equals"
      | "contains"
      | "startsWith"
      | "endsWith"
      | "gt"
      | "lt"
      | "gte"
      | "lte",
  ) => void;
  onHeaderChange?: (field: keyof T, newHeader: string) => void;
  getColumnWidth: (
    column: ColumnDefinition<T>,
    index: number,
  ) => React.CSSProperties;
};
