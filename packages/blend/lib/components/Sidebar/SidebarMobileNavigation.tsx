import React, {
    useState,
    useMemo,
    useCallback,
    useEffect,
    forwardRef,
} from 'react'
import Drawer, {
    DrawerBody,
    DrawerContent,
    DrawerPortal,
    DrawerTitle,
} from '../Drawer/Drawer'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { FOUNDATION_THEME } from '../../tokens'
import type {
    MobileNavigationItem,
    SidebarMobileNavigationProps,
} from './types'
import {
    MOBILE_NAVIGATION_BUTTON_DIMENSIONS,
    MOBILE_NAVIGATION_COLLAPSED_HEIGHT,
    MOBILE_NAVIGATION_GAP,
    MOBILE_NAVIGATION_SAFE_AREA,
    getMobileNavigationFillerCount,
    getMobileNavigationLayout,
    getMobileNavigationRowPadding,
    getMobileNavigationSecondaryRows,
} from './utils'
import { Grip } from 'lucide-react'

const ICON_SIZE = Number.parseInt(String(FOUNDATION_THEME.unit[20]), 10)
const PRIMARY_ROW_MIN_HEIGHT = `calc(${FOUNDATION_THEME.unit[48]} + ${FOUNDATION_THEME.unit[16]} * 2)`
const FALLBACK_COLLAPSED_HEIGHT = Number.parseFloat(
    MOBILE_NAVIGATION_COLLAPSED_HEIGHT
)
const FALLBACK_SAFE_AREA = Number.parseFloat(MOBILE_NAVIGATION_SAFE_AREA)

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
>(({ items, onHeightChange }, ref) => {
    const [viewportHeight, setViewportHeight] = useState<number | undefined>(
        () => (typeof window === 'undefined' ? undefined : window.innerHeight)
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
            () => getMobileNavigationLayout(items, viewportHeight),
            [items, viewportHeight]
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
        (item: MobileNavigationItem) => {
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
        const fallbackHeight =
            parseCssValue(snapPoints[0]) ?? FALLBACK_COLLAPSED_HEIGHT
        const currentHeight = parseCssValue(activeSnapPoint)
        const safeAreaOffset =
            parseCssValue(MOBILE_NAVIGATION_SAFE_AREA) ?? FALLBACK_SAFE_AREA

        const computedHeight =
            currentHeight == null ? fallbackHeight : currentHeight

        return `${computedHeight + safeAreaOffset}px`
    }, [activeSnapPoint, snapPoints])

    useEffect(() => {
        onHeightChange?.(navigationHeight)
    }, [navigationHeight, onHeightChange])

    useEffect(() => () => onHeightChange?.('0px'), [onHeightChange])

    const renderItem = useCallback(
        (item: MobileNavigationItem, index?: number) => {
            const isActive = Boolean(item.isSelected)
            const iconColor = isActive
                ? String(FOUNDATION_THEME.colors.gray[800])
                : String(FOUNDATION_THEME.colors.gray[400])
            const itemKey =
                index !== undefined ? `${item.label}-${index}` : item.label

            return (
                <PrimitiveButton
                    key={itemKey}
                    type="button"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={FOUNDATION_THEME.unit[4]}
                    width={MOBILE_NAVIGATION_BUTTON_DIMENSIONS.width}
                    height={MOBILE_NAVIGATION_BUTTON_DIMENSIONS.height}
                    borderRadius={FOUNDATION_THEME.border.radius[24]}
                    backgroundColor="transparent"
                    color={
                        isActive
                            ? String(FOUNDATION_THEME.colors.gray[800])
                            : String(FOUNDATION_THEME.colors.gray[400])
                    }
                    fontWeight={FOUNDATION_THEME.font.weight[500]}
                    flexShrink={0}
                    aria-pressed={isActive}
                    aria-label={item.label}
                    onClick={() => handleItemSelect(item)}
                >
                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        gap={FOUNDATION_THEME.unit[4]}
                    >
                        <Block
                            as="span"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width={FOUNDATION_THEME.unit[20]}
                            height={FOUNDATION_THEME.unit[20]}
                            borderRadius={FOUNDATION_THEME.border.radius[12]}
                            transition="color 0.2s ease"
                            color={iconColor}
                            aria-hidden="true"
                        >
                            {item.leftSlot &&
                            React.isValidElement(item.leftSlot)
                                ? React.cloneElement(
                                      item.leftSlot as React.ReactElement<
                                          React.SVGProps<SVGSVGElement>
                                      >,
                                      {
                                          color: iconColor,
                                          width: ICON_SIZE,
                                          height: ICON_SIZE,
                                      }
                                  )
                                : item.label.charAt(0)}
                        </Block>

                        <PrimitiveText
                            as="span"
                            fontSize={
                                FOUNDATION_THEME.font.size.body.sm.fontSize
                            }
                            fontWeight={FOUNDATION_THEME.font.weight[400]}
                            textAlign="center"
                            truncate
                            color={
                                isActive
                                    ? String(FOUNDATION_THEME.colors.gray[800])
                                    : String(FOUNDATION_THEME.colors.gray[400])
                            }
                            style={{
                                width: '100%',
                                maxWidth: String(
                                    MOBILE_NAVIGATION_BUTTON_DIMENSIONS.width
                                ),
                            }}
                        >
                            {item.label}
                        </PrimitiveText>
                    </Block>
                </PrimitiveButton>
            )
        },
        [handleItemSelect]
    )
    const secondaryRows = useMemo(
        () => getMobileNavigationSecondaryRows(secondaryItems),
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
                        maxWidth: '640px',
                        margin: '0 auto',
                        borderTop: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                        borderTopLeftRadius: FOUNDATION_THEME.border.radius[24],
                        borderTopRightRadius:
                            FOUNDATION_THEME.border.radius[24],
                        overflow: 'hidden',
                    }}
                    mobileOffset={{
                        top: '0px',
                        left: '0px',
                        right: '0px',
                        bottom: String(FOUNDATION_THEME.unit[8]),
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
                            backgroundColor={String(
                                FOUNDATION_THEME.colors.gray[0]
                            )}
                        >
                            <Block
                                role="tablist"
                                aria-label="Primary navigation"
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                gap={MOBILE_NAVIGATION_GAP}
                                width="100%"
                                minHeight={PRIMARY_ROW_MIN_HEIGHT}
                                {...getMobileNavigationRowPadding({
                                    isSecondary: false,
                                    isLastRow: false,
                                })}
                            >
                                {primaryItems.map((item, index) =>
                                    renderItem(item, index)
                                )}

                                {hasSecondaryItems && (
                                    <PrimitiveButton
                                        type="button"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        gap={FOUNDATION_THEME.unit[4]}
                                        width={
                                            MOBILE_NAVIGATION_BUTTON_DIMENSIONS.width
                                        }
                                        height={
                                            MOBILE_NAVIGATION_BUTTON_DIMENSIONS.height
                                        }
                                        borderRadius={
                                            FOUNDATION_THEME.border.radius[24]
                                        }
                                        backgroundColor="transparent"
                                        color={String(
                                            FOUNDATION_THEME.colors.gray[500]
                                        )}
                                        fontWeight={
                                            FOUNDATION_THEME.font.weight[500]
                                        }
                                        flexShrink={0}
                                        aria-label="More options"
                                        onClick={handleMoreToggle}
                                    >
                                        <Block
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            justifyContent="center"
                                            gap={FOUNDATION_THEME.unit[4]}
                                        >
                                            <Block
                                                as="span"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                width={
                                                    FOUNDATION_THEME.unit[20]
                                                }
                                                height={
                                                    FOUNDATION_THEME.unit[20]
                                                }
                                                borderRadius={
                                                    FOUNDATION_THEME.border
                                                        .radius[12]
                                                }
                                                color={String(
                                                    FOUNDATION_THEME.colors
                                                        .gray[500]
                                                )}
                                                aria-hidden="true"
                                            >
                                                <Grip size={ICON_SIZE} />
                                            </Block>
                                            <PrimitiveText
                                                as="span"
                                                fontSize={
                                                    FOUNDATION_THEME.font.size
                                                        .body.xs.fontSize
                                                }
                                                fontWeight={
                                                    FOUNDATION_THEME.font
                                                        .weight[500]
                                                }
                                                textAlign="center"
                                                truncate
                                                color={String(
                                                    FOUNDATION_THEME.colors
                                                        .gray[500]
                                                )}
                                            >
                                                More
                                            </PrimitiveText>
                                        </Block>
                                    </PrimitiveButton>
                                )}
                            </Block>

                            {isExpanded &&
                                secondaryRows.map((row, rowIndex) => {
                                    const fillerCount =
                                        getMobileNavigationFillerCount(
                                            row.length
                                        )
                                    const isLastRow =
                                        rowIndex === secondaryRows.length - 1

                                    return (
                                        <Block
                                            key={`secondary-row-${rowIndex}`}
                                            aria-label="More navigation options"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            gap={MOBILE_NAVIGATION_GAP}
                                            width="100%"
                                            marginTop={
                                                FOUNDATION_THEME.unit[12]
                                            }
                                            {...getMobileNavigationRowPadding({
                                                isSecondary: true,
                                                isLastRow,
                                            })}
                                        >
                                            {row.map((item, index) =>
                                                renderItem(
                                                    item,
                                                    index +
                                                        rowIndex * row.length
                                                )
                                            )}
                                            {Array.from({
                                                length: fillerCount,
                                            }).map((_, emptyIndex) => (
                                                <Block
                                                    key={`empty-${rowIndex}-${emptyIndex}`}
                                                    width={
                                                        MOBILE_NAVIGATION_BUTTON_DIMENSIONS.width
                                                    }
                                                    height={
                                                        MOBILE_NAVIGATION_BUTTON_DIMENSIONS.height
                                                    }
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </Block>
                                    )
                                })}
                        </Block>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
})

SidebarMobileNavigation.displayName = 'SidebarMobileNavigation'

export default SidebarMobileNavigation
