import { SkeletonVariant } from '../Skeleton'
import BreadcrumbV2EndIcon from './BreadcrumbV2EndIcon'
import BreadcrumbV2CompoundItem from './BreadcrumbV2Item'
import BreadcrumbV2Page from './BreadcrumbV2Page'
import BreadcrumbV2Separator from './BreadcrumbV2Separator'
import BreadcrumbV2StartIcon from './BreadcrumbV2StartIcon'

export type BreadcrumbV2State = 'default' | 'hover' | 'active'
export type BreadcrumbV2SkeletonProps = {
    show: boolean
    variant: SkeletonVariant
}

export type BreadcrumbV2ItemType = {
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    label: string
    href: string
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
    skeleton?: BreadcrumbV2SkeletonProps
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
    items?: BreadcrumbV2ItemType[]
    skeleton?: BreadcrumbV2SkeletonProps
    children?: React.ReactNode
}

export type BreadcrumbV2Component = ((
    props: BreadcrumbV2Props
) => React.ReactElement | null) & {
    Item: typeof BreadcrumbV2CompoundItem
    StartIcon: typeof BreadcrumbV2StartIcon
    EndIcon: typeof BreadcrumbV2EndIcon
    Separator: typeof BreadcrumbV2Separator
    Page: typeof BreadcrumbV2Page
}
