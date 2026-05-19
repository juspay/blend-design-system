/**
 * Normalizes a `from` search param for in-app navigation.
 * Accepts relative paths (`/studio/...`) and same-origin absolute URLs.
 */
export function normalizeReturnPath(from: unknown): string | undefined {
    if (typeof from !== 'string' || from.length === 0) {
        return undefined
    }

    if (from.startsWith('/')) {
        return from
    }

    try {
        const url = new URL(from)
        if (
            typeof window !== 'undefined' &&
            url.origin !== window.location.origin
        ) {
            return undefined
        }
        return `${url.pathname}${url.search}`
    } catch {
        return undefined
    }
}

/** Current route as a path-only return target (pathname + query). */
export function getCurrentReturnPath(): string {
    if (typeof window === 'undefined') {
        return '/studio'
    }
    return `${window.location.pathname}${window.location.search}`
}
