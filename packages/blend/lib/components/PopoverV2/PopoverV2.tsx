import { useState, useEffect, useId } from 'react'
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

const PopoverV2 = ({
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
    zIndex = 101,
    size = PopoverV2Size.MD,
    onClose,
    shadow = 'lg',
    useDrawerOnMobile = true,
    avoidCollisions = true,
    skeleton,
}: PopoverV2Props) => {
    const [isOpen, setIsOpen] = useState(open || false)
    const popoverTokens = useResponsiveTokens<PopoverV2TokenType>('POPOVERV2')
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isMobile = breakPointLabel === 'sm'

    const isCustomPopover =
        !heading && !description && !primaryAction && !secondaryAction

    const shouldShowSkeleton = skeleton?.show
    const skeletonVariant = skeleton?.variant || 'pulse'

    const baseId = useId()
    const headingId = heading ? `${baseId}-heading` : undefined
    const descriptionId = description ? `${baseId}-description` : undefined

    const ariaDescribedBy = descriptionId || undefined

    useEffect(() => {
        if (open !== undefined) {
            setIsOpen(open)
        }
    }, [open])

    if (isMobile && useDrawerOnMobile) {
        return (
            <MobilePopoverV2
                skeleton={skeleton}
                open={isOpen}
                onOpenChange={(open) => {
                    setIsOpen(open)
                    if (onOpenChange) {
                        onOpenChange(open)
                    }
                }}
                heading={heading}
                description={description}
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
                showCloseButton={showCloseButton}
                onClose={() => {
                    setIsOpen(false)
                    if (onClose) {
                        onClose()
                    }
                }}
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
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open)
                if (onOpenChange) {
                    onOpenChange(open)
                }
            }}
            modal={asModal}
        >
            <RadixPopover.Trigger asChild style={{ outline: 'none' }}>
                {trigger}
            </RadixPopover.Trigger>
            <RadixPopover.Portal>
                <RadixPopover.Content
                    data-popover={heading || 'Popover'}
                    style={{ zIndex, outline: 'none', minWidth, maxWidth }}
                    asChild
                    sideOffset={sideOffset}
                    side={side}
                    align={align}
                    alignOffset={alignOffset}
                    avoidCollisions={avoidCollisions}
                >
                    <AnimatedPopoverSurface
                        style={{ zIndex }}
                        {...(headingId
                            ? { 'aria-labelledby': headingId }
                            : { 'aria-label': heading || 'Popover dialog' })}
                        {...(ariaDescribedBy
                            ? { 'aria-describedby': ariaDescribedBy }
                            : {})}
                        backgroundColor={popoverTokens.background}
                        boxShadow={
                            popoverTokens.shadow?.[shadow] ||
                            popoverTokens.shadow?.lg
                        }
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
                            onClose={() => {
                                setIsOpen(false)
                                if (onClose) {
                                    onClose()
                                }
                            }}
                            showSkeleton={shouldShowSkeleton}
                            skeletonVariant={skeletonVariant}
                        />
                        {shouldShowSkeleton &&
                        skeleton?.bodySkeletonProps?.show ? (
                            <PopoverV2Skeleton
                                popoverTokens={popoverTokens}
                                size={size}
                                bodySkeleton={{
                                    show:
                                        skeleton?.bodySkeletonProps?.show ||
                                        false,
                                    width:
                                        skeleton?.bodySkeletonProps?.width ||
                                        '100%',
                                    height:
                                        skeleton?.bodySkeletonProps?.height ||
                                        200,
                                }}
                                skeletonVariant={skeletonVariant}
                            />
                        ) : (
                            children
                        )}
                        <PopoverV2Footer
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

PopoverV2.displayName = 'PopoverV2'

export default PopoverV2
