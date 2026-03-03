import { useState, useEffect, useId } from 'react'
import styled from 'styled-components'
import * as RadixPopover from '@radix-ui/react-popover'
import Block from '../Primitives/Block/Block'
import { PopoverProps, PopoverSize } from './types'
import PopoverHeader from './PopoverHeader'
import PopoverFooter from './PopoverFooter'
import { PopoverTokenType } from './popover.tokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import MobilePopover from './MobilePopover'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { popoverContentAnimations } from './popover.animations'
import PopoverSkeleton from './PopoverSkeleton'

const AnimatedPopoverSurface = styled(Block)`
    ${popoverContentAnimations}
`

const Popover = ({
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
    side = 'bottom',
    align = 'center',
    alignOffset = 0,
    width,
    minWidth = 300,
    maxWidth = 400,
    height,
    minHeight,
    maxHeight,
    zIndex = 101,
    size = PopoverSize.MEDIUM,
    onClose,
    shadow = 'lg',
    useDrawerOnMobile = true,
    avoidCollisions = true,
    skeleton,
}: PopoverProps) => {
    const [isOpen, setIsOpen] = useState(open || false)
    const popoverTokens = useResponsiveTokens<PopoverTokenType>('POPOVER')
    const { innerWidth } = useBreakpoints()
    const isMobile = innerWidth < 1024

    const isCustomPopover =
        !heading && !description && !primaryAction && !secondaryAction

    const shouldShowSkeleton = skeleton?.show
    const skeletonVariant = skeleton?.variant || 'pulse'

    // Generate unique IDs for accessibility (WCAG 4.1.2 Name, Role, Value)
    const baseId = useId()
    const headingId = heading ? `${baseId}-heading` : undefined
    const descriptionId = description ? `${baseId}-description` : undefined

    // Construct aria-describedby to link description if present (WCAG 1.3.1 Info and Relationships)
    const ariaDescribedBy = descriptionId || undefined

    useEffect(() => {
        if (open !== undefined) {
            setIsOpen(open)
        }
    }, [open])

    if (isMobile && useDrawerOnMobile) {
        return (
            <MobilePopover
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
            </MobilePopover>
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
                        <PopoverHeader
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
                            <PopoverSkeleton
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
                        <PopoverFooter
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

Popover.displayName = 'Popover'

export default Popover
