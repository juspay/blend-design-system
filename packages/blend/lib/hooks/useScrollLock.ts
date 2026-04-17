import { useEffect } from 'react'

const useScrollLock = (shouldLock?: boolean) => {
    useEffect(() => {
        if (!shouldLock) return

        const scrollY = window.scrollY
        const scrollX = window.scrollX

        const isElement = (target: EventTarget | null): target is Element =>
            target instanceof Element

        const isInsideDropdown = (el: Element) =>
            el.closest('[data-radix-popper-content-wrapper]') ||
            el.closest('[data-radix-dropdown-menu-content]') ||
            el.closest('[role="menu"]')

        const isInsideModal = (el: Element) =>
            el.closest('[role="dialog"]') ||
            el.closest('[data-modal]') ||
            el.closest('[data-element="body"]')

        let dropdownCache: boolean | null = null
        const hasOpenDropdown = () => {
            if (dropdownCache !== null) return dropdownCache
            dropdownCache = !!document.querySelector(
                '[data-radix-popper-content-wrapper], [data-radix-dropdown-menu-content]'
            )
            return dropdownCache
        }

        const resetCache = () => {
            dropdownCache = null
        }

        // ---------- SCROLL HANDLER ----------
        const preventScroll = (e: WheelEvent | TouchEvent) => {
            resetCache()

            const target = e.target

            if (!isElement(target)) {
                e.preventDefault()
                return
            }

            if (isInsideDropdown(target)) return

            const dropdownOpen = hasOpenDropdown()

            if (dropdownOpen && isInsideModal(target)) {
                e.preventDefault()
                return
            }

            if (!dropdownOpen && isInsideModal(target)) return

            e.preventDefault()
        }

        // ---------- KEYBOARD HANDLER ----------
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
                ' ',
            ]

            if (!scrollKeys.includes(e.key)) return

            resetCache()

            const target = e.target

            if (!isElement(target)) {
                e.preventDefault()
                return
            }

            if (isInsideDropdown(target)) return

            if (target.closest('input, textarea, [contenteditable="true"]')) {
                return
            }

            const dropdownOpen = hasOpenDropdown()

            if (dropdownOpen && isInsideModal(target)) {
                e.preventDefault()
                return
            }

            if (!dropdownOpen && isInsideModal(target)) return

            e.preventDefault()
        }

        // ---------- APPLY LOCK ----------
        document.documentElement.style.overflow = 'hidden'
        document.documentElement.style.touchAction = 'none'
        document.documentElement.style.overscrollBehavior = 'none'

        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.left = `-${scrollX}px`
        document.body.style.width = '100%'
        document.body.style.height = '100%'

        // ---------- LISTENERS ----------
        document.addEventListener('wheel', preventScroll, { passive: false })
        document.addEventListener('touchmove', preventScroll, {
            passive: false,
        })
        document.addEventListener('keydown', preventKeyboardScroll)

        // ---------- CLEANUP ----------
        return () => {
            document.removeEventListener('wheel', preventScroll)
            document.removeEventListener('touchmove', preventScroll)
            document.removeEventListener('keydown', preventKeyboardScroll)

            document.documentElement.style.overflow = ''
            document.documentElement.style.touchAction = ''
            document.documentElement.style.overscrollBehavior = ''

            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.width = ''
            document.body.style.height = ''

            window.scrollTo(scrollX, scrollY)
        }
    }, [shouldLock])
}

export default useScrollLock
