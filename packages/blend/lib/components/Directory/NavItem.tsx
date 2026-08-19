import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
    useRef,
    useLayoutEffect,
} from 'react'
import type { DirectoryExpandedItems, NavItemProps, NavbarItem } from './types'
import { ChevronDown } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import styled from 'styled-components'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { DirectoryTokenType } from './directory.tokens'
import {
    getItemPathSegment,
    getItemVisualState,
    handleKeyDown,
    normalizeExpandedItems,
    resolveItemColors,
} from './utils'
import type { DirectoryItemVisualState } from './directory.tokens.types'
import { TooltipV2 } from '../TooltipV2/TooltipV2'
import { TooltipV2Side } from '../TooltipV2/tooltipV2.types'
import { TruncatedTextWithTooltipV2 } from '../common/TruncatedTextWithTooltipV2'
import { useSectionScroll } from '../../hooks/useSectionScroll'
import { addPxToValue } from '../../global-utils/GlobalUtils'
import { MenuV2 } from '../MenuV2'
import {
    MenuV2Alignment,
    MenuV2Side,
    type MenuV2ItemType,
} from '../MenuV2/menuV2.types'

const StyledElement = styled(Block)<{
    $isLink?: boolean
    $visualState: DirectoryItemVisualState
    $tokens: DirectoryTokenType
    $iconOnlyMode?: boolean
    $hasHierarchyLineInset?: boolean
}>`
    background-color: ${({ $visualState, $tokens }) =>
        resolveItemColors($tokens, $visualState).backgroundColor};
    border: none;
    width: ${({ $hasHierarchyLineInset, $tokens }) =>
        $hasHierarchyLineInset
            ? `calc(100% - ${$tokens.section.itemList.nested.connector.itemInset})`
            : '100%'};
    margin-left: ${({ $hasHierarchyLineInset, $tokens }) =>
        $hasHierarchyLineInset
            ? $tokens.section.itemList.nested.connector.itemInset
            : 0};
    min-width: 0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: ${({ $iconOnlyMode }) =>
        $iconOnlyMode ? 'center' : 'flex-start'};
    gap: ${({ $tokens, $iconOnlyMode }) =>
        $iconOnlyMode ? '0' : $tokens.section.itemList.item.gap};
    padding: ${({ $tokens, $iconOnlyMode, $hasHierarchyLineInset }) =>
        $iconOnlyMode
            ? `${$tokens.section.itemList.item.iconOnlyPadding.paddingTop} ${$tokens.section.itemList.item.iconOnlyPadding.paddingRight} ${$tokens.section.itemList.item.iconOnlyPadding.paddingBottom} ${$tokens.section.itemList.item.iconOnlyPadding.paddingLeft}`
            : `${$tokens.section.itemList.item.padding.y} ${$tokens.section.itemList.item.padding.x} ${$tokens.section.itemList.item.padding.y} ${
                  $hasHierarchyLineInset
                      ? $tokens.section.itemList.nested.connector
                            .itemPaddingLeft
                      : $tokens.section.itemList.item.padding.x
              }`};
    color: ${({ $visualState, $tokens }) =>
        resolveItemColors($tokens, $visualState).color};
    font-weight: ${({ $tokens }) => $tokens.section.itemList.item.fontWeight};
    font-size: ${({ $tokens }) =>
        addPxToValue($tokens.section.itemList.item.fontSize)};
    border-radius: ${({ $tokens }) =>
        $tokens.section.itemList.item.borderRadius};
    transition: ${({ $tokens }) => $tokens.section.itemList.item.transition};
    text-align: left;
    user-select: none;
    cursor: pointer;
    overflow: hidden;

    /* muted rows lift to the hover tier here, so a de-emphasised row regains
       full contrast the moment it is hovered or keyboard-focused */
    &:hover,
    &:focus-visible {
        background-color: ${({ $visualState, $tokens }) =>
            $visualState === 'active'
                ? $tokens.section.itemList.item.backgroundColor.active
                : $tokens.section.itemList.item.backgroundColor.hover};
        color: ${({ $visualState, $tokens }) =>
            $visualState === 'active'
                ? $tokens.section.itemList.item.color.active
                : $tokens.section.itemList.item.color.hover};
        outline: none;
        ring: 0;
    }
`

