import {
    cloneElement,
    isValidElement,
    ReactNode,
    type ReactElement,
} from 'react'

export function hasAccessibleLabel(slot: ReactElement): boolean {
    const props = slot.props as Record<string, unknown>
    return 'aria-label' in props || 'aria-labelledby' in props
}

export function addAccessibleAriaAttributes(slot: ReactNode): ReactNode {
    if (!isValidElement(slot)) {
        return slot
    }

    if (hasAccessibleLabel(slot)) {
        return slot
    }

    return cloneElement(slot, {
        'aria-hidden': 'true',
    } as Record<string, unknown>)
}
