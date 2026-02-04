'use client'
import './Drawer.css'

import React, { forwardRef, useContext, useId } from 'react'
import { Drawer as VaulDrawer } from 'vaul'
import styled from 'styled-components'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
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

const DrawerConfigContext = React.createContext<{ disableDrag: boolean }>({
    disableDrag: false,
})

interface DrawerAccessibilityContextValue {
    titleId?: string
    descriptionId?: string
    setTitleId: (id: string | undefined) => void
    setDescriptionId: (id: string | undefined) => void
}

const DrawerAccessibilityContext =
    React.createContext<DrawerAccessibilityContextValue | null>(null)

type DrawerOpenChangeContextValue = {
    onOpenChange?: (open: boolean) => void
}

const DrawerOpenChangeContext =
    React.createContext<DrawerOpenChangeContextValue>({
        onOpenChange: undefined,
    })

const StyledOverlay = styled(VaulDrawer.Overlay)<{ tokens: DrawerTokensType }>`
    position: fixed;
    inset: 0;
    background-color: ${({ tokens }) => tokens.overlay.backgroundColor};
    z-index: 99;
`

const StyledContent = styled(VaulDrawer.Content)<{
    tokens: DrawerTokensType
    direction: 'top' | 'bottom' | 'left' | 'right'
    hasSnapPoints?: boolean
    contentDriven?: boolean
    customWidth?: string | number
    customMaxWidth?: string | number
    customMargin?: string | number
    mobileOffset?: {
        top?: string
        bottom?: string
        left?: string
        right?: string
    }
    fullScreen?: boolean
}>`
    z-index: 100;
    background-color: ${({ tokens }) => tokens.content.backgroundColor};
    outline: none;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    ${({ customMargin, tokens }) =>
        customMargin !== '0px' && customMargin
            ? `margin: ${
                  typeof customMargin === 'number'
                      ? `${customMargin}px`
                      : customMargin
              };
              border-radius: ${tokens.borderRadius.topLeft} ${tokens.borderRadius.topRight} ${tokens.borderRadius.bottomRight} ${tokens.borderRadius.bottomLeft};`
            : ''}

    ${({
        direction,
        tokens,
        hasSnapPoints,
        contentDriven,
        customWidth,
        customMaxWidth,
        mobileOffset,
        fullScreen,
    }) => {
        const offset = {
            top: mobileOffset?.top ?? tokens.offset.top,
            bottom: mobileOffset?.bottom ?? tokens.offset.bottom,
            left: mobileOffset?.left ?? tokens.offset.left,
            right: mobileOffset?.right ?? tokens.offset.right,
        }

        if (fullScreen) {
            return `
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 100%;
                border-radius: 0;
                max-width: 100%;
                max-height: 100%;
            `
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
                        : contentDriven
                          ? `max-height: calc(100% - calc(${offset.top} + ${offset.bottom}));`
                          : `top: ${offset.top};`
                }
                border-radius: ${tokens.borderRadius.topLeft} ${tokens.borderRadius.topRight} ${tokens.borderRadius.bottomRight} ${tokens.borderRadius.bottomLeft};
                
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
                border-radius: ${tokens.borderRadius.topLeft} ${tokens.borderRadius.topRight} ${tokens.borderRadius.bottomRight} ${tokens.borderRadius.bottomLeft};
                
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
            const widthValue =
                typeof customWidth === 'number'
                    ? `${customWidth}px`
                    : customWidth || '400px'
            const maxWidthValue =
                typeof customMaxWidth === 'number'
                    ? `${customMaxWidth}px`
                    : customMaxWidth || '400px'

            const hasOffset =
                mobileOffset?.left !== undefined ||
                mobileOffset?.right !== undefined ||
                mobileOffset?.top !== undefined ||
                mobileOffset?.bottom !== undefined

            return `
                position: fixed;
                top: ${hasOffset ? offset.top : '0'};
                bottom: ${hasOffset ? offset.bottom : '0'};
                left: ${hasOffset ? offset.left : '0'};
                width: ${maxWidthValue};

                @media (min-width: 1024px) {
                    width: ${widthValue};
                }
            `
        }
        if (direction === 'right') {
            const widthValue =
                typeof customWidth === 'number'
                    ? `${customWidth}px`
                    : customWidth || '400px'
            const maxWidthValue =
                typeof customMaxWidth === 'number'
                    ? `${customMaxWidth}px`
                    : customMaxWidth || '400px'

            const hasOffset =
                mobileOffset?.left !== undefined ||
                mobileOffset?.right !== undefined ||
                mobileOffset?.top !== undefined ||
                mobileOffset?.bottom !== undefined

            return `
                position: fixed;
                top: ${hasOffset ? offset.top : '0'};
                bottom: ${hasOffset ? offset.bottom : '0'};
                right: ${hasOffset ? offset.right : '0'};
                width: ${widthValue};
                max-width: ${maxWidthValue};
                user-select: text;
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
            `
        }
    }}
`

const StyledTitle = styled(VaulDrawer.Title)`
    margin: 0;
    font-weight: 600;
`

