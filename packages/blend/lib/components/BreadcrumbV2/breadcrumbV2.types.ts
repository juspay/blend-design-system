import * as React from 'react'
import BreadcrumbV2CompoundItem from './BreadcrumbV2Item'
import BreadcrumbV2Icon from './BreadcrumbV2Icon'
import BreadcrumbV2Page from './BreadcrumbV2Page'
import BreadcrumbV2Separator from './BreadcrumbV2Separator'

export type BreadcrumbV2ItemType = {
    /** Stable unique id for React list keys when `href` may repeat or collide (e.g. dynamic routes). */
    id?: string | number
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    label: string
    href: string
    /** With `href`, prevents default navigation and runs this handler (SPA / client routing). */
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export type BreadcrumbCompoundIconProps = {
    children: React.ReactNode
}
export type BreadcrumbCompoundSeparatorProps = {
    children?: React.ReactNode
}

export type BreadcrumbCompoundItemProps = {
    href?: string
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
    isActive?: boolean
    children: React.ReactNode
}

export type BreadcrumbV2Props = {
    children?: React.ReactNode
    items?: BreadcrumbV2ItemType[]
    maxItems?: number
}

export type BreadcrumbV2Component = ((
    props: BreadcrumbV2Props
) => React.ReactElement | null) & {
    displayName?: string
    Item: typeof BreadcrumbV2CompoundItem
    Icon: typeof BreadcrumbV2Icon
    Separator: typeof BreadcrumbV2Separator
    Page: typeof BreadcrumbV2Page
}
