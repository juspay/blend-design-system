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
import { FOUNDATION_THEME } from '../../tokens'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { SingleSelectTokensType } from './singleSelect.tokens'
import type { SingleSelectProps } from './types'
import {
    type SelectMenuGroupType,
    type SelectMenuItemType,
    SelectMenuSize,
    SelectMenuVariant,
} from '../Select'
import SingleSelectTrigger from './SingleSelectTrigger'
import { Checkbox } from '../Checkbox'
import { CheckboxSize } from '../Checkbox/types'

type MobileSingleSelectProps = SingleSelectProps

const map = function getValueLabelMap(
    groups: SelectMenuGroupType[]
): Record<string, string> {
    const map: Record<string, string> = {}

    function traverse(items: SelectMenuItemType[]) {
        for (const item of items) {
            map[item.value] = item.label
            if (item.subMenu) {
                traverse(item.subMenu)
            }
        }
    }

    for (const group of groups) {
        traverse(group.items)
    }

    return map
}

const SingleSelectItem = ({
    item,
    isSelected,
    onSelect,
}: {
    item: SelectMenuItemType
    isSelected: boolean
    onSelect: (value: string) => void
}) => {
    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={4}
            padding={`${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[6]}`}
            margin={`0 ${FOUNDATION_THEME.unit[8]}`}
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
                    onSelect(item.value)
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
                <Block
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                    }}
                >
                    <Checkbox
                        size={CheckboxSize.SMALL}
                        checked={isSelected}
                        disabled={item.disabled}
                        onCheckedChange={() => {
                            if (!item.disabled) {
                                onSelect(item.value)
                            }
                        }}
                    />
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

const MobileSingleSelect: React.FC<MobileSingleSelectProps> = ({
    label,
    subLabel,
    hintText,
    required,
    helpIconText,
    placeholder,
    error = false,
    errorMessage,
    size = SelectMenuSize.MEDIUM,
    items = [],
    name,
    variant = SelectMenuVariant.CONTAINER,
    disabled,
    selected,
    onSelect,
    slot,
    customTrigger,
    onBlur,
    onFocus,
    inline = false,
}) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const singleSelectTokens =
        useResponsiveTokens<SingleSelectTokensType>('SINGLE_SELECT')
    const [drawerOpen, setDrawerOpen] = useState(false)
    const valueLabelMap = map(items)

    const isItemSelected = selected.length > 0
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === SelectMenuSize.LARGE

    return (
        <Block width="100%" display="flex" flexDirection="column" gap={8}>
            {variant === SelectMenuVariant.CONTAINER &&
                (!isSmallScreen || size !== SelectMenuSize.LARGE) && (
                    <InputLabels
                        label={label}
                        sublabel={subLabel}
                        disabled={disabled}
                        helpIconHintText={helpIconText}
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
                        <SingleSelectTrigger
                            singleSelectTokens={singleSelectTokens}
                            size={size}
                            selected={selected}
                            label={label || ''}
                            name={name || ''}
                            placeholder={placeholder}
                            required={required || false}
                            valueLabelMap={valueLabelMap}
                            open={drawerOpen}
                            onClick={() => setDrawerOpen(true)}
                            slot={slot}
                            variant={variant}
                            isSmallScreenWithLargeSize={
                                isSmallScreenWithLargeSize
                            }
                            isItemSelected={isItemSelected}
                            inline={inline}
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
                                    {label || 'Select Option'}
                                </DrawerTitle>
                                <DrawerClose>
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        width={FOUNDATION_THEME.unit[32]}
                                        height={FOUNDATION_THEME.unit[32]}
                                        borderRadius={FOUNDATION_THEME.unit[6]}
                                        backgroundColor={
                                            FOUNDATION_THEME.colors.gray[100]
                                        }
                                        border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                        cursor="pointer"
                                        _hover={{
                                            backgroundColor:
                                                FOUNDATION_THEME.colors
                                                    .gray[200],
                                        }}
                                        onClick={() => {
                                            setDrawerOpen(false)
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
                            </Block>
                        </DrawerHeader>

                        <DrawerBody noPadding={true}>
                            <Block
                                display="flex"
                                flexDirection="column"
                                height="100%"
                                overflow="hidden"
                            >
                                <Block
                                    display="flex"
                                    flexDirection="column"
                                    gap={4}
                                    overflow="auto"
                                    flexGrow={1}
                                    padding="16px"
                                >
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
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .gray[400]
                                                        }
                                                        textTransform="uppercase"
                                                        fontSize={12}
                                                    >
                                                        {group.groupLabel}
                                                    </Text>
                                                </Block>
                                            )}
                                            {group.items.map(
                                                (item, itemIndex) => {
                                                    const isSelected =
                                                        selected === item.value
                                                    return (
                                                        <SingleSelectItem
                                                            key={`${groupId}-${itemIndex}`}
                                                            item={item}
                                                            isSelected={
                                                                isSelected
                                                            }
                                                            onSelect={(
                                                                value
                                                            ) => {
                                                                onSelect(value)
                                                                setDrawerOpen(
                                                                    false
                                                                )
                                                            }}
                                                        />
                                                    )
                                                }
                                            )}
                                            {groupId !== items.length - 1 &&
                                                group.showSeparator && (
                                                    <Block
                                                        height={1}
                                                        backgroundColor={
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .gray[200]
                                                        }
                                                        margin="8px 0px"
                                                    />
                                                )}
                                        </React.Fragment>
                                    ))}
                                </Block>
                            </Block>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>

            {variant === SelectMenuVariant.CONTAINER && (
                <InputFooter
                    hintText={hintText}
                    error={error}
                    errorMessage={errorMessage}
                />
            )}
        </Block>
    )
}

export default MobileSingleSelect
