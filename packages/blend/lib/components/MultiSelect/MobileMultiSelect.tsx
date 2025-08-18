import React, { useState } from 'react'
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
    DrawerClose,
} from '../Drawer'
import { X } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { Button, ButtonType, ButtonSize, MultiSelectTrigger } from '../../main'
import { FOUNDATION_THEME } from '../../tokens'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { map } from './utils'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { MultiSelectTokensType } from './multiSelect.tokens'
import type {
    MultiSelectProps,
    MultiSelectMenuGroupType,
    MultiSelectMenuItemType,
} from './types'
import {
    MultiSelectMenuSize,
    MultiSelectVariant,
    MultiSelectSelectionTagType,
} from './types'

type MobileMultiSelectProps = MultiSelectProps

const SelectAllItem = ({
    items,
    selectedValues,
    onChange,
    selectAllText,
}: {
    items: MultiSelectMenuGroupType[]
    selectedValues: string[]
    onChange: (value: string) => void
    selectAllText: string
}) => {
    const allValues = items.flatMap((group) =>
        group.items.filter((item) => !item.disabled).map((item) => item.value)
    )

    const allSelected =
        allValues.length > 0 &&
        allValues.every((value) => selectedValues.includes(value))

    const someSelected = selectedValues.some((value) =>
        allValues.includes(value)
    )

    const handleSelectAll = () => {
        if (allSelected) {
            selectedValues.forEach((value) => {
                if (allValues.includes(value)) {
                    onChange(value)
                }
            })
        } else {
            allValues.forEach((value) => {
                if (!selectedValues.includes(value)) {
                    onChange(value)
                }
            })
        }
    }

    const getCheckboxState = () => {
        if (allSelected) return FOUNDATION_THEME.colors.primary[600]
        if (someSelected) return FOUNDATION_THEME.colors.primary[300]
        return 'transparent'
    }

    const getBorderState = () => {
        if (allSelected || someSelected) return 'none'
        return `2px solid ${FOUNDATION_THEME.colors.gray[300]}`
    }

    const getCheckboxIcon = () => {
        if (allSelected) {
            return (
                <Text variant="body.xs" color="white" fontWeight={600}>
                    ✓
                </Text>
            )
        } else if (someSelected) {
            return (
                <Text variant="body.xs" color="white" fontWeight={600}>
                    −
                </Text>
            )
        }
        return null
    }

    return (
        <Block
            borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
            marginBottom={8}
            paddingBottom={8}
        >
            <Block
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="12px 6px"
                margin="0px 8px"
                borderRadius={4}
                cursor="pointer"
                backgroundColor="transparent"
                _hover={{
                    backgroundColor: FOUNDATION_THEME.colors.gray[50],
                }}
                onClick={handleSelectAll}
            >
                <Text
                    variant="body.md"
                    fontWeight={600}
                    color={FOUNDATION_THEME.colors.gray[700]}
                >
                    {selectAllText}
                </Text>
                <Block display="flex" alignItems="center">
                    <Block
                        size={16}
                        backgroundColor={getCheckboxState()}
                        border={getBorderState()}
                        borderRadius={2}
                        contentCentered
                    >
                        {getCheckboxIcon()}
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}

const MultiSelectItem = ({
    item,
    isSelected,
    onChange,
}: {
    item: MultiSelectMenuItemType
    isSelected: boolean
    onChange: (value: string) => void
}) => {
    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={4}
            padding="8px 6px"
            margin="0px 8px"
            borderRadius={4}
            cursor={item.disabled ? 'not-allowed' : 'pointer'}
            backgroundColor={
                isSelected ? FOUNDATION_THEME.colors.gray[50] : 'transparent'
            }
            _hover={{
                backgroundColor: FOUNDATION_THEME.colors.gray[50],
            }}
            onClick={() => {
                if (!item.disabled) {
                    onChange(item.value)
                }
            }}
        >
            <Block
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={8}
            >
                <Block display="flex" alignItems="center" gap={8} flexGrow={1}>
                    {item.slot1 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot1}
                        </Block>
                    )}
                    <Text
                        variant="body.md"
                        color={
                            isSelected
                                ? FOUNDATION_THEME.colors.gray[700]
                                : FOUNDATION_THEME.colors.gray[600]
                        }
                        fontWeight={500}
                        truncate
                    >
                        {item.label}
                    </Text>
                </Block>
                <Block display="flex" alignItems="center">
                    <Block
                        size={16}
                        backgroundColor={
                            isSelected
                                ? FOUNDATION_THEME.colors.primary[600]
                                : 'transparent'
                        }
                        border={
                            isSelected
                                ? 'none'
                                : `2px solid ${FOUNDATION_THEME.colors.gray[300]}`
                        }
                        borderRadius={2}
                        contentCentered
                    >
                        {isSelected && (
                            <Text
                                variant="body.xs"
                                color="white"
                                fontWeight={600}
                            >
                                ✓
                            </Text>
                        )}
                    </Block>
                </Block>
            </Block>
            {item.subLabel && (
                <Block display="flex" alignItems="center" width="100%">
                    <Text
                        variant="body.sm"
                        color={FOUNDATION_THEME.colors.gray[400]}
                        fontWeight={400}
                    >
                        {item.subLabel}
                    </Text>
                </Block>
            )}
        </Block>
    )
}

