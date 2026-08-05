import SelectMenu from './SelectMenu'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../Primitives/Block/Block'
import { ChevronDownIcon, HelpCircleIcon, X } from 'lucide-react'
import {
    type SelectMenuGroupType,
    type SelectMenuItemType,
    SelectMenuSize,
    SelectMenuVariant,
} from './types'
import Text, { type VariantType } from '../Text/Text'
import type { SelectTokensType } from './select.tokens.types'
import { Tooltip, TooltipSize } from '../Tooltip'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

export enum SelectionTagType {
    COUNT = 'count',
    TEXT = 'text',
}

type SelectProps = {
    label: string
    subLabel?: string
    hintText?: string
    required?: boolean
    helpIconText?: string
    placeholder: string
    size?: SelectMenuSize
    items: SelectMenuGroupType[]
    variant?: SelectMenuVariant
    selected: string | string[]
    onSelectChange: (value: string | string[]) => void
    allowMultiSelect?: boolean
    enableSearch?: boolean
    selectionTagType?: SelectionTagType
    slot?: React.ReactNode
}

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

const Select = ({
    items,
    variant = SelectMenuVariant.CONTAINER,
    label = 'Your favorite color',
    subLabel = 'Select an option',
    hintText = 'Hint text',
    required = true,
    helpIconText = 'Help icon text',
    placeholder = 'Select an option',
    size = SelectMenuSize.MEDIUM,
    selected,
    onSelectChange,
    allowMultiSelect = false,
    enableSearch = false,
    selectionTagType = SelectionTagType.COUNT,
    slot,
}: SelectProps) => {
    const { foundationTokens } = useTheme()
    const selectTokens = useResponsiveTokens<SelectTokensType>('SELECT')
    const valueLabelMap = map(items)

    const getLabelsForSelectedValues = (values: string[]) => {
        return values.map((val) => valueLabelMap[val] || val)
    }

    const showCancelButton =
        variant === SelectMenuVariant.CONTAINER &&
        allowMultiSelect &&
        selected.length > 0

    return (
        <Block display="flex" flexDirection="column" gap={8}>
            {variant === SelectMenuVariant.CONTAINER && (
                <Block display="flex" alignItems="center" gap={4}>
                    {variant === SelectMenuVariant.CONTAINER && (
                        <Text
                            as="span"
                            color={selectTokens.trigger.label.color}
                            fontWeight={selectTokens.trigger.label.fontWeight}
                            fontSize={selectTokens.trigger.label.fontSize}
                        >
                            {label}
                        </Text>
                    )}
                    {subLabel && (
                        <Text
                            variant="body.sm"
                            color={selectTokens.labelColors.subLabel}
                        >
                            ({subLabel})
                        </Text>
                    )}
                    {variant === SelectMenuVariant.CONTAINER && required && (
                        <sup
                            style={{ color: selectTokens.labelColors.required }}
                        >
                            *
                        </sup>
                    )}

                    {variant === SelectMenuVariant.CONTAINER &&
                        helpIconText && (
                            <Tooltip
                                content={helpIconText}
                                size={TooltipSize.SMALL}
                            >
                                <HelpCircleIcon
                                    size={14}
                                    color={selectTokens.labelColors.helpIcon}
                                />
                            </Tooltip>
                        )}
                </Block>
            )}
            <Block display="flex">
                <Block
                    width={
                        variant === SelectMenuVariant.CONTAINER
                            ? '100%'
                            : 'min-content'
                    }
                    display="flex"
                    alignItems="center"
                >
                    <SelectMenu
                        enableSearch={enableSearch}
                        items={items}
                        selected={selected}
                        onSelect={onSelectChange}
                        allowMultiSelect={allowMultiSelect}
                        trigger={
                            <PrimitiveButton
                                display="flex"
                                width={'100%'}
                                // width={
                                //   variant === SelectMenuVariant.CONTAINER
                                //     ? "100%"
                                //     : "min-content"
                                // }
                                flexGrow={1}
                                alignItems="center"
                                gap={8}
                                overflow="hidden"
                                borderRadius={`8px ${showCancelButton ? 0 : 8}px ${
                                    showCancelButton ? 0 : 8
                                }px 8px`}
                                boxShadow={
                                    variant === SelectMenuVariant.CONTAINER
                                        ? foundationTokens.shadows.xs
                                        : undefined
                                }
                                backgroundColor={
                                    selectTokens.triggerColors.backgroundColor
                                }
                                outline={
                                    variant === SelectMenuVariant.CONTAINER
                                        ? `${selectTokens.triggerColors.outlineBorder} !important`
                                        : undefined
                                }
                                justifyContent="space-between"
                                paddingX={
                                    selectTokens.trigger.selectedValue.padding[
                                        size
                                    ].x
                                }
                                paddingY={
                                    selectTokens.trigger.selectedValue.padding[
                                        size
                                    ].y
                                }
                                _hover={{
                                    backgroundColor:
                                        selectTokens.triggerColors
                                            .hoverBackgroundColor,
                                }}
                                _focus={{
                                    outline: `${selectTokens.triggerColors.outlineBorderFocus} !important`,
                                }}
                                _active={{
                                    backgroundColor:
                                        selectTokens.triggerColors
                                            .hoverBackgroundColor,
                                    outline: `${selectTokens.triggerColors.outlineBorderFocus} !important`,
                                }}
                            >
                                <Block
                                    as="span"
                                    display="flex"
                                    alignItems="center"
                                    gap={4}
                                >
                                    {slot && (
                                        <Block contentCentered>{slot}</Block>
                                    )}
                                    {allowMultiSelect === false && (
                                        <Block as="span">
                                            {selected ? (
                                                <Text
                                                    variant="body.md"
                                                    fontWeight={500}
                                                    color={
                                                        selectTokens.trigger
                                                            .selectedValue.color
                                                    }
                                                >
                                                    {
                                                        valueLabelMap[
                                                            selected as string
                                                        ]
                                                    }
                                                </Text>
                                            ) : (
                                                <Text
                                                    variant="body.md"
                                                    fontWeight={500}
                                                    color={
                                                        selectTokens
                                                            .triggerColors
                                                            .placeholderColor
                                                    }
                                                >
                                                    {placeholder}
                                                </Text>
                                            )}
                                        </Block>
                                    )}
                                    {allowMultiSelect && (
                                        <Text
                                            variant={
                                                selectTokens.trigger
                                                    .selectedValue.font.size[
                                                    size
                                                ] as VariantType
                                            }
                                            color={
                                                selectTokens.trigger
                                                    .selectedValue.color
                                            }
                                            truncate
                                            style={{
                                                display: 'flex',
                                                gap: 4,
                                            }}
                                        >
                                            <Text
                                                as="span"
                                                variant={
                                                    selectTokens.trigger
                                                        .selectedValue.font
                                                        .size[
                                                        size
                                                    ] as VariantType
                                                }
                                                fontWeight={
                                                    selectTokens.trigger
                                                        .selectedValue.font
                                                        .weight
                                                }
                                                color={
                                                    selectTokens.triggerColors
                                                        .placeholderColor
                                                }
                                            >
                                                {placeholder}
                                            </Text>
                                            {selected &&
                                                selected.length > 0 && (
                                                    <React.Fragment>
                                                        {selectionTagType ===
                                                        SelectionTagType.TEXT ? (
                                                            <Text
                                                                truncate
                                                                as="span"
                                                                color={
                                                                    selectTokens
                                                                        .selectedLabels
                                                                        .color
                                                                }
                                                            >
                                                                {getLabelsForSelectedValues(
                                                                    selected as string[]
                                                                ).join(', ')}
                                                            </Text>
                                                        ) : (
                                                            <Block
                                                                as="span"
                                                                backgroundColor={
                                                                    selectTokens
                                                                        .selectionTag
                                                                        .backgroundColor
                                                                }
                                                                color={
                                                                    selectTokens
                                                                        .selectionTag
                                                                        .color
                                                                }
                                                                borderRadius={4}
                                                                paddingX={4}
                                                                fontSize={12}
                                                                contentCentered
                                                            >
                                                                {
                                                                    selected.length
                                                                }
                                                            </Block>
                                                        )}
                                                    </React.Fragment>
                                                )}
                                        </Text>
                                    )}
                                </Block>
                                <Block size={20} contentCentered>
                                    <ChevronDownIcon
                                        size={16}
                                        color={
                                            selectTokens.triggerColors
                                                .chevronIconColor
                                        }
                                    />
                                </Block>
                            </PrimitiveButton>
                        }
                    />
                    {variant === SelectMenuVariant.CONTAINER &&
                        allowMultiSelect &&
                        selected.length > 0 && (
                            <PrimitiveButton
                                borderRadius={`0 8px 8px 0`}
                                backgroundColor={
                                    selectTokens.clearButton.backgroundColor
                                }
                                _hover={{
                                    backgroundColor:
                                        selectTokens.clearButton
                                            .hoverBackgroundColor,
                                }}
                                _focus={{
                                    backgroundColor:
                                        selectTokens.clearButton
                                            .focusBackgroundColor,
                                    outline: `${selectTokens.clearButton.outlineBorderFocus} !important`,
                                }}
                                contentCentered
                                height={'100%'}
                                style={{ aspectRatio: 1 }}
                                onClick={() => onSelectChange([])}
                                outline={`${selectTokens.clearButton.outlineBorder} !important`}
                            >
                                <X
                                    size={16}
                                    color={selectTokens.clearButton.iconColor}
                                />
                            </PrimitiveButton>
                        )}
                </Block>
            </Block>

            {variant === SelectMenuVariant.CONTAINER && hintText && (
                <Text
                    variant="body.md"
                    color={selectTokens.labelColors.hintText}
                >
                    {hintText}
                </Text>
            )}
        </Block>
    )
}

export default Select
