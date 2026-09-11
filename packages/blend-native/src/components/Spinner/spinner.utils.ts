import type {
    SpinnerSize,
    SpinnerTokensType,
} from '@juspay/blend-design-system/node'
import { parseDimension, parseDuration } from '../../adapters/cssStringAdapter'

/** Web's fixed SVG coordinate space (`Spinner.tsx` viewBox 0 0 48 48). */
export const SPINNER_VIEWBOX = 48
export const SPINNER_CENTER = SPINNER_VIEWBOX / 2

/** Fallback when the duration token fails to parse. Web token is '0.8s'. */
export const DEFAULT_SPIN_DURATION = 800

export type SpinnerGeometry = {
    /** Rendered square size in points. */
    size: number
    /** Stroke width in viewBox units. */
    strokeWidth: number
    /** Arc radius in viewBox units. */
    radius: number
    /** `strokeDasharray` — a quarter arc, web parity. */
    dashArray: [number, number]
}

/**
 * The arc geometry web computes inline (`Spinner.tsx:24-26,73-76`):
 * radius inset by half the stroke, quarter-circumference dash.
 */
export function getSpinnerGeometry(
    size: SpinnerSize,
    tokens: SpinnerTokensType
): SpinnerGeometry {
    const rendered = parseDimension(tokens.size[size] as string | number) ?? 24
    const strokeWidth = tokens.strokeWidth[size]
    const radius = SPINNER_CENTER - strokeWidth / 2
    const circumference = 2 * Math.PI * radius
    return {
        size: rendered,
        strokeWidth,
        radius,
        dashArray: [circumference * 0.25, circumference],
    }
}

/** Rotation-loop duration from the `animation.duration` token ('0.8s'). */
export function getSpinDuration(tokens: SpinnerTokensType): number {
    return (
        parseDuration(tokens.animation.duration as string | number) ??
        DEFAULT_SPIN_DURATION
    )
}
