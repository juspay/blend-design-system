import { useRef, useLayoutEffect, useCallback } from 'react'
import { useReducedMotion } from './useReducedMotion'
import type { RowAnimationConfig } from '../types'

const DEFAULT_ANIMATION_CONFIG: Required<
    Pick<
        RowAnimationConfig,
        | 'transitionType'
        | 'stiffness'
        | 'damping'
        | 'mass'
        | 'duration'
        | 'bezier'
        | 'enterDuration'
        | 'enterOffset'
    >
> = {
    transitionType: 'bezier',
    stiffness: 320,
    damping: 32,
    mass: 1,
    duration: 0.3,
    bezier: [0, 0.2, 0, 1],
    enterDuration: 0.65,
    enterOffset: 34,
}

function toCssTransition(config: RowAnimationConfig | undefined): {
    transition: string
    duration: number
} {
    const merged = { ...DEFAULT_ANIMATION_CONFIG, ...config }
    const { transitionType, duration, bezier } = merged

    if (transitionType === 'bezier') {
        const [p0, p1, p2, p3] = bezier
        const cssBezier = `cubic-bezier(${p0}, ${p1}, ${p2}, ${p3})`
        return {
            duration,
            transition: `transform ${duration}s ${cssBezier}, opacity ${duration}s ${cssBezier}`,
        }
    }

    const cssBezier = `cubic-bezier(0.32, 0.72, 0, 1)`
    const transition = `transform 0.35s ${cssBezier}, opacity 0.35s ${cssBezier}`
    return {
        duration: 0.35,
        transition,
    }
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
    const prefersReducedMotion = useReducedMotion()
    const cleanupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    configRef.current = animationConfig

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
        const currentConfig = configRef.current

        if (prefersReducedMotion) {
            const newTops = new Map<string, number>()
            for (const id of orderedIds) {
                const el = elementsRef.current.get(id)
                if (el) {
                    newTops.set(id, el.getBoundingClientRect().top)
                }
            }
            prevTopsRef.current = newTops
            prevIdsRef.current = new Set(orderedIds)
            return
        }

        const mergedConfig = {
            ...DEFAULT_ANIMATION_CONFIG,
            ...currentConfig,
        }
        const { transition: cssTransition, duration } = toCssTransition(
            currentConfig || {}
        )
        const enterDuration = mergedConfig.enterDuration
        const enterOffset = mergedConfig.enterOffset

        const prevIds = prevIdsRef.current
        const newRowIdSet = new Set(orderedIds.filter((id) => !prevIds.has(id)))

        const currentTops = new Map<string, number>()
        for (const id of orderedIds) {
            const el = elementsRef.current.get(id)
            if (el) {
                currentTops.set(id, el.getBoundingClientRect().top)
            }
        }

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
                    el.style.transition = `transform ${enterDuration}s cubic-bezier(0.32, 0.72, 0, 1), opacity ${enterDuration}s cubic-bezier(0.32, 0.72, 0, 1)`
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
            for (const id of orderedIds) {
                const el = elementsRef.current.get(id)
                if (el) {
                    el.style.transition = ''
                    el.style.transform = ''
                    el.style.opacity = ''
                }
            }
        }, cleanupTimeout)

        prevTopsRef.current = currentTops
        prevIdsRef.current = new Set(orderedIds)

        return () => {
            if (cleanupTimeoutRef.current) {
                clearTimeout(cleanupTimeoutRef.current)
                cleanupTimeoutRef.current = null
            }
        }
    }, [orderedIds, prefersReducedMotion])

    return { register }
}
