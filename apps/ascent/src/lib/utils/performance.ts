// Performance optimization utilities

// Debounce function for search and other frequent operations
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return (...args: Parameters<T>) => {
        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            func(...args)
        }, wait)
    }
}

// Throttle function for scroll events and other high-frequency events
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean = false

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => {
                inThrottle = false
            }, limit)
        }
    }
}

// Memoization utility for expensive computations
export function memoize<T extends (...args: any[]) => any>(
    func: T,
    getKey?: (...args: Parameters<T>) => string
): T {
    const cache = new Map<string, ReturnType<T>>()

    return ((...args: Parameters<T>) => {
        const key = getKey ? getKey(...args) : JSON.stringify(args)

        if (cache.has(key)) {
            return cache.get(key)!
        }

        const result = func(...args)
        cache.set(key, result)
        return result
    }) as T
}

// Intersection Observer utility for lazy loading
export function createIntersectionObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
): IntersectionObserver {
    const defaultOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1,
        ...options,
    }

    return new IntersectionObserver(callback, defaultOptions)
}

// Virtual scrolling utility for large lists
export function calculateVisibleItems(
    containerHeight: number,
    itemHeight: number,
    scrollTop: number,
    totalItems: number,
    overscan: number = 5
) {
    const visibleCount = Math.ceil(containerHeight / itemHeight)
    const startIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - overscan
    )
    const endIndex = Math.min(
        totalItems - 1,
        startIndex + visibleCount + overscan * 2
    )

    return {
        startIndex,
        endIndex,
        visibleCount,
        offsetY: startIndex * itemHeight,
    }
}

// Performance measurement utilities
export class PerformanceMonitor {
    private static marks = new Map<string, number>()

    static mark(name: string): void {
        if (typeof performance !== 'undefined') {
            performance.mark(name)
            this.marks.set(name, performance.now())
        }
    }

    static measure(name: string, startMark: string, endMark?: string): number {
        if (typeof performance !== 'undefined') {
            const endTime = endMark
                ? this.marks.get(endMark)
                : performance.now()
            const startTime = this.marks.get(startMark)

            if (startTime && endTime) {
                const duration = endTime - startTime
                console.log(
                    `Performance: ${name} took ${duration.toFixed(2)}ms`
                )
                return duration
            }
        }
        return 0
    }

    static clear(): void {
        if (typeof performance !== 'undefined') {
            performance.clearMarks()
            performance.clearMeasures()
        }
        this.marks.clear()
    }
}

// Image lazy loading utility
export function lazyLoadImage(
    img: HTMLImageElement,
    src: string,
    placeholder?: string
): void {
    if (placeholder) {
        img.src = placeholder
    }

    const observer = createIntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const image = entry.target as HTMLImageElement
                    image.src = src
                    image.onload = () => {
                        image.classList.add('loaded')
                    }
                    observer.unobserve(image)
                }
            })
        },
        { threshold: 0.1 }
    )

    observer.observe(img)
}

// Bundle size optimization - dynamic imports helper
export async function loadComponent<T>(
    importFn: () => Promise<{ default: T }>
): Promise<T> {
    try {
        const module = await importFn()
        return module.default
    } catch (error) {
        console.error('Failed to load component:', error)
        throw error
    }
}

// Memory management utilities
export function cleanupEventListeners(
    element: Element,
    events: Array<{ type: string; listener: EventListener }>
): void {
    events.forEach(({ type, listener }) => {
        element.removeEventListener(type, listener)
    })
}

// Preload critical resources
export function preloadResource(href: string, as: string): void {
    if (typeof document !== 'undefined') {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = href
        link.as = as
        document.head.appendChild(link)
    }
}
