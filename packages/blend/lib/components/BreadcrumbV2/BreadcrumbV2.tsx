import * as React from 'react'
import BreadcrumbV2CompoundItem from './BreadcrumbV2Item'
import BreadcrumbV2Icon from './BreadcrumbV2Icon'
import BreadcrumbV2List from './BreadcrumbV2List'
import BreadcrumbV2Page from './BreadcrumbV2Page'
import BreadcrumbV2Separator from './BreadcrumbV2Separator'
import type { BreadcrumbV2TokensType } from './breadcrumbV2.tokens'
import type {
    BreadcrumbCompoundItemProps,
    BreadcrumbV2Component,
    BreadcrumbV2ItemType,
    BreadcrumbV2Props,
} from './breadcrumbV2.types'
import {
    computeBreadcrumbOverflowLayout,
    filterBreadcrumbItemChildren,
    indexBreadcrumbChildren,
} from './utils'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

function wrapItemsOnClick(
    onClick: BreadcrumbV2ItemType['onClick']
): BreadcrumbCompoundItemProps['onClick'] {
    if (!onClick) return undefined
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        onClick(e)
    }
}

function itemsToBreadcrumbElements(
    items: BreadcrumbV2ItemType[]
): React.ReactElement<BreadcrumbCompoundItemProps>[] {
    return items.map((item, i) => (
        <BreadcrumbV2CompoundItem
            key={item.id ?? `${item.href}-${i}`}
            href={item.href}
            onClick={wrapItemsOnClick(item.onClick)}
            isActive={i === items.length - 1}
        >
            {item.leftSlot ? (
                <BreadcrumbV2Icon>{item.leftSlot}</BreadcrumbV2Icon>
            ) : null}
            <BreadcrumbV2Page>{item.label}</BreadcrumbV2Page>
            {item.rightSlot ? (
                <BreadcrumbV2Icon>{item.rightSlot}</BreadcrumbV2Icon>
            ) : null}
        </BreadcrumbV2CompoundItem>
    ))
}

const BreadcrumbV2: BreadcrumbV2Component = ({
    children,
    items,
    maxItems = 4,
}: BreadcrumbV2Props) => {
    const breadcrumbTokens =
        useResponsiveTokens<BreadcrumbV2TokensType>('BREADCRUMBV2')

    const childSource =
        items != null && items.length > 0
            ? itemsToBreadcrumbElements(items)
            : children

    const breadcrumbChildItems = filterBreadcrumbItemChildren(
        childSource,
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
