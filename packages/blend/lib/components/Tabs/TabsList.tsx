import * as React from 'react'
import {
    forwardRef,
    useMemo,
    useRef,
    useEffect,
    useCallback,
    useId,
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
        const prevItemsLengthRef = useRef(items.length)
        const tabsListRef = useRef<HTMLDivElement>(null)
        const tabRefsMap = useRef<Map<string, HTMLButtonElement>>(new Map())

        // Animate underline when active tab changes (UNDERLINE variant only)
        useEffect(() => {
            if (
                variant !== TabsVariant.UNDERLINE ||
                !tabsListRef.current ||
                !activeTab
            ) {
                return
            }

            const listElement = tabsListRef.current
            const activeTabElement = tabRefsMap.current.get(activeTab)

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
        }, [activeTab, variant])

        // Update indicator position on window resize (UNDERLINE variant only)
        useEffect(() => {
            if (
                variant !== TabsVariant.UNDERLINE ||
                !tabsListRef.current ||
                !activeTab
            ) {
                return
            }

            const updatePosition = () => {
                const listElement = tabsListRef.current
                const activeTabElement = tabRefsMap.current.get(activeTab)

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
            }

            window.addEventListener('resize', updatePosition)
            return () => window.removeEventListener('resize', updatePosition)
        }, [activeTab, variant])

        // Auto-scroll to end when new tabs are added
        useEffect(() => {
            if (items.length > prevItemsLengthRef.current) {
                scrollContainerRef.current?.scrollTo({
                    left: scrollContainerRef.current.scrollWidth,
                    behavior: 'smooth',
                })
            }
            prevItemsLengthRef.current = items.length
        }, [items.length])

        const processedItems = useMemo(() => {
            return processTabsWithConcatenation(items)
        }, [items])

        const dropdownItems = useMemo(() => {
            return prepareDropdownItems(processedItems)
        }, [processedItems])

        const displayTabs = useMemo(() => {
            return getDisplayTabs(processedItems)
        }, [processedItems])

        const hasAnySkeleton = useMemo(() => {
            return processedItems.some((item) => item.showSkeleton === true)
        }, [processedItems])

        const handleTabClose = useCallback(
            (processedTabValue: string) => {
                if (processedTabValue.includes('_')) {
                    const originalValues = processedTabValue.split('_')
                    originalValues.forEach((val) => onTabClose?.(val))
                } else {
                    onTabClose?.(processedTabValue)
                }
            },
            [onTabClose]
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
                                ref={(node) => {
                                    tabsListRef.current = node
                                    if (typeof ref === 'function') {
                                        ref(node)
                                    } else if (ref) {
                                        ref.current = node
                                    }
                                }}
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
                                    const tabValue = item.value.includes('_')
                                        ? item.value.split('_')[0]
                                        : item.value

                                    return (
                                        <TabsTrigger
                                            key={item.value}
                                            ref={(node) => {
                                                if (node) {
                                                    tabRefsMap.current.set(
                                                        tabValue,
                                                        node
                                                    )
                                                } else {
                                                    tabRefsMap.current.delete(
                                                        tabValue
                                                    )
                                                }
                                            }}
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
                                                item.value === activeTab
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
                                // <Tooltip content={dropdownTooltip}>
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
                                // {</Tooltip> */}
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

                // Merge disable prop: if either parent or child has disable, it should be disabled
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
                    ref: (node: HTMLButtonElement) => {
                        if (node && childValue) {
                            tabRefsMap.current.set(childValue, node)
                        } else if (childValue) {
                            tabRefsMap.current.delete(childValue)
                        }
                    },
                }

                return React.cloneElement(child, childProps)
            })
        }

        const hasAnyChildSkeleton = useMemo(() => {
            if (showSkeleton) return true

            return React.Children.toArray(children).some((child) => {
                if (!React.isValidElement(child)) return false
                const props = child.props as Record<string, unknown>
                return props.showSkeleton === true
            })
        }, [children, showSkeleton])

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
                        ref={(node) => {
                            tabsListRef.current = node
                            if (typeof ref === 'function') {
                                ref(node)
                            } else if (ref) {
                                ref.current = node
                            }
                        }}
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
