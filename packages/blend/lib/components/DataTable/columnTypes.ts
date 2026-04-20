import { FilterType, ColumnType } from './types'

export type ColumnFilterOption = {
    id: string
    label: string
    value: string
}

export type DropdownData = {
    options: Array<{ id: string; label: string; value: unknown }>
    selectedValue?: unknown
    placeholder?: string
}

export type AvatarData = {
    label: string
    sublabel?: string
    imageUrl?: string
    initials?: string
}

export type TagData = {
    text: string
    color?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'warning'
        | 'error'
        | 'neutral'
    variant?: 'solid' | 'subtle' | 'outline'
    size?: 'sm' | 'md' | 'lg'
}

export type SelectData = {
    value: string
    label?: string
    disabled?: boolean
}

export type MultiSelectData = {
    values: string[]
    labels?: string[]
}

export type DateData = {
    date: Date | string
    format?: string
}

export type DateRangeData = {
    startDate: Date | string
    endDate: Date | string
    format?: string
}

export type ColumnDataTypeMap = {
    [ColumnType.TEXT]: string | number
    [ColumnType.NUMBER]: number
    [ColumnType.SELECT]: SelectData | string
    [ColumnType.MULTISELECT]: MultiSelectData | string[]
    [ColumnType.DATE]: DateData | Date | string
    [ColumnType.DATE_RANGE]: DateRangeData
    [ColumnType.AVATAR]: AvatarData
    [ColumnType.TAG]: TagData
    [ColumnType.SLIDER]: number
    [ColumnType.CUSTOM]: unknown
    [ColumnType.PROGRESS]: number
    [ColumnType.DROPDOWN]: DropdownData
    [ColumnType.REACT_ELEMENT]: unknown
}

export type GetColumnDataType<T extends ColumnType> = ColumnDataTypeMap[T]

export const validateColumnData = {
    [ColumnType.TEXT]: (data: unknown): data is string | number => {
        return typeof data === 'string' || typeof data === 'number'
    },

    [ColumnType.NUMBER]: (data: unknown): data is number => {
        return typeof data === 'number' && !isNaN(data)
    },

    [ColumnType.SELECT]: (data: unknown): data is SelectData | string => {
        if (typeof data === 'string') return true
        if (typeof data === 'object' && data !== null) {
            const selectData = data as Record<string, unknown>
            return typeof selectData.value === 'string'
        }
        return false
    },

    [ColumnType.MULTISELECT]: (
        data: unknown
    ): data is MultiSelectData | string[] => {
        if (
            Array.isArray(data) &&
            data.every((item) => typeof item === 'string')
        )
            return true
        if (typeof data === 'object' && data !== null) {
            const multiSelectData = data as Record<string, unknown>
            return (
                Array.isArray(multiSelectData.values) &&
                multiSelectData.values.every((item) => typeof item === 'string')
            )
        }
        return false
    },

    [ColumnType.DATE]: (data: unknown): data is DateData | Date | string => {
        if (data instanceof Date) return true
        if (typeof data === 'string') return !isNaN(Date.parse(data))
        if (typeof data === 'object' && data !== null) {
            const dateData = data as Record<string, unknown>
            return (
                typeof dateData.date === 'string' ||
                dateData.date instanceof Date
            )
        }
        return false
    },

    [ColumnType.DATE_RANGE]: (data: unknown): data is DateRangeData => {
        if (typeof data === 'object' && data !== null) {
            const rangeData = data as Record<string, unknown>
            return (
                (typeof rangeData.startDate === 'string' ||
                    rangeData.startDate instanceof Date) &&
                (typeof rangeData.endDate === 'string' ||
                    rangeData.endDate instanceof Date)
            )
        }
        return false
    },

    [ColumnType.AVATAR]: (data: unknown): data is AvatarData => {
        if (typeof data === 'object' && data !== null) {
            const avatarData = data as Record<string, unknown>
            return typeof avatarData.label === 'string'
        }
        return false
    },

    [ColumnType.TAG]: (data: unknown): data is TagData => {
        if (typeof data === 'object' && data !== null) {
            const tagData = data as Record<string, unknown>
            return typeof tagData.text === 'string'
        }
        return false
    },

    [ColumnType.SLIDER]: (data: unknown): data is number => {
        return typeof data === 'number' && !isNaN(data)
    },

    [ColumnType.CUSTOM]: (_data: unknown): _data is unknown => {
        return true
    },

    [ColumnType.PROGRESS]: (data: unknown): data is number => {
        return typeof data === 'number' && data >= 0 && data <= 100
    },

    [ColumnType.DROPDOWN]: (data: unknown): data is DropdownData => {
        if (typeof data === 'object' && data !== null) {
            const dropdownData = data as Record<string, unknown>
            return (
                Array.isArray(dropdownData.options) &&
                dropdownData.options.every(
                    (option) =>
                        typeof option === 'object' &&
                        option !== null &&
                        'id' in option &&
                        'label' in option &&
                        'value' in option
                )
            )
        }
        return false
    },

    [ColumnType.REACT_ELEMENT]: (_data: unknown): _data is unknown => {
        return true
    },
}

