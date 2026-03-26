import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { type TabsV2TriggerProps, TabsV2Variant } from './tabsV2.types'
import { StyledTabsV2Trigger, TabsV2IconContainer } from './StyledTabsV2'
import type { TabsV2TokensType } from './tabsV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Skeleton from '../Skeleton/Skeleton'
import { getSkeletonState } from '../Skeleton/utils'
import { useTabsV2Chrome } from './useTabsV2Chrome'

const TabsV2Trigger = forwardRef<HTMLButtonElement, TabsV2TriggerProps>(
    (
        {
            className,
            value,
            variant: variantProp,
            size: sizeProp,
            children,
            leftSlot,
            rightSlot,
            disable: disableProp,
            isOverlay = false,
            tabsGroupId = '',
            showSkeleton: showSkeletonProp,
            skeletonVariant: skeletonVariantProp,
            ...props
        },
        ref
    ) => {
        const chrome = useTabsV2Chrome()
        const variant = variantProp ?? chrome.variant
        const size = sizeProp ?? chrome.size
        const disable = disableProp ?? chrome.disable
        const showSkeleton = showSkeletonProp ?? chrome.showSkeleton
        const skeletonVariant = skeletonVariantProp ?? chrome.skeletonVariant

        const tabsToken = useResponsiveTokens<TabsV2TokensType>('TABSV2')
        const { shouldShowSkeleton } = getSkeletonState(showSkeleton)

        const isDisabled = shouldShowSkeleton ? true : disable

        const skeletonBorderRadius = tabsToken.borderRadius[size][variant]

        const { isActive: _isActive, style, ...domProps } = props
        void _isActive

        const triggerContent = (
            <StyledTabsV2Trigger
                data-status={isDisabled ? 'disabled' : 'enabled'}
                data-id={children ?? ''}
                ref={ref}
                value={value}
                $variant={variant}
                $size={size}
                $tabsToken={tabsToken}
                $isOverlay={isOverlay}
                className={className}
                disabled={isDisabled}
                style={{
                    ...(shouldShowSkeleton && {
                        color: 'transparent',
                        pointerEvents: 'none',
                        border: 'none',
                    }),
                    ...style,
                }}
                {...domProps}
            >
                {!isOverlay &&
                    props.isActive &&
                    variant !== TabsV2Variant.UNDERLINE &&
                    !shouldShowSkeleton && (
                        <motion.span
                            layoutId={`tabs-v2-background-indicator-${tabsGroupId}`}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor:
                                    tabsToken.backgroundColor[variant].active,
                                borderRadius:
                                    tabsToken.borderRadius[size][variant],
                                zIndex: -1,
                            }}
                            transition={{
                                type: 'spring',
                                bounce: 0.2,
                                duration: 0.6,
                            }}
                        />
                    )}

                {leftSlot && (
                    <TabsV2IconContainer
                        data-element="left-slot"
                        $tabsToken={tabsToken}
                        style={{ opacity: shouldShowSkeleton ? 0 : 1 }}
                        aria-hidden={
                            React.isValidElement(leftSlot) &&
                            leftSlot.props &&
                            typeof leftSlot.props === 'object' &&
                            'aria-label' in leftSlot.props
                                ? undefined
                                : 'true'
                        }
                    >
                        {leftSlot}
                    </TabsV2IconContainer>
                )}

                <span
                    style={{
                        flexGrow: 1,
                        position: 'relative',
                        zIndex: 1,
                        opacity: shouldShowSkeleton ? 0 : 1,
                    }}
                >
                    {children}
                </span>

                {rightSlot && (
                    <TabsV2IconContainer
                        data-element="right-slot"
                        $tabsToken={tabsToken}
                        style={{ opacity: shouldShowSkeleton ? 0 : 1 }}
                        aria-hidden={
                            React.isValidElement(rightSlot) &&
                            rightSlot.props &&
                            typeof rightSlot.props === 'object' &&
                            'aria-label' in rightSlot.props
                                ? undefined
                                : 'true'
                        }
                    >
                        {rightSlot}
                    </TabsV2IconContainer>
                )}
            </StyledTabsV2Trigger>
        )

        if (shouldShowSkeleton) {
            return (
                <Skeleton
                    data-element="skeleton"
                    variant={skeletonVariant}
                    loading
                    padding="0"
                    display="inline-block"
                    pointerEvents="none"
                    height="fit-content"
                    width="fit-content"
                    borderRadius={skeletonBorderRadius}
                >
                    {triggerContent}
                </Skeleton>
            )
        }

        return triggerContent
    }
)

TabsV2Trigger.displayName = 'TabsV2Trigger'

export default TabsV2Trigger
