import type { MouseEvent } from 'react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import PrimitiveLink from '../Primitives/PrimitiveLink'
import { BreadcrumbV2TokensType } from './breadcrumbV2.tokens'
import type { BreadcrumbCompoundItemProps } from './breadcrumbV2.types'
import { getPlainTextFromReactNode } from './utils'
import { useMessages } from '../../i18n/useMessages'
import { BREADCRUMB_MESSAGES } from '../../i18n/catalog/breadcrumb.messages'

const BreadcrumbV2CompoundItem = ({
    href,
    onClick,
    isActive = false,
    children,
}: BreadcrumbCompoundItemProps) => {
    const { m } = useMessages(BREADCRUMB_MESSAGES)
    const breadcrumbTokens =
        useResponsiveTokens<BreadcrumbV2TokensType>('BREADCRUMBV2')

    const labelFromChildren = getPlainTextFromReactNode(children).trim()
    const hasLabel = labelFromChildren.length > 0
    // Whole sentences for the unnamed case rather than a fallback noun
    // substituted into the named template: the noun's case and article
    // depend on the sentence around it.
    const ariaLabel = isActive
        ? hasLabel
            ? m('breadcrumb.a11y.current-page', { label: labelFromChildren })
            : m('breadcrumb.a11y.current-page-unnamed')
        : hasLabel
          ? m('breadcrumb.a11y.navigate-to', { label: labelFromChildren })
          : m('breadcrumb.a11y.navigate-to-unnamed')

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
            aria-label={ariaLabel}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </PrimitiveLink>
    )
}

BreadcrumbV2CompoundItem.displayName = 'Breadcrumb.Item'

export default BreadcrumbV2CompoundItem
