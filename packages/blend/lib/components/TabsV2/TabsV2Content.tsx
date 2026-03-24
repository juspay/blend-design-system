import { forwardRef } from 'react'
import type { TabsV2ContentProps } from './tabsV2.types'
import { StyledTabsV2Content } from './StyledTabsV2'
import type { TabsV2TokensType } from './tabsV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const TabsV2Content = forwardRef<HTMLDivElement, TabsV2ContentProps>(
    ({ className, children, ...props }, ref) => {
        const tabsToken = useResponsiveTokens<TabsV2TokensType>('TABSV2')

        const { disable: _disable, ...domProps } =
            props as TabsV2ContentProps & {
                disable?: boolean
            }
        void _disable

        return (
            <StyledTabsV2Content
                data-element="content"
                data-id={props.value ?? 'tabs-v2-content'}
                ref={ref}
                className={className}
                $tabsToken={tabsToken}
                {...domProps}
            >
                {children}
            </StyledTabsV2Content>
        )
    }
)

TabsV2Content.displayName = 'TabsV2Content'

export default TabsV2Content
