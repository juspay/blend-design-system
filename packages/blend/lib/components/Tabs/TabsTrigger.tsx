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
                // Stop all event propagation to prevent tab activation
                e.stopPropagation()
                e.preventDefault()
                // Also stop immediate propagation on native event
                if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
                    e.nativeEvent.stopImmediatePropagation()
                }
                if (!isDisabled) {
                    onClose?.()
                }
            },
            [onClose, isDisabled]
        )

        const handleCloseMouseDown = useCallback((e: React.MouseEvent) => {
            // Stop mousedown event to prevent it from triggering tab activation
            e.stopPropagation()
            e.preventDefault()
            if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
                e.nativeEvent.stopImmediatePropagation()
            }
        }, [])

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

        const effectiveRightSlot = closable && (
            <Block
                as="span"
                role="button"
                onClick={handleCloseClick}
                onMouseDown={handleCloseMouseDown}
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
                <X size={16} aria-hidden="true" />
            </Block>
        )

        const skeletonBorderRadius = tabsToken.borderRadius[size][variant]

        const { isActive: _isActive, style, ...domProps } = props
        void _isActive

        // Prevent tab activation when clicking on close button
        const handleTriggerClick = useCallback((e: React.MouseEvent) => {
            // Check if the click target is the close button or its children
            const target = e.target as HTMLElement
            const isCloseButtonClick =
                target.closest('[role="button"][aria-label*="Close"]') !==
                    null ||
                target.getAttribute('aria-label')?.includes('Close') ||
                target.closest('span[role="button"]') !== null

            if (isCloseButtonClick) {
                e.preventDefault()
                e.stopPropagation()
                if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
                    e.nativeEvent.stopImmediatePropagation()
                }
            }
        }, [])

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
                onClick={handleTriggerClick}
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

                {rightSlot && (
                    <IconContainer
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
                    </IconContainer>
                )}

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
