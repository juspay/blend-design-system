import {
  SortDirection,
  SortConfig,
  ColumnFilter,
  SearchConfig,
  FilterType,
  ColumnDefinition,
} from "./types";
import {
  ColumnType,
  validateColumnData,
  AvatarData,
  TagData,
  SelectData,
  MultiSelectData,
  DateData,
  DateRangeData,
} from "./columnTypes";

export const filterData = <T extends Record<string, unknown>>(
  data: T[],
  filters: Record<string, unknown>,
): T[] => {
  return data.filter((row) => {
    return Object.entries(filters).every(([field, filterValue]) => {
      const cellValue = row[field];
      if (Array.isArray(filterValue)) {
        return filterValue.includes(cellValue);
      }
      return String(cellValue)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    });
  });
};

export const searchData = <T extends Record<string, unknown>>(
  data: T[],
  searchConfig: SearchConfig,
  columns: ColumnDefinition<T>[],
): T[] => {
  if (!searchConfig.query.trim()) {
    return data;
  }

  const query = searchConfig.caseSensitive
    ? searchConfig.query.trim()
    : searchConfig.query.trim().toLowerCase();

  const searchFields = searchConfig.searchFields?.length
    ? searchConfig.searchFields
    : columns.map((col) => String(col.field));

  return data.filter((row) => {
    return searchFields.some((fieldStr) => {
      const cellValue = row[fieldStr as keyof T];
      if (cellValue == null) return false;

      const valueStr = searchConfig.caseSensitive
        ? String(cellValue)
        : String(cellValue).toLowerCase();

      return valueStr.includes(query);
    });
  });
};

export const applyColumnFilters = <T extends Record<string, unknown>>(
  data: T[],
  filters: ColumnFilter[],
): T[] => {
  if (!filters.length) {
    return data;
  }

  return data.filter((row) => {
    return filters.every((filter) => {
      const cellValue = row[filter.field as keyof T];
      const filterValue = filter.value;
      const operator = filter.operator || "contains";

      if (cellValue == null) return false;

      switch (filter.type) {
        case FilterType.TEXT:
          return applyTextFilter(cellValue, filterValue as string, operator);

        case FilterType.SELECT:
          return String(cellValue) === String(filterValue);

        case FilterType.MULTISELECT: {
          const filterValues = Array.isArray(filterValue)
            ? filterValue
            : [filterValue];
          return filterValues.some((val) => String(cellValue) === String(val));
        }

        case FilterType.NUMBER:
          return applyNumberFilter(cellValue, filterValue as number, operator);

        case FilterType.DATE:
          return applyDateFilter(cellValue, filterValue as Date, operator);

        default:
          return true;
      }
    });
  });
};

const applyTextFilter = (
  cellValue: unknown,
  filterValue: string,
  operator: string,
): boolean => {
  const cellStr = String(cellValue).toLowerCase();
  const filterStr = filterValue.toLowerCase();

  switch (operator) {
    case "equals":
      return cellStr === filterStr;
    case "contains":
      return cellStr.includes(filterStr);
    case "startsWith":
      return cellStr.startsWith(filterStr);
    case "endsWith":
      return cellStr.endsWith(filterStr);
    default:
      return cellStr.includes(filterStr);
  }
};

const applyNumberFilter = (
  cellValue: unknown,
  filterValue: number,
  operator: string,
): boolean => {
  const cellNum =
    typeof cellValue === "number" ? cellValue : parseFloat(String(cellValue));
  if (isNaN(cellNum)) return false;

  switch (operator) {
    case "equals":
      return cellNum === filterValue;
    case "gt":
      return cellNum > filterValue;
    case "lt":
      return cellNum < filterValue;
    case "gte":
      return cellNum >= filterValue;
    case "lte":
      return cellNum <= filterValue;
    default:
      return cellNum === filterValue;
  }
};

const applyDateFilter = (
  cellValue: unknown,
  filterValue: Date,
  operator: string,
): boolean => {
  const cellDate = new Date(String(cellValue));
  if (isNaN(cellDate.getTime())) return false;

  const cellTime = cellDate.getTime();
  const filterTime = filterValue.getTime();

  switch (operator) {
    case "equals":
      return cellTime === filterTime;
    case "gt":
      return cellTime > filterTime;
    case "lt":
      return cellTime < filterTime;
    case "gte":
      return cellTime >= filterTime;
    case "lte":
      return cellTime <= filterTime;
    default:
      return cellTime === filterTime;
  }
};

