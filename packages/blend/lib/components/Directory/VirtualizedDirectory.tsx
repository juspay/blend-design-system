import React, { useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useVirtualizer } from '@tanstack/react-virtual'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { TruncatedTextWithTooltipV2 } from '../common/TruncatedTextWithTooltipV2'
import { TooltipV2Side } from '../TooltipV2/tooltipV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { addPxToValue } from '../../global-utils/GlobalUtils'
import { DirectoryTokenType } from './directory.tokens'
import {
    flattenDirectoryData,
    handleKeyDown,
    normalizeExpandedItems,
    normalizeDirectoryData,
} from './utils'
import type { DirectoryFlatRow, DirectoryProps, NavbarItem } from './types'

const DEFAULT_ROW_HEIGHT = 36
const DEFAULT_SECTION_HEIGHT = 28
const DEFAULT_VIEWPORT_HEIGHT = 340
const DEFAULT_OVERSCAN = 8
const DEFAULT_THRESHOLD = 100

const SectionRow = styled.div<{
    $tokens: DirectoryTokenType
    $isCollapsible: boolean
    $isOpen: boolean
}>`
    width: 100%;
    display: flex;
    align-items: center;
    cursor: ${({ $isCollapsible }) => ($isCollapsible ? 'pointer' : 'default')};
    padding: ${({ $tokens }) =>
        `${$tokens.section.header.padding.y} ${$tokens.section.header.padding.x}`};

    & > svg {
        width: ${({ $tokens }) =>
            $tokens.section.header.chevron.width} !important;
        height: ${({ $tokens }) =>
            $tokens.section.header.chevron.width} !important;
        margin-left: auto;
        transition: transform 150ms;
        transform: ${({ $isOpen }) =>
            $isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    }
`

const ItemRow = styled.div<{
    $tokens: DirectoryTokenType
    $isActive: boolean
    $depth: number
}>`
    width: 100%;
    position: relative;
    padding-left: ${({ $tokens, $depth }) =>
        `calc(${$tokens.section.itemList.nested.paddingLeft} * ${$depth})`};
`

const ConnectorLayer = styled.span`
    position: absolute;
    inset: 0;
    pointer-events: none;
`

const ConnectorVerticalLine = styled.span<{
    $tokens: DirectoryTokenType
    $column: number
    $isCurrent?: boolean
    $isLast?: boolean
}>`
    position: absolute;
    left: ${({ $tokens, $column }) =>
        `calc(${$tokens.section.itemList.nested.paddingLeft} * ${$column} + ${$tokens.section.itemList.nested.border.leftOffset})`};
    top: 0;
    height: ${({ $tokens, $isCurrent, $isLast }) =>
        $isCurrent && $isLast
            ? `calc(${$tokens.section.itemList.nested.connector.elbowTop} + ${$tokens.section.itemList.nested.connector.elbowHeight})`
            : '100%'};
    border-left: ${({ $tokens }) =>
        `${$tokens.section.itemList.nested.border.width} solid ${$tokens.section.itemList.nested.border.color}`};
`

const ConnectorElbow = styled.span<{
    $tokens: DirectoryTokenType
    $column: number
    $hierarchyLineBorderRadius: React.CSSProperties['borderRadius']
}>`
    position: absolute;
    left: ${({ $tokens, $column }) =>
        `calc(${$tokens.section.itemList.nested.paddingLeft} * ${$column} + ${$tokens.section.itemList.nested.border.leftOffset})`};
    top: ${({ $tokens }) => $tokens.section.itemList.nested.connector.elbowTop};
    width: ${({ $tokens }) =>
        `calc(${$tokens.section.itemList.nested.paddingLeft} - ${$tokens.section.itemList.nested.border.leftOffset} + ${$tokens.section.itemList.nested.connector.elbowWidthOffset})`};
    height: ${({ $tokens }) =>
        $tokens.section.itemList.nested.connector.elbowHeight};
    border-left: ${({ $tokens }) =>
        `${$tokens.section.itemList.nested.border.width} solid ${$tokens.section.itemList.nested.border.color}`};
    border-bottom: ${({ $tokens }) =>
        `${$tokens.section.itemList.nested.border.width} solid ${$tokens.section.itemList.nested.border.color}`};
    border-bottom-left-radius: ${({ $hierarchyLineBorderRadius }) =>
        addPxToValue($hierarchyLineBorderRadius)};
`