export type ColumnTypeConfig = {
    type: ColumnType
    filterType: FilterType
    filterOptions?: ColumnFilterOption[]
    supportsSorting: boolean
    supportsFiltering: boolean
    enableSearch?: boolean
    filterComponent?:
        | 'search'
        | 'select'
        | 'multiselect'
        | 'dateRange'
        | 'numberRange'
        | 'slider'
}

export const getColumnTypeConfig = (type: ColumnType): ColumnTypeConfig => {
    switch (type) {
        case ColumnType.TEXT:
            return {
                type,
                filterType: FilterType.TEXT,
                supportsSorting: true,
                supportsFiltering: false,
                enableSearch: false,
            }
        case ColumnType.NUMBER:
            return {
                type,
                filterType: FilterType.NUMBER,
                supportsSorting: true,
                supportsFiltering: false,
                enableSearch: false,
            }
        case ColumnType.SELECT:
            return {
                type,
                filterType: FilterType.SELECT,
                supportsSorting: true,
                supportsFiltering: true,
                enableSearch: false,
                filterComponent: 'select',
            }
        case ColumnType.MULTISELECT:
            return {
                type,
                filterType: FilterType.MULTISELECT,
                supportsSorting: true,
                supportsFiltering: true,
                enableSearch: false,
                filterComponent: 'multiselect',
            }
        case ColumnType.AVATAR:
            return {
                type,
                filterType: FilterType.TEXT,
                supportsSorting: true,
                supportsFiltering: false,
                enableSearch: false,
            }
        case ColumnType.TAG:
            return {
                type,
                filterType: FilterType.SELECT,
                supportsSorting: true,
                supportsFiltering: true,
                enableSearch: false,
                filterComponent: 'select',
            }
        case ColumnType.DATE:
            return {
                type,
                filterType: FilterType.DATE,
                supportsSorting: true,
                supportsFiltering: true,
                enableSearch: false,
                filterComponent: 'dateRange',
            }
        case ColumnType.DATE_RANGE:
            return {
                type,
                filterType: FilterType.DATE,
                supportsSorting: true,
                supportsFiltering: true,
                enableSearch: false,
                filterComponent: 'dateRange',
            }
        case ColumnType.PROGRESS:
            return {
                type,
                filterType: FilterType.NUMBER,
                supportsSorting: true,
                supportsFiltering: false,
                enableSearch: false,
            }
        case ColumnType.DROPDOWN:
            return {
                type,
                filterType: FilterType.SELECT,
                supportsSorting: true,
                supportsFiltering: true,
                enableSearch: false,
                filterComponent: 'select',
            }
        case ColumnType.SLIDER:
            return {
                type,
                filterType: FilterType.SLIDER,
                supportsSorting: true,
                supportsFiltering: true,
                enableSearch: false,
                filterComponent: 'slider',
            }
        case ColumnType.REACT_ELEMENT:
            return {
                type,
                filterType: FilterType.TEXT,
                supportsSorting: false,
                supportsFiltering: false,
                enableSearch: false,
            }
        case ColumnType.CUSTOM:
            return {
                type,
                filterType: FilterType.TEXT,
                supportsSorting: false,
                supportsFiltering: false,
                enableSearch: false,
            }
        default:
            return {
                type: ColumnType.TEXT,
                filterType: FilterType.TEXT,
                supportsSorting: true,
                supportsFiltering: false,
                enableSearch: false,
            }
    }
}

export const getExpectedTypeDescription = (type: ColumnType): string => {
    switch (type) {
        case ColumnType.TEXT:
            return 'string or number'
        case ColumnType.NUMBER:
            return 'number'
        case ColumnType.SELECT:
            return 'string or SelectData object'
        case ColumnType.MULTISELECT:
            return 'string array or MultiSelectData object'
        case ColumnType.DATE:
            return 'Date, string, or DateData object'
        case ColumnType.DATE_RANGE:
            return 'DateRangeData object'
        case ColumnType.AVATAR:
            return 'AvatarData object with label'
        case ColumnType.TAG:
            return 'TagData object with text'
        case ColumnType.PROGRESS:
            return 'number (0-100)'
        case ColumnType.DROPDOWN:
            return 'DropdownData object with options array'
        case ColumnType.SLIDER:
            return 'number (for slider range filtering)'
        case ColumnType.REACT_ELEMENT:
            return 'any React element'
        case ColumnType.CUSTOM:
            return 'any value'
        default:
            return 'unknown'
    }
}
