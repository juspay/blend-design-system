'use client'

import React, { useState, useMemo, createContext } from 'react'
import {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerFooter,
} from './DrawerBase'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { Button, ButtonType } from '../../Button'
import { TextInput } from '../../Inputs/TextInput'
import { Checkbox } from '../../Checkbox'
import { FOUNDATION_THEME } from '../../../tokens'
import type { SelectDrawerItem, SelectDrawerGroup } from '../types'

type NavigationContextType = {
    navigationStack: Array<{
        title: string
        items: SelectDrawerGroup[]
        selectedValues?: string[]
        selectedValue?: string
    }>
    pushNavigation: (
        title: string,
        items: SelectDrawerGroup[],
        selectedValues?: string[],
        selectedValue?: string
    ) => void
    popNavigation: () => void
    isNested: boolean
}

const NavigationContext = createContext<NavigationContextType | null>(null)

const BackButton = ({ onBack }: { onBack: () => void }) => {
    return (
        <Block
            position="absolute"
            left={FOUNDATION_THEME.unit[16]}
            top={FOUNDATION_THEME.unit[16]}
            cursor="pointer"
            onClick={onBack}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="24px"
            height="24px"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 12L6 8L10 4"
                    stroke={FOUNDATION_THEME.colors.gray[600]}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </Block>
    )
}

// Enhanced item component that can trigger nested navigation
const SelectableItem = ({
    item,
    isSelected,
    isMultiSelect,
    onSelect,
    onNavigate,
}: {
    item: SelectDrawerItem & { nestedItems?: SelectDrawerGroup[] }
    isSelected: boolean
    isMultiSelect: boolean
    onSelect: (value: string) => void
    onNavigate?: (title: string, items: SelectDrawerGroup[]) => void
}) => {
    const hasNested = item.nestedItems && item.nestedItems.length > 0

    const handleClick = () => {
        if (hasNested && onNavigate) {
            onNavigate(item.label, item.nestedItems!)
        } else {
            onSelect(item.value)
        }
    }

    return (
        <Block
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={`${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[16]}`}
            cursor={item.disabled ? 'not-allowed' : 'pointer'}
            backgroundColor="transparent"
            onClick={item.disabled ? undefined : handleClick}
            opacity={item.disabled ? 0.5 : 1}
        >
            <Block display="flex" alignItems="center" gap={12} flexGrow={1}>
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
                                ? FOUNDATION_THEME.colors.gray[700]
                                : FOUNDATION_THEME.colors.gray[600]
                        }
                        fontWeight={isSelected ? 600 : 500}
                        style={{
                            marginBottom: item.subLabel ? '2px' : '0',
                        }}
                    >
                        {item.label}
                    </Text>
                    {item.subLabel && (
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[500]}
                        >
                            {item.subLabel}
                        </Text>
                    )}
                </Block>
            </Block>
            <Block flexShrink={0} display="flex" alignItems="center" gap={8}>
                {hasNested && (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 4L10 8L6 12"
                            stroke={FOUNDATION_THEME.colors.gray[400]}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
                {!hasNested && isMultiSelect && (
                    <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onSelect(item.value)}
                        disabled={item.disabled}
                    />
                )}
                {!hasNested && !isMultiSelect && isSelected && (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0z"
                            fill={FOUNDATION_THEME.colors.gray[600]}
                        />
                    </svg>
                )}
            </Block>
        </Block>
    )
}

