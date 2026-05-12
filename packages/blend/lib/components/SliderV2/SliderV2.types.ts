import * as SliderPrimitive from '@radix-ui/react-slider'

export enum SliderV2Variant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

export enum SliderV2Size {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export enum SliderV2ValueType {
    NUMBER = 'number',
    PERCENTAGE = 'percentage',
    DECIMAL = 'decimal',
}
export enum SliderV2State {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    FOCUS_VISIBLE = 'focus-visible',
    ACTIVE = 'active',
    DISABLED = 'disabled',
}

export type SliderV2ValueFormatConfig = {
    type: SliderV2ValueType
    decimalPlaces?: number
    prefix?: string
    suffix?: string
    showLabels?: boolean
    formatter?: (value: number) => string
}

export type SliderV2LabelPosition = 'top' | 'bottom' | 'inline'

export type SliderV2Props = {
    variant?: SliderV2Variant
    size?: SliderV2Size
    valueFormat?: SliderV2ValueFormatConfig
    showValueLabels?: boolean
    labelPosition?: SliderV2LabelPosition
} & Omit<
    React.ComponentProps<typeof SliderPrimitive.Root>,
    'style' | 'className'
>

export type SliderV2CSSProperties = React.CSSProperties & {
    '&:hover'?: {
        boxShadow?: string
    }
    '&:focus'?: {
        outline?: string
        boxShadow?: string
    }
    '&:focus-visible'?: {
        outline?: string
        boxShadow?: string
    }
    '&:active'?: {
        cursor?: string
    }
    '&:disabled'?: {
        cursor?: string
        opacity?: string | number
    }
}
export type SliderV2TokenStyles = {
    root: SliderV2CSSProperties
    track: SliderV2CSSProperties
    range: SliderV2CSSProperties
    thumb: SliderV2CSSProperties
}
