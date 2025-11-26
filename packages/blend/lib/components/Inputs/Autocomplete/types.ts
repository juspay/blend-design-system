import { ReactNode } from 'react'

export enum AutocompleteSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export enum AutocompleteState {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}

export type AutocompleteOption<T = unknown> = {
    label: string
    value: string
    disabled?: boolean
    group?: string
    data?: T
}

export type AutocompleteProps<T = unknown> = {
    // Labeling
    label?: string
    sublabel?: string
    helpIconHintText?: string
    placeholder?: string

    // State
    error?: boolean
    errorMessage?: string
    hintText?: string
    disabled?: boolean
    required?: boolean
    readOnly?: boolean

    // Options
    options: AutocompleteOption<T>[]
    value?: string | string[]
    onChange?: (
        value: string | string[],
        option?: AutocompleteOption<T> | AutocompleteOption<T>[]
    ) => void

    // Features
    multiple?: boolean
    freeSolo?: boolean
    clearable?: boolean
    loading?: boolean
    openOnFocus?: boolean
    autoHighlight?: boolean
    disableCloseOnSelect?: boolean
    limitTags?: number

    // Filtering
    filterOptions?: (
        options: AutocompleteOption<T>[],
        inputValue: string
    ) => AutocompleteOption<T>[]
    getOptionLabel?: (option: AutocompleteOption<T>) => string
    isOptionEqualToValue?: (
        option: AutocompleteOption<T>,
        value: AutocompleteOption<T>
    ) => boolean

    // Customization
    size?: AutocompleteSize
    slot?: ReactNode
    renderOption?: (
        option: AutocompleteOption<T>,
        index: number,
        selected: boolean
    ) => ReactNode
    renderTags?: (
        values: string[],
        getTagProps: (index: number) => {
            onDelete: (e: React.MouseEvent) => void
        }
    ) => ReactNode
    noOptionsText?: string
    loadingText?: string

    // Input props
    name?: string
    onInputChange?: (
        event: React.ChangeEvent<HTMLInputElement>,
        value: string
    ) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void

    // Popover positioning
    maxMenuHeight?: number
    minMenuWidth?: number
    maxMenuWidth?: number
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'size'
    | 'style'
    | 'className'
    | 'onChange'
    | 'value'
    | 'onFocus'
    | 'onBlur'
    | 'slot'
>
