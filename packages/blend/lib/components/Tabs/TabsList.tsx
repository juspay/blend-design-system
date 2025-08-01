import { forwardRef } from 'react'
import { type TabsListProps, TabsSize, TabsVariant } from './types'
import { StyledTabsList } from './StyledTabs'
import type { TabsTokensType } from './tabs.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
    (
        {
            className,
            variant = TabsVariant.UNDERLINE,
            size = TabsSize.MD,
            expanded = false,
            fitContent = false,
            ...props
        },
        ref
    ) => {
        const tabsToken = useResponsiveTokens<TabsTokensType>('TABS')
        return (
            <StyledTabsList
                ref={ref}
                className={className}
                $variant={variant}
                $size={size}
                $expanded={expanded}
                $fitContent={fitContent}
                $tabsToken={tabsToken}
                {...props}
            />
        )
    }
)

TabsList.displayName = 'TabsList'

export default TabsList
