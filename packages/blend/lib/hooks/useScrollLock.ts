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

        // Measure the scrollbar width before hiding overflow so we can
        // compensate with equivalent padding-right. This prevents the
        // ~15-17px layout shift that occurs when the scrollbar disappears.
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth
        const originalPaddingRight = document.body.style.paddingRight

        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`
        }

        // Apply styles to prevent scrolling without shifting layout.
        // Using `body { position: fixed }` can cause layout jumps for 100%-height
        // flex layouts (e.g. sidebars with sticky/footer regions).
        document.documentElement.style.overflow = 'hidden'
        document.documentElement.style.touchAction = 'none'
        document.documentElement.style.overscrollBehavior = 'none'
        document.body.style.overflow = 'hidden'

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
            document.body.style.paddingRight = originalPaddingRight
            document.documentElement.style.overflow = ''
            document.documentElement.style.touchAction = ''
            document.documentElement.style.overscrollBehavior = ''
            document.body.style.overflow = ''
        }
    }, [shouldLock])
}

export default useScrollLock
