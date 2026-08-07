import type { ReactNode } from 'react'
import type { BlockProps } from '../Primitives/Block/Block'
import type { EmptyStateSize } from './emptyState.tokens.types'

export type EmptyStateActionConfig = {
    label: string
    onClick: () => void
}

export type EmptyStateAction = EmptyStateActionConfig | ReactNode

export type EmptyStateProps = Omit<BlockProps, 'children' | 'title'> & {
    illustration?: ReactNode
    title: string
    description?: ReactNode
    primaryAction?: EmptyStateAction
    secondaryAction?: EmptyStateAction
    size?: EmptyStateSize
}

export type { EmptyStateSize }
