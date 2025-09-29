import { useState, useEffect } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import Block from '../Primitives/Block/Block'
import { PopoverProps, PopoverSize } from './types'
import PopoverHeader from './PopoverHeader'
import PopoverFooter from './PopoverFooter'
import { PopoverTokenType } from './popover.tokens'
import { useComponentToken } from '../../context/useComponentToken'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import MobilePopover from './MobilePopover'

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
    zIndex = 999,
    size = PopoverSize.MEDIUM,
    onClose,
    shadow = 'lg',
    useDrawerOnMobile = true,
}: PopoverProps) => {
    const [isOpen, setIsOpen] = useState(open || false)
    const popoverTokens = useComponentToken('POPOVER') as PopoverTokenType
    const { innerWidth } = useBreakpoints()
    const isMobile = innerWidth < 1024

    const isCustomPopover =
        !heading && !description && !primaryAction && !secondaryAction

    useEffect(() => {
        if (open !== undefined) {
            setIsOpen(open)
        }
    }, [open])

    if (isMobile && useDrawerOnMobile) {
        return (
            <MobilePopover
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
            <RadixPopover.Content
                style={{ zIndex, outline: 'none' }}
                asChild
                sideOffset={sideOffset}
                side={side}
                align={align}
                alignOffset={alignOffset}
                // avoidCollisions={true}
            >
                <Block
                    zIndex={999}
                    backgroundColor={popoverTokens.background}
                    boxShadow={
                        popoverTokens.shadow?.[shadow] ||
                        popoverTokens.shadow?.lg
                    }
                    borderRadius={popoverTokens.borderRadius}
                    border={popoverTokens.border}
                    width={width}
                    minWidth={minWidth}
                    maxWidth={maxWidth}
                    height={height}
                    minHeight={minHeight}
                    maxHeight={maxHeight}
                    display="flex"
                    flexDirection="column"
                    gap={popoverTokens.gap}
                    paddingLeft={
                        isCustomPopover ? 0 : popoverTokens.padding.horizontal
                    }
                    paddingRight={
                        isCustomPopover ? 0 : popoverTokens.padding.horizontal
                    }
                    paddingTop={isCustomPopover ? 0 : popoverTokens.padding.top}
                    paddingBottom={
                        isCustomPopover ? 0 : popoverTokens.padding.bottom
                    }
                >
                    <PopoverHeader
                        heading={heading}
                        description={description}
                        showCloseButton={showCloseButton}
                        size={size}
                        onClose={() => {
                            setIsOpen(false)
                            if (onClose) {
                                onClose()
                            }
                        }}
                    />
                    {children}
                    <PopoverFooter
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                    />
                </Block>
            </RadixPopover.Content>
        </RadixPopover.Root>
    )
}

Popover.displayName = 'Popover'

export default Popover
