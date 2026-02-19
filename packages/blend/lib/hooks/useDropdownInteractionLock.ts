import { useEffect, useRef } from 'react'

let lockCount = 0
let styleInjected = false
let scrollX = 0
let scrollY = 0

const CLASS_NAME = 'dropdown-interaction-locked'
const STYLE_ID = 'dropdown-interaction-lock-style'

type DropdownSelectors = {
    content?: string[]
    trigger?: string[]
    disablePointerEvents?: string[]
}

type DropdownLockHandlers = {
    wheel: (e: WheelEvent) => void
    touchmove: (e: TouchEvent) => void
    keydown: (e: KeyboardEvent) => void
}

type HTMLElementWithHandlers = HTMLElement & {
    __dropdownLockHandlers?: DropdownLockHandlers
}

const DEFAULT_SELECTORS: DropdownSelectors = {
    content: [
        '[data-radix-popper-content-wrapper]',
        '[data-radix-dropdown-menu-content]',
        '[role="menu"]',
        '[role="listbox"]',
        '[data-dropdown="dropdown"]',
    ],
    trigger: [
        '[data-radix-dropdown-menu-trigger]',
        'button[aria-expanded]',
        'button[aria-haspopup]',
        '[data-element="single-select-button"]',
        '[data-element="multi-select-button"]',
    ],
    disablePointerEvents: ['[data-sidebar="sidebar"]', '[data-sidebar-item]'],
}

function isInsideDropdown(
    target: HTMLElement | null,
    contentSelectors: string[]
): boolean {
    if (!target) return false

    const selectorString = contentSelectors.join(', ')
    return Boolean(target.closest(selectorString))
}

function isTrigger(
    target: HTMLElement | null,
    triggerSelectors: string[]
): boolean {
    if (!target) return false

    return triggerSelectors.some((selector) => target.matches(selector))
}

function preventScroll(e: WheelEvent | TouchEvent, contentSelectors: string[]) {
    const target = e.target as HTMLElement | null

    if (isInsideDropdown(target, contentSelectors)) return

    e.preventDefault()
}

function preventKeyboardInteraction(
    e: KeyboardEvent,
    contentSelectors: string[],
    triggerSelectors: string[]
) {
    const target = e.target as HTMLElement | null

    // Allow keyboard navigation inside dropdowns
    if (isInsideDropdown(target, contentSelectors)) return

    // Allow keyboard input in inputs/textareas
    if (target?.closest('input, textarea')) return

    // Allow keyboard on triggers
    if (isTrigger(target, triggerSelectors)) return

    // Block all other keyboard interactions
    e.preventDefault()
    e.stopPropagation()
}

function injectStyle(selectors: DropdownSelectors) {
    if (styleInjected || typeof document === 'undefined') return

    const disableSelectors =
        selectors.disablePointerEvents ||
        DEFAULT_SELECTORS.disablePointerEvents ||
        []

    if (disableSelectors.length === 0) return

    const disableSelectorString = disableSelectors
        .map((sel) => `body.${CLASS_NAME} ${sel}`)
        .join(',\n      ')

    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `
      /* Disable pointer events only on specific elements when dropdown is open */
      ${disableSelectorString} {
        pointer-events: none !important;
      }
    `
    document.head.appendChild(style)
    styleInjected = true
}

function applyLock(selectors: DropdownSelectors) {
    injectStyle(selectors)

    const contentSelectors =
        selectors.content || DEFAULT_SELECTORS.content || []
    const triggerSelectors =
        selectors.trigger || DEFAULT_SELECTORS.trigger || []

    scrollX = window.scrollX
    scrollY = window.scrollY

    document.body.classList.add(CLASS_NAME)

    // Prevent scrolling
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    document.documentElement.style.touchAction = 'none'

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = `-${scrollX}px`
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'

    // Prevent scroll events
    const handleWheel = (e: WheelEvent) => preventScroll(e, contentSelectors)
    const handleTouchMove = (e: TouchEvent) =>
        preventScroll(e, contentSelectors)
    const handleKeyDown = (e: KeyboardEvent) =>
        preventKeyboardInteraction(e, contentSelectors, triggerSelectors)

    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('keydown', handleKeyDown, { passive: false })

    // Store handlers for cleanup
    ;(document.body as HTMLElementWithHandlers).__dropdownLockHandlers = {
        wheel: handleWheel,
        touchmove: handleTouchMove,
        keydown: handleKeyDown,
    }
}

function removeLock() {
    document.body.classList.remove(CLASS_NAME)

    // Restore scroll styles
    document.documentElement.style.overflow = ''
    document.documentElement.style.overscrollBehavior = ''
    document.documentElement.style.touchAction = ''

    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.width = ''
    document.body.style.height = ''
    document.body.style.overflow = ''

    // Restore scroll position
    window.scrollTo(scrollX, scrollY)

    // Remove event listeners
    const bodyWithHandlers = document.body as HTMLElementWithHandlers
    const handlers = bodyWithHandlers.__dropdownLockHandlers
    if (handlers) {
        document.removeEventListener('wheel', handlers.wheel)
        document.removeEventListener('touchmove', handlers.touchmove)
        document.removeEventListener('keydown', handlers.keydown)
        delete bodyWithHandlers.__dropdownLockHandlers
    }
}

export default function useDropdownInteractionLock(
    isOpen?: boolean,
    selectors?: DropdownSelectors
) {
    const selectorsRef = useRef(selectors)

    useEffect(() => {
        selectorsRef.current = selectors
    }, [selectors])

    useEffect(() => {
        if (typeof window === 'undefined') return

        if (isOpen) {
            lockCount++

            if (lockCount === 1) {
                applyLock(selectorsRef.current || {})
            }
        }

        return () => {
            if (!isOpen) return

            lockCount--

            if (lockCount <= 0) {
                lockCount = 0
                removeLock()
            }
        }
    }, [isOpen])
}