const SelectedItemsSection = ({
    selectedValues,
    valueLabelMap,
    onChange,
}: {
    selectedValues: string[]
    valueLabelMap: Record<string, string>
    onChange: (value: string) => void
}) => {
    if (selectedValues.length === 0) return null

    return (
        <Block
            marginTop={16}
            padding={12}
            backgroundColor={FOUNDATION_THEME.colors.gray[50]}
            borderRadius={8}
        >
            <Block marginBottom={8}>
                <Text variant="body.sm" fontWeight={500}>
                    Selected ({selectedValues.length}):
                </Text>
            </Block>
            <Block display="flex" flexWrap="wrap" gap={8}>
                {selectedValues.map((value) => (
                    <Block
                        key={value}
                        display="flex"
                        alignItems="center"
                        gap={4}
                        padding="4px 8px"
                        backgroundColor={FOUNDATION_THEME.colors.primary[100]}
                        borderRadius={4}
                    >
                        <Text
                            variant="body.xs"
                            color={FOUNDATION_THEME.colors.primary[700]}
                        >
                            {valueLabelMap[value]}
                        </Text>
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            leadingIcon={<X size={12} />}
                            onClick={() => onChange(value)}
                        />
                    </Block>
                ))}
            </Block>
        </Block>
    )
}

const MobileMultiSelect: React.FC<MobileMultiSelectProps> = ({
    selectedValues,
    onChange,
    items = [],
    label,
    sublabel,
    disabled,
    helpIconHintText,
    name,
    required,
    variant = MultiSelectVariant.CONTAINER,
    selectionTagType = MultiSelectSelectionTagType.COUNT,
    slot,
    hintText,
    placeholder,
    size = MultiSelectMenuSize.MEDIUM,
    enableSelectAll = false,
    selectAllText = 'Select All',
    customTrigger,
    onBlur,
    onFocus,
    error,
    errorMessage,
}) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectTokensType>('MULTI_SELECT')
    const [drawerOpen, setDrawerOpen] = useState(false)
    const valueLabelMap = map(items)

    return (
        <Block width="100%" display="flex" flexDirection="column" gap={8}>
            {variant === MultiSelectVariant.CONTAINER &&
                (!isSmallScreen || size !== MultiSelectMenuSize.LARGE) && (
                    <InputLabels
                        label={label}
                        sublabel={sublabel}
                        disabled={disabled}
                        helpIconHintText={helpIconHintText}
                        name={name}
                        required={required}
                    />
                )}

            <Drawer
                open={drawerOpen}
                onOpenChange={(isOpen) => {
                    setDrawerOpen(isOpen)
                    if (isOpen) {
                        onFocus?.()
                    } else {
                        onBlur?.()
                    }
                }}
            >
                <DrawerTrigger>
                    {customTrigger || (
                        <MultiSelectTrigger
                            onChange={onChange}
                            name={name || ''}
                            label={label}
                            placeholder={placeholder}
                            required={required || false}
                            selectionTagType={selectionTagType}
                            valueLabelMap={valueLabelMap}
                            open={false}
                            variant={variant}
                            size={size}
                            isSmallScreen={isSmallScreen}
                            selectedValues={selectedValues}
                            slot={slot}
                            onClick={() => setDrawerOpen(true)}
                            multiSelectTokens={multiSelectTokens}
                            error={error}
                        />
                    )}
                </DrawerTrigger>

                <DrawerPortal>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            <Block
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <DrawerTitle>
                                    {label || 'Select Options'}
                                </DrawerTitle>
                                <DrawerClose>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '6px',
                                            backgroundColor: '#f3f4f6',
                                            border: '1px solid #d1d5db',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <X size={16} color="#6b7280" />
                                    </div>
                                </DrawerClose>
                            </Block>
                        </DrawerHeader>

                        <DrawerBody>
                            <Block
                                display="flex"
                                flexDirection="column"
                                gap={4}
                            >
                                {enableSelectAll && (
                                    <SelectAllItem
                                        items={items}
                                        selectedValues={selectedValues}
                                        onChange={onChange}
                                        selectAllText={selectAllText}
                                    />
                                )}

                                {items.map((group, groupId) => (
                                    <React.Fragment key={groupId}>
                                        {group.groupLabel && (
                                            <Block
                                                padding="6px 8px"
                                                margin="0px 6px"
                                            >
                                                <Text
                                                    variant="body.sm"
                                                    color={
                                                        FOUNDATION_THEME.colors
                                                            .gray[400]
                                                    }
                                                    textTransform="uppercase"
                                                    fontSize={12}
                                                >
                                                    {group.groupLabel}
                                                </Text>
                                            </Block>
                                        )}
                                        {group.items.map((item, itemIndex) => {
                                            const isSelected =
                                                selectedValues.includes(
                                                    item.value
                                                )
                                            return (
                                                <MultiSelectItem
                                                    key={`${groupId}-${itemIndex}`}
                                                    item={item}
                                                    isSelected={isSelected}
                                                    onChange={onChange}
                                                />
                                            )
                                        })}
                                        {groupId !== items.length - 1 &&
                                            group.showSeparator && (
                                                <Block
                                                    height={1}
                                                    backgroundColor={
                                                        FOUNDATION_THEME.colors
                                                            .gray[200]
                                                    }
                                                    margin="8px 0px"
                                                />
                                            )}
                                    </React.Fragment>
                                ))}
                            </Block>

                            <SelectedItemsSection
                                selectedValues={selectedValues}
                                valueLabelMap={valueLabelMap}
                                onChange={onChange}
                            />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>

            {variant === MultiSelectVariant.CONTAINER && (
                <InputFooter
                    hintText={hintText}
                    error={error}
                    errorMessage={errorMessage}
                />
            )}
        </Block>
    )
}

export default MobileMultiSelect