const ItemButton = styled(Block)<{
    $tokens: DirectoryTokenType
    $isActive: boolean
    $showHierarchyLines: boolean
}>`
    width: ${({ $tokens, $showHierarchyLines }) =>
        $showHierarchyLines
            ? `calc(100% - ${$tokens.section.itemList.nested.connector.itemInset})`
            : '100%'};
    margin-left: ${({ $tokens, $showHierarchyLines }) =>
        $showHierarchyLines
            ? $tokens.section.itemList.nested.connector.itemInset
            : 0};
    min-width: 0;
    border: none;
    border-radius: ${({ $tokens }) =>
        $tokens.section.itemList.item.borderRadius};
    background-color: ${({ $tokens, $isActive }) =>
        $isActive
            ? $tokens.section.itemList.item.backgroundColor.active
            : $tokens.section.itemList.item.backgroundColor.default};
    color: ${({ $tokens, $isActive }) =>
        $isActive
            ? $tokens.section.itemList.item.color.active
            : $tokens.section.itemList.item.color.default};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${({ $tokens }) => $tokens.section.itemList.item.gap};
    padding: ${({ $tokens, $showHierarchyLines }) =>
        `${$tokens.section.itemList.item.padding.y} ${$tokens.section.itemList.item.padding.x} ${$tokens.section.itemList.item.padding.y} ${
            $showHierarchyLines
                ? $tokens.section.itemList.nested.connector.itemPaddingLeft
                : $tokens.section.itemList.item.padding.x
        }`};
    font-size: ${({ $tokens }) =>
        addPxToValue($tokens.section.itemList.item.fontSize)};
    font-weight: ${({ $tokens }) => $tokens.section.itemList.item.fontWeight};
    overflow: hidden;
    text-decoration: none;
    transition: ${({ $tokens }) => $tokens.section.itemList.item.transition};

    &:hover,
    &:focus-visible {
        background-color: ${({ $tokens, $isActive }) =>
            $isActive
                ? $tokens.section.itemList.item.backgroundColor.active
                : $tokens.section.itemList.item.backgroundColor.hover};
        color: ${({ $tokens, $isActive }) =>
            $isActive
                ? $tokens.section.itemList.item.color.active
                : $tokens.section.itemList.item.color.hover};
        outline: none;
    }
`

const IconWrapper = styled.span<{ $tokens: DirectoryTokenType }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: ${({ $tokens }) => $tokens.section.itemList.item.icon.width};
    height: ${({ $tokens }) => $tokens.section.itemList.item.icon.width};

    & > svg {
        width: ${({ $tokens }) =>
            $tokens.section.itemList.item.icon.width} !important;
        height: ${({ $tokens }) =>
            $tokens.section.itemList.item.icon.width} !important;
    }
`

const ChevronWrapper = styled.span<{
    $tokens: DirectoryTokenType
    $isExpanded: boolean
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;

    & > svg {
        width: ${({ $tokens }) =>
            $tokens.section.itemList.item.chevron.width} !important;
        height: ${({ $tokens }) =>
            $tokens.section.itemList.item.chevron.width} !important;
        transition: transform 150ms;
        transform: ${({ $isExpanded }) =>
            $isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
    }
`

const getDefaultOpenSections = (
    directoryData: DirectoryProps['directoryData']
) =>
    normalizeDirectoryData(directoryData).reduce<Set<number>>(
        (openSections, section, index) => {
            if (section.defaultOpen !== false) {
                openSections.add(index)
            }
            return openSections
        },
        new Set<number>()
    )

const getFocusableRowIndex = (
    rows: DirectoryFlatRow[],
    currentIndex: number,
    direction: 'up' | 'down'
) => {
    const step = direction === 'up' ? -1 : 1
    let nextIndex = currentIndex + step

    while (nextIndex >= 0 && nextIndex < rows.length) {
        const row = rows[nextIndex]
        if (
            row?.type === 'item' ||
            (row?.type === 'section' && row.section.isCollapsible !== false)
        ) {
            return nextIndex
        }
        nextIndex += step
    }

    return currentIndex
}

