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
        const overlayContainerRef = useRef<HTMLDivElement>(null)
        const activeTabInOverlayRef = useRef<HTMLButtonElement>(null)

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

            if (!newTab || !listElement) {
                return
            }

            // Smoothly animate directly to the new tab position
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

        // Animate clip-path for non-UNDERLINE variants
        useEffect(() => {
            if (
                variant === TabsVariant.UNDERLINE ||
                !overlayContainerRef.current ||
                !activeTabInOverlayRef.current ||
                !activeTab
            ) {
                return
            }

            const container = overlayContainerRef.current
            const activeTabElement = activeTabInOverlayRef.current

            if (!container || !activeTabElement) {
                return
            }

            const updateClipPath = () => {
                const { offsetLeft, offsetWidth } = activeTabElement
                const containerWidth = container.offsetWidth

                const clipLeft = (offsetLeft / containerWidth) * 100
                const clipRight =
                    ((offsetLeft + offsetWidth) / containerWidth) * 100

                container.style.clipPath = `inset(0 ${(100 - clipRight).toFixed(2)}% 0 ${clipLeft.toFixed(2)}% round ${tabsToken.borderRadius[size][variant]})`
            }

            updateClipPath()

            window.addEventListener('resize', updateClipPath)
            return () => window.removeEventListener('resize', updateClipPath)
        }, [activeTab, variant, size, tabsToken])

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
                            position: 'relative',
                            overflowX: 'auto',
                            overflowY: 'visible',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                        className="hide-scrollbar"
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

                        {variant !== TabsVariant.UNDERLINE && (
                            <Block
                                ref={overlayContainerRef}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    overflow: 'hidden',
                                    pointerEvents: 'none',
                                    transition:
                                        'clip-path 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                                    clipPath: 'inset(0 100% 0 0% round 0px)',
                                }}
                                aria-hidden="true"
                            >
                                <StyledTabsList
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
                                        const tabValue = item.value.includes(
                                            '_'
                                        )
                                            ? item.value.split('_')[0]
                                            : item.value

                                        return (
                                            <TabsTrigger
                                                key={`overlay-${item.value}`}
                                                ref={
                                                    tabValue === activeTab
                                                        ? activeTabInOverlayRef
                                                        : null
                                                }
                                                value={tabValue}
                                                variant={variant}
                                                size={size}
                                                isActive={
                                                    tabValue === activeTab
                                                }
                                                isOverlay={true}
                                                closable={
                                                    item.closable &&
                                                    !item.isDefault
                                                }
                                                onClose={() =>
                                                    handleTabClose(item.value)
                                                }
                                                disabled={item.disable}
                                                style={{
                                                    flexShrink: 0,
                                                    whiteSpace: 'nowrap',
                                                }}
                                                tabIndex={-1}
                                            >
                                                {item.label}
                                            </TabsTrigger>
                                        )
                                    })}
                                </StyledTabsList>
                            </Block>
                        )}
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
                >
                    {renderChildren()}
                </StyledTabsList>

                {variant !== TabsVariant.UNDERLINE && (
                    <Block
                        ref={overlayContainerRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            overflow: 'hidden',
                            pointerEvents: 'none',
                            transition:
                                'clip-path 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                            clipPath: 'inset(0 100% 0 0% round 0px)',
                        }}
                        aria-hidden="true"
                    >
                        <StyledTabsList
                            $variant={variant}
                            $size={size}
                            $expanded={expanded}
                            $fitContent={fitContent}
                            $tabsToken={tabsToken}
                        >
                            {React.Children.map(children, (child) => {
                                if (!React.isValidElement(child)) return child

                                const existingProps = child.props as Record<
                                    string,
                                    unknown
                                >
                                const childValue =
                                    'value' in existingProps
                                        ? (existingProps.value as string)
                                        : ''

                                const childProps = {
                                    ...existingProps,
                                    variant,
                                    size,
                                    isActive: childValue === activeTab,
                                    isOverlay: true,
                                    tabIndex: -1,
                                    ref:
                                        childValue === activeTab
                                            ? activeTabInOverlayRef
                                            : null,
                                }

                                return React.cloneElement(child, childProps)
                            })}
                        </StyledTabsList>
                    </Block>
                )}
            </Block>
        )
    }
)

TabsList.displayName = 'TabsList'

export default TabsList
