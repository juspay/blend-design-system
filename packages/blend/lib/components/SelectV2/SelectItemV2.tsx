import { forwardRef, useRef, useState, useEffect, useCallback } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { Tooltip, TooltipSide } from '../Tooltip'
import { Check } from 'lucide-react'
import { checkIfTruncated } from '../Select/SelectItem/utils'
import type { SelectItemV2Props } from './types'

const SlotWrapper = ({ slot }: { slot: React.ReactNode }) => (
    <Block data-element="icon" flexShrink={0} height="auto" contentCentered>
        {slot}
    </Block>
)

const SelectItemV2 = forwardRef<HTMLDivElement, SelectItemV2Props>(
    (
        {
            item,
            selected,
            onSelect,
            itemTokens,
            index = 0,
            showCheckmark = true,
            selectedPosition = 'none',
            className,
        },
        ref
    ) => {
        const textRef = useRef<HTMLDivElement>(null)
        const subLabelRef = useRef<HTMLDivElement>(null)
        const [showTooltip, setShowTooltip] = useState(false)
        const [showSubLabelTooltip, setShowSubLabelTooltip] = useState(false)
        const resizeObserverRef = useRef<ResizeObserver | null>(null)
        const rafRef = useRef<number | null>(null)

        const isSelected = selected === item.value

        const checkTruncation = useCallback(() => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
            resizeObserverRef.current?.disconnect()
            rafRef.current = requestAnimationFrame(() => {
                let nextShow = false
                let nextSub = false
                if (textRef.current)
                    nextShow = checkIfTruncated(textRef.current)
                if (item.subLabel && subLabelRef.current)
                    nextSub = checkIfTruncated(subLabelRef.current)
                setShowTooltip((p) => (p !== nextShow ? nextShow : p))
                setShowSubLabelTooltip((p) => (p !== nextSub ? nextSub : p))
                requestAnimationFrame(() => {
                    const ro = resizeObserverRef.current
                    if (!ro) return
                    if (textRef.current) ro.observe(textRef.current)
                    if (subLabelRef.current) ro.observe(subLabelRef.current)
                })
                rafRef.current = null
            })
        }, [item.subLabel])

        useEffect(() => {
            if (item.disableTruncation) return
            resizeObserverRef.current = new ResizeObserver(() =>
                checkTruncation()
            )
            checkTruncation()
            return () => {
                resizeObserverRef.current?.disconnect()
                resizeObserverRef.current = null
                if (rafRef.current !== null)
                    cancelAnimationFrame(rafRef.current)
            }
        }, [item.label, item.subLabel, item.disableTruncation, checkTruncation])

        const handleSelect = (e: Event) => {
            if (item.disabled) {
                e.preventDefault()
                return
            }
            onSelect(item.value)
        }

        const hasTooltip =
            (showTooltip && !!item.label) ||
            (showSubLabelTooltip && !!item.subLabel) ||
            !!item.tooltip
        const tooltipContent = item.tooltip ?? (
            <>
                {showTooltip && item.label && <span>{item.label}</span>}
                {showSubLabelTooltip && item.subLabel && (
                    <Block style={{ display: 'block' }}>{item.subLabel}</Block>
                )}
            </>
        )

        const defaultRadius = String(itemTokens.borderRadius ?? '')
        const getBorderRadius = (): string => {
            if (!isSelected || selectedPosition === 'none') return defaultRadius
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

        const colorState = item.disabled
            ? 'disabled'
            : isSelected
              ? 'selected'
              : 'default'
        const itemContent = (
            <RadixMenu.Item
                asChild
                onSelect={handleSelect}
                data-disabled={item.disabled}
                disabled={item.disabled}
            >
                <Block
                    data-numeric={index + 1}
                    data-state={isSelected ? 'selected' : 'not selected'}
                    data-element="select-item"
                    data-id={item.label || 'select-item'}
                    ref={ref}
                    role="menuitem"
                    tabIndex={item.disabled ? -1 : 0}
                    padding={itemTokens.padding as string}
                    display="flex"
                    flexDirection="column"
                    gap={itemTokens.gap as number}
                    borderRadius={getBorderRadius()}
                    outline="none"
                    border="none"
                    width="100%"
                    maxWidth="100%"
                    minWidth={0}
                    color={itemTokens.optionText.color[colorState]}
                    backgroundColor={
                        isSelected
                            ? itemTokens.backgroundColor.selected
                            : itemTokens.backgroundColor.default
                    }
                    _hover={{
                        backgroundColor: itemTokens.backgroundColor.hover,
                    }}
                    _active={{
                        backgroundColor: itemTokens.backgroundColor.active,
                    }}
                    _focus={{
                        backgroundColor: itemTokens.backgroundColor.focus,
                    }}
                    _focusVisible={{
                        backgroundColor:
                            itemTokens.backgroundColor.focusVisible,
                    }}
                    cursor={item.disabled ? 'not-allowed' : 'pointer'}
                    style={{ userSelect: 'none', overflow: 'hidden' }}
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
                            {item.slot1 && <SlotWrapper slot={item.slot1} />}
                            <Block
                                data-element="select-item-label"
                                data-id={item.label || 'select-item-label'}
                                flexGrow={1}
                                display="flex"
                                overflow="hidden"
                                ref={textRef}
                                style={{ minWidth: 0, maxWidth: '100%' }}
                            >
                                <PrimitiveText
                                    data-text={item.label}
                                    fontSize={itemTokens.optionText.fontSize}
                                    fontWeight={
                                        itemTokens.optionText.fontWeight
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
                            {item.slot2 && <SlotWrapper slot={item.slot2} />}
                            {item.slot3 && <SlotWrapper slot={item.slot3} />}
                            {item.slot4 && <SlotWrapper slot={item.slot4} />}
                            {showCheckmark && isSelected && (
                                <Block
                                    as="span"
                                    display="flex"
                                    alignItems="center"
                                    flexShrink={0}
                                >
                                    <Check
                                        data-element="checkbox"
                                        data-id={item.value || 'checkbox'}
                                        data-state="selected"
                                        data-status={
                                            item.disabled
                                                ? 'disabled'
                                                : 'enabled'
                                        }
                                        size={16}
                                    />
                                </Block>
                            )}
                        </Block>
                    </Block>
                    {item.subLabel && (
                        <Block
                            data-element="select-item-sublabel"
                            data-id={item.subLabel || 'select-item-sublabel'}
                            ref={subLabelRef}
                            overflow="hidden"
                            style={{ minWidth: 0, maxWidth: '100%' }}
                        >
                            <PrimitiveText
                                fontSize={itemTokens.description.fontSize}
                                fontWeight={itemTokens.description.fontWeight}
                                color={
                                    itemTokens.description.color[
                                        isSelected ? 'selected' : 'default'
                                    ]
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
                <Tooltip
                    content={tooltipContent}
                    fullWidth
                    side={
                        (item.tooltipProps?.side as TooltipSide) ??
                        TooltipSide.RIGHT
                    }
                    {...item.tooltipProps}
                >
                    {itemContent}
                </Tooltip>
            )
        }
        return itemContent
    }
)

SelectItemV2.displayName = 'SelectItemV2'

export default SelectItemV2