const IconWrapper = styled.div<{ $tokens: DirectoryTokenType }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: ${({ $tokens }) => $tokens.section.itemList.item.icon.width};
    height: ${({ $tokens }) => $tokens.section.itemList.item.icon.width};
    /* Smooth icon transitions during sidebar expand/collapse */
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
    transform: translateZ(0);

    & > svg {
        width: ${({ $tokens }) =>
            $tokens.section.itemList.item.icon.width} !important;
        height: ${({ $tokens }) =>
            $tokens.section.itemList.item.icon.width} !important;
        /* Prevent icon flickering during transitions */
        backface-visibility: hidden;
        transform: translateZ(0);
    }
`

const ChevronWrapper = styled(Block)<{
    $isExpanded: boolean
    $tokens: DirectoryTokenType
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

const NestedList = styled(Block)<{
    $tokens: DirectoryTokenType
    $showHierarchyLines?: boolean
}>`
    width: 100%;
    padding-left: ${({ $tokens }) =>
        $tokens.section.itemList.nested.paddingLeft};
    margin-top: ${({ $tokens, $showHierarchyLines }) =>
        $showHierarchyLines ? '0' : $tokens.section.itemList.nested.marginTop};
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${({ $tokens, $showHierarchyLines }) =>
        $showHierarchyLines ? 0 : $tokens.section.itemList.gap};
`

const NavListItem = styled.li<{
    $showHierarchyLines?: boolean
    $isLast?: boolean
    $tokens: DirectoryTokenType
    $hierarchyLineBorderRadius: React.CSSProperties['borderRadius']
}>`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    position: relative;

    ${({ $showHierarchyLines, $isLast, $tokens, $hierarchyLineBorderRadius }) =>
        $showHierarchyLines &&
        `
            --directory-connector-elbow-top: ${$tokens.section.itemList.nested.connector.elbowTop};

            padding-bottom: ${$isLast ? '0' : $tokens.section.itemList.gap};

            &::before,
            &::after {
                content: '';
                position: absolute;
                pointer-events: none;
                border-color: ${$tokens.section.itemList.nested.border.color};
            }

            &::before {
                left: calc(-1 * ${$tokens.section.itemList.nested.paddingLeft} + ${$tokens.section.itemList.nested.border.leftOffset});
                top: calc(-1 * ${$tokens.section.itemList.gap});
                bottom: ${$isLast ? 'calc(100% - var(--directory-connector-elbow-top))' : `calc(-1 * ${$tokens.section.itemList.gap})`};
                border-left: ${$tokens.section.itemList.nested.border.width} solid ${$tokens.section.itemList.nested.border.color};
            }

            &::after {
                left: calc(-1 * ${$tokens.section.itemList.nested.paddingLeft} + ${$tokens.section.itemList.nested.border.leftOffset});
                top: var(--directory-connector-elbow-top);
                width: calc(${$tokens.section.itemList.nested.paddingLeft} - ${$tokens.section.itemList.nested.border.leftOffset} + ${$tokens.section.itemList.nested.connector.elbowWidthOffset});
                height: ${$tokens.section.itemList.nested.connector.elbowHeight};
                border-left: ${$tokens.section.itemList.nested.border.width} solid ${$tokens.section.itemList.nested.border.color};
                border-bottom: ${$tokens.section.itemList.nested.border.width} solid ${$tokens.section.itemList.nested.border.color};
                border-bottom-left-radius: ${addPxToValue($hierarchyLineBorderRadius)};
            }
        `}
`

const NavItemContentFrame = styled.div<{
    $showHierarchyLines?: boolean
}>`
    position: relative;
    z-index: ${({ $showHierarchyLines }) => ($showHierarchyLines ? 1 : 'auto')};
`

const NestedListFrame = styled.div`
    position: relative;
