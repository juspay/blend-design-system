/**
 * Current-route helper for in-app return targets.
 *
 * `normalizeReturnPath` deliberately does NOT live here: it lives in
 * `@/lib/safe-redirect`, the hardened single implementation (rescan
 * round-2, CWE-601 — a second, weaker copy of it here accepted
 * protocol-relative URLs like `//evil.example`). TypeScript fails any
 * import of it from this module, which is the guard keeping exactly one
 * implementation in the codebase.
 */

/** Current route as a path-only return target (pathname + query). */
export function getCurrentReturnPath(): string {
    if (typeof window === 'undefined') {
        return '/studio'
    }
    return `${window.location.pathname}${window.location.search}`
}