export const getUniqueColumnValues = <T extends Record<string, unknown>>(
  data: T[],
  field: keyof T,
): string[] => {
  const uniqueValues = new Set<string>();

  data.forEach((row) => {
    const value = row[field];
    if (value != null) {
      uniqueValues.add(String(value));
    }
  });

  return Array.from(uniqueValues).sort();
};

export const sortData = <T extends Record<string, unknown>>(
  data: T[],
  sortConfig: SortConfig,
): T[] => {
  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.field];
    const bValue = b[sortConfig.field];

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    const aCompare =
      typeof aValue === "number" ? aValue : String(aValue).toLowerCase();
    const bCompare =
      typeof bValue === "number" ? bValue : String(bValue).toLowerCase();

    let result = 0;
    if (aCompare < bCompare) result = -1;
    else if (aCompare > bCompare) result = 1;

    return sortConfig.direction === SortDirection.ASCENDING ? result : -result;
  });
};

export const formatCurrency = (amount: number, currency = "INR"): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const getDefaultColumnWidth = <T extends Record<string, unknown>>(
  column: ColumnDefinition<T>,
): { minWidth: string; maxWidth: string } => {
  if (column.minWidth && column.maxWidth) {
    return { minWidth: column.minWidth, maxWidth: column.maxWidth };
  }

  if (column.minWidth) {
    return { minWidth: column.minWidth, maxWidth: "300px" };
  }

  if (column.maxWidth) {
    return { minWidth: "120px", maxWidth: column.maxWidth };
  }

  switch (column.type) {
    case ColumnType.AVATAR:
      return { minWidth: "200px", maxWidth: "300px" };
    case ColumnType.TAG:
      return { minWidth: "100px", maxWidth: "150px" };
    case ColumnType.SELECT:
      return { minWidth: "120px", maxWidth: "180px" };
    case ColumnType.MULTISELECT:
      return { minWidth: "150px", maxWidth: "220px" };
    case ColumnType.DATE:
    case ColumnType.DATE_RANGE:
      return { minWidth: "120px", maxWidth: "160px" };
    case ColumnType.NUMBER:
      return { minWidth: "80px", maxWidth: "120px" };
    case ColumnType.TEXT:
      return { minWidth: "120px", maxWidth: "250px" };
    case ColumnType.CUSTOM:
      return { minWidth: "120px", maxWidth: "250px" };
    default:
      return { minWidth: "120px", maxWidth: "200px" };
  }
};

export const getColumnStyles = <T extends Record<string, unknown>>(
  column: ColumnDefinition<T>,
): React.CSSProperties => {
  const { minWidth, maxWidth } = getDefaultColumnWidth(column);

  return {
    minWidth,
    maxWidth,
    width: "auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
  };
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const updateColumnFilter = <T extends Record<string, unknown>>(
  currentFilters: ColumnFilter[],
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
): ColumnFilter[] => {
  const existingFilterIndex = currentFilters.findIndex(
    (f) => f.field === field,
  );
  const newFilters = [...currentFilters];

  if (existingFilterIndex >= 0) {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      newFilters.splice(existingFilterIndex, 1);
    } else {
      newFilters[existingFilterIndex] = {
        field: String(field),
        type,
        value,
        operator,
      };
    }
  } else if (value && (!Array.isArray(value) || value.length > 0)) {
    newFilters.push({ field: String(field), type, value, operator });
  }

  return newFilters;
};

