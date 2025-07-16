'use client'

import React, { forwardRef } from 'react'
import { Drawer as VaulDrawer } from 'vaul'
import styled from 'styled-components'
import { useComponentToken } from '../../context/useComponentToken'
import Block from '../Primitives/Block/Block'
import type { DrawerTokensType } from './drawer.tokens'
import type {
    DrawerProps,
    DrawerTriggerProps,
    DrawerContentProps,
    DrawerHeaderProps,
    DrawerTitleProps,
    DrawerDescriptionProps,
    DrawerFooterProps,
    DrawerCloseProps,
} from './types'

const StyledOverlay = styled(VaulDrawer.Overlay)<{ tokens: DrawerTokensType }>`
    position: fixed;
    inset: 0;
    background-color: ${({ tokens }) => tokens.overlay.backgroundColor};
    z-index: ${({ tokens }) => tokens.overlay.zIndex};
`

const StyledContent = styled(VaulDrawer.Content)<{
    tokens: DrawerTokensType
    direction: 'top' | 'bottom' | 'left' | 'right'
}>`
    position: fixed;
    z-index: ${({ tokens }) => tokens.content.zIndex};
    background-color: ${({ tokens }) => tokens.content.backgroundColor};
    border: ${({ tokens }) => tokens.content.border};
    box-shadow: ${({ tokens }) => tokens.content.boxShadow};
    outline: none;
    display: flex;
    flex-direction: column;

    ${({ direction, tokens }) => {
        if (direction === 'bottom') {
            return `
                bottom: 0;
                left: 0;
                right: 0;
                border-radius: ${tokens.content.borderRadius};
                height: 40vh;
            `
        }
        if (direction === 'top') {
            return `
                top: 0;
                left: 0;
                right: 0;
                border-radius: ${tokens.content.borderRadius};
                height: 40vh;
            `
        }
        if (direction === 'left') {
            return `
                top: 0;
                bottom: 0;
                left: 0;
                border-radius: ${tokens.content.borderRadius};
                width: 400px;
            `
        }
        if (direction === 'right') {
            return `
                top: 0;
                bottom: 0;
                right: 0;
                border-radius: ${tokens.content.borderRadius};
                width: 400px;
            `
        }
    }}
`

const StyledTitle = styled(VaulDrawer.Title)<{ tokens: DrawerTokensType }>`
    color: ${({ tokens }) => tokens.header.title.color};
    font-size: ${({ tokens }) => tokens.header.title.fontSize}px;
    font-weight: ${({ tokens }) => tokens.header.title.fontWeight};
    line-height: ${({ tokens }) => tokens.header.title.lineHeight}px;
    margin: 0;
`

const StyledDescription = styled(VaulDrawer.Description)<{
    tokens: DrawerTokensType
}>`
    color: ${({ tokens }) => tokens.header.description.color};
    font-size: ${({ tokens }) => tokens.header.description.fontSize}px;
    line-height: ${({ tokens }) => tokens.header.description.lineHeight}px;
    margin: 4px 0 0 0;
`

const Drawer = ({
    open,
    onOpenChange,
    direction = 'bottom',
    modal = true,
    dismissible = true,
    nested = false,
    snapPoints,
    activeSnapPoint,
    onSnapPointChange,
    fadeFromIndex,
    children,
}: DrawerProps) => {
    const RootComponent = nested ? VaulDrawer.NestedRoot : VaulDrawer.Root

    const vaulProps: Record<string, unknown> = {
        open,
        onOpenChange,
        direction,
        modal,
        dismissible,
    }

    if (snapPoints) vaulProps.snapPoints = snapPoints
    if (activeSnapPoint !== undefined)
        vaulProps.activeSnapPoint = activeSnapPoint
    if (onSnapPointChange) vaulProps.onSnapPointChange = onSnapPointChange
    if (fadeFromIndex !== undefined) vaulProps.fadeFromIndex = fadeFromIndex

    return <RootComponent {...vaulProps}>{children}</RootComponent>
}

const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
    ({ children, className, disabled, onClick, ...props }, ref) => {
        return (
            <VaulDrawer.Trigger
                ref={ref}
                className={className}
                disabled={disabled}
                onClick={onClick}
                asChild
                {...props}
            >
                {children}
            </VaulDrawer.Trigger>
        )
    }
)

DrawerTrigger.displayName = 'DrawerTrigger'

const DrawerPortal = VaulDrawer.Portal

