import type { ReactNode } from 'react'
import type { BlockProps } from '../Primitives/Block/Block'
import type { SkeletonVariant, SkeletonShape } from './skeleton.tokens'
import type { ButtonType, ButtonSize, ButtonSubType } from '../Button/types'
import type { TagSize, TagShape } from '../Tags/types'

export type SkeletonSize = 'sm' | 'md' | 'lg'

export type BaseSkeletonProps = {
    variant?: SkeletonVariant
    loading?: boolean
    'data-testid'?: string
}

export type SkeletonProps = BaseSkeletonProps &
    Omit<BlockProps, 'children'> & {
        children?: ReactNode
        animate?: boolean
        width?: string | number
        height?: string | number
        shape?: SkeletonShape
    }

export type SkeletonAvatarProps = BaseSkeletonProps &
    Omit<BlockProps, 'children'> & {
        size?: SkeletonSize
        shape?: 'circle' | 'square'
    }

export type SkeletonButtonProps = BaseSkeletonProps &
    Omit<BlockProps, 'children'> & {
        // Mirror exact Button component props for perfect token matching
        buttonType?: ButtonType
        size?: ButtonSize
        subType?: ButtonSubType
        width?: string | number
        fullWidth?: boolean
        buttonGroupPosition?: 'center' | 'left' | 'right'
        // Content props for dynamic sizing
        text?: string
        hasLeadingIcon?: boolean
        hasTrailingIcon?: boolean
    }

export type SkeletonCardProps = BaseSkeletonProps &
    Omit<BlockProps, 'children'> & {
        children?: ReactNode
        padding?: string | number
    }

export type SkeletonTagProps = Omit<BaseSkeletonProps, 'variant'> &
    Omit<BlockProps, 'children'> & {
        text?: string
        size?: TagSize
        shape?: TagShape
        leftSlot?: React.ReactNode
        rightSlot?: React.ReactNode
        splitTagPosition?: 'left' | 'right'
        width?: string | number
        skeletonVariant?: SkeletonVariant
    }

export { SkeletonVariant, SkeletonShape }