const StyledDescription = styled(VaulDrawer.Description)`
    margin: 4px 0 0 0;
    opacity: 0.7;
`

const getDrawerBorderRadius = (
    direction: 'top' | 'bottom' | 'left' | 'right',
    tokens: DrawerTokensType
) => {
    if (direction === 'bottom') {
        return `0 0 ${tokens.borderRadius.bottomRight} ${tokens.borderRadius.bottomLeft}`
    }
    if (direction === 'top') {
        return `${tokens.borderRadius.topLeft} ${tokens.borderRadius.topRight} 0 0`
    }
    if (direction === 'left') {
        return `0 0 0 ${tokens.borderRadius.bottomLeft}`
    }
    if (direction === 'right') {
        return `0 0 ${tokens.borderRadius.bottomRight} 0`
    }
    return undefined
}

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
    disableDrag = false,
    children,
}: DrawerProps) => {
    const RootComponent = nested ? VaulDrawer.NestedRoot : VaulDrawer.Root
    const [titleId, setTitleId] = React.useState<string | undefined>(undefined)
    const [descriptionId, setDescriptionId] = React.useState<
        string | undefined
    >(undefined)

    // Screen reader announcement for drawer state changes
    React.useEffect(() => {
        if (open) {
            // Announce drawer opening to screen readers
            const announcement = document.createElement('div')
            announcement.setAttribute('role', 'status')
            announcement.setAttribute('aria-live', 'polite')
            announcement.setAttribute('aria-atomic', 'true')
            announcement.style.position = 'absolute'
            announcement.style.left = '-10000px'
            announcement.style.width = '1px'
            announcement.style.height = '1px'
            announcement.style.overflow = 'hidden'
            announcement.textContent = 'Drawer opened'
            document.body.appendChild(announcement)

            // Remove announcement after screen reader has time to read it
            const timer = setTimeout(() => {
                if (document.body.contains(announcement)) {
                    document.body.removeChild(announcement)
                }
            }, 1000)

            return () => {
                clearTimeout(timer)
                if (document.body.contains(announcement)) {
                    document.body.removeChild(announcement)
                }
            }
        }
    }, [open])

    const vaulProps: Record<string, unknown> = {
        open,
        onOpenChange,
        direction,
        modal,
        dismissible,
        handleOnly: disableDrag,
    }

    if (snapPoints) vaulProps.snapPoints = snapPoints
    if (activeSnapPoint !== undefined)
        vaulProps.activeSnapPoint = activeSnapPoint
    if (onSnapPointChange) vaulProps.setActiveSnapPoint = onSnapPointChange
    if (fadeFromIndex !== undefined) vaulProps.fadeFromIndex = fadeFromIndex
    if (snapToSequentialPoint)
        vaulProps.snapToSequentialPoint = snapToSequentialPoint

    return (
        <DrawerConfigContext.Provider value={{ disableDrag }}>
            <DrawerOpenChangeContext.Provider value={{ onOpenChange }}>
                <DrawerAccessibilityContext.Provider
                    value={{
                        titleId,
                        descriptionId,
                        setTitleId,
                        setDescriptionId,
                    }}
                >
                    <RootComponent {...vaulProps}>{children}</RootComponent>
                </DrawerAccessibilityContext.Provider>
            </DrawerOpenChangeContext.Provider>
        </DrawerConfigContext.Provider>
    )
}

export const DrawerTrigger = forwardRef<
    HTMLButtonElement,
    DrawerTriggerProps & {
        'aria-label'?: string
    }
