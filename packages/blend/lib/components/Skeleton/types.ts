import type { ReactNode } from 'react'
import type { BlockProps } from '../Primitives/Block/Block'
import type { SkeletonVariant, SkeletonShape } from './skeleton.tokens'

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

export type SkeletonCardProps = BaseSkeletonProps &
    Omit<BlockProps, 'children'> & {
        children?: ReactNode
        padding?: string | number
    }

export { SkeletonVariant, SkeletonShape }
