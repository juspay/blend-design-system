import type { ReactNode } from 'react'

export enum AccordionType {
    BORDER = 'border',
    NO_BORDER = 'noBorder',
}

export enum AccordionChevronPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

export type SlotRenderProps = {
    isExpanded: boolean
    toggle: () => void
    value: string
    isDisabled: boolean
}

export type SlotType = ReactNode | ((props: SlotRenderProps) => ReactNode)

export type AccordionItemProps = {
    value: string
    title: string
    subtext?: string
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    subtextSlot?: ReactNode
    triggerSlot?: SlotType
    triggerSlotWidth?: string | number
    children: ReactNode
    isDisabled?: boolean
    chevronPosition?: AccordionChevronPosition
}

export type AccordionProps = {
    children: ReactNode
    accordionType?: AccordionType
    defaultValue?: string | string[]
    value?: string | string[]
    isMultiple?: boolean
    onValueChange?: (value: string | string[]) => void
}
