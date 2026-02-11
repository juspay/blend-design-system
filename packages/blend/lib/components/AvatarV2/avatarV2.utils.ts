import type { ReactNode } from 'react'
import {
    AvatarV2Status,
    AvatarV2StatusPosition,
    AvatarV2Shape,
    AvatarV2Size,
} from './avatarV2.types'

export const DEFAULT_AVATAR_ALT = 'Avatar'
export const DEFAULT_FALLBACK_COLOR = '#94A3B8'

const AVATAR_COLOR_PALETTE: readonly string[] = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Sky Blue
    '#FFA07A', // Light Salmon
    '#98D8C8', // Mint
    '#F7DC6F', // Yellow
    '#BB8FCE', // Purple
    '#85C1E2', // Light Blue
    '#F8B739', // Orange
    '#52B788', // Green
    '#E85D75', // Pink
    '#6C5CE7', // Indigo
    '#00B894', // Emerald
    '#FDCB6E', // Amber
    '#E17055', // Terra Cotta
    '#74B9FF', // Blue
    '#A29BFE', // Lavender
    '#FD79A8', // Rose
    '#00CEC9', // Cyan
    '#FF7675', // Coral
] as const

export function getInitialsFromText(text?: string): string {
    if (!text || text.trim() === '') {
        return ''
    }

    return text
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('')
}

export function sanitizeTextForLabel(text: string): string {
    if (!text) {
        return ''
    }
    return text.trim().replace(/\s+/g, ' ')
}

export function renderFallbackContent(
    fallbackText?: string,
    alt?: string
): ReactNode {
    if (fallbackText !== undefined) {
        if (typeof fallbackText === 'string') {
            return fallbackText.substring(0, 2).toUpperCase()
        }
        return fallbackText
    }
    return getInitialsFromText(alt)
}

function hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash
    }
    return Math.abs(hash)
}

export function getColorFromText(text: string): string {
    if (!text || text.trim() === '') {
        return DEFAULT_FALLBACK_COLOR
    }

    const normalizedText = text.trim().toLowerCase()
    const hash = hashString(normalizedText)
    const colorIndex = hash % AVATAR_COLOR_PALETTE.length

    return AVATAR_COLOR_PALETTE[colorIndex]
}

export function getAccessibleLabel(alt: string, status: string): string {
    const sanitizedAlt = sanitizeTextForLabel(alt) || DEFAULT_AVATAR_ALT

    if (!status || status === AvatarV2Status.NONE) {
        return sanitizedAlt
    }

    const statusText = status
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .toLowerCase()

    return `${sanitizedAlt}, ${statusText}`
}

export function getAriaLiveValue(status: string): 'polite' | undefined {
    if (status && status !== AvatarV2Status.NONE) {
        return 'polite'
    }
    return undefined
}

