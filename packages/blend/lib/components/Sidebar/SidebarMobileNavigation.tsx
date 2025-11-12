import React, { useState, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Drawer, {
    DrawerBody,
    DrawerContent,
    DrawerPortal,
    DrawerTitle,
} from '../Drawer/Drawer'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import type { DirectoryData } from '../Directory/types'
import { FOUNDATION_THEME } from '../../tokens'
import type { MobileNavigationItem } from './utils'

const PRIMARY_ROW_COUNT = 5

const ITEM_WIDTH = 56
const ITEM_HEIGHT = 48
const ROW_PADDING_Y = 16
const CONTAINER_BORDER = 1

const calculateSnapPoints = (secondaryRows: number): Array<string | number> => {
    const primaryRowHeight = 16 + ITEM_HEIGHT + 16
    const primaryHeight = primaryRowHeight + CONTAINER_BORDER

    if (secondaryRows === 0) {
        return [`${primaryHeight}px`]
    }
    const secondaryRowHeight = 12 + ITEM_HEIGHT + 12
    const rowGap = 12

    const lastRowExtraPadding = 16

    let secondaryHeight = 0
    if (secondaryRows > 0) {
        secondaryHeight += (secondaryRows - 1) * (secondaryRowHeight + rowGap)
        secondaryHeight += secondaryRowHeight + lastRowExtraPadding + rowGap
    }

    const totalExpandedHeight = primaryHeight + secondaryHeight

    if (typeof window === 'undefined') {
        return [`${primaryHeight}px`, `${totalExpandedHeight}px`]
    }

    const viewportLimit = window.innerHeight * 0.85
    const maxHeight = Math.min(totalExpandedHeight, viewportLimit)

    return [`${primaryHeight}px`, `${maxHeight}px`]
}

const MobileNavContainer = styled(Block)`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${String(FOUNDATION_THEME.colors.gray[0])};
`

const MobileNavRow = styled.ul<{
    $isSecondary?: boolean
    $isLastRow?: boolean
}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${FOUNDATION_THEME.unit[8]};
    padding: ${({ $isSecondary, $isLastRow }) => {
        if ($isSecondary && $isLastRow) {
            return '12px 24px 28px 24px'
        }
        return $isSecondary ? '12px 24px' : '16px 24px'
    }};
    margin: 0;
    list-style: none;
    width: 100%;
    min-height: ${ITEM_HEIGHT + ROW_PADDING_Y * 2}px;

    ${({ $isSecondary }) => ($isSecondary ? 'margin-top: 12px;' : '')}
`

const MobileNavButton = styled.button<{ $isActive: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${FOUNDATION_THEME.unit[4]};
    width: ${ITEM_WIDTH}px;
    height: ${ITEM_HEIGHT}px;
    border: none;
    border-radius: ${FOUNDATION_THEME.border.radius[24]};
    background: transparent;
    color: ${String(FOUNDATION_THEME.colors.gray[400])};
    font-weight: 500;
    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        transform 0.1s ease;
    cursor: pointer;
    flex-shrink: 0;

    &:focus-visible {
        outline: 2px solid ${FOUNDATION_THEME.colors.primary[500]};
        outline-offset: 2px;
    }

    &:active {
        transform: scale(0.95);
    }
`

const IconWrapper = styled.span<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${FOUNDATION_THEME.unit[20]};
    height: ${FOUNDATION_THEME.unit[20]};
    border-radius: ${FOUNDATION_THEME.border.radius[12]};
    background: transparent;
    color: ${({ $isActive }) =>
        $isActive
            ? String(FOUNDATION_THEME.colors.gray[800])
            : String(FOUNDATION_THEME.colors.gray[400])};
    transition: color 0.2s ease;
    flex-shrink: 0;
`

type SidebarMobileNavigationProps = {
    data: DirectoryData[]
    items: MobileNavigationItem[]
}

const SidebarMobileNavigation: React.FC<SidebarMobileNavigationProps> = ({
    items,
}) => {
    const { primaryItems, secondaryItems, hasSecondaryItems, snapPoints } =
        useMemo(() => {
            const actualPrimaryCount =
                items.length > PRIMARY_ROW_COUNT
                    ? PRIMARY_ROW_COUNT - 1
                    : items.length

            const primary = items.slice(0, actualPrimaryCount)
            const secondary = items.slice(actualPrimaryCount)
            const hasSecondary = secondary.length > 0

            const secondaryRowCount = hasSecondary
                ? Math.ceil(secondary.length / PRIMARY_ROW_COUNT)
                : 0
            const points = calculateSnapPoints(secondaryRowCount)

            return {
                primaryItems: primary,
                secondaryItems: secondary,
                hasSecondaryItems: hasSecondary,
                snapPoints: points,
            }
        }, [items])

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
            if (item.onClick) {
                item.onClick()
            }
            // Keep drawer at collapsed state after selection
            setActiveSnapPoint(snapPoints[0])
        },
        [snapPoints]
    )

    const handleMoreToggle = useCallback(() => {
        if (isExpanded) {
            setActiveSnapPoint(snapPoints[0])
        } else {
            setActiveSnapPoint(snapPoints[1] || snapPoints[0])
        }
    }, [isExpanded, snapPoints])

    const renderItem = (item: MobileNavigationItem) => {
        const isActive = Boolean(item.isSelected)

        return (
            <MobileNavButton
                type="button"
                onClick={() => handleItemSelect(item)}
                $isActive={isActive}
                aria-pressed={isActive}
                aria-label={item.label}
            >
                {item.leftSlot && React.isValidElement(item.leftSlot) ? (
                    <IconWrapper $isActive={isActive} aria-hidden="true">
                        {React.cloneElement(
                            item.leftSlot as React.ReactElement<
                                React.SVGProps<SVGSVGElement>
                            >,
                            {
                                color: isActive
                                    ? String(FOUNDATION_THEME.colors.gray[800])
                                    : String(FOUNDATION_THEME.colors.gray[400]),
                                width: 20,
                                height: 20,
                            }
                        )}
                    </IconWrapper>
                ) : (
                    <IconWrapper $isActive={isActive} aria-hidden="true">
                        {item.label.charAt(0)}
                    </IconWrapper>
                )}
                <PrimitiveText
                    as="span"
                    fontSize={FOUNDATION_THEME.font.size.body.sm.fontSize}
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
                        maxWidth: `${ITEM_WIDTH}px`,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'block',
                    }}
                >
                    {item.label}
                </PrimitiveText>
            </MobileNavButton>
        )
    }

    // Create rows from secondary items
    const secondaryRows = useMemo(() => {
        if (!hasSecondaryItems) return []

        const rows = []
        for (let i = 0; i < secondaryItems.length; i += PRIMARY_ROW_COUNT) {
            rows.push(secondaryItems.slice(i, i + PRIMARY_ROW_COUNT))
        }
        return rows
    }, [secondaryItems, hasSecondaryItems])

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
                        <MobileNavContainer>
                            <MobileNavRow
                                role="tablist"
                                aria-label="Primary navigation"
                            >
                                {primaryItems.map((item, index) => (
                                    <li key={`${item.label}-${index}`}>
                                        {renderItem(item)}
                                    </li>
                                ))}

                                {hasSecondaryItems && (
                                    <li>
                                        <MobileNavButton
                                            type="button"
                                            onClick={handleMoreToggle}
                                            $isActive={false}
                                            aria-label="More options"
                                        >
                                            <IconWrapper
                                                $isActive={false}
                                                aria-hidden="true"
                                            >
                                                ⋯
                                            </IconWrapper>
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
                                        </MobileNavButton>
                                    </li>
                                )}
                            </MobileNavRow>

                            {isExpanded &&
                                secondaryRows.map((row, rowIndex) => {
                                    const fillerCount = Math.max(
                                        0,
                                        PRIMARY_ROW_COUNT - row.length
                                    )
                                    const isLastRow =
                                        rowIndex === secondaryRows.length - 1

                                    return (
                                        <MobileNavRow
                                            key={`secondary-row-${rowIndex}`}
                                            aria-label="More navigation options"
                                            $isSecondary={true}
                                            $isLastRow={isLastRow}
                                        >
                                            {row.map((item, index) => (
                                                <li
                                                    key={`${item.label}-secondary-${rowIndex}-${index}`}
                                                >
                                                    {renderItem(item)}
                                                </li>
                                            ))}
                                            {Array.from({
                                                length: fillerCount,
                                            }).map((_, emptyIndex) => (
                                                <li
                                                    key={`empty-${rowIndex}-${emptyIndex}`}
                                                    style={{
                                                        width: `${ITEM_WIDTH}px`,
                                                        height: `${ITEM_HEIGHT}px`,
                                                    }}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </MobileNavRow>
                                    )
                                })}
                        </MobileNavContainer>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

SidebarMobileNavigation.displayName = 'SidebarMobileNavigation'

export default SidebarMobileNavigation
