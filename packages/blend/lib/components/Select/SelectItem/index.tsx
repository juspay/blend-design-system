import { forwardRef, useRef, useState, useEffect } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { Tooltip } from '../../Tooltip'
import { Checkbox } from '../../Checkbox'
import { Check } from 'lucide-react'
import { type SelectItemProps } from './types'
import { checkIfTruncated, isItemSelected, getRightSlotConfig } from './utils'

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
            tokens,
        },
        ref
    ) => {
        const textRef = useRef<HTMLDivElement>(null)
        const subLabelRef = useRef<HTMLDivElement>(null)
        const [showTooltip, setShowTooltip] = useState(false)
        const [showSubLabelTooltip, setShowSubLabelTooltip] = useState(false)

        const isSelected = isItemSelected(item.value, selected, type)

        // Check for truncation on mount and when content changes
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

                // Re-check on resize
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
            <div>
                {showTooltip && item.label && <div>{item.label}</div>}
                {showSubLabelTooltip && item.subLabel && (
                    <div>{item.subLabel}</div>
                )}
            </div>
        )

        const rightSlotConfig = getRightSlotConfig(isSelected, type, item)

        const rightSlotContent = rightSlotConfig ? (
            rightSlotConfig.type === 'checkbox' ? (
                <Checkbox {...rightSlotConfig.props} />
            ) : (
                <Check {...rightSlotConfig.props} />
            )
        ) : null

        const itemContent = (
            <RadixMenu.Item
                asChild
                onClick={handleClick}
                data-disabled={item.disabled}
            >
                <Block
                    ref={ref}
                    margin={tokens?.dropdown?.item?.margin || '0px 6px'}
                    padding={tokens?.dropdown?.item?.padding || '8px 6px'}
                    display="flex"
                    flexDirection="column"
                    gap={tokens?.dropdown?.item?.gap || 4}
                    borderRadius={tokens?.dropdown?.item?.borderRadius || 4}
                    outline="none"
                    border="none"
                    color={
                        item.disabled
                            ? tokens?.dropdown?.item?.label?.color?.disabled
                            : isSelected
                              ? tokens?.dropdown?.item?.label?.color?.selected
                              : tokens?.dropdown?.item?.label?.color?.default
                    }
                    backgroundColor={
                        isSelected
                            ? tokens?.dropdown?.item?.backgroundColor?.selected
                            : tokens?.dropdown?.item?.backgroundColor?.default
                    }
                    _hover={{
                        backgroundColor:
                            tokens?.dropdown?.item?.backgroundColor?.hover,
                    }}
                    _active={{
                        backgroundColor:
                            tokens?.dropdown?.item?.backgroundColor?.active,
                    }}
                    _focus={{
                        backgroundColor:
                            tokens?.dropdown?.item?.backgroundColor?.focus,
                    }}
                    _focusVisible={{
                        backgroundColor:
                            tokens?.dropdown?.item?.backgroundColor
                                ?.focusVisible,
                    }}
                    cursor={item.disabled ? 'not-allowed' : 'pointer'}
                    style={{ userSelect: 'none' }}
                    className={className}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                        maxWidth="100%"
                        gap={8}
                    >
                        <Block
                            as="div"
                            display="flex"
                            alignItems="center"
                            gap={8}
                        >
                            {item.slot1 && <MenuItemSlot slot={item.slot1} />}
                            <Block
                                flexGrow={1}
                                display="flex"
                                overflow="hidden"
                                ref={textRef}
                            >
                                <PrimitiveText
                                    fontSize={
                                        tokens?.dropdown?.item?.label?.fontSize
                                    }
                                    fontWeight={
                                        tokens?.dropdown?.item?.label
                                            ?.fontWeight
                                    }
                                    truncate={!item.disableTruncation}
                                    style={{ width: '100%' }}
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
                        <Block ref={subLabelRef} overflow="hidden">
                            <PrimitiveText
                                fontSize={
                                    tokens?.dropdown?.item?.subLabel?.fontSize
                                }
                                fontWeight={
                                    tokens?.dropdown?.item?.subLabel?.fontWeight
                                }
                                color={
                                    isSelected
                                        ? tokens?.dropdown?.item?.subLabel
                                              ?.color?.selected
                                        : tokens?.dropdown?.item?.subLabel
                                              ?.color?.default
                                }
                                truncate={!item.disableTruncation}
                                style={{ width: '100%' }}
                            >
                                {item.subLabel}
                            </PrimitiveText>
                        </Block>
                    )}
                </Block>
            </RadixMenu.Item>
        )

        // Wrap with tooltip if needed
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
