import { cloneElement, isValidElement } from 'react'
import type { ChangeEvent, CSSProperties } from 'react'
import type { SearchInputV2TokensType } from './SearchInputV2.tokens'
import { InputStateV2 } from '../inputV2.types'
import { getInteractionState } from '../utils/utils'

export type SearchInputV2InteractionStateKey = ReturnType<
    typeof getInteractionState
>

export const getSearchInputV2InputStateKey = (
    error: boolean,
    isFocused: boolean,
    disabled: boolean
): SearchInputV2InteractionStateKey =>
    getInteractionState(
        error
            ? InputStateV2.ERROR
            : disabled
              ? InputStateV2.DISABLED
              : isFocused
                ? InputStateV2.FOCUS
                : InputStateV2.DEFAULT
    )

export const shouldShowSearchInputV2Clear = (
    allowClear: boolean,
    value: string | undefined,
    disabled: boolean
): boolean => allowClear && !!value && value.length > 0 && !disabled

export const createSearchInputV2ClearHandler = (options: {
    disabled: boolean
    onClear?: () => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}): (() => void) => {
    const { disabled, onClear, onChange } = options
    return () => {
        if (disabled) return
        if (onClear) {
            onClear()
        } else if (onChange) {
            const syntheticEvent = {
                target: { value: '' },
                currentTarget: { value: '' },
                preventDefault: () => {},
                stopPropagation: () => {},
            } as ChangeEvent<HTMLInputElement>
            onChange(syntheticEvent)
        }
    }
}

export const getSearchInputV2PaddingInline = (args: {
    paddingX: number
    gap: number
    hasLeftSlot: boolean
    leftSlotWidth: number
    hasRightSlot: boolean
    rightSlotWidth: number
}): { paddingInlineStart: number; paddingInlineEnd: number } => {
    const {
        paddingX,
        gap,
        hasLeftSlot,
        leftSlotWidth,
        hasRightSlot,
        rightSlotWidth,
    } = args
    return {
        paddingInlineStart: hasLeftSlot
            ? paddingX + leftSlotWidth + gap
            : paddingX,
        paddingInlineEnd: hasRightSlot
            ? paddingX + rightSlotWidth + gap
            : paddingX,
    }
}

export const getSearchInputV2SlotWrapperStyle = (
    slot: SearchInputV2TokensType['inputContainer']['slot'],
    inputStateKey: SearchInputV2InteractionStateKey
): CSSProperties => ({
    transition: slot.transition,
    transform: slot.transform,
    color: slot.color[inputStateKey],
})

export const getSearchInputV2PrimitiveInputChrome = (
    ic: SearchInputV2TokensType['inputContainer'],
    disabled: boolean,
    error: boolean
) => ({
    borderBottom: disabled
        ? ic.borderBottom.disabled
        : error
          ? ic.borderBottom.error
          : ic.borderBottom.default,
    color: disabled
        ? ic.color.disabled
        : error
          ? ic.color.error
          : ic.color.default,
    hover: {
        borderBottom: disabled
            ? ic.borderBottom.disabled
            : error
              ? ic.borderBottom.error
              : ic.borderBottom.hover,
        color: disabled
            ? ic.color.disabled
            : error
              ? ic.color.error
              : ic.color.hover,
    },
    focus: {
        borderBottom: disabled
            ? ic.borderBottom.disabled
            : error
              ? ic.borderBottom.error
              : ic.borderBottom.focus,
        color: disabled
            ? ic.color.disabled
            : error
              ? ic.color.error
              : ic.color.focus,
    },
})

export const applyIconStyles = (
    icon: React.ReactNode,
    tokens: SearchInputV2TokensType,
    inputState: SearchInputV2InteractionStateKey
): React.ReactNode => {
    if (!isValidElement(icon)) {
        return icon
    }

    return cloneElement(
        icon as React.ReactElement<{ style?: React.CSSProperties }>,
        {
            style: {
                ...((icon.props as { style?: React.CSSProperties }).style ||
                    {}),
                color: tokens.icon.color[inputState],
                width: tokens.icon.width,
                height: tokens.icon.width,
            },
        }
    )
}

export const toPixels = (value: string | number | undefined): number => {
    if (typeof value === 'number') {
        return value
    }

    if (typeof value === 'string') {
        const numericValue = parseFloat(value.replace('px', ''))
        return isNaN(numericValue) ? 0 : numericValue
    }

    return 0
}
