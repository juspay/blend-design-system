import {
    useState,
    useMemo,
    useCallback,
    useEffect,
    forwardRef,
    type ReactNode,
} from 'react'
import Drawer, {
    DrawerBody,
    DrawerContent,
    DrawerPortal,
    DrawerTitle,
} from '../../Drawer/Drawer'
import Block from '../../Primitives/Block/Block'
import type { SidebarMobileNavigationProps } from '../types'
import { FOUNDATION_THEME } from '../../../tokens'
import { getMobileNavigationTokens } from './mobile.tokens'
import {
    getMobileNavigationLayout,
    getMobileNavigationSecondaryRows,
    getMobileNavigationFillerCount,
    splitPrimaryItems,
} from './utils'
import MobileNavigationItem from './MobileNavigationItem'
import PrimaryActionButton from './PrimaryActionButton'
import MoreButton from './MoreButton'

const PRIMARY_VISIBLE_LIMIT = 5
const SAFE_AREA_OFFSET = Number.parseFloat(String(FOUNDATION_THEME.unit[8]))
const VIEWPORT_HEIGHT_MULTIPLIER = 0.85

const parseCssValue = (
    value: string | number | null | undefined
): number | null => {
    if (typeof value === 'number') {
        return value
    }

    if (value == null) {
        return null
    }

    const parsed = Number.parseFloat(String(value))
    return Number.isNaN(parsed) ? null : parsed
}

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
        const [viewportHeight, setViewportHeight] = useState<
            number | undefined
        >(() =>
            typeof window === 'undefined' ? undefined : window.innerHeight
        )

        const tokens = useMemo(
            () => getMobileNavigationTokens(FOUNDATION_THEME).sm,
            []
        )

        const primaryActionMargin = String(FOUNDATION_THEME.unit[14])

        useEffect(() => {
            if (typeof window === 'undefined') {
                return
            }

            const handleResize = () => {
                setViewportHeight(window.innerHeight)
            }

            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }, [])

        const { primaryItems, secondaryItems, hasSecondaryItems, snapPoints } =
            useMemo(
                () =>
                    getMobileNavigationLayout(
                        items,
                        viewportHeight,
                        tokens,
                        PRIMARY_VISIBLE_LIMIT,
                        VIEWPORT_HEIGHT_MULTIPLIER,
                        {
                            primaryReservedSlots: showPrimaryActionButton
                                ? 1
                                : 0,
                        }
                    ),
                [items, showPrimaryActionButton, viewportHeight, tokens]
            )

        const [activeSnapPoint, setActiveSnapPoint] = useState<
            number | string | null
        >(snapPoints[0])

        useEffect(() => {
            setActiveSnapPoint(snapPoints[0])
        }, [snapPoints])

        const isExpanded = activeSnapPoint !== snapPoints[0]

        const handleOpenChange = useCallback(
            (open: boolean) => {
                if (!open) {
                    setActiveSnapPoint(snapPoints[0])
                }
            },
            [snapPoints]
        )

        const handleSnapChange = useCallback(
            (snap: number | string | null) => {
                setActiveSnapPoint(snap ?? snapPoints[0])
            },
            [snapPoints]
        )

        const handleItemSelect = useCallback(
            (item: (typeof items)[0]) => {
                item.onClick?.()
                setActiveSnapPoint(snapPoints[0])
            },
            [snapPoints]
        )

        const handleMoreToggle = useCallback(() => {
            setActiveSnapPoint(
                isExpanded ? snapPoints[0] : (snapPoints[1] ?? snapPoints[0])
            )
        }, [isExpanded, snapPoints])

        const navigationHeight = useMemo(() => {
            const fallbackHeight = parseCssValue(snapPoints[0]) ?? 0
            const currentHeight = parseCssValue(activeSnapPoint)

            const computedHeight =
                currentHeight == null ? fallbackHeight : currentHeight

            return `${computedHeight + SAFE_AREA_OFFSET}px`
        }, [activeSnapPoint, snapPoints])

        useEffect(() => {
            onHeightChange?.(navigationHeight)
        }, [navigationHeight, onHeightChange])

        useEffect(() => () => onHeightChange?.('0px'), [onHeightChange])

        const { leftItems, rightItems } = useMemo(
            () => splitPrimaryItems(primaryItems, showPrimaryActionButton),
            [primaryItems, showPrimaryActionButton]
        )

        const secondaryRows = useMemo(
            () =>
                getMobileNavigationSecondaryRows(
                    secondaryItems,
                    PRIMARY_VISIBLE_LIMIT
                ),
            [secondaryItems]
        )

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

            if (hasSecondaryItems) {
                elements.push(
                    <MoreButton
                        key="sidebar-mobile-more"
                        tokens={tokens}
                        onClick={handleMoreToggle}
                    />
                )
            }

            return elements
        }, [
            handleItemSelect,
            handleMoreToggle,
            hasSecondaryItems,
            leftItems,
            primaryActionButtonProps,
            rightItems,
            showPrimaryActionButton,
            primaryActionMargin,
            tokens,
        ])

        return (
            <Drawer
                open
                onOpenChange={handleOpenChange}
                modal={false}
                dismissible={false}
                snapPoints={snapPoints}
                activeSnapPoint={activeSnapPoint}
                onSnapPointChange={handleSnapChange}
                fadeFromIndex={hasSecondaryItems ? 1 : 0}
                snapToSequentialPoint
            >
                <DrawerPortal>
                    <DrawerContent
                        direction="bottom"
                        style={{
                            left: '0px',
                            right: '0px',
                            bottom: '0px',
                            margin: '0 auto',
                            borderTop: tokens.drawer.borderTop,
                            borderTopLeftRadius: tokens.drawer.borderRadius,
                            borderTopRightRadius: tokens.drawer.borderRadius,
                            overflow: 'hidden',
                        }}
                        mobileOffset={{
                            top: '0px',
                            left: '0px',
                            right: '0px',
                        }}
                        showHandle={false}
                    >
                        <DrawerTitle>
                            <span style={{ display: 'none' }}>
                                Mobile Navigation
                            </span>
                        </DrawerTitle>
                        <DrawerBody
                            noPadding
                            overflowY={isExpanded ? 'auto' : 'hidden'}
                            direction="bottom"
                        >
                            <Block
                                ref={ref}
                                display="flex"
                                flexDirection="column"
                                width="100%"
                                backgroundColor={String(tokens.backgroundColor)}
                                gap={tokens.gap}
                                paddingTop={tokens.padding.y}
                                paddingRight={tokens.padding.x}
                                paddingBottom={tokens.padding.y}
                                paddingLeft={tokens.padding.x}
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
                                >
                                    {primaryRowElements}
                                </Block>

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
                                                    onSelect={handleItemSelect}
                                                />
                                            )),
                                            ...Array.from({
                                                length: fillerCount,
                                            }).map((_, fillerIndex) => (
                                                <Block
                                                    key={`secondary-row-${rowIndex}-filler-${fillerIndex}`}
                                                    width={
                                                        tokens.row.item.width
                                                    }
                                                    height={
                                                        tokens.row.item.height
                                                    }
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
                                                    tokens.row.padding.y
                                                }
                                                paddingRight={
                                                    tokens.row.padding.x
                                                }
                                                paddingBottom={
                                                    tokens.row.padding.y
                                                }
                                                paddingLeft={
                                                    tokens.row.padding.x
                                                }
                                            >
                                                {rowElements}
                                            </Block>
                                        )
                                    })}
                            </Block>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>
        )
    }
)

SidebarMobileNavigation.displayName = 'SidebarMobileNavigation'

export default SidebarMobileNavigation
