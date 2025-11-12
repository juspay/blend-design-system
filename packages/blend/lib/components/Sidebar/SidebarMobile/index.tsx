import { useState, useMemo, useCallback, useEffect, forwardRef } from 'react'
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
    splitPrimaryItems,
} from './utils'
import PrimaryRow from './PrimaryRow'
import SecondaryRow from './SecondaryRow'

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
                            maxWidth: String(tokens.drawer.maxWidth),
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
                            bottom: String(tokens.drawer.mobileOffset.bottom),
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
                            >
                                <PrimaryRow
                                    leftItems={leftItems}
                                    rightItems={rightItems}
                                    showPrimaryAction={showPrimaryActionButton}
                                    hasSecondaryItems={hasSecondaryItems}
                                    tokens={tokens}
                                    onItemSelect={handleItemSelect}
                                    onMoreToggle={handleMoreToggle}
                                    primaryActionButtonProps={
                                        primaryActionButtonProps
                                    }
                                />

                                {isExpanded &&
                                    secondaryRows.map((row, rowIndex) => (
                                        <SecondaryRow
                                            key={`secondary-row-${rowIndex}`}
                                            row={row}
                                            rowIndex={rowIndex}
                                            isLastRow={
                                                rowIndex ===
                                                secondaryRows.length - 1
                                            }
                                            tokens={tokens}
                                            onItemSelect={handleItemSelect}
                                            primaryVisibleLimit={
                                                PRIMARY_VISIBLE_LIMIT
                                            }
                                        />
                                    ))}
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
