import * as React from 'react'
import BreadcrumbV2CompoundItem from './BreadcrumbV2Item'
import BreadcrumbV2Icon from './BreadcrumbV2Icon'
import BreadcrumbV2Page from './BreadcrumbV2Page'
import BreadcrumbV2Separator from './BreadcrumbV2Separator'

export type BreadcrumbV2ItemType = {
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    label: string
    href: string
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
    /** When the number of `Item` children exceeds this, show ellipsis + last three segments. Default `4`. */
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
