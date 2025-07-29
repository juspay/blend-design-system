import { forwardRef } from 'react'
import { type TabsContentProps } from './types'
import { StyledTabsContent } from './StyledTabs'
import type { TabsTokensType } from './tabs.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, children, ...props }, ref) => {
        const tabsToken = useResponsiveTokens<TabsTokensType>('TABS')
        return (
            <StyledTabsContent
                ref={ref}
                className={className}
                $tabsToken={tabsToken}
                {...props}
            >
                {children}
            </StyledTabsContent>
        )
    }
)

TabsContent.displayName = 'TabsContent'

export default TabsContent
