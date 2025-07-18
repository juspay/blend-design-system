export enum ProgressBarSize {
    SMALL = 'sm',
    MEDIUM = 'md',
}

export enum ProgressBarVariant {
    SOLID = 'solid',
    SEGMENTED = 'segmented',
}

export type ProgressBarProps = {
    value: number
    size?: ProgressBarSize
    variant?: ProgressBarVariant
    showLabel?: boolean
    className?: string
}
