import { ReactElement } from 'react'
import { CSSObject } from 'styled-components'

export enum AlertV2PaddingDirection {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right',
}

export enum AlertV2Type {
    PRIMARY = 'primary',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    PURPLE = 'purple',
    ORANGE = 'orange',
    NEUTRAL = 'neutral',
}

export enum AlertV2SubType {
    SUBTLE = 'subtle',
    NO_FILL = 'noFill',
}

export enum AlertV2ActionPosition {
    BOTTOM = 'bottom',
    RIGHT = 'right',
}

export type AlertV2Action = {
    text: string
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type AlertV2Actions = {
    position?: AlertV2ActionPosition
    primaryAction?: AlertV2Action
    secondaryAction?: AlertV2Action
}

export type AlertV2Dimensions = {
    width?: CSSObject['width']
    maxWidth?: CSSObject['maxWidth']
    minWidth?: CSSObject['minWidth']
}

export type AlertV2Props = {
    type?: AlertV2Type
    subType?: AlertV2SubType
    slot?: {
        slot: ReactElement
        maxHeight?: CSSObject['maxHeight']
    }
    heading?: string
    description?: string
    actions?: AlertV2Actions
    closeButton?: {
        show?: boolean
        onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    }
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'slot' | 'className' | 'style'> &
    AlertV2Dimensions
