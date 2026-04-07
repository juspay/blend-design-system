import { useEffect, useRef } from 'react'

type ScrollLockStrategy = 'overflow' | 'fixed'

type UseScrollLockOptions = {
    strategy?: ScrollLockStrategy
    restoreScroll?: boolean
    disableKeyboardLock?: boolean
    allowScrollSelectors?: string[]
}

// -----------------------------
// GLOBAL STATE - Stack-based lock tracking
// -----------------------------
type LockRequest = {
    id: number
    options: UseScrollLockOptions
}

let lockIdCounter = 0
const activeLocks: LockRequest[] = []

// Snapshot of options used for the initial lock (used during unlock)
let appliedOptions: UseScrollLockOptions | null = null

let savedOriginalPaddingRight = ''
let scrollX = 0
let scrollY = 0
let isLocked = false

let wheelHandler: ((e: WheelEvent) => void) | null = null
let touchHandler: ((e: TouchEvent) => void) | null = null
let keydownHandler: ((e: KeyboardEvent) => void) | null = null

const isBrowser = typeof window !== 'undefined'

// -----------------------------
// DEV WARNINGS
// -----------------------------
const warnedStrategies = new Set<string>()

const warnStrategyMismatch = (requested: string, applied: string) => {
    if (process.env.NODE_ENV === 'production') return
    const key = `${requested}->${applied}`
    if (warnedStrategies.has(key)) return
    warnedStrategies.add(key)
    console.warn(
        `[useScrollLock] Strategy mismatch: requested "${requested}" but "${applied}" is already active. ` +
            `All concurrent locks must use the same strategy. Consider using a global scroll lock manager.`
    )
}

// -----------------------------
// UTILS
// -----------------------------
const matchesAllowedSelector = (
    target: HTMLElement,
    selectors: string[] = []
) => selectors?.some((selector) => target.closest(selector))

const isScrollable = (el: HTMLElement | null): boolean => {
    if (!el) return false
    const style = window.getComputedStyle(el)
    const overflowY = style.overflowY
    return (
        (overflowY === 'auto' || overflowY === 'scroll') &&
        el.scrollHeight > el.clientHeight
    )
}

const canScroll = (target: HTMLElement | null): boolean => {
    let el = target
    while (el && el !== document.body) {
        if (isScrollable(el)) return true
        el = el.parentElement
    }
    return false
}

// -----------------------------
// OPTION MERGING
// -----------------------------
/**
 * Merges options from all active locks deterministically:
 * - strategy: first lock wins (others are warned and ignored)
 * - restoreScroll: true only if ALL locks want to restore (safest)
 * - disableKeyboardLock: false if ANY lock wants keyboard lock (most restrictive)
 * - allowScrollSelectors: union of all selectors (most permissive)
 */
const mergeLockOptions = (locks: LockRequest[]): UseScrollLockOptions => {
    if (locks.length === 0) return {}

    const first = locks[0]
    const merged: UseScrollLockOptions = {
        strategy: first.options.strategy ?? 'overflow',
        restoreScroll: first.options.restoreScroll ?? true,
        disableKeyboardLock: first.options.disableKeyboardLock ?? false,
        allowScrollSelectors: [...(first.options.allowScrollSelectors ?? [])],
    }

    for (let i = 1; i < locks.length; i++) {
        const o = locks[i].options

        // Warn about strategy mismatch
        const theirStrategy = o.strategy ?? 'overflow'
        if (theirStrategy !== merged.strategy) {
            warnStrategyMismatch(theirStrategy, merged.strategy!)
        }

        // restoreScroll: only true if ALL want it
        if (o.restoreScroll === false) merged.restoreScroll = false
        // disableKeyboardLock: false if ANY wants it locked
        if (o.disableKeyboardLock === false) merged.disableKeyboardLock = false

        if (o.allowScrollSelectors?.length) {
            merged.allowScrollSelectors!.push(...o.allowScrollSelectors)
        }
    }

    // Deduplicate selectors
    if (merged.allowScrollSelectors?.length) {
        merged.allowScrollSelectors = [...new Set(merged.allowScrollSelectors)]
    }

    return merged
}

// -----------------------------
// HANDLERS
// -----------------------------
const createWheelHandler = (options: UseScrollLockOptions) => {
    return (e: WheelEvent) => {
        const target = e.target as HTMLElement
        if (matchesAllowedSelector(target, options.allowScrollSelectors)) return
        if (canScroll(target)) return
        e.preventDefault()
    }
}

const createTouchHandler = (options: UseScrollLockOptions) => {
    return (e: TouchEvent) => {
        const target = e.target as HTMLElement
        if (matchesAllowedSelector(target, options.allowScrollSelectors)) return
        if (canScroll(target)) return
        e.preventDefault()
    }
}

