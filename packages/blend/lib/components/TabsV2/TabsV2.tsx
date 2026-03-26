import * as React from 'react'
import { forwardRef, useState, useCallback, useMemo, useEffect } from 'react'
import { type TabsV2Props, TabsV2Size, TabsV2Variant } from './tabsV2.types'
import { StyledTabsV2Root } from './StyledTabsV2'
import { TabsV2ChromeProvider } from './tabsV2.context'
import type { TabsV2ChromeContextValue } from './tabsV2.context'

const TabsV2 = forwardRef<HTMLDivElement, TabsV2Props>(
    (
        {
            className,
            variant = TabsV2Variant.UNDERLINE,
            size = TabsV2Size.MD,
            expanded = false,
            fitContent = false,
            value,
            defaultValue,
            onValueChange,
            disable = false,
            showSkeleton = false,
            skeletonVariant = 'pulse',
            stickyHeader = false,
            offsetTop = 0,
            children,
            ...props
        },
        ref
    ) => {
        const [activeTab, setActiveTab] = useState<string>(
            value || defaultValue || ''
        )

        useEffect(() => {
            if (value !== undefined) {
                setActiveTab(value)
            }
        }, [value])

        const handleValueChange = useCallback(
            (newValue: string) => {
                setActiveTab(newValue)
                onValueChange?.(newValue)
            },
            [onValueChange]
        )

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
                        'TabsV2List'

                const isTabsTrigger =
                    child.type &&
                    (child.type as { displayName?: string }).displayName ===
                        'TabsV2Trigger'

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

                const childChildren =
                    (existingProps.children as React.ReactNode) || null
                if (childChildren) {
                    const childProps = {
                        ...existingProps,
                        children: renderChildren(childChildren),
                    }
                    return React.cloneElement(child, childProps)
                }

                return child
            })
        }

        const chrome = useMemo<TabsV2ChromeContextValue>(
            () => ({
                variant,
                size,
                expanded,
                fitContent,
                disable,
                showSkeleton,
                skeletonVariant,
                stickyHeader,
                offsetTop,
                activeTab,
            }),
            [
                variant,
                size,
                expanded,
                fitContent,
                disable,
                showSkeleton,
                skeletonVariant,
                stickyHeader,
                offsetTop,
                activeTab,
            ]
        )

        return (
            <TabsV2ChromeProvider value={chrome}>
                <StyledTabsV2Root
                    data-tabs={value ?? 'tabs'}
                    ref={ref}
                    className={className}
                    value={activeTab}
                    defaultValue={defaultValue}
                    onValueChange={handleValueChange}
                    {...props}
                >
                    {renderChildren(children)}
                </StyledTabsV2Root>
            </TabsV2ChromeProvider>
        )
    }
)

TabsV2.displayName = 'TabsV2'

export default TabsV2
