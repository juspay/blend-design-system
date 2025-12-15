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
            // Initialize with tabs that already have isDefault: true
            const initialDefaults = new Set<string>()
            items.forEach((item) => {
                if (item.isDefault === true) {
                    initialDefaults.add(item.value)
                }
            })
            return initialDefaults
        })

        // Track which tabs were newly added from dropdown (not originally default)
        const [newlyAddedTabs, setNewlyAddedTabs] = useState<Set<string>>(
            new Set()
        )

        // useEffect(() => {
        //     if (value !== undefined) {
        //         setActiveTab(value)
        //     }
        // }, [value])

        // Update defaultTabs when items change (to include new items with isDefault: true)
        useEffect(() => {
            items.forEach((item) => {
                if (item.isDefault === true && !defaultTabs.has(item.value)) {
                    setDefaultTabs((prev) => new Set(prev).add(item.value))
                }
            })
        }, [items, defaultTabs])

        const itemsWithDefaultsAtEnd = useMemo(() => {
            // Map items and update isDefault property
            const updatedItems = items.map((item) => {
                // Preserve isDefault: true for tabs that are in defaultTabs Set
                if (defaultTabs.has(item.value)) {
                    // Only set newItem: true for tabs that were newly added from dropdown
                    const isNewItem = newlyAddedTabs.has(item.value)
                    return {
                        ...item,
                        isDefault: true,
                        closable: true,
                        ...(isNewItem && { newItem: true }),
                    }
                }
                // Explicitly set isDefault: false for tabs not in defaultTabs Set
                return { ...item, isDefault: false }
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
                // Find the most recent previous tab with isDefault: true BEFORE removing from defaultTabs
                let previousDefaultTab: (typeof items)[0] | null = null
                const DefaultTabs = itemsWithDefaultsAtEnd.filter(
                    (item) => item.isDefault === true
                )

                if (tabValue === activeTab && items.length > 1) {
                    // Search in itemsWithDefaultsAtEnd (display order) for the most recent previous default tab
                    const currentIndexInDisplay = DefaultTabs.findIndex(
                        (item) => item.value === tabValue
                    )
                    // Search backwards from current position to find the most recent previous default tab
                    if (currentIndexInDisplay > 0) {
                        for (let i = currentIndexInDisplay - 1; i >= 0; i--) {
                            const item = DefaultTabs[i]
                            if (defaultTabs.has(item.value)) {
                                previousDefaultTab = item
                                break // Found the most recent previous default tab
                            }
                        }
                    }
                    // Fallback: if not found in display order, use next/previous tab
                    const currentIndex = DefaultTabs.findIndex(
                        (item) => item.value === tabValue
                    )
                    const nextTab =
                        previousDefaultTab ||
                        DefaultTabs[currentIndex + 1] ||
                        DefaultTabs[currentIndex - 1]

                    if (nextTab) {
                        handleValueChange(nextTab.value)
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
                    />

                    {items.map((item) => (
                        <TabsContent key={item.value} value={item.value}>
                            {item.content}
                        </TabsContent>
                    ))}
                </StyledTabs>
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

                const isTabsList =
                    child.type &&
                    (child.type as { displayName?: string }).displayName ===
                        'TabsList'

                const isTabsTrigger =
                    child.type &&
                    (child.type as { displayName?: string }).displayName ===
                        'TabsTrigger'

                const childProps = {
                    ...existingProps,
                    disable: childDisable || disable,
                    ...(isTabsList && {
                        activeTab,
                        showSkeleton,
                        skeletonVariant,
                        variant,
                        size,
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
                {renderChildren()}
            </StyledTabs>
        )
    }
)

Tabs.displayName = 'Tabs'

export default Tabs
