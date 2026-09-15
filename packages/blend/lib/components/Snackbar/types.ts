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
    /**
     * Time in milliseconds before the snackbar auto-dismisses. Defaults to 4000.
     *
     * `duration: Infinity` prevents auto-dismissal. **`duration: 0` does not** —
     * `0` is falsy and falls through to the 4000ms default, producing a normal
     * 4-second snackbar.
     *
     * The close button remains available. To keep an action click from
     * dismissing the snackbar, also set `actionButton.autoDismiss` to `false`.
     */
    duration?: number
    position?: SnackbarPosition
    wrap?: boolean
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
    wrap?: boolean
}

export type SnackbarProps = {
    position?: SnackbarPosition
    dismissOnClickAway?: boolean
}

export type SnackbarIconProps = {
    variant: SnackbarVariant
}
