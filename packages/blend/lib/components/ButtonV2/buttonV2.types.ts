import React from 'react'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'

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

export type ButtonV2Props = {
    buttonType?: ButtonType
    size?: ButtonSize
    subType?: ButtonSubType
    text?: string
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    loading?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    buttonGroupPosition?: 'center' | 'left' | 'right'
    width?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    state?: ButtonState
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className'>
