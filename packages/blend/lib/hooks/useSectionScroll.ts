import { useCallback } from 'react'

interface ScrollOptions {
    /** Amount of padding (in pixels) from scrollable container edge when scrolling */
    padding?: number
    /** Whether to scroll instantly or smoothly */
    behavior?: ScrollBehavior
}

/**
 * A custom hook that provides scroll management utilities for sidebar sections.
 * Used to automatically scroll elements into view when they expand near the
 * bottom of their nearest scrollable ancestor container (not the viewport).
 *
 * This hook finds the closest scrollable ancestor element (with overflow-y: auto or scroll)
 * and scrolls within that container, not the viewport. This is important when using
 * the hook in nested scrollers or modals.
 *
 * @example
 * const { scrollIntoView } = useSectionScroll()
 * scrollIntoView(sectionRef.current)
 */
export const useSectionScroll = (options: ScrollOptions = {}) => {
    const { padding = 20, behavior = 'smooth' } = options

    /**
     * Finds the closest scrollable ancestor element by checking CSS overflow properties.
     * An element is considered scrollable if it has overflow-y: auto or scroll.
     */
    const findScrollableAncestor = useCallback(
        (element: HTMLElement | null): HTMLElement | null => {
            let current = element?.parentElement

            while (current) {
                const style = window.getComputedStyle(current)
                const overflowY = style.overflowY

                if (overflowY === 'auto' || overflowY === 'scroll') {
                    return current
                }

                current = current.parentElement
            }

            return null
        },
        []
    )

    /**
     * Calculates if an element extends beyond the visible container and scrolls it into view.
     * Uses getBoundingClientRect for accurate position calculations relative to the viewport.
     */
    const scrollIntoView = useCallback(
        (element: HTMLElement) => {
            const scrollableContainer = findScrollableAncestor(element)

            if (!scrollableContainer) {
                return
            }

            const elementRect = element.getBoundingClientRect()
            const containerRect = scrollableContainer.getBoundingClientRect()

            // Calculate positions relative to the container
            const elementBottom =
                elementRect.bottom -
                containerRect.top +
                scrollableContainer.scrollTop
            const visibleBottom =
                scrollableContainer.scrollTop + containerRect.height

            // Scroll if element extends beyond visible area
            if (elementBottom > visibleBottom - padding) {
                const targetScrollTop =
                    elementBottom - containerRect.height + padding

                scrollableContainer.scrollTo({
                    top: targetScrollTop,
                    behavior,
                })
            }
        },
        [findScrollableAncestor, padding, behavior]
    )

    return { scrollIntoView, findScrollableAncestor }
}

export default useSectionScroll
