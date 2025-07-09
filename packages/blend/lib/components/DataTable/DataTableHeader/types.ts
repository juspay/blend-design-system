import { ColumnDefinition, SearchConfig, AdvancedFilterProps } from "../types";

export type DataTableHeaderProps<T extends Record<string, unknown>> = {
  title?: string;
  description?: string;
  showToolbar?: boolean;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  searchConfig: SearchConfig;
  enableAdvancedFilter?: boolean;
  advancedFilterComponent?: React.ComponentType<AdvancedFilterProps>;
  advancedFilters?: unknown[];
  visibleColumns: ColumnDefinition<T>[];
  data: T[];
  onSearch: (query: string) => void;
  onAdvancedFiltersChange?: (filters: unknown[]) => void;
  onClearAllFilters: () => void;
  headerSlot1?: React.ReactNode;
  headerSlot2?: React.ReactNode;
  headerSlot3?: React.ReactNode;
};
