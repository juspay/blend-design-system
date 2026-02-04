import { useEffect } from 'react'

let lockCount = 0
let styleInjected = false
let scrollX = 0
let scrollY = 0

const CLASS_NAME = 'dropdown-open-no-hover'
const STYLE_ID = 'dropdown-hover-prevention'

function injectStyle() {
    if (styleInjected || typeof document === 'undefined') return

    const style = document.createElement('style')
    style.id = STYLE_ID

    style.textContent = `
      body.${CLASS_NAME} > :not([data-radix-portal-root]) {
        pointer-events: none !important;
      }

      body.${CLASS_NAME} [data-radix-popper-content-wrapper],
      body.${CLASS_NAME} [data-radix-popper-content-wrapper] *,
      body.${CLASS_NAME} [data-radix-dropdown-menu-content],
      body.${CLASS_NAME} [data-radix-dropdown-menu-content] *,
      body.${CLASS_NAME} [role="menu"],
      body.${CLASS_NAME} [role="menu"] *,
      body.${CLASS_NAME} [role="listbox"],
      body.${CLASS_NAME} [role="listbox"] *,
      body.${CLASS_NAME} [data-dropdown="dropdown"],
      body.${CLASS_NAME} [data-dropdown="dropdown"] *,
      body.${CLASS_NAME} [data-radix-dropdown-menu-trigger],
      body.${CLASS_NAME} button[aria-expanded],
      body.${CLASS_NAME} button[aria-haspopup],
      body.${CLASS_NAME} [data-element="single-select-button"],
      body.${CLASS_NAME} [data-element="multi-select-button"] {
        pointer-events: auto !important;
      }
    `

    document.head.appendChild(style)
    styleInjected = true
}

function hasOpenDropdown() {
    return Boolean(
        document.querySelector(
            '[data-radix-popper-content-wrapper], [data-radix-dropdown-menu-content]'
        )
    )
}

function isInsideDropdown(target: HTMLElement | null) {
    if (!target) return false

    return Boolean(
        target.closest(
            `
        [data-radix-popper-content-wrapper],
        [data-radix-dropdown-menu-content],
        [role="menu"],
        [role="listbox"]
      `
        )
    )
}

function isInsideModal(target: HTMLElement | null) {
    if (!target) return false

    return Boolean(
        target.closest(
            `
        [role="dialog"],
        [data-modal],
        [data-element="body"]
      `
        )
    )
}

function preventScroll(e: WheelEvent | TouchEvent) {
    const target = e.target as HTMLElement | null

    if (isInsideDropdown(target)) return

    const dropdownOpen = hasOpenDropdown()

    if (dropdownOpen && isInsideModal(target)) {
        e.preventDefault()
        return
    }

    if (isInsideModal(target) && !dropdownOpen) return

    e.preventDefault()
}

function preventKeyboardScroll(e: KeyboardEvent) {
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
    ]

    if (!keys.includes(e.key)) return

    const target = e.target as HTMLElement | null

    if (isInsideDropdown(target)) return

    if (target?.closest('input, textarea')) return

    const dropdownOpen = hasOpenDropdown()

    if (dropdownOpen && isInsideModal(target)) {
        e.preventDefault()
        return
    }

    if (isInsideModal(target) && !dropdownOpen) return

    e.preventDefault()
}

function applyLock() {
    injectStyle()

    scrollX = window.scrollX
    scrollY = window.scrollY

    document.body.classList.add(CLASS_NAME)

    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    document.documentElement.style.touchAction = 'none'

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = `-${scrollX}px`
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'

    document.addEventListener('wheel', preventScroll, { passive: false })
    document.addEventListener('touchmove', preventScroll, { passive: false })
    document.addEventListener('keydown', preventKeyboardScroll, {
        passive: false,
    })
}

function removeLock() {
    document.body.classList.remove(CLASS_NAME)

    document.documentElement.style.overflow = ''
    document.documentElement.style.overscrollBehavior = ''
    document.documentElement.style.touchAction = ''

    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.width = ''
    document.body.style.height = ''
    document.body.style.overflow = ''

    window.scrollTo(scrollX, scrollY)

    document.removeEventListener('wheel', preventScroll)
    document.removeEventListener('touchmove', preventScroll)
    document.removeEventListener('keydown', preventKeyboardScroll)
}

export default function useScrollLock(shouldLock?: boolean) {
    useEffect(() => {
        if (typeof window === 'undefined') return

        if (shouldLock) {
            lockCount++

            if (lockCount === 1) {
                applyLock()
            }
        }

        return () => {
            if (!shouldLock) return

            lockCount--

            if (lockCount <= 0) {
                lockCount = 0
                removeLock()
            }
        }
    }, [shouldLock])
}
