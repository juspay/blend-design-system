import type { ReactNode } from 'react'
import type { BlockProps } from '../Primitives/Block/Block'
import type { SkeletonVariant, SkeletonShape } from './skeleton.tokens'

export type SkeletonSize = 'sm' | 'md' | 'lg'

export interface BaseSkeletonProps {
    variant?: SkeletonVariant
    loading?: boolean
    'data-testid'?: string
}

export interface SkeletonProps
    extends BaseSkeletonProps,
        Omit<BlockProps, 'children'> {
    children?: ReactNode
    animate?: boolean
    width?: string | number
    height?: string | number
    shape?: SkeletonShape
}

export interface SkeletonTextProps
    extends BaseSkeletonProps,
        Omit<BlockProps, 'children' | 'width'> {
    lines?: number
    width?: string | number | Array<string | number>
    lastLineWidth?: string | number
    fontSize?: 'sm' | 'md' | 'lg'
}

export interface SkeletonAvatarProps
    extends BaseSkeletonProps,
        Omit<BlockProps, 'children'> {
    size?: SkeletonSize
    shape?: 'circle' | 'square'
}

export interface SkeletonButtonProps
    extends BaseSkeletonProps,
        Omit<BlockProps, 'children'> {
    size?: SkeletonSize
    width?: string | number
    fullWidth?: boolean
}

export interface SkeletonCardProps
    extends BaseSkeletonProps,
        Omit<BlockProps, 'children'> {
    children?: ReactNode
    padding?: string | number
}

export { SkeletonVariant, SkeletonShape }
