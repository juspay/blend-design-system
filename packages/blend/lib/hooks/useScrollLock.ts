import { useEffect } from 'react'

const useScrollLock = (shouldLock?: boolean) => {
    useEffect(() => {
        if (!shouldLock) return

        // Prevent scrolling on wheel events (mouse wheel, trackpad)
        const preventScroll = (e: WheelEvent | TouchEvent) => {
            const target = e.target as HTMLElement

            // Priority 1: Allow scrolling within dropdown menus (highest priority)
            const isInsideDropdown =
                target.closest('[data-radix-popper-content-wrapper]') ||
                target.closest('[data-radix-dropdown-menu-content]') ||
                target.closest('[role="menu"]')

            if (isInsideDropdown) {
                return // Allow scroll in dropdown
            }

            // Priority 2: Check if dropdown is open
            const hasOpenDropdown = document.querySelector(
                '[data-radix-popper-content-wrapper]'
            )

            // Priority 3: If dropdown is open, block ALL modal scrolling
            if (hasOpenDropdown) {
                const isInsideModalBody =
                    target.closest('[data-element="body"]') ||
                    target.closest('[role="dialog"]')

                if (isInsideModalBody) {
                    e.preventDefault() // Block modal scroll when dropdown is open
                    return
                }
            }

            // Priority 4: Allow scrolling in modal body when no dropdown is open
            const isInsideModal =
                target.closest('[role="dialog"]') ||
                target.closest('[data-modal]') ||
                target.closest('[data-element="body"]')

            if (isInsideModal && !hasOpenDropdown) {
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
                target.closest('[role="menu"]')

            if (isInsideDropdown) {
                return // Allow keyboard navigation in dropdown
            }

            // Priority 2: Allow in inputs/textareas always
            if (target.closest('input') || target.closest('textarea')) {
                return
            }

            // Priority 3: Check if dropdown is open
            const hasOpenDropdown = document.querySelector(
                '[data-radix-dropdown-menu-content]'
            )

            // Priority 4: If dropdown is open, block modal keyboard scrolling
            if (hasOpenDropdown && scrollKeys.includes(e.key)) {
                const isInsideModalBody =
                    target.closest('[data-element="body"]') ||
                    target.closest('[role="dialog"]')

                if (isInsideModalBody) {
                    e.preventDefault() // Block modal keyboard scroll when dropdown is open
                    return
                }
            }

            // Priority 5: Allow keyboard navigation in modal when no dropdown
            const isInsideModal =
                target.closest('[role="dialog"]') ||
                target.closest('[data-modal]') ||
                target.closest('[data-element="body"]')

            if (isInsideModal && !hasOpenDropdown) {
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

        // Apply styles to prevent scrolling
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
        }
    }, [shouldLock])
}

export default useScrollLock
