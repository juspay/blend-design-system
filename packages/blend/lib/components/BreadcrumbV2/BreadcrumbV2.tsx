import * as React from 'react'
import { Ellipsis } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveLink from '../Primitives/PrimitiveLink'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { FOUNDATION_THEME } from '../../tokens'
import type { BreadcrumbV2TokensType } from './breadcrumbV2.tokens'
import BreadcrumbV2CompoundItem from './BreadcrumbV2Item'
import BreadcrumbV2EndIcon from './BreadcrumbV2EndIcon'
import BreadcrumbV2Page from './BreadcrumbV2Page'
import BreadcrumbV2Separator from './BreadcrumbV2Separator'
import BreadcrumbV2StartIcon from './BreadcrumbV2StartIcon'
import type {
    BreadcrumbV2ItemType,
    BreadcrumbV2SkeletonProps,
    BreadcrumbV2Component,
    BreadcrumbV2Props,
    BreadcrumbCompoundItemProps,
} from './breadcrumbV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { SkeletonVariant } from '../Skeleton'
import BreadcrumbV2Skeleton from './BreadcrumbV2Skeleton'

const MAX_ITEMS = 4

const BreadcrumbItem = ({
    item,
    isActive,
    skeleton,
}: {
    item: BreadcrumbV2ItemType
    isActive: boolean
    skeleton?: BreadcrumbV2SkeletonProps
}) => {
    const breadcrumbTokens =
        useResponsiveTokens<BreadcrumbV2TokensType>('BREADCRUMBV2')

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
            <BreadcrumbV2Skeleton
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
                tabIndex={isActive ? 0 : undefined}
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

const BreadcrumbV2: BreadcrumbV2Component = ({
    items,
    skeleton,
    children,
}: BreadcrumbV2Props) => {
    const breadcrumbTokens =
        useResponsiveTokens<BreadcrumbV2TokensType>('BREADCRUMBV2')

    // Composable API: <BreadcrumbV2><BreadcrumbV2.Item>...</BreadcrumbV2.Item></BreadcrumbV2>
    const breadcrumbChildItems = React.Children.toArray(children).filter(
        (child): child is React.ReactElement<BreadcrumbCompoundItemProps> =>
            React.isValidElement(child) &&
            child.type === BreadcrumbV2CompoundItem
    )

    if (breadcrumbChildItems.length > 0) {
        const indexed = breadcrumbChildItems.map((el, idx) => ({ el, idx }))
        const shouldShowMenu = indexed.length > MAX_ITEMS

        const base = indexed[0]
        const rest = shouldShowMenu ? indexed.slice(-3) : indexed.slice(1)
        const menuItems = shouldShowMenu
            ? indexed.slice(1, indexed.length - 3)
            : []

        const isItemActive = (
            idx: number,
            el: React.ReactElement<BreadcrumbCompoundItemProps>
        ) => {
            const explicit = el.props?.isActive
            if (typeof explicit === 'boolean') return explicit
            return idx === indexed.length - 1
        }

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
                        shouldShowMenu
                            ? 'enabled-selected'
                            : 'enabled-notselected'
                    }
                >
                    {base && (
                        <li
                            key={`breadcrumb-child-item-${base.idx}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {React.cloneElement(base.el, {
                                isActive: isItemActive(base.idx, base.el),
                            })}
                            {!isItemActive(base.idx, base.el) && (
                                <BreadcrumbV2Separator />
                            )}
                        </li>
                    )}

                    {menuItems.length > 0 && (
                        <li
                            key="breadcrumb-child-overflow"
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
                            <BreadcrumbV2Separator />
                        </li>
                    )}

                    {rest.map(({ el, idx }) => {
                        const active = isItemActive(idx, el)
                        return (
                            <li
                                key={`breadcrumb-child-item-${idx}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {React.cloneElement(el, { isActive: active })}
                                {!active && <BreadcrumbV2Separator />}
                            </li>
                        )
                    })}
                </ol>
            </Block>
        )
    }

    // Simple API: <BreadcrumbV2 items=[...] />
    const resolvedItems = items ?? []
    if (resolvedItems.length === 0) return null

    const baseItem = resolvedItems[0]
    const shouldShowMenu = resolvedItems.length > MAX_ITEMS

    const breadcrumbMenuItems = shouldShowMenu
        ? resolvedItems.slice(1, resolvedItems.length - 3)
        : []

    const menuItems = breadcrumbMenuItems.map((item) => {
        return {
            label: item.label,
            href: item.href,
            leftSlot: item.leftSlot,
            rightSlot: item.rightSlot,
        }
    })

    const restItems = shouldShowMenu
        ? resolvedItems.slice(-3)
        : resolvedItems.slice(1)

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
                            isActive={resolvedItems.length == 1 ? true : false}
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

BreadcrumbV2.displayName = 'BreadcrumbV2'

BreadcrumbV2.Item = BreadcrumbV2CompoundItem
BreadcrumbV2.StartIcon = BreadcrumbV2StartIcon
BreadcrumbV2.EndIcon = BreadcrumbV2EndIcon
BreadcrumbV2.Separator = BreadcrumbV2Separator
BreadcrumbV2.Page = BreadcrumbV2Page

export default BreadcrumbV2
