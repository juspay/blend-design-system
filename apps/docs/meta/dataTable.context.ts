import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const dataTableMeta: ComponentMeta = {
  componentName: "DataTable",
  componentDescription:
    "A comprehensive data table component with advanced features including sorting, filtering, pagination, search, inline editing, and row expansion capabilities.",
  features: [
    "Advanced sorting and filtering",
    "Server-side and client-side data handling",
    "Pagination with customizable page sizes",
    "Universal search functionality",
    "Inline editing capabilities",
    "Row expansion for detailed views",
    "Column management (show/hide columns)",
    "Bulk actions support",
    "Custom cell rendering",
    "Loading states and empty states",
  ],
  usageExamples: [
    {
      title: "Basic Data Table",
      description: "Simple data table with basic configuration",
      code: `<DataTable
  data={tableData}
  columns={columns}
  idField="id"
  title="User Management"
/>`,
    },
    {
      title: "Table with Search and Filtering",
      description: "Data table with search and column filtering enabled",
      code: `<DataTable
  data={tableData}
  columns={columns}
  idField="id"
  enableSearch={true}
  enableFiltering={true}
  searchPlaceholder="Search users..."
/>`,
    },
    {
      title: "Table with Pagination",
      description: "Data table with custom pagination settings",
      code: `<DataTable
  data={tableData}
  columns={columns}
  idField="id"
  pagination={{
    currentPage: 1,
    pageSize: 20,
    totalRows: 100,
    pageSizeOptions: [10, 20, 50]
  }}
/>`,
    },
    {
      title: "Table with Row Expansion",
      description: "Data table with expandable rows for detailed views",
      code: `<DataTable
  data={tableData}
  columns={columns}
  idField="id"
  enableRowExpansion={true}
  renderExpandedRow={({ row }) => (
    <div>Detailed view for {row.name}</div>
  )}
/>`,
    },
  ],
  props: [
    {
      propName: "data",
      propType: "T[]",
      typeDefinition: `T extends Record<string, unknown>`,
      propDescription: "Array of data objects to display in the table",
      llmContext: "Array of data objects to display in the table",
      propDefault: "-",
      category: "Data",
      required: true,
    },
    {
      propName: "columns",
      propType: "ColumnDefinition<T>[]",
      typeDefinition: `type ColumnDefinition<T> = {
  field: keyof T;
  header: string;
  type: ColumnType;
  width?: string;
  isSortable?: boolean;
  isVisible?: boolean;
  canHide?: boolean;
  isEditable?: boolean;
  isFilterable?: boolean;
  filterType?: FilterType;
  filterOptions?: FilterOption[];
  className?: string;
  renderCell?: (value: T[keyof T], row: T) => React.ReactNode;
  renderEditCell?: (value: T[keyof T], row: T, onChange: (value: unknown) => void) => React.ReactNode;
}`,
      propDescription:
        "Column definitions specifying how each column should be displayed and behave",
      llmContext:
        "Column definitions specifying how each column should be displayed and behave",
      propDefault: "-",
    },
    {
      propName: "idField",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Field name to use as unique identifier for rows",
      llmContext: "Field name to use as unique identifier for rows",
      propDefault: "-",
    },
    {
      propName: "title",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Optional table title displayed in the header",
      llmContext: "Optional table title displayed in the header",
      propDefault: "-",
    },
    {
      propName: "description",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Optional table description displayed in the header",
      llmContext: "Optional table description displayed in the header",
      propDefault: "-",
    },
    {
      propName: "isHoverable",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to show hover effects on table rows",
      llmContext: "Whether to show hover effects on table rows",
      propDefault: "true",
    },
    {
      propName: "defaultSort",
      propType: "SortConfig",
      typeDefinition: `type SortConfig = {
  field: string;
  direction: SortDirection;
}

enum SortDirection {
  ASCENDING = "asc",
  DESCENDING = "desc",
  NONE = "none",
}`,
      propDescription: "Default sort configuration for the table",
      llmContext: "Default sort configuration for the table",
      propDefault: "-",
    },
    {
      propName: "enableSearch",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to enable universal search functionality",
      llmContext: "Whether to enable universal search functionality",
      propDefault: "false",
    },
    {
      propName: "searchPlaceholder",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Placeholder text for the search input",
      llmContext: "Placeholder text for the search input",
      propDefault: '"Search..."',
    },
    {
      propName: "enableFiltering",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to enable column filtering (local)",
      llmContext: "Whether to enable column filtering (local)",
      propDefault: "false",
    },
    {
      propName: "enableAdvancedFilter",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to enable advanced filtering (user-controlled)",
      llmContext: "Whether to enable advanced filtering (user-controlled)",
      propDefault: "false",
    },
    {
      propName: "advancedFilterComponent",
      propType: "React.ComponentType<AdvancedFilterProps>",
      typeDefinition: `type AdvancedFilterProps = {
  filters: unknown[];
  onFiltersChange: (filters: unknown[]) => void;
  onClearFilters: () => void;
}`,
      propDescription: "Custom advanced filter component",
      llmContext: "Custom advanced filter component",
      propDefault: "-",
    },
    {
      propName: "advancedFilters",
      propType: "unknown[]",
      typeDefinition: "unknown[]",
      propDescription: "Current filters for advanced filter",
      llmContext: "Current filters for advanced filter",
      propDefault: "[]",
    },
    {
      propName: "serverSideSearch",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether search is handled server-side (disables local search)",
      llmContext:
        "Whether search is handled server-side (disables local search)",
      propDefault: "false",
    },
    {
      propName: "serverSideFiltering",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether filtering is handled server-side (disables local filtering)",
      llmContext:
        "Whether filtering is handled server-side (disables local filtering)",
      propDefault: "false",
    },
    {
      propName: "serverSidePagination",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether pagination is handled server-side (disables local pagination)",
      llmContext:
        "Whether pagination is handled server-side (disables local pagination)",
      propDefault: "false",
    },
    {
      propName: "isLoading",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether data is currently being loaded (shows loading states)",
      llmContext:
        "Whether data is currently being loaded (shows loading states)",
      propDefault: "false",
    },
    {
      propName: "enableColumnManager",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether to show column manager for hiding/showing columns",
      llmContext: "Whether to show column manager for hiding/showing columns",
      propDefault: "true",
    },
    {
      propName: "showToolbar",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether to show the toolbar with search and filter controls",
      llmContext: "Whether to show the toolbar with search and filter controls",
      propDefault: "true",
    },
    {
      propName: "enableInlineEdit",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to enable inline editing of table rows",
      llmContext: "Whether to enable inline editing of table rows",
      propDefault: "false",
    },
    {
      propName: "enableRowExpansion",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to enable row expansion functionality",
      llmContext: "Whether to enable row expansion functionality",
      propDefault: "false",
    },
    {
      propName: "renderExpandedRow",
      propType: "(expandedData: ExpandedRowData) => React.ReactNode",
      typeDefinition: `type ExpandedRowData = {
  row: T;
  index: number;
  isExpanded: boolean;
  toggleExpansion: () => void;
}`,
      propDescription:
        "Render function for expanded row content with access to row data and utilities",
      llmContext:
        "Render function for expanded row content with access to row data and utilities",
      propDefault: "-",
    },
    {
      propName: "isRowExpandable",
      propType: "(row: T, index: number) => boolean",
      typeDefinition: "(row: T, index: number) => boolean",
      propDescription:
        "Optional function to determine if a row should be expandable",
      llmContext:
        "Optional function to determine if a row should be expandable",
      propDefault: "-",
    },
    {
      propName: "pagination",
      propType: "PaginationConfig",
      typeDefinition: `type PaginationConfig = {
  currentPage: number;
  pageSize: number;
  totalRows: number;
  pageSizeOptions: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}`,
      propDescription: "Pagination configuration for the table",
      llmContext: "Pagination configuration for the table",
      propDefault: `{
  currentPage: 1,
  pageSize: 10,
  totalRows: 0,
  pageSizeOptions: [10, 20, 50, 100],
}`,
    },
    {
      propName: "onPageChange",
      propType: "(page: number) => void",
      typeDefinition: "(page: number) => void",
      propDescription: "Callback when page changes",
      llmContext: "Callback when page changes",
      propDefault: "-",
    },
    {
      propName: "onPageSizeChange",
      propType: "(size: number) => void",
      typeDefinition: "(size: number) => void",
      propDescription: "Callback when page size changes",
      llmContext: "Callback when page size changes",
      propDefault: "-",
    },
    {
      propName: "onSortChange",
      propType: "(sortConfig: SortConfig) => void",
      typeDefinition: "(sortConfig: SortConfig) => void",
      propDescription: "Callback when sort changes",
      llmContext: "Callback when sort changes",
      propDefault: "-",
    },
    {
      propName: "onSearchChange",
      propType: "(searchConfig: SearchConfig) => void",
      typeDefinition: `type SearchConfig = {
  query: string;
  searchFields?: string[];
  caseSensitive?: boolean;
}`,
      propDescription: "Callback when search changes",
      llmContext: "Callback when search changes",
      propDefault: "-",
    },
    {
      propName: "onFilterChange",
      propType: "(filters: ColumnFilter[]) => void",
      typeDefinition: `type ColumnFilter = {
  field: keyof Record<string, unknown>;
  type: FilterType;
  value: string | string[] | number | Date;
  operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
}

enum FilterType {
  TEXT = "text",
  SELECT = "select",
  MULTISELECT = "multiselect",
  DATE = "date",
  NUMBER = "number",
}`,
      propDescription: "Callback when column filters change (local)",
      llmContext: "Callback when column filters change (local)",
      propDefault: "-",
    },
    {
      propName: "onAdvancedFiltersChange",
      propType: "(filters: unknown[]) => void",
      typeDefinition: "(filters: unknown[]) => void",
      propDescription: "Callback when advanced filters change",
      llmContext: "Callback when advanced filters change",
      propDefault: "-",
    },
    {
      propName: "onRowSave",
      propType: "(rowId: unknown, updatedRow: T) => void",
      typeDefinition: "(rowId: unknown, updatedRow: T) => void",
      propDescription: "Callback when row is saved after editing",
      llmContext: "Callback when row is saved after editing",
      propDefault: "-",
    },
    {
      propName: "onRowCancel",
      propType: "(rowId: unknown) => void",
      typeDefinition: "(rowId: unknown) => void",
      propDescription: "Callback when row edit is cancelled",
      llmContext: "Callback when row edit is cancelled",
      propDefault: "-",
    },
    {
      propName: "onRowExpansionChange",
      propType: "(rowId: unknown, isExpanded: boolean, rowData: T) => void",
      typeDefinition:
        "(rowId: unknown, isExpanded: boolean, rowData: T) => void",
      propDescription: "Callback when row expansion changes",
      llmContext: "Callback when row expansion changes",
      propDefault: "-",
    },
    {
      propName: "className",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Optional additional class name for the table container",
      llmContext: "Optional additional class name for the table container",
      propDefault: "-",
    },
    {
      propName: "headerSlot1",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Custom slot on the left side of the toolbar",
      llmContext: "Custom slot on the left side of the toolbar",
      propDefault: "-",
    },
    {
      propName: "headerSlot2",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Custom slot in the middle of the toolbar",
      llmContext: "Custom slot in the middle of the toolbar",
      propDefault: "-",
    },
    {
      propName: "headerSlot3",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Custom slot on the right side of the toolbar",
      llmContext: "Custom slot on the right side of the toolbar",
      propDefault: "-",
    },
    {
      propName: "bulkActions",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Custom bulk actions to display in the bulk action bar",
      llmContext: "Custom bulk actions to display in the bulk action bar",
      propDefault: "-",
    },
  ],
};

export default dataTableMeta;
