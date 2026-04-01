import { forwardRef } from 'react'
import type { TabsV2ContentProps } from './tabsV2.types'
import { StyledTabsContent } from './StyledTabsV2'
import type { TabsV2TokensType } from './tabsV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const TabsV2Content = forwardRef<HTMLDivElement, TabsV2ContentProps>(
    ({ className, children, ...props }, ref) => {
        const tabsToken = useResponsiveTokens<TabsV2TokensType>('TABSV2')

        const { disabled: _disabled, ...domProps } =
            props as TabsV2ContentProps & {
                disabled?: boolean
            }
        void _disabled

        return (
            <StyledTabsContent
                data-element="content"
                data-id={props.value ?? 'tabs-v2-content'}
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

TabsV2Content.displayName = 'TabsV2Content'

export default TabsV2Content
