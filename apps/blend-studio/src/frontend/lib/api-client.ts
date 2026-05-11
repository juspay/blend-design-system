import { auth } from '@/lib/firebase'

/**
 * Performs an authenticated fetch request.
 * Supports both cookie-based sessions and Firebase Bearer token auth.
 * Automatically includes credentials for cookie-based auth.
 */
export async function authenticatedFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const headers = new Headers(options.headers)

    const user = auth.currentUser
    if (user) {
        const idToken = await user.getIdToken()
        headers.set('Authorization', `Bearer ${idToken}`)
    }

    return fetch(url, {
        ...options,
        headers,
        credentials: 'include',
    })
}

/**
 * Helper function to handle JSON responses
 */
export async function authenticatedJsonFetch<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await authenticatedFetch(url, options)

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Authentication required. Please login again.')
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
}
