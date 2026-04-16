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

export * from '@/api/firestore'

export {
    validateBranchId,
    validateVersion,
    incrementVersion,
    parseBranchId,
} from '@blend-design/token-engine'

// ---------------------------------------------------------------------------
// useBranchesWithMock
// ---------------------------------------------------------------------------
export function useBranchesWithMock(options?: BranchListOptions) {
    const [firebaseUser] = useAuthState(auth)
    const { token: backendToken, user } = useBackendAuth()
    const [branches, setBranches] = useState<Branch[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Stable serialized options to prevent unnecessary re-fetches
    const optionsKey = options
        ? JSON.stringify({
              limit: options.limit,
              filters: options.filters,
          })
        : ''

    const fetchBranches = useCallback(async () => {
        const flags = featureFlags.get()

        if (flags.apiBaseUrl && backendToken) {
            setLoading(true)
            try {
                const { listBranchesBackend } = await import('@/api/backend')
                const orgId = user?.organizations?.[0]?.organizationId
                const result = await listBranchesBackend(backendToken, {
                    limit: options?.limit,
                    createdBy: options?.filters?.owner,
                    organizationId: orgId,
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
    }, [firebaseUser, backendToken, user, optionsKey])

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
// useBranchWithMock
// ---------------------------------------------------------------------------
export function useBranchWithMock(branchId: string | null) {
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

        if (flags.apiBaseUrl && backendToken) {
            setLoading(true)
            setError(null)
            try {
                const { getBranchBackend } = await import('@/api/backend')
                const data = await getBranchBackend(backendToken, branchId)
                setBranch(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
            return
        }

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

        setBranch(null)
        setLoading(false)
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
            if (flags.apiBaseUrl && backendToken) {
                const { updateBranchBackend } = await import('@/api/backend')
                const updated = await updateBranchBackend(
                    backendToken,
                    id,
                    updates
                )
                if (updated) setBranch(updated)
                return updated
            }
            if (flags.useMockData) {
                const updated = await mockApi.updateBranch(id, updates)
                setBranch(updated)
                return updated
            }
            return null
        },
        [backendToken]
    )

    return { branch, loading, error, updateBranch, refetch: fetchBranch }
}

// ---------------------------------------------------------------------------
// useVersionsWithMock
// ---------------------------------------------------------------------------
export function useVersionsWithMock(branchId: string | null) {
    const { token: backendToken } = useBackendAuth()
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
            if (flags.apiBaseUrl && backendToken) {
                setLoading(true)
                setError(null)
                try {
                    const resp = await fetch(
                        `${flags.apiBaseUrl}/api/branches/${branchId}/versions`,
                        {
                            headers: {
                                Authorization: `Bearer ${backendToken}`,
                            },
                        }
                    )
                    const data = await resp.json()
                    if (data.success) setVersions(data.data.versions)
                } catch (err) {
                    setError(
                        err instanceof Error ? err.message : 'Unknown error'
                    )
                } finally {
                    setLoading(false)
                }
                return
            }
            setVersions([])
            setLoading(false)
        }
        fetchVersions()
    }, [branchId, backendToken])

    return { versions, loading, error }
}

// ---------------------------------------------------------------------------
// useSnapshotsWithMock
// ---------------------------------------------------------------------------
export function useSnapshotsWithMock(branchId: string | null) {
    const { token: backendToken } = useBackendAuth()
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
        if (flags.apiBaseUrl && backendToken) {
            setLoading(true)
            try {
                const resp = await fetch(
                    `${flags.apiBaseUrl}/api/branches/${branchId}/snapshots`,
                    {
                        headers: { Authorization: `Bearer ${backendToken}` },
                    }
                )
                const data = await resp.json()
                if (data.success) setSnapshots(data.data.snapshots)
            } catch {
                /* ignore */
            } finally {
                setLoading(false)
            }
            return
        }
        setSnapshots([])
        setLoading(false)
    }, [branchId, backendToken])

    useEffect(() => {
        fetchSnapshots()
    }, [fetchSnapshots])

    return { snapshots, loading, refetch: fetchSnapshots }
}

// ---------------------------------------------------------------------------
// usePublishVersionWithMock
// ---------------------------------------------------------------------------
export function usePublishVersionWithMock(branchId: string | null) {
    const { token: backendToken, user } = useBackendAuth()
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
                if (flags.apiBaseUrl && backendToken) {
                    const resp = await fetch(
                        `${flags.apiBaseUrl}/api/branches/${branchId}/publish`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${backendToken}`,
                            },
                            body: JSON.stringify({
                                version: input.version,
                                changelog: input.changelog,
                                isBreaking: input.isBreaking,
                                isPrerelease: input.isPrerelease,
                            }),
                        }
                    )
                    const data = await resp.json()
                    if (!data.success)
                        throw new Error(data.error?.message || 'Publish failed')
                    return {
                        ...input,
                        publishedAt: new Date(),
                    } as unknown as Version
                }
                if (flags.useMockData) {
                    return await mockApi.publishVersion(branchId, input)
                }
                return null
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                return null
            } finally {
                setLoading(false)
            }
        },
        [branchId, backendToken, user]
    )

    return { publishVersion, loading, error }
}

// ---------------------------------------------------------------------------
// useCreateSnapshotWithMock
// ---------------------------------------------------------------------------
export function useCreateSnapshotWithMock(branchId: string | null) {
    const { token: backendToken, user } = useBackendAuth()
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
                if (flags.apiBaseUrl && backendToken) {
                    const resp = await fetch(
                        `${flags.apiBaseUrl}/api/branches/${branchId}/snapshots`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${backendToken}`,
                            },
                            body: JSON.stringify({
                                brandConfig,
                                label,
                                isAutoSave,
                            }),
                        }
                    )
                    const data = await resp.json()
                    if (!data.success)
                        throw new Error(
                            data.error?.message || 'Snapshot failed'
                        )
                    return data.data.snapshot as unknown as Snapshot
                }
                if (flags.useMockData) {
                    return await mockApi.createSnapshot(
                        branchId,
                        brandConfig,
                        label,
                        isAutoSave
                    )
                }
                return null
            } catch (err) {
                console.error('[useCreateSnapshotWithMock] Error:', err)
                return null
            } finally {
                setLoading(false)
            }
        },
        [branchId, backendToken, user]
    )

    return { createSnapshot, loading }
}

