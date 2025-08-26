import { RefObject } from 'react'
import { SelectItemType } from './types'

// Check if text is truncated in an element
export const checkIfTruncated = (element: HTMLElement | null): boolean => {
    if (!element) return false
    return element.scrollWidth > element.clientWidth
}

// Detect truncation in a ref
export const useTruncationDetection = (ref: RefObject<HTMLElement>) => {
    const checkTruncation = (): boolean => {
        if (!ref.current) return false
        return checkIfTruncated(ref.current)
    }

    return checkTruncation
}

// Check if item is selected based on type
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

// Get configuration for right slot content based on selection state and type
export const getRightSlotConfig = (
    isSelected: boolean,
    type: SelectItemType,
    item: any
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
