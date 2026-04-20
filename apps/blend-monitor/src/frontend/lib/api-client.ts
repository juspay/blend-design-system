import { auth } from './firebase'

/**
 * Performs an authenticated fetch request by automatically adding the Firebase auth token
 * @param url - The URL to fetch
 * @param options - Standard fetch options
 * @returns Promise with the fetch response
 */
export async function authenticatedFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    try {
        // Get the current user
        const user = auth.currentUser
        if (!user) {
            throw new Error('No authenticated user')
        }

        // Get the ID token
        const token = await user.getIdToken()

        // Add the Authorization header
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${token}`)

        // Perform the fetch with the auth header
        return fetch(url, {
            ...options,
            headers,
        })
    } catch (error) {
        console.error('Authentication error:', error)
        // If we can't authenticate, try the request anyway (for backwards compatibility)
        // The server will reject it if auth is required
        return fetch(url, options)
    }
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
            // Handle authentication errors
            throw new Error('Authentication required. Please login again.')
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
}
