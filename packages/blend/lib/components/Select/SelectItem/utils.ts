import { RefObject } from 'react'
import { SelectItemType } from './types'

export const checkIfTruncated = (element: HTMLElement | null): boolean => {
    if (!element) return false
    const isOverflowing = element.scrollWidth > element.clientWidth
    const textElement =
        element.querySelector('[data-truncate="true"]') ||
        element.querySelector('p, span, div')
    if (textElement) {
        return (
            (textElement as HTMLElement).scrollWidth >
            (textElement as HTMLElement).clientWidth
        )
    }
    return isOverflowing
}

// Detect truncation in a ref
export const useTruncationDetection = (ref: RefObject<HTMLElement>) => {
    const checkTruncation = (): boolean => {
        if (!ref.current) return false
        return checkIfTruncated(ref.current)
    }

    return checkTruncation
}

export const isItemSelected = (
    itemValue: string,
    selected: string | string[],
    type: SelectItemType
): boolean => {
    if (type === SelectItemType.SINGLE) {
        return selected === itemValue
    } else {
        return Array.isArray(selected) && selected.includes(itemValue)
    }
}

export const getRightSlotConfig = (
    isSelected: boolean,
    type: SelectItemType,
    item: { disabled?: boolean }
) => {
    if (type === SelectItemType.MULTI) {
        return {
            type: 'checkbox' as const,
            props: {
                disabled: item.disabled,
                checked: isSelected,
            },
        }
    } else if (type === SelectItemType.SINGLE && isSelected) {
        return {
            type: 'icon' as const,
            props: {
                size: 16,
            },
        }
    }
    return null
}
