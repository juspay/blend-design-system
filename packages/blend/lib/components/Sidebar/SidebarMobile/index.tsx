import {
    useState,
    useMemo,
    useCallback,
    useEffect,
    forwardRef,
    type ReactNode,
} from 'react'
import styled from 'styled-components'
import Block from '../../Primitives/Block/Block'
import type { SidebarMobileNavigationProps } from '../types'
import { FOUNDATION_THEME } from '../../../tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { MobileNavigationTokenType } from './mobile.tokens'
import {
    getMobileNavigationLayout,
    getMobileNavigationSecondaryRows,
    getMobileNavigationFillerCount,
    splitPrimaryItems,
} from './utils'
import { parseUnitValue } from '../utils'
import { useOrderedItems, useItemSelection } from './hooks'
import MobileNavigationItem from './MobileNavigationItem'
import PrimaryActionButton from './PrimaryActionButton'
import MoreButton from './MoreButton'

type FloatingNavBoxProps = {
    $tokens: MobileNavigationTokenType
    $backgroundColor: string
    $background?: string
}

const PRIMARY_VISIBLE_LIMIT = 5
const SAFE_AREA_OFFSET = Number.parseFloat(String(FOUNDATION_THEME.unit[8]))
const VIEWPORT_HEIGHT_MULTIPLIER = 0.85
const FLOATING_PADDING = FOUNDATION_THEME.unit[16]

