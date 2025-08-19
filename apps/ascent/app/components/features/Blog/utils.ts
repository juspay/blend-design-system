import { BLOG_CONSTANTS } from './constants'

/**
 * Formats a date string to a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(
        BLOG_CONSTANTS.DATE_FORMAT.LOCALE,
        BLOG_CONSTANTS.DATE_FORMAT.OPTIONS
    )
}

/**
 * Scrolls to an element with the given ID
 * @param id - Element ID to scroll to
 * @param behavior - Scroll behavior (smooth or auto)
 */
export const scrollToElement = (
    id: string,
    behavior: ScrollBehavior = BLOG_CONSTANTS.TOC.SCROLL_BEHAVIOR
): void => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({
            behavior,
            block: BLOG_CONSTANTS.TOC.SCROLL_BLOCK,
        })
    }
}

/**
 * Calculates padding based on heading level for TOC items
 * @param level - Heading level (1-6)
 * @returns Padding value in pixels
 */
export const calculateTOCPadding = (level: number): number => {
    return (
        (level - 1) * BLOG_CONSTANTS.TOC.LEVEL_INDENT +
        BLOG_CONSTANTS.TOC.BASE_PADDING
    )
}

/**
 * Generates CSS custom property reference
 * @param property - CSS custom property name
 * @returns CSS var() reference
 */
export const cssVar = (property: string): string => {
    return `var(${property})`
}

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null

    return (...args: Parameters<T>) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => func(...args), wait)
    }
}

/**
 * Throttles a function call
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle = false

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

/**
 * Checks if code is running in browser environment
 * @returns True if in browser, false otherwise
 */
export const isBrowser = (): boolean => {
    return typeof window !== 'undefined'
}

/**
 * Safely gets an element by ID with null check
 * @param id - Element ID
 * @returns Element or null
 */
export const safeGetElementById = (id: string): HTMLElement | null => {
    if (!isBrowser()) return null
    return document.getElementById(id)
}

/**
 * Creates an intersection observer with default blog settings
 * @param callback - Intersection observer callback
 * @param options - Optional intersection observer options
 * @returns IntersectionObserver instance
 */
export const createIntersectionObserver = (
    callback: IntersectionObserverCallback,
    options?: Partial<IntersectionObserverInit>
): IntersectionObserver | null => {
    if (!isBrowser()) return null

    const defaultOptions: IntersectionObserverInit = {
        rootMargin: BLOG_CONSTANTS.TOC.INTERSECTION_OBSERVER.ROOT_MARGIN,
        threshold: BLOG_CONSTANTS.TOC.INTERSECTION_OBSERVER.THRESHOLD,
        ...options,
    }

    return new IntersectionObserver(callback, defaultOptions)
}
