import * as React from 'react'
import { Ellipsis } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import type { BreadcrumbV2TokensType } from './breadcrumbV2.tokens'
import BreadcrumbV2Separator from './BreadcrumbV2Separator'
import type { BreadcrumbCompoundItemProps } from './breadcrumbV2.types'
import type { IndexedBreadcrumbChild } from './utils'
import { resolveBreadcrumbItemActive } from './utils'

export type BreadcrumbV2ListProps = {
    breadcrumbTokens: BreadcrumbV2TokensType
    shouldShowMenu: boolean
    base: IndexedBreadcrumbChild | undefined
    rest: IndexedBreadcrumbChild[]
    menuItems: IndexedBreadcrumbChild[]
    totalItems: number
}

const listItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
}

const BreadcrumbV2List = ({
    breadcrumbTokens,
    shouldShowMenu,
    base,
    rest,
    menuItems,
    totalItems,
}: BreadcrumbV2ListProps) => {
    const isActive = (
        idx: number,
        el: React.ReactElement<BreadcrumbCompoundItemProps>
    ) => resolveBreadcrumbItemActive(idx, el, totalItems)

    return (
        <Block
            as="nav"
            width={'full'}
            aria-label="Breadcrumb navigation"
            style={{ overflowX: 'auto', scrollbarWidth: 'none' }}
        >
            <ol
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: breadcrumbTokens.gap,
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    width: '100%',
                }}
                data-breadcrumb="breadcrumb"
                data-status={
                    shouldShowMenu ? 'enabled-selected' : 'enabled-notselected'
                }
            >
                {base ? (
                    <li
                        key={`breadcrumb-child-item-${base.idx}`}
                        style={listItemStyle}
                    >
                        {React.cloneElement(base.el, {
                            isActive: isActive(base.idx, base.el),
                        })}
                        {!isActive(base.idx, base.el) && (
                            <BreadcrumbV2Separator />
                        )}
                    </li>
                ) : null}

                {menuItems.length > 0 ? (
                    <li key="breadcrumb-child-overflow" style={listItemStyle}>
                        <PrimitiveButton
                            background={'none'}
                            borderRadius={
                                breadcrumbTokens.ellipsis.borderRadius
                            }
                            contentCentered
                            color={breadcrumbTokens.ellipsis.color}
                            size={24}
                            aria-label={`Show ${menuItems.length} more breadcrumb items`}
                            aria-expanded={false}
                            aria-haspopup="menu"
                            type="button"
                        >
                            <Ellipsis
                                size={breadcrumbTokens.ellipsis.size}
                                color={breadcrumbTokens.ellipsis.color}
                                aria-hidden="true"
                            />
                        </PrimitiveButton>
                        <BreadcrumbV2Separator />
                    </li>
                ) : null}

                {rest.map(({ el, idx }) => {
                    const active = isActive(idx, el)
                    return (
                        <li
                            key={`breadcrumb-child-item-${idx}`}
                            style={listItemStyle}
                        >
                            {React.cloneElement(el, { isActive: active })}
                            {!active ? <BreadcrumbV2Separator /> : null}
                        </li>
                    )
                })}
            </ol>
        </Block>
    )
}

BreadcrumbV2List.displayName = 'BreadcrumbV2List'

export default BreadcrumbV2List
