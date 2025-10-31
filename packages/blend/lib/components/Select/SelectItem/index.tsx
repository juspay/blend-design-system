import { forwardRef, useRef, useState, useEffect } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { Tooltip } from '../../Tooltip'
import { Checkbox } from '../../Checkbox'
import { Check } from 'lucide-react'
import { type SelectItemProps, SelectItemType } from './types'
import { checkIfTruncated, isItemSelected, getRightSlotConfig } from './utils'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { MultiSelectTokensType } from '../../MultiSelect/multiSelect.tokens'
import type { SingleSelectTokensType } from '../../SingleSelect/singleSelect.tokens'

const MenuItemSlot = ({ slot }: { slot: React.ReactNode }) => {
    return (
        <Block flexShrink={0} height="auto" contentCentered>
            {slot}
        </Block>
    )
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
    (
        {
            item,
            onSelect,
            selected,
            type,
            showCheckmark = true,
            className,
            selectedPosition = 'none',
            index = 0,
        },
        ref
    ) => {
        const textRef = useRef<HTMLDivElement>(null)
        const subLabelRef = useRef<HTMLDivElement>(null)
        const [showTooltip, setShowTooltip] = useState(false)
        const [showSubLabelTooltip, setShowSubLabelTooltip] = useState(false)

        const multiSelectTokens =
            useResponsiveTokens<MultiSelectTokensType>('MULTI_SELECT')
        const singleSelectTokens =
            useResponsiveTokens<SingleSelectTokensType>('SINGLE_SELECT')

        const tokens: MultiSelectTokensType | SingleSelectTokensType =
            type === SelectItemType.MULTI
                ? multiSelectTokens
                : singleSelectTokens

        const isSelected = isItemSelected(item.value, selected, type)

        useEffect(() => {
            if (!item.disableTruncation) {
                const checkTruncation = () => {
                    setShowTooltip(checkIfTruncated(textRef.current))
                    if (item.subLabel) {
                        setShowSubLabelTooltip(
                            checkIfTruncated(subLabelRef.current)
                        )
                    }
                }

                checkTruncation()

                const resizeObserver = new ResizeObserver(checkTruncation)
                if (textRef.current) {
                    resizeObserver.observe(textRef.current)
                }
                if (subLabelRef.current) {
                    resizeObserver.observe(subLabelRef.current)
                }

                return () => resizeObserver.disconnect()
            }
        }, [item.label, item.subLabel, item.disableTruncation])

        const handleClick = (e: React.MouseEvent) => {
            if (item.disabled) return

            e.preventDefault()
            e.stopPropagation()
            onSelect(item.value)
        }

        const shouldShowAutoTooltip =
            (showTooltip && item.label) ||
            (showSubLabelTooltip && item.subLabel)
        const customTooltip = item.tooltip
        const hasTooltip = shouldShowAutoTooltip || customTooltip

        const tooltipContent = customTooltip || (
            <>
                {showTooltip && item.label && <span>{item.label}</span>}
                {showSubLabelTooltip && item.subLabel && (
                    <Block style={{ display: 'block' }}>{item.subLabel}</Block>
                )}
            </>
        )

        const rightSlotConfig = getRightSlotConfig(isSelected, type, item)

        const rightSlotContent = rightSlotConfig ? (
            rightSlotConfig.type === 'checkbox' ? (
                <Checkbox
                    data-checkbox-value={item.value}
                    data-selected-checkbox={isSelected}
                    data-checkbox-status={
                        item.disabled ? 'disabled' : 'enabled'
                    }
                    {...rightSlotConfig.props}
                />
            ) : (
                <Check
                    data-checkmark-value={item.value}
                    data-selected-checkmark={isSelected}
                    data-checkmark-status={
                        item.disabled ? 'disabled' : 'enabled'
                    }
                    {...rightSlotConfig.props}
                />
            )
        ) : null

        const getBorderRadius = () => {
            const defaultRadius = tokens?.menu?.item?.borderRadius

            if (!isSelected || selectedPosition === 'none') {
                return defaultRadius
            }

            switch (selectedPosition) {
                case 'first':
                    return `${defaultRadius} ${defaultRadius} 0 0`
                case 'middle':
                    return '0'
                case 'last':
                    return `0 0 ${defaultRadius} ${defaultRadius}`
                case 'only':
                    return defaultRadius
                default:
                    return defaultRadius
            }
        }

        const itemContent = (
            <RadixMenu.Item
                asChild
                onClick={handleClick}
                data-disabled={item.disabled}
            >
                <Block
                    data-dropdown-numeric={index + 1}
                    data-dropdown-value={item.label}
                    data-dropdown-value-selected={isSelected ? 'True' : 'False'}
                    ref={ref}
                    padding={tokens?.menu?.item?.padding}
                    display="flex"
                    flexDirection="column"
                    gap={tokens?.menu?.item?.gap || 4}
                    borderRadius={getBorderRadius()}
                    outline="none"
                    border="none"
                    width="100%"
                    maxWidth="100%"
                    minWidth={0}
                    color={
                        item.disabled
                            ? tokens?.menu?.item?.option?.color?.disabled
                            : isSelected
                              ? tokens?.menu?.item?.option?.color?.selected
                              : tokens?.menu?.item?.option?.color?.default
                    }
                    backgroundColor={
                        isSelected
                            ? tokens?.menu?.item?.backgroundColor?.selected
                            : tokens?.menu?.item?.backgroundColor?.default
                    }
                    _hover={{
                        backgroundColor:
                            tokens?.menu?.item?.backgroundColor?.hover,
                    }}
                    _active={{
                        backgroundColor:
                            tokens?.menu?.item?.backgroundColor?.active,
                    }}
                    _focus={{
                        backgroundColor:
                            tokens?.menu?.item?.backgroundColor?.focus,
                    }}
                    _focusVisible={{
                        backgroundColor:
                            tokens?.menu?.item?.backgroundColor?.focusVisible,
                    }}
                    cursor={item.disabled ? 'not-allowed' : 'pointer'}
                    style={{
                        userSelect: 'none',
                        overflow: 'hidden',
                    }}
                    className={className}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                        maxWidth="100%"
                        gap={8}
                        style={{ minWidth: 0 }}
                    >
                        <Block
                            as="div"
                            display="flex"
                            alignItems="center"
                            gap={8}
                            flexGrow={1}
                            minWidth={0}
                            style={{ overflow: 'hidden' }}
                        >
                            {item.slot1 && <MenuItemSlot slot={item.slot1} />}
                            <Block
                                flexGrow={1}
                                display="flex"
                                overflow="hidden"
                                ref={textRef}
                                style={{ minWidth: 0, maxWidth: '100%' }}
                            >
                                <PrimitiveText
                                    data-text={item.label}
                                    fontSize={
                                        tokens?.menu?.item?.option?.fontSize
                                    }
                                    fontWeight={
                                        tokens?.menu?.item?.option?.fontWeight
                                    }
                                    truncate={!item.disableTruncation}
                                    data-truncate="true"
                                    style={{
                                        width: '100%',
                                        minWidth: 0,
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {item.label}
                                </PrimitiveText>
                            </Block>
                        </Block>
                        <Block
                            as="div"
                            display="flex"
                            alignItems="center"
                            gap={4}
                            flexShrink={0}
                        >
                            {item.slot2 && <MenuItemSlot slot={item.slot2} />}
                            {item.slot3 && <MenuItemSlot slot={item.slot3} />}
                            {item.slot4 && <MenuItemSlot slot={item.slot4} />}
                            {showCheckmark && rightSlotContent && (
                                <Block
                                    as="span"
                                    display="flex"
                                    alignItems="center"
                                    flexShrink={0}
                                >
                                    {rightSlotContent}
                                </Block>
                            )}
                        </Block>
                    </Block>
                    {item.subLabel && (
                        <Block
                            ref={subLabelRef}
                            overflow="hidden"
                            style={{ minWidth: 0, maxWidth: '100%' }}
                        >
                            <PrimitiveText
                                fontSize={
                                    tokens?.menu?.item?.description?.fontSize
                                }
                                fontWeight={
                                    tokens?.menu?.item?.description?.fontWeight
                                }
                                color={
                                    isSelected
                                        ? tokens?.menu?.item?.description?.color
                                              ?.selected
                                        : tokens?.menu?.item?.description?.color
                                              ?.default
                                }
                                truncate={!item.disableTruncation}
                                data-truncate="true"
                                style={{
                                    width: '100%',
                                    minWidth: 0,
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.subLabel}
                            </PrimitiveText>
                        </Block>
                    )}
                </Block>
            </RadixMenu.Item>
        )

        if (hasTooltip) {
            return (
                <Tooltip content={tooltipContent} {...item.tooltipProps}>
                    {itemContent}
                </Tooltip>
            )
        }

        return itemContent
    }
)

SelectItem.displayName = 'SelectItem'

export default SelectItem
export { SelectItemType } from './types'
export type { SelectItemProps, BaseSelectItemType } from './types'