`

type ActiveItemContextValue = {
    activeItem: string | null
    setActiveItem: (item: string | null) => void
    isControlled: boolean
}

// Create context without default value to force usage within provider
const ActiveItemContext = createContext<ActiveItemContextValue | null>(null)

// Hook to safely use the context with error handling
const useActiveItemContext = () => {
    const context = useContext(ActiveItemContext)
    if (!context) {
        throw new Error(
            'useActiveItemContext must be used within ActiveItemProvider'
        )
    }
    return context
}

// Improved Provider Props
type ActiveItemProviderProps = {
    children: React.ReactNode
    /**
     * Controlled mode: Parent controls the active item
     * If provided, internal state is ignored
     */
    activeItem?: string | null
    /**
     * Callback when active item changes (for controlled mode)
     */
    onActiveItemChange?: (item: string | null) => void
    /**
     * Initial active item (for uncontrolled mode)
     */
    defaultActiveItem?: string | null
}

export const ActiveItemProvider: React.FC<ActiveItemProviderProps> = ({
    children,
    activeItem: controlledActiveItem,
    onActiveItemChange,
    defaultActiveItem = null,
}) => {
    const [internalActiveItem, setInternalActiveItem] = useState<string | null>(
        defaultActiveItem
    )

    const isControlled = controlledActiveItem !== undefined

    const activeItem = isControlled ? controlledActiveItem! : internalActiveItem

    const setActiveItem = useCallback(
        (item: string | null) => {
            if (!isControlled) {
                setInternalActiveItem(item)
            }
            // fired in both modes, matching the virtualized renderer
            onActiveItemChange?.(item)
        },
        [isControlled, onActiveItemChange]
    )

    const contextValue = useMemo<ActiveItemContextValue>(
        () => ({
            activeItem,
            setActiveItem,
            isControlled,
        }),
        [activeItem, setActiveItem, isControlled]
    )

    return (
        <ActiveItemContext.Provider value={contextValue}>
            {children}
        </ActiveItemContext.Provider>
    )
}

type ExpandedItemsContextValue = {
    isItemExpanded: (itemPath: string) => boolean
    setItemExpanded: (item: NavbarItem, itemPath: string, next: boolean) => void
}

const ExpandedItemsContext = createContext<ExpandedItemsContextValue | null>(
    null
)

const useExpandedItemsContext = () => {
    const context = useContext(ExpandedItemsContext)
    if (!context) {
        throw new Error(
            'useExpandedItemsContext must be used within ExpandedItemsProvider'
        )
    }
    return context
}

type ExpandedItemsProviderProps = {
    children: React.ReactNode
    /**
     * Controlled mode: parent owns the expanded item paths.
     * If provided, internal state is ignored.
     */
    expandedItems?: DirectoryExpandedItems
    defaultExpandedItems?: DirectoryExpandedItems
    onExpandedItemsChange?: (items: string[]) => void
    onItemExpand?: (item: NavbarItem, itemPath: string) => void | Promise<void>
}

export const ExpandedItemsProvider: React.FC<ExpandedItemsProviderProps> = ({
    children,
    expandedItems,
    defaultExpandedItems,
    onExpandedItemsChange,
    onItemExpand,
}) => {
    const isControlled = expandedItems !== undefined
    const [internalExpandedItems, setInternalExpandedItems] = useState<
        Set<string>
    >(() => normalizeExpandedItems(defaultExpandedItems))
    const currentExpandedItems = useMemo(
        () =>
            isControlled
                ? normalizeExpandedItems(expandedItems)
                : internalExpandedItems,
        [expandedItems, internalExpandedItems, isControlled]
    )

    const setItemExpanded = useCallback(
        (item: NavbarItem, itemPath: string, next: boolean) => {
            const nextExpandedItems = new Set(currentExpandedItems)
            if (next) {
                nextExpandedItems.add(itemPath)
                void onItemExpand?.(item, itemPath)
            } else {
                nextExpandedItems.delete(itemPath)
            }

            if (!isControlled) {
                setInternalExpandedItems(nextExpandedItems)
            }
            onExpandedItemsChange?.(Array.from(nextExpandedItems))
        },
        [
            currentExpandedItems,
            isControlled,
            onExpandedItemsChange,
            onItemExpand,
        ]
    )

    const isItemExpanded = useCallback(
        (itemPath: string) => currentExpandedItems.has(itemPath),
        [currentExpandedItems]
    )

    const contextValue = useMemo<ExpandedItemsContextValue>(
        () => ({ isItemExpanded, setItemExpanded }),
        [isItemExpanded, setItemExpanded]
    )

    return (
        <ExpandedItemsContext.Provider value={contextValue}>
            {children}
        </ExpandedItemsContext.Provider>
    )
}

const NavItem = ({
    item,
    index,
    onNavigate,
    itemPath = getItemPathSegment(item),
    iconOnlyMode = false,
    showHierarchyLines = false,
    hierarchyLineBorderRadius = 0,
    isLast = false,
    isNested = false,
    enableParentSelection = false,
    highlightActivePath = false,
}: NavItemProps) => {
    const tokens = useResponsiveTokens<DirectoryTokenType>('DIRECTORY')
    const { isItemExpanded, setItemExpanded } = useExpandedItemsContext()
    const isExpanded = isItemExpanded(itemPath)
    const setIsExpanded = (value: boolean) =>
        setItemExpanded(item, itemPath, value)
    const { activeItem, setActiveItem } = useActiveItemContext()
    const hasChildren = item.items && item.items.length > 0
    const isIconOnlyMenuTrigger = iconOnlyMode && hasChildren
    const isSelectable = enableParentSelection || !hasChildren
    // bare-label matching is a backward-compat fallback for id-less items
    // only, so a label-valued activeItem can't co-select id'd duplicates
    const isActive =
        item.isSelected !== undefined
            ? item.isSelected && isSelectable
            : isSelectable &&
              (activeItem === itemPath ||
                  (!item.id && activeItem === item.label))

    const visualState = getItemVisualState({
        isActive,
        itemPath,
        activeItem,
        highlightActivePath,
    })
    const itemColors = resolveItemColors(tokens, visualState)

    const itemRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null)
    const nestedListRef = useRef<HTMLUListElement>(null)

    const refCallback = React.useCallback(
        (node: HTMLButtonElement | HTMLAnchorElement | null) => {
            itemRef.current = node
        },
        []
    )

    const { scrollIntoView } = useSectionScroll()
    const previousIsExpanded = useRef(isExpanded)

    // Auto-scroll expanded nested menu items into view
    useLayoutEffect(() => {
        const wasCollapsed = !previousIsExpanded.current
        const isExpanding = isExpanded && wasCollapsed
        previousIsExpanded.current = isExpanded

        if (isExpanding && nestedListRef.current && !iconOnlyMode) {
            scrollIntoView(nestedListRef.current)
        }
    }, [isExpanded, iconOnlyMode, scrollIntoView])

    const activateItem = () => {
        if (isIconOnlyMenuTrigger) {
            return
        }

        if (hasChildren && !iconOnlyMode) {
            if (enableParentSelection) {
                setActiveItem(itemPath)
                if (!isExpanded) setIsExpanded(true)
            } else {
                setIsExpanded(!isExpanded)
            }
            item.onClick?.()
        } else {
            setActiveItem(itemPath)
            item.onClick?.()
        }
    }

    // Chevron toggles disclosure only; stop the row click from also selecting.
    const toggleExpanded = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        event.preventDefault()
        setIsExpanded(!isExpanded)
    }

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return
        }

        if (item.href) {
            event.preventDefault()
        }

        activateItem()
    }

    const Element = item.href && !isIconOnlyMenuTrigger ? 'a' : 'button'
    const elementProps =
        item.href && !isIconOnlyMenuTrigger ? { href: item.href } : {}

    const iconOnlyMenuItems = useMemo((): MenuV2ItemType[] => {
        const toMenuItems = (
            items: NavbarItem[],
            parentPath: string
        ): MenuV2ItemType[] =>
            items.map((nestedItem) => {
                const nestedItemPath = `${parentPath}/${getItemPathSegment(nestedItem)}`
                const nestedHasChildren = !!nestedItem.items?.length
                const nestedIsSelectable =
                    enableParentSelection || !nestedHasChildren
                const nestedIsSelected =
                    nestedItem.isSelected !== undefined
                        ? nestedItem.isSelected && nestedIsSelectable
                        : nestedIsSelectable &&
                          (activeItem === nestedItemPath ||
                              (!nestedItem.id &&
                                  activeItem === nestedItem.label))

                return {
                    id: nestedItemPath,
                    label: {
                        text: nestedItem.label,
                        leftSlot: React.isValidElement(nestedItem.leftSlot)
                            ? nestedItem.leftSlot
                            : undefined,
                    },
                    selected: nestedIsSelected,
                    onClick: () => {
                        if (nestedIsSelectable) {
                            setActiveItem(nestedItemPath)
                        }
                        nestedItem.onClick?.()
                    },
                    subMenu: nestedHasChildren
                        ? toMenuItems(nestedItem.items!, nestedItemPath)
                        : undefined,
                }
            })

        return hasChildren ? toMenuItems(item.items!, itemPath) : []
    }, [
        activeItem,
        enableParentSelection,
        hasChildren,
        item.items,
        itemPath,
        setActiveItem,
    ])

    const renderContent = () => {
        if (iconOnlyMode) {
            if (!item.leftSlot) {
                return (
                    <Block
                        width={tokens.section.itemList.item.icon.width}
                        height={tokens.section.itemList.item.icon.width}
                        backgroundColor={itemColors.backgroundColor}
                        borderRadius={tokens.section.itemList.item.borderRadius}
                        style={{
                            opacity: 0.3,
                        }}
                    />
                )
            }
            if (React.isValidElement(item.leftSlot)) {
                return (
                    <IconWrapper $tokens={tokens}>
                        {React.cloneElement(
                            item.leftSlot as React.ReactElement<
                                React.SVGProps<SVGSVGElement> & {
                                    size?: number
                                }
                            >,
                            { color: itemColors.color }
                        )}
                    </IconWrapper>
                )
            }
            return null
        }

        return (
            <>
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    gap={tokens.section.itemList.item.gap}
                    minWidth={0}
                    overflow="hidden"
                >
                    {item.leftSlot && React.isValidElement(item.leftSlot) && (
                        <IconWrapper aria-hidden="true" $tokens={tokens}>
                            {React.cloneElement(
                                item.leftSlot as React.ReactElement<
                                    React.SVGProps<SVGSVGElement> & {
                                        size?: number
                                    }
                                >,
                                { color: itemColors.color }
                            )}
                        </IconWrapper>
                    )}
                    <Block
                        flexGrow={1}
                        minWidth={0}
                        overflow="hidden"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <TruncatedTextWithTooltipV2
                            text={item.label}
                            side={TooltipV2Side.RIGHT}
                        />
                    </Block>
                    {item.rightSlot && React.isValidElement(item.rightSlot) && (
                        <Block aria-hidden="true">{item.rightSlot}</Block>
                    )}
                </Block>
                {hasChildren && !iconOnlyMode && (
                    <ChevronWrapper
                        $isExpanded={isExpanded}
                        $tokens={tokens}
                        onClick={toggleExpanded}
                        aria-hidden="true"
                        style={{ cursor: 'pointer' }}
                    >
                        <ChevronDown
                            color={tokens.section.itemList.item.chevron.color}
                        />
                    </ChevronWrapper>
                )}
            </>
        )
    }

    const itemElement = (
        <StyledElement
            as={Element}
            $isLink={!!item.href}
            $visualState={visualState}
            $tokens={tokens}
            $iconOnlyMode={iconOnlyMode}
            $hasHierarchyLineInset={showHierarchyLines && isNested}
            {...elementProps}
            ref={refCallback}
            onClick={handleClick}
            onKeyDown={
                isIconOnlyMenuTrigger
                    ? undefined
                    : (e: React.KeyboardEvent) =>
                          handleKeyDown(e, {
                              hasChildren,
                              isExpanded,
                              setIsExpanded,
                              handleClick: activateItem,
                              index,
                              onNavigate,
                          })
            }
            aria-expanded={
                hasChildren && !iconOnlyMode
                    ? isExpanded
                        ? true
                        : false
                    : undefined
            }
            aria-label={item.label}
            tabIndex={0}
            data-sidebar-expanded={
                hasChildren && !iconOnlyMode ? isExpanded : undefined
            }
            data-element="sidebar-sub-section"
            data-id={getItemPathSegment(item)}
            data-status={isActive ? 'selected' : 'not selected'}
            data-path-state={visualState}
        >
            {renderContent()}
        </StyledElement>
    )

    return (
        <NavListItem
            $showHierarchyLines={showHierarchyLines && isNested}
            $isLast={isLast}
            $tokens={tokens}
            $hierarchyLineBorderRadius={hierarchyLineBorderRadius}
            data-directory-hierarchy-item={
                showHierarchyLines && isNested ? 'true' : undefined
            }
        >
            <NavItemContentFrame $showHierarchyLines={showHierarchyLines}>
                {isIconOnlyMenuTrigger ? (
                    <MenuV2
                        trigger={itemElement}
                        items={[{ items: iconOnlyMenuItems }]}
                        alignment={MenuV2Alignment.START}
                        side={MenuV2Side.RIGHT}
                        sideOffset={8}
                        dimensions={{ minWidth: 200 }}
                        triggerProps={{
                            'aria-haspopup': 'menu',
                            'aria-label': `${item.label} menu`,
                        }}
                    />
                ) : iconOnlyMode && item.leftSlot ? (
                    <TooltipV2 content={item.label} side={TooltipV2Side.RIGHT}>
                        {itemElement}
                    </TooltipV2>
                ) : (
                    itemElement
                )}
            </NavItemContentFrame>

            {hasChildren && isExpanded && !iconOnlyMode && (
                <NestedListFrame>
                    <NestedList
                        ref={nestedListRef}
                        as="ul"
                        $tokens={tokens}
                        $showHierarchyLines={showHierarchyLines}
                        role="list"
                        aria-label={`${item.label} submenu`}
                        data-directory-hierarchy-line={
                            showHierarchyLines ? 'true' : undefined
                        }
                    >
                        {item.items &&
                            item.items.map((childItem, childIdx) => (
                                <NavItem
                                    key={childIdx}
                                    item={childItem}
                                    index={childIdx}
                                    itemPath={`${itemPath}/${getItemPathSegment(childItem)}`}
                                    iconOnlyMode={iconOnlyMode}
                                    showHierarchyLines={showHierarchyLines}
                                    hierarchyLineBorderRadius={
                                        hierarchyLineBorderRadius
                                    }
                                    isLast={
                                        childIdx ===
                                        (item.items?.length || 0) - 1
                                    }
                                    isNested
                                    enableParentSelection={
                                        enableParentSelection
                                    }
                                    highlightActivePath={highlightActivePath}
                                    onNavigate={(direction, currentIndex) => {
                                        if (
                                            direction === 'up' &&
                                            currentIndex === 0
                                        ) {
                                            itemRef.current?.focus()
                                        } else if (
                                            direction === 'down' &&
                                            currentIndex ===
                                                (item.items?.length || 0) - 1
                                        ) {
                                            onNavigate('down', index)
                                        } else {
                                            const nextIndex =
                                                direction === 'up'
                                                    ? Math.max(
                                                          0,
                                                          currentIndex - 1
                                                      )
                                                    : Math.min(
                                                          (item.items?.length ||
                                                              0) - 1,
                                                          currentIndex + 1
                                                      )
                                            const nestedItems =
                                                itemRef.current?.parentElement
                                                    ?.querySelector('ul')
                                                    ?.querySelectorAll(
                                                        'button, a'
                                                    )
                                            if (
                                                nestedItems &&
                                                nestedItems[nextIndex]
                                            ) {
                                                ;(
                                                    nestedItems[
                                                        nextIndex
                                                    ] as HTMLElement
                                                ).focus()
                                            }
                                        }
                                    }}
                                />
                            ))}
                    </NestedList>
                </NestedListFrame>
            )}
        </NavListItem>
    )
}

export default NavItem
