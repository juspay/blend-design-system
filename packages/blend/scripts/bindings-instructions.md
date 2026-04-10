# ReScript Bindings Instructions

This document provides extensive guidelines and examples for generating high-quality ReScript bindings automatically from React components (written in TypeScript/TSX) in our codebase.

## Formatting Rules

1. **Imports and Decorators**:
    - Create `@react.component` bindings using `external` and `@module`.
    - The module must ALWAYS be imported from the central design system package: `@module("@juspay/blend-design-system")`.
    - The binding itself must look like:
        ```rescript
        @module("@juspay/blend-design-system") @react.component
        external make: (~prop1: string=?, ~prop2: int=?) => React.element = "ComponentName"
        ```

2. **Reserved Keywords**:
    - ReScript reserves certain keywords like `type`. If a prop is named `type`, rename it with an underscore suffix and use the `@as()` decorator.
    - Example: `type {type: string , name: string}` should be converted to `type { @as("type") type_: string, name: string }`.

3. **String Literal Enums vs Variants**:
    - Map string literal enums (like `'primary' | 'secondary'`) to ReScript variants with the `@as("string_value")` decorator:
        ```rescript
        type buttonVariant =
          | @as("primary") Primary
          | @as("secondary") Secondary
        ```

4. **Props Configuration syntax**:
    - Map optional props using the `~propName: type=?` syntax within the argument block.

5. **Advanced Objects & Union Mapping**:
    - For types involving the `&` intersection operator like, `type {a: string} & {b: number}` should be converted to a simple merged object `type {a: string, b: number}`.
    - For aggregated/union data types like `type filterType = {date: string , disabled: boolean} | {time: string , disabled: boolean}`, build using ReScript variants:
        ```rescript
        type filterType =
          | Date({date: string , disabled: boolean})
          | Time({time: string , disabled: boolean})
        ```
    - An inline record type declaration is only allowed in a variant constructor's declaration or nested inside of a record type declaration. Make sure to write a separate type variable if you are going to use a custom type as a variant constructor's argument that violates this.
    - Focus on converting one type at a time, expanding to the extent such that the type becomes a composed primitive one. For example: given `type {a: filterType , b: string}` and `type filterType = {date: string , disabled: boolean}`, it should be converted to `type {a: {date: string , disabled: boolean}, b: string}` where inline makes sense.

6. **Complex Types / JSON.t fallback**:
    - We do not use the deprecated `Js` library types. Instead of `Js.JSON.t` and `Js.Date.t`, we use the newer primitives `JSON.t` and `Date.t`.
    - If a type seems too complicated, highly dynamic, or has lots of internal dependencies (like `any` or strict unknown generic objects), then just use `JSON.t` for it. We need not go to the extreme depths to resolve absolutely every type.
    - **CRITICAL NOTE ON JSON.t**: This is not a leeway for you to use `JSON.t` for everything. Use your judgement. **We are not supposed to coat the type with `JSON.t` if it involves at least one React element**. In ReScript, we cannot convert a `React.element` to `JSON.t`.
    - Go through to the depths of each type definition and even if a single field accepts a ReactNode, then the entire type should be converted meticulously field by field, without using `JSON.t`.

7. **Dependency and Circular Guidelines**:
    - DO NOT depend on the `and` keyword for union data types to bypass constraints. Build all data types sequentially.
    - DO NOT make circular references (like type `a` requiring type `b` and type `b` requiring type `a`). ReScript processes code line by line and it cannot compile if it doesn't already find the variable it requires.
    - DO NOT leave anything to assumption regarding types from other modules. If a particular type is borrowed from another component or types file, then trace back to that file and borrow the definitions in the exact same manner. The goal is to have the bindings file self-sufficient where all types recursively compute to a primitive datatype without dependence on other module bindings.
    - THE MOST IMPORTANT ASPECT IS MENTIONED ABOVE - DO NOT MAKE CIRCULAR DEPENDENCIES. I CANNOT STRESS THIS ENOUGH. In case it seems necessary to break a type into multiple parts to avoid circular dependencies, then do it. It is better than making circular dependencies. You can also use the rec keyword for recursive type to avoid circular dependencies
    - If it is possible to combine the union types into a single types, then do it. For example, if you have type a = {error: string} | {error: string , resp: string} | {error: string , resp: string , loggedIn: bool}, then you can take the outer join of all three types and combine into one as so - type a = {error: string , resp?: string , loggedIn?: bool}. Try to avoid joins as much as possible. But don't change the type, like type a = number | string then don't make it type a = {field1: int , field2: string}. You can do type integration for record type fields, not primitives.

