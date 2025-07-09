import { ColumnDefinition } from "../types";

export type TableCellProps<T extends Record<string, unknown>> = {
  column: ColumnDefinition<T>;
  row: T;
  isEditing: boolean;
  currentValue: unknown;
  width: React.CSSProperties;
  onFieldChange: (value: unknown) => void;
};
