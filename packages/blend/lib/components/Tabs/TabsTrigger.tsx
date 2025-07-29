import { forwardRef } from 'react'
import { type TabsTriggerProps, TabsVariant, TabsSize } from './types'
import { StyledTabsTrigger, IconContainer } from './StyledTabs'
import type { TabsTokensType } from './tabs.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
    (
        {
            className,
            value,
            variant = TabsVariant.UNDERLINE,
            size = TabsSize.MD,
            children,
            leftSlot,
            rightSlot,
            ...props
        },
        ref
    ) => {
        const tabsToken = useResponsiveTokens<TabsTokensType>('TABS')

        return (
            <StyledTabsTrigger
                ref={ref}
                value={value}
                $variant={variant}
                $size={size}
                $tabsToken={tabsToken}
                className={className}
                {...props}
            >
                {leftSlot && (
                    <IconContainer
                        $tabsToken={tabsToken}
                        style={{ marginRight: tabsToken.trigger.iconGap }}
                    >
                        {leftSlot}
                    </IconContainer>
                )}
                {children}
                {rightSlot && (
                    <IconContainer
                        $tabsToken={tabsToken}
                        style={{ marginLeft: tabsToken.trigger.iconGap }}
                    >
                        {rightSlot}
                    </IconContainer>
                )}
            </StyledTabsTrigger>
        )
    }
)

TabsTrigger.displayName = 'TabsTrigger'

export default TabsTrigger
