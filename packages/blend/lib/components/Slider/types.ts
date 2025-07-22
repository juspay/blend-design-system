export enum SliderVariant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

export enum SliderSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum SliderValueType {
    NUMBER = 'number',
    PERCENTAGE = 'percentage',
    DECIMAL = 'decimal',
}

export type SliderValueFormatConfig = {
    type: SliderValueType
    decimalPlaces?: number
    prefix?: string
    suffix?: string
    showLabels?: boolean
    formatter?: (value: number) => string
}

export type SliderLabelPosition = 'top' | 'bottom' | 'inline'

export type SliderProps = {
    variant?: SliderVariant
    size?: SliderSize
    valueFormat?: SliderValueFormatConfig
    showValueLabels?: boolean
    labelPosition?: SliderLabelPosition
}