>(
    (
        {
            children,
            className,
            disabled,
            onClick,
            'aria-label': ariaLabel,
            ...props
        },
        ref
    ) => {
        // Pass through aria-label if provided
        // When asChild is used, the aria-label will be merged with the child element
        return (
            <VaulDrawer.Trigger
                ref={ref}
                className={className}
                disabled={disabled}
                onClick={onClick}
                asChild
                aria-label={ariaLabel}
                data-element="drawer-trigger"
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
        const tokens = useResponsiveTokens<DrawerTokensType>('DRAWER')

        return (
            <StyledOverlay
                ref={ref}
                className={className}
                tokens={tokens}
                data-drawer="drawer"
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
        contentDriven?: boolean
        width?: string | number
        maxWidth?: string | number
        offSet?: string | number
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
            contentDriven = false,
            width,
            maxWidth,
            offSet,
            mobileOffset,
            fullScreen = false,
            'aria-label': ariaLabel,
            'aria-describedby': ariaDescribedBy,
            ...props
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<DrawerTokensType>('DRAWER')
        const { disableDrag } = useContext(DrawerConfigContext)
        const resolvedShowHandle = disableDrag ? false : showHandle
        const accessibilityContext = useContext(DrawerAccessibilityContext)

        // Use provided aria-describedby or fall back to context descriptionId
        const finalAriaDescribedBy =
            ariaDescribedBy || accessibilityContext?.descriptionId || undefined

        // Use provided aria-label or fall back to context titleId for aria-labelledby
        const ariaLabelledBy = accessibilityContext?.titleId || undefined

        return (
            <StyledContent
                ref={ref}
                className={`drawer-content ${className || ''}`}
                style={style}
                tokens={tokens}
                direction={direction}
                hasSnapPoints={hasSnapPoints}
                contentDriven={contentDriven}
                customWidth={width}
                customMaxWidth={maxWidth}
                customMargin={offSet}
                mobileOffset={mobileOffset}
                fullScreen={fullScreen}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={finalAriaDescribedBy}
                {...props}
            >
                {resolvedShowHandle &&
                    !fullScreen &&
                    (direction === 'bottom' || direction === 'top') &&
                    (handle || (
                        <Block
                            width={tokens.content.handle.width}
                            height={tokens.content.handle.height}
                            backgroundColor={
                                tokens.content.handle.backgroundColor
                            }
                            borderRadius={tokens.content.handle.borderRadius}
                            margin={
                                direction === 'bottom'
                                    ? '14px auto 14px auto'
                                    : '0 auto 16px auto'
                            }
                            flexShrink={0}
                            alignSelf="center"
                            style={
                                direction === 'top' ? { order: 999 } : undefined
                            }
                            aria-hidden="true"
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
        const tokens = useResponsiveTokens<DrawerTokensType>('DRAWER')

        return (
            <Block
                ref={ref}
                className={className}
                backgroundColor={tokens.content.backgroundColor}
                padding={
                    tokens.content.padding.x + ' ' + tokens.content.padding.y
                }
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
    ({ children, className, id: providedId, ...props }, ref) => {
        const accessibilityContext = useContext(DrawerAccessibilityContext)
        const generatedId = useId()
        const id = providedId || generatedId

        // Register the ID with the accessibility context
        React.useEffect(() => {
            if (accessibilityContext) {
                accessibilityContext.setTitleId(id)
                return () => {
                    accessibilityContext.setTitleId(undefined)
                }
            }
        }, [id, accessibilityContext])

        return (
            <StyledTitle
                ref={ref}
                className={className}
                id={id}
                {...props}
                data-element="drawer-header"
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
>(({ children, className, id: providedId, ...props }, ref) => {
    const accessibilityContext = useContext(DrawerAccessibilityContext)
    const generatedId = useId()
    const id = providedId || generatedId

    // Register the ID with the accessibility context
    React.useEffect(() => {
        if (accessibilityContext) {
            accessibilityContext.setDescriptionId(id)
            return () => {
                accessibilityContext.setDescriptionId(undefined)
            }
        }
    }, [id, accessibilityContext])

    return (
        <StyledDescription
            ref={ref}
            className={className}
            id={id}
            {...props}
            data-element="drawer-header-subtitle"
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
        hasFooter?: boolean
        direction?: 'top' | 'bottom' | 'left' | 'right'
    }
>(
    (
        {
            children,
            className,
            overflowY = 'auto',
            noPadding = false,
            hasFooter = false,
            direction = 'bottom',
            ...props
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<DrawerTokensType>('DRAWER')

        return (
            <Block
                data-element="drawer-body"
                ref={ref}
                className={`drawer-body ${className || ''}`}
                padding={
                    noPadding
                        ? 0
                        : tokens.content.padding.x +
                          ' ' +
                          tokens.content.padding.y
                }
                backgroundColor={tokens.content.backgroundColor}
                borderRadius={
                    hasFooter
                        ? undefined
                        : getDrawerBorderRadius(direction, tokens)
                }
                flexGrow={1}
                overflowY={overflowY}
                {...props}
            >
                {children}
            </Block>
        )
    }
)

DrawerBody.displayName = 'DrawerBody'

export const DrawerFooter = forwardRef<
    HTMLDivElement,
    DrawerFooterProps & {
        direction?: 'top' | 'bottom' | 'left' | 'right'
    }
>(({ children, className, direction = 'bottom', ...props }, ref) => {
    const tokens = useResponsiveTokens<DrawerTokensType>('DRAWER')

    return (
        <Block
            data-element="drawer-footer"
            ref={ref}
            className={className}
            padding={tokens.content.padding.x + ' ' + tokens.content.padding.y}
            backgroundColor={tokens.content.backgroundColor}
            borderRadius={getDrawerBorderRadius(direction, tokens)}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap="12px"
            flexShrink={0}
            {...props}
        >
            {children}
        </Block>
    )
})

DrawerFooter.displayName = 'DrawerFooter'

export const DrawerClose = forwardRef<
    HTMLButtonElement,
    DrawerCloseProps & {
        'aria-label'?: string
    }
>(
    (
        {
            children,
            className,
            disabled,
            asChild,
            'aria-label': ariaLabel,
            ...props
        },
        ref
    ) => {
        return (
            <VaulDrawer.Close
                ref={ref}
                className={className}
                disabled={disabled}
                asChild={asChild}
                aria-label={ariaLabel}
                data-element="drawer-action-buttons"
                {...props}
            >
                {children}
            </VaulDrawer.Close>
        )
    }
)

DrawerClose.displayName = 'DrawerClose'
