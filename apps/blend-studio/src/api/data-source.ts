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
 * Execute a query against the resolved data source.
 *
 * Routes to the correct handler based on the data source type.
 * Throws if no handler is available for the resolved source.
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
            return handlers.backend(source.backendToken)
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
            return handlers.firestore(idToken)
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
