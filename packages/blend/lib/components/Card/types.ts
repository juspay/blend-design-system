import type { ReactNode } from 'react'

export enum CardHeaderVariant {
    DEFAULT = 'default',
    BORDERED = 'bordered',
    ELEVATED = 'elevated',
}

export interface CardProps {
    children: ReactNode
    className?: string
    maxWidth?: string
    header?: {
        variant?: CardHeaderVariant
        title?: string
        subtitle?: string
        actions?: ReactNode
    }
    headerSlot?: ReactNode
}
