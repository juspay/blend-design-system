import BreadcrumbV2CompoundItem from './BreadcrumbV2Item'
import BreadcrumbV2Icon from './BreadcrumbV2Icon'
import BreadcrumbV2List from './BreadcrumbV2List'
import BreadcrumbV2Page from './BreadcrumbV2Page'
import BreadcrumbV2Separator from './BreadcrumbV2Separator'
import type { BreadcrumbV2TokensType } from './breadcrumbV2.tokens'
import type {
    BreadcrumbV2Component,
    BreadcrumbV2Props,
} from './breadcrumbV2.types'
import {
    computeBreadcrumbOverflowLayout,
    filterBreadcrumbItemChildren,
    indexBreadcrumbChildren,
} from './utils'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const BreadcrumbV2: BreadcrumbV2Component = ({
    children,
    maxItems = 4,
}: BreadcrumbV2Props) => {
    const breadcrumbTokens =
        useResponsiveTokens<BreadcrumbV2TokensType>('BREADCRUMBV2')

    const breadcrumbChildItems = filterBreadcrumbItemChildren(
        children,
        BreadcrumbV2CompoundItem
    )

    if (breadcrumbChildItems.length === 0) {
        return null
    }

    const indexed = indexBreadcrumbChildren(breadcrumbChildItems)
    const layout = computeBreadcrumbOverflowLayout(indexed, maxItems)

    return (
        <BreadcrumbV2List
            breadcrumbTokens={breadcrumbTokens}
            totalItems={indexed.length}
            {...layout}
        />
    )
}

BreadcrumbV2.displayName = 'BreadcrumbV2'

BreadcrumbV2.Item = BreadcrumbV2CompoundItem
BreadcrumbV2.Icon = BreadcrumbV2Icon
BreadcrumbV2.Separator = BreadcrumbV2Separator
BreadcrumbV2.Page = BreadcrumbV2Page

export default BreadcrumbV2
