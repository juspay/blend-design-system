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
            onValueChange,
            disable = false,
            children,
            ...props
        },
        ref
    ) => {
        const [activeTab, setActiveTab] = useState<string>(
            value || items[0]?.value || ''
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
            // Apply global disable to all items if not already disabled
            const processedItems = items.map((item) => ({
                ...item,
                disable: item.disable || disable,
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
                const childProps = {
                    ...existingProps,
                    disable: childDisable || disable,
                }

                return React.cloneElement(child, childProps)
            })
        }

        return (
            <StyledTabs
                ref={ref}
                className={className}
                value={value}
                onValueChange={onValueChange}
                {...props}
            >
                {renderChildren()}
            </StyledTabs>
        )
    }
)

Tabs.displayName = 'Tabs'

export default Tabs
