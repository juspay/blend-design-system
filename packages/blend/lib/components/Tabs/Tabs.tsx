import * as React from 'react'
import { forwardRef, useState, useEffect, useCallback, useMemo } from 'react'
import { type TabsProps } from './types'
import { StyledTabs } from './StyledTabs'
import TabsList from './TabsList'
import TabsContent from './TabsContent'

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
    (
        {
            className,
            variant,
            size,
            expanded = false,
            fitContent = false,
            items = [],
            onTabClose,
            onTabAdd,
            showDropdown = false,
            showAddButton = false,
            dropdownTooltip = 'Navigate to tab',
            addButtonTooltip = 'Add new tab',
            value,
            defaultValue,
            onValueChange,
            disable = false,
            showSkeleton = false,
            skeletonVariant = 'pulse',
            stickyHeader = false,
            children,
            ...props
        },
        ref
    ) => {
        const [activeTab, setActiveTab] = useState<string>(
            value || defaultValue || items[0]?.value || ''
        )

        // Track which tabs should have isDefault: true (persists across tab changes)
        const [defaultTabs, setDefaultTabs] = useState<Set<string>>(() => {
            const initialDefaults = new Set<string>()
            items.forEach((item) => {
                initialDefaults.add(item.value)
            })
            return initialDefaults
        })

        // Track which tabs were newly added from dropdown (not originally default)
        const [newlyAddedTabs, setNewlyAddedTabs] = useState<Set<string>>(
            new Set()
        )

        useEffect(() => {
            if (value !== undefined) {
                setActiveTab(value)
            }
        }, [value])

        useEffect(() => {
            if (items.length > 0) {
                const firstItemValue = items[0].value
                // Always set to first item when items change
                setActiveTab(firstItemValue)
            }
        }, [items])

        // Update defaultTabs when items change (to include new items with isDefault: true)
        useEffect(() => {
            items.forEach((item) => {
                if (!defaultTabs.has(item.value)) {
                    setDefaultTabs((prev) => new Set(prev).add(item.value))
                }
            })
        }, [items, defaultTabs])

        const itemsWithDefaultsAtEnd = useMemo(() => {
            const updatedItems = items.map((item) => {
                // Preserve isDefault: true for tabs that are in defaultTabs Set
                if (defaultTabs.has(item.value)) {
                    // Only set newItem: true for tabs that were newly added from dropdown
                    const isNewItem = newlyAddedTabs.has(item.value)
                    return {
                        ...item,
                        ...(isNewItem && { newItem: true }),
                    }
                }
                // Explicitly set isDefault: false for tabs not in defaultTabs Set
                return { ...item }
            })

            // Separate items into two groups: non-default and default
            const nonDefaultItems = updatedItems.filter(
                (item) => !defaultTabs.has(item.value)
            )
            const defaultItems = updatedItems.filter((item) =>
                defaultTabs.has(item.value)
            )
            // Return non-default items first, then default items at the end
            return [...nonDefaultItems, ...defaultItems]
        }, [items, defaultTabs, newlyAddedTabs])

        const handleValueChange = useCallback(
            (newValue: string) => {
                setActiveTab(newValue)
                // Add the selected tab to defaultTabs Set to persist isDefault: true
                setDefaultTabs((prev) => {
                    const updated = new Set(prev)
                    // Only mark as newly added if it wasn't already in defaultTabs
                    if (!prev.has(newValue)) {
                        setNewlyAddedTabs((prevNew) =>
                            new Set(prevNew).add(newValue)
                        )
                    }
                    updated.add(newValue)
                    return updated
                })
                onValueChange?.(newValue)
            },
            [onValueChange]
        )

        const handleTabClose = useCallback(
            (tabValue: string) => {
                if (tabValue === activeTab && items.length > 1) {
                    // Find the index of the closed tab in the default tabs list
                    const currentIndex = itemsWithDefaultsAtEnd.findIndex(
                        (item) => item.value === tabValue
                    )

                    // Get the previous default tab
                    let previousDefaultTab = null
                    if (currentIndex > 0) {
                        // Previous default tab exists
                        previousDefaultTab =
                            itemsWithDefaultsAtEnd[currentIndex - 1]
                    } else if (
                        currentIndex === 0 &&
                        itemsWithDefaultsAtEnd.length > 1
                    ) {
                        // Closed tab is first default tab, so use the next default tab
                        previousDefaultTab =
                            itemsWithDefaultsAtEnd[currentIndex + 1]
                    }

                    if (previousDefaultTab) {
                        handleValueChange(previousDefaultTab.value)
                    }
                }

                // Remove from defaultTabs Set - this will cause itemsWithDefaultsAtEnd to recalculate
                setDefaultTabs((prev) => {
                    const updated = new Set(prev)
                    updated.delete(tabValue)
                    return updated
                })

                // Remove from newlyAddedTabs Set
                setNewlyAddedTabs((prev) => {
                    const updated = new Set(prev)
                    updated.delete(tabValue)
                    return updated
                })

                onTabClose?.(tabValue)
            },
            [
                activeTab,
                items,
                onTabClose,
                defaultTabs,
                itemsWithDefaultsAtEnd,
                handleValueChange,
            ]
        )

        const handleTabChange = useCallback(
            (tabValue: string) => {
                handleValueChange(tabValue)
            },
            [handleValueChange]
        )

        const processedItems = useMemo(() => {
            return itemsWithDefaultsAtEnd.map((item) => ({
                ...item,
                disable: item.disable || disable,
                showSkeleton:
                    item.showSkeleton !== undefined
                        ? item.showSkeleton
                        : showSkeleton,
                skeletonVariant:
                    item.skeletonVariant !== undefined
                        ? item.skeletonVariant
                        : skeletonVariant,
            }))
        }, [itemsWithDefaultsAtEnd, disable, showSkeleton, skeletonVariant])

        if (items.length > 0) {
            return (
                <StyledTabs
                    data-tabs={value ?? 'tabs'}
                    ref={ref}
                    className={className}
                    value={activeTab}
                    onValueChange={handleValueChange}
                    {...props}
                >
                    <TabsList
                        data-element="tab-list"
                        variant={variant}
                        size={size}
                        expanded={expanded}
                        fitContent={fitContent}
                        items={processedItems}
                        originalItems={items}
                        onTabClose={handleTabClose}
                        onTabAdd={onTabAdd}
                        showDropdown={showDropdown}
                        showAddButton={showAddButton}
                        dropdownTooltip={dropdownTooltip}
                        addButtonTooltip={addButtonTooltip}
                        onTabChange={handleTabChange}
                        activeTab={activeTab}
                        stickyHeader={stickyHeader}
                    />

                    {items.map((item) => (
                        <TabsContent key={item.value} value={item.value}>
                            {item.content}
                        </TabsContent>
                    ))}
                </StyledTabs>
            )
        }

        const renderChildren = (
            childrenToRender: React.ReactNode
        ): React.ReactNode => {
            return React.Children.map(childrenToRender, (child) => {
                if (!React.isValidElement(child)) return child

                const existingProps = child.props as Record<string, unknown>
                const childDisable =
                    'disable' in existingProps
                        ? (existingProps.disable as boolean | undefined)
                        : undefined

                const isTabsList =
                    child.type &&
                    (child.type as { displayName?: string }).displayName ===
                        'TabsList'

                const isTabsTrigger =
                    child.type &&
                    (child.type as { displayName?: string }).displayName ===
                        'TabsTrigger'

                // If it's a TabsList or TabsTrigger, apply props directly
                if (isTabsList || isTabsTrigger) {
                    const childProps = {
                        ...existingProps,
                        disable: childDisable || disable,
                        ...(isTabsList && {
                            activeTab,
                            showSkeleton,
                            skeletonVariant,
                            variant,
                            size,
                            stickyHeader,
                        }),
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
                    }
                    return React.cloneElement(child, childProps)
                }

                // If it's a regular element with children, recursively process its children
                const childChildren =
                    (existingProps.children as React.ReactNode) || null
                if (childChildren) {
                    const childProps = {
                        ...existingProps,
                        children: renderChildren(childChildren),
                    }
                    return React.cloneElement(child, childProps)
                }

                // Otherwise, return as-is
                return child
            })
        }

        return (
            <StyledTabs
                data-tabs={value ?? 'tabs'}
                ref={ref}
                className={className}
                value={activeTab}
                defaultValue={defaultValue}
                onValueChange={handleValueChange}
                {...props}
            >
                {renderChildren(children)}
            </StyledTabs>
        )
    }
)

Tabs.displayName = 'Tabs'

export default Tabs
