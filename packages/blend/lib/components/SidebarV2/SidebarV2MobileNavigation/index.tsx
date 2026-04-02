import {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import styled from 'styled-components'
import Block from '../../Primitives/Block/Block'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { SidebarV2MobileNavigationProps } from '../types'
import type { MobileNavigationV2TokenType } from './mobile.tokens'
import {
    getMobileNavigationFillerCount,
    getMobileNavigationLayout,
    getMobileNavigationSecondaryRows,
    parseUnitValue,
    splitPrimaryItems,
    getSidebarV2CollapsedMobilePadding,
} from './utils'
import { useItemSelection, useOrderedItems } from './hooks'
import MobileNavigationItem from './MobileNavigationItem'
import PrimaryActionButton from './PrimaryActionButton'
import MoreButton from './MoreButton'

const PRIMARY_VISIBLE_LIMIT = 5
const VIEWPORT_HEIGHT_MULTIPLIER = 0.85

const FloatingNavContainer = styled(Block)<{
    $tokens: MobileNavigationV2TokenType
    $backgroundColor: string
}>`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${({ $tokens }) => String($tokens.container.zIndex)};
    backdrop-filter: ${({ $tokens }) =>
        String($tokens.container.backdropFilter)};
    -webkit-backdrop-filter: ${({ $tokens }) =>
        String($tokens.container.backdropFilter)};
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    border: ${({ $tokens }) => String($tokens.container.border)};
    border-radius: ${({ $tokens }) => String($tokens.container.borderRadius)};
    transition: ${({ $tokens }) => String($tokens.container.transition)};
    overflow: hidden;
    will-change: transform, max-height;
    display: flex;
    flex-direction: column;
`

const ScrollableContent = styled(Block)`
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    -webkit-overflow-scrolling: touch;
    min-height: 0;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`

const SidebarV2MobileNavigation = forwardRef<
    HTMLDivElement,
    SidebarV2MobileNavigationProps
>(
    (
        {
            items,
            onHeightChange,
            showPrimaryActionButton = false,
            primaryActionButtonProps,
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<MobileNavigationV2TokenType>(
            'MOBILE_NAVIGATION_V2'
        )

        const backgroundColor = useMemo(() => {
            const base = String(tokens.container.backgroundColor ?? '')
            const opacity =
                typeof tokens.container.opacity === 'number'
                    ? tokens.container.opacity
                    : 1

            if (!base.startsWith('#')) return base
            const hex = base.replace('#', '')
            if (hex.length !== 6) return base

            const r = Number.parseInt(hex.slice(0, 2), 16)
            const g = Number.parseInt(hex.slice(2, 4), 16)
            const b = Number.parseInt(hex.slice(4, 6), 16)
            return `rgba(${r}, ${g}, ${b}, ${opacity})`
        }, [tokens.container.backgroundColor, tokens.container.opacity])

        const [viewportHeight, setViewportHeight] = useState<
            number | undefined
        >(() =>
            typeof window === 'undefined' ? undefined : window.innerHeight
        )

        useEffect(() => {
            if (typeof window === 'undefined') return
            const handleResize = () => setViewportHeight(window.innerHeight)
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }, [])

        const [orderedItems, setOrderedItems] = useOrderedItems(items)

        const layout = useMemo(
            () =>
                getMobileNavigationLayout(
                    orderedItems,
                    viewportHeight,
                    tokens,
                    PRIMARY_VISIBLE_LIMIT,
                    VIEWPORT_HEIGHT_MULTIPLIER,
                    { primaryReservedSlots: showPrimaryActionButton ? 1 : 0 }
                ),
            [orderedItems, showPrimaryActionButton, viewportHeight, tokens]
        )

        const [isExpanded, setIsExpanded] = useState<boolean>(false)
        const toggleExpansion = useCallback(() => setIsExpanded((c) => !c), [])
        const collapse = useCallback(() => setIsExpanded(false), [])

        const floatingPadding = tokens.layout.floatingPadding
        const safeAreaOffset = parseUnitValue(tokens.layout.safeAreaOffset)
        const floatingMarginValue = parseUnitValue(floatingPadding)

        const collapsedHeight = useMemo(
            () => parseUnitValue(getSidebarV2CollapsedMobilePadding(tokens)),
            [tokens]
        )

        const expandedHeight = useMemo(() => {
            if (!layout.hasSecondaryItems || !viewportHeight)
                return collapsedHeight

            const containerGap = parseUnitValue(tokens.layout.gap)
            const containerPaddingY = parseUnitValue(tokens.layout.paddingTop)
            const rowPaddingY = parseUnitValue(tokens.layout.rowPaddingTop)
            const itemHeight = parseUnitValue(tokens.item.height)
            const rowHeight = rowPaddingY * 2 + itemHeight
            const secondaryRowCount = Math.ceil(
                layout.secondaryItems.length / PRIMARY_VISIBLE_LIMIT
            )
            const totalRows = 1 + secondaryRowCount
            const totalRowHeights = totalRows * rowHeight
            const totalRowGaps = secondaryRowCount * containerGap
            const totalContentHeight = totalRowHeights + totalRowGaps

            const totalExpandedHeight =
                totalContentHeight +
                containerPaddingY * 2 +
                floatingMarginValue +
                safeAreaOffset

            return Math.min(
                totalExpandedHeight,
                viewportHeight * VIEWPORT_HEIGHT_MULTIPLIER
            )
        }, [
            layout.hasSecondaryItems,
            layout.secondaryItems.length,
            viewportHeight,
            tokens,
            collapsedHeight,
            floatingMarginValue,
            safeAreaOffset,
        ])

        const navigationHeight = useMemo(
            () => `${isExpanded ? expandedHeight : collapsedHeight}px`,
            [isExpanded, expandedHeight, collapsedHeight]
        )

        useEffect(() => {
            onHeightChange?.(navigationHeight)
        }, [navigationHeight, onHeightChange])

        useEffect(() => () => onHeightChange?.('0px'), [onHeightChange])

        const { leftItems, rightItems } = useMemo(
            () =>
                splitPrimaryItems(layout.primaryItems, showPrimaryActionButton),
            [layout.primaryItems, showPrimaryActionButton]
        )

        const handleItemSelect = useItemSelection(
            orderedItems,
            setOrderedItems,
            layout.primaryItems,
            layout.hasSecondaryItems,
            collapse
        )

        const secondaryRows = useMemo(
            () =>
                getMobileNavigationSecondaryRows(
                    layout.secondaryItems,
                    PRIMARY_VISIBLE_LIMIT
                ),
            [layout.secondaryItems]
        )

        const primaryActionMargin = String(tokens.layout.primaryActionMarginX)

        const primaryRowElements = useMemo(() => {
            const elements: ReactNode[] = []

            leftItems.forEach((item, index) => {
                elements.push(
                    <MobileNavigationItem
                        key={`${item.label}-primary-left-${index}`}
                        item={item}
                        index={index}
                        tokens={tokens}
                        onSelect={handleItemSelect}
                    />
                )
            })

            if (showPrimaryActionButton) {
                elements.push(
                    <Block
                        key="sidebar-v2-mobile-primary-action-wrapper"
                        display="flex"
                        marginLeft={primaryActionMargin}
                        marginRight={primaryActionMargin}
                    >
                        <PrimaryActionButton
                            tokens={tokens}
                            buttonProps={primaryActionButtonProps}
                        />
                    </Block>
                )
            }

            rightItems.forEach((item, index) => {
                const absoluteIndex = index + leftItems.length
                elements.push(
                    <MobileNavigationItem
                        key={`${item.label}-primary-right-${index}`}
                        item={item}
                        index={absoluteIndex}
                        tokens={tokens}
                        onSelect={handleItemSelect}
                    />
                )
            })

            if (layout.hasSecondaryItems) {
                elements.push(
                    <MoreButton
                        key="sidebar-v2-mobile-more"
                        tokens={tokens}
                        onClick={toggleExpansion}
                    />
                )
            }

            return elements
        }, [
            leftItems,
            rightItems,
            showPrimaryActionButton,
            layout.hasSecondaryItems,
            primaryActionMargin,
            tokens,
            primaryActionButtonProps,
            handleItemSelect,
            toggleExpansion,
        ])

        return (
            <FloatingNavContainer
                ref={ref}
                $tokens={tokens}
                $backgroundColor={backgroundColor}
                maxHeight={navigationHeight}
                style={{
                    marginBottom: `calc(${safeAreaOffset}px + ${floatingPadding})`,
                    marginLeft: floatingPadding,
                    marginRight: floatingPadding,
                    marginTop: floatingPadding,
                    paddingTop: tokens.layout.paddingTop,
                    paddingRight: tokens.layout.paddingRight,
                    paddingBottom: tokens.layout.paddingBottom,
                    paddingLeft: tokens.layout.paddingLeft,
                }}
            >
                <ScrollableContent
                    display="flex"
                    flexDirection="column"
                    width="100%"
                    gap={tokens.layout.gap}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                        paddingTop={tokens.layout.rowPaddingTop}
                        paddingRight={tokens.layout.rowPaddingRight}
                        paddingBottom={tokens.layout.rowPaddingBottom}
                        paddingLeft={tokens.layout.rowPaddingLeft}
                        flexShrink={0}
                    >
                        {primaryRowElements}
                    </Block>

                    {isExpanded &&
                        secondaryRows.map((row, rowIndex) => {
                            const fillerCount = getMobileNavigationFillerCount(
                                row.length,
                                PRIMARY_VISIBLE_LIMIT
                            )

                            const rowElements: ReactNode[] = [
                                ...row.map((item, index) => (
                                    <MobileNavigationItem
                                        key={`${item.label}-secondary-${rowIndex}-${index}`}
                                        item={item}
                                        index={
                                            PRIMARY_VISIBLE_LIMIT +
                                            rowIndex * PRIMARY_VISIBLE_LIMIT +
                                            index
                                        }
                                        tokens={tokens}
                                        onSelect={(selectedItem) =>
                                            handleItemSelect(selectedItem, true)
                                        }
                                    />
                                )),
                                ...Array.from({ length: fillerCount }).map(
                                    (_, fillerIndex) => (
                                        <Block
                                            key={`secondary-row-${rowIndex}-filler-${fillerIndex}`}
                                            width={tokens.item.width}
                                            height={tokens.item.height}
                                            flexShrink={0}
                                            aria-hidden="true"
                                        />
                                    )
                                ),
                            ]

                            return (
                                <Block
                                    key={`secondary-row-${rowIndex}`}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    width="100%"
                                    paddingTop={tokens.layout.rowPaddingTop}
                                    paddingRight={tokens.layout.rowPaddingRight}
                                    paddingBottom={
                                        tokens.layout.rowPaddingBottom
                                    }
                                    paddingLeft={tokens.layout.rowPaddingLeft}
                                    flexShrink={0}
                                >
                                    {rowElements}
                                </Block>
                            )
                        })}
                </ScrollableContent>
            </FloatingNavContainer>
        )
    }
)

SidebarV2MobileNavigation.displayName = 'SidebarV2MobileNavigation'

export default SidebarV2MobileNavigation
