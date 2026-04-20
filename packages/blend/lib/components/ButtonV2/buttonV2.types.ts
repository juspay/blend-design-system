import React from 'react'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'

export enum ButtonV2Type {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    DANGER = 'danger',
    SUCCESS = 'success',
}

export enum ButtonV2Size {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum ButtonV2SubType {
    DEFAULT = 'default',
    ICON_ONLY = 'iconOnly',
    INLINE = 'inline',
}

export enum ButtonV2State {
    DEFAULT = 'default',
    HOVER = 'hover',
    ACTIVE = 'active',
    DISABLED = 'disabled',
}

export enum PaddingDirection {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}

// Legacy exports for backward compatibility
export const ButtonType = ButtonV2Type
export const ButtonSize = ButtonV2Size
export const ButtonSubType = ButtonV2SubType
export const ButtonState = ButtonV2State

export type ButtonSlot = {
    slot: React.ReactNode
    maxHeight?: string | number
}

export type ButtonSkeleton = {
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
}

export type ButtonBaseProps = {
    buttonType?: ButtonV2Type
    size?: ButtonV2Size
    subType?: ButtonV2SubType
    text?: string
    leftSlot?: ButtonSlot
    rightSlot?: ButtonSlot
    loading?: boolean
    skeleton?: ButtonSkeleton
    buttonGroupPosition?: 'center' | 'left' | 'right'
    width?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    state?: ButtonV2State
}

export type ButtonV2Props = ButtonBaseProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className'>

export type LinkButtonProps = ButtonBaseProps & {
    href: string
    target?: string
    rel?: string
    disabled?: boolean
} & Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        | 'href'
        | 'target'
        | 'rel'
        | 'children'
        | 'className'
        | 'style'
        | 'dangerouslySetInnerHTML'
    >
