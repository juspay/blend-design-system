export enum SnackbarVariant {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
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
