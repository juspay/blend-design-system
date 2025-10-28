import type { ReactNode } from 'react'
import type { ButtonProps } from '../Button/types'

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
    actionButton?: ButtonProps
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
    actionButton?: ButtonProps
}

export type CustomCardProps = {
    variant: CardVariant.CUSTOM
    children: ReactNode
}

export type CardProps = {
    className?: string
    maxWidth?: string
    /**
     * Height of the card. Accepts any valid CSS height value.
     * Examples: "200px", "100%", "50vh", "auto"
     * Note: For percentage heights to work, parent container must have a defined height.
     */
    maxHeight?: string
    /**
     * Minimum height of the card. Accepts any valid CSS height value.
     * Useful when you want the card to grow with content but maintain a minimum height.
     */
    minHeight?: string
} & (DefaultCardProps | AlignedCardProps | CustomCardProps)
