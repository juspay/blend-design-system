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
import { MultiSelectTrigger } from '../../main'
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
import Button from '../Button/Button'
import { ButtonType, ButtonSize } from '../Button/types'

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
    showActionButtons = false,
    applyButtonText = 'Apply',
    clearAllButtonText = 'Clear All',
    onApply,
    onClearAll,
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
                                justifyContent={
                                    showActionButtons
                                        ? 'center'
                                        : 'space-between'
                                }
                                alignItems="center"
                            >
                                <DrawerTitle>
                                    {label || 'Select Options'}
                                </DrawerTitle>
                                {!showActionButtons && (
                                    <DrawerClose>
                                        <Block
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            width={FOUNDATION_THEME.unit[32]}
                                            height={FOUNDATION_THEME.unit[32]}
                                            borderRadius={
                                                FOUNDATION_THEME.unit[6]
                                            }
                                            backgroundColor={
                                                FOUNDATION_THEME.colors
                                                    .gray[100]
                                            }
                                            border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                            cursor="pointer"
                                            _hover={{
                                                backgroundColor:
                                                    FOUNDATION_THEME.colors
                                                        .gray[200],
                                            }}
                                        >
                                            <X
                                                size={16}
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[500]
                                                }
                                            />
                                        </Block>
                                    </DrawerClose>
                                )}
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

                            {showActionButtons && (
                                <Block
                                    borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                    padding={FOUNDATION_THEME.unit[16]}
                                    display="flex"
                                    gap={FOUNDATION_THEME.unit[12]}
                                    justifyContent="flex-end"
                                    margin={`${FOUNDATION_THEME.unit[16]} 0 0 0`}
                                >
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        size={ButtonSize.MEDIUM}
                                        text={clearAllButtonText}
                                        onClick={() => {
                                            onClearAll?.()
                                        }}
                                        fullWidth
                                    />
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        size={ButtonSize.MEDIUM}
                                        text={applyButtonText}
                                        onClick={() => {
                                            onApply?.()
                                            setDrawerOpen(false)
                                        }}
                                        fullWidth
                                    />
                                </Block>
                            )}
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
