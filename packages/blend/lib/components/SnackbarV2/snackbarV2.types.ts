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
    duration?: number
    position?: SnackbarV2Position
    maxWidth?: string | number
    width?: string | number
    minWidth?: string | number
}

export type SnackbarV2Props = {
    position?: SnackbarV2Position
    dismissOnClickAway?: boolean
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
