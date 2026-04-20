import type { ReactNode } from 'react'
import {
    AvatarV2Status,
    AvatarV2StatusPosition,
    AvatarV2Shape,
    AvatarV2Size,
} from './avatarV2.types'
import type { AvatarV2TokensType } from './avatarV2.tokens'

export const DEFAULT_AVATAR_ALT = 'Avatar'
export const DEFAULT_FALLBACK_COLOR = '#94A3B8'
export const MAX_INITIALS_LENGTH = 2
export const DEFAULT_POSITION = { top: '0', right: '0', bottom: '0' } as const

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

const KEYBOARD_KEYS = {
    ENTER: 'Enter',
    SPACE: ' ',
}

const SYNTHETIC_EVENT_DEFAULTS = {
    BUTTON: 0,
    BUTTONS: 0,
    CLIENT_X: 0,
    CLIENT_Y: 0,
    PAGE_X: 0,
    PAGE_Y: 0,
    SCREEN_X: 0,
    SCREEN_Y: 0,
    MOVEMENT_X: 0,
    MOVEMENT_Y: 0,
    EVENT_PHASE: 0,
    IS_TRUSTED: false,
    BUBBLES: true,
    CANCELABLE: true,
    DEFAULT_PREVENTED: false,
    TYPE: 'click',
}

const TEXT_PATTERNS = {
    WHITESPACE: /\s+/g,
    CAPITAL_LETTERS: /([A-Z])/g,
}

export function getInitialsFromText(text?: string): string {
    if (!text || text.trim() === '') {
        return ''
    }

    return text
        .trim()
        .split(TEXT_PATTERNS.WHITESPACE)
        .map((word) => word.charAt(0).toUpperCase())
        .slice(0, MAX_INITIALS_LENGTH)
        .join('')
}

export function sanitizeTextForLabel(text: string): string {
    if (!text) {
        return ''
    }
    return text.trim().replace(TEXT_PATTERNS.WHITESPACE, ' ')
}

export function renderFallbackContent(
    fallbackText?: string,
    alt?: string
): ReactNode {
    if (fallbackText !== undefined) {
        if (typeof fallbackText === 'string') {
            return fallbackText.substring(0, MAX_INITIALS_LENGTH).toUpperCase()
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

export function getAccessibleLabel(
    alt: string,
    fallbackText: string | undefined,
    status: string
): string {
    const name =
        alt ||
        (typeof fallbackText === 'string' ? fallbackText : DEFAULT_AVATAR_ALT)
    const sanitizedName = sanitizeTextForLabel(name)

    if (!status || status === AvatarV2Status.NONE) {
        return sanitizedName
    }

    const statusText = status
        .replace(TEXT_PATTERNS.CAPITAL_LETTERS, ' $1')
        .trim()
        .toLowerCase()

    return `${sanitizedName}, ${statusText}`
}

export function getAriaLiveValue(status: string): 'polite' | undefined {
    if (status && status !== AvatarV2Status.NONE) {
        return 'polite'
    }
    return undefined
}

export function getStatusPositionStyles(
    position: AvatarV2StatusPosition,
    size: AvatarV2Size,
    shape: AvatarV2Shape,
    tokens: AvatarV2TokensType
): { top?: string; right?: string; bottom?: string; left?: string } {
    const basePosition =
        tokens.container.status.position[shape]?.[size] || DEFAULT_POSITION

    const top = basePosition.top?.toString()
    const right = basePosition.right?.toString()
    const bottom = basePosition.bottom?.toString()

    switch (position) {
        case AvatarV2StatusPosition.TOP_RIGHT:
            return { top, right }
        case AvatarV2StatusPosition.TOP_LEFT:
            return { top, left: right }
        case AvatarV2StatusPosition.BOTTOM_RIGHT:
            return { bottom, right }
        case AvatarV2StatusPosition.BOTTOM_LEFT:
            return { bottom, left: right }
        default:
            return { top, right }
    }
}
export function createKeyboardHandler(
    onClick: ((event: React.MouseEvent<HTMLDivElement>) => void) | undefined
) {
    if (!onClick) {
        return undefined
    }

    return (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === KEYBOARD_KEYS.ENTER || e.key === KEYBOARD_KEYS.SPACE) {
            e.preventDefault()
            e.stopPropagation()

            const syntheticEvent = {
                ...e,
                currentTarget: e.currentTarget,
                target: e.target,
                button: SYNTHETIC_EVENT_DEFAULTS.BUTTON,
                buttons: SYNTHETIC_EVENT_DEFAULTS.BUTTONS,
                clientX: SYNTHETIC_EVENT_DEFAULTS.CLIENT_X,
                clientY: SYNTHETIC_EVENT_DEFAULTS.CLIENT_Y,
                pageX: SYNTHETIC_EVENT_DEFAULTS.PAGE_X,
                pageY: SYNTHETIC_EVENT_DEFAULTS.PAGE_Y,
                screenX: SYNTHETIC_EVENT_DEFAULTS.SCREEN_X,
                screenY: SYNTHETIC_EVENT_DEFAULTS.SCREEN_Y,
                relatedTarget: null,
                movementX: SYNTHETIC_EVENT_DEFAULTS.MOVEMENT_X,
                movementY: SYNTHETIC_EVENT_DEFAULTS.MOVEMENT_Y,
                nativeEvent: e.nativeEvent,
                bubbles: SYNTHETIC_EVENT_DEFAULTS.BUBBLES,
                cancelable: SYNTHETIC_EVENT_DEFAULTS.CANCELABLE,
                defaultPrevented: SYNTHETIC_EVENT_DEFAULTS.DEFAULT_PREVENTED,
                eventPhase: SYNTHETIC_EVENT_DEFAULTS.EVENT_PHASE,
                isTrusted: SYNTHETIC_EVENT_DEFAULTS.IS_TRUSTED,
                timeStamp: Date.now(),
                type: SYNTHETIC_EVENT_DEFAULTS.TYPE,
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
