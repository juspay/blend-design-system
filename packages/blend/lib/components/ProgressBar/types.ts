export enum ProgressBarSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum ProgressBarVariant {
    SOLID = 'solid',
    SEGMENTED = 'segmented',
    CIRCULAR = 'circular',
}

export enum ProgressBarType {
    SOLID = 'solid',
    SEGMENTED = 'segmented',
}

export type ProgressBarProps = {
    value: number
    size?: ProgressBarSize
    variant?: ProgressBarVariant
    type?: ProgressBarType
    showLabel?: boolean
    min?: number
    max?: number
}
