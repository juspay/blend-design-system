import * as React from 'react'
import { forwardRef, useState, useEffect } from 'react'
import { type TabsProps } from './types'
import { StyledTabs } from './StyledTabs'
import TabsList from './TabsList'
import TabsContent from './TabsContent'

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
    (
        {
            className,
            items = [],
            onTabClose,
            onTabAdd,
            showDropdown = false,
            showAddButton = false,
            dropdownTooltip = 'Navigate to tab',
            addButtonTooltip = 'Add new tab',
            maxDisplayTabs = 6,
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

        useEffect(() => {
            if (value !== undefined) {
                setActiveTab(value)
            }
        }, [value])

        const handleValueChange = (newValue: string) => {
            setActiveTab(newValue)
            onValueChange?.(newValue)
        }

        const handleTabClose = (tabValue: string) => {
            onTabClose?.(tabValue)
            if (tabValue === activeTab && items.length > 1) {
                const currentIndex = items.findIndex(
                    (item) => item.value === tabValue
                )
                const nextTab =
                    items[currentIndex + 1] || items[currentIndex - 1]
                if (nextTab) {
                    handleValueChange(nextTab.value)
                }
            }
        }

        const handleTabChange = (tabValue: string) => {
            handleValueChange(tabValue)
        }

        if (items.length > 0) {
            const processedItems = items.map((item) => ({
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

            return (
                <StyledTabs
                    ref={ref}
                    className={className}
                    value={activeTab}
                    onValueChange={handleValueChange}
                    {...props}
                >
                    <TabsList
                        items={processedItems}
                        onTabClose={handleTabClose}
                        onTabAdd={onTabAdd}
                        showDropdown={showDropdown}
                        showAddButton={showAddButton}
                        dropdownTooltip={dropdownTooltip}
                        addButtonTooltip={addButtonTooltip}
                        maxDisplayTabs={maxDisplayTabs}
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

        const handleChildrenValueChange = (newValue: string) => {
            setActiveTab(newValue)
            onValueChange?.(newValue)
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
                ref={ref}
                className={className}
                value={activeTab}
                defaultValue={defaultValue}
                onValueChange={handleChildrenValueChange}
                {...props}
            >
                {renderChildren()}
            </StyledTabs>
        )
    }
)

Tabs.displayName = 'Tabs'

export default Tabs
