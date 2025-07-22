'use client'

import React, { forwardRef, useState, useMemo } from 'react'
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
    StatusDrawerProps,
    SelectDrawerProps,
} from './types'
import { Button, ButtonSize, ButtonType } from '../Button'
import Text from '../Text/Text'
import { TextInput } from '../Inputs/TextInput'
import { Checkbox } from '../Checkbox'
import { FOUNDATION_THEME } from '../../tokens'

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
    {
        children: React.ReactNode
        className?: string
        overflowY?: 'auto' | 'hidden' | 'scroll' | 'visible'
    }
>(({ children, className, overflowY, ...props }, ref) => {
    const tokens = useComponentToken('DRAWER') as DrawerTokensType

    return (
        <Block
            ref={ref}
            className={className}
            padding={tokens.body.padding}
            backgroundColor={tokens.body.backgroundColor}
            flexGrow={1}
            overflowY={overflowY || tokens.body.overflowY}
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

const StatusDrawer = ({
    open,
    onOpenChange,
    heading,
    description,
    primaryButtonProps,
    secondaryButtonProps,
    slot,
    direction = 'bottom',
    modal = true,
    dismissible = true,
    mobileOffset,
    className,
    style,
}: StatusDrawerProps) => {
    const statusMobileOffset = {
        top: '60vh',
        bottom: '16px',
        left: '16px',
        right: '16px',
        ...mobileOffset,
    }

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            direction={direction}
            modal={modal}
            dismissible={dismissible}
        >
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    direction={direction}
                    showHandle={true}
                    mobileOffset={statusMobileOffset}
                    className={className}
                    style={style}
                >
                    <DrawerBody overflowY="visible">
                        <Block
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            textAlign="center"
                            gap={24}
                            paddingTop={FOUNDATION_THEME.unit[8]}
                        >
                            <Block
                                width="56px"
                                height="56px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexShrink={0}
                            >
                                {slot}
                            </Block>

                            <Block
                                display="flex"
                                flexDirection="column"
                                gap={8}
                                alignItems="center"
                            >
                                <Text
                                    variant="heading.sm"
                                    color={FOUNDATION_THEME.colors.gray[700]}
                                    fontWeight={600}
                                    textAlign="center"
                                >
                                    {heading}
                                </Text>
                                <Text
                                    variant="body.md"
                                    color={FOUNDATION_THEME.colors.gray[500]}
                                    textAlign="center"
                                    style={{ maxWidth: '280px' }}
                                >
                                    {description}
                                </Text>
                            </Block>

                            <Block
                                width="100%"
                                display="flex"
                                gap={16}
                                paddingTop={FOUNDATION_THEME.unit[16]}
                            >
                                {secondaryButtonProps && (
                                    <Button
                                        {...secondaryButtonProps}
                                        fullWidth={true}
                                        size={ButtonSize.LARGE}
                                    />
                                )}

                                <Button
                                    {...primaryButtonProps}
                                    fullWidth={true}
                                />
                            </Block>
                        </Block>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

StatusDrawer.displayName = 'StatusDrawer'

const MultiSelectDrawer = ({
    open,
    onOpenChange,
    heading,
    description,
    rightSlot,
    items,
    selectedValues = [],
    onSelectionChange,
    enableSearch = true,
    searchPlaceholder = 'Search',
    cancelText = 'Clear All',
    confirmText = 'Done',
    onCancel,
    onConfirm,
    showCancelButton = true,
    direction = 'bottom',
    modal = true,
    dismissible = true,
    mobileOffset,
    className,
    style,
}: Omit<
    SelectDrawerProps,
    'multiSelect' | 'selectedValue' | 'onValueChange'
>) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [internalSelectedValues, setInternalSelectedValues] =
        useState<string[]>(selectedValues)

    const selectMobileOffset = {
        top: '74px',
        bottom: '0px',
        left: '16px',
        right: '16px',
        ...mobileOffset,
    }

    const allItems = useMemo(() => {
        return items.flatMap((group) => group.items)
    }, [items])

    const filteredItems = useMemo(() => {
        if (!searchTerm) return items

        const filtered = allItems.filter(
            (item) =>
                item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.subLabel &&
                    item.subLabel
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
        )

        return [{ items: filtered }]
    }, [allItems, items, searchTerm])

    const handleItemToggle = (value: string) => {
        const newSelection = internalSelectedValues.includes(value)
            ? internalSelectedValues.filter((v) => v !== value)
            : [...internalSelectedValues, value]

        setInternalSelectedValues(newSelection)
        onSelectionChange?.(newSelection)
    }

    const handleClearAll = () => {
        setInternalSelectedValues([])
        onSelectionChange?.([])
        onCancel?.()
    }

    const handleConfirm = () => {
        onConfirm?.()
    }

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            direction={direction}
            modal={modal}
            dismissible={dismissible}
        >
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    direction={direction}
                    showHandle={true}
                    mobileOffset={selectMobileOffset}
                    className={className}
                    style={style}
                >
                    <Block
                        padding={`${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]} 0 ${FOUNDATION_THEME.unit[16]}`}
                        backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                        flexShrink={0}
                        position="relative"
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                            gap={FOUNDATION_THEME.unit[8]}
                        >
                            <Text
                                variant="body.lg"
                                color={FOUNDATION_THEME.colors.gray[800]}
                                fontWeight={600}
                            >
                                {heading}
                            </Text>
                            {rightSlot && (
                                <Block
                                    top={FOUNDATION_THEME.unit[16]}
                                    right={FOUNDATION_THEME.unit[16]}
                                    width="14px"
                                    height="14px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {rightSlot}
                                </Block>
                            )}
                        </Block>
                    </Block>

                    <Block
                        flexGrow={1}
                        overflowY="auto"
                        padding="0"
                        backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                    >
                        {description && (
                            <Block
                                padding={`0 ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]}`}
                            >
                                <Text
                                    variant="body.md"
                                    color={FOUNDATION_THEME.colors.gray[500]}
                                    textAlign="center"
                                >
                                    {description}
                                </Text>
                            </Block>
                        )}

                        {enableSearch && (
                            <Block
                                padding={`0 ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]}`}
                            >
                                <TextInput
                                    placeholder={searchPlaceholder}
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </Block>
                        )}

                        <Block display="flex" flexDirection="column">
                            {filteredItems.map((group, groupIndex) => (
                                <React.Fragment key={groupIndex}>
                                    {group.groupLabel && (
                                        <Block
                                            padding={`${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[16]}`}
                                        >
                                            <Text
                                                variant="body.sm"
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[600]
                                                }
                                                fontWeight={600}
                                            >
                                                {group.groupLabel}
                                            </Text>
                                        </Block>
                                    )}
                                    {group.items.map((item, itemIndex) => {
                                        const isSelected =
                                            internalSelectedValues.includes(
                                                item.value
                                            )
                                        const isLastInGroup =
                                            itemIndex === group.items.length - 1
                                        const isLastGroup =
                                            groupIndex ===
                                            filteredItems.length - 1
                                        const showBorder =
                                            !isLastInGroup || !isLastGroup

                                        return (
                                            <Block
                                                key={item.value}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                padding={`${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[16]}`}
                                                cursor={
                                                    item.disabled
                                                        ? 'not-allowed'
                                                        : 'pointer'
                                                }
                                                borderBottom={
                                                    showBorder
                                                        ? `1px solid ${FOUNDATION_THEME.colors.gray[150]}`
                                                        : 'none'
                                                }
                                                backgroundColor="transparent"
                                                onClick={
                                                    item.disabled
                                                        ? undefined
                                                        : () =>
                                                              handleItemToggle(
                                                                  item.value
                                                              )
                                                }
                                                opacity={
                                                    item.disabled ? 0.5 : 1
                                                }
                                            >
                                                <Block
                                                    display="flex"
                                                    alignItems="center"
                                                    gap={12}
                                                    flexGrow={1}
                                                >
                                                    {item.slot1 && (
                                                        <Block
                                                            width="24px"
                                                            height="24px"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            flexShrink={0}
                                                        >
                                                            {item.slot1}
                                                        </Block>
                                                    )}
                                                    <Block flexGrow={1}>
                                                        <Text
                                                            variant="body.md"
                                                            color={
                                                                isSelected
                                                                    ? FOUNDATION_THEME
                                                                          .colors
                                                                          .gray[700]
                                                                    : FOUNDATION_THEME
                                                                          .colors
                                                                          .gray[600]
                                                            }
                                                            fontWeight={
                                                                isSelected
                                                                    ? 600
                                                                    : 500
                                                            }
                                                            style={{
                                                                marginBottom:
                                                                    item.subLabel
                                                                        ? '2px'
                                                                        : '0',
                                                            }}
                                                        >
                                                            {item.label}
                                                        </Text>
                                                        {item.subLabel && (
                                                            <Text
                                                                variant="body.sm"
                                                                color={
                                                                    FOUNDATION_THEME
                                                                        .colors
                                                                        .gray[500]
                                                                }
                                                            >
                                                                {item.subLabel}
                                                            </Text>
                                                        )}
                                                    </Block>
                                                </Block>
                                                <Block flexShrink={0}>
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onCheckedChange={() =>
                                                            !item.disabled &&
                                                            handleItemToggle(
                                                                item.value
                                                            )
                                                        }
                                                        disabled={item.disabled}
                                                    />
                                                </Block>
                                            </Block>
                                        )
                                    })}
                                    {group.showSeparator &&
                                        groupIndex <
                                            filteredItems.length - 1 && (
                                            <Block
                                                height="1px"
                                                backgroundColor={
                                                    FOUNDATION_THEME.colors
                                                        .gray[300]
                                                }
                                                margin={`${FOUNDATION_THEME.unit[8]} 0`}
                                            />
                                        )}
                                </React.Fragment>
                            ))}
                        </Block>
                    </Block>

                    <DrawerFooter>
                        <Block display="flex" gap={12} width="100%">
                            {showCancelButton && (
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text={cancelText}
                                    onClick={handleClearAll}
                                    fullWidth={true}
                                />
                            )}
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text={confirmText}
                                onClick={handleConfirm}
                                fullWidth={true}
                            />
                        </Block>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

MultiSelectDrawer.displayName = 'MultiSelectDrawer'

const SingleSelectDrawer = ({
    open,
    onOpenChange,
    heading,
    description,
    rightSlot,
    items,
    selectedValue,
    onValueChange,
    enableSearch = true,
    searchPlaceholder = 'Search',
    cancelText = 'Clear',
    confirmText = 'Done',
    onCancel,
    onConfirm,
    showCancelButton = true,
    direction = 'bottom',
    modal = true,
    dismissible = true,
    mobileOffset,
    className,
    style,
}: Omit<
    SelectDrawerProps,
    'multiSelect' | 'selectedValues' | 'onSelectionChange'
>) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [internalSelectedValue, setInternalSelectedValue] = useState<string>(
        selectedValue || ''
    )

    const selectMobileOffset = {
        top: '74px',
        bottom: '0px',
        left: '16px',
        right: '16px',
        ...mobileOffset,
    }

    const allItems = useMemo(() => {
        return items.flatMap((group) => group.items)
    }, [items])

    const filteredItems = useMemo(() => {
        if (!searchTerm) return items

        const filtered = allItems.filter(
            (item) =>
                item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.subLabel &&
                    item.subLabel
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
        )

        return [{ items: filtered }]
    }, [allItems, items, searchTerm])

    const handleItemSelect = (value: string) => {
        setInternalSelectedValue(value)
        onValueChange?.(value)
    }

    const handleClear = () => {
        setInternalSelectedValue('')
        onValueChange?.('')
        onCancel?.()
    }

    const handleConfirm = () => {
        onConfirm?.()
    }

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            direction={direction}
            modal={modal}
            dismissible={dismissible}
        >
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    direction={direction}
                    showHandle={true}
                    mobileOffset={selectMobileOffset}
                    className={className}
                    style={style}
                >
                    <Block
                        padding={`${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]} 0 ${FOUNDATION_THEME.unit[16]}`}
                        backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                        flexShrink={0}
                        position="relative"
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                        >
                            <Text
                                variant="body.lg"
                                color={FOUNDATION_THEME.colors.gray[800]}
                                fontWeight={600}
                            >
                                {heading}
                            </Text>
                        </Block>
                        {rightSlot && (
                            <Block
                                position="absolute"
                                top={FOUNDATION_THEME.unit[16]}
                                right={FOUNDATION_THEME.unit[16]}
                                width="14px"
                                height="14px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                {rightSlot}
                            </Block>
                        )}
                    </Block>

                    <Block
                        flexGrow={1}
                        overflowY="auto"
                        padding="0"
                        backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                    >
                        {description && (
                            <Block
                                padding={`0 ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]}`}
                            >
                                <Text
                                    variant="body.md"
                                    color={FOUNDATION_THEME.colors.gray[500]}
                                    textAlign="center"
                                >
                                    {description}
                                </Text>
                            </Block>
                        )}

                        {enableSearch && (
                            <Block
                                padding={`0 ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]}`}
                            >
                                <TextInput
                                    placeholder={searchPlaceholder}
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </Block>
                        )}

                        <Block display="flex" flexDirection="column">
                            {filteredItems.map((group, groupIndex) => (
                                <React.Fragment key={groupIndex}>
                                    {group.groupLabel && (
                                        <Block
                                            padding={`${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[16]}`}
                                        >
                                            <Text
                                                variant="body.sm"
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[600]
                                                }
                                                fontWeight={600}
                                            >
                                                {group.groupLabel}
                                            </Text>
                                        </Block>
                                    )}
                                    {group.items.map((item, itemIndex) => {
                                        const isSelected =
                                            internalSelectedValue === item.value
                                        const isLastInGroup =
                                            itemIndex === group.items.length - 1
                                        const isLastGroup =
                                            groupIndex ===
                                            filteredItems.length - 1
                                        const showBorder =
                                            !isLastInGroup || !isLastGroup

                                        return (
                                            <Block
                                                key={item.value}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                padding={`${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[16]}`}
                                                cursor={
                                                    item.disabled
                                                        ? 'not-allowed'
                                                        : 'pointer'
                                                }
                                                borderBottom={
                                                    showBorder
                                                        ? `1px solid ${FOUNDATION_THEME.colors.gray[150]}`
                                                        : 'none'
                                                }
                                                backgroundColor="transparent"
                                                onClick={
                                                    item.disabled
                                                        ? undefined
                                                        : () =>
                                                              handleItemSelect(
                                                                  item.value
                                                              )
                                                }
                                                opacity={
                                                    item.disabled ? 0.5 : 1
                                                }
                                            >
                                                <Block
                                                    display="flex"
                                                    alignItems="center"
                                                    gap={12}
                                                    flexGrow={1}
                                                >
                                                    {item.slot1 && (
                                                        <Block
                                                            width="24px"
                                                            height="24px"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            flexShrink={0}
                                                        >
                                                            {item.slot1}
                                                        </Block>
                                                    )}
                                                    <Block flexGrow={1}>
                                                        <Text
                                                            variant="body.md"
                                                            color={
                                                                isSelected
                                                                    ? FOUNDATION_THEME
                                                                          .colors
                                                                          .gray[700]
                                                                    : FOUNDATION_THEME
                                                                          .colors
                                                                          .gray[600]
                                                            }
                                                            fontWeight={
                                                                isSelected
                                                                    ? 600
                                                                    : 500
                                                            }
                                                            style={{
                                                                marginBottom:
                                                                    item.subLabel
                                                                        ? '2px'
                                                                        : '0',
                                                            }}
                                                        >
                                                            {item.label}
                                                        </Text>
                                                        {item.subLabel && (
                                                            <Text
                                                                variant="body.sm"
                                                                color={
                                                                    FOUNDATION_THEME
                                                                        .colors
                                                                        .gray[500]
                                                                }
                                                            >
                                                                {item.subLabel}
                                                            </Text>
                                                        )}
                                                    </Block>
                                                </Block>
                                                <Block flexShrink={0}>
                                                    {isSelected && (
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M13.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0z"
                                                                fill={
                                                                    FOUNDATION_THEME
                                                                        .colors
                                                                        .gray[600]
                                                                }
                                                            />
                                                        </svg>
                                                    )}
                                                </Block>
                                            </Block>
                                        )
                                    })}
                                    {group.showSeparator &&
                                        groupIndex <
                                            filteredItems.length - 1 && (
                                            <Block
                                                height="1px"
                                                backgroundColor={
                                                    FOUNDATION_THEME.colors
                                                        .gray[300]
                                                }
                                                margin={`${FOUNDATION_THEME.unit[8]} 0`}
                                            />
                                        )}
                                </React.Fragment>
                            ))}
                        </Block>
                    </Block>

                    <DrawerFooter>
                        <Block display="flex" gap={12} width="100%">
                            {showCancelButton && (
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text={cancelText}
                                    onClick={handleClear}
                                    fullWidth={true}
                                />
                            )}
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text={confirmText}
                                onClick={handleConfirm}
                                fullWidth={true}
                            />
                        </Block>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

SingleSelectDrawer.displayName = 'SingleSelectDrawer'

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
    StatusDrawer,
    MultiSelectDrawer,
    SingleSelectDrawer,
}

export default Drawer
