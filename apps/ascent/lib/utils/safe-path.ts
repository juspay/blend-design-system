import path from 'path'

/**
 * Resolves untrusted slug segments inside a content directory, refusing
 * anything that could escape it (rescan round-2, CWE-22).
 *
 * Rejects:
 * - `..`, `.`, and empty segments
 * - absolute segments and segments containing path separators,
 *   backslashes or NUL (covers percent-encoded variants, which Next.js
 *   decodes before populating `params`)
 *
 * Finally resolves the candidate and asserts it stays inside the resolved
 * base directory, so no `fs` call ever sees a path outside it.
 *
 * Returns the resolved absolute path, or null when the input is rejected.
 */
export function resolveContentPath(
    basePath: string,
    segments: string | string[]
): string | null {
    const parts = Array.isArray(segments) ? segments : segments.split('/')
    if (parts.length === 0) {
        return null
    }

    for (const segment of parts) {
        if (
            segment === '' ||
            segment === '.' ||
            segment === '..' ||
            segment.includes('/') ||
            segment.includes('\\') ||
            segment.includes('\0') ||
            path.isAbsolute(segment)
        ) {
            return null
        }
    }

    const resolvedBase = path.resolve(basePath)
    const resolved = path.resolve(resolvedBase, ...parts)
    if (
        resolved !== resolvedBase &&
        !resolved.startsWith(resolvedBase + path.sep)
    ) {
        return null
    }

    return resolved
}
