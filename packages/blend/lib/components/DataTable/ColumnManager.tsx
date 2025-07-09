import { Plus } from "lucide-react";
import { Checkbox } from "../Checkbox";
import { CheckboxSize } from "../Checkbox/types";
import Menu from "../Menu/Menu";
import { MenuAlignment } from "../Menu/types";
import { Button, ButtonSize, ButtonType } from "../Button";
import Block from "../Primitives/Block/Block";
import { ColumnManagerProps } from "./types";

export const ColumnManager = <T extends Record<string, unknown>>({
  columns,
  visibleColumns,
  onColumnChange,
}: ColumnManagerProps<T>) => {
  const toggleColumnVisibility = (field: keyof T) => {
    const isCurrentlyVisible = visibleColumns.some(
      (col) => col.field === field,
    );

    if (isCurrentlyVisible) {
      if (visibleColumns.length <= 1) return;

      const newVisibleColumns = visibleColumns.filter(
        (col) => col.field !== field,
      );
      onColumnChange(newVisibleColumns);
    } else {
      const columnToAdd = columns.find((col) => col.field === field);
      if (columnToAdd) {
        onColumnChange([...visibleColumns, columnToAdd]);
      }
    }
  };

  const managableColumns = columns.filter((col) => col.canHide !== false);

  const menuItems = [
    {
      groupLabel: "Manage Columns",
      showSeparator: false,
      items: managableColumns.map((column) => {
        const isVisible = visibleColumns.some(
          (col) => col.field === column.field,
        );
        return {
          label: column.header,
          value: String(column.field),
          slot1: (
            <Checkbox
              checked={isVisible}
              onCheckedChange={() => toggleColumnVisibility(column.field)}
              size={CheckboxSize.SMALL}
            />
          ),
          onClick: () => toggleColumnVisibility(column.field),
        };
      }),
    },
  ];

  return (
    <Block>
      <Menu
        alignment={MenuAlignment.END}
        enableSearch={false}
        trigger={
          <Button
            buttonType={ButtonType.SECONDARY}
            size={ButtonSize.SMALL}
            leadingIcon={Plus}
          />
        }
        items={menuItems}
      />
    </Block>
  );
};

ColumnManager.displayName = "ColumnManager";
