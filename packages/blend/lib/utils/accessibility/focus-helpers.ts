/**
 * Focus management helpers for accessibility
 *
 * These utilities ensure consistent focus management across all components,
 * following WCAG 2.2 Level AA standards for keyboard navigation and focus visibility.
 */

/**
 * Focus an element safely (handles cases where element might not exist)
 *
 * @example
 * ```tsx
 * const inputRef = useRef<HTMLInputElement>(null)
 * safeFocus(inputRef.current)
 * ```
 */
export function safeFocus(element: HTMLElement | null): void {
    if (element && typeof element.focus === 'function') {
        try {
            element.focus()
        } catch (error) {
            // Silently handle focus errors (e.g., element not in DOM)
            console.warn('Failed to focus element:', error)
        }
    }
}

/**
 * Focus first focusable element in container
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null)
 * focusFirstFocusable(containerRef.current!)
 * ```
 */
export function focusFirstFocusable(container: HTMLElement): void {
    const focusableSelectors = [
        'button:not([disabled])',
        'a[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]',
    ].join(', ')

    const firstFocusable =
        container.querySelector<HTMLElement>(focusableSelectors)
    safeFocus(firstFocusable)
}

/**
 * Focus last focusable element in container
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null)
 * focusLastFocusable(containerRef.current!)
 * ```
 */
export function focusLastFocusable(container: HTMLElement): void {
    const focusableSelectors = [
        'button:not([disabled])',
        'a[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]',
    ].join(', ')

    const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors)
    )

    if (focusables.length > 0) {
        safeFocus(focusables[focusables.length - 1])
    }
}

/**
 * Store and restore focus (for modals, dropdowns, etc.)
 *
 * @example
 * ```tsx
 * const focusManager = createFocusManager()
 *
 * // When opening modal
 * focusManager.store()
 * focusFirstFocusable(modalRef.current!)
 *
 * // When closing modal
 * focusManager.restore()
 * ```
 */
export function createFocusManager() {
    let previousFocus: HTMLElement | null = null

    return {
        store: () => {
            previousFocus = document.activeElement as HTMLElement
        },
        restore: () => {
            if (previousFocus) {
                safeFocus(previousFocus)
                previousFocus = null
            }
        },
        getStored: () => previousFocus,
    }
}

/**
 * Check if element is focusable
 *
 * @example
 * ```tsx
 * if (isFocusable(element)) {
 *     element.focus()
 * }
 * ```
 */
export function isFocusable(element: HTMLElement): boolean {
    const focusableSelectors = [
        'button:not([disabled])',
        'a[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]',
    ].join(', ')

    return element.matches(focusableSelectors)
}

/**
 * Get all focusable elements within a container
 *
 * @example
 * ```tsx
 * const focusables = getFocusableElements(containerRef.current!)
 * focusables.forEach(el => console.log(el))
 * ```
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
        'button:not([disabled])',
        'a[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]',
    ].join(', ')

    return Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors)
    )
}

/**
 * Check if focus is within a container
 *
 * @example
 * ```tsx
 * if (isFocusWithin(modalRef.current!)) {
 *     // Focus is inside modal
 * }
 * ```
 */
export function isFocusWithin(container: HTMLElement): boolean {
    const activeElement = document.activeElement
    if (!activeElement) return false

    return container.contains(activeElement)
}

/**
 * Focus next focusable element in document order
 *
 * @example
 * ```tsx
 * focusNextFocusable(currentElement)
 * ```
 */
export function focusNextFocusable(currentElement: HTMLElement): void {
    const allFocusables = getFocusableElements(document.body)
    const currentIndex = allFocusables.indexOf(currentElement)

    if (currentIndex >= 0 && currentIndex < allFocusables.length - 1) {
        safeFocus(allFocusables[currentIndex + 1])
    }
}

/**
 * Focus previous focusable element in document order
 *
 * @example
 * ```tsx
 * focusPreviousFocusable(currentElement)
 * ```
 */
export function focusPreviousFocusable(currentElement: HTMLElement): void {
    const allFocusables = getFocusableElements(document.body)
    const currentIndex = allFocusables.indexOf(currentElement)

    if (currentIndex > 0) {
        safeFocus(allFocusables[currentIndex - 1])
    }
}

/**
 * Remove focus from element
 *
 * @example
 * ```tsx
 * removeFocus(element)
 * ```
 */
export function removeFocus(element: HTMLElement): void {
    if (document.activeElement === element) {
        element.blur()
    }
}
