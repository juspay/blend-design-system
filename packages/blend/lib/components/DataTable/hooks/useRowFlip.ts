import { useRef, useLayoutEffect, useCallback, useMemo } from 'react'
import { useReducedMotion } from './useReducedMotion'
import type { RowAnimationConfig } from '../types'

const DEFAULT_DURATION = 0.35
const DEFAULT_ENTER_DURATION = 0.35
const DEFAULT_ENTER_OFFSET = 12
const DEFAULT_BEZIER = 'cubic-bezier(0.32, 0.72, 0, 1)'

export const ROW_ANIMATION_WARNINGS = {
    bezier: `transitionType is 'bezier' but 'bezier' is not a tuple of four finite numbers — falling back to the default curve.`,
    duration: `'duration' must be a finite number — falling back to the default.`,
    spring: `transitionType 'spring' is not implemented — 'stiffness', 'damping' and 'mass' are ignored and rows animate with the default curve.`,
    enter: `'enterDuration' and 'enterOffset' must both be finite numbers — falling back to defaults.`,
} as const

type WarnFn = (message: string) => void

function toFiniteNumber(value: unknown, fallback: number): number {
    return typeof value === 'number' && Number.isFinite(value)
        ? value
        : fallback
}

function isBezierTuple(
    value: unknown
): value is [number, number, number, number] {
    return (
        Array.isArray(value) &&
        value.length === 4 &&
        value.every((n) => typeof n === 'number' && Number.isFinite(n))
    )
}

function buildTransition(duration: number, cssBezier: string) {
    return {
        duration,
        transition: `transform ${duration}s ${cssBezier}, opacity ${duration}s ${cssBezier}`,
    }
}

function toCssTransition(
    config: RowAnimationConfig,
    warn: WarnFn
): {
    transition: string
    duration: number
} {
    // `duration` only narrows on the bezier arm, but it is independently valid
    // and independently usable: a caller that got the curve wrong may still
    // have supplied a good duration. Read it before branching so a malformed
    // `bezier` costs the caller the curve only, not their timing too.
    const rawDuration = (config as { duration?: unknown }).duration

    // A field that is independently valid deserves an independent diagnostic:
    // a good curve with a broken duration would otherwise animate at the
    // default with no signal at all. Only the bezier arm declares `duration`,
    // so its absence is only a defect there.
    if (
        config.transitionType === 'bezier' &&
        !Number.isFinite(rawDuration as number)
    ) {
        warn(ROW_ANIMATION_WARNINGS.duration)
    }

    const duration = toFiniteNumber(rawDuration, DEFAULT_DURATION)

    if (config.transitionType === 'bezier') {
        if (isBezierTuple(config.bezier)) {
            const [p0, p1, p2, p3] = config.bezier
            return buildTransition(
                duration,
                `cubic-bezier(${p0}, ${p1}, ${p2}, ${p3})`
            )
        }

        warn(ROW_ANIMATION_WARNINGS.bezier)
    } else if (config.transitionType === 'spring') {
        // The 'spring' arm has never been implemented — `stiffness`, `damping`
        // and `mass` are declared in `RowAnimationConfig` but read nowhere. A
        // fully valid spring config silently renders as the default curve, so
        // say so rather than letting the caller believe their sliders work.
        warn(ROW_ANIMATION_WARNINGS.spring)
    }

    return buildTransition(duration, DEFAULT_BEZIER)
}

interface UseRowFlipReturn {
    register: (id: string, el: HTMLTableRowElement | null) => void
}

