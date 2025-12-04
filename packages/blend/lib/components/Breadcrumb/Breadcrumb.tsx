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
            >
                {item.leftSlot && (
                    <Block
                        data-element="breadcrumb-item-left-slot"
                        contentCentered
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
                        data-element="breadcrumb-item-right-slot"
                        contentCentered
                    >
                        {item.rightSlot}
                    </Block>
                )}
            </PrimitiveLink>
            {!isActive && (
                <Block color={FOUNDATION_THEME.colors.gray[400]}>/</Block>
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
        <Block
            width={'full'}
            display="flex"
            alignItems="center"
            gap={breadcrumbTokens.gap}
            data-breadcrumb="breadcrumb"
            data-status={
                shouldShowMenu ? 'enabled-selected' : 'enabled-notselected'
            }
        >
            {baseItem && (
                <BreadcrumbItem
                    item={baseItem}
                    key={`breadcrumb-item-${0}`}
                    isActive={items.length == 1 ? true : false}
                    skeleton={skeleton}
                />
            )}
            {menuItems.length > 0 && (
                <>
                    <PrimitiveButton
                        background={'none'}
                        borderRadius={FOUNDATION_THEME.border.radius[6]}
                        // TODO: add a menu when menu items are fixed
                        // _hover={{
                        //   outline: `1px solid ${FOUNDATION_THEME.colors.gray[400]}`,
                        // }}
                        contentCentered
                        color={FOUNDATION_THEME.colors.gray[400]}
                        size={24}
                    >
                        <Ellipsis
                            size={FOUNDATION_THEME.unit[14]}
                            color={FOUNDATION_THEME.colors.gray[400]}
                        />
                    </PrimitiveButton>
                    <Block color={FOUNDATION_THEME.colors.gray[400]}>/</Block>
                </>
            )}
            {restItems.map((item, index) => (
                <BreadcrumbItem
                    key={`breadcrumb-item-${index}`}
                    item={item}
                    isActive={index === restItems.length - 1}
                    skeleton={skeleton}
                />
            ))}
        </Block>
    )
}

Breadcrumb.displayName = 'Breadcrumb'

export default Breadcrumb
