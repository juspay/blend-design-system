import { forwardRef } from 'react'
import { type TabsContentProps } from './types'
import { StyledTabsContent } from './StyledTabs'
import type { TabsTokensType } from './tabs.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, children, ...props }, ref) => {
        const tabsToken = useResponsiveTokens<TabsTokensType>('TABS')

        const { disable: _disable, ...domProps } = props as TabsContentProps & {
            disable?: boolean
        }

        return (
            <StyledTabsContent
                ref={ref}
                className={className}
                $tabsToken={tabsToken}
                {...domProps}
            >
                {children}
            </StyledTabsContent>
        )
    }
)

TabsContent.displayName = 'TabsContent'

export default TabsContent
