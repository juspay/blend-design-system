import type { KeyboardEvent, MouseEvent } from 'react'

export const getAccessibleName = (
    text: string,
    isInteractive: boolean,
    ariaPressed: boolean | 'mixed' | undefined
): string | undefined => {
    if (!isInteractive) {
        return undefined
    }

    let accessibleName = text

    if (ariaPressed !== undefined) {
        if (ariaPressed === true) {
            accessibleName = `${text}, pressed`
        } else if (ariaPressed === 'mixed') {
            accessibleName = `${text}, mixed state`
        }
    }

    return accessibleName
}

export const createKeyboardHandler = (
    isInteractive: boolean,
    onClick?: (event: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
) => {
    if (!isInteractive || !onClick) {
        return undefined
    }

    return (event: KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            event.stopPropagation()
            const syntheticEvent = {
                ...event,
                currentTarget: event.currentTarget,
                clientX: 0,
                clientY: 0,
            } as unknown as MouseEvent<HTMLButtonElement | HTMLDivElement>
            onClick(syntheticEvent)
        }
    }
}
