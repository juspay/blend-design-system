import { useEffect, useRef } from 'react'

let dropdownFreezeObserver: MutationObserver | null = null
let dropdownFreezeCount = 0
let dropdownFreezeInterval: NodeJS.Timeout | null = null

const dropdownSelectors = [
    '[data-radix-dropdown-menu-content]',
    '[data-radix-popper-content-wrapper]',
    '[data-dropdown="dropdown"]',
    '[role="listbox"]',
    '[role="menu"]',
]

const hasOpenDropdown = () =>
    dropdownSelectors.some((selector) => document.querySelector(selector))

const freezeAllInteractions = () => {
    const sidebarSelectors = [
        '[data-sidebar="sidebar"]',
        '[data-element="sidebar-content"]',
        '[data-directory-container]',
    ]

    sidebarSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
            const htmlEl = el as HTMLElement
            if (!htmlEl.dataset.originalPointerEvents) {
                htmlEl.dataset.originalPointerEvents =
                    htmlEl.style.pointerEvents || ''
            }
            htmlEl.style.pointerEvents = 'none'
        })
    })
}

const unfreezeAllInteractions = () => {
    const sidebarSelectors = [
        '[data-sidebar="sidebar"]',
        '[data-element="sidebar-content"]',
        '[data-directory-container]',
    ]

    sidebarSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
            const htmlEl = el as HTMLElement
            const originalValue = htmlEl.dataset.originalPointerEvents
            if (originalValue !== undefined) {
                htmlEl.style.pointerEvents = originalValue
                delete htmlEl.dataset.originalPointerEvents
            } else {
                htmlEl.style.pointerEvents = ''
            }
        })
    })
}

const checkAndUpdateDropdownState = () => {
    if (hasOpenDropdown()) {
        freezeAllInteractions()
    } else {
        unfreezeAllInteractions()
    }
}

const setupDropdownFreezeObserver = () => {
    if (!dropdownFreezeObserver) {
        dropdownFreezeObserver = new MutationObserver(() => {
            checkAndUpdateDropdownState()
        })

        dropdownFreezeObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [
                'data-radix-state',
                'data-state',
                'aria-expanded',
            ],
        })

        checkAndUpdateDropdownState()

        if (!dropdownFreezeInterval) {
            dropdownFreezeInterval = setInterval(
                checkAndUpdateDropdownState,
                100
            )
        }
    }
}

const cleanupDropdownFreezeObserver = () => {
    if (dropdownFreezeObserver) {
        dropdownFreezeObserver.disconnect()
        dropdownFreezeObserver = null
    }

    if (dropdownFreezeInterval) {
        clearInterval(dropdownFreezeInterval)
        dropdownFreezeInterval = null
    }

    unfreezeAllInteractions()
}

const useScrollLock = (shouldLock?: boolean) => {
    const shouldLockRef = useRef(shouldLock)

    useEffect(() => {
        shouldLockRef.current = shouldLock
    }, [shouldLock])

    useEffect(() => {
        dropdownFreezeCount++
        setupDropdownFreezeObserver()

        if (!shouldLock) {
            return () => {
                dropdownFreezeCount--
                if (dropdownFreezeCount === 0) {
                    cleanupDropdownFreezeObserver()
                }
            }
        }

        // Prevent scrolling on wheel events (mouse wheel, trackpad)
        const preventScroll = (e: WheelEvent | TouchEvent) => {
            const target = e.target as HTMLElement

            // Priority 1: Allow scrolling within dropdown menus (highest priority)
            const isInsideDropdown =
                target.closest('[data-radix-popper-content-wrapper]') ||
                target.closest('[data-radix-dropdown-menu-content]') ||
                target.closest('[role="menu"]') ||
                target.closest('[role="listbox"]') ||
                target.closest('[data-dropdown="dropdown"]')

            if (isInsideDropdown) {
                return // Allow scroll in dropdown
            }

            // Priority 2: Check if dropdown is open
            const isDropdownOpen = hasOpenDropdown()

            // Priority 3: If dropdown is open, block ALL scrolling (including modal)
            if (isDropdownOpen) {
                e.preventDefault()
                return
            }

            // Priority 4: Allow scrolling in modal body when no dropdown is open
            const isInsideModal =
                target.closest('[role="dialog"]') ||
                target.closest('[data-modal]') ||
                target.closest('[data-element="body"]')

            if (isInsideModal && !isDropdownOpen) {
                return // Allow scroll in modal when no dropdown
            }

            // Block all other scrolling
            e.preventDefault()
        }

        // Prevent keyboard scrolling (arrow keys, space, page up/down)
        const preventKeyboardScroll = (e: KeyboardEvent) => {
            const scrollKeys = [
                'ArrowUp',
                'ArrowDown',
                'ArrowLeft',
                'ArrowRight',
                'PageUp',
                'PageDown',
                'Home',
                'End',
                ' ', // spacebar
            ]

            const target = e.target as HTMLElement

            // Priority 1: Allow keyboard navigation in dropdowns
            const isInsideDropdown =
                target.closest('[data-radix-popper-content-wrapper]') ||
                target.closest('[data-radix-dropdown-menu-content]') ||
                target.closest('[role="menu"]') ||
                target.closest('[role="listbox"]') ||
                target.closest('[data-dropdown="dropdown"]')

            if (isInsideDropdown) {
                return // Allow keyboard navigation in dropdown
            }

            // Priority 2: Allow in inputs/textareas always
            if (target.closest('input') || target.closest('textarea')) {
                return
            }

            // Priority 3: Check if dropdown is open
            const isDropdownOpen = hasOpenDropdown()

            // Priority 4: If dropdown is open, block ALL keyboard scrolling (including modal)
            if (isDropdownOpen && scrollKeys.includes(e.key)) {
                e.preventDefault()
                return
            }

            // Priority 5: Allow keyboard navigation in modal when no dropdown
            const isInsideModal =
                target.closest('[role="dialog"]') ||
                target.closest('[data-modal]') ||
                target.closest('[data-element="body"]')

            if (isInsideModal && !isDropdownOpen) {
                return
            }

            // Block all other keyboard scrolling
            if (scrollKeys.includes(e.key)) {
                e.preventDefault()
            }
        }

        // Save current scroll position
        const scrollY = window.scrollY
        const scrollX = window.scrollX

        // Apply styles to prevent scrolling (only when shouldLock is true)
        document.documentElement.style.overflow = 'hidden'
        document.documentElement.style.touchAction = 'none'
        document.documentElement.style.overscrollBehavior = 'none'
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.left = `-${scrollX}px`
        document.body.style.width = '100%'
        document.body.style.height = '100%'

        // Add event listeners to prevent scroll attempts
        document.addEventListener('wheel', preventScroll, { passive: false })
        document.addEventListener('touchmove', preventScroll, {
            passive: false,
        })
        document.addEventListener('keydown', preventKeyboardScroll, {
            passive: false,
        })

        return () => {
            // Remove event listeners
            document.removeEventListener('wheel', preventScroll)
            document.removeEventListener('touchmove', preventScroll)
            document.removeEventListener('keydown', preventKeyboardScroll)

            // Restore styles
            document.documentElement.style.overflow = ''
            document.documentElement.style.touchAction = ''
            document.documentElement.style.overscrollBehavior = ''
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.width = ''
            document.body.style.height = ''

            // Restore scroll position
            window.scrollTo(scrollX, scrollY)

            dropdownFreezeCount--
            if (dropdownFreezeCount === 0) {
                cleanupDropdownFreezeObserver()
            }
        }
    }, [shouldLock])
}

export default useScrollLock
