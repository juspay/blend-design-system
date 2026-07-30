import React, { ReactElement } from 'react'
import { CSSObject } from 'styled-components'

export enum SnackbarV2Variant {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export enum SnackbarV2Position {
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
    TOP_CENTER = 'top-center',
    BOTTOM_CENTER = 'bottom-center',
}

export type SnackbarV2Action = {
    label: string
    onClick: () => void
    autoDismiss?: boolean
}

export type SnackbarV2Dimensions = {
    width?: CSSObject['width']
    maxWidth?: CSSObject['maxWidth']
    minWidth?: CSSObject['minWidth']
}

export type SnackbarV2ToastOptions = {
    header: string
    description?: string
    variant?: SnackbarV2Variant
    slot?: ReactElement
    onClose?: () => void
    actionButton?: SnackbarV2Action
    /**
     * Time in milliseconds before the toast auto-dismisses. Defaults to 4000.
     *
     * `duration: Infinity` prevents auto-dismissal. **`duration: 0` does not**:
     * `0` is falsy in Sonner and falls through to the 4000ms default.
     *
     * The close button remains available. To keep an action click from
     * dismissing the toast, also set `actionButton.autoDismiss` to `false`.
     *
     * A persistent toast is exempt from `dismissOnClickAway`, so clicking
     * elsewhere on the page will not close it, and it does not count against
     * the visible-toast limit, so newer toasts cannot push it out of view.
     *
     * It is still a toast: it overlays the page, supports a single action, and
     * is announced once. For a message the user must not miss, prefer `AlertV2`
     * (inline, in reading order, supports a primary and secondary action) or
     * `ModalV2` (blocking).
     */
    duration?: number
    position?: SnackbarV2Position
    maxWidth?: string | number
    width?: string | number
    minWidth?: string | number
}

export type SnackbarV2Props = {
    position?: SnackbarV2Position
    /**
     * Dismiss snackbars when the user clicks outside of them.
     *
     * Toasts created with `duration: Infinity` are exempt and survive the click.
     */
    dismissOnClickAway?: boolean
    /**
     * How many toasts are visible at once. Defaults to 3.
     *
     * Newer toasts push older ones out of view. Persistent
     * (`duration: Infinity`) toasts do not count against this limit — the
     * ceiling is raised by the number of live persistent toasts so they cannot
     * be pushed out.
     */
    visibleToasts?: number
    maxWidth?: string | number
}

export type SnackbarV2ToastProps = {
    header: string
    description?: string
    variant: SnackbarV2Variant
    slot?: ReactElement
    onClose?: () => void
    actionButton?: SnackbarV2Action
    toastId?: string | number
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'slot' | 'className' | 'style'> &
    SnackbarV2Dimensions

export type SnackbarV2IconProps = {
    variant: SnackbarV2Variant
}
