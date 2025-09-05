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

export type ButtonV2Props = {
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
    skeletonLoading?: boolean
    buttonGroupPosition?: 'center' | 'left' | 'right'
    fullWidth?: boolean
    justifyContent?: CSSObject['justifyContent']
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className'>