export function useRowFlip(
    orderedIds: string[],
    animationConfig?: RowAnimationConfig
): UseRowFlipReturn {
    const elementsRef = useRef<Map<string, HTMLTableRowElement>>(new Map())
    const prevTopsRef = useRef<Map<string, number>>(new Map())
    const prevIdsRef = useRef<Set<string>>(new Set())
    const configRef = useRef<RowAnimationConfig | undefined>(animationConfig)
    const orderedIdsRef = useRef(orderedIds)
    const prefersReducedMotion = useReducedMotion()
    const cleanupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const warnedMessagesRef = useRef<Set<string>>(new Set())
    const serializedOrderedIds = useMemo(
        () => JSON.stringify(orderedIds),
        [orderedIds]
    )

    // Deduped per hook instance rather than per module: the layout effect runs
    // on every reorder, so an undeduped warning would spam, but a module-level
    // Set would stay poisoned across an HMR edit — you fix the config, break it
    // again, and never hear about it. A remount gives you a fresh Set.
    const warn = useCallback((message: string) => {
        if (process.env.NODE_ENV === 'production') return
        if (warnedMessagesRef.current.has(message)) return
        warnedMessagesRef.current.add(message)
        console.warn(`[DataTable] rowAnimationConfig: ${message}`)
    }, [])

    configRef.current = animationConfig
    orderedIdsRef.current = orderedIds

    const register = useCallback(
        (id: string, el: HTMLTableRowElement | null) => {
            if (el === null) {
                elementsRef.current.delete(id)
            } else {
                elementsRef.current.set(id, el)
            }
        },
        []
    )

    useLayoutEffect(() => {
        const currentOrderedIds = orderedIdsRef.current
        const currentConfig = configRef.current

        if (prefersReducedMotion) {
            const newTops = new Map<string, number>()
            for (const id of currentOrderedIds) {
                const el = elementsRef.current.get(id)
                if (el) {
                    newTops.set(id, el.getBoundingClientRect().top)
                }
            }
            prevTopsRef.current = newTops
            prevIdsRef.current = new Set(currentOrderedIds)
            return
        }

        const currentTops = new Map<string, number>()
        for (const id of currentOrderedIds) {
            const el = elementsRef.current.get(id)
            if (el) {
                currentTops.set(id, el.getBoundingClientRect().top)
            }
        }

        if (!currentConfig) {
            prevTopsRef.current = currentTops
            prevIdsRef.current = new Set(currentOrderedIds)
            return
        }

        const { transition: cssTransition, duration } = toCssTransition(
            currentConfig,
            warn
        )
        if (
            !Number.isFinite(currentConfig.enterDuration) ||
            !Number.isFinite(currentConfig.enterOffset)
        ) {
            warn(ROW_ANIMATION_WARNINGS.enter)
        }
        const enterDuration = toFiniteNumber(
            currentConfig.enterDuration,
            DEFAULT_ENTER_DURATION
        )
        const enterOffset = toFiniteNumber(
            currentConfig.enterOffset,
            DEFAULT_ENTER_OFFSET
        )

        const prevIds = prevIdsRef.current
        const newRowIdSet = new Set(
            currentOrderedIds.filter((id) => !prevIds.has(id))
        )

        for (const [id, newTop] of currentTops) {
            if (newRowIdSet.has(id)) continue

            const prevTop = prevTopsRef.current.get(id)
            if (prevTop === undefined) continue

            const delta = prevTop - newTop
            if (Math.abs(delta) < 1) continue

            const el = elementsRef.current.get(id)
            if (!el) continue

            el.style.transition = 'none'
            el.style.transform = `translateY(${delta}px)`

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.transition = cssTransition
                    el.style.transform = ''
                })
            })
        }

        for (const id of newRowIdSet) {
            const el = elementsRef.current.get(id)
            if (!el) continue

            el.style.transition = 'none'
            el.style.transform = `translateY(${enterOffset}px)`
            el.style.opacity = '0'

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // KNOWN LIMITATION: the enter animation always uses the
                    // default curve, so a caller passing `bezier` gets their
                    // curve on reorder and this one on row entry. The public
                    // type documents `bezier` as the easing curve without
                    // scoping it to reorder, so this is very likely an
                    // oversight rather than a design choice — but changing it
                    // alters the enter animation for every existing consumer,
                    // which does not belong in a defensive-guard change. The
                    // `enter path` tests assert this curve deliberately; they
                    // pin current behaviour, not a spec.
                    el.style.transition = `transform ${enterDuration}s ${DEFAULT_BEZIER}, opacity ${enterDuration}s ${DEFAULT_BEZIER}`
                    el.style.transform = ''
                    el.style.opacity = '1'
                })
            })
        }

        const cleanupTimeout = Math.max(duration, enterDuration) * 1000 + 50

        if (cleanupTimeoutRef.current) {
            clearTimeout(cleanupTimeoutRef.current)
        }

        cleanupTimeoutRef.current = setTimeout(() => {
            for (const id of currentOrderedIds) {
                const el = elementsRef.current.get(id)
                if (el) {
                    el.style.transition = ''
                    el.style.transform = ''
                    el.style.opacity = ''
                }
            }
        }, cleanupTimeout)

        prevTopsRef.current = currentTops
        prevIdsRef.current = new Set(currentOrderedIds)

        return () => {
            if (cleanupTimeoutRef.current) {
                clearTimeout(cleanupTimeoutRef.current)
                cleanupTimeoutRef.current = null
            }
        }
    }, [serializedOrderedIds, prefersReducedMotion, warn])

    return { register }
}
