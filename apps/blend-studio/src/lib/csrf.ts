const SAFE_HTTP_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])
const CSRF_INVALID_CODE = 'CSRF_INVALID'

let cachedCsrfToken: string | null = null
let csrfTokenRequest: Promise<string> | null = null

export const isSafeHttpMethod = (method: string): boolean => {
    return SAFE_HTTP_METHODS.has(method.toUpperCase())
}

const parseCsrfToken = (payload: unknown): string | null => {
    if (!payload || typeof payload !== 'object') return null

    const data = (payload as { data?: unknown }).data
    if (!data || typeof data !== 'object') return null

    const token = (data as { csrfToken?: unknown }).csrfToken
    return typeof token === 'string' && token.length > 0 ? token : null
}

const isCsrfInvalidErrorBody = (payload: unknown): boolean => {
    if (!payload || typeof payload !== 'object') return false

    const error = (payload as { error?: unknown }).error
    if (!error || typeof error !== 'object') return false

    return (error as { code?: unknown }).code === CSRF_INVALID_CODE
}

export const clearCachedCsrfToken = (): void => {
    cachedCsrfToken = null
    csrfTokenRequest = null
}

export const getCsrfToken = async (apiBaseUrl: string): Promise<string> => {
    const baseUrl = apiBaseUrl || ''

    if (cachedCsrfToken) {
        return cachedCsrfToken
    }

    if (!csrfTokenRequest) {
        csrfTokenRequest = (async () => {
            const response = await fetch(`${baseUrl}/api/auth/csrf`, {
                method: 'GET',
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch CSRF token (HTTP ${response.status})`
                )
            }

            const payload = (await response.json().catch(() => null)) as unknown
            const token = parseCsrfToken(payload)

            if (!token) {
                throw new Error('Invalid CSRF token response from server')
            }

            cachedCsrfToken = token
            return token
        })()

        csrfTokenRequest.finally(() => {
            csrfTokenRequest = null
        })
    }

    return csrfTokenRequest
}

export const enrichHeadersWithCsrf = async (
    apiBaseUrl: string,
    headersInit: HeadersInit | undefined,
    method: string
): Promise<Headers> => {
    const headers = new Headers(headersInit)

    if (isSafeHttpMethod(method)) {
        return headers
    }

    const csrfToken = await getCsrfToken(apiBaseUrl)
    headers.set('x-csrf-token', csrfToken)
    return headers
}

/**
 * Executes a cookie-authenticated request with CSRF protection for unsafe
 * methods, and performs a single token refresh + retry on CSRF mismatch.
 */
export const fetchWithCsrf = async (
    apiBaseUrl: string,
    endpoint: string,
    init: RequestInit = {}
): Promise<Response> => {
    const method = (init.method || 'GET').toUpperCase()

    let headers = await enrichHeadersWithCsrf(apiBaseUrl, init.headers, method)

    const executeRequest = () =>
        fetch(`${apiBaseUrl || ''}${endpoint}`, {
            ...init,
            method,
            headers,
            credentials: 'include',
        })

    let response = await executeRequest()

    if (!isSafeHttpMethod(method) && response.status === 403) {
        const errorBody = await response
            .clone()
            .json()
            .catch(() => null)

        if (isCsrfInvalidErrorBody(errorBody)) {
            clearCachedCsrfToken()
            headers = await enrichHeadersWithCsrf(
                apiBaseUrl,
                init.headers,
                method
            )
            response = await executeRequest()
        }
    }

    return response
}
