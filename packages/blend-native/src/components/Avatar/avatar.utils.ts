import type { ViewStyle } from 'react-native'
import {
    AvatarV2Status,
    AvatarV2StatusPosition,
    getInitialsFromText,
} from '@juspay/blend-design-system/node'
import type {
    AvatarV2Shape,
    AvatarV2Size,
    AvatarV2TokensType,
} from '@juspay/blend-design-system/node'
import { parseDimension } from '../../adapters/cssStringAdapter'

/**
 * Corner offsets for the status dot. The tokens carry per-shape/size
 * `{ top, right, bottom }` offsets (fractional and negative px strings —
 * `parseDimension` handles both); web derives `left` by reusing `right`,
 * mirrored here.
 */
export function resolveStatusPosition(
    tokens: AvatarV2TokensType,
    shape: AvatarV2Shape,
    size: AvatarV2Size,
    position: AvatarV2StatusPosition
): ViewStyle {
    const offsets = tokens.container.status.position[shape]?.[size] ?? {}
    const top = parseDimension(offsets.top as string | number | undefined)
    const right = parseDimension(offsets.right as string | number | undefined)
    const bottom = parseDimension(offsets.bottom as string | number | undefined)

    switch (position) {
        case AvatarV2StatusPosition.TOP_RIGHT:
            return { top, right }
        case AvatarV2StatusPosition.TOP_LEFT:
            return { top, left: right }
        case AvatarV2StatusPosition.BOTTOM_LEFT:
            return { bottom, left: right }
        case AvatarV2StatusPosition.BOTTOM_RIGHT:
        default:
            return { bottom, right }
    }
}

/**
 * Web's `renderFallbackContent` text branch: an explicit `fallbackText`
 * wins (first two characters), otherwise initials derive from `alt` via
 * the shared `/node` helper so both platforms agree.
 */
export function getInitials(
    fallbackText: string | undefined,
    alt: string | undefined
): string {
    if (fallbackText !== undefined) {
        return fallbackText.substring(0, 2).toUpperCase()
    }
    return getInitialsFromText(alt)
}

/**
 * Web's `getAccessibleLabel`: the name plus the status, so "Jane Doe,
 * online" reads in one announcement.
 */
export function getAvatarAccessibleLabel(
    alt: string | undefined,
    status: AvatarV2Status | undefined
): string {
    const name = alt?.trim() || 'Avatar'
    if (!status || status === AvatarV2Status.NONE) return name
    return `${name}, ${status}`
}
