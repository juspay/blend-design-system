'use client'

import React, { forwardRef } from 'react'
import { Drawer as VaulDrawer } from 'vaul'
import styled from 'styled-components'
import { useComponentToken } from '../../../context/useComponentToken'
import Block from '../../Primitives/Block/Block'
import type { DrawerTokensType } from '../drawer.tokens'
import type {
    DrawerProps,
    DrawerTriggerProps,
    DrawerContentProps,
    DrawerHeaderProps,
    DrawerTitleProps,
    DrawerDescriptionProps,
    DrawerFooterProps,
    DrawerCloseProps,
} from '../types'

const StyledOverlay = styled(VaulDrawer.Overlay)<{ tokens: DrawerTokensType }>`
    position: fixed;
    inset: 0;
    background-color: ${({ tokens }) => tokens.overlay.backgroundColor};
    z-index: ${({ tokens }) => tokens.overlay.zIndex};
`

const StyledContent = styled(VaulDrawer.Content)<{
    tokens: DrawerTokensType
    direction: 'top' | 'bottom' | 'left' | 'right'
    hasSnapPoints?: boolean
    mobileOffset?: {
        top?: string
        bottom?: string
        left?: string
        right?: string
    }
}>`
    z-index: ${({ tokens }) => tokens.content.zIndex};
    background-color: ${({ tokens }) => tokens.content.backgroundColor};
    border: ${({ tokens }) => tokens.content.border};
    box-shadow: ${({ tokens }) => tokens.content.boxShadow};
    outline: none;
    display: flex;
    flex-direction: column;

    ${({ direction, tokens, hasSnapPoints, mobileOffset }) => {
        const offset = {
            top: mobileOffset?.top ?? tokens.mobileOffset.top,
            bottom: mobileOffset?.bottom ?? tokens.mobileOffset.bottom,
            left: mobileOffset?.left ?? tokens.mobileOffset.left,
            right: mobileOffset?.right ?? tokens.mobileOffset.right,
        }

        if (direction === 'bottom') {
            return `
                position: fixed;
                bottom: ${offset.bottom};
                left: ${offset.left};
                right: ${offset.right};
                ${
                    hasSnapPoints
                        ? `height: calc(100% - calc(${offset.top} + ${offset.bottom}));
                           max-height: calc(97% - calc(${offset.top} + ${offset.bottom}));`
                        : `top: ${offset.top};`
                }
                border-radius: ${tokens.content.borderRadius};
                
                @media (min-width: 1024px) {
                    ${
                        !hasSnapPoints
                            ? `
                        bottom: 0;
                        left: 0;
                        right: 0;
                        top: auto;
                    `
                            : `
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 100%;
                        max-height: 97%;
                        top: 0;
                    `
                    }
                }
            `
        }
        if (direction === 'top') {
            return `
                ${
                    !hasSnapPoints
                        ? `
                    position: fixed;
                    top: ${offset.top};
                    left: ${offset.left};
                    right: ${offset.right};
                `
                        : `
                    position: fixed;
                    top: ${offset.top};
                    left: ${offset.left};
                    right: ${offset.right};
                    height: calc(100% - calc(${offset.top} + ${offset.bottom}));
                    max-height: calc(97% - calc(${offset.top} + ${offset.bottom}));
                `
                }
                border-radius: ${tokens.content.borderRadius};
                
                @media (min-width: 1024px) {
                    ${
                        !hasSnapPoints
                            ? `
                        top: 0;
                        left: 0;
                        right: 0;
                    `
                            : `
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 100%;
                        max-height: 97%;
                    `
                    }
                }
            `
        }
        if (direction === 'left') {
            return `
                position: fixed;
                top: ${offset.top};
                bottom: ${offset.bottom};
                left: ${offset.left};
                border-radius: ${tokens.content.borderRadius};
                width: calc(100% - calc(${offset.left} + ${offset.right}));
                max-width: 400px;
                
                @media (min-width: 1024px) {
                    top: 0;
                    bottom: 0;
                    left: 0;
                    width: 400px;
                }
            `
        }
        if (direction === 'right') {
            return `
                position: fixed;
                top: ${offset.top};
                bottom: ${offset.bottom};
                right: ${offset.right};
                border-radius: ${tokens.content.borderRadius};
                width: calc(100% - calc(${offset.left} + ${offset.right}));
                max-width: 400px;
                
                @media (min-width: 1024px) {
                    top: 0;
                    bottom: 0;
                    right: 0;
                    width: 400px;
                }
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

export const Drawer = ({
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
    snapToSequentialPoint = false,
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
    if (onSnapPointChange) vaulProps.setActiveSnapPoint = onSnapPointChange
    if (fadeFromIndex !== undefined) vaulProps.fadeFromIndex = fadeFromIndex
    if (snapToSequentialPoint)
        vaulProps.snapToSequentialPoint = snapToSequentialPoint

    return <RootComponent {...vaulProps}>{children}</RootComponent>
}

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
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

export const DrawerPortal = VaulDrawer.Portal

export const DrawerOverlay = forwardRef<HTMLDivElement, { className?: string }>(
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

export const DrawerContent = forwardRef<
    HTMLDivElement,
    DrawerContentProps & {
        direction?: 'top' | 'bottom' | 'left' | 'right'
        showHandle?: boolean
        handle?: React.ReactNode
        hasSnapPoints?: boolean
        mobileOffset?: {
            top?: string
            bottom?: string
            left?: string
            right?: string
        }
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
            hasSnapPoints = false,
            mobileOffset,
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
                hasSnapPoints={hasSnapPoints}
                mobileOffset={mobileOffset}
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

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
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

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
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

export const DrawerDescription = forwardRef<
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

export const DrawerBody = forwardRef<
    HTMLDivElement,
    {
        children: React.ReactNode
        className?: string
        overflowY?: 'auto' | 'hidden' | 'scroll' | 'visible'
        noPadding?: boolean
    }
>(({ children, className, overflowY, noPadding = false, ...props }, ref) => {
    const tokens = useComponentToken('DRAWER') as DrawerTokensType

    return (
        <Block
            ref={ref}
            className={className}
            padding={noPadding ? 0 : tokens.body.padding}
            backgroundColor={tokens.body.backgroundColor}
            flexGrow={1}
            overflowY={overflowY || tokens.body.overflowY}
            {...props}
        >
            {children}
        </Block>
    )
})

DrawerBody.displayName = 'DrawerBody'

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
    ({ children, className, ...props }, ref) => {
        const tokens = useComponentToken('DRAWER') as DrawerTokensType

        return (
            <Block
                ref={ref}
                className={className}
                padding={tokens.footer.padding}
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

export const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
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
