import type {
    SkeletonShape,
    SkeletonTokensType,
} from '@juspay/blend-design-system/node'
import {
    parseBorderRadius,
    parseDuration,
    parseSize,
} from '../../adapters/cssStringAdapter'

/**
 * Pure resolution for the native Skeleton — vitest-testable, worklet-free.
 */

/** Default when the token duration cannot be parsed. */
export const SKELETON_FALLBACK_DURATION = 1500

/**
 * Animation cycle length in milliseconds, from the token's CSS duration
 * string (`"1.5s"`).
 */
export function resolveSkeletonDuration(tokens: SkeletonTokensType): number {
    return (
        parseDuration(tokens.animation.duration as string | number) ??
        SKELETON_FALLBACK_DURATION
    )
}

/**
 * Border radius for a shape.
 *
 * The `circle` token is CSS `"50%"`, which RN cannot express — a circle
 * needs a numeric radius of half the box. When the box size is unknown
 * (string sizes, wrap mode) a large radius produces the same pill/circle
 * silhouette, the same trick web's `radius.full` relies on.
 */
export function resolveSkeletonRadius(
    shape: SkeletonShape,
    tokens: SkeletonTokensType,
    width?: string | number,
    height?: string | number
): number {
    if (shape === 'circle') {
        const w = typeof width === 'number' ? width : parseSize(String(width))
        const h =
            typeof height === 'number' ? height : parseSize(String(height))
        if (typeof w === 'number' && typeof h === 'number') {
            return Math.min(w, h) / 2
        }
        return 9999
    }
    const parsed = parseBorderRadius(
        tokens.borderRadius[shape] as string | number
    )
    return typeof parsed === 'number' ? parsed : 0
}
