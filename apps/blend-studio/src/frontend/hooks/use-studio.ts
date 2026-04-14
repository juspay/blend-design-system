import { useState, useEffect, useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { useBackendAuth } from '@/contexts/BackendAuthContext'
import { featureFlags } from '@/lib/feature-flags'
import { mockApi } from '@/api/mock/mock-data'
import type {
    Branch,
    BranchListOptions,
    BrandConfig,
    CreateBranchInput,
    Version,
    Snapshot,
} from '@blend-design/token-engine'

// Re-export Firestore hooks so consumers can use either
export * from '@/api/firestore'

// Re-export utility functions from token-engine
export {
    validateBranchId,
    validateVersion,
    incrementVersion,
    parseBranchId,
} from '@blend-design/token-engine'

// ---------------------------------------------------------------------------
// useBranchesWithMock — lists branches (mock, backend API, or Firestore)
// ---------------------------------------------------------------------------
export function useBranchesWithMock(options?: BranchListOptions) {
    const [firebaseUser] = useAuthState(auth)
    const { token: backendToken } = useBackendAuth()
    const [branches, setBranches] = useState<Branch[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBranches = useCallback(async () => {
        const flags = featureFlags.get()

        // Try backend API first
        if (flags.apiBaseUrl && backendToken) {
            setLoading(true)
            try {
                const { listBranchesBackend } = await import('@/api/backend')
                const result = await listBranchesBackend(backendToken, {
                    limit: options?.limit,
                    createdBy: options?.filters?.owner,
                })
                setBranches(result.branches)
                setTotal(result.branches.length)
                setError(null)
            } catch (err) {
                console.error('[useBranchesWithMock] Error:', err)
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
            return
        }

        // Fall back to mock data
        if (flags.useMockData) {
            setLoading(true)
            try {
                const result = await mockApi.listBranches(options?.filters)
                setBranches(result.branches)
                setTotal(result.total)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
            return
        }

        // Fall back to Firestore (legacy Firebase mode)
        if (firebaseUser) {
            setLoading(true)
            setError(null)
            try {
                const idToken = await firebaseUser.getIdToken()
                const { listBranchesFirestore } =
                    await import('@/api/firestore')
                const result = await listBranchesFirestore(
                    idToken,
                    options?.filters
                )
                setBranches(result.branches)
                setTotal(result.total)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
            return
        }

        setBranches([])
        setLoading(false)
    }, [firebaseUser, backendToken, options])

    useEffect(() => {
        fetchBranches()
    }, [fetchBranches])

    return {
        branches,
        total,
        hasMore: false,
        loading,
        error,
        refetch: fetchBranches,
    }
}

// ---------------------------------------------------------------------------
// useBranchWithMock — single branch + updateBranch
// ---------------------------------------------------------------------------
export function useBranchWithMock(branchId: string | null) {
    const [user] = useAuthState(auth)
    const { token: backendToken } = useBackendAuth()
    const [branch, setBranch] = useState<Branch | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBranch = useCallback(async () => {
        if (!branchId) {
            setBranch(null)
            setLoading(false)
            return
        }
        const flags = featureFlags.get()

        if (flags.useMockData) {
            setLoading(true)
            try {
                const data = await mockApi.getBranch(branchId)
                setBranch(data)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
            return
        }

        if (!backendToken) {
            setBranch(null)
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)
        try {
            // Use backend API instead of direct Firestore to respect database selection
            const { getBranchBackend } = await import('@/api/backend')
            const data = await getBranchBackend(backendToken, branchId)
            setBranch(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }, [backendToken, branchId])

    useEffect(() => {
        fetchBranch()
    }, [fetchBranch])

    const updateBranch = useCallback(
        async (
            id: string,
            updates: {
                brandConfig?: BrandConfig
                name?: string
                description?: string
            }
        ) => {
            const flags = featureFlags.get()
            if (flags.useMockData) {
                const updated = await mockApi.updateBranch(id, updates)
                setBranch(updated)
                return updated
            }
            if (!user) return null
            const idToken = await user.getIdToken()
            const { updateBranchFirestore } = await import('@/api/firestore')
            const updated = await updateBranchFirestore(
                idToken,
                id,
                updates,
                user.uid
            )
            if (updated) setBranch(updated)
            return updated
        },
        [user]
    )

    return { branch, loading, error, updateBranch, refetch: fetchBranch }
}

// ---------------------------------------------------------------------------
// useVersionsWithMock — list versions for a branch
// ---------------------------------------------------------------------------
export function useVersionsWithMock(branchId: string | null) {
    const [user] = useAuthState(auth)
    const [versions, setVersions] = useState<Version[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!branchId) {
            setVersions([])
            setLoading(false)
            return
        }
        const fetchVersions = async () => {
            const flags = featureFlags.get()

            if (flags.useMockData) {
                setLoading(true)
                try {
                    const data = await mockApi.listVersions(branchId)
                    setVersions(data)
                    setError(null)
                } catch (err) {
                    setError(
                        err instanceof Error ? err.message : 'Unknown error'
                    )
                } finally {
                    setLoading(false)
                }
                return
            }

            if (!user) {
                setVersions([])
                setLoading(false)
                return
            }

            setLoading(true)
            setError(null)
            try {
                const idToken = await user.getIdToken()
                const { listVersionsFirestore } =
                    await import('@/api/firestore')
                const data = await listVersionsFirestore(idToken, branchId)
                setVersions(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }
        fetchVersions()
    }, [branchId, user])

    return { versions, loading, error }
}

// ---------------------------------------------------------------------------
// useSnapshotsWithMock — list snapshots for a branch
// ---------------------------------------------------------------------------
export function useSnapshotsWithMock(branchId: string | null) {
    const [user] = useAuthState(auth)
    const [snapshots, setSnapshots] = useState<Snapshot[]>([])
    const [loading, setLoading] = useState(true)

    const fetchSnapshots = useCallback(async () => {
        if (!branchId) {
            setSnapshots([])
            setLoading(false)
            return
        }
        const flags = featureFlags.get()
        if (flags.useMockData) {
            setLoading(true)
            try {
                const data = await mockApi.listSnapshots(branchId)
                setSnapshots(data)
            } finally {
                setLoading(false)
            }
            return
        }
        if (!user) {
            setSnapshots([])
            setLoading(false)
            return
        }
        setLoading(true)
        try {
            const idToken = await user.getIdToken()
            const { listSnapshotsFirestore } = await import('@/api/firestore')
            const data = await listSnapshotsFirestore(idToken, branchId)
            setSnapshots(data)
        } finally {
            setLoading(false)
        }
    }, [branchId, user])

    useEffect(() => {
        fetchSnapshots()
    }, [fetchSnapshots])

    return { snapshots, loading, refetch: fetchSnapshots }
}

// ---------------------------------------------------------------------------
// usePublishVersionWithMock
// ---------------------------------------------------------------------------
export function usePublishVersionWithMock(branchId: string | null) {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const publishVersion = useCallback(
        async (input: {
            version: string
            brandConfig: BrandConfig
            changelog?: string
            isBreaking?: boolean
            isPrerelease?: boolean
        }): Promise<Version | null> => {
            if (!branchId) return null
            setLoading(true)
            setError(null)
            try {
                const flags = featureFlags.get()
                if (flags.useMockData) {
                    return await mockApi.publishVersion(branchId, input)
                }
                if (!user) return null
                const idToken = await user.getIdToken()
                const { publishVersionFirestore } =
                    await import('@/api/firestore')
                return await publishVersionFirestore(
                    idToken,
                    branchId,
                    input,
                    user.uid,
                    user.displayName || ''
                )
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                return null
            } finally {
                setLoading(false)
            }
        },
        [branchId, user]
    )

    return { publishVersion, loading, error }
}

// ---------------------------------------------------------------------------
// useCreateSnapshotWithMock
// ---------------------------------------------------------------------------
export function useCreateSnapshotWithMock(branchId: string | null) {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)

    const createSnapshot = useCallback(
        async (
            brandConfig: BrandConfig,
            label?: string,
            isAutoSave = true
        ): Promise<Snapshot | null> => {
            if (!branchId) return null
            setLoading(true)
            try {
                const flags = featureFlags.get()
                if (flags.useMockData) {
                    return await mockApi.createSnapshot(
                        branchId,
                        brandConfig,
                        label,
                        isAutoSave
                    )
                }
                if (!user) return null
                const idToken = await user.getIdToken()
                const { createSnapshotFirestore } =
                    await import('@/api/firestore')
                return await createSnapshotFirestore(
                    idToken,
                    branchId,
                    brandConfig,
                    user.uid,
                    user.displayName || '',
                    label,
                    isAutoSave
                )
            } finally {
                setLoading(false)
            }
        },
        [branchId, user]
    )

    return { createSnapshot, loading }
}

// ---------------------------------------------------------------------------
// useCreateBranchWithMock
// ---------------------------------------------------------------------------
export function useCreateBranchWithMock() {
    const [firebaseUser] = useAuthState(auth)
    const { token: backendToken } = useBackendAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createBranch = useCallback(
        async (input: CreateBranchInput): Promise<Branch | null> => {
            setLoading(true)
            setError(null)
            try {
                const flags = featureFlags.get()

                // Try backend API first (if configured and token available)
                if (flags.apiBaseUrl && backendToken) {
                    const { createBranchBackend } =
                        await import('@/api/backend')
                    return await createBranchBackend(backendToken, input)
                }

                // Fall back to mock data
                if (flags.useMockData) {
                    return await mockApi.createBranch(input)
                }

                // Fall back to Firestore (legacy Firebase mode)
                if (firebaseUser) {
                    const idToken = await firebaseUser.getIdToken()
                    const { createBranchFirestore } =
                        await import('@/api/firestore')
                    return await createBranchFirestore(
                        idToken,
                        firebaseUser.uid,
                        firebaseUser.email || '',
                        firebaseUser.displayName || '',
                        input
                    )
                }

                throw new Error('No authentication available')
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                console.error('[useCreateBranchWithMock] Error:', err)
                return null
            } finally {
                setLoading(false)
            }
        },
        [firebaseUser, backendToken]
    )

    return { createBranch, loading, error }
}

// ---------------------------------------------------------------------------
// useDeleteBranchWithMock
// ---------------------------------------------------------------------------
export function useDeleteBranchWithMock() {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const deleteBranch = useCallback(
        async (branchId: string): Promise<boolean> => {
            setLoading(true)
            setError(null)
            try {
                const flags = featureFlags.get()
                if (flags.useMockData) {
                    await mockApi.deleteBranch(branchId)
                    return true
                }
                if (!user) return false
                const idToken = await user.getIdToken()
                const { deleteBranchFirestore } =
                    await import('@/api/firestore')
                await deleteBranchFirestore(idToken, branchId)
                return true
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                return false
            } finally {
                setLoading(false)
            }
        },
        [user]
    )

    return { deleteBranch, loading, error }
}

// ---------------------------------------------------------------------------
// useForkBranchWithMock
// ---------------------------------------------------------------------------
export function useForkBranchWithMock() {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const forkBranch = useCallback(
        async (
            sourceBranchId: string,
            newName: string,
            newSlug: string
        ): Promise<Branch | null> => {
            setLoading(true)
            setError(null)
            try {
                const flags = featureFlags.get()
                if (flags.useMockData) {
                    return await mockApi.forkBranch(
                        sourceBranchId,
                        newName,
                        newSlug
                    )
                }
                if (!user) return null
                const idToken = await user.getIdToken()
                const { forkBranchFirestore } = await import('@/api/firestore')
                return await forkBranchFirestore(
                    idToken,
                    sourceBranchId,
                    newName,
                    newSlug,
                    user.uid
                )
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                return null
            } finally {
                setLoading(false)
            }
        },
        [user]
    )

    return { forkBranch, loading, error }
}

// ---------------------------------------------------------------------------
// useResolvedTokens
// ---------------------------------------------------------------------------

/**
 * Returns a memoized function that resolves brand config into component tokens.
 * Call the returned function to get the resolved tokens.
 */
export function useResolvedTokens(
    brandConfig: BrandConfig | null,
    theme: 'light' | 'dark' = 'light'
) {
    return useCallback(() => {
        if (!brandConfig) return null
        const { resolveBrandTokens } = require('@blend-design/token-engine')
        return resolveBrandTokens(brandConfig, theme)
    }, [brandConfig, theme])
}