const VirtualizedDirectory = ({
    directoryData: directoryDataProp,
    activeItem: controlledActiveItem,
    onActiveItemChange,
    defaultActiveItem,
    showHierarchyLines = false,
    hierarchyLineBorderRadius = 0,
    expandedItems,
    defaultExpandedItems,
    onExpandedItemsChange,
    onItemExpand,
    virtualization,
}: DirectoryProps) => {
    const tokens = useResponsiveTokens<DirectoryTokenType>('DIRECTORY')
    const directoryData = normalizeDirectoryData(directoryDataProp)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const isActiveControlled = controlledActiveItem !== undefined
    const [internalActiveItem, setInternalActiveItem] = useState<string | null>(
        defaultActiveItem ?? null
    )
    const activeItem = isActiveControlled
        ? controlledActiveItem!
        : internalActiveItem
    const isExpandedControlled = expandedItems !== undefined
    const [internalExpandedItems, setInternalExpandedItems] = useState<
        Set<string>
    >(() => normalizeExpandedItems(defaultExpandedItems))
    const currentExpandedItems = useMemo(
        () =>
            isExpandedControlled
                ? normalizeExpandedItems(expandedItems)
                : internalExpandedItems,
        [expandedItems, internalExpandedItems, isExpandedControlled]
    )
    const [openSections, setOpenSections] = useState<Set<number>>(() =>
        getDefaultOpenSections(directoryData)
    )

    const rows = useMemo(
        () =>
            flattenDirectoryData(
                directoryData,
                currentExpandedItems,
                openSections
            ),
        [currentExpandedItems, directoryData, openSections]
    )
    const rowHeight = virtualization?.rowHeight ?? DEFAULT_ROW_HEIGHT
    const sectionHeight =
        virtualization?.sectionHeight ?? DEFAULT_SECTION_HEIGHT
    const viewportHeight =
        virtualization?.viewportHeight ?? DEFAULT_VIEWPORT_HEIGHT
    const overscan = virtualization?.overscan ?? DEFAULT_OVERSCAN
    const threshold = virtualization?.threshold ?? DEFAULT_THRESHOLD
    const useVirtualRows = rows.length >= threshold
    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () =>
            virtualization?.viewportRef?.current ?? scrollRef.current,
        getItemKey: (index) => {
            const row = rows[index]
            if (!row) return index
            return row.type === 'section'
                ? `section-${row.sectionIndex}`
                : row.itemPath
        },
        estimateSize: (index) =>
            rows[index]?.type === 'section' ? sectionHeight : rowHeight,
        overscan,
        enabled: useVirtualRows,
        initialRect: {
            width: 0,
            height: viewportHeight,
        },
    })
    const virtualRows = virtualizer.getVirtualItems()
    const fallbackRows =
        useVirtualRows && virtualRows.length === 0
            ? rows
                  .slice(0, Math.ceil(viewportHeight / rowHeight) + overscan)
                  .map((row, index) => ({
                      key:
                          row.type === 'section'
                              ? `section-${row.sectionIndex}`
                              : row.itemPath,
                      index,
                      start: index * rowHeight,
                  }))
            : virtualRows

    const setExpanded = (item: NavbarItem, itemPath: string, next: boolean) => {
        const nextExpandedItems = new Set(currentExpandedItems)
        if (next) {
            nextExpandedItems.add(itemPath)
            void onItemExpand?.(item, itemPath)
        } else {
            nextExpandedItems.delete(itemPath)
        }

        const nextExpandedItemsList = Array.from(nextExpandedItems)
        if (!isExpandedControlled) {
            setInternalExpandedItems(nextExpandedItems)
        }
        onExpandedItemsChange?.(nextExpandedItemsList)
    }

    const setActiveItem = (itemPath: string) => {
        if (!isActiveControlled) {
            setInternalActiveItem(itemPath)
        }
        onActiveItemChange?.(itemPath)
    }

    const focusRow = (rowIndex: number) => {
        virtualizer.scrollToIndex(rowIndex, { align: 'auto' })

        const focusRowElement = () => {
            const focusableRow = scrollRef.current?.querySelector<HTMLElement>(
                `[data-directory-row-index="${rowIndex}"]`
            )
            focusableRow?.focus()
        }

        focusRowElement()
        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(focusRowElement)
        } else {
            window.setTimeout(focusRowElement, 0)
        }
    }

    const navigateRows = (currentIndex: number, direction: 'up' | 'down') => {
        const nextIndex = getFocusableRowIndex(rows, currentIndex, direction)
        if (nextIndex !== currentIndex) {
            focusRow(nextIndex)
        }
    }

    const renderSection = (
        row: Extract<DirectoryFlatRow, { type: 'section' }>,
        rowIndex: number
    ) => {
        const isOpen = openSections.has(row.sectionIndex)
        const isCollapsible = row.section.isCollapsible !== false

        const toggleSection = () => {
            if (!isCollapsible) return
            setOpenSections((prev) => {
                const next = new Set(prev)
                if (next.has(row.sectionIndex)) {
                    next.delete(row.sectionIndex)
                } else {
                    next.add(row.sectionIndex)
                }
                return next
            })
        }

        return (
            <SectionRow
                $tokens={tokens}
                $isOpen={isOpen}
                $isCollapsible={isCollapsible}
                role={isCollapsible ? 'button' : undefined}
                tabIndex={isCollapsible ? 0 : undefined}
                aria-expanded={isCollapsible ? isOpen : undefined}
                aria-label={
                    isCollapsible && row.section.label
                        ? `${row.section.label}, ${isOpen ? 'expanded' : 'collapsed'}`
                        : undefined
                }
                onClick={toggleSection}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        toggleSection()
                    } else if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        navigateRows(rowIndex, 'down')
                    } else if (event.key === 'ArrowUp') {
                        event.preventDefault()
                        navigateRows(rowIndex, 'up')
                    }
                }}
                data-directory-row-index={rowIndex}
            >
                <Text
                    variant="body.sm"
                    color={tokens.section.header.label.color}
                    fontWeight={tokens.section.header.label.fontWeight}
                    fontSize={tokens.section.header.label.fontSize}
                    style={{ whiteSpace: 'nowrap' }}
                >
                    {row.section.label?.toUpperCase()}
                </Text>
                {isCollapsible && (
                    <ChevronDown color={tokens.section.header.chevron.color} />
                )}
            </SectionRow>
        )
    }

    const renderItem = (
        row: Extract<DirectoryFlatRow, { type: 'item' }>,
        rowIndex: number
    ) => {
        const hasChildren = !!row.item.items?.length
        const isExpanded = currentExpandedItems.has(row.itemPath)
        const isActive =
            row.item.isSelected !== undefined
                ? row.item.isSelected && !hasChildren
                : !hasChildren &&
                  (activeItem === row.itemPath || activeItem === row.item.label)

        const Element = row.item.href ? 'a' : 'button'
        const elementProps = row.item.href
            ? { href: row.item.href }
            : { type: 'button' }
        const showItemHierarchyLines = showHierarchyLines && row.depth > 0
        const ancestorLineColumns = row.ancestorIsLast
            .slice(1)
            .reduce<number[]>((columns, isLast, index) => {
                if (!isLast) {
                    columns.push(index)
                }
                return columns
            }, [])
        const currentLineColumn = row.depth - 1
        const activateItem = () => {
            if (hasChildren) {
                setExpanded(row.item, row.itemPath, !isExpanded)
            } else {
                setActiveItem(row.itemPath)
                row.item.onClick?.()
            }
        }

        return (
            <ItemRow
                $tokens={tokens}
                $isActive={isActive}
                $depth={row.depth}
                data-directory-hierarchy-item={
                    showItemHierarchyLines ? 'true' : undefined
                }
            >
                {showItemHierarchyLines && (
                    <ConnectorLayer aria-hidden="true">
                        {ancestorLineColumns.map((column) => (
                            <ConnectorVerticalLine
                                key={`ancestor-${column}`}
                                $tokens={tokens}
                                $column={column}
                            />
                        ))}
                        <ConnectorVerticalLine
                            $tokens={tokens}
                            $column={currentLineColumn}
                            $isCurrent
                            $isLast={row.isLast}
                        />
                        <ConnectorElbow
                            $tokens={tokens}
                            $column={currentLineColumn}
                            $hierarchyLineBorderRadius={
                                hierarchyLineBorderRadius
                            }
                        />
                    </ConnectorLayer>
                )}
                <ItemButton
                    as={Element}
                    {...elementProps}
                    $tokens={tokens}
                    $isActive={isActive}
                    $showHierarchyLines={showItemHierarchyLines}
                    aria-expanded={hasChildren ? isExpanded : undefined}
                    aria-label={row.item.label}
                    data-element="sidebar-sub-section"
                    data-id={row.item.label}
                    data-status={isActive ? 'selected' : 'not selected'}
                    data-directory-row-index={rowIndex}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                        if (
                            event.button !== 0 ||
                            event.metaKey ||
                            event.ctrlKey ||
                            event.shiftKey ||
                            event.altKey
                        ) {
                            return
                        }

                        if (row.item.href) event.preventDefault()
                        activateItem()
                    }}
                    onKeyDown={(event: React.KeyboardEvent<HTMLElement>) =>
                        handleKeyDown(event, {
                            hasChildren,
                            isExpanded,
                            setIsExpanded: (value) =>
                                setExpanded(row.item, row.itemPath, value),
                            handleClick: activateItem,
                            index: rowIndex,
                            onNavigate: (direction, currentIndex) =>
                                navigateRows(currentIndex, direction),
                        })
                    }
                >
                    {row.item.leftSlot &&
                        React.isValidElement(row.item.leftSlot) && (
                            <IconWrapper aria-hidden="true" $tokens={tokens}>
                                {React.cloneElement(
                                    row.item.leftSlot as React.ReactElement<
                                        React.SVGProps<SVGSVGElement> & {
                                            size?: number
                                        }
                                    >,
                                    {
                                        color: isActive
                                            ? tokens.section.itemList.item.color
                                                  .active
                                            : tokens.section.itemList.item.color
                                                  .default,
                                    }
                                )}
                            </IconWrapper>
                        )}
                    <Block flexGrow={1} minWidth={0} overflow="hidden">
                        <TruncatedTextWithTooltipV2
                            text={row.item.label}
                            side={TooltipV2Side.RIGHT}
                        />
                    </Block>
                    {row.item.rightSlot &&
                        React.isValidElement(row.item.rightSlot) && (
                            <Block aria-hidden="true">
                                {row.item.rightSlot}
                            </Block>
                        )}
                    {hasChildren && (
                        <ChevronWrapper
                            $tokens={tokens}
                            $isExpanded={isExpanded}
                        >
                            <ChevronDown
                                color={
                                    tokens.section.itemList.item.chevron.color
                                }
                            />
                        </ChevronWrapper>
                    )}
                </ItemButton>
            </ItemRow>
        )
    }

    const renderRow = (row: DirectoryFlatRow, rowIndex: number) =>
        row.type === 'section'
            ? renderSection(row, rowIndex)
            : renderItem(row, rowIndex)

    const content = useVirtualRows ? (
        <Block
            role="list"
            width="100%"
            style={{
                height: `${virtualizer.getTotalSize()}px`,
                position: 'relative',
                flexShrink: 0,
            }}
        >
            {fallbackRows.map((virtualRow) => {
                const row = rows[virtualRow.index]
                if (!row) return null
                return (
                    <Block
                        key={virtualRow.key}
                        ref={virtualizer.measureElement}
                        role="listitem"
                        aria-setsize={rows.length}
                        aria-posinset={virtualRow.index + 1}
                        data-index={virtualRow.index}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${virtualRow.start}px)`,
                        }}
                    >
                        {renderRow(row, virtualRow.index)}
                    </Block>
                )
            })}
        </Block>
    ) : (
        <Block role="list" width="100%">
            {rows.map((row, index) => (
                <Block
                    key={
                        row.type === 'section'
                            ? `section-${row.sectionIndex}`
                            : row.itemPath
                    }
                    role="listitem"
                >
                    {renderRow(row, index)}
                </Block>
            ))}
        </Block>
    )

    return (
        <Block
            as="nav"
            ref={scrollRef}
            width="100%"
            height="100%"
            flexGrow={1}
            overflow={virtualization?.viewportRef ? 'visible' : 'auto'}
            aria-label="Directory navigation"
            paddingX={tokens.paddingX}
            paddingY={tokens.paddingY}
        >
            {content}
        </Block>
    )
}

export default VirtualizedDirectory
