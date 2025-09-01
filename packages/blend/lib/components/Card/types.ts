import type { ReactNode } from 'react'
import type { ButtonV2Props } from '../Button/types'

export enum CardHeaderVariant {
    DEFAULT = 'default',
    BORDERED = 'bordered',
    BORDERED_WITH_LABEL = 'bordered_with_label',
}

export enum CardSlotVariant {
    TOP = 'top',
    TOP_WITH_PADDING = 'top_with_padding',
    LEFT = 'left',
}

export interface CardProps {
    className?: string
    maxWidth?: string

    // Standard card content pattern (recommended)
    title?: string
    titleSlot?: ReactNode
    headerActionSlot?: ReactNode
    description?: string
    content?: ReactNode
    actionButton?: ButtonV2Props

    // Bordered header variant props
    borderedHeader?: {
        title: string
        titleSlot?: ReactNode
        headerActionSlot?: ReactNode
        headerDescription?: string
        topSlot?: ReactNode
        subHeaderTitle?: string
        description?: string
        content?: ReactNode
        actionButton?: ButtonV2Props
    }

    // Legacy props for top/left slot variants (deprecated)
    header?: {
        variant?: CardHeaderVariant
        title?: string
        subtitle?: string
        actions?: ReactNode
        label?: ReactNode
    }
    slot?: {
        variant: CardSlotVariant
        content: ReactNode
        centerAlign?: boolean
    }
    children?: ReactNode
}
