/**
 * Unified Data Access Layer
 *
 * Eliminates the repeated mock/backend/firestore branching pattern
 * that was duplicated across every hook in use-studio.ts.
 *
 * Usage:
 *   const source = resolveDataSource(flags, backendToken, firebaseUser)
 *   const result = await executeQuery(source, { backend, firestore, mock }, tokens)
 */

import type { User as FirebaseUser } from 'firebase/auth'
import type { FeatureFlags } from '@/lib/feature-flags'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DataSourceType = 'backend' | 'firestore' | 'mock' | 'none'

export interface DataSource {
    type: DataSourceType
    backendToken: string | null
    firebaseUser: FirebaseUser | null
}

export interface QueryHandlers<T> {
    backend: (token: string) => Promise<T>
    firestore?: (idToken: string) => Promise<T>
    mock: () => Promise<T>
}

// ---------------------------------------------------------------------------
// Source Resolution
// ---------------------------------------------------------------------------

/**
 * Determine which data source to use based on feature flags and auth state.
 * Priority: backend API > mock data > Firestore > none
 */
export function resolveDataSource(
    flags: FeatureFlags,
    backendToken: string | null,
    firebaseUser: FirebaseUser | null
): DataSource {
    if (flags.apiBaseUrl && backendToken) {
        return { type: 'backend', backendToken, firebaseUser }
    }
    if (flags.useMockData) {
        return { type: 'mock', backendToken: null, firebaseUser: null }
    }
    if (firebaseUser) {
        return { type: 'firestore', backendToken: null, firebaseUser }
    }
    return { type: 'none', backendToken: null, firebaseUser: null }
}

// ---------------------------------------------------------------------------
// Query Execution
// ---------------------------------------------------------------------------

/**
 * Retry a function with exponential backoff for transient failures.
 * Retries on network errors and 5xx server errors.
 */
async function withRetry<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
): Promise<T> {
    let lastError: Error | null = null

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn()
        } catch (error) {
            lastError =
                error instanceof Error ? error : new Error(String(error))

            // Don't retry on 401/403 (auth errors) or 400 (client errors)
            if (error && typeof error === 'object' && 'statusCode' in error) {
                const statusCode = (error as { statusCode: number }).statusCode
                if (
                    statusCode === 401 ||
                    statusCode === 403 ||
                    statusCode === 400
                ) {
                    throw error
                }
                // Only retry 5xx errors and network errors
                if (statusCode < 500) {
                    throw error
                }
            }

            // Don't retry on last attempt
            if (attempt === maxRetries) {
                break
            }

            // Exponential backoff with jitter
            const delay =
                baseDelay * Math.pow(2, attempt) + Math.random() * 1000
            await new Promise((resolve) => setTimeout(resolve, delay))
        }
    }

    throw lastError || new Error('Max retries exceeded')
}

/**
 * Execute a query against the resolved data source.
 *
 * Routes to the correct handler based on the data source type.
 * Throws if no handler is available for the resolved source.
 * Includes automatic retry logic for transient failures.
 */
export async function executeQuery<T>(
    source: DataSource,
    handlers: QueryHandlers<T>
): Promise<T> {
    switch (source.type) {
        case 'backend': {
            if (!source.backendToken) {
                throw new Error('Backend token is required for backend source')
            }
            const backendToken = source.backendToken
            return withRetry(() => handlers.backend(backendToken))
        }

        case 'mock': {
            return handlers.mock()
        }

        case 'firestore': {
            if (!handlers.firestore) {
                throw new Error('Firestore handler not provided')
            }
            if (!source.firebaseUser) {
                throw new Error(
                    'Firebase user is required for Firestore source'
                )
            }
            const idToken = await source.firebaseUser.getIdToken()
            return withRetry(() => handlers.firestore!(idToken))
        }

        case 'none':
            throw new Error('No data source available. Please sign in.')
    }
}

/**
 * Execute a query that returns a default value if no data source is available.
 * Used for list operations where an empty array is acceptable.
 */
export async function executeQueryWithDefault<T>(
    source: DataSource,
    handlers: QueryHandlers<T>,
    defaultValue: T
): Promise<T> {
    if (source.type === 'none') return defaultValue

    try {
        return await executeQuery(source, handlers)
    } catch {
        return defaultValue
    }
}

/**
 * Execute a mutation against the resolved data source.
 * Same as executeQuery but semantically distinct for clarity.
 */
export const executeMutation = executeQuery