const STATUS_POSITIONS = {
    sm: {
        [AvatarV2Shape.CIRCLE]: {
            [AvatarV2Size.XS]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.SM]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.MD]: { top: '-3px', right: '-4px', bottom: '0px' },
            [AvatarV2Size.LG]: { top: '0.2px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XL]: { top: '1.167px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XXL]: { top: '2px', right: '-2px', bottom: '0px' },
        },
        [AvatarV2Shape.ROUNDED]: {
            [AvatarV2Size.XS]: { top: '-2px', right: '-2px', bottom: '-1px' },
            [AvatarV2Size.SM]: { top: '-2px', right: '-3px', bottom: '-1px' },
            [AvatarV2Size.MD]: {
                top: '-3.667px',
                right: '-5px',
                bottom: '-3px',
            },
            [AvatarV2Size.LG]: {
                top: '-3.111px',
                right: '-8.222px',
                bottom: '-3px',
            },
            [AvatarV2Size.XL]: {
                top: '-3.111px',
                right: '-10.222px',
                bottom: '-4px',
            },
            [AvatarV2Size.XXL]: { top: '-3px', right: '-12px', bottom: '-4px' },
        },
        [AvatarV2Shape.SQUARE]: {
            [AvatarV2Size.XS]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.SM]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.MD]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.LG]: { top: '-3px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XL]: { top: '-3px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XXL]: { top: '-4px', right: '-4px', bottom: '0px' },
        },
    },
    lg: {
        [AvatarV2Shape.CIRCLE]: {
            [AvatarV2Size.XS]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.SM]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.MD]: { top: '-3px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.LG]: { top: '0px', right: '2px', bottom: '0px' },
            [AvatarV2Size.XL]: { top: '8px', right: '3px', bottom: '0px' },
            [AvatarV2Size.XXL]: { top: '10px', right: '4px', bottom: '0px' },
        },
        [AvatarV2Shape.ROUNDED]: {
            [AvatarV2Size.XS]: { top: '-3px', right: '-3px', bottom: '-3px' },
            [AvatarV2Size.SM]: { top: '-3px', right: '-3px', bottom: '-3px' },
            [AvatarV2Size.MD]: { top: '-3px', right: '-3px', bottom: '-3px' },
            [AvatarV2Size.LG]: { top: '-5px', right: '-5px', bottom: '-5px' },
            [AvatarV2Size.XL]: { top: '-8px', right: '-8px', bottom: '-8px' },
            [AvatarV2Size.XXL]: {
                top: '-10px',
                right: '-10px',
                bottom: '-10px',
            },
        },
        [AvatarV2Shape.SQUARE]: {
            [AvatarV2Size.XS]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.SM]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.MD]: { top: '-2px', right: '-2px', bottom: '0px' },
            [AvatarV2Size.LG]: { top: '-3px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XL]: { top: '-3px', right: '-3px', bottom: '0px' },
            [AvatarV2Size.XXL]: { top: '-4px', right: '-4px', bottom: '0px' },
        },
    },
}

export function getStatusPositionStyles(
    position: AvatarV2StatusPosition,
    size: AvatarV2Size,
    shape: AvatarV2Shape,
    breakpoint: 'sm' | 'lg' = 'lg'
): { top?: string; right?: string; bottom?: string; left?: string } {
    const basePosition = STATUS_POSITIONS[breakpoint]?.[shape]?.[size] || {
        top: '0',
        right: '0',
        bottom: '0',
    }

    switch (position) {
        case AvatarV2StatusPosition.TOP_RIGHT:
            return { top: basePosition.top, right: basePosition.right }
        case AvatarV2StatusPosition.TOP_LEFT:
            return { top: basePosition.top, left: basePosition.right }
        case AvatarV2StatusPosition.BOTTOM_RIGHT:
            return { bottom: basePosition.bottom, right: basePosition.right }
        case AvatarV2StatusPosition.BOTTOM_LEFT:
            return { bottom: basePosition.bottom, left: basePosition.right }
        default:
            return { top: basePosition.top, right: basePosition.right }
    }
}
export function createKeyboardHandler(
    onClick: ((event: React.MouseEvent<HTMLDivElement>) => void) | undefined
) {
    if (!onClick) {
        return undefined
    }

    return (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()

            const syntheticEvent = {
                ...e,
                currentTarget: e.currentTarget,
                target: e.target,
                button: 0,
                buttons: 0,
                clientX: 0,
                clientY: 0,
                pageX: 0,
                pageY: 0,
                screenX: 0,
                screenY: 0,
                relatedTarget: null,
                movementX: 0,
                movementY: 0,
                nativeEvent: e.nativeEvent,
                bubbles: true,
                cancelable: true,
                defaultPrevented: false,
                eventPhase: 0,
                isTrusted: false,
                timeStamp: Date.now(),
                type: 'click',
            } as unknown as React.MouseEvent<HTMLDivElement>

            onClick(syntheticEvent)
        }
    }
}

export function isInteractive(
    onClick: ((event: React.MouseEvent<HTMLDivElement>) => void) | undefined
): boolean {
    return onClick !== undefined
}
