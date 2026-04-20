import { SkeletonVariant } from '../Skeleton'

export type BreadcrumbSkeletonProps = {
    show: boolean
    variant: SkeletonVariant
}

export type BreadcrumbItemType = {
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    label: string
    href: string
    /**
     * Optional click handler for custom routing (e.g., React Router).
     * When provided, prevents default link behavior and calls this handler instead.
     * Use this to avoid page reloads and handle navigation with client-side routing.
     */
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
    skeleton?: BreadcrumbSkeletonProps
}
