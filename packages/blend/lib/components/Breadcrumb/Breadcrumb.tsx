import { Ellipsis } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveLink from '../Primitives/PrimitiveLink'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { FOUNDATION_THEME } from '../../tokens'
import type { BreadcrumbTokenType } from './breadcrumb.tokens'
import type { BreadcrumbItemType, BreadcrumbSkeletonProps } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { SkeletonVariant } from '../Skeleton'
import BreadcrumbSkeleton from './BreadcrumbSkeleton'

const MAX_ITEMS = 4

const BreadcrumbItem = ({
    item,
    isActive,
    skeleton,
}: {
    item: BreadcrumbItemType
    isActive: boolean
    skeleton?: BreadcrumbSkeletonProps
}) => {
    const breadcrumbTokens =
        useResponsiveTokens<BreadcrumbTokenType>('BREADCRUMB')

    const showSkeleton = skeleton?.show
    const skeletonVariant = skeleton?.variant as SkeletonVariant

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (item.onClick) {
            event.preventDefault()
            item.onClick(event)
        }
    }

    if (showSkeleton) {
        return (
            <BreadcrumbSkeleton
                breadcrumbTokens={breadcrumbTokens}
                skeletonVariant={skeletonVariant}
                isActive={isActive}
            />
        )
    }

    return (
        <>
            <PrimitiveLink
                data-element="breadcrumb-item"
                data-id={item.label}
                padding={breadcrumbTokens.item.padding}
                display="flex"
                height={'full'}
                gap={breadcrumbTokens.item.gap}
                color={
                    breadcrumbTokens.item.text.color[
                        isActive ? 'active' : 'default'
                    ]
                }
                _hover={{
                    color: breadcrumbTokens.item.text.color.hover,
                }}
                href={isActive ? undefined : item.href}
                textDecoration="none"
                onClick={!isActive && item.onClick ? handleClick : undefined}
                aria-label={
                    isActive
                        ? `Current page: ${item.label}`
                        : `Navigate to ${item.label}`
                }
                aria-current={isActive ? 'page' : undefined}
            >
                {item.leftSlot && (
                    <Block
                        data-element="leading-icon"
                        contentCentered
                        aria-hidden="true"
                    >
                        {item.leftSlot}
                    </Block>
                )}
                <PrimitiveText
                    as="span"
                    fontWeight={breadcrumbTokens.item.text.fontWeight}
                    fontSize={breadcrumbTokens.item.text.fontSize}
                >
                    {item.label}
                </PrimitiveText>
                {item.rightSlot && (
                    <Block
                        data-element="trailing-icon"
                        contentCentered
                        aria-hidden="true"
                    >
                        {item.rightSlot}
                    </Block>
                )}
            </PrimitiveLink>
            {!isActive && (
                <Block
                    color={FOUNDATION_THEME.colors.gray[400]}
                    aria-hidden="true"
                    role="separator"
                >
                    /
                </Block>
            )}
        </>
    )
}

const Breadcrumb = ({
    items,
    skeleton,
}: {
    items: BreadcrumbItemType[]
    skeleton?: BreadcrumbSkeletonProps
}) => {
    const breadcrumbTokens =
        useResponsiveTokens<BreadcrumbTokenType>('BREADCRUMB')
    if (items.length === 0) return null

    const baseItem = items[0]
    const shouldShowMenu = items.length > MAX_ITEMS

    const breadcrumbMenuItems = shouldShowMenu
        ? items.slice(1, items.length - 3)
        : []

    const menuItems = breadcrumbMenuItems.map((item) => {
        return {
            label: item.label,
            href: item.href,
            leftSlot: item.leftSlot,
            rightSlot: item.rightSlot,
        }
    })

    const restItems = shouldShowMenu ? items.slice(-3) : items.slice(1)
    return (
        <Block as="nav" width={'full'} aria-label="Breadcrumb navigation">
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
                {baseItem && (
                    <li
                        key={`breadcrumb-item-${0}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <BreadcrumbItem
                            item={baseItem}
                            isActive={items.length == 1 ? true : false}
                            skeleton={skeleton}
                        />
                    </li>
                )}
                {menuItems.length > 0 && (
                    <li
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <PrimitiveButton
                            background={'none'}
                            borderRadius={FOUNDATION_THEME.border.radius[6]}
                            contentCentered
                            color={FOUNDATION_THEME.colors.gray[400]}
                            size={24}
                            aria-label={`Show ${menuItems.length} more breadcrumb items`}
                            aria-expanded="false"
                            aria-haspopup="menu"
                            type="button"
                        >
                            <Ellipsis
                                size={FOUNDATION_THEME.unit[14]}
                                color={FOUNDATION_THEME.colors.gray[400]}
                                aria-hidden="true"
                            />
                        </PrimitiveButton>
                        <Block
                            color={FOUNDATION_THEME.colors.gray[400]}
                            aria-hidden="true"
                            role="separator"
                        >
                            /
                        </Block>
                    </li>
                )}
                {restItems.map((item, index) => (
                    <li
                        key={`breadcrumb-item-${index}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <BreadcrumbItem
                            item={item}
                            isActive={index === restItems.length - 1}
                            skeleton={skeleton}
                        />
                    </li>
                ))}
            </ol>
        </Block>
    )
}

Breadcrumb.displayName = 'Breadcrumb'

export default Breadcrumb
