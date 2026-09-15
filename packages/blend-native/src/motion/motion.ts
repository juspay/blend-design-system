/**
 * Motion tokens and presets.
 *
 * Web Blend has no motion token layer — durations and curves are scattered
 * inline (`transition: 'transform 0.15s ease-in-out'`, the MenuV2/ModalV2
 * animation modules). Native centralises them here so every overlay and
 * state change moves the same way.
 *
 * Pure data, deliberately independent of any animation library: consumers
 * (the Reanimated-based overlay components) translate a preset into
 * `withTiming`/`withSpring` calls. Keeping the descriptions library-free
 * means this module stays vitest-testable and the animation dependency
 * stays contained to the components that actually animate.
 */

/** Milliseconds. `fast` = state feedback, `normal` = overlays, `slow` = sheets. */
export const MOTION_DURATION = {
    fast: 150,
    normal: 250,
    slow: 400,
} as const

/** Cubic-bezier control points, CSS order `[x1, y1, x2, y2]`. */
export const MOTION_EASING = {
    /** Both ends eased — in-place state changes. */
    standard: [0.4, 0, 0.2, 1],
    /** Fast start, soft landing — content entering the screen. */
    decelerate: [0, 0, 0.2, 1],
    /** Soft start, fast exit — content leaving the screen. */
    accelerate: [0.4, 0, 1, 1],
} as const

export type MotionEasing = keyof typeof MOTION_EASING

/** Transform/opacity state at one end of a transition. */
export type MotionFrame = {
    opacity?: number
    scale?: number
    translateX?: number
    translateY?: number
}

export type MotionPreset = {
    from: MotionFrame
    to: MotionFrame
    duration: number
    easing: MotionEasing
    /** Exit timing — exits run faster than entrances by convention. */
    exitDuration: number
    exitEasing: MotionEasing
}

/**
 * The presets the overlay components share.
 *
 * - `fade` — tooltips, backdrops.
 * - `scaleFade` — menus, popovers, selects (anchored surfaces growing from
 *   their anchor).
 * - `slideUp` — toasts and sheets entering from the bottom edge (the
 *   translate distance is a starting offset; sheets override it with their
 *   own measured height).
 * - `slideDown` — banners entering from the top edge.
 */
export const MOTION_PRESETS = {
    fade: {
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: MOTION_DURATION.fast,
        easing: 'decelerate',
        exitDuration: MOTION_DURATION.fast,
        exitEasing: 'accelerate',
    },
    scaleFade: {
        from: { opacity: 0, scale: 0.95 },
        to: { opacity: 1, scale: 1 },
        duration: MOTION_DURATION.normal,
        easing: 'decelerate',
        exitDuration: MOTION_DURATION.fast,
        exitEasing: 'accelerate',
    },
    slideUp: {
        from: { opacity: 0, translateY: 16 },
        to: { opacity: 1, translateY: 0 },
        duration: MOTION_DURATION.normal,
        easing: 'decelerate',
        exitDuration: MOTION_DURATION.fast,
        exitEasing: 'accelerate',
    },
    slideDown: {
        from: { opacity: 0, translateY: -16 },
        to: { opacity: 1, translateY: 0 },
        duration: MOTION_DURATION.normal,
        easing: 'decelerate',
        exitDuration: MOTION_DURATION.fast,
        exitEasing: 'accelerate',
    },
} as const satisfies Record<string, MotionPreset>

export type MotionPresetName = keyof typeof MOTION_PRESETS

/**
 * A preset with motion removed — what every animation collapses to when the
 * user has OS reduce-motion enabled (see `useReduceMotion`): a fast opacity
 * change, no movement, no scaling.
 */
export function reducedMotionVariant(preset: MotionPreset): MotionPreset {
    return {
        from: { opacity: preset.from.opacity ?? 0 },
        to: { opacity: preset.to.opacity ?? 1 },
        duration: MOTION_DURATION.fast,
        easing: 'standard',
        exitDuration: MOTION_DURATION.fast,
        exitEasing: 'standard',
    }
}
