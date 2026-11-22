/**
 * Normalize a post-login return path.
 *
 * Only same-origin app paths are accepted (audit #14, CWE-601). The
 * candidate must start with a single `/` and must not smuggle
 * protocol-relative URLs (`//evil.com`), backslashes (browsers treat `\`
 * as `/`), percent-encoded variants, control characters, or whitespace —
 * any of which can turn a benign-looking path into a cross-origin
 * redirect.
 */
export function normalizeReturnPath(
    candidate: string | null | undefined,
    fallback: string | undefined,
    origin: string = typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost'
): string | undefined {
    if (typeof candidate !== 'string' || candidate === '') {
        return fallback
    }

    // Decode once and re-check: attackers pre-encode payloads to slip past
    // textual checks applied to the raw value.
    let path: string
    try {
        path = decodeURIComponent(candidate)
    } catch {
        return fallback
    }

    // Must be a relative app path, not protocol-relative and not
    // backslash-rooted.
    if (
        !path.startsWith('/') ||
        path.startsWith('//') ||
        path.startsWith('/\\')
    ) {
        return fallback
    }

    if (path.includes('\\')) {
        return fallback
    }

    // Browsers strip control characters and whitespace inside URLs before
    // parsing, which can reassemble a path into something entirely different.
    if (/[\u0000-\u001f\u007f\s]/.test(path)) {
        return fallback
    }

    // Belt and braces: resolve against the current origin and require the
    // result to stay there. Catches anything the textual checks missed.
    try {
        const url = new URL(path, origin)
        if (url.origin !== origin) {
            return fallback
        }
        return `${url.pathname}${url.search}${url.hash}`
    } catch {
        return fallback
    }
}
