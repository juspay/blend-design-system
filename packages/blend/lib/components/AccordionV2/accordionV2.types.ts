import type { ReactNode } from 'react'
import type { CSSObject } from 'styled-components'

export enum AccordionV2Type {
    BORDER = 'border',
    NO_BORDER = 'noBorder',
}

export enum AccordionV2ChevronPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

export type AccordionV2ItemProps = {
    value: string
    title: string
    subtext?: string
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    subtextSlot?: ReactNode
    children: ReactNode
    isDisabled?: boolean
    chevronPosition?: AccordionV2ChevronPosition
}

export type AccordionV2Dimensions = {
    width?: CSSObject['width']
    maxWidth?: CSSObject['maxWidth']
    minWidth?: CSSObject['minWidth']
}

export type AccordionV2Props = {
    children: ReactNode
    accordionType?: AccordionV2Type
    defaultValue?: string | string[]
    value?: string | string[]
    isMultiple?: boolean
    onValueChange?: (value: string | string[]) => void
} & AccordionV2Dimensions
