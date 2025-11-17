import { forwardRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { type TabsTriggerProps, TabsVariant, TabsSize } from './types'
import { StyledTabsTrigger, IconContainer } from './StyledTabs'
import type { TabsTokensType } from './tabs.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { X } from 'lucide-react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'

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
            closable = false,
            onClose,
            disable = false,
            isActive = false,
            ...props
        },
        ref
    ) => {
        const tabsToken = useResponsiveTokens<TabsTokensType>('TABS')

        const shouldUseMotionAnimation = variant !== TabsVariant.UNDERLINE

        const handleCloseClick = useCallback(
            (e: React.MouseEvent) => {
                e.stopPropagation()
                e.preventDefault()
                onClose?.()
            },
            [onClose]
        )

        const effectiveRightSlot = closable ? (
            <PrimitiveButton
                onClick={handleCloseClick}
                size={16}
                borderRadius="50%"
                backgroundColor="transparent"
                _hover={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }}
                contentCentered
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <X size={12} />
            </PrimitiveButton>
        ) : (
            rightSlot
        )

        return (
            <StyledTabsTrigger
                ref={ref}
                value={value}
                $variant={variant}
                $size={size}
                $tabsToken={tabsToken}
                className={className}
                disabled={disable}
                {...props}
            >
                {shouldUseMotionAnimation && isActive && (
                    <motion.span
                        layoutId="tabs-active-background"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor:
                                tabsToken.backgroundColor[variant].active,
                            borderRadius: tabsToken.borderRadius[size][variant],
                            zIndex: 0,
                        }}
                        transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.6,
                        }}
                    />
                )}

                {leftSlot && (
                    <IconContainer
                        $tabsToken={tabsToken}
                        style={{ position: 'relative', zIndex: 1 }}
                    >
                        {leftSlot}
                    </IconContainer>
                )}

                <span style={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
                    {children}
                </span>

                {effectiveRightSlot && (
                    <IconContainer
                        $tabsToken={tabsToken}
                        style={{ position: 'relative', zIndex: 1 }}
                    >
                        {effectiveRightSlot}
                    </IconContainer>
                )}
            </StyledTabsTrigger>
        )
    }
)

TabsTrigger.displayName = 'TabsTrigger'

export default TabsTrigger
