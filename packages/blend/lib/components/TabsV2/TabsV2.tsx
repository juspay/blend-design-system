import * as React from 'react'
import { forwardRef, useState, useCallback, useMemo, useEffect } from 'react'
import { type TabsV2Props, TabsV2Size, TabsV2Variant } from './tabsV2.types'
import { StyledTabsRoot } from './StyledTabsV2'
import { TabsV2Provider } from './tabsV2.context'
import type { TabsV2ContextValue } from './tabsV2.context'
import type { TabsV2TokensType } from './tabsV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

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
            disabled = false,
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
        const tabsToken = useResponsiveTokens<TabsV2TokensType>('TABSV2')

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
                const childDisabled =
                    'disabled' in existingProps
                        ? (existingProps.disabled as boolean | undefined)
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
                        disabled: childDisabled || disabled,
                        ...(isTabsList && {
                            showSkeleton:
                                'showSkeleton' in existingProps
                                    ? existingProps.showSkeleton
                                    : showSkeleton,
                            skeletonVariant:
                                'skeletonVariant' in existingProps
                                    ? existingProps.skeletonVariant
                                    : skeletonVariant,
                            variant:
                                'variant' in existingProps
                                    ? existingProps.variant
                                    : variant,
                            size:
                                'size' in existingProps
                                    ? existingProps.size
                                    : size,
                            stickyHeader:
                                'stickyHeader' in existingProps
                                    ? existingProps.stickyHeader
                                    : stickyHeader,
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

        const context = useMemo<TabsV2ContextValue>(
            () => ({
                variant,
                size,
                expanded,
                fitContent,
                disabled,
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
                disabled,
                showSkeleton,
                skeletonVariant,
                stickyHeader,
                offsetTop,
                activeTab,
            ]
        )

        return (
            <TabsV2Provider value={context}>
                <StyledTabsRoot
                    data-tabs={value ?? 'tabs'}
                    ref={ref}
                    className={className}
                    value={activeTab}
                    defaultValue={defaultValue}
                    onValueChange={handleValueChange}
                    $tabsToken={tabsToken}
                    {...props}
                >
                    {renderChildren(children)}
                </StyledTabsRoot>
            </TabsV2Provider>
        )
    }
)

TabsV2.displayName = 'TabsV2'

export default TabsV2
