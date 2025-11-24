import * as React from 'react'
import {
    forwardRef,
    useMemo,
    useRef,
    useCallback,
    useId,
    useEffect,
} from 'react'
import { type TabsListProps, TabsSize, TabsVariant } from './types'
import { StyledTabsList } from './StyledTabs'
import type { TabsTokensType } from './tabs.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import TabsTrigger from './TabsTrigger'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { ChevronDown, Plus } from 'lucide-react'
import { Tooltip } from '../Tooltip/Tooltip'
import SingleSelect from '../SingleSelect/SingleSelect'
import { SelectMenuVariant } from '../Select'
import {
    processTabsWithConcatenation,
    prepareDropdownItems,
    getDisplayTabs,
    getActualTabValue,
    isConcatenatedTab,
    extractOriginalValues,
    calculateTabIndicatorPosition,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'
import Block from '../Primitives/Block/Block'

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
    (
        {
            className,
            variant = TabsVariant.UNDERLINE,
            size = TabsSize.MD,
            expanded = false,
            fitContent = false,
            items = [],
            onTabClose,
            onTabAdd,
            showDropdown = false,
            showAddButton = false,
            addButtonTooltip = 'Add new tab',
            onTabChange,
            activeTab = '',
            disable = false,
            showSkeleton = false,
            skeletonVariant = 'pulse',
            children,
        },
        ref
    ) => {
        const tabsToken = useResponsiveTokens<TabsTokensType>('TABS')
        const tabsGroupId = useId()

        const scrollContainerRef = useRef<HTMLDivElement>(null)
        const tabsListRef = useRef<HTMLDivElement>(null)
        const tabRefsMap = useRef<Map<string, HTMLButtonElement>>(new Map())

        const isScrollingRef = useRef(false)
        const hasMountedRef = useRef(false)
        const prevItemsLengthRef = useRef(items.length)

        const processedItems = useMemo(
            () => processTabsWithConcatenation(items),
            [items]
        )

        const dropdownItems = useMemo(
            () => prepareDropdownItems(processedItems, items),
            [processedItems, items]
        )

        const displayTabs = useMemo(
            () => getDisplayTabs(processedItems),
            [processedItems]
        )

        const originalTabValues = useMemo(
            () => new Set(items.map((item) => item.value)),
            [items]
        )

        const hasAnySkeleton = useMemo(
            () => processedItems.some((item) => item.showSkeleton === true),
            [processedItems]
        )

        const hasAnyChildSkeleton = useMemo(() => {
            if (showSkeleton) return true

            return React.Children.toArray(children).some((child) => {
                if (!React.isValidElement(child)) return false
                const props = child.props as Record<string, unknown>
                return props.showSkeleton === true
            })
        }, [children, showSkeleton])

        const updateIndicator = useCallback(() => {
            if (variant !== TabsVariant.UNDERLINE || hasAnySkeleton) {
                return
            }

            const listElement = tabsListRef.current
            const activeTabElement = tabRefsMap.current?.get(activeTab)

            if (!activeTabElement || !listElement) {
                return
            }

            const { tabLeft, tabWidth } = calculateTabIndicatorPosition(
                activeTabElement,
                listElement
            )

            listElement.style.setProperty(
                '--tabs-indicator-left',
                `${tabLeft}px`
            )
            listElement.style.setProperty(
                '--tabs-indicator-width',
                `${tabWidth}`
            )
        }, [activeTab, variant, tabRefsMap, hasAnySkeleton])

        useEffect(() => {
            if (
                !activeTab ||
                variant !== TabsVariant.UNDERLINE ||
                hasAnySkeleton
            ) {
                return
            }

            const listElement = tabsListRef.current
            const activeTabElement = tabRefsMap.current?.get(activeTab)

            if (!activeTabElement || !listElement) {
                return
            }

            const needsDelay =
                !hasMountedRef.current ||
                items.length !== prevItemsLengthRef.current
            const delay = needsDelay ? 100 : 0

            const timeout = setTimeout(() => {
                updateIndicator()
                hasMountedRef.current = true
                prevItemsLengthRef.current = items.length
            }, delay)

            window.addEventListener('resize', updateIndicator)

            return () => {
                clearTimeout(timeout)
                window.removeEventListener('resize', updateIndicator)
            }
        }, [activeTab, variant, hasAnySkeleton, items.length, updateIndicator])

        useEffect(() => {
            if (!activeTab || isScrollingRef.current) {
                return
            }

            const scrollContainer = scrollContainerRef.current
            const activeTabElement = tabRefsMap.current?.get(activeTab)

            if (!activeTabElement) {
                return
            }

            if (!scrollContainer) {
                updateIndicator()
                return
            }

            const containerRect = scrollContainer.getBoundingClientRect()
            const tabRect = activeTabElement.getBoundingClientRect()

            const isTabVisible =
                tabRect.left >= containerRect.left &&
                tabRect.right <= containerRect.right

            if (!isTabVisible) {
                isScrollingRef.current = true

                const containerWidth = scrollContainer.offsetWidth
                const tabOffsetLeft = activeTabElement.offsetLeft
                const tabWidth = activeTabElement.offsetWidth

                scrollContainer.scrollTo({
                    left: Math.max(
                        0,
                        tabOffsetLeft - containerWidth / 2 + tabWidth / 2
                    ),
                    behavior: 'smooth',
                })

                const scrollTimer = setTimeout(() => {
                    isScrollingRef.current = false
                    updateIndicator()
                }, 500)

                return () => clearTimeout(scrollTimer)
            } else {
                updateIndicator()
            }
        }, [activeTab, updateIndicator])

        // Effect: Scroll to end when new tabs are added
        useEffect(() => {
            const currentLength = items.length
            const previousLength = prevItemsLengthRef.current

            if (currentLength <= previousLength) {
                prevItemsLengthRef.current = currentLength
                return
            }

            const scrollContainer = scrollContainerRef.current
            if (!scrollContainer) {
                prevItemsLengthRef.current = currentLength
                return
            }

            isScrollingRef.current = true

            scrollContainer.scrollTo({
                left: scrollContainer.scrollWidth,
                behavior: 'smooth',
            })

            const scrollTimeout = setTimeout(() => {
                isScrollingRef.current = false
                updateIndicator()
            }, 350)

            prevItemsLengthRef.current = currentLength

            return () => clearTimeout(scrollTimeout)
        }, [items.length, updateIndicator])

        const handleTabClose = useCallback(
            (processedTabValue: string) => {
                if (isConcatenatedTab(processedTabValue, originalTabValues)) {
                    const originalValues =
                        extractOriginalValues(processedTabValue)
                    originalValues.forEach((val) => onTabClose?.(val))
                }

                onTabClose?.(processedTabValue)
            },
            [onTabClose, originalTabValues]
        )

        const handleDropdownSelect = useCallback(
            (value: string) => {
                onTabChange?.(value)
            },
            [onTabChange]
        )

        const handleAddClick = useCallback(() => {
            onTabAdd?.()
        }, [onTabAdd])

        const registerTabRef = useCallback(
            (node: HTMLButtonElement | null, value: string) => {
                if (node && value) {
                    tabRefsMap.current.set(value, node)
                } else if (value) {
                    tabRefsMap.current.delete(value)
                }
            },
            []
        )

        const setRefs = useCallback(
            (node: HTMLDivElement | null) => {
                tabsListRef.current = node
                if (typeof ref === 'function') {
                    ref(node)
                } else if (ref) {
                    ref.current = node
                }
            },
            [ref]
        )

        if (items.length > 0) {
            return (
                <Block
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        overflow: 'hidden',
                        position: 'relative',
                        borderBottom:
                            variant === TabsVariant.UNDERLINE && !hasAnySkeleton
                                ? tabsToken.borderBottom[variant]
                                : 'none',
                        paddingTop:
                            variant === TabsVariant.UNDERLINE
                                ? FOUNDATION_THEME.unit[8]
                                : '0',
                    }}
                >
                    <Block
                        ref={scrollContainerRef}
                        style={{
                            flex: 1,
                            overflowX: 'auto',
                            overflowY: 'visible',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                        className="hide-scrollbar"
                    >
                        <Block
                            style={{
                                position: 'relative',
                                width: 'fit-content',
                            }}
                        >
                            <StyledTabsList
                                ref={setRefs}
                                className={className}
                                $variant={variant}
                                $size={size}
                                $expanded={expanded}
                                $fitContent={fitContent}
                                $tabsToken={tabsToken}
                                $hideIndicator={hasAnySkeleton}
                                style={{
                                    display: 'flex',
                                    minWidth: 'max-content',
                                    marginBottom: 0,
                                }}
                            >
                                {displayTabs.map((item) => {
                                    const tabValue = getActualTabValue(
                                        item.value,
                                        originalTabValues
                                    )

                                    return (
                                        <TabsTrigger
                                            key={item.value}
                                            ref={(node) =>
                                                registerTabRef(node, tabValue)
                                            }
                                            value={tabValue}
                                            variant={variant}
                                            size={size}
                                            isActive={tabValue === activeTab}
                                            tabsGroupId={tabsGroupId}
                                            closable={
                                                item.closable && !item.isDefault
                                            }
                                            onClose={() =>
                                                handleTabClose(item.value)
                                            }
                                            disabled={item.disable}
                                            showSkeleton={item.showSkeleton}
                                            skeletonVariant={
                                                item.skeletonVariant
                                            }
                                            style={{
                                                flexShrink: 0,
                                                whiteSpace: 'nowrap',
                                            }}
                                            data-tabs={item.label}
                                            data-tab-selected={
                                                tabValue === activeTab
                                            }
                                            data-tabs-disabled={
                                                item.disable ? 'true' : 'false'
                                            }
                                        >
                                            {item.label}
                                        </TabsTrigger>
                                    )
                                })}
                            </StyledTabsList>
                        </Block>
                    </Block>

                    {(showDropdown || showAddButton) && (
                        <Block
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: FOUNDATION_THEME.unit[4],
                                flexShrink: 0,
                                height: FOUNDATION_THEME.unit[20],
                            }}
                        >
                            {showDropdown && (
                                <SingleSelect
                                    items={dropdownItems}
                                    selected={activeTab}
                                    onSelect={handleDropdownSelect}
                                    placeholder="Navigate"
                                    customTrigger={
                                        <PrimitiveButton
                                            height={FOUNDATION_THEME.unit[20]}
                                            width={FOUNDATION_THEME.unit[20]}
                                            backgroundColor="transparent"
                                            contentCentered
                                            _hover={{
                                                backgroundColor:
                                                    FOUNDATION_THEME.colors
                                                        .gray[100],
                                            }}
                                            borderRadius={
                                                FOUNDATION_THEME.unit[4]
                                            }
                                        >
                                            <ChevronDown size={16} />
                                        </PrimitiveButton>
                                    }
                                    useDrawerOnMobile={false}
                                    variant={SelectMenuVariant.NO_CONTAINER}
                                />
                            )}

                            {showAddButton && (
                                <Tooltip content={addButtonTooltip}>
                                    <PrimitiveButton
                                        onClick={handleAddClick}
                                        height={FOUNDATION_THEME.unit[20]}
                                        width={FOUNDATION_THEME.unit[20]}
                                        backgroundColor="transparent"
                                        contentCentered
                                        _hover={{
                                            backgroundColor:
                                                FOUNDATION_THEME.colors
                                                    .gray[100],
                                        }}
                                        borderRadius={FOUNDATION_THEME.unit[4]}
                                    >
                                        <Plus size={16} />
                                    </PrimitiveButton>
                                </Tooltip>
                            )}
                        </Block>
                    )}
                </Block>
            )
        }

        const renderChildren = () => {
            return React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child

                const existingProps = child.props as Record<string, unknown>
                const childDisable =
                    'disable' in existingProps
                        ? (existingProps.disable as boolean | undefined)
                        : undefined
                const childValue =
                    'value' in existingProps
                        ? (existingProps.value as string)
                        : ''

                const isTabsTrigger =
                    child.type &&
                    (child.type as { displayName?: string }).displayName ===
                        'TabsTrigger'

                const childProps = {
                    ...existingProps,
                    disable: childDisable || disable,
                    variant,
                    size,
                    isActive: childValue === activeTab,
                    tabsGroupId,
                    ...(isTabsTrigger && {
                        showSkeleton:
                            'showSkeleton' in existingProps
                                ? existingProps.showSkeleton
                                : showSkeleton,
                        skeletonVariant:
                            'skeletonVariant' in existingProps
                                ? existingProps.skeletonVariant
                                : skeletonVariant,
                    }),
                    ref: (node: HTMLButtonElement) =>
                        registerTabRef(node, childValue),
                }

                return React.cloneElement(child, childProps)
            })
        }

        return (
            <Block
                style={{
                    borderBottom:
                        variant === TabsVariant.UNDERLINE &&
                        !hasAnyChildSkeleton
                            ? tabsToken.borderBottom[variant]
                            : 'none',
                }}
            >
                <Block
                    style={{
                        position: 'relative',
                        width: 'fit-content',
                    }}
                >
                    <StyledTabsList
                        ref={setRefs}
                        className={className}
                        $variant={variant}
                        $size={size}
                        $expanded={expanded}
                        $fitContent={fitContent}
                        $tabsToken={tabsToken}
                        $hideIndicator={hasAnyChildSkeleton}
                    >
                        {renderChildren()}
                    </StyledTabsList>
                </Block>
            </Block>
        )
    }
)

TabsList.displayName = 'TabsList'

export default TabsList
