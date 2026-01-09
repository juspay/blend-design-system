import React from 'react'
import type { CSSObject } from 'styled-components'
import type { SkeletonVariant } from '../../Skeleton/skeleton.tokens'

/**
 * Button Type Enum
 * Defines the visual variant/type of the button
 */
export enum ButtonV2Type {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    DANGER = 'danger',
    SUCCESS = 'success',
}

/**
 * Button Size Enum
 * Defines the size of the button
 */
export enum ButtonV2Size {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

/**
 * Button SubType Enum
 * Defines the sub-type/variant of the button
 */
export enum ButtonV2SubType {
    DEFAULT = 'default',
    ICON_ONLY = 'iconOnly',
    INLINE = 'inline',
}

/**
 * Button State Enum
 * Defines the interaction state of the button
 */
export enum ButtonV2State {
    DEFAULT = 'default',
    HOVER = 'hover',
    ACTIVE = 'active',
    DISABLED = 'disabled',
}

/**
 * Button Group Position
 * Defines the position of button within a button group
 */
export type ButtonV2GroupPosition = 'center' | 'left' | 'right'

/**
 * ButtonV2 Component Props
 *
 * Extends HTML button attributes and adds component-specific props.
 * All valid HTML button props are supported.
 */
export type ButtonV2Props = {
    // Component-specific props
    buttonType?: ButtonV2Type
    size?: ButtonV2Size
    subType?: ButtonV2SubType
    text?: string
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    disabled?: boolean
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
    loading?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    buttonGroupPosition?: ButtonV2GroupPosition
    fullWidth?: boolean
    width?: string | number
    justifyContent?: CSSObject['justifyContent']
    state?: ButtonV2State
} & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'style' | 'className' | 'onClick'
>
