import type { ReactNode } from 'react'
import type { ButtonV2Props } from '../Button/types'

export enum CardVariant {
    DEFAULT = 'default',
    ALIGNED = 'aligned',
    CUSTOM = 'custom',
}

export enum CardAlignment {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export type DefaultCardProps = {
    variant?: CardVariant.DEFAULT
    headerSlot1?: ReactNode
    headerTitle?: string
    headerTag?: ReactNode
    headerSlot2?: ReactNode
    subHeader?: string

    bodySlot1?: ReactNode
    bodyTitle?: string
    content?: ReactNode
    bodySlot2?: ReactNode
    actionButton?: ButtonV2Props
}

export type AlignedCardProps = {
    variant: CardVariant.ALIGNED
    alignment: CardAlignment
    centerAlign?: boolean
    cardSlot?: ReactNode

    headerTitle?: string
    headerTag?: ReactNode
    headerSlot2?: ReactNode
    subHeader?: string

    bodySlot1?: ReactNode
    bodyTitle?: string
    content?: ReactNode
    actionButton?: ButtonV2Props
}

export type CustomCardProps = {
    variant: CardVariant.CUSTOM
    children: ReactNode
}

export type CardProps = {
    maxWidth?: string
} & (DefaultCardProps | AlignedCardProps | CustomCardProps)