const DrawerOverlay = forwardRef<HTMLDivElement, { className?: string }>(
    ({ className, ...props }, ref) => {
        const tokens = useComponentToken('DRAWER') as DrawerTokensType

        return (
            <StyledOverlay
                ref={ref}
                className={className}
                tokens={tokens}
                {...props}
            />
        )
    }
)

DrawerOverlay.displayName = 'DrawerOverlay'

const DrawerContent = forwardRef<
    HTMLDivElement,
    DrawerContentProps & {
        direction?: 'top' | 'bottom' | 'left' | 'right'
        showHandle?: boolean
        handle?: React.ReactNode
    }
>(
    (
        {
            children,
            className,
            style,
            direction = 'bottom',
            showHandle = true,
            handle,
            ...props
        },
        ref
    ) => {
        const tokens = useComponentToken('DRAWER') as DrawerTokensType

        return (
            <StyledContent
                ref={ref}
                className={className}
                style={style}
                tokens={tokens}
                direction={direction}
                {...props}
            >
                {showHandle &&
                    (direction === 'bottom' || direction === 'top') &&
                    (handle || (
                        <Block
                            width={tokens.handle.width}
                            height={tokens.handle.height}
                            backgroundColor={tokens.handle.backgroundColor}
                            borderRadius={tokens.handle.borderRadius}
                            margin={
                                direction === 'bottom'
                                    ? '8px auto 0 auto'
                                    : '0 auto 8px auto'
                            }
                            flexShrink={0}
                            alignSelf="center"
                            style={
                                direction === 'top' ? { order: 999 } : undefined
                            }
                        />
                    ))}
                {children}
            </StyledContent>
        )
    }
)

DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
    ({ children, className, ...props }, ref) => {
        const tokens = useComponentToken('DRAWER') as DrawerTokensType

        return (
            <Block
                ref={ref}
                className={className}
                padding={tokens.header.padding}
                borderBottom={tokens.header.borderBottom}
                backgroundColor={tokens.header.backgroundColor}
                flexShrink={0}
                {...props}
            >
                {children}
            </Block>
        )
    }
)

DrawerHeader.displayName = 'DrawerHeader'

const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
    ({ children, className, ...props }, ref) => {
        const tokens = useComponentToken('DRAWER') as DrawerTokensType

        return (
            <StyledTitle
                ref={ref}
                className={className}
                tokens={tokens}
                {...props}
            >
                {children}
            </StyledTitle>
        )
    }
)

DrawerTitle.displayName = 'DrawerTitle'

const DrawerDescription = forwardRef<
    HTMLParagraphElement,
    DrawerDescriptionProps
>(({ children, className, ...props }, ref) => {
    const tokens = useComponentToken('DRAWER') as DrawerTokensType

    return (
        <StyledDescription
            ref={ref}
            className={className}
            tokens={tokens}
            {...props}
        >
            {children}
        </StyledDescription>
    )
})

DrawerDescription.displayName = 'DrawerDescription'

const DrawerBody = forwardRef<
    HTMLDivElement,
    { children: React.ReactNode; className?: string }
>(({ children, className, ...props }, ref) => {
    const tokens = useComponentToken('DRAWER') as DrawerTokensType

    return (
        <Block
            ref={ref}
            className={className}
            padding={tokens.body.padding}
            backgroundColor={tokens.body.backgroundColor}
            flexGrow={1}
            overflowY={tokens.body.overflowY}
            maxHeight={tokens.body.maxHeight}
            {...props}
        >
            {children}
        </Block>
    )
})

DrawerBody.displayName = 'DrawerBody'

const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
    ({ children, className, ...props }, ref) => {
        const tokens = useComponentToken('DRAWER') as DrawerTokensType

        return (
            <Block
                ref={ref}
                className={className}
                padding={tokens.footer.padding}
                borderTop={tokens.footer.borderTop}
                backgroundColor={tokens.footer.backgroundColor}
                display="flex"
                alignItems={tokens.footer.alignItems}
                justifyContent={tokens.footer.justifyContent}
                gap={tokens.footer.gap}
                flexShrink={0}
                {...props}
            >
                {children}
            </Block>
        )
    }
)

DrawerFooter.displayName = 'DrawerFooter'

const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
    ({ children, className, disabled, ...props }, ref) => {
        return (
            <VaulDrawer.Close
                ref={ref}
                className={className}
                disabled={disabled}
                {...props}
            >
                {children}
            </VaulDrawer.Close>
        )
    }
)

DrawerClose.displayName = 'DrawerClose'

export {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerBody,
    DrawerFooter,
    DrawerClose,
}

export default Drawer
