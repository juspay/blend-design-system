import { forwardRef, useCallback, useMemo } from 'react'
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
        const handleValueChange = useCallback(
            (newValue: string) => {
                onValueChange?.(newValue)
            },
            [onValueChange]
        )

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
                activeTab: value ?? defaultValue ?? '',
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
                value,
                defaultValue,
            ]
        )

        return (
            <TabsV2ChromeProvider value={chrome}>
                <StyledTabsV2Root
                    data-tabs={value ?? 'tabs'}
                    ref={ref}
                    className={className}
                    value={value}
                    defaultValue={defaultValue}
                    onValueChange={handleValueChange}
                    {...props}
                >
                    {children}
                </StyledTabsV2Root>
            </TabsV2ChromeProvider>
        )
    }
)

TabsV2.displayName = 'TabsV2'

export default TabsV2
