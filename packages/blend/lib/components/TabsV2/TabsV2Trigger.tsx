import React, { forwardRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { type TabsV2TriggerProps, TabsV2Variant } from './tabsV2.types'
import { StyledTabsTrigger, TabsV2IconContainer } from './StyledTabsV2'
import type { TabsV2TokensType } from './tabsV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Skeleton from '../Skeleton/Skeleton'
import { getSkeletonState } from '../Skeleton/utils'
import { useTabsV2Context } from './tabsV2.context'
import Block from '../Primitives/Block/Block'

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
            disabled: disabledProp,
            closable = false,
            onClose,
            isOverlay = false,
            tabsGroupId = '',
            showSkeleton: showSkeletonProp,
            skeletonVariant: skeletonVariantProp,
            ...props
        },
        ref
    ) => {
        const context = useTabsV2Context()
        const variant = variantProp ?? context.variant
        const size = sizeProp ?? context.size
        const disabled = disabledProp ?? context.disabled
        const showSkeleton = showSkeletonProp ?? context.showSkeleton
        const skeletonVariant = skeletonVariantProp ?? context.skeletonVariant

        const tabsToken = useResponsiveTokens<TabsV2TokensType>('TABSV2')
        const { shouldShowSkeleton } = getSkeletonState(showSkeleton)
        const closeButtonTokens = tabsToken.tabList.trigger.closeButton
        const closeButtonSize = closeButtonTokens.width
        const closeIconSize =
            typeof closeButtonSize === 'number'
                ? closeButtonSize
                : Number.parseInt(String(closeButtonSize), 10) || 16

        const isDisabled = shouldShowSkeleton ? true : disabled
        const closeButtonBackgroundColor = isDisabled
            ? closeButtonTokens.backgroundColor.disabled
            : closeButtonTokens.backgroundColor.default

        const skeletonBorderRadius =
            tabsToken.tabList.trigger.borderRadius[size][variant]

        const { isActive: _isActive, style, ...domProps } = props
        void _isActive

        const stopEventPropagation = useCallback(
            (
                e: React.MouseEvent | React.PointerEvent | React.KeyboardEvent
            ) => {
                e.stopPropagation()
                e.preventDefault()
                if (
                    e.nativeEvent &&
                    'stopImmediatePropagation' in e.nativeEvent
                ) {
                    ;(
                        e.nativeEvent as unknown as {
                            stopImmediatePropagation: () => void
                        }
                    ).stopImmediatePropagation()
                }
            },
            []
        )

        const handleCloseClick = useCallback(
            (e: React.MouseEvent) => {
                stopEventPropagation(e)
                if (!isDisabled) {
                    onClose?.()
                }
            },
            [onClose, isDisabled, stopEventPropagation]
        )

        const closeButton = closable && (
            <TabsV2IconContainer
                data-element="close-slot"
                $tabsToken={tabsToken}
            >
                <Block
                    as="span"
                    role="button"
                    aria-label={`Close ${children ?? 'tab'}`}
                    tabIndex={isDisabled ? -1 : 0}
                    onClick={handleCloseClick}
                    onMouseDown={stopEventPropagation}
                    onPointerDown={stopEventPropagation}
                    onKeyDown={(e: React.KeyboardEvent) => {
                        if (isDisabled) return
                        if (e.key === 'Enter' || e.key === ' ') {
                            stopEventPropagation(e)
                            onClose?.()
                        }
                    }}
                    width={closeButtonSize}
                    height={closeButtonSize}
                    borderRadius={closeButtonTokens.borderRadius}
                    backgroundColor={closeButtonBackgroundColor}
                    cursor={isDisabled ? 'not-allowed' : 'pointer'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    _hover={
                        !isDisabled
                            ? {
                                  backgroundColor:
                                      closeButtonTokens.backgroundColor.hover,
                              }
                            : undefined
                    }
                    _active={
                        !isDisabled
                            ? {
                                  backgroundColor:
                                      closeButtonTokens.backgroundColor.active,
                              }
                            : undefined
                    }
                >
                    <X size={closeIconSize} aria-hidden="true" />
                </Block>
            </TabsV2IconContainer>
        )

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
                    props.isActive &&
                    variant !== TabsV2Variant.UNDERLINE &&
                    !shouldShowSkeleton && (
                        <motion.span
                            layoutId={`tabs-background-indicator-${tabsGroupId}`}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor:
                                    tabsToken.tabList.trigger.backgroundColor[
                                        variant
                                    ].active,
                                borderRadius:
                                    tabsToken.tabList.trigger.borderRadius[
                                        size
                                    ][variant],
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

                {closable ? (
                    <span style={{ flexGrow: 1 }}>{children}</span>
                ) : (
                    <>{children}</>
                )}

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

                {closable && closeButton}
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

TabsV2Trigger.displayName = 'TabsV2Trigger'

export default TabsV2Trigger
