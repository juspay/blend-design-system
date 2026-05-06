import {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import styled from 'styled-components'
import Block from '../../Primitives/Block/Block'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { SidebarV2MobileNavigationProps } from './types'
import type { MobileNavigationV2TokenType } from './mobile.tokens'
import {
    getMobileNavigationFillerCount,
    getMobileNavigationLayout,
    getMobileNavigationSecondaryRows,
    parseUnitValue,
    splitPrimaryItems,
} from './utils'
import {
    useItemSelection,
    useMobileNavigationViewportHeight,
    useOrderedItems,
} from './hooks'
import MobileNavigationItem from './MobileNavigationItem'
import PrimaryActionButton from './PrimaryActionButton'
import MoreButton from './MoreButton'

type FloatingNavBoxProps = {
    $tokens: MobileNavigationV2TokenType
    $backgroundColor: string
    $background?: string
}

const FloatingNavContainer = styled(Block)<FloatingNavBoxProps>`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${({ $tokens }) => String($tokens?.container?.zIndex ?? 1100)};
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

const PRIMARY_VISIBLE_LIMIT = 5
const VIEWPORT_HEIGHT_MULTIPLIER = 0.85

const SidebarV2MobileNavigation = forwardRef<
    HTMLDivElement,
    SidebarV2MobileNavigationProps
>(
    (
        {
            items,
            onHeightChange,
            showMobilePrimaryActionButton = false,
            mobilePrimaryActionButtonProps,
        },
        ref
    ) => {
        const baseId = useId()
        const secondaryNavigationRegionId = `${baseId}-secondary-mobile-nav`

        const tokens = useResponsiveTokens<MobileNavigationV2TokenType>(
            'MOBILE_NAVIGATION_V2'
        )

        const viewportHeight = useMobileNavigationViewportHeight()

        const [orderedItems, setOrderedItems] = useOrderedItems(items)

        const layout = useMemo(
            () =>
                getMobileNavigationLayout(
                    orderedItems,
                    viewportHeight,
                    tokens,
                    PRIMARY_VISIBLE_LIMIT,
                    VIEWPORT_HEIGHT_MULTIPLIER,
                    {
                        primaryReservedSlots: showMobilePrimaryActionButton
                            ? 1
                            : 0,
                    }
                ),
            [
                orderedItems,
                showMobilePrimaryActionButton,
                viewportHeight,
                tokens,
            ]
        )

        const [isExpanded, setIsExpanded] = useState<boolean>(false)
        const toggleExpansion = useCallback(() => setIsExpanded((c) => !c), [])
        const collapse = useCallback(() => setIsExpanded(false), [])

        const floatingPadding = tokens.layout.floatingPadding
        const safeAreaOffset = parseUnitValue(tokens.layout.safeAreaOffset)

        const { collapsedHeight, expandedHeight } = useMemo(() => {
            const collapsed = parseUnitValue(layout.snapPoints[0] as string)
            const expanded = layout.snapPoints[1]
                ? parseUnitValue(layout.snapPoints[1] as string)
                : collapsed
            return { collapsedHeight: collapsed, expandedHeight: expanded }
        }, [layout.snapPoints])

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
                splitPrimaryItems(
                    layout.primaryItems,
                    showMobilePrimaryActionButton
                ),
            [layout.primaryItems, showMobilePrimaryActionButton]
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

            if (showMobilePrimaryActionButton) {
                elements.push(
                    <Block
                        key="sidebar-v2-mobile-primary-action-wrapper"
                        display="flex"
                        marginLeft={primaryActionMargin}
                        marginRight={primaryActionMargin}
                    >
                        <PrimaryActionButton
                            tokens={tokens}
                            buttonProps={mobilePrimaryActionButtonProps}
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
                        isExpanded={isExpanded}
                        secondaryNavigationRegionId={
                            secondaryNavigationRegionId
                        }
                        onClick={toggleExpansion}
                    />
                )
            }

            return elements
        }, [
            leftItems,
            rightItems,
            showMobilePrimaryActionButton,
            layout.hasSecondaryItems,
            primaryActionMargin,
            tokens,
            mobilePrimaryActionButtonProps,
            handleItemSelect,
            toggleExpansion,
            isExpanded,
            secondaryNavigationRegionId,
        ])

        return (
            <FloatingNavContainer
                ref={ref}
                as="nav"
                $tokens={tokens}
                $backgroundColor={String(tokens.container.backgroundColor)}
                $background={
                    tokens.container.background
                        ? String(tokens.container.background)
                        : undefined
                }
                aria-label="App navigation"
                style={{
                    maxHeight: navigationHeight,
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

                    {layout.hasSecondaryItems && (
                        <Block
                            id={secondaryNavigationRegionId}
                            role="region"
                            aria-label="More navigation options"
                            aria-hidden={!isExpanded}
                            display={isExpanded ? 'flex' : 'none'}
                            flexDirection="column"
                            width="100%"
                            gap={tokens.layout.gap}
                        >
                            {isExpanded &&
                                secondaryRows.map((row, rowIndex) => {
                                    const fillerCount =
                                        getMobileNavigationFillerCount(
                                            row.length,
                                            PRIMARY_VISIBLE_LIMIT
                                        )

                                    const rowElements: ReactNode[] = [
                                        ...row.map((item, index) => (
                                            <MobileNavigationItem
                                                key={`${item.label}-secondary-${rowIndex}-${index}`}
                                                item={item}
                                                index={
                                                    index +
                                                    rowIndex * row.length
                                                }
                                                tokens={tokens}
                                                onSelect={(selectedItem) =>
                                                    handleItemSelect(
                                                        selectedItem,
                                                        true
                                                    )
                                                }
                                            />
                                        )),
                                        ...Array.from({
                                            length: fillerCount,
                                        }).map((_, fillerIndex) => (
                                            <Block
                                                key={`secondary-row-${rowIndex}-filler-${fillerIndex}`}
                                                width={tokens.item.width}
                                                height={tokens.item.height}
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
                                            paddingTop={
                                                tokens.layout.rowPaddingTop
                                            }
                                            paddingRight={
                                                tokens.layout.rowPaddingRight
                                            }
                                            paddingBottom={
                                                tokens.layout.rowPaddingBottom
                                            }
                                            paddingLeft={
                                                tokens.layout.rowPaddingLeft
                                            }
                                            flexShrink={0}
                                        >
                                            {rowElements}
                                        </Block>
                                    )
                                })}
                        </Block>
                    )}
                </ScrollableContent>
            </FloatingNavContainer>
        )
    }
)

SidebarV2MobileNavigation.displayName = 'SidebarV2MobileNavigation'

export default SidebarV2MobileNavigation
