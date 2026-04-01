import type { MouseEvent } from 'react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import PrimitiveLink from '../Primitives/PrimitiveLink'
import { BreadcrumbV2TokensType } from './breadcrumbV2.tokens'
import type { BreadcrumbCompoundItemProps } from './breadcrumbV2.types'
import { getPlainTextFromReactNode } from './utils'

const BreadcrumbV2CompoundItem = ({
    href,
    onClick,
    isActive = false,
    children,
}: BreadcrumbCompoundItemProps) => {
    const breadcrumbTokens =
        useResponsiveTokens<BreadcrumbV2TokensType>('BREADCRUMBV2')

    const labelFromChildren = getPlainTextFromReactNode(children).trim()
    const segment =
        labelFromChildren.length > 0
            ? labelFromChildren
            : isActive
              ? 'Breadcrumb item'
              : 'breadcrumb item'

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            event.preventDefault()
            onClick(event)
        }
    }

    return (
        <PrimitiveLink
            as={isActive ? 'span' : 'a'}
            data-element="breadcrumb-item"
            padding={breadcrumbTokens.item.padding}
            display="flex"
            height={'full'}
            gap={breadcrumbTokens.item.gap}
            color={
                breadcrumbTokens.item.text.color[
                    isActive ? 'active' : 'default'
                ]
            }
            {...(!isActive
                ? {
                      href,
                      onClick: onClick ? handleClick : undefined,
                      _hover: {
                          color: breadcrumbTokens.item.text.color.hover,
                      },
                  }
                : {})}
            textDecoration="none"
            aria-label={
                isActive ? `Current page: ${segment}` : `Navigate to ${segment}`
            }
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </PrimitiveLink>
    )
}

BreadcrumbV2CompoundItem.displayName = 'Breadcrumb.Item'

export default BreadcrumbV2CompoundItem
