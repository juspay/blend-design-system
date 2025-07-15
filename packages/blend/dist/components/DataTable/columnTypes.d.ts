import { FilterType, ColumnType } from './types';
export type ColumnFilterOption = {
    id: string;
    label: string;
    value: string;
};
export type DropdownData = {
    options: Array<{
        id: string;
        label: string;
        value: unknown;
    }>;
    selectedValue?: unknown;
    placeholder?: string;
};
export type AvatarData = {
    label: string;
    sublabel?: string;
    imageUrl?: string;
    initials?: string;
};
export type TagData = {
    text: string;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
    variant?: 'solid' | 'subtle' | 'outline';
    size?: 'sm' | 'md' | 'lg';
};
export type SelectData = {
    value: string;
    label?: string;
    disabled?: boolean;
};
export type MultiSelectData = {
    values: string[];
    labels?: string[];
};
export type DateData = {
    date: Date | string;
    format?: string;
};
export type DateRangeData = {
    startDate: Date | string;
    endDate: Date | string;
    format?: string;
};
export type ColumnDataTypeMap = {
    [ColumnType.TEXT]: string | number;
    [ColumnType.NUMBER]: number;
    [ColumnType.SELECT]: SelectData | string;
    [ColumnType.MULTISELECT]: MultiSelectData | string[];
    [ColumnType.DATE]: DateData | Date | string;
    [ColumnType.DATE_RANGE]: DateRangeData;
    [ColumnType.AVATAR]: AvatarData;
    [ColumnType.TAG]: TagData;
    [ColumnType.SLIDER]: number;
    [ColumnType.CUSTOM]: unknown;
    [ColumnType.PROGRESS]: number;
    [ColumnType.DROPDOWN]: DropdownData;
    [ColumnType.REACT_ELEMENT]: unknown;
};
export type GetColumnDataType<T extends ColumnType> = ColumnDataTypeMap[T];
export declare const validateColumnData: {
    text: (data: unknown) => data is string | number;
    number: (data: unknown) => data is number;
    select: (data: unknown) => data is SelectData | string;
    multiselect: (data: unknown) => data is MultiSelectData | string[];
    date: (data: unknown) => data is DateData | Date | string;
    date_range: (data: unknown) => data is DateRangeData;
    avatar: (data: unknown) => data is AvatarData;
    tag: (data: unknown) => data is TagData;
    slider: (data: unknown) => data is number;
    custom: (_data: unknown) => _data is unknown;
    progress: (data: unknown) => data is number;
    dropdown: (data: unknown) => data is DropdownData;
    react_element: (_data: unknown) => _data is unknown;
};
export type ColumnTypeConfig = {
    type: ColumnType;
    filterType: FilterType;
    filterOptions?: ColumnFilterOption[];
    supportsSorting: boolean;
    supportsFiltering: boolean;
    enableSearch?: boolean;
    filterComponent?: 'search' | 'select' | 'multiselect' | 'dateRange' | 'numberRange' | 'slider';
};
export declare const getColumnTypeConfig: (type: ColumnType) => ColumnTypeConfig;
export declare const getExpectedTypeDescription: (type: ColumnType) => string;
