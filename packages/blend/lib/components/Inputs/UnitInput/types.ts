export enum UnitInputSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum UnitPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

export type UnitInputProps = {
    value: number | undefined
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    step?: number
    error?: boolean
    errorMessage?: string
    required?: boolean
    size?: UnitInputSize
    label?: string
    sublabel?: string
    helpIconHintText?: string
    hintText?: string
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    unit: string
    unitPosition?: UnitPosition
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className'
>
