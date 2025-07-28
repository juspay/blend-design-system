import React, { useState } from 'react'
import Block from '../Primitives/Block/Block'
import InputLabels from '../Inputs/utils/InputLabels/InputLabels'
import InputFooter from '../Inputs/utils/InputFooter/InputFooter'
import MultiSelectMenu from './MultiSelectMenu'
import MultiSelectTrigger from './MultiSelectTrigger'
import { FOUNDATION_THEME } from '../../tokens'
import Text from '../Text/Text'
import { X } from 'lucide-react'
import {
    MultiSelectMenuSize,
    type MultiSelectProps,
    MultiSelectSelectionTagType,
    MultiSelectVariant,
} from './types'
import { type MultiSelectTokensType } from './multiSelect.tokens'
import { useComponentToken } from '../../context/useComponentToken'
import { useBreakpoints } from '../../hooks/useBreakPoints'
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
import { Button, ButtonType, ButtonSize } from '../../main'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { handleSelectAll, map } from './utils'

const MultiSelect = ({
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
    enableSearch = false,
    searchPlaceholder = 'Search options...',
    enableSelectAll = false,
    selectAllText = 'Select All',
    useDrawerOnMobile = true,
    minWidth,
    maxWidth,
    maxHeight,
    alignment,
    side,
    sideOffset,
    alignOffset,
}: MultiSelectProps) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    console.log('small screen', isSmallScreen, size, variant)

    const multiSelectTokens = useComponentToken(
        'MULTI_SELECT'
    ) as MultiSelectTokensType
    const [open, setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { innerWidth } = useBreakpoints()
    const isMobile = innerWidth < 1024
    const valueLabelMap = map(items)

    const handleClearAll = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        selectedValues.forEach((value) => {
            onChange(value)
        })
    }

    if (isMobile && useDrawerOnMobile) {
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

                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerTrigger>
                        <MultiSelectTrigger
                            selectedValues={selectedValues}
                            valueLabelMap={valueLabelMap}
                            variant={variant}
                            selectionTagType={selectionTagType}
                            slot={slot}
                            label={label}
                            placeholder={placeholder}
                            size={size}
                            required={required}
                            open={drawerOpen}
                            disabled={disabled}
                            multiSelectTokens={multiSelectTokens}
                            onClearAll={handleClearAll}
                        />
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
                                                        selectedValues.includes(
                                                            item.value
                                                        )
                                                    return (
                                                        <Block
                                                            key={`${groupId}-${itemIndex}`}
                                                            display="flex"
                                                            flexDirection="column"
                                                            gap={4}
                                                            padding="8px 6px"
                                                            margin="0px 8px"
                                                            borderRadius={4}
                                                            cursor={
                                                                item.disabled
                                                                    ? 'not-allowed'
                                                                    : 'pointer'
                                                            }
                                                            backgroundColor={
                                                                isSelected
                                                                    ? FOUNDATION_THEME
                                                                          .colors
                                                                          .gray[50]
                                                                    : 'transparent'
                                                            }
                                                            _hover={{
                                                                backgroundColor:
                                                                    FOUNDATION_THEME
                                                                        .colors
                                                                        .gray[50],
                                                            }}
                                                            onClick={() => {
                                                                if (
                                                                    !item.disabled
                                                                ) {
                                                                    onChange(
                                                                        item.value
                                                                    )
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
                                                                <Block
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    gap={8}
                                                                    flexGrow={1}
                                                                >
                                                                    {item.slot1 && (
                                                                        <Block
                                                                            flexShrink={
                                                                                0
                                                                            }
                                                                            height="auto"
                                                                            contentCentered
                                                                        >
                                                                            {
                                                                                item.slot1
                                                                            }
                                                                        </Block>
                                                                    )}
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
                                                                            500
                                                                        }
                                                                        truncate
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Text>
                                                                </Block>
                                                                <Block
                                                                    display="flex"
                                                                    alignItems="center"
                                                                >
                                                                    <Block
                                                                        size={
                                                                            16
                                                                        }
                                                                        backgroundColor={
                                                                            isSelected
                                                                                ? FOUNDATION_THEME
                                                                                      .colors
                                                                                      .primary[600]
                                                                                : 'transparent'
                                                                        }
                                                                        border={
                                                                            isSelected
                                                                                ? 'none'
                                                                                : `2px solid ${FOUNDATION_THEME.colors.gray[300]}`
                                                                        }
                                                                        borderRadius={
                                                                            2
                                                                        }
                                                                        contentCentered
                                                                    >
                                                                        {isSelected && (
                                                                            <Text
                                                                                variant="body.xs"
                                                                                color="white"
                                                                                fontWeight={
                                                                                    600
                                                                                }
                                                                            >
                                                                                ✓
                                                                            </Text>
                                                                        )}
                                                                    </Block>
                                                                </Block>
                                                            </Block>
                                                            {item.subLabel && (
                                                                <Block
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    width="100%"
                                                                >
                                                                    <Text
                                                                        variant="body.sm"
                                                                        color={
                                                                            FOUNDATION_THEME
                                                                                .colors
                                                                                .gray[400]
                                                                        }
                                                                        fontWeight={
                                                                            400
                                                                        }
                                                                    >
                                                                        {
                                                                            item.subLabel
                                                                        }
                                                                    </Text>
                                                                </Block>
                                                            )}
                                                        </Block>
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

                                {selectedValues.length > 0 && (
                                    <Block
                                        marginTop={16}
                                        padding={12}
                                        backgroundColor={
                                            FOUNDATION_THEME.colors.gray[50]
                                        }
                                        borderRadius={8}
                                    >
                                        <Block marginBottom={8}>
                                            <Text
                                                variant="body.sm"
                                                fontWeight={500}
                                            >
                                                Selected (
                                                {selectedValues.length}):
                                            </Text>
                                        </Block>
                                        <Block
                                            display="flex"
                                            flexWrap="wrap"
                                            gap={8}
                                        >
                                            {selectedValues.map((value) => (
                                                <Block
                                                    key={value}
                                                    display="flex"
                                                    alignItems="center"
                                                    gap={4}
                                                    padding="4px 8px"
                                                    backgroundColor={
                                                        FOUNDATION_THEME.colors
                                                            .primary[100]
                                                    }
                                                    borderRadius={4}
                                                >
                                                    <Text
                                                        variant="body.xs"
                                                        color={
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .primary[700]
                                                        }
                                                    >
                                                        {valueLabelMap[value]}
                                                    </Text>
                                                    <Button
                                                        buttonType={
                                                            ButtonType.SECONDARY
                                                        }
                                                        size={ButtonSize.SMALL}
                                                        leadingIcon={
                                                            <X size={12} />
                                                        }
                                                        onClick={() =>
                                                            onChange(value)
                                                        }
                                                    />
                                                </Block>
                                            ))}
                                        </Block>
                                    </Block>
                                )}
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>

                {variant === MultiSelectVariant.CONTAINER && (
                    <InputFooter hintText={hintText} />
                )}
            </Block>
        )
    }

    return (
        <Block
            width="100%"
            display="flex"
            flexDirection="column"
            gap={8}
            maxWidth={'100%'}
        >
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
            <Block display="flex">
                <Block
                    width={
                        variant === MultiSelectVariant.CONTAINER
                            ? '100%'
                            : 'auto'
                    }
                    maxWidth={
                        variant === MultiSelectVariant.NO_CONTAINER
                            ? '100%'
                            : 'auto'
                    }
                    display="flex"
                    alignItems="center"
                >
                    <MultiSelectMenu
                        items={items}
                        selected={selectedValues}
                        onSelect={onChange}
                        disabled={disabled}
                        enableSearch={enableSearch}
                        searchPlaceholder={searchPlaceholder}
                        enableSelectAll={enableSelectAll}
                        selectAllText={selectAllText}
                        onSelectAll={
                            enableSelectAll
                                ? (selectAll: boolean) =>
                                      handleSelectAll(
                                          selectAll,
                                          items,
                                          selectedValues,
                                          onChange
                                      )
                                : undefined
                        }
                        minWidth={minWidth}
                        maxWidth={maxWidth}
                        maxHeight={maxHeight}
                        alignment={alignment}
                        side={side}
                        sideOffset={sideOffset}
                        alignOffset={alignOffset}
                        open={open}
                        onOpenChange={setOpen}
                        trigger={
                            <MultiSelectTrigger
                                selectedValues={selectedValues}
                                valueLabelMap={valueLabelMap}
                                variant={variant}
                                selectionTagType={selectionTagType}
                                slot={slot}
                                label={label}
                                placeholder={placeholder}
                                size={size}
                                required={required}
                                open={open}
                                disabled={disabled}
                                multiSelectTokens={multiSelectTokens}
                                onClearAll={handleClearAll}
                            />
                        }
                    />
                </Block>
            </Block>
            {variant === MultiSelectVariant.CONTAINER && (
                <InputFooter hintText={hintText} />
            )}
        </Block>
    )
}

export default MultiSelect
