import { useState, useId, forwardRef } from 'react'
import styled from 'styled-components'
import * as RadixPopover from '@radix-ui/react-popover'
import Block from '../Primitives/Block/Block'
import {
    PopoverV2Align,
    PopoverV2Props,
    PopoverV2Side,
    PopoverV2Size,
} from './popoverV2.types'
import PopoverV2Header from './PopoverV2Header'
import PopoverV2Footer from './PopoverV2Footer'
import { PopoverV2TokenType } from './popoverV2.token'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import MobilePopoverV2 from './MobilePopoverV2'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { popoverContentAnimations } from '../Popover/popover.animations'
import PopoverV2Skeleton from './PopoverV2Skeleton'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'

const AnimatedPopoverSurface = styled(Block)`
    ${popoverContentAnimations}
`

const PopoverV2 = forwardRef<HTMLDivElement, PopoverV2Props>(
    (
        {
            heading,
            description,
            trigger,
            children,
            showCloseButton = true,
            onOpenChange,
            open,
            asModal = false,
            primaryAction,
            secondaryAction,
            sideOffset = 8,
            side = PopoverV2Side.BOTTOM,
            align = PopoverV2Align.CENTER,
            alignOffset = 0,
            width,
            minWidth = 300,
            maxWidth = 400,
            height,
            minHeight,
            maxHeight,
            size = PopoverV2Size.MD,
            onClose,
            useDrawerOnMobile = true,
            avoidCollisions = true,
            skeleton,
        },
        ref
    ) => {
        const [internalOpen, setInternalOpen] = useState(false)
        const isControlled = open !== undefined
        const effectiveOpen = isControlled ? open : internalOpen

        const handleOpenChange = (nextOpen: boolean) => {
            if (!isControlled) {
                setInternalOpen(nextOpen)
            }
            onOpenChange?.(nextOpen)
        }

        const popoverTokens =
            useResponsiveTokens<PopoverV2TokenType>('POPOVERV2')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        const hasHeading = Boolean(
            heading != null &&
            (typeof heading !== 'string' || heading.trim() !== '')
        )
        const hasDescription = Boolean(
            description != null &&
            (typeof description !== 'string' || description.trim() !== '')
        )

        const isCustomPopover =
            !hasHeading && !hasDescription && !primaryAction && !secondaryAction

        const shouldShowSkeleton = skeleton?.show
        const showBodySkeleton = skeleton?.bodySkeletonProps?.show
        const skeletonVariant = skeleton?.variant || 'pulse'

        const baseId = useId()
        const headingId = hasHeading ? `${baseId}-heading` : undefined
        const descriptionId = hasDescription
            ? `${baseId}-description`
            : undefined

        const ariaDescribedBy = descriptionId || undefined

        const handleClose = () => {
            handleOpenChange(false)
            onClose?.()
        }

        if (isSmallScreen && useDrawerOnMobile) {
            return (
                <MobilePopoverV2
                    skeleton={skeleton}
                    open={effectiveOpen}
                    onOpenChange={handleOpenChange}
                    heading={heading}
                    description={description}
                    primaryAction={primaryAction}
                    secondaryAction={secondaryAction}
                    showCloseButton={showCloseButton}
                    onClose={handleClose}
                    trigger={trigger}
                    size={size}
                    useDrawerOnMobile={useDrawerOnMobile}
                >
                    {children}
                </MobilePopoverV2>
            )
        }
        return (
            <RadixPopover.Root
                open={effectiveOpen}
                onOpenChange={handleOpenChange}
                modal={asModal}
            >
                <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
                <RadixPopover.Portal>
                    <RadixPopover.Content
                        data-popover={heading || 'Popover'}
                        style={{
                            zIndex: popoverTokens.zIndex,
                            outline: 'none',
                            minWidth,
                            maxWidth,
                        }}
                        asChild
                        sideOffset={sideOffset}
                        side={side}
                        align={align}
                        alignOffset={alignOffset}
                        avoidCollisions={avoidCollisions}
                    >
                        <AnimatedPopoverSurface
                            ref={ref as React.RefObject<HTMLDivElement>}
                            style={{ zIndex: popoverTokens.zIndex }}
                            {...(headingId
                                ? { 'aria-labelledby': headingId }
                                : {
                                      'aria-label': heading || 'Popover dialog',
                                  })}
                            {...(ariaDescribedBy
                                ? { 'aria-describedby': ariaDescribedBy }
                                : {})}
                            backgroundColor={popoverTokens.background}
                            boxShadow={popoverTokens.shadow?.lg}
                            borderRadius={popoverTokens.borderRadius[size]}
                            border={popoverTokens.border}
                            width={width}
                            minWidth={minWidth}
                            maxWidth={maxWidth}
                            height={height}
                            minHeight={minHeight}
                            maxHeight={maxHeight}
                            display="flex"
                            flexDirection="column"
                            gap={popoverTokens.gap[size]}
                            paddingLeft={
                                isCustomPopover
                                    ? 0
                                    : popoverTokens.padding.left[size]
                            }
                            paddingRight={
                                isCustomPopover
                                    ? 0
                                    : popoverTokens.padding.right[size]
                            }
                            paddingTop={
                                isCustomPopover
                                    ? 0
                                    : popoverTokens.padding.top[size]
                            }
                            paddingBottom={
                                isCustomPopover
                                    ? 0
                                    : popoverTokens.padding.bottom[size]
                            }
                        >
                            <PopoverV2Header
                                heading={heading}
                                description={description}
                                showCloseButton={showCloseButton}
                                size={size}
                                headingId={headingId}
                                descriptionId={descriptionId}
                                onClose={handleClose}
                                showSkeleton={shouldShowSkeleton}
                                skeletonVariant={skeletonVariant}
                                popoverTokens={popoverTokens}
                            />
                            {shouldShowSkeleton && showBodySkeleton ? (
                                <PopoverV2Skeleton
                                    popoverTokens={popoverTokens}
                                    size={size}
                                    bodySkeleton={{
                                        show: showBodySkeleton || false,
                                        width:
                                            skeleton?.bodySkeletonProps
                                                ?.width || '100%',
                                        height:
                                            skeleton?.bodySkeletonProps
                                                ?.height || 200,
                                    }}
                                    skeletonVariant={skeletonVariant}
                                />
                            ) : (
                                children
                            )}
                            <PopoverV2Footer
                                popoverTokens={popoverTokens}
                                primaryAction={primaryAction}
                                secondaryAction={secondaryAction}
                                size={size}
                                showSkeleton={shouldShowSkeleton}
                                skeletonVariant={skeletonVariant}
                            />
                        </AnimatedPopoverSurface>
                    </RadixPopover.Content>
                </RadixPopover.Portal>
            </RadixPopover.Root>
        )
    }
)

PopoverV2.displayName = 'PopoverV2'

export default PopoverV2
