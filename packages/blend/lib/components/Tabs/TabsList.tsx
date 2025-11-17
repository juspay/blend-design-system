import * as React from 'react'
import { forwardRef, useMemo, useRef, useEffect, useCallback } from 'react'
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
    calculateTransitionDimensions,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'
import Block from '../Primitives/Block/Block'

const ANIMATION_DURATION = 220 // ms

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
            children,
        },
        ref
    ) => {
        const tabsToken = useResponsiveTokens<TabsTokensType>('TABS')

        const scrollContainerRef = useRef<HTMLDivElement>(null)
        const prevItemsLengthRef = useRef(items.length)
        const tabsListRef = useRef<HTMLDivElement>(null)
        const tabRefsMap = useRef<Map<string, HTMLButtonElement>>(new Map())
        const prevActiveTabRef = useRef<string>(activeTab)

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
            const newTab = tabRefsMap.current.get(activeTab)
            const oldTab = tabRefsMap.current.get(prevActiveTabRef.current)

            if (!newTab || !listElement) {
                return
            }

            if (!oldTab || oldTab === newTab) {
                const { tabLeft, tabWidth } = calculateTabIndicatorPosition(
                    newTab,
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
                prevActiveTabRef.current = activeTab
                return
            }

            const dimensions = calculateTransitionDimensions(
                oldTab,
                newTab,
                listElement
            )

            listElement.style.setProperty(
                '--tabs-indicator-left',
                `${dimensions.left}px`
            )
            listElement.style.setProperty(
                '--tabs-indicator-width',
                `${dimensions.width}`
            )

            const timeoutId = setTimeout(() => {
                if (listElement) {
                    listElement.style.setProperty(
                        '--tabs-indicator-left',
                        `${dimensions.finalLeft}px`
                    )
                    listElement.style.setProperty(
                        '--tabs-indicator-width',
                        `${dimensions.finalWidth}`
                    )
                }
            }, ANIMATION_DURATION)

            prevActiveTabRef.current = activeTab

            return () => clearTimeout(timeoutId)
        }, [activeTab, variant])

        // Update indicator position on window resize
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
                            variant === TabsVariant.UNDERLINE
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
                            overflowY: 'hidden',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                        className="hide-scrollbar"
                    >
                        <StyledTabsList
                            ref={(node) => {
                                // Store in our local ref for animation tracking
                                tabsListRef.current = node
                                // Also forward the ref
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
                                            // Track each tab element for position calculation
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
                                        closable={
                                            item.closable && !item.isDefault
                                        }
                                        onClose={() =>
                                            handleTabClose(item.value)
                                        }
                                        disabled={item.disable}
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

        // Clone children and pass disable prop (similar to Accordion pattern)
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

                const childProps = {
                    ...existingProps,
                    disable: childDisable || disable,
                    variant,
                    size,
                    isActive: childValue === activeTab,
                    ref: (node: HTMLButtonElement) => {
                        // Track each tab element for position calculation
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

        return (
            <Block
                style={{
                    position: 'relative',
                    borderBottom:
                        variant === TabsVariant.UNDERLINE
                            ? tabsToken.borderBottom[variant]
                            : 'none',
                }}
            >
                <StyledTabsList
                    ref={(node) => {
                        // Store in our local ref for animation tracking
                        tabsListRef.current = node
                        // Also forward the ref
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
                >
                    {renderChildren()}
                </StyledTabsList>
            </Block>
        )
    }
)

TabsList.displayName = 'TabsList'

export default TabsList