export const generateCSVContent = <T extends Record<string, unknown>>(
  data: T[],
  columns: ColumnDefinition<T>[],
): string => {
  if (data.length === 0) {
    throw new Error("No data available for export");
  }

  const headers = columns.map((col) => col.header);
  const fields = columns.map((col) => col.field);

  let csvContent = headers.join(",") + "\n";

  data.forEach((row) => {
    const rowData = fields.map((field) => {
      const value = row[field];
      if (value != null) {
        const stringValue = String(value);
        const escapedValue = stringValue.replace(/"/g, '""');
        return `"${escapedValue}"`;
      }
      return "";
    });
    csvContent += rowData.join(",") + "\n";
  });

  return csvContent;
};

export const downloadCSV = (csvContent: string, filename?: string): void => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    filename || `export-${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export const exportSelectedRowsToCSV = <T extends Record<string, unknown>>(
  allData: T[],
  selectedRows: Record<string, boolean>,
  columns: ColumnDefinition<T>[],
  idField: string,
  filename?: string,
): void => {
  const selectedData = allData.filter((row) => {
    const rowId = String(row[idField]);
    return selectedRows[rowId];
  });

  if (selectedData.length === 0) {
    throw new Error("Please select at least one row to export");
  }

  const csvContent = generateCSVContent(selectedData, columns);
  downloadCSV(csvContent, filename);
};

export const getSelectedRowCount = (
  selectedRows: Record<string, boolean>,
): number => {
  return Object.values(selectedRows).filter((selected) => selected).length;
};

export const createSearchConfig = (
  query: string,
  caseSensitive = false,
  searchFields?: string[],
): SearchConfig => ({
  query: query.trim(),
  caseSensitive,
  searchFields,
});

export const clearAllFiltersAndSearch = (): {
  filters: ColumnFilter[];
  searchConfig: SearchConfig;
} => ({
  filters: [],
  searchConfig: createSearchConfig(""),
});

export const createAvatarData = (
  label: string,
  options?: {
    sublabel?: string;
    imageUrl?: string;
    initials?: string;
  },
): AvatarData => ({
  label,
  ...options,
});

export const createTagData = (
  text: string,
  options?: {
    color?:
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "error"
      | "neutral";
    variant?: "solid" | "subtle" | "outline";
    size?: "sm" | "md" | "lg";
  },
): TagData => ({
  text,
  ...options,
});

export const createSelectData = (
  value: string,
  options?: {
    label?: string;
    disabled?: boolean;
  },
): SelectData => ({
  value,
  ...options,
});

export const createMultiSelectData = (
  values: string[],
  labels?: string[],
): MultiSelectData => ({
  values,
  labels,
});

export const createDateData = (
  date: Date | string,
  format?: string,
): DateData => ({
  date,
  format,
});

export const createDateRangeData = (
  startDate: Date | string,
  endDate: Date | string,
  format?: string,
): DateRangeData => ({
  startDate,
  endDate,
  format,
});

export const validateDataForColumnType = <T extends Record<string, unknown>>(
  data: T,
  columns: ColumnDefinition<T>[],
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  for (const column of columns) {
    const fieldValue = data[column.field];
    const validator = validateColumnData[column.type];

    if (!validator(fieldValue)) {
      errors.push(
        `Field "${String(column.field)}" (${column.type}) has invalid data type. Expected: ${getExpectedTypeDescription(column.type)}, Got: ${typeof fieldValue}`,
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const getExpectedTypeDescription = (columnType: ColumnType): string => {
  switch (columnType) {
    case ColumnType.AVATAR:
      return "AvatarData { label: string, sublabel?: string, imageUrl?: string, initials?: string }";
    case ColumnType.TAG:
      return "TagData { text: string, color?: string, variant?: string, size?: string }";
    case ColumnType.SELECT:
      return "SelectData { value: string, label?: string, disabled?: boolean } or string";
    case ColumnType.MULTISELECT:
      return "MultiSelectData { values: string[], labels?: string[] } or string[]";
    case ColumnType.DATE:
      return "DateData { date: Date | string, format?: string } or Date or string";
    case ColumnType.DATE_RANGE:
      return "DateRangeData { startDate: Date | string, endDate: Date | string, format?: string }";
    case ColumnType.TEXT:
      return "string or number";
    case ColumnType.NUMBER:
      return "number";
    case ColumnType.CUSTOM:
      return "any";
    default:
      return "unknown";
  }
};

export const enforceDataTypeMatching = <T extends Record<string, unknown>>(
  data: T[],
  columns: ColumnDefinition<T>[],
  options?: { throwOnError?: boolean; logWarnings?: boolean },
): boolean => {
  const { throwOnError = false, logWarnings = true } = options || {};
  let hasErrors = false;

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const validation = validateDataForColumnType(row, columns);

    if (!validation.isValid) {
      hasErrors = true;
      const errorMessage = `DataTable type validation failed for row ${i}:\n${validation.errors.join("\n")}`;

      if (throwOnError) {
        throw new Error(errorMessage);
      } else if (logWarnings) {
        console.warn(errorMessage);
      }
    }
  }

  return !hasErrors;
};