const createKeydownHandler = (options: UseScrollLockOptions) => {
    return (e: KeyboardEvent) => {
        if (options.disableKeyboardLock) return

        const keys = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'PageUp',
            'PageDown',
            'Home',
            'End',
            ' ',
            'Spacebar',
        ]

        const target = e.target as HTMLElement
        if (
            target.closest('input') ||
            target.closest('textarea') ||
            target.isContentEditable
        )
            return

        if (keys.includes(e.key)) e.preventDefault()
    }
}

// -----------------------------
// APPLY / UPDATE / RELEASE
// -----------------------------
const applyScrollLock = (options: UseScrollLockOptions) => {
    if (!isBrowser || isLocked) return

    // Snapshot options for consistent unlock behavior
    appliedOptions = { ...options }

    const { strategy = 'overflow' } = options

    scrollX = window.scrollX
    scrollY = window.scrollY

    if (strategy === 'overflow') {
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth

        savedOriginalPaddingRight = document.body.style.paddingRight

        if (scrollbarWidth > 0) {
            const current =
                parseFloat(
                    window.getComputedStyle(document.body).paddingRight
                ) || 0
            document.body.style.paddingRight = `${current + scrollbarWidth}px`
        }

        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'
    }

    if (strategy === 'fixed') {
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.left = `-${scrollX}px`
        document.body.style.width = '100%'
    }

    wheelHandler = createWheelHandler(options)
    touchHandler = createTouchHandler(options)
    keydownHandler = createKeydownHandler(options)

    document.addEventListener('wheel', wheelHandler, { passive: false })
    document.addEventListener('touchmove', touchHandler, { passive: false })
    document.addEventListener('keydown', keydownHandler)

    isLocked = true
}

const updateHandlers = () => {
    if (!isLocked) return

    if (wheelHandler) document.removeEventListener('wheel', wheelHandler)
    if (touchHandler) document.removeEventListener('touchmove', touchHandler)
    if (keydownHandler) document.removeEventListener('keydown', keydownHandler)

    const merged = mergeLockOptions(activeLocks)

    wheelHandler = createWheelHandler(merged)
    touchHandler = createTouchHandler(merged)
    keydownHandler = createKeydownHandler(merged)

    document.addEventListener('wheel', wheelHandler, { passive: false })
    document.addEventListener('touchmove', touchHandler, { passive: false })
    document.addEventListener('keydown', keydownHandler)
}

const releaseScrollLock = () => {
    if (!isBrowser || !isLocked || !appliedOptions) return

    const { strategy = 'overflow', restoreScroll = true } = appliedOptions

    if (wheelHandler) document.removeEventListener('wheel', wheelHandler)
    if (touchHandler) document.removeEventListener('touchmove', touchHandler)
    if (keydownHandler) document.removeEventListener('keydown', keydownHandler)

    wheelHandler = null
    touchHandler = null
    keydownHandler = null

    if (strategy === 'overflow') {
        document.body.style.paddingRight = savedOriginalPaddingRight
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
    }

    if (strategy === 'fixed') {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.width = ''
    }

    if (restoreScroll) window.scrollTo(scrollX, scrollY)

    isLocked = false
    appliedOptions = null
}

// -----------------------------
// HOOK
// -----------------------------
const useScrollLock = (
    shouldLock?: boolean,
    options: UseScrollLockOptions = {}
) => {
    // Track if we're currently locked by this hook instance
    const lockIdRef = useRef<number | null>(null)
    // Cache options to avoid re-renders when object identity changes
    const optionsRef = useRef(options)
    optionsRef.current = options

    useEffect(() => {
        if (!isBrowser) return

        // If shouldLock is false and we have an active lock, cleanup
        if (!shouldLock) {
            if (lockIdRef.current !== null) {
                const i = activeLocks.findIndex(
                    (l) => l.id === lockIdRef.current
                )
                if (i !== -1) activeLocks.splice(i, 1)

                if (activeLocks.length === 0) {
                    releaseScrollLock()
                } else {
                    updateHandlers()
                }
                lockIdRef.current = null
            }
            return
        }

        // Apply lock
        const id = ++lockIdCounter
        lockIdRef.current = id
        activeLocks.push({ id, options: optionsRef.current })

        if (activeLocks.length === 1) {
            applyScrollLock(optionsRef.current)
        } else {
            updateHandlers()
        }

        return () => {
            const i = activeLocks.findIndex((l) => l.id === id)
            if (i !== -1) activeLocks.splice(i, 1)

            if (activeLocks.length === 0) {
                releaseScrollLock()
            } else {
                updateHandlers()
            }
            lockIdRef.current = null
        }
    }, [shouldLock])
}

export default useScrollLock
