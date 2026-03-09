import { SkeletonVariant } from '../Skeleton'

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