## Real-World Examples

### Example 1: Enums & Variants

TypeScript:

```typescript
type buttonType = 'primary' | 'secondary' | 'danger'
```

ReScript:

```rescript
type buttonType =
  | @as("primary") Primary
  | @as("secondary") Secondary
  | @as("danger") Danger
```

### Example 2: Generics and Advanced JSON.t Object Fallbacks

If we have a highly dynamic object where we don't know the exact keys, we use `JSON.t`.
TypeScript:

```typescript
type dropdownOption = {
    id: string
    label: string
    value: any // arbitrary data
    icon?: React.ReactNode
}
```

ReScript constraint (Note `value: JSON.t` but we didn't coat the entire object because `icon` takes a `React.element`!):

```rescript
type dropdownOption = {
  id: string,
  label: string,
  value: JSON.t,
  icon?: React.element,
}
```

### Example 3: Function Prop with generic

TypeScript:

```typescript
onRowSave?: (oldRow: T, newRow: T) => void;
```

ReScript:

```rescript
~onRowSave: (JSON.t, JSON.t) => unit=?
```

### Example 4: Union with Keyword Field

TypeScript:

```typescript
type columnFilter = {
    field: string
    type: filterType
    value: any
    operator: 'equals' | 'contains'
}
```

ReScript:

```rescript
type columnFilter = {
  field: string,
  @as("type") type_: filterType,
  value: JSON.t,
  operator: [#equals | #contains],
}
```

### Example 5: Real life example of DataTable.tsx migration. DataTable.tsx is present in /blend-design-system/packages/blend/lib/components/DataTable/DataTable.tsx

```rescript
// Column type enum for filtering and display
module ColumnType = {
  type t =
    | @as("text") TEXT
    | @as("select") SELECT
    | @as("multiselect") MULTISELECT
    | @as("date") DATE
    | @as("number") NUMBER
    | @as("avatar") AVATAR
    | @as("tag") TAG
    | @as("custom") CUSTOM
    | @as("react_element") REACT_ELEMENT
    | @as("date_range") DATE_RANGE
    | @as("progress") PROGRESS
    | @as("dropdown") DROPDOWN
    | @as("slider") SLIDER
}

type sliderColumnValueType = [#number | #percentage | #decimal]

type sliderColumnProps = {
  min: float,
  max: float,
  step?: float,
  valueType?: sliderColumnValueType,
  decimalPlaces?: int,
  prefix?: string,
  suffix?: string,
}

// Sort direction enum
module SortDirection = {
  type t =
    | @as("asc") Asc
    | @as("desc") Desc
    | @as("none") None

  let toString = direction =>
    switch direction {
    | Asc => "asc"
    | Desc => "desc"
    | None => "none"
    }
}

// Filter type enum
module FilterType = {
  type t =
    | @as("text") Text
    | @as("select") Select
    | @as("multiselect") Multiselect
    | @as("date") Date
    | @as("number") Number
}

// Filter option type (recursive)
type rec filterOption = {
  id: string,
  label: string,
  value: string,
  options?: array<filterOption>,
}

// Avatar data type
type avatarData = {
  label: string,
  sublabel?: string,
  imageUrl?: string,
}

// Tag data type
type tagData = {
  text: string,
  color: string,
  variant: string,
}

// Select data type
type selectData = {
  value: string,
  label: string,
}

// Multi-select data type
type multiSelectData = {
  values: array<string>,
  labels: array<string>,
}

// Date data type
type dateData = {
  value: string,
  format?: string,
}

// Date range data type
type dateRangeData = {
  startDate: string,
  endDate: string,
  format?: string,
}

type skeletonVariant = [#pulse | #wave | #shimmer]

// Column definition type
type rec columnDefinition<'row> = {
  // Field key in data object
  field: string,
  // Header text to display
  header: string,
  // Header subtext to display
  headerSubtext?: string,
  // Column type for filtering and display
  @as("type") type_: ColumnType.t,
  // Width of the column
  width?: string,
  // Minimum width of the column
  minWidth?: string,
  // Maximum width of the column
  maxWidth?: string,
  // Whether column is sortable
  isSortable?: bool,
  // Whether column is initially visible
  isVisible?: bool,
  // Whether column can be hidden by user
  canHide?: bool,
  // Whether column is frozen (sticky)
  frozen?: bool,
  // Whether column is editable inline
  isEditable?: bool,
  // Whether column is filterable
  isFilterable?: bool,
  // Type of filter for this column
  filterType?: FilterType.t,
  // Filter options for select/multiselect filters
  filterOptions?: array<filterOption>,
  // Slider configuration for slider column in sorting popup
  sliderConfig?: sliderColumnProps,
  // Custom classes to apply to the column
  className?: string,
  // Custom render function for display mode
  renderCell?: (JSON.t, 'row) => React.element,
  // Custom render for edit mode
  renderEditCell?: (JSON.t, 'row, JSON.t => unit) => React.element,
  isDeltaSortable?: bool,
  getSortField?: option<string> => string,
  sortValueFormatter?: (JSON.t, 'row, columnDefinition<'row>, option<string>) => JSON.t,
}

// Filter type
type filter = {
  id: string,
  label: string,
  options: array<filterOption>,
  selectedValues?: array<string>,
  isMultiSelect?: bool,
}

// Operator type
type operator =
  | @as("equals") Equals
  | @as("contains") Contains
  | @as("startsWith") StartsWith
  | @as("endsWith") EndsWith
  | @as("gt") Gt
  | @as("lt") Lt
  | @as("gte") Gte
  | @as("lte") Lte

// Column filter type
type columnFilter = {
  field: string,
  @as("type") type_: FilterType.t,
  value: JSON.t,
  operator?: operator,
}

// Search configuration
type searchConfig = {
  query: string,
  searchFields?: array<string>,
  caseSensitive?: bool,
}

// Sort configuration
type sortConfig = {
  field: string,
  direction: SortDirection.t,
}

// Pagination configuration
type paginationConfig = {
  currentPage: int,
  pageSize: int,
  totalRows: int,
  pageSizeOptions: array<int>,
  onPageChange?: int => unit,
  onPageSizeChange?: int => unit,
}

// Column manager props
type columnManagerProps<'row> = {
  columns: array<columnDefinition<'row>>,
  visibleColumns: array<columnDefinition<'row>>,
  onColumnChange: array<columnDefinition<'row>> => unit,
}

// Column manager primary action type
type columnManagerPrimaryAction = {
  text: string,
  onClick: array<string> => unit,
  disabled: bool,
  loading: bool,
}

// Column manager secondary action type
type columnManagerSecondaryAction = {
  text: string,
  onClick: unit => unit,
  disabled: bool,
}

// Advanced filter props
type advancedFilterProps = {
  filters: array<JSON.t>,
  onFiltersChange: array<JSON.t> => unit,
  onClearFilters: unit => unit,
}

// Expanded row data type
type expandedRowData<'row> = {
  row: 'row,
  index: int,
  isExpanded: bool,
  toggleExpansion: unit => unit,
}

// Bulk action variant type
type bulkActionVariant =
  | @as("primary") Primary
  | @as("secondary") Secondary
  | @as("danger") Danger

// Bulk action item type
type bulkActionItem = {
  id: string,
  label: string,
  variant: bulkActionVariant,
  onClick: array<string> => unit,
}

// DataTable component binding
@module("@juspay/blend-design-system") @react.component
external make: (
  // Array of data objects to display
  ~data: array<'row>,
  // Column definitions
  ~columns: array<columnDefinition<'row>>,
  // Field name to use as unique identifier for rows
  ~idField: string,
  // Optional table title
  ~title: string=?,
  // Optional table description
  ~description: string=?,
  // Whether to show hover effects on rows
  ~isHoverable: bool=?,
  // Default sort configuration
  ~defaultSort: sortConfig=?,
  // Whether to enable universal search
  ~enableSearch: bool=?,
  // Search placeholder text
  ~searchPlaceholder: string=?,
  // Whether to enable column filtering (local)
  ~enableFiltering: bool=?,
  // Whether to enable advanced filtering (user-controlled)
  ~enableAdvancedFilter: bool=?,
  // Number of columns to freeze from the left
  ~columnFreeze: int=?,
  // Custom advanced filter component
  ~advancedFilterComponent: React.component<advancedFilterProps>=?,
  // Current filters for advanced filter
  ~advancedFilters: array<JSON.t>=?,
  // Whether search is handled server-side (disables local search)
  ~serverSideSearch: bool=?,
  // Whether filtering is handled server-side (disables local filtering)
  ~serverSideFiltering: bool=?,
  // Whether pagination is handled server-side (disables local pagination)
  ~serverSidePagination: bool=?,
  // Whether data is currently being loaded (shows loading states)
  ~isLoading: bool=?,
  // Whether to show column manager
  ~enableColumnManager: bool=?,
  // Whether to show toolbar
  ~showToolbar: bool=?,
  // Whether to show settings in toolbar
  ~showSettings: bool=?,
  // Whether to show footer
  ~showFooter: bool=?,
  // Whether to enable inline editing
  ~enableInlineEdit: bool=?,
  // Whether to enable row expansion
  ~enableRowExpansion: bool=?,
  // Render function for expanded row content
  ~renderExpandedRow: expandedRowData<'row> => React.element=?,
  // Optional function to determine if a row should be expandable
  ~isRowExpandable: ('row, int) => bool=?,
  // Optional expanded row data mapping function
  ~getExpandedRowData: ('row, int) => Dict.t<JSON.t>=?,
  // Whether to enable row selection with checkboxes
  ~enableRowSelection: bool=?,
  // Callback when row is selectred with checkbox
  ~onRowSelectionChange: (array<string>, bool, string, 'row) => unit=?,
  // Pagination configuration
  ~pagination: paginationConfig=?,
  // Callback when page changes
  ~onPageChange: int => unit=?,
  // Callback when page size changes
  ~onPageSizeChange: int => unit=?,
  // Callback when sort changes
  ~onSortChange: sortConfig => unit=?,
  // Callback when search changes
  ~onSearchChange: searchConfig => unit=?,
  // Callback when column filters change (local)
  ~onFilterChange: array<columnFilter> => unit=?,
  // Callback when advanced filters change
  ~onAdvancedFiltersChange: array<JSON.t> => unit=?,
  // Callback when column visibility changes (from column manager)
  ~onColumnChange: array<columnDefinition<'row>> => unit=?,
  // Column manager primary action (Apply button)
  ~columnManagerPrimaryAction: columnManagerPrimaryAction=?,
  // Column manager secondary action (Reset button)
  ~columnManagerSecondaryAction: columnManagerSecondaryAction=?,
  // Maximum number of columns that can be selected
  ~columnManagerMaxSelections: int=?,
  // Array of field names that should always be selected
  ~columnManagerAlwaysSelected: array<string>=?,
  // Callback when row is saved after editing
  ~onRowSave: (JSON.t, 'row) => unit=?,
  // Callback when row edit is cancelled
  ~onRowCancel: JSON.t => unit=?,
  // Callback when row is clicked
  ~onRowClick: ('row, int) => unit=?,
  // Callback when a field value changes during inline editing
  ~onFieldChange: (JSON.t, string, JSON.t) => unit=?,
  // Callback when row expansion changes
  ~onRowExpansionChange: (JSON.t, bool, 'row) => unit=?,
  // Optional additional class name
  ~className: string=?,
  // Custom slot on the left side of the toolbar
  ~headerSlot1: React.element=?,
  // Custom slot in the middle of the toolbar
  ~headerSlot2: React.element=?,
  // Custom slot on the right side of the toolbar
  ~headerSlot3: React.element=?,
  // Custom bulk actions array
  ~bulkActions: array<bulkActionItem>=?,
  // Function to get custom row styles
  ~getRowStyle: ('row, int) => JsxDOM.style=?,
  // Number of columns to show on mobile
  ~mobileColumnsToShow: int=?,
  ~showHeader: bool,
  ~showSkeleton: bool=?,
  ~skeletonVariant: skeletonVariant=?,
) => React.element = "DataTable"

// Helper functions
let makeColumnDefinition = (
  ~field: string,
  ~header: string,
  ~type_: ColumnType.t,
  ~headerSubtext: option<string>=?,
  ~width: option<string>=?,
  ~minWidth: option<string>=?,
  ~maxWidth: option<string>=?,
  ~isSortable: option<bool>=?,
  ~isVisible: option<bool>=?,
  ~canHide: option<bool>=?,
  ~frozen: option<bool>=?,
  ~isEditable: option<bool>=?,
  ~isFilterable: option<bool>=?,
  ~filterType: option<FilterType.t>=?,
  ~filterOptions: option<array<filterOption>>=?,
  ~className: option<string>=?,
  ~renderCell: option<(JSON.t, 'row) => React.element>=?,
  ~renderEditCell: option<(JSON.t, 'row, JSON.t => unit) => React.element>=?,
  ~sliderConfig: option<sliderColumnProps>=?,
  (),
): columnDefinition<'row> => {
  field,
  header,
  ?headerSubtext,
  type_,
  ?width,
  ?minWidth,
  ?maxWidth,
  ?isSortable,
  ?isVisible,
  ?canHide,
  ?frozen,
  ?isEditable,
  ?isFilterable,
  ?filterType,
  ?filterOptions,
  ?className,
  ?renderCell,
  ?renderEditCell,
  ?sliderConfig,
}

let makeFilterOption = (
  ~id: string,
  ~label: string,
  ~value: string,
  ~options: option<array<filterOption>>=?,
  (),
): filterOption => {
  id,
  label,
  value,
  ?options,
}

let makePaginationConfig = (
  ~currentPage: int,
  ~pageSize: int,
  ~totalRows: int,
  ~pageSizeOptions: array<int>,
  ~onPageChange: option<int => unit>=?,
  ~onPageSizeChange: option<int => unit>=?,
  (),
): paginationConfig => {
  currentPage,
  pageSize,
  totalRows,
  pageSizeOptions,
  ?onPageChange,
  ?onPageSizeChange,
}

let makeSortConfig = (~field: string, ~direction: SortDirection.t): sortConfig => {
  field,
  direction,
}

let makeSearchConfig = (
  ~query: string,
  ~searchFields: option<array<string>>=?,
  ~caseSensitive: option<bool>=?,
  (),
): searchConfig => {
  query,
  ?searchFields,
  ?caseSensitive,
}

let makeAvatarData = (
  ~label: string,
  ~sublabel: option<string>=?,
  ~imageUrl: option<string>=?,
  (),
): avatarData => {
  label,
  ?sublabel,
  ?imageUrl,
}

let makeTagData = (~text: string, ~color: string, ~variant: string): tagData => {
  text,
  color,
  variant,
}

let makeBulkActionItem = (
  ~id: string,
  ~label: string,
  ~variant: bulkActionVariant,
  ~onClick: array<string> => unit,
): bulkActionItem => {
  id,
  label,
  variant,
  onClick,
}
```
