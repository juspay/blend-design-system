import React, { forwardRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { type TabsTriggerProps, TabsVariant, TabsSize } from './types'
import { StyledTabsTrigger, IconContainer } from './StyledTabs'
import type { TabsTokensType } from './tabs.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { X } from 'lucide-react'
import Skeleton from '../Skeleton/Skeleton'
import { getSkeletonState } from '../Skeleton/utils'
import Block from '../Primitives/Block/Block'

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
            isOverlay = false,
            tabsGroupId = '',
            showSkeleton = false,
            skeletonVariant = 'pulse',
            ...props
        },
        ref
    ) => {
        const tabsToken = useResponsiveTokens<TabsTokensType>('TABS')
        const { shouldShowSkeleton } = getSkeletonState(showSkeleton)

        const isActive = props.isActive
        const isDisabled = shouldShowSkeleton ? true : disable

        const handleCloseClick = useCallback(
            (e: React.MouseEvent) => {
                e.stopPropagation()
                e.preventDefault()
                if (!isDisabled) {
                    onClose?.()
                }
            },
            [onClose, isDisabled]
        )

        const handleCloseKeyDown = useCallback(
            (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    if (!isDisabled) {
                        onClose?.()
                    }
                }
            },
            [onClose, isDisabled]
        )

        const effectiveRightSlot = closable ? (
            <Block
                as="span"
                role="button"
                onClick={handleCloseClick}
                onKeyDown={handleCloseKeyDown}
                width="16px"
                height="16px"
                borderRadius="50%"
                backgroundColor="transparent"
                cursor="pointer"
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="background-color 0.2s"
                aria-label={`Close ${children || 'tab'}`}
                tabIndex={isDisabled ? -1 : 0}
                aria-disabled={isDisabled ? 'true' : undefined}
                _hover={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }}
                _active={{
                    backgroundColor: 'rgba(0, 0, 0, 0.15)',
                }}
            >
                <X size={12} aria-hidden="true" />
            </Block>
        ) : (
            rightSlot
        )

        const skeletonBorderRadius = tabsToken.borderRadius[size][variant]

        const { isActive: _isActive, style, ...domProps } = props
        void _isActive

        const triggerContent = (
            <StyledTabsTrigger
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
                    isActive &&
                    variant !== TabsVariant.UNDERLINE &&
                    !shouldShowSkeleton && (
                        <motion.span
                            layoutId={`tabs-background-indicator-${tabsGroupId}`}
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
                    <IconContainer
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
                    </IconContainer>
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

                {effectiveRightSlot && (
                    <IconContainer
                        data-element="right-slot"
                        $tabsToken={tabsToken}
                        style={{ opacity: shouldShowSkeleton ? 0 : 1 }}
                        aria-hidden={
                            closable
                                ? undefined
                                : React.isValidElement(effectiveRightSlot) &&
                                    effectiveRightSlot.props &&
                                    typeof effectiveRightSlot.props ===
                                        'object' &&
                                    'aria-label' in effectiveRightSlot.props
                                  ? undefined
                                  : 'true'
                        }
                    >
                        {effectiveRightSlot}
                    </IconContainer>
                )}
            </StyledTabsTrigger>
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

TabsTrigger.displayName = 'TabsTrigger'

export default TabsTrigger
