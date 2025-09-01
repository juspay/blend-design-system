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

export type CardProps = {
    children: ReactNode
    className?: string
    maxWidth?: string
    header?: {
        variant?: CardHeaderVariant
        title?: string
        subtitle?: string
        actions?: ReactNode
        label?: ReactNode
    }
    headerSlot?: ReactNode
    slot?: {
        variant: CardSlotVariant
        content: ReactNode
        centerAlign?: boolean
    }
    bottomButton?: ButtonV2Props
}
