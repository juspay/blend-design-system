export enum SnackbarVariant {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export type SnackbarPosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center'

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