// Multi-select nested drawer
export const NestedMultiSelectDrawer = ({
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
}: {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    heading: string
    description?: string
    rightSlot?: React.ReactNode
    items: (SelectDrawerGroup & {
        items: Array<SelectDrawerItem & { nestedItems?: SelectDrawerGroup[] }>
    })[]
    selectedValues?: string[]
    onSelectionChange?: (selectedValues: string[]) => void
    enableSearch?: boolean
    searchPlaceholder?: string
    cancelText?: string
    confirmText?: string
    onCancel?: () => void
    onConfirm?: () => void
    showCancelButton?: boolean
    direction?: 'top' | 'bottom' | 'left' | 'right'
    modal?: boolean
    dismissible?: boolean
    mobileOffset?: {
        top?: string
        bottom?: string
        left?: string
        right?: string
    }
    className?: string
    style?: React.CSSProperties
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [internalSelectedValues, setInternalSelectedValues] =
        useState<string[]>(selectedValues)
    const [navigationStack, setNavigationStack] = useState<
        Array<{
            title: string
            items: SelectDrawerGroup[]
            selectedValues: string[]
        }>
    >([{ title: heading, items, selectedValues: internalSelectedValues }])

    const selectMobileOffset = {
        top: '74px',
        bottom: '0px',
        left: '16px',
        right: '16px',
        ...mobileOffset,
    }

    const currentLevel = navigationStack[navigationStack.length - 1]
    const isNested = navigationStack.length > 1

    const allItems = useMemo(() => {
        return currentLevel.items.flatMap((group) => group.items)
    }, [currentLevel.items])

    const filteredItems = useMemo(() => {
        if (!searchTerm) return currentLevel.items

        const filtered = allItems.filter(
            (item) =>
                item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.subLabel &&
                    item.subLabel
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
        )

        return [{ items: filtered }]
    }, [allItems, currentLevel.items, searchTerm])

    const handleItemToggle = (value: string) => {
        const newSelection = internalSelectedValues.includes(value)
            ? internalSelectedValues.filter((v) => v !== value)
            : [...internalSelectedValues, value]

        setInternalSelectedValues(newSelection)
        onSelectionChange?.(newSelection)
    }

    const handleNavigate = (title: string, items: SelectDrawerGroup[]) => {
        setNavigationStack((prev) => [
            ...prev,
            {
                title,
                items,
                selectedValues: internalSelectedValues,
            },
        ])
        setSearchTerm('')
    }

    const handleBack = () => {
        if (navigationStack.length > 1) {
            setNavigationStack((prev) => prev.slice(0, -1))
            setSearchTerm('')
        }
    }

    const handleClearAll = () => {
        setInternalSelectedValues([])
        onSelectionChange?.([])
        onCancel?.()
    }

    const handleConfirm = () => {
        onConfirm?.()
    }

    const navigationContextValue: NavigationContextType = {
        navigationStack,
        pushNavigation: handleNavigate,
        popNavigation: handleBack,
        isNested,
    }

    return (
        <NavigationContext.Provider value={navigationContextValue}>
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
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={FOUNDATION_THEME.unit[8]}
                        >
                            {isNested && <BackButton onBack={handleBack} />}

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
                                    {currentLevel.title}
                                </Text>
                            </Block>
                            {rightSlot && !isNested && (
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

                        <Block
                            flexGrow={1}
                            overflowY="auto"
                            padding="0"
                            backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                        >
                            {description && !isNested && (
                                <Block
                                    padding={`0 ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]}`}
                                >
                                    <Text
                                        variant="body.md"
                                        color={
                                            FOUNDATION_THEME.colors.gray[500]
                                        }
                                        textAlign="center"
                                    >
                                        {description}
                                    </Text>
                                </Block>
                            )}

                            {enableSearch && (
                                <Block padding={FOUNDATION_THEME.unit[16]}>
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
                                                itemIndex ===
                                                group.items.length - 1
                                            const isLastGroup =
                                                groupIndex ===
                                                filteredItems.length - 1
                                            const showBorder =
                                                !isLastInGroup || !isLastGroup

                                            return (
                                                <Block
                                                    key={item.value}
                                                    borderBottom={
                                                        showBorder
                                                            ? `1px solid ${FOUNDATION_THEME.colors.gray[150]}`
                                                            : 'none'
                                                    }
                                                >
                                                    <SelectableItem
                                                        item={item}
                                                        isSelected={isSelected}
                                                        isMultiSelect={true}
                                                        onSelect={
                                                            handleItemToggle
                                                        }
                                                        onNavigate={
                                                            handleNavigate
                                                        }
                                                    />
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
        </NavigationContext.Provider>
    )
}

// Single-select nested drawer
export const NestedSingleSelectDrawer = ({
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
}: {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    heading: string
    description?: string
    rightSlot?: React.ReactNode
    items: (SelectDrawerGroup & {
        items: Array<SelectDrawerItem & { nestedItems?: SelectDrawerGroup[] }>
    })[]
    selectedValue?: string
    onValueChange?: (value: string) => void
    enableSearch?: boolean
    searchPlaceholder?: string
    cancelText?: string
    confirmText?: string
    onCancel?: () => void
    onConfirm?: () => void
    showCancelButton?: boolean
    direction?: 'top' | 'bottom' | 'left' | 'right'
    modal?: boolean
    dismissible?: boolean
    mobileOffset?: {
        top?: string
        bottom?: string
        left?: string
        right?: string
    }
    className?: string
    style?: React.CSSProperties
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [internalSelectedValue, setInternalSelectedValue] = useState<string>(
        selectedValue || ''
    )
    const [navigationStack, setNavigationStack] = useState<
        Array<{
            title: string
            items: SelectDrawerGroup[]
            selectedValue: string
        }>
    >([{ title: heading, items, selectedValue: internalSelectedValue }])

    const selectMobileOffset = {
        top: '74px',
        bottom: '0px',
        left: '16px',
        right: '16px',
        ...mobileOffset,
    }

    const currentLevel = navigationStack[navigationStack.length - 1]
    const isNested = navigationStack.length > 1

    const allItems = useMemo(() => {
        return currentLevel.items.flatMap((group) => group.items)
    }, [currentLevel.items])

    const filteredItems = useMemo(() => {
        if (!searchTerm) return currentLevel.items

        const filtered = allItems.filter(
            (item) =>
                item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.subLabel &&
                    item.subLabel
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
        )

        return [{ items: filtered }]
    }, [allItems, currentLevel.items, searchTerm])

    const handleItemSelect = (value: string) => {
        setInternalSelectedValue(value)
        onValueChange?.(value)
    }

    const handleNavigate = (title: string, items: SelectDrawerGroup[]) => {
        setNavigationStack((prev) => [
            ...prev,
            {
                title,
                items,
                selectedValue: internalSelectedValue,
            },
        ])
        setSearchTerm('')
    }

    const handleBack = () => {
        if (navigationStack.length > 1) {
            setNavigationStack((prev) => prev.slice(0, -1))
            setSearchTerm('')
        }
    }

    const handleClear = () => {
        setInternalSelectedValue('')
        onValueChange?.('')
        onCancel?.()
    }

    const handleConfirm = () => {
        onConfirm?.()
    }

    const navigationContextValue: NavigationContextType = {
        navigationStack,
        pushNavigation: handleNavigate,
        popNavigation: handleBack,
        isNested,
    }

    return (
        <NavigationContext.Provider value={navigationContextValue}>
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
                            {isNested && <BackButton onBack={handleBack} />}

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
                                    {currentLevel.title}
                                </Text>
                            </Block>
                            {rightSlot && !isNested && (
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
                            {description && !isNested && (
                                <Block
                                    padding={`0 ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]}`}
                                >
                                    <Text
                                        variant="body.md"
                                        color={
                                            FOUNDATION_THEME.colors.gray[500]
                                        }
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
                                                internalSelectedValue ===
                                                item.value
                                            const isLastInGroup =
                                                itemIndex ===
                                                group.items.length - 1
                                            const isLastGroup =
                                                groupIndex ===
                                                filteredItems.length - 1
                                            const showBorder =
                                                !isLastInGroup || !isLastGroup

                                            return (
                                                <Block
                                                    key={item.value}
                                                    borderBottom={
                                                        showBorder
                                                            ? `1px solid ${FOUNDATION_THEME.colors.gray[150]}`
                                                            : 'none'
                                                    }
                                                >
                                                    <SelectableItem
                                                        item={item}
                                                        isSelected={isSelected}
                                                        isMultiSelect={false}
                                                        onSelect={
                                                            handleItemSelect
                                                        }
                                                        onNavigate={
                                                            handleNavigate
                                                        }
                                                    />
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
        </NavigationContext.Provider>
    )
}

NestedMultiSelectDrawer.displayName = 'NestedMultiSelectDrawer'
NestedSingleSelectDrawer.displayName = 'NestedSingleSelectDrawer'