// ---------------------------------------------------------------------------
// useCreateBranchWithMock
// ---------------------------------------------------------------------------
export function useCreateBranchWithMock() {
    const [firebaseUser] = useAuthState(auth)
    const { token: backendToken, user } = useBackendAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createBranch = useCallback(
        async (input: CreateBranchInput): Promise<Branch | null> => {
            setLoading(true)
            setError(null)
            try {
                const flags = featureFlags.get()
                if (flags.apiBaseUrl && backendToken) {
                    const { createBranchBackend } =
                        await import('@/api/backend')
                    const orgId = user?.organizations?.[0]?.organizationId
                    return await createBranchBackend(backendToken, input, orgId)
                }
                if (flags.useMockData) {
                    return await mockApi.createBranch(input)
                }
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
        [firebaseUser, backendToken, user]
    )

    return { createBranch, loading, error }
}

// ---------------------------------------------------------------------------
// useDeleteBranchWithMock
// ---------------------------------------------------------------------------
export function useDeleteBranchWithMock() {
    const { token: backendToken } = useBackendAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const deleteBranch = useCallback(
        async (branchId: string): Promise<boolean> => {
            setLoading(true)
            setError(null)
            try {
                const flags = featureFlags.get()
                if (flags.apiBaseUrl && backendToken) {
                    const { deleteBranchBackend } =
                        await import('@/api/backend')
                    await deleteBranchBackend(backendToken, branchId)
                    return true
                }
                if (flags.useMockData) {
                    await mockApi.deleteBranch(branchId)
                    return true
                }
                return false
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                return false
            } finally {
                setLoading(false)
            }
        },
        [backendToken]
    )

    return { deleteBranch, loading, error }
}

// ---------------------------------------------------------------------------
// useForkBranchWithMock
// ---------------------------------------------------------------------------
export function useForkBranchWithMock() {
    const { token: backendToken, user } = useBackendAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const forkBranch = useCallback(
        async (
            sourceBranchId: string,
            newName: string,
            _slug: string
        ): Promise<Branch | null> => {
            setLoading(true)
            setError(null)
            try {
                const flags = featureFlags.get()
                if (flags.apiBaseUrl && backendToken) {
                    const { forkBranchBackend } = await import('@/api/backend')
                    return await forkBranchBackend(
                        backendToken,
                        sourceBranchId,
                        newName
                    )
                }
                if (flags.useMockData) {
                    return await mockApi.forkBranch(
                        sourceBranchId,
                        newName,
                        _slug
                    )
                }
                return null
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                return null
            } finally {
                setLoading(false)
            }
        },
        [backendToken, user]
    )

    return { forkBranch, loading, error }
}

// ---------------------------------------------------------------------------
// useResolvedTokens
// ---------------------------------------------------------------------------
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
