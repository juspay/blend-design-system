export enum InputSizeV2 {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export enum InputStateV2 {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}

export type AnyRef<T> =
    | ((instance: T | null) => void)
    | { current: T | null }
    | null
    | undefined
