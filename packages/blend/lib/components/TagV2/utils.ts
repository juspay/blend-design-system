import type { KeyboardEvent, MouseEvent } from 'react'
import type { TagV2Size, TagV2SubType } from './TagV2.types'
import type { TagV2TokensType } from './tagV2.tokens'

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

export function getTagBorderRadius(
    size: TagV2Size,
    subType: TagV2SubType,
    tagGroupPosition: 'center' | 'left' | 'right' | undefined,
    tokens: TagV2TokensType
): string {
    const variantBorderRadius = String(tokens.borderRadius[size][subType])

    if (tagGroupPosition === undefined) {
        return variantBorderRadius
    }

    if (tagGroupPosition === 'left') {
        return `${variantBorderRadius} 0 0 ${variantBorderRadius}`
    }

    if (tagGroupPosition === 'right') {
        return `0 ${variantBorderRadius} ${variantBorderRadius} 0`
    }

    return '0px 0px 0px 0px'
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
