import { forwardRef, useState, useMemo } from "react";
import { FilterType, ColumnDefinition, type ColumnFilter } from "../types";
import { getColumnTypeConfig } from "../columnTypes";
import { getUniqueColumnValues } from "../utils";
import Block from "../../Primitives/Block/Block";
import PrimitiveText from "../../Primitives/PrimitiveText/PrimitiveText";
import { SearchInput } from "../../Inputs/SearchInput";
import MultiSelectMenu from "../../MultiSelect/MultiSelectMenu";
import SingleSelectMenu from "../../SingleSelect/SingleSelectMenu";
import { FOUNDATION_THEME } from "../../../tokens";
import { SelectMenuGroupType } from "../../Select/types";

export type ColumnFilterProps<T extends Record<string, unknown>> = {
  column: ColumnDefinition<T>;
  data: T[];
  currentFilter?: ColumnFilter;
  onFilter: (
    field: keyof T,
    type: FilterType,
    value: string | string[],
    operator?: string,
  ) => void;
};

const ColumnFilter = forwardRef<
  HTMLDivElement,
  ColumnFilterProps<Record<string, unknown>>
>(({ column, data, currentFilter, onFilter }, ref) => {
  const [searchValue, setSearchValue] = useState(
    (currentFilter?.value as string) || "",
  );
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(currentFilter?.value)
      ? currentFilter.value
      : currentFilter?.value
        ? [currentFilter.value as string]
        : [],
  );
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);

  const columnConfig = getColumnTypeConfig(column.type);

  const filterOptions = useMemo(() => {
    if (column.filterOptions) {
      return column.filterOptions.map((option) => ({
        id: option.id,
        label: option.label,
        value: option.value,
      }));
    }

    const uniqueValues = getUniqueColumnValues(data, column.field);
    return uniqueValues.map((val) => ({
      id: String(val),
      label: String(val),
      value: String(val),
    }));
  }, [data, column.field, column.filterOptions]);

  const menuItems: SelectMenuGroupType[] = [
    {
      groupLabel: `${column.header} Options`,
      items: filterOptions.map((option) => ({
        label: option.label,
        value: option.value,
        onClick: () => {},
      })),
      showSeparator: false,
    },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onFilter(column.field, FilterType.TEXT, value, "contains");
  };

  const handleSingleSelect = (value: string) => {
    setSelectedValues([value]);
    onFilter(column.field, FilterType.SELECT, value, "equals");
    setIsSelectOpen(false);
  };

  const handleMultiSelect = (value: string) => {
    let newSelected = [...selectedValues];
    if (newSelected.includes(value)) {
      newSelected = newSelected.filter((v) => v !== value);
    } else {
      newSelected.push(value);
    }
    setSelectedValues(newSelected);
    onFilter(column.field, FilterType.MULTISELECT, newSelected, "equals");
  };

  const clearFilter = () => {
    setSearchValue("");
    setSelectedValues([]);
    onFilter(column.field, column.filterType || FilterType.TEXT, "", "equals");
  };

  if (!columnConfig.supportsFiltering) {
    return null;
  }

  return (
    <Block
      ref={ref}
      display="flex"
      flexDirection="column"
      gap={FOUNDATION_THEME.unit[8]}
      minWidth="200px"
    >
      <Block display="flex" alignItems="center" justifyContent="space-between">
        <PrimitiveText
          style={{
            fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
            fontWeight: FOUNDATION_THEME.font.weight[600],
          }}
        >
          Filter {column.header}
        </PrimitiveText>
        {(searchValue || selectedValues.length > 0) && (
          <PrimitiveText
            onClick={clearFilter}
            style={{
              fontSize: FOUNDATION_THEME.font.size.body.xs.fontSize,
              color: FOUNDATION_THEME.colors.primary[600],
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Clear
          </PrimitiveText>
        )}
      </Block>

      {columnConfig.filterComponent === "search" && (
        <SearchInput
          placeholder={`Search ${column.header}...`}
          value={searchValue}
          onChange={handleSearchChange}
        />
      )}

      {columnConfig.filterComponent === "select" && (
        <SingleSelectMenu
          items={menuItems}
          selected={selectedValues[0] || ""}
          onSelect={handleSingleSelect}
          open={isSelectOpen}
          onOpenChange={setIsSelectOpen}
          enableSearch={true}
          trigger={
            <Block
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={`${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[12]}`}
              border={`1px solid ${FOUNDATION_THEME.colors.gray[300]}`}
              borderRadius={FOUNDATION_THEME.border.radius[8]}
              backgroundColor={FOUNDATION_THEME.colors.gray[0]}
              cursor="pointer"
              _hover={{
                backgroundColor: FOUNDATION_THEME.colors.gray[25],
              }}
            >
              <PrimitiveText
                style={{
                  fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
                  color: selectedValues[0]
                    ? FOUNDATION_THEME.colors.gray[700]
                    : FOUNDATION_THEME.colors.gray[400],
                }}
              >
                {selectedValues[0]
                  ? filterOptions.find((opt) => opt.value === selectedValues[0])
                      ?.label || selectedValues[0]
                  : "Select option..."}
              </PrimitiveText>
              <PrimitiveText
                style={{
                  fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
                }}
              >
                ▼
              </PrimitiveText>
            </Block>
          }
        />
      )}

      {columnConfig.filterComponent === "multiselect" && (
        <MultiSelectMenu
          items={menuItems}
          selected={selectedValues}
          onSelect={handleMultiSelect}
          open={isMultiSelectOpen}
          onOpenChange={setIsMultiSelectOpen}
          trigger={
            <Block
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={`${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[12]}`}
              border={`1px solid ${FOUNDATION_THEME.colors.gray[300]}`}
              borderRadius={FOUNDATION_THEME.border.radius[8]}
              backgroundColor={FOUNDATION_THEME.colors.gray[0]}
              cursor="pointer"
              _hover={{
                backgroundColor: FOUNDATION_THEME.colors.gray[25],
              }}
            >
              <PrimitiveText
                style={{
                  fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
                  color:
                    selectedValues.length > 0
                      ? FOUNDATION_THEME.colors.gray[700]
                      : FOUNDATION_THEME.colors.gray[400],
                }}
              >
                {selectedValues.length > 0
                  ? `${selectedValues.length} selected`
                  : "Select options..."}
              </PrimitiveText>
              <PrimitiveText
                style={{
                  fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
                }}
              >
                ▼
              </PrimitiveText>
            </Block>
          }
        />
      )}

      {columnConfig.filterComponent === "dateRange" && (
        <Block
          display="flex"
          flexDirection="column"
          gap={FOUNDATION_THEME.unit[4]}
        >
          <PrimitiveText
            style={{
              fontSize: FOUNDATION_THEME.font.size.body.xs.fontSize,
              color: FOUNDATION_THEME.colors.gray[600],
            }}
          >
            Date range filtering coming soon...
          </PrimitiveText>
        </Block>
      )}

      {columnConfig.filterComponent === "numberRange" && (
        <Block
          display="flex"
          flexDirection="column"
          gap={FOUNDATION_THEME.unit[4]}
        >
          <PrimitiveText
            style={{
              fontSize: FOUNDATION_THEME.font.size.body.xs.fontSize,
              color: FOUNDATION_THEME.colors.gray[600],
            }}
          >
            Number range filtering coming soon...
          </PrimitiveText>
        </Block>
      )}
    </Block>
  );
});

ColumnFilter.displayName = "ColumnFilter";

export default ColumnFilter;
