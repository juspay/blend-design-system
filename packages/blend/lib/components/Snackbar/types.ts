export enum SnackbarVariant {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export enum SnackbarPosition {
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
    TOP_CENTER = 'top-center',
    BOTTOM_CENTER = 'bottom-center',
}

export type AddToastOptions = {
    header: string
    description?: string
    variant?: SnackbarVariant
    onClose?: () => void
    actionButton?: {
        label: string
        onClick: () => void
        autoDismiss?: boolean
    }
    duration?: number
    position?: SnackbarPosition
}

export type CustomToastProps = {
    header: string
    description?: string
    variant: SnackbarVariant
    onClose?: () => void
    actionButton?: {
        label: string
        onClick: () => void
        autoDismiss?: boolean
    }
    toastId?: string | number
}

export type SnackbarProps = {
    position?: SnackbarPosition
    dismissOnClickAway?: boolean
}

export type SnackbarIconProps = {
    variant: SnackbarVariant
}