const FloatingNavContainer = styled(Block)<FloatingNavBoxProps>`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${({ $tokens }) => String($tokens?.container?.zIndex ?? 1050)};
    backdrop-filter: ${({ $tokens }) =>
        String($tokens?.container?.backdropFilter ?? 'blur(20px)')};
    -webkit-backdrop-filter: ${({ $tokens }) =>
        String($tokens?.container?.backdropFilter ?? 'blur(20px)')};
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    border: ${({ $tokens }) => String($tokens?.container?.border ?? 'none')};
    border-radius: ${({ $tokens }) =>
        String($tokens?.container?.borderRadius ?? '24px')};
    transition: ${({ $tokens }) =>
        String($tokens?.container?.transition ?? 'all 0.3s ease')};
    overflow: hidden;
    will-change: transform, max-height;
    display: flex;
    flex-direction: column;

    @supports (
        (-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px))
    ) {
        ${({ $background }) =>
            $background ? `background: ${$background};` : ''}
    }
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

const SidebarMobileNavigation = forwardRef<
    HTMLDivElement,
    SidebarMobileNavigationProps
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
        const tokens =
            useResponsiveTokens<MobileNavigationTokenType>('MOBILE_NAVIGATION')

        // Track viewport height for layout calculations
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

        // Use custom hook for ordered items (complex state logic)
        const [orderedItems, setOrderedItems] = useOrderedItems(items)

        // Calculate layout from ordered items
        const layout = useMemo(
            () =>
                getMobileNavigationLayout(
                    orderedItems,
                    viewportHeight,
                    tokens,
                    PRIMARY_VISIBLE_LIMIT,
                    VIEWPORT_HEIGHT_MULTIPLIER,
                    {
                        primaryReservedSlots: showPrimaryActionButton ? 1 : 0,
                    }
                ),
            [orderedItems, showPrimaryActionButton, viewportHeight, tokens]
        )

        // Expansion state for floating nav
        const [isExpanded, setIsExpanded] = useState<boolean>(false)

        const toggleExpansion = useCallback(() => {
            setIsExpanded((current) => !current)
        }, [])

        const collapse = useCallback(() => {
            setIsExpanded(false)
        }, [])

        // Calculate heights (including floating margin)
        const floatingMarginValue = parseUnitValue(FLOATING_PADDING)

        const collapsedHeight = useMemo(() => {
            const rowPaddingY = parseUnitValue(tokens.row.padding.y)
            const itemHeight = parseUnitValue(tokens.row.item.height)
            const rowHeight = rowPaddingY * 2 + itemHeight
            const containerPaddingY = parseUnitValue(tokens.padding.y)
            // Content height + container padding + floating margin bottom + safe area
            return (
                rowHeight +
                containerPaddingY * 2 +
                floatingMarginValue +
                SAFE_AREA_OFFSET
            )
        }, [tokens, floatingMarginValue])

        const expandedHeight = useMemo(() => {
            if (!layout.hasSecondaryItems || !viewportHeight) {
                return collapsedHeight
            }

            const containerGap = parseUnitValue(tokens.gap)
            const containerPaddingY = parseUnitValue(tokens.padding.y)
            const rowPaddingY = parseUnitValue(tokens.row.padding.y)
            const itemHeight = parseUnitValue(tokens.row.item.height)
            const rowHeight = rowPaddingY * 2 + itemHeight
            const secondaryRowCount = Math.ceil(
                layout.secondaryItems.length / PRIMARY_VISIBLE_LIMIT
            )
            const totalRows = 1 + secondaryRowCount
            const totalRowHeights = totalRows * rowHeight
            const totalRowGaps = secondaryRowCount * containerGap
            const totalContentHeight = totalRowHeights + totalRowGaps

            // Content height + container padding + floating margin bottom + safe area
            const totalExpandedHeight =
                totalContentHeight +
                containerPaddingY * 2 +
                floatingMarginValue +
                SAFE_AREA_OFFSET
            const viewportLimit = viewportHeight * VIEWPORT_HEIGHT_MULTIPLIER

            return Math.min(totalExpandedHeight, viewportLimit)
        }, [
            layout.hasSecondaryItems,
            layout.secondaryItems.length,
            viewportHeight,
            tokens,
            collapsedHeight,
            floatingMarginValue,
        ])

        const navigationHeight = useMemo(() => {
            const height = isExpanded ? expandedHeight : collapsedHeight
            return `${height}px`
        }, [isExpanded, expandedHeight, collapsedHeight])

        useEffect(() => {
            onHeightChange?.(navigationHeight)
        }, [navigationHeight, onHeightChange])

        useEffect(() => {
            return () => onHeightChange?.('0px')
        }, [onHeightChange])

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

        const primaryActionMargin = String(FOUNDATION_THEME.unit[14])

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
                        key="sidebar-mobile-primary-action-wrapper"
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
                        key="sidebar-mobile-more"
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
                $backgroundColor={String(tokens.container.backgroundColor)}
                $background={
                    tokens.container.background
                        ? String(tokens.container.background)
                        : undefined
                }
                style={{
                    maxHeight: navigationHeight,
                    marginBottom: `calc(${SAFE_AREA_OFFSET}px + ${FLOATING_PADDING})`,
                    marginLeft: FLOATING_PADDING,
                    marginRight: FLOATING_PADDING,
                    marginTop: FLOATING_PADDING,
                    paddingTop: tokens.padding.y,
                    paddingRight: tokens.padding.x,
                    paddingBottom: tokens.padding.y,
                    paddingLeft: tokens.padding.x,
                }}
            >
                <ScrollableContent
                    display="flex"
                    flexDirection="column"
                    width="100%"
                    gap={tokens.gap}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                        paddingTop={tokens.row.padding.y}
                        paddingRight={tokens.row.padding.x}
                        paddingBottom={tokens.row.padding.y}
                        paddingLeft={tokens.row.padding.x}
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
                                        index={index + rowIndex * row.length}
                                        tokens={tokens}
                                        onSelect={(selectedItem) =>
                                            handleItemSelect(selectedItem, true)
                                        }
                                    />
                                )),
                                ...Array.from({
                                    length: fillerCount,
                                }).map((_, fillerIndex) => (
                                    <Block
                                        key={`secondary-row-${rowIndex}-filler-${fillerIndex}`}
                                        width={tokens.row.item.width}
                                        height={tokens.row.item.height}
                                        flexShrink={0}
                                        aria-hidden="true"
                                    />
                                )),
                            ]

                            return (
                                <Block
                                    key={`secondary-row-${rowIndex}`}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    width="100%"
                                    paddingTop={tokens.row.padding.y}
                                    paddingRight={tokens.row.padding.x}
                                    paddingBottom={tokens.row.padding.y}
                                    paddingLeft={tokens.row.padding.x}
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

SidebarMobileNavigation.displayName = 'SidebarMobileNavigation'

export default SidebarMobileNavigation
