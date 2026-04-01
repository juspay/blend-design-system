import * as React from 'react'
import { forwardRef, useState, useCallback, useMemo, useEffect } from 'react'
import { type TabsV2Props, TabsV2Size, TabsV2Variant } from './tabsV2.types'
import { StyledTabsRoot } from './StyledTabsV2'
import { TabsV2Provider } from './tabsV2.context'
import type { TabsV2ContextValue } from './tabsV2.context'
import type { TabsV2TokensType } from './tabsV2.tokens'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const toTabValueString = (v: unknown): string => {
    if (v === undefined || v === null) return ''
    return String(v)
}

const TabsV2 = forwardRef<HTMLDivElement, TabsV2Props>(
    (
        {
            className,
            variant: variantProp = TabsV2Variant.UNDERLINE,
            size: sizeProp = TabsV2Size.MD,
            expanded: expandedProp = false,
            fitContent: fitContentProp = false,
            value,
            defaultValue,
            onValueChange,
            disabled: disabledProp = false,
            showSkeleton: showSkeletonProp = false,
            skeletonVariant: skeletonVariantProp = 'pulse',
            stickyHeader: stickyHeaderProp = false,
            offsetTop: offsetTopProp = 0,
            children,
            ...props
        },
        ref
    ) => {
        const variant = variantProp ?? TabsV2Variant.UNDERLINE
        const size = sizeProp ?? TabsV2Size.MD
        const expanded = Boolean(expandedProp)
        const fitContent = Boolean(fitContentProp)
        const disabled = Boolean(disabledProp)
        const showSkeleton = Boolean(showSkeletonProp)
        const skeletonVariant = (skeletonVariantProp ??
            'pulse') as SkeletonVariant
        const stickyHeader = Boolean(stickyHeaderProp)
        const offsetTop = offsetTopProp ?? 0

        const [activeTab, setActiveTab] = useState<string>(() =>
            toTabValueString(value ?? defaultValue)
        )
        const tabsToken = useResponsiveTokens<TabsV2TokensType>('TABSV2')

        useEffect(() => {
            if (value !== undefined && value !== null) {
                setActiveTab(toTabValueString(value))
            }
        }, [value])

        const isControlled = value !== undefined && value !== null

        const handleValueChange = useCallback(
            (newValue: string) => {
                const next = toTabValueString(newValue)
                if (!isControlled) {
                    setActiveTab(next)
                }
                onValueChange?.(next)
            },
            [onValueChange, isControlled]
        )

        const renderChildren = (
            childrenToRender: React.ReactNode
        ): React.ReactNode => {
            if (childrenToRender === undefined || childrenToRender === null) {
                return null
            }

            return React.Children.map(childrenToRender, (child) => {
                if (!React.isValidElement(child)) return child

                const existingProps = (child.props ?? {}) as Record<
                    string,
                    unknown
                >
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

        const rootDefaultValue =
            defaultValue !== undefined && defaultValue !== null
                ? toTabValueString(defaultValue)
                : undefined

        return (
            <TabsV2Provider value={context}>
                <StyledTabsRoot
                    data-tabs={toTabValueString(value) || 'tabs'}
                    ref={ref}
                    className={className}
                    value={activeTab}
                    defaultValue={rootDefaultValue}
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
