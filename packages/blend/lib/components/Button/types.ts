import React from 'react'
import type { CSSObject } from 'styled-components'

export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    DANGER = 'danger',
    SUCCESS = 'success',
}

export enum ButtonSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum ButtonSubType {
    DEFAULT = 'default',
    ICON_ONLY = 'iconOnly',
    INLINE = 'inline',
}

export enum ButtonState {
    DEFAULT = 'default',
    HOVER = 'hover',
    ACTIVE = 'active',
    DISABLED = 'disabled',
}
export type ButtonProps = {
    buttonType?: ButtonType
    size?: ButtonSize
    subType?: ButtonSubType
    text?: string
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    isLoading?: boolean
    isDisabled?: boolean
    disabled?: boolean
    onClick?: () => void
    loading?: boolean
    buttonGroupPosition?: 'center' | 'left' | 'right'
    fullWidth?: boolean
    justifyContent?: CSSObject['justifyContent']
    state?: ButtonState
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className'>
