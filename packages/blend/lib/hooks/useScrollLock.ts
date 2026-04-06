import { useEffect } from 'react'

type ScrollLockStrategy = 'overflow' | 'fixed'

type UseScrollLockOptions = {
    strategy?: ScrollLockStrategy
    restoreScroll?: boolean
    disableKeyboardLock?: boolean
    allowScrollSelectors?: string[]
}

// -----------------------------
// GLOBAL STATE
// -----------------------------
let lockCount = 0
let savedOriginalPaddingRight = ''
let scrollX = 0
let scrollY = 0
let isLocked = false

let activeLockOptions: UseScrollLockOptions | null = null

// stable handler refs
let wheelHandler: ((e: WheelEvent) => void) | null = null
let touchHandler: ((e: TouchEvent) => void) | null = null
let keydownHandler: ((e: KeyboardEvent) => void) | null = null

// -----------------------------
// UTILS
// -----------------------------
const isBrowser = typeof window !== 'undefined'

const matchesAllowedSelector = (
    target: HTMLElement,
    selectors: string[] = []
) => {
    return selectors.some((selector) => target.closest(selector))
}

// -----------------------------
// SCROLL PREVENTION
// -----------------------------
const createWheelHandler = (options: UseScrollLockOptions) => {
    return (e: WheelEvent) => {
        const target = e.target as HTMLElement

        if (matchesAllowedSelector(target, options.allowScrollSelectors)) return

        e.preventDefault()
    }
}

const createTouchHandler = (options: UseScrollLockOptions) => {
    return (e: TouchEvent) => {
        const target = e.target as HTMLElement

        if (matchesAllowedSelector(target, options.allowScrollSelectors)) return

        e.preventDefault()
    }
}

const createKeydownHandler = (options: UseScrollLockOptions) => {
    return (e: KeyboardEvent) => {
        if (options.disableKeyboardLock) return

        const scrollKeys = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'PageUp',
            'PageDown',
            'Home',
            'End',
        ]

        const target = e.target as HTMLElement

        if (
            target.closest('input') ||
            target.closest('textarea') ||
            target.isContentEditable
        ) {
            return
        }

        const active = document.activeElement as HTMLElement | null
        if (
            active &&
            (active.closest('input') ||
                active.closest('textarea') ||
                active.isContentEditable)
        ) {
            return
        }

        if (scrollKeys.includes(e.key)) {
            e.preventDefault()
        }
    }
}

const applyScrollLock = (options: UseScrollLockOptions) => {
    if (!isBrowser || isLocked) return

    activeLockOptions = options

    const { strategy = 'overflow' } = options

    scrollX = window.scrollX
    scrollY = window.scrollY

    if (strategy === 'overflow') {
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth

        savedOriginalPaddingRight = document.body.style.paddingRight

        if (scrollbarWidth > 0) {
            const currentPaddingRight =
                parseFloat(
                    window.getComputedStyle(document.body).paddingRight
                ) || 0

            document.body.style.paddingRight = `${
                currentPaddingRight + scrollbarWidth
            }px`
        }

        document.documentElement.style.overflow = 'hidden'
        document.documentElement.style.touchAction = 'none'
        document.documentElement.style.overscrollBehavior = 'none'
        document.body.style.overflow = 'hidden'
    }

    if (strategy === 'fixed') {
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.left = `-${scrollX}px`
        document.body.style.width = '100%'
        document.body.style.height = '100%'
    }

    wheelHandler = createWheelHandler(options)
    touchHandler = createTouchHandler(options)
    keydownHandler = createKeydownHandler(options)

    document.addEventListener('wheel', wheelHandler, { passive: false })
    document.addEventListener('touchmove', touchHandler, { passive: false })
    document.addEventListener('keydown', keydownHandler)

    isLocked = true
}

const releaseScrollLock = () => {
    if (!isBrowser || !isLocked || !activeLockOptions) return

    const { strategy = 'overflow', restoreScroll = true } = activeLockOptions

    if (wheelHandler) {
        document.removeEventListener('wheel', wheelHandler)
        wheelHandler = null
    }

    if (touchHandler) {
        document.removeEventListener('touchmove', touchHandler)
        touchHandler = null
    }

    if (keydownHandler) {
        document.removeEventListener('keydown', keydownHandler)
        keydownHandler = null
    }

    if (strategy === 'overflow') {
        document.body.style.paddingRight = savedOriginalPaddingRight
        document.documentElement.style.overflow = ''
        document.documentElement.style.touchAction = ''
        document.documentElement.style.overscrollBehavior = ''
        document.body.style.overflow = ''
    }

    if (strategy === 'fixed') {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.width = ''
        document.body.style.height = ''
    }

    if (restoreScroll) {
        window.scrollTo(scrollX, scrollY)
    }

    isLocked = false
    activeLockOptions = null
}

const useScrollLock = (
    shouldLock?: boolean,
    options: UseScrollLockOptions = {}
) => {
    const {
        strategy = 'overflow',
        restoreScroll = true,
        disableKeyboardLock,
        allowScrollSelectors,
    } = options

    useEffect(() => {
        if (!isBrowser) return
        if (!shouldLock) return

        lockCount++

        if (lockCount === 1) {
            applyScrollLock({
                strategy,
                restoreScroll,
                disableKeyboardLock,
                allowScrollSelectors,
            })
        }

        return () => {
            lockCount = Math.max(0, lockCount - 1)

            if (lockCount === 0) {
                releaseScrollLock()
            }
        }
    }, [
        shouldLock,
        strategy,
        restoreScroll,
        disableKeyboardLock,
        allowScrollSelectors,
    ])
}

export default useScrollLock
