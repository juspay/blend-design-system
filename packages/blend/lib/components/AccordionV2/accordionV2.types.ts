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

/**
 * Platform-neutral cores of the AccordionV2 API — `@juspay/blend-native`
 * derives its Accordion/AccordionItem props from these; ReactNode slots and
 * CSS-typed dimensions stay in the web layer.
 */
export type AccordionBaseProps = {
    accordionType?: AccordionV2Type
    defaultValue?: string | string[]
    value?: string | string[]
    isMultiple?: boolean
    onValueChange?: (value: string | string[]) => void
}

export type AccordionItemBaseProps = {
    value: string
    title: string
    subtext?: string
    isDisabled?: boolean
    chevronPosition?: AccordionV2ChevronPosition
}

export type AccordionV2ItemProps = AccordionItemBaseProps & {
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    subtextSlot?: ReactNode
    children: ReactNode
}

export type AccordionV2Dimensions = {
    width?: CSSObject['width']
    maxWidth?: CSSObject['maxWidth']
    minWidth?: CSSObject['minWidth']
}

export type AccordionV2Props = AccordionBaseProps & {
    children: ReactNode
} & AccordionV2Dimensions
