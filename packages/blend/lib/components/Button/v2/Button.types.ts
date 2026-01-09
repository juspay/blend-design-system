import type { ReactNode, ButtonHTMLAttributes } from 'react'
import type { CSSObject } from 'styled-components'
import type { SkeletonVariant } from '../../Skeleton/skeleton.tokens'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonSubType = 'default' | 'iconOnly' | 'inline'
export type ButtonGroupPosition = 'left' | 'center' | 'right'

export interface ButtonProps extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'style' | 'className'
> {
    /** Visual variant */
    variant?: ButtonVariant
    /** Button size */
    size?: ButtonSize
    /** Sub-type for special button styles */
    subType?: ButtonSubType

    /** Button content */
    children?: ReactNode
    /** Icon before content */
    leadingIcon?: ReactNode
    /** Icon after content */
    trailingIcon?: ReactNode

    /** Loading state */
    loading?: boolean
    /** Text shown during loading */
    loadingText?: ReactNode
    /** Custom spinner element */
    spinner?: ReactNode
    /** Spinner position relative to text */
    spinnerPlacement?: 'start' | 'end'

    /** Full width button */
    fullWidth?: boolean
    /** Custom width */
    width?: string | number
    /** Content alignment */
    justifyContent?: CSSObject['justifyContent']
    /** Position in button group */
    groupPosition?: ButtonGroupPosition

    /** Show skeleton loading state */
    showSkeleton?: boolean
    /** Skeleton animation variant */
    skeletonVariant?: SkeletonVariant
}
